<template>
  <div class="article">
    <div class="articleTitle">
      <h1>{{this.newShow.title}}</h1>
    </div>
    <div class="articleContent">
      {{this.newShow.content}}
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
      newShow: {title:"兜底",content:"兜底"},
    }
  },

  //值的绑定
  computed: {
  },

  methods: {
    handleGetNewByNewId: function (newId) {
      var params = {id : newId}
      api.getNewById(params).then( res => {
        this.newShow = res;
      }).catch( err => {
        console.log("get new by id err:" + err);
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
  position: absolute;
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;

  position: absolute;
  /*width: 500px;*/
  top: 100px;
  left: 200px;
  right: 200px;
}

.articleTitle {
  position: relative;
  left: 0px;
  height: 50px;
}

.articleContent {
  position: relative;
  left: 60px;
  width: 1270px;
}
</style>
