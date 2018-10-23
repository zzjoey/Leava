
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
    clas:'',
    name:'',
    id:'',
    room:'',
    date:'',
    leaveinfo:'',
    flag:0,
    ensure:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    app.editTabBar();
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#F9686C',
    })
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    var clas=wx.getStorageSync('s_class');
    var name=wx.getStorageSync('name');
    var room =wx.getStorageSync('room');
    var id=wx.getStorageSync("student_id");
    var timeStartToEnd = wx.getStorageSync("timeStartToEnd");
    var reason=wx.getStorageSync("reason");
    var flag = wx.getStorageSync("flag");
    var ensure=wx.getStorageSync("ensure");

    if (ensure==null)
    ensure='';

    this.setData({
      clas:clas,
      name:name,
      room:room,
      id:id,
      date:timeStartToEnd,
      leaveinfo:reason,
      flag:flag,
      ensure: ensure
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
  goBack:function(){
    wx.redirectTo({
      url: '../three/three',
    })
  }
})

