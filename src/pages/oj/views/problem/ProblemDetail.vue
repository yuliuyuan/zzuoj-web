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

          <el-row>
            <el-col :span="8">
              <el-form-item label="Input" class="blueTitle" style="text-align: left;" :span="8">
                <div class="problemContent">{{this.problem.input}}</div>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="Output" class="blueTitle" style="text-align: left;" :span="8">
                <div class="problemContent">{{this.problem.output}}</div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="Sample Input" class="blueTitle" style="text-align: left;">
                <div class="problemContent">{{this.problem.sampleInput}}</div>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="Sample Output" class="blueTitle" style="text-align: left;">
                <div class="problemContent">{{this.problem.sampleOutput}}</div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="Source" class="blueTitle" style="text-align: left;">
            <div class="problemContent">{{this.problem.source}}</div>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>

      <el-row>
        <el-col span="5">
          <el-button type="primary" @click="handleSubmit()" style="position: relative;left: 30px; top: 0px">提交</el-button>
        </el-col>

        <el-col :span="8">
          <div>
            <el-select v-model="lang" placeholder="语言" style="position: relative; left: 30px; width: 80px;">
              <el-option
                  v-for="item in options"
                  :key="item.lang"
                  :label="item.label"
                  :value="item.lang">
              </el-option>
            </el-select>
          </div>

        </el-col>
      </el-row>


      <div class="problemUpload">
        <el-form ref="this.problem" :model="this.problem" label-position="top">
          <el-form-item class="blueTitle" style=" text-align: left;">
            <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 1000}"
                placeholder=""
                v-model="textarea"
                style="BACKGROUND-COLOR: transparent;">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
<!--    problem右侧信息-->
    <div class="problemInfo">
      <el-button @click="routerToSubmission" icon="el-icon-s-grid">Submissions</el-button>
    </div>
  </div>

</template>

<script>
import api from '@/util/api.js'
import {mapGetters} from "vuex";


export default {
  name: 'ProblemView',
  props: ['problemId'],
  data() {
    return {
      problem : {},
      textarea: '',
      options: [{
        lang: 1,
        label: 'c'
      }, {
        lang: 2,
        label: 'c++'
      }, {
        lang: 4,
        label: 'java'
      }, {
        lang: 8,
        label: 'python'
      }, {
        lang: 16,
        label: 'go'
      }],
      lang: 1,

    }
  },

  computed:{
    ...mapGetters(["userIdGetter"])
  },


  mounted() {
    this.handleGetProblemById(this.$route.params.problemId)
  },

  methods: {
    handleGetProblemById(pId) {
      var temp = [pId]
      api.getProblemByIds({problemIds : temp + ''} ).then( res => {
        this.problem = res[0];
        console.log(this.problem)
      }).catch( err => {
        alert(err)
      })
    },

    handleSubmit(){
      //todo: 这个地方应该对数据先做个验证
      if(this.lang == 0 ) {
        alert("select language")
        return
      }
      if(this.textarea == ''){
        alert("input your code")
        return
      }
      var data = {
        problemId:   this.$route.params.problemId,
        userId: this.userIdGetter,
        inDate: new Date(),
        language: this.lang,
        valid: 1,
        code: this.textarea,
      }

      api.submitCode(data).then(res => {
        alert("submit success")
      }).catch( err => {
        alert("submit fail")
      })
    },

    routerToSubmission(){
      this.$router.push({
        path: '/submission',
        query: {
          problemId: this.$route.params.problemId
        }
      })
    },

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
  width: 1350px;
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

  color: black;
  font-family:"Times New Roman", Times, serif;
  font-size:17px;
}

.problemUpload {
  width: 1235px;

}

.problemInfo {
  position: relative;

  top: 10px;
  left: 1450px;
}
</style>
