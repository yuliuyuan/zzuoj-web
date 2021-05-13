<template>
  <el-table
      :data="tableData"
      stripe
      style="width: 100%">

    <el-table-column
        label="序号"
        width="60">
      <template #default="scope">
        <span>{{(this.currentPage-1)*this.pageSize+(scope.$index + 1)}} </span>
      </template>
    </el-table-column>

    <el-table-column
        prop="userId"
        label="学号"
        width="180">
    </el-table-column>
    <!--        prop="defunct"-->
    <el-table-column
        prop="email"
        label="邮箱"
        width="180">
    </el-table-column>

    <el-table-column
      prop="defunct"
      label="禁用"
      width="180">
      <template #default="scope">
        <el-switch
            v-model='scope.row.defunct'
            active-color="#ff4949"
            inactive-color="#13ce66"
            active-value="Y"
            inactive-value="N"
            @change="handleChangeDefunctStatus(scope.$index, scope.row.defunct)"
        >
        </el-switch>
      </template>
    </el-table-column>

    <el-table-column
        label="角色"
        width="180">
      <template #default="scope">
        <button plain style="display:inline;" @click="handleUpdateRole(scope.row.userId, scope.row.role)">set</button>
        <el-input placeholder="0:普通用户 2:admin" v-model="scope.row.role" style="display:inline;"></el-input>
      </template>

    </el-table-column>
<!--    <el-table-column-->
<!--        prop="accepted"-->
<!--        label="AC数"-->
<!--        width="180">-->
<!--    </el-table-column>-->
<!--    <el-table-column-->
<!--        prop="submit"-->
<!--        label="提交数"-->
<!--        width="180">-->
<!--    </el-table-column>-->

    <el-table-column
        align="right">
      <template #header>
        <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
      </template>

    </el-table-column>
  </el-table>

  <!--    分页光标、刷新回到第一页解决方法： https://www.jianshu.com/p/0ac112bb19e8-->
  <div class="block">
    <el-pagination
        @current-change="handleCurrentChange"
        v-model:currentPage="this.currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="userCnt"
        v-if="this.userCnt != 0">
    </el-pagination>
  </div>

</template>

<script>
import api from "@/util/api";
import {mapGetters, mapActions} from 'vuex'
import local_store from '@/util/local_store.vue'

export default {
  data() {
    console.log("data data")
    return {
      tableData: [],
      currentPage: 1,
      userCnt: 0,
      pageSize: 8,
    }
  },

  computed:{
    ...mapGetters(['usersListGetter', 'userPageIndexGetter', 'usersCntGetter']),
  },

  created() {
    var temp = local_store.getContextDataLocalStorage("currentUserListPage")
    if( temp == null ){
      this.currentPage = local_store.getContextDataLocalStorage("currentUserListPage")
    }
  },

  mounted() {
    console.log("+++++" + this.currentPage)
    if( this.usersListGetter.length != 0 && this.userPageIndexGetter == this.currentPage && this.usersCntGetter != this.newsCnt ){
      this.userCnt = this.usersCntGetter
      this.tableData = this.usersListGetter
      this.currentPage = this.userPageIndexGetter
    } else {
      console.log("000: "+this.currentPage)
      this.handleUserCnt();
      this.handleCurrentChange(this.currentPage);
    }
  },

  methods: {
    ...mapActions(['setUsersList', 'setUserPageIndex', 'setUsersCnt']),

    handleChangeDefunctStatus(index, newStatus) {
      //先把状态变回去
      this.tableData[index].defunct = newStatus == 'Y' ? 'N':'Y';

      var data = {uid: this.tableData[index].userId, newStatus: newStatus}
      api.switchUserDefunctStatus(data).then( res => {
        this.tableData[index].defunct = newStatus;
      }).catch(err => {
        console.log("切换状态失败");
      })
    },


    handleUserCnt(){
      api.getUserCnt().then( res => {
        this.userCnt = res;
        this.setUsersCnt(res)
      }).catch( err => {
        alert("get user cnt error")
      })
    },

    handleCurrentChange(pos) {
      var data = {pos: pos, limit: this.pageSize}
      api.showUser(data).then( res => {
        console.log(res)
        this.tableData = res;

        this.setUsersList(res);
        this.setUserPageIndex(pos)

        local_store.setContextDataInLocalStorage("currentUserListPage", this.currentPage)
      }).catch( err => {
        alert("get user by page error")
      })
    },

    handleEdit(userId) {
      this.$router.push("/admin/news/show/edit/" + userId)
    },

    handleUpdateRole(userId, role){
      if(role != 0 && role != 2){
        alert("输入的用户权限有误! user:0 admin:2")
        return
      }
      var params = {userId: userId, newPrivilege:role }
      api.updateUserRole(params).then( res => {
        alert("修改权限成功")
      }).catch(err => {
        alert("修改权限失败")
      })
    },
  },
}
</script>

<style>

</style>
