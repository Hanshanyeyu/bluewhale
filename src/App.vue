<template>
  <div id="app">
    <app-header></app-header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import appHeader from './app/header/header'
import '!style-loader!css-loader!./assets/css/reset.css'
export default {
  name: 'app',
  data() {
    return {}
  },
  components: {
    appHeader
  }
}

</script>
<style lang="less" rel="stylesheet/less">
html {
   ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: #fff;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px
  }

   ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px
  }
}

body {
  color: #333;
  font-size: 14px;
  font-family: arial,tahoma,'Microsoft Yahei','\5b8b\4f53',sans-serif;
  background-color: #eff2f4;
  a {
    text-decoration: none;
  }
}

.clearfix:after {
  display: table;
  content: '';
  height: 0;
  clear: both;
  visibility: hidden;
}

#app {
  padding-top: 70px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 14px;
}
.el-tabs__item{
  font-size: 20px;
  font-weight: bold;
  /*background: hsla(0, 0%, 0%, 0);*/
  color: hsl(212, 33%, 18%)
}
.el-collapse{
  border:none;
}
.el-collapse-item__header{
  height:30px;
  line-height:30px;
  color:#4866E8;
}
.el-collapse-item__header{
  border:none;
}
.el-collapse-item__wrap{
  border:none;
  background-color:white;
}
</style>
