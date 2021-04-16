<template>
  <el-menu router :default-active="'/'+this.$route.path.split('/')[1]" class="el-menu-demo" mode="horizontal"  active-text-color="red"  >
    <el-menu-item  class="menu-item">
      <img src="../../../assets/logo.png" height="30" width="30"/>
    </el-menu-item>
    <el-menu-item index="/home" class="menu-item" >Home</el-menu-item>
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

import router from "../../../router";

export default {
  data() {
    return {
    };
  },

  watch:{

  },

  mounted() {
    //启动页面自动跳转到/home
    // if(this.$route.path.split('/')[1] == ''){
    //   this.$router.push("/home/")
    // }
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
