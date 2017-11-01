
var app=getApp();
  Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: ' ',
    password: ' '

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  userName: function (event) {
    console.log(event.detail.value)
    this.setData({
      userName: event.detail.value
    })
  },
  password: function (e) {
    console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })
  },
  loginClick: function (e) {
    //获取用户和密码
    var name = this.data.userName;
    var pass = this.data.password;
    //如果不正确，给出提示
    if (this.data.userName.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '不存在此用户',
        duration: 2000
      })       //登录提示框
    } else {
      wx.showLoading({
        title: '登录中',
      })
      app.globalData.userInfo = { userName: this.data.userName, password: this.data.password }
      //缓存用户登录信息
       wx.setStorageSync("userName", this.data.userName)
      wx.setStorageSync("password", this.data.password)
      wx.redirectTo({
        url: 'pages/index/index',
      })
    }
  }

})