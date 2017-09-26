<template>
  <el-card style="margin-top: 15px;border: none;box-shadow: none;">
    <div slot="header" class="clearfix">
      <h1 style="font-size:20px;">接触详情</h1>
    </div>
    <cm-dynamic-table :table-column="tableColumn" :table-list="tableList"></cm-dynamic-table>
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
    pagerEvent(currentPage) { //分页
      this.queryTableColumn(currentPage);
    },
    queryTableColumn(page) {
      let params = {
        'id': this.$route.params.id,
        'type': 'order',
        'page': page || 1
      };
      axios.get(api.getTouchInfo, {
        params: params
      }).then(response => {
        this.tableColumn = response.data.data.config;
        this.tableList = response.data.data.list;
        this.pageTotal = response.data.data.data.total;
        this.pageSize = response.data.data.data.pageNum;
        this.tableFlag = true;
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

</style>