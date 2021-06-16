<template>
  <div class="main">
    <div class="submission">

      <el-row>
        <el-col :span="18">
          <div class="submissionTitle" >
            Submission List
          </div>
        </el-col>
        <el-col :span="2">
          <el-input v-model="uid" placeholder="输入用户ID" style="width: 110px; top: 10px"></el-input>
        </el-col>

        <el-col :span="2">
          <el-input v-model="pid" placeholder="输入题目ID" style="width: 110px; top: 10px"></el-input>
        </el-col>

        <el-col :span="2">
          <el-button type="primary" icon="el-icon-refresh" style="position: relative;top: 10px" @click="this.show(this.currentPage, this.uid, this.pid)">refresh</el-button>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <div class="submissionForm">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
            >

          <el-table-column
              prop="inDate"
              label="When"
              width="180"
          >
          </el-table-column>

          <el-table-column
              prop="solutionId"
              label="solutionId"
              width="180"
          >
          </el-table-column>

          <el-table-column
              prop="result"
              label="Status"
              width="180"
          >
            <template #default="scope">
              <div :style="{'color':scope.row.result=='Accepted'? 'green':'red'}">
                {{scope.row.result}}
              </div>
            </template>
          </el-table-column>

          <el-table-column
              prop="problemId"
              label="Problem"
              width="180"
          >
          </el-table-column>

          <el-table-column
              prop="time"
              label="Time"
              width="180"
          >
          </el-table-column>

          <el-table-column
              prop="memory"
              label="Memory"
              width="180"
          >
          </el-table-column>

          <el-table-column
              prop="language"
              label="Language"
              width="180"
          >
            <template #default="scope">
              <div>
                {{this.getLanguage(scope.row.language)}}
              </div>
            </template>
          </el-table-column>

          <el-table-column
              prop="userId"
              label="Author"
              width="180"
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
              :total="submissionCnt"
              v-if="this.submissionCnt != 0">
          </el-pagination>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import api from '@/util/api';
import { defineComponent, ref } from 'vue'

export default {
  props: ['userId','problemId','contestId'],

  setup() {
    return {
      uid: ref(''),
      pid: ref(''),
      cid: ref(''),
    }
  },

  data() {
    return {
      tableData: [],
      currentPage: 1,
      submissionCnt: 0,
      pageSize: 8,
    }
  },

  created() {
  },

  mounted() {
    this.show(this.currentPage, this.$route.query.userId, this.$route.query.problemId, this.$route.query.contestId)
  },

  methods: {
    show(pos, uid, pid, cid){
      console.log(pos)
      console.log(uid)
      console.log(pid)
      this.handleSubmissionCnt(uid,pid,cid);
      this.handleCurrentChange(this.currentPage, uid, pid, cid);
    },

    handleSubmissionCnt(uid, pid, cid){
      var params = {uid : uid, pid: pid, cid: cid}
      api.getSubmissionCnt().then( res => {
        this.submissionCnt = res;
      }).catch( err => {
        console.log("get submission cnt error!")
      })
    },

    handleCurrentChange(pos, uid, pid, cid) {
      var params = {pos: pos-1, limit: this.pageSize, uid : uid, pid: pid, cid : cid}
      api.showSubmission(params).then( res => {
        console.log(res)
        this.tableData = res;
        for(var i=0; i<this.tableData.length; i++){
          this.tableData[i]
        }
      }).catch( err => {
        console.log("handleCurrentChange error!")
      })
    },

    routerToSubmission(submissionId) {
      this.$router.push('/submission/'+submissionId)
    },

    getLanguage(lang){
      if(lang==1) return "c"
      if(lang==2) return "c++"
      if(lang==2) return "java"
      if(lang==2) return "python"
      if(lang==2) return "go"
    },
  },
}
</script>

<style>
.submission {
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;

  position: absolute;
  /*width: 500px;*/
  top: 100px;
  left: 70px;
  right: 70px;
}

.submissionTitle {
  position: relative;
  top: 13px;
  left: 20px;
  right: 0px;

  font-size:25px;
}

.submissionForm {
  position: relative;
  left: 20px;
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
