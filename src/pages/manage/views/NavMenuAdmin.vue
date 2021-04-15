<template>
  <el-menu :default-openeds="['1', '3']" class="el-menu-demo" mode="horizontal"  active-text-color="DodgerBlue" router="true" >
    <el-submenu index="/admin/news">
      <template #title><i class="el-icon-s-grid"></i>新闻管理</template>
      <el-menu-item-group>
        <el-menu-item index="/admin/news/list">新闻列表管理</el-menu-item>
        <el-menu-item index="/admin/news/add ">添加新闻</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="/admin/user">
      <template #title><i class="el-icon-s-grid"></i>用户管理</template>
      <el-menu-item-group>
        <el-menu-item index="/admin/user/list">用户列表</el-menu-item>
        <el-menu-item index="/admin/user/manage">用户权限管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="/admin/problem">
      <template #title><i class="el-icon-s-grid"></i>题目管理</template>
      <el-menu-item-group>
        <el-menu-item index="/admin/problem/list">题目列表管理</el-menu-item>
        <el-menu-item index="/admin/problem/add">添加题目</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="/admin/contest">
      <template #title><i class="el-icon-s-grid"></i>竞赛管理</template>
      <el-menu-item-group>
        <el-menu-item index="/admin/contest/list">竞赛列表管理</el-menu-item>
        <el-menu-item index="/admin/contest/add ">添加竞赛</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="/admin/experiment">
      <template #title><i class="el-icon-s-grid"></i>实验管理</template>
      <el-menu-item-group>
        <el-menu-item index="/admin/experiment/list">实验列表管理</el-menu-item>
        <el-menu-item index="/admin/experiment/add ">添加实验</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-button class="swapButton" @click="swapToUserPage"  type="text">回到前台</el-button>
  </el-menu>
</template>

<script>
export default {
  methods: {
    swapToUserPage(){
      this.$router.push("/")
    }
  }
}
</script>

<style>
.swapButton {
  position: relative;
  left: 45px;
}

</style>
