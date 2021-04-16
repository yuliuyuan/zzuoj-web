<template>
  <div class="Main">
    <div class="Title">
      <p>添加问题</p>
    </div>
    <el-divider></el-divider>
    <div class="Content">
      <el-form ref="form" :model="form"  label-width="80px" >
        <el-form-item label="标题">
          <el-input v-model="form.title" style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="时限" >
          <el-input v-model="form.timeLimit" style="width: 70px;"></el-input>
          <span style="position:relative; left: 10px">S</span>
        </el-form-item>

        <el-form-item label="内存限制" >
          <el-input v-model="form.memoryLimit" style="width: 70px;"></el-input>
          <span style="position:relative; left: 10px">MB</span>
        </el-form-item>

        <el-form-item label="描述" >
          <el-input v-model="form.description"></el-input>
        </el-form-item>

        <el-form-item label="输入描述" >
          <el-input v-model="form.inputDescription"></el-input>
        </el-form-item>

        <el-form-item label="输出描述" >
          <el-input v-model="form.outputDescription"></el-input>
        </el-form-item>

        <el-form-item label="输入" >
          <el-input v-model="form.input"></el-input>
        </el-form-item>

        <el-form-item label="输出" >
          <el-input v-model="form.output"></el-input>
        </el-form-item>

        <el-form-item label="所有输入" >
          <el-input v-model="form.inputAll"></el-input>
        </el-form-item>

        <el-form-item label="所有输出" >
          <el-input v-model="form.outputAll"></el-input>
        </el-form-item>

        <el-form-item label="提示" >
          <el-input v-model="form.hint"></el-input>
        </el-form-item>

        <el-form-item label="是否特判" >
          <el-radio v-model="form.isSpecialJudge" label="1">Yes</el-radio>
          <el-radio v-model="form.isSpecialJudge" label="0">No</el-radio>
        </el-form-item>

        <el-form-item label="是否可见" >
          <el-radio v-model="form.isShow" label="1">Yes</el-radio>
          <el-radio v-model="form.isShow" label="0">No</el-radio>
        </el-form-item>

        <el-form-item label="来源" >
          <el-input v-model="form.source"></el-input>
        </el-form-item>
      </el-form>
      <div >
        <el-button>清空</el-button>
        <el-button type="primary" @click="handleAddProblem(this.form)">提交</el-button>
      </div>
    </div>
  </div>
</template>


<script>

import api from "@/util/api.js";

export default {
  name: 'ProblemAdd',
  data() {
    return {
      form: {
        title: 'a+b problem',
        timeLimit: 1,
        memoryLimit: 128,
        description: '题目内容',
        inputDescription: '输入描述',
        outputDescription: '输出描述',
        input: '1 2',
        output: '3',
        inputAll: '可以在添加问题之后再统一添加测试点',
        outputAll: '可以在添加问题之后再统一添加测试点',
        hint: '没啥注意',
        //有关特判
        isSpecialJudge: '0',
        isShow: '1',
        source: 'zzuoj',
      },

    }
  },

  methods: {
    handleAddProblem(data){
      api.addProblem(data).then( res => {
        console.log(res);
      }).catch(err => {
        console.log("add problem err" + err);
        //todo: 做个兜底
      })
    }
  }
}
</script>

<style>

</style>
