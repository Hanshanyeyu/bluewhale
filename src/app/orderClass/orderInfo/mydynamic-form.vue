<template>
  <div>
    <div class="form-box">
      <el-form :model="form" :inline="true" class="demo-form-inline" :label-width="labelWidth">
        <el-form-item v-for="item in formList" :label="item.label" :key="item.name" :required="item.required">
          <el-checkbox 
            v-if="item.type==checkbox"
            :disabled="formDisabled"
            v-model="form[item.name]"
          >
          </el-checkbox>
          <el-input
            v-if="item.type=='text'"
            :disabled="formDisabled"
            v-model="form[item.name]"
            :placeholder="item.label">
          </el-input>
          <el-select
            v-if="item.type=='select'"
            :disabled="formDisabled"
            v-model="form[item.name]"
            :placeholder="item.label">
            <el-option
              v-for="option in item.options"
              :label="option.label"
              :value="option.value"
              :key="option.value">
            </el-option>
          </el-select>
          <el-date-picker
            v-if="item.type=='dateRange'"
            v-model="form[item.name]"
            type="daterange"
            format="yyyy-MM-dd"
            :disabled="formDisabled"
            placeholder="选择日期范围">
          </el-date-picker>
          <el-date-picker
            v-if="item.type=='date'"
            v-model="form[item.name]"
            type="date"
            format="yyyy-MM-dd"
            :disabled="formDisabled"
            placeholder="选择日期">
          </el-date-picker>
          <el-date-picker
            v-if="item.type=='dateRangeQuick'"
            v-model="form[item.name]"
            type="daterange"
            format="yyyy-MM-dd"
            :disabled="formDisabled"
            placeholder="选择日期范围"
            :picker-options="pickerOptions">
          </el-date-picker>
          <el-date-picker
            v-if="item.type=='month'"
            v-model="form[item.name]"
            type="month"
            format="yyyy-MM"
            :disabled="formDisabled"
            :default-value="item.defaultValue"
            placeholder="选择年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-for="item in menuList" :key="item.name">
          <el-button :icon="item.iconType" :type="item.type" @click="onExport(item.role, item.url)">{{item.name}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import api from '../../../api/apis.js'
  import axios from 'axios'
  export default {
    props: {
      formList: {
        type: Array
      },
      menuList: {
        type: Array
      },
      formDisabled: {
        type: Boolean
      },
      columnNum: {
        type: Number
      },
      labelWidth: {
        type: String
      },
      formHeight: {
        type: String
      },
      pickerOptions: {
        type: Object
      },
      defaultQuery: {
        type: Boolean
      }
    },
    data() {
      return {
        queryOnce: true,
        form: {}
      }
    },
    computed: {
      columnNumber: function() {
        return 24 / this.columnNum;
      },
      formData () {
        let formObject = {};
        if (this.formList && this.formList.length > 0) {
          this.formList.forEach((item, index) => {
            formObject[item.name] = item.defaultValue ? item.defaultValue : '';
          });
        }
        this.form = Object.assign({}, formObject);
        return Object.assign({}, formObject);
      },
      defaultQueryEvent () {
        return this.defaultQuery;
      }
    },
     created () {
       this.formList =[
      {
        type:"checkbox",
        name:"time",
        label:"时间"
      },
      ]
    },
    methods: {
      /**
       * form表单中按钮点击事件
       * @param role
       * @param serviceUrl
       */
      onExport(role, serviceUrl) {
        this.$emit("formMenuEvent", role, serviceUrl, this.form);
      }
    },
    watch: {
      formData () {
        if (this.defaultQueryEvent && this.queryOnce){
          this.menuList.forEach((item, index) => {
            if(item.role === 'search'){
              this.onExport(item.role, item.url);
              this.queryOnce = false;
            }
          });
        }
      }
    }
  }

</script>
