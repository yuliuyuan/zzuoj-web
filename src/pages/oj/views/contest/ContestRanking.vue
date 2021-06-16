<template>
  <div class="problemForm">
    <el-table
        :data="tableData"
        stripe
        style="width: 100%"
    >
      <el-table-column
          label="Id"
          width="100"
          align="center">
        <template #default="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>

      <el-table-column
          prop="userId"
          label="UserId"
          width="150"
      >
      </el-table-column>

      <el-table-column
          label="Ac/Total"
          width="150"
      >
        <template #default="scope">
          {{scope.row.ac}}/{{this.problemCnt}}
        </template>
      </el-table-column>

      <el-table-column
          label="TotalTime"
          width="150"
          align="center">
        <template #default="scope">
          {{Math.ceil(scope.row.second/60)}}
        </template>
      </el-table-column>

      <el-table-column
          v-for="(item,index) in tableData.header"
          :label="item"
          :key="index"
          align="center"
      >
        <template #default="scope">
          <span v-if="tableData.acInfo[scope.$index].arr[index] != null && tableData.problemInfo[scope.$index].arr[index]!=0" style="background-color:green; display:-moz-inline-box;display:inline-block; width: 150px; text-align: center">
           {{tableData.problemInfo[scope.$index].arr[index] }}
          </span>
          <span v-if="tableData.acInfo[scope.$index].arr[index] != null && tableData.problemInfo[scope.$index].arr[index]==0" style="background-color:green; display:-moz-inline-box;display:inline-block; width: 150px; text-align: center">
            .
          </span>
          <span v-if="tableData.problemInfo[scope.$index].arr[index] != 0" style="background-color:red; display:-moz-inline-box;display:inline-block; width: 120px; text-align: center">
            {{tableData.problemInfo[scope.$index].arr[index]}}
          </span>

        </template>
      </el-table-column>

<!--      <el-table-column-->
<!--          v-for="(item,index) in problemInfo"-->
<!--          :key="index"-->
<!--          :label=this.getL(index)-->
<!--          align="center"-->
<!--      >-->
<!--        <template #default="scope">-->
<!--          {{scope.row.second/60}}-->
<!--        </template>-->
<!--      </el-table-column>-->

    </el-table>

  </div>
</template>

<script>
import api from '@/util/api';

export default {
  name: 'ContestRanking',
  props: ['contestId'],
  problemCnt: 0,

  data() {
    return {
      tableData : [],
    }
  },

  mounted() {
    this.getContestRanking();
  },

  methods: {
    getContestRanking(){
      api.getContestRanking({contestId: this.$route.params.contestId}).then( res => {
        this.tableData = res;
        this.tableData.header = this.getHeader(this.tableData[0].problems.length);

        this.tableData.problemInfo = []
        for(var i=0; i< this.tableData.length ; i++){
          //一个用户的 errorcnt一行
          this.tableData.problemInfo.push({arr: this.tableData[i].errorCnt})
        }
        this.tableData.acInfo = []
        for(var j=0; j< this.tableData.length ; j++) {
        //   //一个用户的 errorcnt一行
          this.tableData.acInfo.push({arr: this.tableData[j].acDate})
        }

        this.problemCnt = this.tableData[0].problems.length

      }).catch( err => {
        alert("get ranking error")
      });
    },


    getL(idx){
        return String.fromCharCode(65+idx);
    },

    getHeader(cnt){
      var header = []
      for(var i=65;i<65+cnt;i++){
        header.push(String.fromCharCode(i));
      }
      return header
    }
  }

}

</script>
