
var dev = {
  getUserInfo: 'http://localhost:8091/api/gets/userInfo',
  getOrderList: 'http://localhost:8091/api/gets/orderList',
  getOrderClass: 'http://localhost:8091/api/gets/orderClass',
  getMenus: 'http://localhost:8091/api/gets/mainPage',
  getService: 'http://localhost:8091/api/gets/service',
  getCallInfo: 'http://localhost:8091/api/gets/callInfo',
  getTalkInfo: 'http://localhost:8091/api/gets/talkInfo',
  getTouchInfo: 'http://localhost:8091/api/gets/touchInfo',
  getGoToClass: 'http://localhost:8091/api/gets/goToClass',
  getClassInfo: 'http://localhost:8091/api/gets/classInfo',
  getTimeTableInfo: 'http://localhost:8091/api/gets/timeTableInfo',
  getContinueInfo: 'http://localhost:8091/api/gets/continueInfo',
  getOnLineInfo:'http://localhost:8091/api/gets/onLineInfo',
  getIM: 'http://test53.zuoyebang.cc/bluewhale/api/getim'
}

var test53 = {
  getUserInfo: 'http://test53.zuoyebang.cc/bluewhale/api/getstudentbase',
  // getMenus: 'http://test53.zuoyebang.cc/bluewhale/api/getmenus',
  getMenus: 'http://localhost:8091/api/gets/menus',
  getIM: 'http://test53.zuoyebang.cc/bluewhale/api/getim',
  getOrderList: 'http://test53.zuoyebang.cc/bluewhale/api/getusertrade',
  // getOrderList: 'http://localhost:8091/api/gets/orderList',
  getOrderClass: 'http://test53.zuoyebang.cc/bluewhale/api/getusertrade',
  getService: 'http://test53.zuoyebang.cc/bluewhale/api/getcontact',
  getCallInfo: 'http://test53.zuoyebang.cc/bluewhale/api/getcontact',
  getTalkInfo: 'http://test53.zuoyebang.cc/bluewhale/api/getcontact',
  getTouchInfo: 'http://test53.zuoyebang.cc/bluewhale/api/getcontact',
  getGoToClass: 'http://test53.zuoyebang.cc/bluewhale/api/getclassperformance',
  getClassInfo: 'http://test53.zuoyebang.cc/bluewhale/api/getclassperformance',
  getTimeTableInfo: 'http://test53.zuoyebang.cc/bluewhale/api/getusertrade',
  getContinueInfo: 'http://test53.zuoyebang.cc/bluewhale/api/getusertrade',
  getOnLineInfo:'http://test53.zuoyebang.cc/bluewhale/api/getonlinestat',
}

var build = {
  getUserInfo: '/bluewhale/api/getstudentbase',
  getMenus: '/bluewhale/api/getmenus',
  getIM: '/bluewhale/api/getim',
  getOrderList: '/bluewhale/api/getusertrade',
  getOrderClass: '/bluewhale/api/getusertrade',
  getService: '/bluewhale/api/getcontact',
  getCallInfo: '/bluewhale/api/getcontact',
  getTalkInfo: '/bluewhale/api/getcontact',
  getTouchInfo: '/bluewhale/api/getcontact',
  getGoToClass: '/bluewhale/api/getclassperformance',
  getClassInfo: '/bluewhale/api/getclassperformance',
  getTimeTableInfo: '/bluewhale/api/getusertrade',
  getContinueInfo:'/bluewhale/api/getusertrade',
  getOnLineInfo:'/bluewhale/api/getonlinestat',
  // getIM : 'http://test53.zuoyebang.cc/bluewhale/api/getim'
}

var api = test53;

if(process.env.NODE_ENV == 'production'){
  api = build;
}

export default api
