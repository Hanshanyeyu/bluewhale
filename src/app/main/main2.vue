<template>
	<div class="userInfo">
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
  </div>
</template>
<script>
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
      'id': this.uid,
      'type': 1
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

  
}
</style>
