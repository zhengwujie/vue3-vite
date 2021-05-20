<template>
  <div class="page-frame">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
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
