<template>

  <el-menu router :default-active="this.activeIndex" class="el-menu-demo" mode="horizontal"  active-text-color="red"  >
    <el-menu-item  class="menu-item">
      <div class="zzuoj">
        ZZUOJ
      </div>
<!--      <img src="@/assets/logo.png" height="30" width="100"/>-->
    </el-menu-item>
    <el-menu-item index="/home" class="menu-item" >Home</el-menu-item>
    <el-menu-item index="/problem" class="menu-item">Problem</el-menu-item>
    <el-menu-item index="/contest" class="menu-item">Contest</el-menu-item>
<!--    <el-menu-item index="/experiment" class="menu-item">Experiment</el-menu-item>-->
    <el-menu-item index="/submission" class="menu-item">Submission</el-menu-item>
    <el-menu-item index="/about" class="menu-item">About</el-menu-item>


    <div class="afterLogin" v-if="this.isLoginGetter">
      <el-menu-item  class="menu-item right-menu-item">
        <el-col :span="8">
          <el-dropdown>
              <span class="el-dropdown-link">
               {{this.userIdGetter}}<i class="el-icon-arrow-down el-icon--right"> </i>
              </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-circle-check" @click="routerToProfile()">profile</el-dropdown-item>
              </el-dropdown-menu>

              <el-dropdown-menu v-if="this.isAdminGetter">
                <el-dropdown-item icon="el-icon-circle-check" @click="swapToManagePage()">Manage</el-dropdown-item>
              </el-dropdown-menu>

              <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-circle-check" @click="logOut()">LogOut</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-menu-item>
    </div>

    <div class="beforeLogin" v-if="!this.isLoginGetter">
      <el-menu-item index="/login" class="menu-item right-menu-item">Login</el-menu-item>
      <el-menu-item index="/registry" class="menu-item right-menu-item">Register</el-menu-item>
    </div>
  </el-menu>

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

    routerToProfile(){
      this.$router.push("/profile/" + this.userIdGetter)
    },

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
.zzuoj {
  font-weight: bold;
  font-size: 30px;
}

.right-menu-item {
  display: inline-block;
  float: right;
}

.afterLogin {
  position: relative;

  right: 30px;
}
</style>
