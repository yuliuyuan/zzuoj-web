<template>
  <div class="main">
    <!--    contest主体    -->
    <div class="contestDetail">
      <div class="contestHeader">
        {{this.contest.title}}
      </div>
      <el-divider></el-divider>

      <div class="contestContent">
        <el-form ref="this.contest" :model="this.contest" label-position="top">
          <!--        text-align不能放到blueTitle里-->
          <el-form-item label="Description" class="blueTitle" style="text-align: left;">
            <div class="contestContent">{{this.contest.description}}</div>
          </el-form-item>

          <el-form-item label="Input" class="blueTitle" style="text-align: left;">
            <div class="contestContent">{{this.contest.input}}</div>
          </el-form-item>

          <el-form-item label="Output" class="blueTitle" style="text-align: left;">
            <div class="contestContent">{{this.contest.output}}</div>
          </el-form-item>

          <el-form-item label="Sample Input" class="blueTitle" style="text-align: left;">
            <div class="contestContent">{{this.contest.sampleInput}}</div>
          </el-form-item>

          <el-form-item label="Sample Output" class="blueTitle" style="text-align: left;">
            <div class="contestContent">{{this.contest.sampleOutput}}</div>
          </el-form-item>

          <el-form-item label="Sourcet" class="blueTitle" style="text-align: left;">
            <div class="contestContent">{{this.contest.source}}</div>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>

      <div class="contestUpload">
        <el-form ref="this.contest" :model="this.contest" label-position="top">
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
    <!--    contest右侧信息-->
    <div class="contestInfo">

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
      contest : {},
      textarea: '',
    }
  },

  mounted() {
    this.handleGetContestById(this.$route.params.contestId)
  },
  methods: {
    handleGetContestById(pId) {
      var params = {contestId : pId}
      api.getContestById(params).then( res => {
        this.contest = res;
        console.log(this.contest)
      }).catch( err => {
        alert(err)
      })
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



.blueTitle .el-form-item__label{
  color: blue;

  position: relative;
  left: 30px;

  font-family:"Times New Roman", Times, serif;
  font-size:23px;
}

.contestContent {
  position: relative;
  left: 30px;
  width: 1240px;

  font-family:"Times New Roman", Times, serif;
  font-size:17px;
}

</style>
