<template>
  <div class="home" >
     <iniInfo msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import iniInfo from '@/components/iniInfo.vue'

export default {
  name: 'HomeView',
  components: {
    iniInfo
  }
}
</script>
<style type="text/css">
	.home{flex: 1}
</style>