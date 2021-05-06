<template>
<!--  <div class="test">-->
<!--    <button @click="routerToProblem()">test</button>-->
<!--  </div>-->
  <div class="home">
    <div class="homeTitle" >
      <div class="homeTitleName">
        Announcements
      </div>
      <div class="homeTitleButton">
        <el-button type="primary" icon="el-icon-refresh" style="right: 0px" @click="handleCurrentChange(this.currentPage)">refresh</el-button>
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
            <el-button  @click="routerToArticle(scope.row.newsId)">{{scope.row.title}} </el-button>
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

        <!--        </el-table-column>-->
        <!--          <template #header>-->
        <!--            <el-input-->
        <!--                v-model="search"-->
        <!--                size="mini"-->
        <!--                placeholder="输入关键字搜索"/>-->
        <!--          </template>-->
        <!--          <template #default="scope">-->
        <!--            <el-button-->
        <!--                size="mini"-->
        <!--                @click="handleEdit(scope.row.newsId)">Edit</el-button>-->
        <!--            <el-button-->
        <!--                size="mini"-->
        <!--                type="danger"-->
        <!--                @click="handleDelete(scope.row.newsId)">Delete</el-button>-->
        <!--          </template>-->
        <!--        <el-table-column>-->
      </el-table>
    </div>


<!--    分页光标、刷新回到第一页解决方法： https://www.jianshu.com/p/0ac112bb19e8-->
    <div class="block">
      <el-pagination
          @current-change="handleCurrentChange(this.currentPage)"
          v-model:currentPage="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="newsCnt"
          v-if="this.newsCnt != 0">
      </el-pagination>

    </div>


  </div>

</template>

<script>
import api from '@/util/api';
import { mapGetters, mapActions } from 'vuex'
import local_store from '@/util/local_store.vue'

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      newsCnt: 0,
      pageSize: 8,
    }
  },

  created() {
    // this.currentPage = this.getContextData("currentArticleListPage")
    this.currentPage = local_store.getContextDataLocalStorage("currentArticleListPage")
  },

  computed: {
    ...mapGetters(['newsListGetter', 'newByIdGetter','newsPageIndexGetter', 'newsCntGetter']),
  },

  //当前页面a a->b->a 跳转页面之后回来还会执行mounted，但是不会执行data中的初始化
  mounted() {

    if( this.newsListGetter.length != 0 && this.newsPageIndexGetter == this.currentPage && this.newsCntGetter != this.newsCnt ){
      this.newsCnt = this.newsCntGetter
      this.tableData = this.newsListGetter
      this.currentPage = this.newsPageIndexGetter
    } else {
      this.handleNewsCnt();
      this.handleCurrentChange(this.currentPage);
    }
  },

  //前端是否要存储数据
  methods: {
    ...mapActions(['setNewsList','setNewsPageIndex','setNewsCnt']),
    handleNewsCnt(){
      api.getNewsCnt().then( res => {
        this.newsCnt = res;
        //更新vuex中的值
        this.setNewsCnt(res);
      }).catch( err => {
        console.log("get news cnt error:" + err)
      })
    },
    handleCurrentChange(pos) {
      var params = {pos: pos, limit: this.pageSize}
      api.getNewsList(params).then( res => {
        console.log(res)
        this.tableData = res;
        this.currentPage = pos;
        //更新vuex中的值
        this.setNewsList(res);
        this.setNewsPageIndex(pos)

        local_store.setContextDataInLocalStorage("currentArticleListPage", this.currentPage)
        this.routerToListPage();
      }).catch( err => {
        console.log("handleCurrentChange error:" + err)
      })
    },



    routerToArticle: function (newsId){
      this.$router.push('/home/article/'+newsId)
    },

    routerToListPage: function (){
      this.$router.push({
        path: '/home/list',
        query: {
          pos: this.currentPage,
          limit: this.pageSize,
        }
      })
    },
    // routerToProblem: function () {
    //   this.$router.push('/problem')
    // }
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
