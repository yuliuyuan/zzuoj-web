<template>
  <div class="home">
<!--    <div class="showNewsList">{{this.$store.getters.getNewList}}</div>-->
<!--    <div>&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</div>-->
<!--    <div class="showNewsList">{{this.tableDataTemp}}</div>-->

    <div class="homeTitle" >
      <div class="homeTitleName">
        Announcements
      </div>
      <div class="homeTitleButton">
        <el-button type="primary" icon="el-icon-refresh" style="right: 0px" @click="handleShowNews()">refresh</el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="homeForm">
      <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          >
        <el-table-column
            label="Title"
            width="800"
        >
          <template #default="scope">
            <el-button  @click="routerTo1(scope.row.newsId)">{{scope.row.title}} </el-button>
          </template>
        </el-table-column>

        <el-table-column
            prop="userId"
            label="Announcer"
            width="235"
        >
        </el-table-column>

        <el-table-column
            prop="time"
            label="Time"
            width="235"
        >
        </el-table-column>
      </el-table>
    </div>


  </div>

</template>

<script>
import api from '@/util/api';
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      tableData: []
    }
  },

  //它用于观察Vue实例上的数据变动。对应一个对象，键是观察表达式，值是对应回调。值也可以是方法名，或者是对象，包含选项。
  watch: {

  },

  //当前页面a a->b->a 跳转页面之后回来还会执行mounted，但是不会执行data中的初始化
  mounted() {
    if(this.$store.getters.getNewList.length == 0){
      this.handleShowNews();
    }
    this.tableData = this.tableDataTemp
  },

  //先computed再watch，不执行methods；等触发某一事件后，则是：先methods再watch。
  //计算属性：HTML DOM加载后马上执行的，如赋值；
  computed: {
    tableDataTemp:{
      get: function (){
        return this.$store.getters.getNewList
      },
      set: function (newData){
        return this.$store.dispatch('setNewsList',newData)
      }
    }
  },

  //前端是否要存储数据
  methods: {
    handleShowNews: function(){
      api.getNews().then(res => {
        //api.getNews().then是异步的，第一次mounted中的绑定不会生效
        this.tableData = res
        this.tableDataTemp = res || [];
      }).catch(err => {
        //todo: 做个兜底
      })
    },

    routerTo1: function (newsId){
      this.$router.push('/home/article/'+newsId)
    }
  },
}
</script>

<style>
.home {
  position: absolute;
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;

  position: absolute;
  /*width: 500px;*/
  top: 100px;
  left: 200px;
  right: 200px;
}

.homeTitle {
  position: relative;
  left: 0px;
  height: 50px;
}

.homeTitleName {
  position: absolute;
  left: 20px;
  top: 15px;

  font-size:1.875em;
}

.homeTitleButton{
  position: absolute;
  right: 20px;
  top: 15px;
}

.homeForm {
  position: relative;
  left: 60px;
  width: 1270px;
}

</style>
