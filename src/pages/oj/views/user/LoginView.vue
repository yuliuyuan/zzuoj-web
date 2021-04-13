<template>
  <div class="login">
    <div class="loginTitle">
      <p>Welcome to zzuoj～</p>
    </div>
    <div class="loginFrom">
      <el-form ref="form" :model="form" :rules="loginRules" label-width="80px" >
        <el-form-item label="username" >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="password">
          <el-input type="password" :model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text">Forget PassWord</el-button>
          <el-button type="text" @click="handleLogin()">Login</el-button>
          <el-button type="text" @click="handleTest()">test</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
import api from '@/util/api';

export default {
  name: 'LoginView',
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
      api.test();
    }
  }
}
</script>

<style>

.login {
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;

  position: absolute;
  width: 390px;
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
}
</style>
