<template>
  <div class="profile">
<!--    <div class="profileTitle">-->
<!--      Update Profile!-->
<!--    </div>-->
    <div class="profileForm" style="width: 650px; position: relative; left: 500px">
      <el-form ref="form" :model="form" :rules="profileRules" label-width="100px" label-position="left" style="left: 100px">
        <el-form-item label="userId(学号)">
          <el-input style="width: 500px;" v-model="form.userId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="email">
          <el-input style="width: 500px;" v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="nickName:">
          <el-input style="width: 500px;" v-model="form.nick"></el-input>
        </el-form-item>
        <el-form-item label="school">
          <el-input style="width: 500px;" v-model="form.school"></el-input>
        </el-form-item>

        <el-form-item label="regTime">
          <el-input style="width: 500px;" v-model="form.regTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="submit">
          <el-input style="width: 500px;" v-model="form.submit" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="solved:">
          <el-input style="width: 500px;" v-model="form.solved" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="text" @click="handlerUpdateProfile()">Update</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import api from "@/util/api";

export default {
  name: 'ProfileView',
  props: ['id'],
  data() {
    return {
      userMeta: '',
      form: {
        userId: '',
        email: '',
        nick: '',
        school: '',
        regTime: '',
        submit: '',
        solved: '',
      },
      // 表单验证：https://segmentfault.com/a/1190000020410128
      profileRules: {
        userId: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 10, max: 16, message:"学号必须由数字构成，且长度为10~16", trigger: 'blur'},
          { required: true, pattern: /0-9/, message: '学号必须由数字构成，且长度为10~16',  trigger: 'blur'}
        ],
      }
    }
  },

  mounted() {
    console.log("+++++")
    this.getProfileById(this.$route.params.id);
  },
  // "userId":"admin","email":"1394115658@qq.com","submit":0,"solved":0,"defunct":null,"ip":null,"accesstime":null,"password":null,"regTime":null,"nick":"admin","school":"zzu"}}
  methods: {
    getProfileById(userId){
      api.getProfileByUserId( {userId: userId}).then( res => {
        this.userMeta = res

        this.form.userId = res.userId
        this.form.email = res.email
        this.form.nick = res.nick
        this.form.school = res.school
        this.form.regTime = res.regTime
        this.form.submit = res.submit
        this.form.solved = res.solved
      }).catch( err => {
        alert("get profile error");
        this.$router.push("/")
      })
    },

    handlerUpdateProfile(){
      this.userMeta.email = this.form.email
      this.userMeta.nick = this.form.nick
      this.userMeta.school = this.form.school
      api.updateProfile(this.userMeta).then( res => {
        alert("update profile by userId success")
      }).catch( err => {
        alert("update profile by userId error")
      })
    },

  }
}
</script>

<style>

</style>
