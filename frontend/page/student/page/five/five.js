
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
    room:'',
    institute:'',
    cla:'',
    id:'',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    app.editTabBar();
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    // room: '北十B113',
    //   institute:'计算机院',
    //     cla:'计算机科学与技术',
    //       id:'202160***',
    //         name:'张三'
    var room=wx.getStorageSync("room");
    var cla=wx.getStorageSync("s_class");
    var id=wx.getStorageSync("student_id");
    var name=wx.getStorageSync("name");
    var school = wx.getStorageSync('school');
    
    this.setData({
      room:room,
      school: school,
      cla:cla,
      id:id,
      name:name
    })

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3BB8EA'
    });
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
      url: '../changepwd/changepwd',
    })
  },

  exit:function(){
    app.exit();
  },
  cancelConfirmExit: function () {
    wx.showModal({
      title: '提示',
      content: '确定要退出吗',
      success: function (res) {
        if (res.confirm) app.exit();
      }
    })
  }
})

