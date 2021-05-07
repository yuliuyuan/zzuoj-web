<template>
  <div class="main">
<!--    problem主体    -->
    <div class="problemDetail">
      <div class="problemHeader">
        {{this.problem.title}}
      </div>
      <el-divider></el-divider>

      <div class="problemContent">
        <el-form ref="this.problem" :model="this.problem" label-position="top">
          <!--        text-align不能放到blueTitle里-->
          <el-form-item label="Description" class="blueTitle" style="text-align: left;">
            <div class="problemContent">{{this.problem.description}}</div>
          </el-form-item>

          <el-form-item label="Input" class="blueTitle" style="text-align: left;">
            <div class="problemContent">{{this.problem.input}}</div>
          </el-form-item>

          <el-form-item label="Output" class="blueTitle" style="text-align: left;">
            <div class="problemContent">{{this.problem.output}}</div>
          </el-form-item>

          <el-form-item label="Sample Input" class="blueTitle" style="text-align: left;">
            <div class="problemContent">{{this.problem.sampleInput}}</div>
          </el-form-item>

          <el-form-item label="Sample Output" class="blueTitle" style="text-align: left;">
            <div class="problemContent">{{this.problem.sampleOutput}}</div>
          </el-form-item>

          <el-form-item label="Sourcet" class="blueTitle" style="text-align: left;">
            <div class="problemContent">{{this.problem.source}}</div>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>

      <div class="problemUpload">
        <el-form ref="this.problem" :model="this.problem" label-position="top">
          <el-form-item label="提交" class="blueTitle" style="text-align: left;">
            <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 1000}"
                placeholder=""
                v-model="textarea"
                style="color: #2c3e50">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
<!--    problem右侧信息-->
    <div class="problemInfo">

    </div>
  </div>

</template>

<script>
import api from '@/util/api.js'


export default {
  name: 'ProblemView',
  props: ['problemId'],
  data() {
    return {
      problem : {},
      textarea: '',
    }
  },

  mounted() {
    this.handleGetProblemById(this.$route.params.problemId)
  },
  methods: {
    handleGetProblemById(pId) {
      var params = {problemId : pId}
      api.getProblemById(params).then( res => {
        this.problem = res;
        console.log(this.problem)
      }).catch( err => {
        alert(err)
      })
    }
  }
}

</script>

<style>

.problemDetail{
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;

  position: absolute;
  /*width: 500px;*/
  top: 100px;
  left: 70px;
  width: 1300px;
}

.problemHeader {
  position: relative;

  text-align : left;
  left: 20px;
  top : 20px;

  font-family:"Times New Roman", Times, serif;
  font-size:40px;
}



.blueTitle .el-form-item__label{
  color: blue;

  position: relative;
  left: 30px;

  font-family:"Times New Roman", Times, serif;
  font-size:23px;
}

.problemContent {
  position: relative;
  left: 30px;
  width: 1240px;

  font-family:"Times New Roman", Times, serif;
  font-size:17px;
}

</style>
