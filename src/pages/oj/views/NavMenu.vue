<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color="red" router="true">
      <el-menu-item  class="menu-item">
        <img src="../../../assets/logo.png" height="30" width="30"/>
      </el-menu-item>

      <el-menu-item index="/home" class="menu-item">Home</el-menu-item>
      <el-menu-item index="2" class="menu-item">Problem</el-menu-item>
      <el-menu-item index="3" class="menu-item">Contest</el-menu-item>
      <el-menu-item index="4" class="menu-item">Experiment</el-menu-item>
      <el-menu-item index="5" class="menu-item">Submission</el-menu-item>
      <el-menu-item index="/about" class="menu-item">About</el-menu-item>
      <div>
        <el-menu-item index="/login" class="menu-item right-menu-item">Login</el-menu-item>
        <el-menu-item index="/registry" class="menu-item right-menu-item">Register</el-menu-item>
      </div>
  </el-menu>
  <div class="line"></div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
