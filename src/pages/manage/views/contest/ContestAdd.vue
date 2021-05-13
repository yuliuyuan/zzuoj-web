<template>
  <div class="ContestMain">
    <div class="ContestTitle">
      <p>添加竞赛</p>
    </div>
    <el-divider></el-divider>
    <div class="Content">
      <el-form ref="form" :model="form"  label-width="80px" >
        <el-form-item label="竞赛标题">
          <el-input v-model="form.title" style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item label="竞赛时间">
          <div class="block">
            <el-date-picker
                v-model="form.endTime"
                type="datetimerange"
                :shortcuts="shortcuts"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="竞赛题目">
          <el-input v-model="form.problems" placeholder="例如:1001,1002,1010"></el-input>
        </el-form-item>

        <el-form-item label="竞赛描述">
          <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              v-model="form.description">
          </el-input>
        </el-form-item>

        <el-form-item label="语言选择">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="form.checkedLanguages" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="language in languages" :label="language" :key="language">{{language}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="是否私有">
          <el-radio v-model="form.isPrivate" label="0">公开</el-radio>
          <el-radio v-model="form.isPrivate" label="1">私有</el-radio>
          (如果私有只能通过手动导入选手学号来添加用户)
        </el-form-item>

        <el-form-item  v-if="form.isPrivate == 0" label="竞赛密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item v-if="form.isPrivate == 1" label="竞赛用户" white-space=: pre-line>
          <el-input
              type="textarea"
              :rows="4"
              :placeholder= "usersExample"
              v-model="form.users"
              style="white-space: pre-line">
          </el-input>
        </el-form-item>
      </el-form>

      <div >
        <el-button @click="handleClearContest()">清空</el-button>
        <el-button type="primary" @click="handleAddContest(this.form)">提交</el-button>
      </div>
    </div>
  </div>
</template>


<script>

import api from "@/util/api.js";
import util from "@/util/util";


const languageOptions = ['c', 'c++', 'java', 'python', 'go'];
export default {
  name: 'ContestAdd',
  data() {
    return {
      usersExample : '例如:(注意不同学号要在不同行，用户必须把学号当作userId注册)\nuser01\nuser02',
      form: {
        title: '竞赛题目测试',

        beginTime: '',
        endTime: '',

        problems: null,
        description: '郑州大学第100届新生赛',

        checkedLanguages: ['c', 'c++', 'java'],

        password: null,

        isPrivate: "0",

        users: "user01\nuser02",
      },
      checkAll: false,

      languages: languageOptions,
      isIndeterminate: true,


      shortcuts: [{
        text: '最近一天',
        value: (() => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24);
          return [start, end]
        })()
      },{
        text: '最近一周',
        value: (() => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          return [start, end]
        })()
      }, {
        text: '最近一个月',
        value: (() => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          return [start, end]
        })()
      }, {
        text: '最近三个月',
        value: (() => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          return [start, end]
        })()
      }],
    }
  },

  methods: {
    handleAddContest(data){
      console.log(data)
      api.addContest(data).then( res => {
      }).catch(err => {
        alert(err);
      })
    },

    handleClearContest(){
      location.reload()
      // this.$router.push("/admin/contest/add")
    },

    handleCheckAllChange(val) {
      this.form.checkedLanguages = val ? languageOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.languages.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.languages.length;
    },

  }
}
</script>

<style>

</style>
