<template>
  <div class="Main">
    <div class="Title">
      <p>添加问题</p>
    </div>
    <el-divider></el-divider>
    <div class="Content">
      <el-form ref="form" :model="this.form"  label-width="80px" >
        <el-form-item label="标题">
          <el-input v-model="this.form.title" style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="时限" >
          <el-input v-model="this.form.timeLimit" style="width: 70px;"></el-input>
          <span style="position:relative; left: 10px">S</span>
        </el-form-item>

        <el-form-item label="内存限制" >
          <el-input v-model="this.form.memoryLimit" style="width: 70px;"></el-input>
          <span style="position:relative; left: 10px">MB</span>
        </el-form-item>

        <el-form-item label="描述" >
          <el-input v-model="this.form.description"></el-input>
        </el-form-item>

        <el-form-item label="输入描述" >
          <el-input v-model="this.form.input"></el-input>
        </el-form-item>

        <el-form-item label="输出描述" >
          <el-input v-model="this.form.output"></el-input>
        </el-form-item>

        <el-form-item label="输入" >
          <el-input v-model="this.form.sampleInput"></el-input>
        </el-form-item>

        <el-form-item label="输出" >
          <el-input v-model="this.form.sampleOutput"></el-input>
        </el-form-item>

        <el-form-item label="提示" >
          <el-input v-model="this.form.hint"></el-input>
        </el-form-item>

        <el-form-item label="是否特判" >
          <el-radio v-model="this.form.spj" label="1">Yes</el-radio>
          <el-radio v-model="this.form.spj" label="0">No</el-radio>
        </el-form-item>

        <el-form-item label="是否可见" >
          <el-radio v-model="this.form.defunct" label="N">Yes</el-radio>
          <el-radio v-model="this.form.defunct" label="Y">No</el-radio>
        </el-form-item>

        <el-form-item label="来源" >
          <el-input v-model="this.form.source"></el-input>
        </el-form-item>
      </el-form>
      <div >
        <el-button type="primary" @click="handleUpdateProblem(this.form)">提交</el-button>
      </div>
    </div>
  </div>
</template>


<script>

import api from "@/util/api.js";
import {mapGetters} from "vuex";

export default {
  name: 'ProblemAdd',
  props: ['id'],
  data() {
    return {
      form: {
        title: 'a+b problem',
        timeLimit: 1,
        memoryLimit: 128,
        description: '题目内容',
        input: '输入描述',
        output: '输出描述',
        sampleInput: '1 2',
        sampleOutput: '3',
        hint: '没啥注意',
        //有关特判
        spj: '0',
        isShow: '1',
        source: 'zzuoj',
        defunct: 'Y',
      },

    }
  },

  mounted() {
    this.handleGetProblemById(this.$route.params.id)
  },

  methods: {
    handleGetProblemById(pId) {
      var temp = [pId]
      api.getProblemByIds({problemIds : temp + ''} ).then( res => {
        this.form = res[0];
      }).catch( err => {
        alert(err)
      })
    },
    handleUpdateProblem(){
      api.updateProblem(this.form).then( res => {
        alert("update problem success")
      }).catch( err => {
        alert("update problem fail")
      })
    },
  }
}
</script>

<style>

</style>
