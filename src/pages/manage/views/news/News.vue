<template>
  <div class="article">
    <div class="articleTitle">
      <h1 >{{this.newsShow.title}}</h1>
    </div>
    <el-divider></el-divider>

    <div class="articleContent" style="white-space: pre-line; text-align: left">
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
      }).catch( err => {
        alert("get news by id error")
      })
    }
  },

  mounted() {
    this.handleGetNewByNewId(this.$route.params.id);
  }
}
</script>


<style>
.article{
  position: relative;
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;
}

.articleTitle {
  position: relative;
  text-align: center;

  left: 0px;
  height: 50px;
}

/*.articleContent {*/
/*  position: relative;*/
/*  left: 60px;*/
/*  width: 1270px;*/
/*}*/
</style>
