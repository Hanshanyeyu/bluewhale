<template>
  <div class="title">
    <el-card style="margin-top: 15px;border: none;box-shadow: none;">
      <div slot="header" class="clearfix">
        <h1 style="font-size:20px;">通话/访谈数据</h1>
      </div>
      <el-row class="clearfix">
        <el-col :span="12">
          <el-card class="customer">
            <div class="text item">
               <span class="bold">电话通话量: {{service.call.call}}</span>
            </div>
            <div class="text item">
               <span class="bold" >班主任通话量: {{service.call.teacher}}</span>
               <span class="bold link" style="margin-left:140px;">呼入: {{service.call.toTeacher}}</span>
               <span class="bold link" style="margin-left:110px;">呼出: {{service.call.fromTeacher}}</span>
            </div>
            <div class="text item">
               <span class="bold">客服通话量: {{service.call.service}}</span>
               <span class="bold link" style="margin-left:130px;">呼入: </span>
               <span class="bold link" style="margin-left:130px;">呼出: </span>
            </div>
            <div class="text item">
              <span class="bold xq" style="padding-top:30px;">通话详情:</span> <el-button type="info" size="mini" @click="serviceInfo('callInfo')">明细</el-button>
            </div>
            <div class="text item">
               <span class="bold">访谈记录: {{service.interview.interview}}</span>
               <span class="bold" style="margin-left:170px;">30天内访谈记录: {{service.interview.nearInterview}}</span>
            </div>
            <div class="text item">
             <span class="bold xq" > 访谈详情: </span><el-button type="info" size="mini" @click="serviceInfo('talkInfo')">明细</el-button>
            </div>
            <div class="text item">
              
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <div class="box-width">
      <cm-dynamic-table :table-column="tableColumn" :table-list="tableList" :buttonList="buttonList" @tableMenuEvent="tableMenuEvent"></cm-dynamic-table>
    </div>
  </div>
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
      service: {
        call: {},
        interview: {}
      },
      tableColumn: [],
      tableList: [],
      formFlag: false,
      tableFlag: false,
      buttonList: []
    }
  },
  components: {
    'cm-dynamic-table': DynamicTable
  },
  created: function() {
    this.uid = this.$route.params.id;
    let param = {
      'id': this.uid,
      'type': 1
    };
    this.uid = param.uid;

    this.queryTableColumn(param);
  },
  computed: {},
  methods: {
    pagerEvent(currentPage) {
      this.queryTableColumn(currentPage);
    },
    queryTableColumn(param) {
      var _this = this;
      let params = param;
      axios.get(api.getService, {
        params: params
      }).then(response => {
        if (response.data.errNo != 0) {
          return
        }
        _this.service = response.data.data;
        _this.buttonList = [{
          role: "look",
          label: "详情",
          btnType: "primary"
        }]
      }, error => {
        // error callback
      })
    },
    serviceInfo(type) {
      // 跳转到详情页
      router.push({
        name: type,
        path: '/main/service/' + type + '/'+this.uid,
        params: {
          'uid': this.uid,
          'type': type
        },
      });
    },
    tableMenuEvent(row, role) {

      switch (role) {
        //跳转到详情页，row为后端数据，传参为row.classId
        case "look":
          router.push({ name: 'touchInfo', path: '/main/service/touchInfo/' + window.location.search, params: { 'row': row } });
          break;
      }
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

.link {
  cursor: pointer;
}

.el-card {
  border: none;
  box-shadow: none;
}

.text {
  font-size: 16px;
}

.bold {
  font-weight: bold;
}

.item {
  padding: 10px 0;
}

.el-row {
  border-bottom: 1px dashed #ccc;
}
.xq{
  font-size: 18px;
}
</style>
