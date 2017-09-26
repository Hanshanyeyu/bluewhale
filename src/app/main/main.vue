<template>
  <div class="main">
    <div class="userInfo" style="background:white;">
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
                  <span>
                <el-collapse v-model="activeNames" >
                  <el-collapse-item title="查看个人资料" name="1">
                    <el-card style="padding:0 20px;">
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
                  </el-collapse-item>
                </el-collapse>
                </span>
            </div>
           
      </div>
    </div>
    <!-- 报课情况 -->
    <div>
          <div class="userInfo">
            <el-card style="margin-top: 15px;border: none;box-shadow: none;">
              <div slot="header" class="clearfix">
                <h1 style="font-size:24px;">报课数据</h1>
              </div>
              <el-row class="clearfix">
                <el-col :span="12">
                  <el-card class="customer">
                    <div class="text item">
                       <span class="bold">总报课量: {{order.courseSum}}</span>
                    </div>
                    <div class="text item">
                       <span class="bold">班课量: {{order.classCourseSum}}</span>
                    </div>
                    <div class="text item">
                       <span class="bold">总付费额: {{order.paymentSum}}</span>
                       <span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</span>
                       <span class="bold link">使用优惠券: {{order.couponSum}}</span>
                       <div class="text item">
                       
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="customer">
                    <div class="text item">
                       <span class="bold">第一次购课时间: {{order.firstCourseTime}}
                    </span></div>
                    <div class="text item">
                       <span class="bold">第一次班课时间: {{order.firstClassCourseTime}}</span>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              <el-tabs v-model="activeName2" @tab-click="handleClick" >
              <el-tab-pane label="近期交易订单" name="first" >用户管理</el-tab-pane>
              <el-tab-pane label="近期课程时刻表" name="second">配置管理</el-tab-pane>
              <el-tab-pane label="近期班课续报" name="third">角色管理</el-tab-pane>
              </el-tabs>
            </el-card>
          </div>
    </div>
    <!-- 上课情况 -->
    <div>
      <div>
         <el-card style="margin-top: 15px;border: none;box-shadow: none;">
              <div slot="header" class="clearfix">
                <h1 style="font-size:24px;">上课情况</h1>
              </div>
            </el-card>
      </div>
    </div>
    <!-- 服务接触 -->
    <div>
        <div class="userInfo">
          <el-card style="margin-top: 15px;border: none;box-shadow: none;">
            <div slot="header" class="clearfix">
              <h1 style="font-size:20px;">服务接触</h1>
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
                       <span class="bold">访谈记录: {{service.interview.interview}}</span>
                       <span class="bold" style="margin-left:170px;">30天内访谈记录: {{service.interview.nearInterview}}</span>
                    </div>
                    <div class="text item">
                      
                    </div>
                  </el-card>
                </el-col>
            </el-row>
            <el-tabs v-model="activeName" @tab-click="handleClick" >
              <el-tab-pane label="近期交易订单" name="first" >用户管理</el-tab-pane>
              <el-tab-pane label="近期课程时刻表" name="second">配置管理</el-tab-pane>
              <el-tab-pane label="近期班课续报" name="third">角色管理</el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
    </div>
    <!-- IM情况 -->
    <div>
         <el-card style="margin-top: 15px;border: none;box-shadow: none;">
              <div slot="header" class="clearfix">
                <h1 style="font-size:24px;">IM情况</h1>
              </div>
            </el-card>
      </div>
  </div>
</template>
<script>
import axios from "axios";
import api from '@/api/apis';
import router from '@/router/index'
var id = '';
export default {
  data() {
    return {
      student: {},
      uid: '',
      order: {},
      activeName: 'first',
      activeName2:'first',
      activeNames:'1',
      service: {
        call: {},
        interview: {}
      },
    }
  },
  components: {},
  created: function() {
    this.uid = this.$route.params.id;
    let param = {
      'id': this.uid,
      'type': 1
    };
    this.uid = param.id;
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
      });
      axios.get(api.getOrderClass, {
        params: params
      }).then(response => {
        if (response.data.errNo != 0) {
          return
        }

        _this.order = response.data.data;
      }, error => {
        // error callback
      });
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
    handleClick(tab, event) {
        console.log(tab, event);
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

<style lang="less" rel="stylesheet/less" scoped>
.userInfo {
  .avatar {
    float: left;
    padding-left:2px;
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
  .main{
  background-color:white;
  }
  .link {
  cursor: pointer;
  }
  .el-card {
  border: none;
  box-shadow: none;
  }
  .el-row {
  border-bottom: 1px dashed #ccc;
}
.mx{
  font-size: 18px;
} 
}


</style>
