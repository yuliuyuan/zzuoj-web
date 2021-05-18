<template>
  <el-table
      :data="tableData"
      border
      height="600px"
      style="width: 100%">
    <el-table-column
        fixed
        prop="date"
        label="名称"
        width="200px">
    </el-table-column>
    <el-table-column
        prop="name"
        label="上传者"
        width="120">
    </el-table-column>
    <el-table-column
        prop="province"
        label="大小"
        width="100">
    </el-table-column>
    <el-table-column
        prop="city"
        label="时间"
        width="150">
    </el-table-column>
    <el-table-column
        prop="address"
        label="类型"
        width="100px">
    </el-table-column>

    <el-table-column
        label="操作"
        width="300px">
      <template #default="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">重命名 </el-button>
        <el-button type="text" size="small">编辑</el-button>
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
      fileList: [],
      tableData: [],
      problemId: '',
    };
  },

  mounted() {
    this.problemId = this.$route.params.id
  },

  methods: {
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
        formData.append('files', file.raw, this.problemId + "/" +file.name);
      }
      api.uploadCheckpointFiles(formData, headers  ).then( res => {
        this.fileList = []
        alert("upload files success")
      }).catch( err => {
        alert("upload files fail")
      })
    },
    handleRemove(file, fileList) {
      console.log("++++++++")
      // console.log(this.fileList);
      // console.log(file);
      // console.log(fileList);
      this.fileList = fileList
      // console.log(this.fileList);
      // console.log(file);
      // console.log(fileList);
    },
    handlePreview(file, fileList) {
      console.log("--------")
      // console.log(this.fileList);
      // console.log(file);
      // console.log(fileList);
      let that = this;
      // if (file.raw.type != 'image/jpg'&& file.raw.type != 'image/png') {
      //   that.$message.error('图片只能是jpg/png格式!');
      //   return;
      // }
      if (file.raw.size > 1024 * 1024 * 2) {
        that.$message.error('上传文件大小不能超过 2MB!');
        return;
      }
      that.fileList = fileList;
      // console.log(this.fileList);
      // console.log(file);
      // console.log(fileList);
    },

  }
}
</script>

<style>

</style>
