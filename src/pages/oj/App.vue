<template>
  <div class="OjApp">
    <el-container>
      <el-header><navmenu></navmenu></el-header>
      <el-main class="appMain">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import NavMenu from "@oj/views/NavMenu.vue";
export default {
  name: 'OjApp',
  components: {
    'navmenu': NavMenu
  }
}
</script>

<style>
.OjApp {
  /*background-color: aliceblue;*/

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.appMain {
  /*background-color: aliceblue;*/
}
</style>
