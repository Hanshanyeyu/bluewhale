<template>
  <div class="header">
    <img class="logo" src="../../assets/image/logo.png">
      <span>蓝鲸系统</span>
  </div>
</template>
<script>
export default {
  name: 'header',
  data() {
    return {
    }
  }
}

</script>
<style lang="less" scoped rel="stylesheet/less">
  .header {
    position: fixed;
    z-index: 19;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 20px;
    height: 70px;
    line-height: 70px;
    font-size: 0;
    background: #fff;
    box-shadow: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 1px 20px 1px rgba(0, 0, 0, .1);
    z-index: 2;
    min-height: 50px;
    box-sizing: border-box;
    img.logo {
      width: 50px;
      vertical-align: middle;
    }
    span {
      font-size: 16px;
      margin-left: 20px;
      vertical-align: middle;
      font-weight: bold;
    }
  }
</style>
