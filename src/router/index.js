import Vue from 'vue'
import Router from 'vue-router'
import dynamicForm from '@/components/dynamic-form'
import util from '@/common/util'

const notFound = resolve => require(['@/app/404/notFound.vue'], resolve);
const forbidden = resolve => require(['@/app/403/forbidden.vue'], resolve);
const login = resolve => require(['@/app/login/login.vue'], resolve);
const index = resolve => require(['@/app/index.vue'], resolve);
const main = resolve => require(['@/app/main/main.vue'], resolve);
const goToClass = resolve => require(['@/app/goToClass/goToClass.vue'], resolve);
const orderClass = resolve => require(['@/app/orderClass/orderClass.vue'], resolve);
const userInfo = resolve => require(['@/app/userInfo/userInfo.vue'], resolve);
const orderInfo = resolve => require(['@/app/orderClass/orderInfo/orderInfo.vue'], resolve);
const timetableInfo = resolve => require(['@/app/orderClass/timetableInfo/timetableInfo.vue'], resolve);
const continueInfo = resolve => require(['@/app/orderClass/continueInfo/continueInfo.vue'], resolve);
const onlineInfo = resolve => require(['@/app/goToClass/onLineInfo/onLineInfo.vue'], resolve);
const service = resolve => require(['@/app/service/service.vue'], resolve);
const callInfo = resolve => require(['@/app/service/callInfo/callInfo.vue'], resolve);
const talkInfo = resolve => require(['@/app/service/talkInfo/talkInfo.vue'], resolve);
const touchInfo = resolve => require(['@/app/service/touchInfo/touchInfo.vue'], resolve);
const classInfo = resolve => require(['@/app/goToClass/classInfo/classInfo.vue'], resolve);
const IM = resolve => require(['@/app/IM/IM.vue'], resolve);

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/bluewhale/view/login',
      component: login,
      name: 'login',
      meta: {
        title: "登录"
      }
    },
    {
      path: '/:id',
      component: index,
      name: 'home',
      meta: {
        title: "首页"
      }
    },
    {
      path: '/bluewhale/view/:id',
      component: index,
      name: 'index',
      meta: {
        title: "首页"
      },
      children: [{
          path: '',
          component: main,
          name: 'main',
          meta: {
            title: "主页",
            index: 'main-main'
          }
        },
        {
          path: 'main',
          component: main,
          name: 'main',
          meta: {
            title: "主页",
            index: 'main-main'
          }
        },
        {
          path: 'userInfo',
          component: userInfo,
          name: 'userInfo',
          meta: {
            title: "个人信息",
            index: 'main-user'
          }
        },
        {
          path: 'orderClass',
          component: orderClass,
          name: 'orderClass',
          meta: {
            title: "报课",
            index: 'main-orderClass'
          }
        },
        {
          path: 'orderClass/orderInfo',
          component: orderInfo,
          name: 'orderInfo',
          meta: {
            title: "报课情况",
            index: 'main-orderClass'
          }
        },
        {
          path: 'orderClass/timetableInfo',
          component: timetableInfo,
          name: 'timetableInfo',
          meta: {
            title: "课程时刻表",
            index: 'main-orderClass'
          }
        },
        {
          path: 'orderClass/continueInfo',
          component: continueInfo,
          name: 'continueInfo',
          meta: {
            title: "班课续报请况",
            index: 'main-orderClass'
          }
        },
        {
          path: 'goToClass',
          component: goToClass,
          name: 'goToClass',
          meta: {
            title: "上课",
            index: 'main-goToClass'
          }
        },
        {
          path: 'goToClass/classInfo/:courseId',
          component: classInfo,
          name: 'classInfo',
          meta: {
            title: "上课信息",
            index: 'main-goToClass'
          }
        },
        {
          path:'goToClass/onlineInfo',
          component:onlineInfo,
          name:'onlineInfo',
          meta:{
            title:"到课情况",
            index: "main-goToClass"
          }
        },
        {
          path: 'service',
          component: service,
          name: 'service',
          meta: {
            title: "服务",
            index: 'main-service'
          }
        },

        {
          path: 'service/callInfo',
          component: callInfo,
          name: 'callInfo',
          meta: {
            title: "通话信息",
            index: 'main-service'
          }
        },
        {
          path: 'service/talkInfo',
          component: talkInfo,
          name: 'talkInfo',
          meta: {
            title: "访谈记录",
            index: 'main-service'
          }
        },
        {
          path: 'service/touchInfo',
          component: touchInfo,
          name: 'touchInfo',
          meta: {
            title: "接触详情",
            index: 'main-service'
          }
        },
        {
          path: 'IM',
          component: IM,
          name: 'IM',
          meta: {
            title: "IM",
            index: 'main-IM'
          }
        }
      ]
    },
    {
      path: '/bluewhale/view/forbidden',
      component: forbidden,
      name: 'forbidden',
      meta: {
        title: "403"
      }
    },
    {
      path: '*',
      component: notFound,
      name: 'notFound',
      meta: {
        title: "404"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  var token = from.query.token || to.query.token;
  if (token) {
    if (!util.getCookie('TOKEN')) {
      util.setCookie('TOKEN',token)
    }
  }
  next();
});

export default router
