<template>

  <div class="home">
    <div class="homeTitle" >
      <div class="homeTitleName">
        Announcements
      </div>
      <div class="homeTitleButton">
        <el-button type="primary" icon="el-icon-refresh" style="right: 0px" @click="handleShowNews()">refresh</el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="homeForm">
      <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          >
        <el-table-column
            prop="title"
            label="Title"
            width="800"
        >
        </el-table-column>
        <el-table-column
            prop="announcer"
            label="Announcer"
            width="235"
        >
        </el-table-column>
        <el-table-column
            prop="time"
            label="Time"
            width="235"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>


</template>

<script>
import api from '@oj/util/api';

export default {
  data() {
    return {
      tableData: [],
      rawNewsTableData: []
    }
  },

  //用来初始化
  mounted() {
    this.handleShowNews();
  },

  //前端是否要存储数据
  methods: {
    handleShowNews: function(){
      api.getNews().then(res => {
        this.rawNewsTableDate = res || [];
        var resres = [];
        res.forEach(function (val, i){
          var temp = {};
          temp.title = res[i].title;
          temp.time = res[i].time;
          temp.announcer = res[i].userId;
          console.log(temp);
          resres = [...resres, temp]
        })
        this.tableData = [...resres]
      }).catch(err => {
        //todo: 做个兜底
      })
    }
  },

  //用来更新
  computed: {
    // tableData: {
    //   return this.handleShowNews();
    // },
  }

}
</script>

<style>
.home {
  position: absolute;
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;

  position: absolute;
  /*width: 500px;*/
  top: 100px;
  left: 200px;
  right: 200px;
}

.homeTitle {
  position: relative;
  left: 0px;
  height: 50px;
}

.homeTitleName {
  position: absolute;
  left: 20px;
  top: 15px;

  font-size:1.875em;
}

.homeTitleButton{
  position: absolute;
  right: 20px;
  top: 15px;
}

.homeForm {
  position: relative;
  left: 60px;
  width: 1270px;
}

</style>
