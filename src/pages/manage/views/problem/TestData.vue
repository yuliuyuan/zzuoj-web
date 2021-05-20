<template>
  <el-table
      :data="checkPointList"
      border
      height="600px"
      style="width: 100%"
      :row-style="{height: '30px'}"
      :span-method="objectSpanMethod">
    <el-table-column
        fixed
        prop="name"
        label="名称"
        width="200px">
    </el-table-column>
    <el-table-column
        prop="userId"
        label="创建者"
        width="120">
    </el-table-column>
    <el-table-column
        prop="size"
        label="大小(B)"
        width="100">
    </el-table-column>
    <el-table-column
        prop="createTime"
        label="时间"
        width="200">
    </el-table-column>

    <el-table-column
        label="类型"
        width="100px">
      <template #default="scope">
        <span>{{ (scope.row.name).endsWith(".in") ? ".in":".out"  }} </span>
      </template>
    </el-table-column>

    <el-table-column
        label="操作"
        width="300px">
      <template #default="scope">
        <el-button @click="handleDelete(scope.row.checkpointId)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-upload
      class="upload-demo"
      ref="upload"
      action="####"
      multiple
      :on-change="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false">
    <template #trigger>
      <el-button size="small" type="primary">选取文件</el-button>
    </template>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </el-upload>
</template>

<script>
import api from "@/util/api";

export default {
  name: 'TestData',
  props: ['id'],
  data() {
    return {
      checkPointList: [],
      fileList: [],
      tableData: [],
      problemId: '',
    };
  },

  mounted() {
    this.problemId = this.$route.params.id
    this.handleGetCheckPointByPid()
  },

  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 5 || columnIndex === 3) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (columnIndex === 5) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },

    submitUpload() {
      if(this.fileList == null || this.fileList.length == 0){
        alert("请添加上传文件")
        return
      }

      var headers= {
        "Content-Type": "multipart/form-data;boundary=ABCD"
      }
      const formData = new FormData();
      for(var i=0; i<this.fileList.length; i++){
        var file = this.fileList[i]
        formData.append('files', file.raw, file.name);
      }

      var obj = { pId: this.problemId}
      formData.append("obj",JSON.stringify(obj));
      api.uploadCheckpointFiles(formData, headers  ).then( res => {
        this.fileList = []
        alert("upload files success")
      }).catch( err => {
        alert("upload files fail")
      })
    },
    handleRemove(file, fileList) {
      console.log("++++++++")
      this.fileList = fileList
    },
    handlePreview(file, fileList) {
      let that = this;
      if (file.raw.size > 1024 * 1024 * 2) {
        that.$message.error('上传文件大小不能超过 2MB!');
        return;
      }
      that.fileList = fileList;
    },


    handleDelete(cId){
      api.deleteCheckPointsByCid( {pId : this.problemId, cId: cId}).then( res => {
        alert("delete check point by cId success")
      }).catch( err => {
        alert("delete check point by cId fail")
      })
    },
    handleGetCheckPointByPid(){
      api.getCheckpointList( this.problemId ).then( res => {
        console.log("++++")
        for(var i=0; i<res.length; i+=2){
          var temp = res[i]
          var tp1 = {checkpointId: temp.checkpointId, userId: temp.userId, isPrivate: temp.isPrivate, createTime: temp.createTime, modifyTime: temp.modifyTime, size: temp.inputSize, name: temp.inputName }
          var tp2 = {checkpointId: temp.checkpointId, userId: temp.userId, isPrivate: temp.isPrivate, createTime: temp.createTime, modifyTime: temp.modifyTime, size: temp.outputSize, name: temp.outputName }
          this.checkPointList.push(tp1)
          this.checkPointList.push(tp2)
        }
        console.log(this.checkPointList)
      }).catch( err => {
        alert("get check point by problem id error")
      })
    }
  }
}
</script>

<style>

</style>
