<template>
  <div class="login">
    <el-form :model="loginForm"  ref="loginForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名">
        <el-input type="password" v-model="loginForm.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-button type="primary" @click="login('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login{
  form{
    width: 330px;
    margin: auto;
    margin-top: 50px;
  }
}
</style>
