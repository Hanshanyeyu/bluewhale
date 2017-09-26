import router from '@/router/index'
import axios from 'axios'
import util from '@/common/util'
//http request 拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errNo == 403) {
      router.replace({
        name: 'forbidden',
        query: { redirect: router.currentRoute.fullPath }
      })
    } else {
      return response;
    }
    // return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: '/bluewhale/view/login',
            query: { redirect: router.currentRoute.fullPath }
          })
        case 403:
          router.replace({
            name: 'forbidden',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  });
