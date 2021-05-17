<template>
  <div class="GroupMain">
    <div class="GroupTitle">
      <p>修改群组</p>
    </div>
    <el-divider></el-divider>

    <div class="GroupContent">
      <el-form ref="form" :model="this.form"  label-width="160px" label-position="left">
        <el-form-item class="GroupContentTitle" label="群组名称(唯一标识)">
          <el-input v-model="this.form.groupId" style="width: 400px;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item class="GroupContentMain" style="white-space: pre-line" label="userID集合" >
          <el-input v-model="form.users" type="textarea" :rows="20" style="width: 250px;"></el-input>
        </el-form-item>
      </el-form>

      <div class="GroupButton">
        <el-button type="primary" @click="handleUpdateGroup()" style="position: relative; left: 150px ">提交</el-button>
      </div>
    </div>
  </div>
</template>


<script>

import api from "@/util/api.js";

export default {
  name: 'ProblemEdit',
  props: ['id'],
  data() {
    return {
      form: {
        groupId: '',
        users: '',
      },
    }
  },

  mounted() {
    this.handleGetGroup(this.$route.params.id)
  },

  methods: {
    handleGetGroup(data){
      api.getGroupById({groupId: data}).then( res => {
        this.form.groupId = res.groupId;
        this.form.users = res.users;
      }).catch(err => {
        //todo: 做个兜底
        alert("get group by id error!");
        this.$router.push("/admin/user/group/list")
      })
    },
    handleUpdateGroup(){
      api.updateGroupById({groupId: this.form.groupId, users: this.form.users}).then( res => {
        alert("update group by id success")
      }).catch( err => {
        alert("update group by id error")
      })
    }

  }
}
</script>

<style>


</style>
