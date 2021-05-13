<template>
  <div class="GroupMain">
    <div class="GroupTitle">
      <p>添加新闻</p>
    </div>
    <el-divider></el-divider>

    <div class="GroupContent">
      <el-form ref="form" :model="this.form"  label-width="160px" label-position="left">
        <el-form-item class="GroupContentTitle" label="群组名称(唯一标识)">
          <el-input v-model="this.form.groupId" style="width: 400px;" ></el-input>
        </el-form-item>
        <el-form-item class="GroupContentMain" style="white-space: pre-line" label="userID集合" >
          <el-input v-model="form.users"  :placeholder="usersPlaceholder" type="textarea" :rows="20" style="width: 250px;"></el-input>
        </el-form-item>
      </el-form>

      <div class="GroupButton">
        <el-button type="primary" @click="handleAddGroup(this.form)" style="position: relative; left: 150px ">提交</el-button>
      </div>
    </div>
  </div>
</template>


<script>

import api from "@/util/api.js";

export default {
  name: 'ProblemAdd',
  data() {
    return {
      usersPlaceholder: 'user01\nuser02\nuser02',
      form: {
        groupId: 'test',
        users: 'user01\nuser02',
      },
    }
  },

  methods: {
    handleAddGroup(data){
      api.addGroup(data).then( res => {
        alert(res);
      }).catch(err => {
        //todo: 做个兜底
        alert(err);
      })
    },

  }
}
</script>

<style>


</style>
