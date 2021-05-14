<template>
  <div class="main">
    <div class="problem">
      <div class="problemTitle" >
          Problem List
      </div>
      <el-divider></el-divider>
      <div class="problemForm">
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
        >
          <el-table-column
              label="Id"
              width="100">
            <template #default="scope">
              <span>{{(this.currentPage-1)*this.pageSize+(scope.$index + 1)}} </span>
            </template>
          </el-table-column>

          <el-table-column
              label="Title"
              width="400"
          >
            <template #default="scope">
              <el-button  @click="routerToProblem(scope.row.problemId)">{{scope.row.title}} </el-button>
            </template>
          </el-table-column>

          <el-table-column
              prop="submit"
              label="Level"
              width="150"
          >
          </el-table-column>

          <el-table-column
              prop="submit"
              label="Total"
              width="150"
          >
          </el-table-column>

          <el-table-column
              prop="accepted"
              label="AC"
              width="150"
          >
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
    </div>
   </div>

    <div class="tag">
      <div class="tagTitle" >
        <div class="tagTitleName">Tag</div>
      </div>
      <el-divider></el-divider>
    </div>

  </div>


</template>

<script>
import api from '@/util/api';
import { mapGetters, mapActions } from 'vuex'
import local_store from '@/util/local_store.vue'

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
    this.currentPage = local_store.getContextDataLocalStorage("currentProblemListPage")
  },

  mounted() {
    if( this.problemsListGetter.length != 0 && this.problemPageIndexGetter == this.currentPage && this.problemsCntGetter != this.newsCnt ){
      this.problemCnt = this.problemsCntGetter
      this.tableData = this.problemsListGetter
      this.currentPage = this.problemPageIndexGetter
    } else {
      this.handleProblemCnt();
      this.handleCurrentChange(this.currentPage);
    }
  },

  methods: {
    ...mapActions(['setProblemsList', 'setProblemPageIndex', 'setProblemsCnt']),

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

        this.setProblemsCnt(res)
      }).catch( err => {
        console.log("get problem cnt error!")
      })
    },

    handleCurrentChange(pos) {
      var data = {pos: pos-1, limit: this.pageSize}
      api.showProblem(data).then( res => {
        console.log(res)
        this.tableData = res;

        this.setProblemsList(res);
        this.setProblemPageIndex(pos)

        local_store.setContextDataInLocalStorage("currentProblemListPage", this.currentPage)
      }).catch( err => {
        console.log("handleCurrentChange error!")
        console.log(err)
      })
    },

    routerToProblem(problemId) {
      this.$router.push('/problem/'+problemId)
    },
  },
}
</script>

<style>
.problem {
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;

  position: absolute;
  /*width: 500px;*/
  top: 100px;
  left: 70px;
  right: 500px;
}

.problemTitle {
  position: relative;
  top: 10px;
  left: 0px;
  right: 0px;
}

.problemForm {
  position: relative;
  left: 20px;
  width: 950px;
}
/****************************************** tag：*********************************************************/
.tag{
  position: absolute;
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;
  top: 100px;
  /*left: 1000px;*/
  right: 70px;
  width: 380px;
}

.tagTitle {
  text-align: left;
  left: 0px;
  right: 0px;
}

.tagTitleName {
  text-align: left;
  position: relative;

  top: 10px;
  left: 20px;
  font-size:1.875em;
}

</style>
