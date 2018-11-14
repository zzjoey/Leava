
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "four",
  /**
   * 页面的初始数据
   */

  data: {

    clas: '',
    sname: '',
    id: '',
    room: '',
    date: '',
    leaveinfo: '',
    flag: 0,
    ensure: ''

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    var role = wx.getStorageSync('role');
    if (role == '辅导员/班主任') {
      app.editTabBarTeacher1();
    } else {
      app.editTabBarTeacher2();
    }
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#F9686C',
    })
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    var that=this;
    var id = wx.getStorageSync("student_id");
    var timeStartToEnd = wx.getStorageSync("timeStartToEnd");
    var reason = wx.getStorageSync("reason");
    var flag = wx.getStorageSync("flag");
    var ensure = wx.getStorageSync("ensure");
    if (ensure == null)
      ensure = '';



    wx.request({
      url: 'http://127.0.0.1/student/search_leave_detail',
      data: {
        student_id: id
      },
      header: {
        "content-type": "application/json"
      },
      method: "post",
      success: function (res) {
        var sjson = res.data[0];
        console.log(sjson);
        var room = sjson["room"];
        var sname = sjson["name"];
        var cla = sjson["class"];
        console.log(cla);
        that.setData({
          clas: cla,
          sname: sname,
          room: room,
          id: id,
          date: timeStartToEnd,
          leaveinfo: reason,
          flag: flag,
          ensure: ensure
        })
      }

    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // 执行coolsite360交互组件展示
    app.coolsite360.onShow(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },
 

  //以下为自定义点击事件
  preImage: function () {
    console.log("ok");
    var urlArray = new Array();
    var ensure=this.data.ensure;
    wx.previewImage({
      current: ensure,
      urls: [ensure],
      success: function (res) {

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  goEdit:function(){
    var teacher_id = wx.getStorageSync("teacher_id");
    var that =this;
    wx.request({
      url: 'http://127.0.0.1/teacher/search_leave',
      data: {
        teacher_id: teacher_id
      },
      header: {
        "content-type": "application/json"
      },
      method: "post",
      success: function (e) {
        var json = e.data;
        wx.setStorageSync('leaveinfojson',json);
        var student_id = wx.getStorageSync("student_id");
        var leave_num = wx.getStorageSync("leave_num");
        var str = leave_num + "_" + student_id;
        wx.setStorageSync("str", str);
        wx.redirectTo({
          url: '../edit/edit',
        })
      }
    })
  },
  goBack:function(){
    wx.redirectTo({
      url: '../three/three',
    })
  }
})

