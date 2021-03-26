<template>
  <div id="app">
    <el-container>
      <el-header><navmenu></navmenu></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import NavMenu from "./components/NavMenu.vue";
export default {
  name: 'App',
  components: {
    'navmenu': NavMenu
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
