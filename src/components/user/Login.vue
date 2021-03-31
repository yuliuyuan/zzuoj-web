<template>
  <div class="login">
    <div class="welcome">
      <p>Welcome to zzuoj～</p>
    </div>
    <div class="container">
      <el-form ref="form" :model="form" :rules="loginRules" label-width="80px" >
        <el-form-item label="username">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="password">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="text">Forget PassWord</el-button>
          <el-button type="text" @click="handleLogin()">Login</el-button>
<!--          <el-button type="text" @click="handleTest()">test</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
import api from '_u/api';
// import { mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        name: '',
        password: '',
      },
      loginRules: {
        username:[
          {required: true, trigger: 'blut'}
        ],
      }
    }
  },
  methods: {
    handleLogin: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          api.login(this.loginForm).then(ret => {
            this.setProfile(ret);
            this.$router.replace(this.$route.query.to || '/');
          }).catch(err => {
            this.$Message.error(err.message);
          });
        }
      })
    },
    handleTest: function () {
      console.log("ttt");
      axios.get("http://localhost:8201/auth/test/show")
          .then(function(response){
            console.log(response);
          },function(err){
            console.log(err);
          })
    }
  }
}
</script>

<style>

.login {
  position: absolute;
  width: 300px;
  height: 700px;
  top: 100px;
  left: 700px;
  right: 0;
  bottom: 0;
}
</style>
