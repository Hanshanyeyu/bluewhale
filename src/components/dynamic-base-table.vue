<template>
  <div>
    <div class="data-box">
      <el-table
        v-if="tableColumn.length"
        :data="tableList"
        :height="height"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="index"
          width="60">
        </el-table-column>
        <el-table-column
          v-if="selection"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          v-for="item in tableColumn"
          :key="item.name"
          :prop="item.name"
          :label="item.label"
          :sortable="item.sort?true:false"
          :min-width="minWidth"
          :fixed="item.fixed"
          :width="columnWidth">
          <template scope="scope">
            <div v-if="item.type === 'tag'">
              <el-tag v-for="tagItem in scope.row[item.name]" class="tag-right" :key="tagItem.name" :type="tagItem.type">{{tagItem.name}}</el-tag>
            </div>
            <div v-else-if="item.type === 'popover'">
              <el-popover trigger="hover" placement="top">
                <p>{{scope.row[item.name]}}</p>
                <span>{{scope.row[item.name]}}</span>
                <div slot="reference" class="name-wrapper">
                  <span>{{scope.row[item.name]}}</span>
                </div>
              </el-popover>
            </div>
            <div v-else-if="item.type === 'audio'">
              <audio class="record-video" v-if="scope.row[item.name]" :src="scope.row[item.name]" controls="controls" preload="none"></audio>
              <span v-else>无录音</span>
            </div>
            <div v-else-if="item.type === 'html'">
              <p v-html="scope.row[item.name]"></p>
            </div>
            <div v-else-if="item.type === 'operation'">
              <el-button v-for="item in scope.row[item.name]"
                         :role="item.role"
                         size="small"
                         :type="item.btnType"
                         :key="item.label"
                         @click="customHandleEdit(scope.$index, scope.row, item.role)" 
                         >{{item.label}}
              </el-button>
              <!-- @click="customHandleEdit(scope.$index, scope.row, item.role)"-->
            </div> 
            <div v-else-if="item.type === 'operationWithData'">
              <span style="text-align:center;display:block">{{scope.row[item.name].value}}</span>
               <el-button v-for="item in scope.row[item.name].list"
                         :role="item.role"
                         size="small"
                         :type="item.btnType"
                         :key="item.label"
                          @click="customHandleEdit(scope.$index, scope.row, item.role)"
                         >{{item.label}}
              </el-button> 
              <onlineInfo  :detail-msg="msg"></onlineInfo>
            </div>
           
            <span v-else>{{scope.row[item.name]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="hasButton"
          prop="operation"
          label="操作"
          :fixed="buttonFixed"
          :width="operationButtonWidth">
          <template scope="scope">
            <el-button
              v-for="bItem in buttonList"
              :role="bItem.role"
              size="small"
              :key="bItem.label"
              :type="bItem.btnType"
              :icon="bItem.icon"
              @click="handleEdit(scope.$index, scope.row, bItem.role)">{{bItem.label}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import onlineInfo from '../app/goToClass/onLineInfo/onLineInfo'
  import api from '../api/apis'
  import axios from 'axios'
  export default {
    components:{
      'onlineInfo':onlineInfo
    },
    props: {
      tableColumn: {
        type: Array
      },
      tableList: {
        type: Array
      },
      buttonList: {
        type: Array
      },
      operationButtonWidth: {
        type: Number
      },
      buttonFixed: {
        type: String
      },
      height: {
        type: [String, Number]
      },
      selection: {
        type: Boolean
      },
      columnWidth: {
        type: Number
      },
      minWidth: {
        type: String
      }
    },

    computed: {
      hasButton () {
        return this.buttonList && this.buttonList.length;
      }
    },
    data() {
      return {
        currentPage:1,
        pageSize: 20,
        pageTotal: 100,
        form: {},
        msg:"this.dialogTableVisible=true",
      }
    },
    created () {
    },
    methods: {
      /**
       * table中操作按钮点击事件
       * @param index
       * @param row
       * @param role
       */
      handleEdit(index, row, role) {
        this.$emit("tableMenuEvent", row, role);
      },
      /**
       * 当数据中有操作按钮时，按钮的单击事件
       * @param index
       * @param row
       * @param role
       */
      customHandleEdit (index, row, role) {
        this.$emit("customHandleEditEvent", row, role);
        this.$emit("customHandleEdit"),
        this.dialogTableVisible=true
      },
      /**
       * 多选变化事件
       * @param selection
       */
      handleSelectionChange(selection){
        this.$emit("selectionChange", selection);
      }, 
  }
 }
</script>
<style lang="less" scoped>
  .page-num{
    text-align: center;
    margin-top: 20px;
  }
  .tag-right{
    margin-right: 10px;
  }
  .record-video{
    width: 160px;
  }
</style>
