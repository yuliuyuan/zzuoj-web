<template>
  <el-menu :default-active="currentMenu" class="el-menu-demo" mode="horizontal"  active-text-color="red" router="true" >
    <el-menu-item  class="menu-item">
      <img src="../../../assets/logo.png" height="30" width="30"/>
    </el-menu-item>
    <el-menu-item index="/" class="menu-item" >Home</el-menu-item>
    <el-menu-item index="/problem" class="menu-item">Problem</el-menu-item>
    <el-menu-item index="3" class="menu-item">Contest</el-menu-item>
    <el-menu-item index="4" class="menu-item">Experiment</el-menu-item>
    <el-menu-item index="5" class="menu-item">Submission</el-menu-item>
    <el-menu-item index="/about" class="menu-item">About</el-menu-item>
    <div >
      <el-menu-item class="menu-item right-menu-item" @click="swapToManagePage()">爬去后台</el-menu-item>
      <el-menu-item index="/login" class="menu-item right-menu-item">Login</el-menu-item>
      <el-menu-item index="/registry" class="menu-item right-menu-item">Register</el-menu-item>
    </div>
  </el-menu>
</template>

<script>

export default {
  data() {
    return {
      currentMenu: '/'
    };
  },

  mounted() {
    console.log(this.$route.path)
    this.currentMenu = this.$route.path.split('/')[0]
  },

  methods: {
    swapToManagePage(){
      this.$router.push("/admin/")
    }
  }
}
</script>

<style>

.right-menu-item {
  display: inline-block;
  float: right;
}
</style>
