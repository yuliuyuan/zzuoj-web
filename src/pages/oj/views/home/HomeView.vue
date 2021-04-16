<template>
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

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      newsCnt: 0,
      pageSize: 3,
    }
  },

  created() {
    this.currentPage = this.getContextData("currentArticleListPage")
  },

  computed: {
    ...mapGetters(['newsListGetter', 'newByIdGetter', 'pageIndexGetter','newsCntGetter']),

  },

  //当前页面a a->b->a 跳转页面之后回来还会执行mounted，但是不会执行data中的初始化
  mounted() {

    if( this.newsListGetter.length != 0 && this.pageIndexGetter == this.currentPage && this.newsCntGetter != this.newsCnt ){
      this.newsCnt = this.newsCntGetter
      this.tableData = this.newsListGetter
      this.currentPage = this.pageIndexGetter
    } else {
      this.handleNewsCnt();
      this.handleCurrentChange(this.currentPage);
    }
    // this.routerToListPage();
  },

  //前端是否要存储数据
  methods: {
    ...mapActions(['setNewsList','setPageIndex','setNewsCnt']),
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
        this.tableData = res;
        this.currentPage = pos;
        //更新vuex中的值
        this.setNewsList(res);
        this.setPageIndex(pos)

        this.setContextData("currentArticleListPage", this.currentPage)
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

    // 在sessionStorage设置值
    setContextData: function (key, value) {
      if (typeof value == "string") {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    // 从sessionStorage取值
    getContextData: function (key) {
      const str = localStorage.getItem(key);
      if (typeof str == "string") {
        try {
          return JSON.parse(str);
        } catch (e) {
          return str;
        }
      }
      return;
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
