<template>
  <el-card style="margin-top: 15px;border: none;box-shadow: none;">
   <div slot="header" class="clearfix">
      <h1 style="font-size:20px;">订单明细</h1>
    </div>
    <div>
      <el-button type="primary" style="background:#110708;border:none;" @click="dialogFormVisible = true"><i class="el-icon-plus "></i></el-button >展示项
      <el-dialog title="增加展示项" :visible.sync="dialogFormVisible">
        <!-- 增减选项弹框 -->
        <el-form>
          <div v-for="item in checkboxList" style="line-height:30px">
            <el-checkbox-group>
              <span style="padding-right: 15px;font-size:16px;">{{item.title}}:</span>
              <div v-for="i in item.group" style="display: inline-block">
                <input type="checkbox" :value="i.label" v-model="check">
                <label style="font-size:16px;">{{i.label}}</label>
              </div>
            </el-checkbox-group>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- <div class="block" style="margin-top:20px;">
      <i class="demonstration">时间：</i>
       <el-date-picker
        v-model="value1"
        type="daterange"
        placeholder="选择日期范围">
        </el-date-picker>
        <i style="padding-left:70px;">期数：</i>
        <el-select v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <i style="padding-left:70px;">课程状态：</i>
        <el-select v-model="value3" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
    </div>
    <div style="margin-top:20px;">
      <i >课程类型：</i>
        <el-select v-model="value4" placeholder="请选择">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      <i style="padding-left:40px;">课程iD：</i>
      <el-input v-model="input1" placeholder="请输入内容" style="width:100px"></el-input>
      <i style="padding-left:40px;">课程名称：</i>
      <el-input v-model="input2" placeholder="请输入内容" style="width:100px"></el-input>
    </div>
    <div style="margin-top:20px;">
      <i>主讲老师：</i>
      <el-input v-model="input3" placeholder="请输入内容" style="width:100px"></el-input>
      <i style="padding-left:700px;"><el-button type="primary">主要按钮</el-button></i>
    </div> -->
    <cm-dynamic-form :formList="formList" :menuList="menuList"></cm-dynamic-form>
    <!-- <cm-dynamic-table :table-column="tableColumn" :table-list="tableList" :handleCurrentChange="handleCurrentChange" v-if="check"></cm-dynamic-table> -->
    <el-table :tableColumn>
      <el-table-column align="center" label="课程时间">
        <template scope="scope">
          <span>{{scope.row.date}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="tableColumn.length" style="text-align: right;margin-top: 15px;">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import DynamicForm from '@/components/dynamic-form.vue';
import DynamicTable from '@/components/dynamic-base-table.vue';
import MydynamicForm from './mydynamic-form.vue'
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
      dialogFormVisible: false,
      formLabelWidth: '120px',
      check:false
    }
  },
  components:{
    'cm-dynamic-form': DynamicForm,
    'cm-dynamic-table': DynamicTable,
    // 'my-dynamic-form':MydynamicForm
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
        type:"select",
        name:"talkType",
        label:"期数",
        options:[
            {
            label: '1',
            value: '111'
          },
          {
            label: '2',
            value: '222'
          },
          {
            label: '3',
            value: '333'
          }
        ]
      },
      {
        type:"select",
        name:"talkType",
        label:"课程状态",
        options:[
          {
            label: '1',
            value: '111'
          },
          {
            label: '2',
            value: '222'
          },
          {
            label: '3',
            value: '333'
          }
        ]
      },
      {
        type:'text',
        name:'lessonid',
        label:'课程iD'
      },
      {
        type:'text',
        name:'lessonName',
        label:'课程名称'
      },
      {
        type:"select",
        name:"talkType",
        label:"课程类型",
        options:[
            {
            label: '1',
            value: '111'
          },
          {
            label: '2',
            value: '222'
          },
          {
            label: '3',
            value: '333'
          }
        ]
      },
      {
        type:'text',
        name:'lessonName',
        label:'主讲老师'
      },
    ],
    this.menuList =[
      {
        name:"搜索",
        type:'primary',
        role:'',
        url:''
      }
    ],
    this.checkboxList = [
      {
        title: "订单详情",
        group: [
          {
            label: '课程名称',
            check: true,
          },
          {
            label: '课程ID',
            check: true,
          },
          {
            label: '期数',
            check: true,
          },
          {
            label:"主讲名称",
            check:true
          },
          {
            label:"主讲ID",
            check:true
          },
          {
            label:"课程状态",
            check:true
          },
          {
            label:"班主任名称",
            check:true
          },
          {
            label:"班主任ID",
            check:true
          }
        ]
      },
      {
        title: "售价",
        group: [
          {
            label: '优惠金额',
            check: true,
          }
          
        ]
      },
      {
        title: "订单创建/更新时间",
        group: [
          {
            label: "订单创建时间",
            check: true,
          },
          {
            label: "订单更新时间",
            check: true,
          }
        ],
      },
    ];
    this.tableColumn=[
        {
            "label": "课程时间",
            "name": "date",
            "type":"html"
          },
          {
            "label": "订单详情",
            "name": "orderinfo",
            "type":"html"
          },
          {
            "label": "课程类型",
            "name": "classType",
            "type":"html"
          },
          {
            "label": "售价",
            "name": "price",
            "type":"html"
          },
          {
            "label": "订单状态",
            "name": "orderStatus",
            "type":"html"
          },
          {
            "label": "是否有教材",
            "name": "hasBook",
            "type":"html"
          },
          {
            "label": "教材寄送情况",
            "name": "bookStatus",
            "type":"html"
          },
          {
            "label": "订单更新/创建时间",
            "name": "orderUpdateTime",
            "type":"html"
          }
    ],
    this.tableList=[
        {
            "date": "<span>2017-08-04 17:55:41</span> -<span>2017-08-04 17:55:41</span>",
            "orderinfo": "<span>高中物理提高班</span> <span>(1000)</span><br><span>春_2</span><span>小凡老师</span><span>(9527)</span><br><span>未结束</span><span>安云班主任</span><span>(3352)</span>",
            "classType": "<span>班课</span>",
            "price": "<span>138.00</span><br><span>优惠6.00</span>",
            "orderStatus": "<span>正常</span>",
            "hasBook": "<span>有</span><br><a href='https://www.baidu.com/s?wd=3333674693291'style='color:#21F5DD'>(物流详情)</a>",
            "bookStatus": "<span >寄出</span>",
            "orderUpdateTime": "<span>创建:2017-08-05 17:55:41</span></br><span>更新:2017-08-05 17:55:41</span>",
          },
    ],
    this.tableListAll=[
        {
          "date":'xxx',
          "label":'时间'
        },
        {
          "date":'xxx',
          "label":'时间'
        },
        {
          "date":'xxx',
          "label":'时间'
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
        'type': '2',
        'page':  1,
        'pageSize': 1
      };
      let _this = this;
      axios.get(api.getOrderList, {
        params: params
      }).then(response => {
        //this.tableColumn = response.data.data.data.config;
        // var names=[];
        // for(var i=0;i<this.tableColumn.length;i++){
        //   console.log(this.tableColumn[i])
        //    if(this.tableColumn[i].name=="date"){
        //        names.push(this.tableColumn[i])
        //    }
        //    if(this.tableColumn[i].name=="className"){
        //       names.push(this.tableColumn[i])
        //    }
        //    if(this.tableColumn[i].name=="classType"){
        //       names.push(this.tableColumn[i])
        //    }
        //    if(this.tableColumn[i].name=="price"){
        //       names.push(this.tableColumn[i])
        //    }
        //    if(this.tableColumn[i].name=="orderStatus"){
        //       names.push(this.tableColumn[i])
        //    }
           
        //    if(this.tableColumn[i].name=="orderUpdateTime"){
        //       names.push(this.tableColumn[i])
        //    }
        //    if(this.tableColumn[i].name=="hasBook"){
        //       names.push(this.tableColumn[i])
        //    }


        // }
        // this.tableColumn=names
        //this.tableList = response.data.data.data.list;
        this.tableFlag = true;
        this.pageTotal = response.data.data.data.total;
        this.pageSize = response.data.data.data.pageNum;
      }, error => {
        // error callback
      })
    },
    AddOptions(){
      console.log('你好')
    },
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
