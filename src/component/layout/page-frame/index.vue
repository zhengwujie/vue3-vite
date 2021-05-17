<template>
  <div class="page-frame">
    <div class="content">
      <slot />
    </div>
<!--    <page-footer />-->
  </div>
</template>

<script>
// import pageFooter from '@/views/system/layout/page-footer'
export default {
  name: 'PageFrame',
  components: {  },
  data() {
    return {}
  },
  watch: {},
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .page-frame{
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    /*background: #fff;*/
    background: #ffffff;
    .content{
      padding: 0 0;
      flex: 1;
    }
  }
</style>
