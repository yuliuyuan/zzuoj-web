<template>
  <div class="article">
    <div class="articleTitle">
      <h1>{{this.newsShow.title}}</h1>
    </div>
    <el-divider></el-divider>
    <div class="articleContent">
      {{this.newsShow.content}}
    </div>
  </div>
</template>


<script>
import api from '@/util/api.js'


export default {
  name: 'ArticleView',
  props: ['id'],
  data() {
    return {
      newsShow: {title:"兜底",content:"兜底"},
    }
  },

  //值的绑定
  computed: {

  },

  methods: {
    handleGetNewByNewId: function (newId) {

      var params = {id : newId}
      api.getNewById(params).then( res => {
        this.newsShow = res;
        console.log("------ ")
        console.log(this.newsShow)
      }).catch( err => {
        console.log("get new by id err:" + err);
      })
    }
  },

  mounted() {
    console.log("+++++++++++"+this.$route.params.id)
    this.handleGetNewByNewId(this.$route.params.id);
  }
}
</script>

<style>
.article{
  position: relative;
  /*border: 1px solid rgb(185, 185, 185);*/
  background-color: #fff;

  /*width: 500px;*/
}

.articleTitle {
  position: relative;
}

.articleContent {
  position: relative;
  /*left: 60px;*/
  /*width: 1270px;*/
}
</style>
