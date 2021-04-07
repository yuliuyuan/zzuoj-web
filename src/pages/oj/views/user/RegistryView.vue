<template>
  <div class="registry">
    <div class="registryTitle">
      Welcome To Registry
    </div>
    <div class="registryFrom">
      <el-form ref="form" :model="form" :rules="registryRules" label-width="130px">
        <el-form-item label="*UserId(学号)">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*Email:">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="*Password:">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="*Confirm Password:">
          <el-input v-model="form.password2"></el-input>
        </el-form-item>
        <el-form-item label="*NickName:">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="*School:">
          <el-input v-model="form.school"></el-input>
        </el-form-item>
        <el-form-item>
          <!--          <el-button type="text">Login</el-button>-->
          <el-button type="text" @click="handleLogin()">Registry now!</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'RegistryView',
  data() {
    return {
      form: {
        name: 'test',
        email: '',
        password: '',
        password2: '',
        nickname: '',
        school: '',
      },
      registryRules: {
        name: [
          {required:'true',}
        ]
      }
    }
  },
  methods: {
    registry(){

    }
  }
}
</script>

<style>
.registry {
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px #f5f7f9;


  position: absolute;
  width: 390px;
  height: 550px;
  top: 100px;
  left: 700px;
}

.registryTitle {
  position: relative;
  margin-top: 20px;
}

.registryFrom {
  position: relative;
  margin-top: 20px;
  margin-right: 30px;
}
</style>
