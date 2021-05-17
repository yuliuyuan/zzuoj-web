<template>
  <div class="ContestMain">
    <div class="ContestTitle">
      <p>修改竞赛</p>
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
                v-model="form.time"
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
          <el-input v-model="form.problems" placeholder="例如:1001^1002^1010"></el-input>
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
          <el-checkbox-group v-model="form.langmask" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="language in languages" :label="language" :key="language">{{language}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="是否私有">
          <el-radio v-model="form.isPrivate" :label="0">公开</el-radio>
          <el-radio v-model="form.isPrivate" :label="1">私有</el-radio>
          (如果私有只能通过手动导入选手学号来添加用户)
        </el-form-item>

        <el-form-item  v-if="form.isPrivate == 0" label="竞赛密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item v-if="form.isPrivate == 1" label="用户组Id" style="white-space: pre-line; ">
          <el-input
              :placeholder= "usersExample"
              v-model="form.groupId"
              style="white-space: pre-line;width: 410px; ">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-switch
              v-model='this.form.defunct'
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="N"
              inactive-value="Y"
              style="padding-left: 550px"
          > </el-switch>开启比赛(默认绿色开启)
        </el-form-item>
      </el-form>

      <div >
        <el-button @click="handleClearContest()">清空</el-button>
        <el-button type="primary" @click="handleUpdateContest(this.form)">提交修改</el-button>
      </div>
    </div>
  </div>
</template>


<script>

import api from "@/util/api.js";
import util from "@/util/util";
import {mapGetters} from "vuex";


const languageOptions = ['c', 'c++', 'java', 'python', 'go'];
export default {
  name: 'ContestAdd',
  props: ['id'],
  data() {
    return {
      usersExample : '输入用户组的唯一标识，请现在用户管理模块下添加用户组。',
      form: {
        contestId: '',

        title: '竞赛测试',

        time: '',

        problems: null,
        description: '',

        langmask: ['c', 'c++', 'java'],

        password: null,

        isPrivate: '',

        groupId: "",

        defunct: "N",

        userId: "",
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

  mounted() {
    this.form.userId = this.userIdGetter

    this.handleGetContestById( this.$route.params.id )
    this.form.contestId = this.$route.params.id
  },

  computed:{
    ...mapGetters(["userIdGetter"])
  },
  methods: {
    handleGetContestById(contestId){
      api.getContestById({contestId: contestId}).then( res => {
            this.form.title = res.title
            this.form.time = res.time
            this.form.problems = res.problems
            this.form.description = res.description
            this.form.langmask = res.langmask

            this.form.password = res.password,

            this.form.isPrivate = res.isPrivate

            this.form.groupId = res.groupId

            this.form.defunct = res.defunct
      }).catch( err => {
        alert(err)
        alert("get contest by id error")
      })
    },

    handleUpdateContest(data){
      api.updateContestById(data).then( res => {
          alert("update contest success")
      }).catch( err => {
          alert("update contest error")
      })


    },

    handleClearContest(){
      location.reload()
      // this.$router.push("/admin/contest/add")
    },

    handleCheckAllChange(val) {
      this.form.langmask = val ? languageOptions : [];
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
