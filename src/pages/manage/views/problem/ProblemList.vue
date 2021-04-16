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
  </el-table>

  <div class="block">
    <el-pagination
        @current-change="handleCurrentChange"
        v-model:currentPage="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="problemCnt">
    </el-pagination>
  </div>

</template>

<script>
import api from "@/util/api";

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      problemCnt: 0,
      pageSize: 10,
    }
  },

  watch: {
  },

  mounted() {
    this.currentPage = 1;
    if(this.tableData.length == 0){
      this.handleCurrentChange(1);
      this.handleProblemCnt();
    }
  },

  methods: {
    handleChangeDefunctStatus(index, newStatus) {
      //先把状态变回去
      this.tableData[index].defunct = newStatus == 'Y' ? 'N':'Y';

      var data = {pid: this.tableData[index].problemId, newStatus: newStatus}
      api.switchDefunctStatus(data).then( res => {
        this.tableData[index].defunct = newStatus;
      }).catch(err => {
        console.log("切换状态失败");
      })
    },


    handleProblemCnt(){
      api.getProblemCnt().then( res => {
        this.problemCnt = res;
      }).catch( err => {
        console.log("get problem cnt error!")
      })
    },
    handleCurrentChange(pos) {
      var data = {pos: pos-1, limit: this.pageSize}
      api.showProblem(data).then( res => {
        console.log(res)
        this.tableData = res;
      }).catch( err => {
        console.log("handleCurrentChange error!")
        console.log(err)
      })
    }
  },
}
</script>

<style>

</style>
