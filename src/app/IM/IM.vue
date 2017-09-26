<template>
  <el-card style="margin-top: 15px;border: none;box-shadow: none;">
    <div slot="header" class="clearfix">
      <h1 style="font-size:20px;">IM情况</h1>
    </div>
    <cm-dynamic-table :table-column="tableColumn" :table-list="tableList" :buttonList="buttonList"></cm-dynamic-table>
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
      buttonList: [],
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
    this.uid = this.$route.params.id;
    this.queryTableColumn();
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
        'id': this.uid,
        'type': '1',
        'page': page || 1,
      };
      axios.get(api.getIM, {
        params: params
      }).then(response => {
        this.tableColumn = response.data.data.data.config;
        this.tableList = response.data.data.data.list;
        this.pageTotal = response.data.data.data.total;
        this.pageSize = response.data.data.data.pageNum;
        this.tableFlag = true;
        this.buttonList = [{
          role: "look",
          label: "详情",
          btnType: "primary"
        }]
      }, error => {
        // error callback
      })
    }

  }
}

</script>
<style scoped>


</style>
