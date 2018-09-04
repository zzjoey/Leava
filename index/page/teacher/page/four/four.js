
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

    clas: '数嵌161',
    sname: '某某',
    id: '202160521',
    room: '北十B113',
    date: '2018-10-1',
    leaveinfo: '想回宿舍写程序',
    flag: 0,
    ensurebase64: ''

  
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
    var ensurebase64 = wx.getStorageSync("ensure");
    if (ensurebase64 == null)
      ensurebase64 = '';



    wx.request({
      url: 'http://api.zzjoeyyy.com/student/search_leave_detail',
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
          ensurebase64: ensurebase64
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
  
})

