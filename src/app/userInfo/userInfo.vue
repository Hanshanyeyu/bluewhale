<template>
  <div class="userInfo">
    <el-card style="margin-top: 15px;border: none;box-shadow: none;">
      <div slot="header" class="clearfix">
        <h1 style="font-size: 20px;">个人信息</h1>
      </div>
      <div class="top clearfix">
        <div class="avatar">
          <img :src="student.avatar" alt="" style="display: block" width="100" height="100">
        </div>
        <div class="uid item text"><span class="bold">{{student.uid}}</span>
        </div>
        <div class="text item">
              <span class="bold">{{student.nickname}}</span>
              <span class="bold">({{student.name}})</span>
              <span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</span>
              <span class="bold">{{student.sex}}</span>
              <i class="el-icon-myicon-4"></i>
        </div>
        <div class="text item">
              <span class="bold"> <!-- {{student.area}} -->北京</span>
              <span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</span>
              <span class="bold"> {{student.grade}}</span>
        </div>

      </div>
      <el-row class="clearfix">
        <el-col :span="12">
          <el-card class="customer">
            <div class="text item">
               <span class="bold">学校: {{student.school}}</span>
            </div>
            <div class="text item">
               <span class="bold">入学年份: {{student.entryYear}}</span>
            </div>
            
            
            <div class="text item">
               <span class="bold">地址: {{student.address}}</span>
            </div>
            <div class="text item">
               <span class="bold">注册电话: {{student.regPhone}}</span>
            </div>
           
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="customer">

            <div class="text item">
               <span class="bold">班级: {{student.class}}</span>
            </div>
            <div class="text item">
               <span class="bold">学号: {{student.number}}</span>
            </div>  
            <div class="text item">
               <span class="bold">注册作业帮时间: {{student.regTime}}</span>
            </div>
            <div class="text item">
               <span class="bold">个人电话: {{student.phone}}</span>
            </div>
            

          </el-card>
        </el-col>
      </el-row>
      <el-row class="clearfix">
        <el-col :span="12">
          <el-card class="customer">
             <div class="text item">
               <span class="bold">监督人1名称: {{student.guardianA}}</span>
            </div>
             <div class="text item">
                <span class="bold">监督人1电话 : {{student.guardianAWebchat}}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="customer">
            <div class="text item">
              <span class="bold">监督人1电话 : {{student.guardianAPhone}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="clearfix">
        <el-col :span="12">
          <el-card class="customer">
            <div class="text item">
               <span class="bold">监督人2名称: {{student.guardianB}}
                        </span></div>
            <div class="text item">
              <span class="bold">监督人2微信:  {{student.guardianBWebchat}}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="customer">
            <div class="text item">
              <span class="bold">监督人2电话:  {{student.guardianBPhone}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>

import api from '@/api/apis';
import axios from 'axios';

var id = '';
export default {
  data() {
    return {
      student: {},
      uid: ''
    }
  },
  components: {},
  created: function() {
    this.uid = this.$route.params.id;
    let param = {
      'uid': this.uid,
      'style': 1
    };
    this.queryTableColumn(param);
  },
  computed: {},
  methods: {
    queryTableColumn(param) {
      var _this = this;
      let params = param;

      axios.get(api.getUserInfo, {
        params: params
      }).then(response => {
        if (response.data.errNo != 0) {
          return
        }
        _this.student = response.data.data;
      }, error => {
        // error callback
      })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.userInfo {
  .el-card {
    border: none;
    box-shadow: none;
    .top{
      padding-top:25px;
    }
  }
  .avatar {
    float: left;
    padding-left:20px;
    margin-right: 10px;
  }
  .text {
    font-size: 16px;
  }
  .bold {
    font-weight: bold;
  }

  .item {
    padding: 8px 0;
  }

  .clearfix:after {
    clear: both
  }

  .el-row {
    border-bottom: 1px dashed #ccc;
  }
  
}
</style>
