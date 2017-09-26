<template>
  <div>
  <div>
   <!--  <el-button type="text"  class="el-button el-button--primary el-button--small" @click="detail()">详细</el-button>  -->
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible" @customHandleEdit="customHandleEdit">
      <el-table :data="gridData">
          <el-table-column property="date" label="日期" width="150"></el-table-column>
          <el-table-column property="name" label="姓名" width="200"></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
  </div>
</template> 
<script>
import axios from 'axios';
import api from '@/api/apis';
  export default {
    props:['detailMsg'],
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
      }
    },
    methods:{

      detail(){
        let params={
          'id':this.$route.params.id,
          'lessonId':this.$route.params.lessonId,
          'page':1
        };
        axios.get(api.getOnLineInfo, {
        params: params
      });
        this.dialogTableVisible=true
      } ,
      customHandleEdit(){
        this.dialogTableVisible = true
      }
    }
}
</script>