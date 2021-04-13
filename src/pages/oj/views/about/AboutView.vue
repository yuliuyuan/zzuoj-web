<template>
  <div>
    <h4>测试</h4>
    <div>
      {{didi}}
      {{family}}
    </div>
    <div>
      {{didiFamily}}
    </div>
  </div>

</template>

<script>

export default {
  data () {
    return {
      didi: 'didi',
      family: 'family'
    }
  },
  computed: {
    didiFamily:{
      //getter
      get:function(){
        return this.didi + ' ' + this.family
      },
      //setter
      set:function(newValue){
        // 这里由于该计算属性被赋值，将被调用
        this.didi = 123
        this.family = 456
      }
    }
  },
  mounted () {
    // 赋值，调用setter函数
    this.didiFamily = 'John Doe'
  }
}
</script>
