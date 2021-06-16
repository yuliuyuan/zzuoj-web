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
        label="题目名"
        width="180">
    </el-table-column>


    <el-table-column
        prop="problemId"
        label="pId"
        width="180">
    </el-table-column>

    <!--        prop="defunct"-->
    <el-table-column
        label="禁用题目"
        width="180">
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
        prop="accepted"
        label="AC数"
        width="180">
    </el-table-column>
    <el-table-column
        prop="submit"
        label="提交数"
        width="180">
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
            @click="handleEdit(scope.row.problemId)">Edit</el-button>
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.problemId)">Delete</el-button>
        <el-button
            size="mini"
            type="primary"
            @click="routerToTestData(scope.row.problemId)">TestData</el-button>
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
        :total="problemCnt"
        v-if="this.problemCnt != 0">
    </el-pagination>
  </div>

</template>

<script>
import api from "@/util/api";
import {mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      problemCnt: 0,
      pageSize: 8,
    }
  },

  computed:{
    ...mapGetters(['problemsListGetter', 'problemPageIndexGetter', 'problemsCntGetter']),
  },

  created() {
    // var temp = local_store.getContextDataLocalStorage("currentProblemListPage")
    // if( temp != null ){
    //   this.currentPage = temp;
    // } else {
    //   this.currentPage = 1;
    // }
  },

  mounted() {
    console.log("1111")
    if( this.problemsListGetter.length != 0 && this.problemPageIndexGetter == this.currentPage && this.problemsCntGetter != this.newsCnt ){
      this.problemCnt = this.problemsCntGetter
      this.tableData = this.problemsListGetter
      this.currentPage = this.problemPageIndexGetter
      console.log("2222")
    } else {
      this.handleProblemCnt();
      this.handleCurrentChange(this.currentPage);
      console.log(this.currentPage)
      console.log("3333")
    }
  },

  methods: {
    ...mapActions(['setProblemsList', 'setProblemPageIndex', 'setProblemsCnt']),

    handleChangeDefunctStatus(index, newStatus) {
      //先把状态变回去
      this.tableData[index].defunct = newStatus == 'Y' ? 'N':'Y';

      var data = {pid: this.tableData[index].problemId, newStatus: newStatus}
      api.switchProblemDefunctStatus(data).then( res => {
        this.tableData[index].defunct = newStatus;
      }).catch(err => {
        console.log("切换状态失败");
      })
    },


    handleProblemCnt(){
      api.getProblemCntIncludePrivate().then( res => {
        this.problemCnt = res;

        this.setProblemsCnt(res)
      }).catch( err => {
        console.log("get problem cnt error!")
      })
    },

    handleCurrentChange(pos) {
      var data = {pos: pos, limit: this.pageSize}
      api.showProblemIncludePrivate(data).then( res => {
        console.log(res)
        this.tableData = res;

        this.setProblemsList(res);
        this.setProblemPageIndex(pos)

        // local_store.setContextDataInLocalStorage("currentProblemListPage", this.currentPage)
      }).catch( err => {
        console.log("handleCurrentChange error!")
        console.log(err)
      })
    },

    handleEdit(problemId) {
      this.$router.push("/admin/problem/show/edit/" + problemId)
    },

    //todo：测试点也要删除
    handleDelete(problemId) {
      var params = {problemId : problemId}
      api.deleteProblemById(params).then( res => {
        alert(res)
        this.handleCurrentChange(this.currentPage)
      }).catch( err => {
        alert("delete problems fail!")
      })
    },


    routerToTestData(problemId) {
      this.$router.push("/admin/problem/data/" + problemId)
    },
  },
}
</script>

<style>

</style>
