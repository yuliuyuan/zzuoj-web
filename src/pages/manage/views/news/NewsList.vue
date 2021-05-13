<template>
  <!--      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"-->
  <el-table
      :data="tableData"
      stripe
      style="width: 100%">
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
    <el-table-column
        align="right">
      <template #header>
        <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
      </template>
      <template #default="scope">
        <el-button
            size="mini"
            @click="handleEdit(scope.row.newsId)">Edit</el-button>
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.newsId)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

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
    var temp = local_store.getContextDataLocalStorage("currentArticleListPageAdmin")
    if( temp != null ){
      this.currentPage = temp
    } else {
      this.currentPage = 1
    }
  },

  mounted() {
    if( this.newsListGetter.length != 0 && this.pageIndexGetter == this.currentPage && this.newsCntGetter != this.newsCnt ){
      this.newsCnt = this.newsCntGetter
      this.tableData = this.newsListGetter
      this.currentPage = this.pageIndexGetter
    } else {
      this.handleNewsCnt();
      this.handleCurrentChange(this.currentPage);
    }
  },

  computed: {
    ...mapGetters(['newsListGetter', 'newByIdGetter', 'newsPageIndexGetter','newsCntGetter']),
  },
  methods: {
    ...mapActions(['setNewsList','setNewsPageIndex','setNewsCnt']),

    handleNewsCnt(){
      api.getNewsCnt().then( res => {
        this.newsCnt = res;
        //更新vuex中的值
        this.setNewsCnt(res);
      }).catch( err => {
        alert(err);
      })
    },
    handleCurrentChange(pos) {
      var params = {pos: pos, limit: this.pageSize}
      api.getNewsList(params).then( res => {
        this.tableData = res;
        this.currentPage = pos;
        //更新vuex中的值
        this.setNewsList(res);
        this.setNewsPageIndex(pos)
        //
        local_store.setContextDataInLocalStorage("currentArticleListPageAdmin", this.currentPage);
        // this.setContextData("currentArticleListPage", this.currentPage)
        this.routerToNewsList();
      }).catch( err => {
        alert(err);
      })
    },

    handleEdit(newsId) {
      this.$router.push("/admin/news/show/edit/" + newsId)
    },
    handleDelete(newsId) {
      var params = {id : newsId}
      api.deleteNews(params).then( res => {
        //todo: 修改返回数据的方式
        alert(res)
        this.handleCurrentChange(this.currentPage)
      }).catch( err => {
        alert("delete news fail!")
      })
    },

    routerToArticle: function (newsId){
      this.$router.push('/admin/news/show/' + newsId)
    },

    routerToNewsList: function (){
      this.$router.push({
        path: '/admin/news/show',
        query: {
          pos: this.currentPage,
          limit: this.pageSize,
        }
      })
    }

  }
}
</script>

<style>

</style>
