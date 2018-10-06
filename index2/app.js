var coolsite360 = require('./coolsite/index.js');
wx.cloud.init({
  traceUser: true
});
const db = wx.cloud.database();
App({
  coolsite360: coolsite360,
  //第一种状态的底部  
  editTabBar: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态    
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },

  exit:function(){
    wx.clearStorageSync();//同步清空本地缓存
    wx.redirectTo({
      url: '/page/index/index',
    })
  },

  //第二种状态的底部  
  editTabBarTeacher1: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBarTeacher1;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态    
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },  
  editTabBarTeacher2: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBarTeacher2;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态    
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },  
  globalData: {
    userInfo: null,
    pop: 2,
    num: 0,
    tabBar: {
      "color": "#7F8389",
      "selectedColor": "#0caccf",
      "borderStyle": "white",
      "backgroundColor": "#F2F2F2",
      "list": [
        {
          "pagePath": "/page/student/page/two/two",
          "text": "请假",
          "iconPath": "/resources/cf40a95b8f217158f823f9b7ca4d1010.png",
          "selectedIconPath": "/resources/6977462f74dff3dd731bad9f9f8d2485.png",
          "clas": "menu-item",
          "selectedColor": "#1296db",
          active: true
        },
        {
          "pagePath": "/page/student/page/three/three",
          "text": "消息",
          "iconPath": "/resources/d83f27493387b5ce6ed3c55cedf86662.png",
          "selectedIconPath": "/resources/5900aea920b3ffd281b7406b0a064406.png",
          "selectedColor": "#1296db",
          "clas": "menu-item",
          active: false
        },
        {
          "pagePath": "/page/student/page/five/five",
          "text": "我",
          "iconPath": "/resources/847cebd0c6211832c319a1b12f5221f0.png",
          "selectedIconPath": "/resources/1cec6c375417abdc2649fcf65766bd16.png",
          "selectedColor": "#1296db",
          "clas": "menu-item",
          active: false
        }
      ],
      "position": "bottom"
    },
    tabBarTeacher1: {
      "color": "#7F8389",
      "selectedColor": "#0caccf",
      "borderStyle": "#ccc",
      "backgroundColor": "#F2F2F2",
      "list": [
        {
          "pagePath": "/page/teacher/page/one/one",
          "text": "消息",
          "iconPath": "/resources/cf40a95b8f217158f823f9b7ca4d1010.png",
          "selectedIconPath": "/resources/6977462f74dff3dd731bad9f9f8d2485.png",
          "clas": "menu-item2",
          "selectedColor": "#1296db",
          active: true
        },
        {
          "pagePath": "/page/teacher/page/three/three",
          "text": "批假",
          "iconPath": "/resources/d83f27493387b5ce6ed3c55cedf86662.png",
          "selectedIconPath": "/resources/5900aea920b3ffd281b7406b0a064406.png",
          "selectedColor": "#1296db",
          "clas": "menu-item2",
          active: false
        },
        {
          "pagePath": "/page/teacher/page/five/five",
          "text": "我",
          "iconPath": "/resources/847cebd0c6211832c319a1b12f5221f0.png",
          "selectedIconPath": "/resources/1cec6c375417abdc2649fcf65766bd16.png",
          "selectedColor": "#1296db",
          "clas": "menu-item2",
          active: false
        }
      ],
      "position": "bottom"
    },
    tabBarTeacher2: {
      "color": "#7F8389",
      "selectedColor": "#0caccf",
      "borderStyle": "#ccc",
      "backgroundColor": "#F2F2F2",
      "list": [
        {
          "pagePath": "/page/teacher/page/three/three",
          "text": "消息",
          "iconPath": "/resources/cf40a95b8f217158f823f9b7ca4d1010.png",
          "selectedIconPath": "/resources/6977462f74dff3dd731bad9f9f8d2485.png",
          "clas": "menu-item2",
          "selectedColor": "#1296db",
          active: true
        },
        {
          "pagePath": "/page/teacher/page/five/five",
          "text": "我",
          "iconPath": "/resources/847cebd0c6211832c319a1b12f5221f0.png",
          "selectedIconPath": "/resources/1cec6c375417abdc2649fcf65766bd16.png",
          "selectedColor": "#1296db",
          "clas": "menu-item2",
          active: false
        }
      ],
      "position": "bottom"
    }
  }
})