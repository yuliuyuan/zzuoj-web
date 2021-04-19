<template>
  <div class="Main">
    <div class="Title">
      <p>添加新闻</p>
    </div>
    <el-divider></el-divider>
    <div class="Content">
      <el-form ref="form" :model="form"  label-width="80px" >
        <el-form-item class="ContentTitle">
          <el-input v-model="form.title" style="width: 300px;" placeholder="请输入文章题目"></el-input>
        </el-form-item>

        <el-form-item class="ContentMain">
          <el-input v-model="form.content"  placeholder="请输入文章内容" type="textarea" :rows="25"></el-input>
        </el-form-item>

      </el-form>
      <div class="Button">
        <el-button type="primary" @click="handleAddNews(this.form)">提交</el-button>
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
        title: '',
        content: '',
      },
    }
  },

  methods: {
    handleAddNews(data){
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

.ContentTitle {
  text-align: center;
}
.ContentMain {
}

.Button {
  text-align: right;
}

</style>
