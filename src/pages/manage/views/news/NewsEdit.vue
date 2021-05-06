<template>
  <div class="Main">
    <div class="Title">
      <p>添加新闻</p>
    </div>
    <el-divider></el-divider>

    <div class="Content">
      <el-form ref="form" :model="this.form"  label-width="80px" >
        <el-form-item class="ContentTitle" >
          <el-input v-model="this.form.title" style="width: 300px;" placeholder="请输入文章题目"></el-input>
        </el-form-item>
        <el-form-item class="Buttons">
          <el-switch
              v-model='this.form.importance'
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="2"
              style="padding-left: 550px"
          > </el-switch>开启置顶
          <el-switch
              v-model='this.form.defunct'
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="Y"
              inactive-value="N"
              style="padding-left: 170px"
          > </el-switch>开启屏蔽
        </el-form-item>

        <el-form-item class="ContentMain">
          <el-input v-model="this.form.content"  placeholder="请输入文章内容" type="textarea" :rows="25"></el-input>
        </el-form-item>
      </el-form>



      <div class="Button">

        <el-button type="primary" @click="handleUpdateNews(this.form)">提交</el-button>
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
        newsId: 0,
        title: '',
        content: '',
        defunct: 'N',
        // importance,2表示是普通级别，1表示是置顶
        importance: 2,
      },
    }
  },

  mounted() {
    this.handleGetNewByNewId();
  },

  methods: {
    handleGetNewByNewId: function () {
      var params = {id : this.$route.params.id}
      api.getNewById(params).then( res => {
        this.form.newsId =
        this.form.title = res.title;
        this.form.content = res.content;
        this.form.defunct = res.defunct;
        this.form.importance = res.importance;
        console.log(this.form);
      }).catch( err => {
        console.log("get new by id err:" + err);
      })
    },

    handleUpdateNews: function () {
      var data = {newsId : Number(this.$route.params.id), title : this.form.title,
                    content : this.form.content, defunct : this.form.defunct,
                    importance : this.importance}
      api.updateNews(data).then( res => {
        alert("update news success")
      }).catch( err => {
        alert("update news fail")
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
