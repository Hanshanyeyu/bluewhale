<template>
  <el-card style="margin-top: 15px;border: none;box-shadow: none;">
    <div slot="header" class="clearfix">
      <h1 style="font-size:20px; text-align:center">班课续报情况</h1>
      <span >时间  <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          style="width:120px;"
          >
        </el-date-picker>-
        <el-time-picker
          is-range
          v-model="value2"
          placeholder="选择时间范围"
          format="HH:mm"
          style="width:140px;margin-top:20px;"
          >
        </el-time-picker>
      </span>
      <span>
        课程ID <el-input v-model="input"  style="width:60px"></el-input>
        章节ID <el-input v-model="input2"  style="width:60px"></el-input>
      </span>
      <span><el-button type="primary" style="background:rgb(224,224,224);border:none">搜索</el-button></span>
    </div>
    <cm-dynamic-table :table-column="tableColumn" :table-list="tableList" :handleCurrentChange="handleCurrentChange"></cm-dynamic-table>
    <div v-if="tableColumn.length" style="text-align: right;margin-top: 15px;">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
  import DynamicForm from '@/components/dynamic-form.vue';
  import DynamicTable from '@/components/dynamic-base-table.vue';
  import api from '@/api/apis';
  import axios from 'axios';
  export default {
    data() {
      return {
        tableColumn: [],
        tableList: [],
        formFlag: false,
        tableFlag: false,
        currentPage: 1,
        pageSize: 10,
        pageTotal: 10,
        value1: [new Date(2016, 9, 10)],
        value2: [new Date(2016, 9, 10,8, 30), new Date(2016, 9, 10,9, 30)],
        input: '',
        input2:''
      }
    },
    components: {
      // 'cm-dynamic-form': DynamicForm,
      'cm-dynamic-table': DynamicTable
    },
    created: function() {
      // this.queryFormList();
      this.queryTableColumn();
    },
    computed: {

    },
    methods: {
      handleCurrentChange(val) {
        this.queryTableColumn(val);
      },
      pagerEvent(currentPage) {
        this.queryTableColumn(currentPage);
      },
      queryTableColumn(page) {
        let params = {
          'id': this.$route.params.id,
          'type': '4',
          'page': page || 1,
          'pageSize': 1
        };
        let _this = this;
        axios.get(api.getContinueInfo, {
          params: params
        }).then(response => {
          this.tableColumn = response.data.data.data.config;
          this.tableList = response.data.data.data.list;
          this.tableFlag = true;
          this.pageTotal = response.data.data.data.total;
          this.pageSize = response.data.data.data.pageNum;
        }, error => {
          // error callback
        })
      }
    }
  }

</script>

<style scoped>
  .el-table .cell,
  .el-table th>div {
    padding: 0 5px;
  }

  .box-width {
    /*width: 1000px;*/
  }
  span{
    margin-right: 140px;
  }

</style>
