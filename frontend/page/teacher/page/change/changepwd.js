
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
    modalHidden:false,
    ts1: '请确保无误再提交',
    ts2:'两次密码不一致',
    ts1hidden:true,
    ts2hidden:true
  },
  getPwd1:function(e){
    var pwd1=e.detail.value;
    this.setData({
      pwd1:pwd1
    })
  },
  getPwd2:function(e){
    var pwd2 = e.detail.value;
    if (pwd2 == this.data.pwd1) {
      this.setData({
        pwd2: pwd2,
        ts2hidden:true
      })
    } else {
      this.setData({
        pwd2: pwd2,
        ts2hidden: false
      })
    }
  },
  submit:function(){

    if(!this.data.ts2hidden){
      this.setData({
        ts1hidden:false
      })
      return;
    }
    var teacher_id = wx.getStorageSync('teacher_id');
    var pwd=this.data.pwd2;
    wx.request({
      url: 'http://127.0.0.1/change_pwd',
      data: {
        userId: teacher_id,
        userPwd: pwd
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success:function(e){
        console.log(e);
        if(e["data"]=="True"){
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 3000
          })
          wx.redirectTo({
            url: '/page/index/index'
          })
        }else{
          ts1:'出现错误了<(￣3￣)> '
          ts1hidden: true
        }
      }
    })
    wx.navigateBack({});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 注册coolsite360交互模块
    var role = wx.getStorageSync('role');
    if (role == '辅导员/班主任')
      app.editTabBarTeacher1();
    else app.editTabBarTeacher2();
    app.coolsite360.register(this);
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3BB8EA'
    });

    var id = wx.getStorageSync("teacher_id");
    this.setData({
      id:id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 执行coolsite360交互组件展示
    app.coolsite360.onShow(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },


  //以下为自定义点击事件
  goBack: function () {
    wx.redirectTo({
      url: '../five/five',
    })
  }
})

