<template>
  <el-menu :default-openeds="['1', '3']" class="el-menu-demo" mode="horizontal"  active-text-color="DodgerBlue" router="true" >
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
