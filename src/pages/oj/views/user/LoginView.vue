<template>
  <div class="login">
    <div class="loginTitle">
      <p>Welcome to zzuoj～</p>
    </div>
    <div class="loginFrom">
      <el-form ref="form" :model="form" :rules="loginRules" label-width="50px" >
        <el-form-item label="username:" >
          <el-input style="width: 300px;" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="password:">
          <el-input style="width: 300px;" type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text">Forget PassWord</el-button>
          <el-button type="text" @click="handleLogin()">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '@/util/api';
import jwtDecode from 'jwt-decode'
import {mapActions,mapGetters} from "vuex";
import local_store from '@/util/local_store.vue'

export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      loginRules: {
        username:[
          {required: true, trigger: 'blur'}
        ],
      }
    }
  },

  computed:{
    ...mapGetters(['profileGetter']),
  },
  methods: {
    ...mapActions(['setProfile']),

    handleLogin: function() {
        console.log(this.form);
        api.login(this.form).then(token => {
          const decode =  jwtDecode(token);
          var profile = JSON.parse(decode.sub);
          this.setProfile(profile);
          local_store.setContextDataInLocalStorage("Authorization", token)
          this.$router.push("/")
        }).catch(err => {
          alert(err);
        });
    },
  }
}
</script>

<style>

.login {

  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;

  position: absolute;
  width: 450px;
  height: 250px;
  top: 100px;
  left: 700px;
  right: 100px;
  bottom: 500px;
}

.loginTitle {
  position: relative;
  margin-top: 20px;
}

.loginFrom {
  position: relative;
  margin-top: 20px;
  margin-right: 30px;

  left: 20px;
}
</style>
