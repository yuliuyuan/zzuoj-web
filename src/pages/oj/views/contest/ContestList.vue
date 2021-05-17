<template>
  <div class="main">
    <div class="contest">
      <div class="contestTitle" >
        Contest List
      </div>
      <el-divider></el-divider>
      <div class="contestForm">
        <el-table
            :data="tableData"
            stripe
        >
          <el-table-column
              label="Id"
              width="100px">
            <template #default="scope">
              <span>{{(this.currentPage-1)*this.pageSize+(scope.$index + 1)}} </span>
            </template>
          </el-table-column>

          <el-table-column
              label="Title"
              width="500"
          >
            <template #default="scope">
              <el-button  @click="routerToContest(scope.row.contestId)">{{scope.row.title}} </el-button>
            </template>
          </el-table-column>

          <el-table-column
              label="StartTime"
              width="250px"
          >
            <template #default="scope">
              <span>{{scope.row.startTime}}</span>
            </template>
          </el-table-column>


          <el-table-column
              label="EndTime"
              width="250"
          >
            <template #default="scope">
              <span>{{scope.row.endTime}}</span>
            </template>
          </el-table-column>

          <el-table-column
              label="IsPrivate"
              width="150"
          >
            <template #default="scope">
              <span>{{scope.row.isPrivate == 1? "private":"public"}}</span>
            </template>
          </el-table-column>

          <el-table-column
              prop="userId"
              label="Creator"
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
              :total="contestCnt"
              v-if="this.contestCnt != 0">
          </el-pagination>
        </div>
      </div>
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
      contestCnt: 0,
      pageSize: 8,
    }
  },

  computed:{
  },

  created() {
    // var temp = local_store.getContextDataLocalStorage("currentContestListPage")
    // if( temp != null ){
    //   this.currentPage = temp;
    // } else {
    //   this.currentPage = 1;
    // }
  },

  mounted() {
      this.handleContestCnt();
      this.handleCurrentChange(this.currentPage);
  },

  methods: {

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
        // local_store.setContextDataInLocalStorage("currentContestListPage", this.currentPage)
      }).catch( err => {
        alert("get contest list error!")
      })
    },

    routerToContest(contestId) {
      this.$router.push('/contest/'+contestId)
    },
  },
}
</script>

<style>
.contest {
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;

  position: absolute;
  /*width: 500px;*/
  top: 100px;
  left: 70px;
  right: 70px;
}

.contestTitle {
  position: relative;
  top: 10px;
  left: 0px;
  right: 0px;
}

.contestForm {
  position: relative;
  left: 50px;
  width: 1370px;
}
</style>
