<template>
  <div class="problem">
    <div class="problemHeader">
      {{this.problem.title}}
    </div>
    <div class="problemContent">
      <template>
        <el-form ref="problem" :model="problem" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="problem.title"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </div>

    <div class="problemUpload">

    </div>
  </div>
  {{this.problem}}

</template>

<script>
import api from '@/util/api.js'


export default {
  name: 'ProblemView',
  props: ['problemId'],
  data() {
    return {
      problem : {},
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

</style>
