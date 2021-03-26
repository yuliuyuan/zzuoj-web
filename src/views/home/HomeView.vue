<template>
  <p>hello salix</p>
  <Home></Home>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/home/Home.vue'

export default {
  name: 'HomeView',
  components: {
    Home
  }
}
</script>
