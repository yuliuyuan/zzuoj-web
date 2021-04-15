<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="ID"> </el-table-column>
    <el-table-column prop="title" label="比赛名称"> </el-table-column>
    <el-table-column prop="starttime" label="开始时间"> </el-table-column>
    <el-table-column prop="length" label="比赛时长"> </el-table-column>
    <el-table-column prop="others" label="描述"> </el-table-column>
    <el-table-column prop="status" label="状态"> </el-table-column>
    <el-table-column fixed="right" width="300px">
      <template #default="scope">
        <el-button @click="toContestPage(scope.row)" type="text" 
          >查看详情(用户)</el-button
        >
        <el-button @click="toDetailPage(scope.row)" type="text" 
          >查看详情(后台)</el-button
        >
        <el-button @click="toManagePage(scope.row)" type="text" 
          >管理</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  methods: {
    toContestPage(row) {
      this.$router.push("/contest/" + row.id);
    },
    toDetailPage(row) {
      this.$router.push("/admin/contest/view/" + row.id);
    },
    toManagePage(row) {
      this.$router.push("/admin/contest/manage/" + row.id);
    },
  },

  data() {
    return {
      tableData: [
        {
          id: "1000",
          title: "王小虎",
          starttime: "上海",
          length: "普陀区",
          others: "上海市普陀区金沙江路 1518 弄",
          status: 200333,
        },
        {
          id: "1001",
          title: "王小虎",
          starttime: "上海",
          length: "普陀区",
          others: "上海市普陀区金沙江路 1517 弄",
          status: 200333,
        },
        {
          id: "1002",
          title: "王小虎",
          starttime: "上海",
          length: "普陀区",
          others: "上海市普陀区金沙江路 1519 弄",
          status: 200333,
        },
        {
          id: "1003",
          title: "王小虎",
          starttime: "上海",
          length: "普陀区",
          others: "上海市普陀区金沙江路 1516 弄",
          status: 200333,
        },
      ],
    };
  },
};
</script>