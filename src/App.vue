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

export default {
  name: 'app',

  data() {
    return {
      isBackedManage: false
    }
  },
  watch:{
    $route(to,from){
      if(to.path.indexOf("/admin") == 0){
        this.isBackedManage = true;
      } else {
        this.isBackedManage = false;
      }
    }
  },

  components: {
    'navmenu': NavMenu,
    'navmenumanage': NavMenuManage,
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
