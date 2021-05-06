<template>

  <el-mu router :default-active="this.activeIndex" class="el-menu-demo" mode="horizontal"  active-text-color="red"  >
    <el-menu-item  class="menu-item">
      <img src="../../../assets/logo.png" height="30" width="30"/>
    </el-menu-item>
    <el-menu-item index="/home" class="menu-item" >Home</el-menu-item>
    <el-menu-item index="/problem" class="menu-item">Problem</el-menu-item>
    <el-menu-item index="3" class="menu-item">Contest</el-menu-item>
    <el-menu-item index="4" class="menu-item">Experiment</el-menu-item>
    <el-menu-item index="5" class="menu-item">Submission</el-menu-item>
    <el-menu-item index="/about" class="menu-item">About</el-menu-item>
<!--    <div class="afterLogin" v-if="this.isLoginGetter">-->
<!--      <el-menu-item  class="menu-item right-menu-item">-->
<!--        <el-col :span="8">-->
<!--          <el-dropdown>-->
<!--            <span class="el-dropdown-link">-->
<!--             {{this.userIdGetter}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"> </i>-->
<!--            </span>-->
<!--            <template #dropdown>-->
<!--              <el-dropdown-menu>-->
<!--                <el-dropdown-item icon="el-icon-circle-check" @click="swapToManagePage()">Manage</el-dropdown-item>-->
<!--              </el-dropdown-menu>-->

<!--              <el-dropdown-menu>-->
<!--                <el-dropdown-item icon="el-icon-circle-check" @click="logOut()">LogOut</el-dropdown-item>-->
<!--              </el-dropdown-menu>-->
<!--            </template>-->
<!--          </el-dropdown>-->
<!--        </el-col>-->
<!--      </el-menu-item>-->
<!--    </div>-->
    <div class="beforeLogin" v-if="!this.isLoginGetter">
      <el-menu-item index="/login" class="menu-item right-menu-item">Login</el-menu-item>
      <el-menu-item index="/registry" class="menu-item right-menu-item">Register</el-menu-item>
    </div>
  </el-mu>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      activeIndex: '/',
      // temp : false,
    };
  },

  created() {
    var temp = window.location.href.split('?')[0]
    this.activeIndex = '/' + temp.split('/')[3]
  },

  computed:{
    ...mapGetters(["isLoginGetter","isAdminGetter","userIdGetter"])
  },

  mounted() {
  },

  methods: {
    ...mapActions(['clearProfile']),

    swapToManagePage(){
      this.$router.push("/admin/news/show");
    },
    logOut(){
      this.clearProfile();
      localStorage.removeItem("Authorization")
      console.log("123123")
      location.reload()
    },
  }
}
</script>

<style>

.right-menu-item {
  display: inline-block;
  float: right;
}

.afterLogin {
  position: relative;

  right: 30px;
}
</style>
