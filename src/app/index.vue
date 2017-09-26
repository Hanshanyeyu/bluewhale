<template>
  <div class="clearfix">
    <div class="menu">
      <el-menu :default-active="defaultActive" :default-openeds="defaultOpeneds" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
        <div v-for="(menu,index) in menus" :key="menu.name">
          <el-submenu v-if="menu.children" :index="menu.name">
            <template slot="title">{{menu.label}}</template>
            <el-menu-item v-for="(subMenu,subIndex) in menu.children" :key="subMenu.name" :index="menu.name+'-'+subMenu.name" :route="{name: subMenu.routerName}">
              {{subMenu.label}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="menu.name" :route="{name: menu.routerName}">
            {{menu.label}}
          </el-menu-item>
        </div>
      </el-menu>
    </div>
    <div class="table-box clearfix">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import api from '@/api/apis';
var menus = [];
var defaultActive = '';
var defaultOpeneds=[];
export default {
  name: 'index',
  beforeRouteEnter (to, from, next) {
    defaultActive = to.meta.index || 'main-main';
    defaultOpeneds.push(defaultActive.split('-')[0]);
    next();
  },
  data() {
    return {
      menus: menus,
      defaultActive: defaultActive,
      defaultOpeneds: defaultOpeneds
    }
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  },
  created() {
    this.defaultActive = defaultActive;
    axios.get(api.getMenus, {
      params: {}
    }).then(response => {
      this.menus = response.data.data
      console.log(this.menus)
      console.log(response.data.data.data)
    }, error => {

    })
  },
  mounted(){
    this.defaultActive = defaultActive;
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
.menu {
  position: fixed;
  bottom: 0;
  top: 70px;
  width: 220px;
  background: #18212b;
  box-shadow: 2px 0px 9px 2px rgba(0, 0, 0, .2);
  overflow: auto;
  color: #fff;
}
.el-menu {
  background-color: #18212b;
}

.table-box {
  padding: 20px;
  margin-left: 220px;
}

</style>
