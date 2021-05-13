<template>

  <el-table
      :data="tableData"
      stripe
      style="width: 100%">

    <el-table-column
        label="序号"
        width="60">
      <template #default="scope">
        <span>{{(this.currentPage-1)*this.pageSize+(scope.$index + 1)}} </span>
      </template>
    </el-table-column>

    <el-table-column
        prop="title"
        label="竞赛名称"
        width="100">
    </el-table-column>
    <!--        prop="defunct"-->
    <el-table-column
        label="比赛禁用"
        width="100">
      <template #default="scope">
        <el-switch
            v-model='scope.row.defunct'
            active-color="#ff4949"
            inactive-color="#13ce66"
            active-value="Y"
            inactive-value="N"
            @change="handleChangeDefunctStatus(scope.$index, scope.row.defunct)"
        >
        </el-switch>
      </template>

    </el-table-column>
    <el-table-column
        prop="startTime"
        label="开始时间"
        width="180">
    </el-table-column>
    <el-table-column
        prop="endTime"
        label="结束时间"
        width="180">
    </el-table-column>


    <el-table-column
        prop="isPrivate"
        label="是否私有"
        width="180">
      <template #default="scope">
        <span>{{ scope.row.isPrivate == 1? "私有":"公开"}}</span>
      </template>
    </el-table-column>

    <el-table-column
        align="right">
      <template #header>
        <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
      </template>
      <template #default="scope">
        <el-button
            size="mini"
            @click="handleEdit(scope.row.contestId)">Edit</el-button>
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.contestId)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--    分页光标、刷新回到第一页解决方法： https://www.jianshu.com/p/0ac112bb19e8-->
  <div class="block">
    <el-pagination
        @current-change="handleCurrentChange"
        v-model:currentPage="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="contestCnt"
        v-if="this.contestCnt != 0">
    </el-pagination>
  </div>

</template>

<script>
import api from "@/util/api";
import {mapGetters, mapActions} from 'vuex'
import local_store from '@/util/local_store.vue'

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      contestCnt: 0,
      pageSize: 8,
    }
  },

  computed:{
    ...mapGetters(['contestsListGetter', 'contestPageIndexGetter', 'contestsCntGetter']),
  },

  created() {
    var temp = local_store.getContextDataLocalStorage("currentContestListPage")
    if( temp != null ){
      this.currentPage = temp;
    } else {
      this.currentPage = 1;
    }
  },

  mounted() {
    this.handleContestCnt();
    this.handleCurrentChange(this.currentPage);
  },

  methods: {

    handleChangeDefunctStatus(index, newStatus) {
      //先把状态变回去
      this.tableData[index].defunct = newStatus == 'Y' ? 'N':'Y';

      var data = {contestId: this.tableData[index].contestId, newStatus: newStatus}
      api.switchContestDefunctStatus(data).then( res => {
        this.tableData[index].defunct = newStatus;
      }).catch(err => {
        console.log("切换状态失败");
      })
    },


    created() {
      var temp = local_store.getContextDataLocalStorage("currentContestListPage")
      if( temp != null ){
        this.currentPage = temp
      } else {
        this.currentPage = 1
      }
    },

    handleContestCnt(){
      api.getContestCnt().then( res => {
        this.contestCnt = res;
      }).catch( err => {
        console.log("get contest cnt error!")
      })
    },

    handleCurrentChange(pos) {
      var params = {pos: pos, limit: this.pageSize}
      api.getContestList(params).then( res => {
        this.tableData = res;
        local_store.setContextDataInLocalStorage("currentContestListPage", this.currentPage)
      }).catch( err => {
        alert("get contest list error!")
      })
    },

    handleEdit(contestId) {
      this.$router.push("/admin/news/show/edit/" + contestId)
    },

    handleDelete(contestId) {
      var params = {contestId : contestId}
      api.deleteContestById(params).then( res => {
        // todo: 修改返回数据的方式
        alert(res)
        this.handleCurrentChange(this.currentPage)
      }).catch( err => {
        alert("delete contests fail!")
      })
    },
  },
}
</script>

<style>

</style>
