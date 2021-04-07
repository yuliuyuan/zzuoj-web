<template>
  <div class="ManageApp">
    <HomeView></HomeView>
  </div>
</template>

<script>
import HomeView from "@manage/views/home/HomeView";

export default {
  name: 'ManageApp',
  components: {
    HomeView
  }
}
</script>

<style>
.ManageApp {
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
