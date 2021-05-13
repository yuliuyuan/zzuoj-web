<template>
  <el-table
      :data="tableData"
      stripe
      style="width: 800px">

    <el-table-column
        label="序号"
        width="60">
      <template #default="scope">
        <span>{{(this.currentPage-1)*this.pageSize+(scope.$index + 1)}} </span>
      </template>
    </el-table-column>

    <el-table-column
        label="群组名"
        width="180">
      <template #default="scope">
        <span>{{tableData[scope.$index]}} </span>
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
            @click="handleEdit(tableData[scope.$index])">Edit</el-button>
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(tableData[scope.$index])">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="block">
    <el-pagination
        @current-change="handleCurrentChange"
        v-model:currentPage="this.currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="groupCnt"
        v-if="this.groupCnt != 0">
    </el-pagination>
  </div>

</template>

<script>
import api from "@/util/api";
import local_store from '@/util/local_store.vue'

export default {
  data() {
    console.log("data data")
    return {
      tableData: [],
      currentPage: 1,
      groupCnt: 0,
      pageSize: 8,
    }
  },

  computed: {
    idx: function () {
      return (this.currentPage-1)*this.pageSize;
    }
  },

  created() {
    var temp = local_store.getContextDataLocalStorage("currentGroupListPage")
    if( temp == null ){
      this.currentPage = 1
    } else {
      this.currentPage =  temp
    }
  },

  mounted() {
    this.handleGroupCnt();
    this.handleCurrentChange(this.currentPage);
  },

  methods: {
    handleGroupCnt(){
      api.getGroupCnt().then( res => {
        this.groupCnt = res;
      }).catch( err => {
        alert("get group cnt error")
      })
    },

    handleCurrentChange(pos) {
      var data = {pos: pos, limit: this.pageSize}
      api.showGroups(data).then( res => {
        this.tableData = res;
        local_store.setContextDataInLocalStorage("currentGroupListPage", this.currentPage)
      }).catch( err => {
        alert("get group by page error")
      })
    },

    handleEdit(groupId) {
      this.$router.push("/admin/user/group/edit/" + groupId)
    },

    handleDelete(groupId) {
      var params = {groupId : groupId}
      api.deleteGroup(params).then( res => {
        // todo: 修改返回数据的方式
        alert(res)
        this.handleCurrentChange(this.currentPage)
      }).catch( err => {
        alert("delete groups fail!")
      })
    },

  },
}
</script>

<style>

</style>
