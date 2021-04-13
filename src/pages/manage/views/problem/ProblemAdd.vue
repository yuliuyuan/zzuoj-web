<template>
  <div class="Main">
    <div class="Title">
      <p>添加问题</p>
    </div>
    <el-divider></el-divider>
    <div class="Content">
      <el-form ref="form" :model="form"  label-width="80px" >
        <el-form-item label="标题" >
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="时限" >
          <el-input v-model="form.timeLimit"></el-input>
        </el-form-item>

        <el-form-item label="内存限制" >
          <el-input v-model="form.memoryLimit"></el-input>
        </el-form-item>

        <el-form-item label="描述" >
          <el-input v-model="form.description"></el-input>
        </el-form-item>

        <el-form-item label="输入描述" >
          <el-input v-model="form.inputDescription"></el-input>
        </el-form-item>

        <el-form-item label="输出描述" >
          <el-input v-model="form.outputDescription"></el-input>
        </el-form-item>

        <el-form-item label="输入" >
          <el-input v-model="form.input"></el-input>
        </el-form-item>

        <el-form-item label="输出" >
          <el-input v-model="form.output"></el-input>
        </el-form-item>

        <el-form-item label="所有输入" >
          <el-input v-model="form.inputAll"></el-input>
        </el-form-item>

        <el-form-item label="所有输出" >
          <el-input v-model="form.outputAll"></el-input>
        </el-form-item>

        <el-form-item label="提示" >
          <el-input v-model="form.hint"></el-input>
        </el-form-item>

        <el-form-item label="是否特判" >
          <el-input v-model="form.isSpecialJudge"></el-input>
        </el-form-item>

        <el-form-item label="来源" >
          <el-input v-model="form.source"></el-input>
        </el-form-item>
      </el-form>
      <div v-if>
        <el-button>清空</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'ProblemAdd',
  data() {
    return {
      form: {
        title: '',
        timeLimit: 1,
        memoryLimit: 128,
        description: '',
        inputDescription: '',
        outputDescription: '',
        input: '',
        output: '',
        inputAll: '',
        outputAll: '',
        hint: '',
        //有关特判
        isSpecialJudge: false,
        source: '',
      },

    }
  },
}
</script>

<style>

</style>
