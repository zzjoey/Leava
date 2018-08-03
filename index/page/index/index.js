
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "index",
  /**
   * 页面的初始数据
   */

  data: {
    modalHidden: true,
    id:'',
    pwd:''
  
  },
  show:function(){
    var showtxt = this.data.id + " " + this.data.pwd;
    this.setData({
      txt:showtxt,
      modalHidden: !this.data.modalHidden
    })
  }, 
  modalBindaconfirm: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  getPwd:function(e){
    this.data.pwd = e.detail.value;
  },
  getId:function(e){
    this.data.id = e.detail.value;
  },
  gobackpwd:function(){
    wx.navigateTo({
      url: '../getbackpwd/getbackpwd',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
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
  
})

