
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "five",
  /**
   * 页面的初始数据
   */

  data: {
    school:'',
    name:'',
    teacher_id:111111,
    role:''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  init:function(){
    var name = wx.getStorageSync('name');
    var role=wx.getStorageSync('role');
    var teacher_id = wx.getStorageSync('teacher_id');
    var school=wx.getStorageSync('school');
    this.setData({
      name: name,
      teacher_id:teacher_id,
      role:role,
      school:school
    })
  },
  onLoad () {
    this.init();
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3BB8EA'
    });
    var role = wx.getStorageSync('role');
    if (role == '辅导员/班主任')
      app.editTabBarTeacher1();
    else app.editTabBarTeacher2();
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
  goChangePwd:function(){
    wx.redirectTo({
      url: '../change/changepwd',
    })
  },
  cancelConfirmExit: function () {
    wx.showModal({
      title: '提示',
      content: '确定要退出吗',
      success: function (res) {
        if (res.confirm) app.exit();
      }
    })
  },
})

