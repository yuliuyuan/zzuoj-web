<template>
  <div class="main">
    <!--    contest主体    -->
    <div class="contestDetail">
      <div class="contestHeader">
        {{this.contest.title}}
      </div>
      <el-divider></el-divider>
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
