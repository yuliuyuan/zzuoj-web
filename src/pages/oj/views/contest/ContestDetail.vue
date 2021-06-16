<template>
  <div class="main">
    <!--    contest主体    -->
    <div class="contestDetail">
      <div class="contestHeader">
        {{this.contest.title}}
      </div>
      <el-divider></el-divider>

      <div class="contestProblems">
          <el-table
              :data="this.contest.problemTemps"
              stripe
              style="width: 100%"
              :row-style="{height: '10px'}"
          >
            <el-table-column
                label="Id"
                width="100">
              <template #default="scope">
                <span>{{scope.$index + 1}} </span>
              </template>
            </el-table-column>
            <el-table-column
                label="Title"
                width="400"
            >
              <template #default="scope">
                <el-button size="small"  @click="routerToContestProblem(scope.row.problemId)">{{scope.row.title}} </el-button>
              </template>
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
      </div>
    </div>
    <!--    contest右侧信息-->
    <div class="contestInfo">
      <el-button @click="routerToSubmission" icon="el-icon-s-grid" style="width: 140px">Submissions</el-button>
    </div>
    <div class="contestInfo">
      <el-button @click="routerToRanking" icon="el-icon-s-grid"  style="width: 140px">Ranking-----</el-button>
    </div>
  </div>


</template>

<script>
import api from '@/util/api.js'


export default {
  name: 'ContestView',
  props: ['contestId'],
  data() {
    return {
      contest : [],
      textarea: '',
    }
  },

  mounted() {
    this.handleGetContestById(this.$route.params.contestId)
  },
  methods: {
    handleGetContestById(cId) {
      var params = {contestId : cId}
      api.getContestById(params).then( res => {
        this.contest = res
        var temp = res.problems.split('^')
        //获取所有题目
        var temp1 = []
        for(var i=0; i< temp.length; i++){
          temp1 = [...temp1, Number(temp[i])]
        }

        api.getProblemByIds({problemIds: temp1+''}).then(resres => {
          this.contest.problemTemps = resres;
        }).catch( err => {
          alert("get problems error")
        })

        console.log(this.contest)
      }).catch( err => {
        alert(err)
      })
    },

    routerToContestProblem(pId){
      this.$router.push('/contest/problem/' + this.$route.params.contestId+ '/' + pId);
    },

    routerToSubmission(){
      this.$router.push({
        path: '/submission',
        query: {
          contestId: this.$route.params.contestId
        }
      })
    },

    routerToRanking(){
      this.$router.push( '/contest/ranking/'+this.$route.params.contestId);

    }
  }
}

</script>

<style>

.contestDetail{
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;

  position: absolute;
  /*width: 500px;*/
  top: 100px;
  left: 70px;
  width: 1300px;
}

.contestHeader {
  position: relative;

  text-align : left;
  left: 20px;
  top : 20px;

  font-family:"Times New Roman", Times, serif;
  font-size:40px;
}



.blueTitle{
  color: blue;

  position: relative;
  left: 30px;

  font-family:"Times New Roman", Times, serif;
  font-size:23px;
}


.contestInfo {
  position: relative;

  top: 10px;
  left: 1450px;
}
</style>
