<template>
  <div class="registry">
    <div class="registryTitle">
      Welcome To Registry
    </div>
    <div class="registryFrom">
      <el-form ref="form" :model="form" :rules="registryRules" label-width="135px" label-position="right">
        <el-form-item label="*UserId(学号)">
          <el-input style="width: 250px;" v-model="form.userId"></el-input>
        </el-form-item>
        <el-form-item label="*Email:">
          <el-input style="width: 250px;" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="*Password:">
          <el-input style="width: 250px;" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="*Confirm Password:">
          <el-input style="width: 250px;" v-model="form.password2"></el-input>
        </el-form-item>
        <el-form-item label="*NickName:">
          <el-input style="width: 250px;" v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="*School:">
          <el-input style="width: 250px;" v-model="form.school"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="handlerRegistry()">Registry now!</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import api from "@/util/api";

export default {
  name: 'RegistryView',
  data() {
    return {
      form: {
        userId: '20170150841',
        email: '1394115658@qq.com',
        password: 'y13064484198',
        password2: 'y13064484198',
        nickname: 'salix',
        school: 'zzu',
      },
      // 表单验证：https://segmentfault.com/a/1190000020410128
      registryRules: {
        userId: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 10, max: 16, message:"学号必须由数字构成，且长度为10~16", trigger: 'blur'},
          { required: true, pattern: /0-9/, message: '学号必须由数字构成，且长度为10~16',  trigger: 'blur'}
        ],
        // email: [
        //   {required:'true',}
        // ],

      }
    }
  },
  methods: {
    handlerRegistry(){
      var data = {userId:this.form.userId, email:this.form.email, password:this.form.password, nickname:this.form.nickname, school:this.form.school}
      console.log("++++")
      console.log(data)
      console.log("++++")
      api.registry(data).then( res => {
        //处理token
        alert("注册成功！")
      }).catch( err => {
        alert("注册失败！可能是userId已经存在");
      })
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
  width: 450px;
  height: 500px;
  top: 100px;
  left: 700px;
}

.registryTitle {
  position: relative;
  margin-top: 20px;

  left: 20px;
}

.registryFrom {
  position: relative;
  margin-top: 20px;
  margin-right: 30px;

  left: 20px;
}
</style>
