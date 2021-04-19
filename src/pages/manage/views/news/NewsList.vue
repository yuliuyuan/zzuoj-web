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
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
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
      pageSize: 3,
    }
  },

  created() {
    this.currentPage = local_store.getContextDataSessionStorage("currentArticleListPageAdmin")

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
    ...mapGetters(['newsListGetter', 'newByIdGetter', 'pageIndexGetter','newsCntGetter']),
  },
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
        //
        local_store.setContextDataInSessionStorage("currentArticleListPageAdmin", this.currentPage);
        // this.setContextData("currentArticleListPage", this.currentPage)
        this.routerToNewsList();
      }).catch( err => {
        console.log("handleCurrentChange error:" + err)
      })
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    routerToArticle: function (newsId){
      this.$router.push('/admin/news/show/'+newsId)
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
