<template>
  <el-card style="margin-top: 15px;border: none;box-shadow: none;">
    <cm-dynamic-form >
      
    </cm-dynamic-form>
    

    <div slot="header" class="clearfix">
      <h1 style="font-size:20px;">课程时刻表</h1>
    </div>
    <cm-dynamic-form :formList="formList" :menuList="menuList"></cm-dynamic-form>
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
      }
    },
    components: {
       'cm-dynamic-form': DynamicForm,
      'cm-dynamic-table': DynamicTable
    },
    created: function() {
      // this.queryFormList();
      this.queryTableColumn();
      this.formList =[
      {
        type:"dateRange",
        name:"time",
        label:"时间"
      },
      {
        type:'text',
        name:'courseId',
        label:'课程ID'
      },
      {
        type:'text',
        name:'lessonName',
        label:'课程名称'
      },
      {
        type:'text',
        name:'lessonId',
        label:'章节Id'
      },
      {
        type:'text',
        name:'lessonName',
        label:'章节名称'
      }
    ],
    this.menuList =[
      {
        name:"搜索",
        type:'primary',
        role:'',
        url:''
      }
    ]
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
          'type': '3',
          'page': page || 1,
          'pageSize': 10
        };
        let _this = this;
        axios.get(api.getTimeTableInfo, {
          params: params
        }).then(response => {
          this.tableColumn = response.data.data.data.config;
          this.tableList = response.data.data.data.list;
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

</style>
