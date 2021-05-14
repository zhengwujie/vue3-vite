<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import {onMounted} from 'vue'
export default{
  name: 'App',
  setup(){
    onMounted(()=>{
      console.log('import.meta.env.MODE',import.meta.env.MODE)
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  //div{
  //  background-color: #1BAEAE;
  //  span{
  //    background-color: red;
  //  }
  //}
</style>
