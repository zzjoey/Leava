
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "one",
  /**
   * 页面的初始数据
   */

  data: {
    institute:'请假管理'
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    var that =this;
    app.coolsite360.register(this);
    var teacher_id=wx.getStorageSync("teacher_id");
    console.log(teacher_id);
    app.editTabBarTeacher1();
    wx.request({
      url: 'http://127.0.0.1/teacher/search_leave',
      data:{
        teacher_id:teacher_id
      },
      header:{
        "content-type":"application/json"
      },
      method:"post",
      success:function(e){
        console.log(e.data);
        var currinfo=e.data;
        var json=e.data;
        var nowdate=new Date(); 
        for (var x in currinfo){
          // console.log(currinfo[x]);
          var sdate = new Date(currinfo[x].start_time.replace(/-/,'/'));
          var edate = new Date(currinfo[x].end_time.replace(/-/, '/')); 
          var time = (edate - sdate) / (1000 * 60 * 60 * 24)+1;
          var flag=currinfo[x].flag;
          currinfo[x]["time"]=parseInt(time);
          if(flag!=1){
            delete currinfo[x];
          }
        }
        console.log(currinfo);
        that.setData({
          currinfo:currinfo,
          leaveinfo:json
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
  exit:function(){
    app.exit();
  },
  goMoreInfo:function(e){
    var str=e.target.id;
    wx.setStorageSync('str', str);
    wx.setStorageSync('leaveinfojson', this.data.leaveinfo);
    wx.redirectTo({
      url: '../two/two',
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
  }
})

