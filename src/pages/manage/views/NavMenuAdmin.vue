<template>
  <el-menu :uniqueOpened="false" :default-active="this.activeIndex" :default-openeds="['/admin/news']" class="el-menu-vertical" active-text-color="DodgerBlue" router >
    <el-submenu index="/admin/news">
      <template #title><i class="el-icon-notebook-2"></i>新闻管理</template>
      <el-menu-item-group>
        <el-menu-item index="/admin/news/show">新闻列表管理</el-menu-item>
        <el-menu-item index="/admin/news/add ">添加新闻</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="/admin/user">
      <template #title><i class="el-icon-user-solid"></i>用户管理</template>
      <el-menu-item-group>
        <el-menu-item index="/admin/user/list">用户列表</el-menu-item>
        <el-menu-item index="/admin/user/manage">用户权限管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="/admin/problem">
      <template #title><i class="el-icon-s-order"></i>题目管理</template>
      <el-menu-item-group>
        <el-menu-item index="/admin/problem/list">题目列表管理</el-menu-item>
        <el-menu-item index="/admin/problem/add">添加题目</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="/admin/contest">
      <template #title><i class="el-icon-s-opportunity"></i>竞赛管理</template>
      <el-menu-item-group>
        <el-menu-item index="/admin/contest/list">竞赛列表管理</el-menu-item>
        <el-menu-item index="/admin/contest/add ">添加竞赛</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="/admin/experiment">
      <template #title><i class="el-icon-paperclip"></i>实验管理</template>
      <el-menu-item-group>
        <el-menu-item index="/admin/experiment/list">实验列表管理</el-menu-item>
        <el-menu-item index="/admin/experiment/add ">添加实验</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item @click="swapToUserPage">
      <template #title>回到前台</template>
    </el-menu-item>
    <!-- <el-button class="swapButton" @click="swapToUserPage"  type="text">回到前台</el-button> -->
  </el-menu>
</template>

<script>
export default {
  data(){
    return {
      activeIndex: '/'
    }
  },
  created() {
    var temp = window.location.href.split('?')[0]
    this.activeIndex = '/' + temp.split('/')[3] + '/' + temp.split('/')[4] + '/' + temp.split('/')[5]
  },
  methods: {
    swapToUserPage(){
      this.$router.push("/")
    }
  },
  mounted() {
    //this.$route mouted的时候没有值
    // var temp = this.$route.path.split('?')[0]
    var temp = window.location.href.split('?')[0]
    this.activeIndex = '/' + temp.split('/')[3] + '/' + temp.split('/')[4] + '/' + temp.split('/')[5]
  }
}
</script>

<style>
.swapButton {
  position: relative;
  left: 45px;
}

</style>
