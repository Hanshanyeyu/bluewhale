<template>
  <!-- <el-card style="margin-top: 15px;border: none;box-shadow: none;"> -->
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 15px;border: none;box-shadow: none;background:hsla(0, 0%, 0%, 0);">
    <!-- <div slot="header" class="clearfix">
      <h1 style="font-sizcustomHandleEditEvente:20px; float:left">上课情况</h1>
      <h1 @click="entryInfo()"style="font-size:20px; float:left;margin-left:50px">课节情况</h1> -->
    <!-- </div> -->
    <!-- <div slot="header" class="clearfix">  -->
    <el-tab-pane label="用户管理" name="first"  ></el-tab-pane>
    <el-tab-pane label="课节管理" name="second" ><router-link to="classInfo/classInfo.vue">导航到/xx</router-link></el-tab-pane>
    <!-- </div> -->
    <cm-dynamic-table :table-column="tableColumn" :table-list="tableList" :buttonList="buttonList" buttonFixed="right" @tableMenuEvent="tableMenuEvent"></cm-dynamic-table>
    <div v-if="tableColumn.length" style="text-align: right;margin-top: 15px;">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
    </div>
  </el-tabs>
  <!-- </el-card> -->
</template>
<script>
import DynamicForm from '@/components/dynamic-form.vue';
import DynamicTable from '@/components/dynamic-base-table.vue';
import api from '@/api/apis';
import axios from 'axios';
import router from '@/router/index'
export default {
  data() {
    return {
      tableColumn: [],
      tableList: [],
      formFlag: false,
      tableFlag: false,
      buttonList: [],
      currentPage: 1,
      pageSize: 10,
      pageTotal: 10,
      activeName: 'first',
    }
  },
  components: {
    'cm-dynamic-table': DynamicTable
  },
  created: function() {
    this.queryTableColumn();
  },

  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    },
    handleCurrentChange(val) {
      this.queryTableColumn(val);
    },
    pagerEvent(currentPage) {
      this.queryTableColumn(currentPage);
    },
    queryTableColumn(page) {
      let params = {
        'id': this.$route.params.id,
        'type': '1',
        'page': page || 1,
      };
      let _this = this;
      axios.get(api.getGoToClass, {
        params: params
      }).then(response => {
        if (response.data.errNo != 0) {
          return;
        }
        this.tableColumn = response.data.data.data.config;
        this.tableList = response.data.data.data.list;
        this.tableFlag = true;
        this.pageTotal = response.data.data.data.total;
        this.pageSize = response.data.data.data.pageSize;
        this.buttonList = [{
          role: "look",
          label: "详情",
          btnType: "primary"
        }]
      }, error => {
        // error callback
      })
    },
    tableMenuEvent(row, role) {
      switch (role) {
        //跳转到详情页，row为后端数据，传参为row.classId
        case "look":
          router.push({
            name: 'classInfo',
            path: '/main/goToClass/classInfo/:uid/:courseId',
            params: { 'tableList': [row], 'tableColumn': this.tableColumn, 'courseId': row.courseId }
          });
          break;
      }
    }
  }
}

</script>
<style>
body{
  background: hsla(0, 0%, 0%, 0);

}
.el-tabs__item{
  font-size: 20px;
  font-weight: bold;
  /*background: hsla(0, 0%, 0%, 0);*/
  color: hsl(212, 33%, 18%)
}


</style>
