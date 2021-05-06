<template>
<!--  前端-->
  <div class="user" v-if="!this.isBackedManage">
    <el-container>
      <el-header><navmenu></navmenu></el-header>
      <el-main class="userMain">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
<!-- admin-->
  <div class="admin" v-if="this.isBackedManage">
    <el-container style="border: 1px solid #eee">
      <el-aside class="admin-aside" width="200px" style="background-color: rgb(238, 241, 246)">
        <navmenumanage></navmenumanage>
      </el-aside>

      <el-container>
        <el-header class="admin-header" style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>salix</span>
        </el-header>
        <el-main class="admin-content">
          <router-view name="manage"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import NavMenu from "@oj/views/NavMenu.vue";
import NavMenuManage from "@manage/views/NavMenuAdmin.vue"
import { mapGetters, mapActions } from 'vuex'
import local_store from "@/util/local_store";
import jwtDecode from "jwt-decode";

export default {
  name: 'app',

  data() {
    return {
      isBackedManage: false
    }
  },

  mounted() {
    var token = local_store.getContextDataLocalStorage("Authorization")
    const temp =  jwtDecode(token);
    var userProfile = JSON.parse(temp.sub);
    this.setProfile(userProfile);
  },

  computed: {
    ...mapGetters(['isAdminGetter','profileGetter','problemsListGetter']),
  },

  watch:{
    //监测前后端的界面的切换
    $route(to,from){
      var toPre = to.path.indexOf("/admin");
      var fromPre = from.path.indexOf("/admin")
      if(toPre == 0){
        //user->admin 需要鉴权
        if( fromPre !=0 ){
          if( this.isAdminGetter ){
            this.isBackedManage = true;
            // this.$router.push("/admin/news/show")
          } else {
            this.$router.push("/401");
          }
        } else {
          this.isBackedManage = true;
        }
      } else {
        this.isBackedManage = false;
      }
    }
  },

  components: {
    'navmenu': NavMenu,
    'navmenumanage': NavMenuManage,
  },

  methods: {
    ...mapActions(['setProfile']),
  }
}
</script>

<style>
.user {
  /*background-color: aliceblue;*/
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.userMain {
  /*background-color: aliceblue;*/
}

.admin {
}

.admin-aside {
  background-color: #B3C0D1;
}

.admin-header {
  background-color: #B3C0D1;
  color: #333;
}

.admin-content {
}
</style>
