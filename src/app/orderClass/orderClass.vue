<template>
  <div class="userInfo">
    <el-card style="margin-top: 15px;border: none;box-shadow: none;">
      <div slot="header" class="clearfix">
        <h1 style="font-size:20px;">报课数据</h1>
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
            <div class="text item">
              <span class="bold mx">订单明细:</span> <el-button type="info" size="mini" @click="orderInfo()">明细</el-button>
            </div>
            <div class="text item">
              <span class="bold mx">课程明细:</span> <el-button type="info" size="mini" @click="timetableInfo()">明细</el-button>
            </div>
            <div class="text item">
              <span class="bold mx">续报明细:</span> <el-button type="info" size="mini" @click="continueInfo()">明细</el-button>
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
    </el-card>
  </div>
</template>

<script>
import api from '@/api/apis';
import axios from 'axios';
import router from '@/router/index'

export default {
  data() {
    return {
      order: {}
    }
  },
  components: {},
  created: function() {
    this.uid = this.$route.params.id;
    let param = {
      'id': this.uid,
      'type': 1
    };
    //  console.log('orderClass',param.id);
    this.uid = param.id;
    // console.log(param);
    this.queryTableColumn(param);
  },
  computed: {},
  methods: {
    queryTableColumn(param) {
      var _this = this;
      let params = param;
      axios.get(api.getOrderClass, {
        params: params
      }).then(response => {
        if (response.data.errNo != 0) {
          return
        }

        _this.order = response.data.data;
      }, error => {
        // error callback
      })
    },
    orderInfo() {
      // 跳转到订单明细页
      router.push({
        name: 'orderInfo',
      });
    },
    timetableInfo() {
      // 跳转到课程时刻表明细页
      router.push({
        name: 'timetableInfo',
      });
    },
    continueInfo() {
      // 跳转到课程时刻表明细页
      router.push({
        name: 'continueInfo',
      });
    },
  }
}

</script>

<style scoped>
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
.mx{
  font-size: 18px;
}

</style>
