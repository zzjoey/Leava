
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "two",
  /**
   * 页面的初始数据
   */

  data: {
    infotype:'',
    cla:'',
    id:'',
    name: '',
    room:'',
    info:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    var role = wx.getStorageSync('role');
    if (role == '辅导员/班主任') {
      app.editTabBarTeacher1();
    } else {
      app.editTabBarTeacher2();
    }

    var str=wx.getStorageSync("str");
    var that=this;
    var leave_num = parseInt(str.split('_')[0]);
    console.log(leave_num);
    var student_id = str.split('_')[1];
    wx.request({
      url: 'http:///127.0.0.1/student/search_leave_detail',
      data:{
        student_id:student_id
      },
      header: {
        "content-type": "application/json"
      },
      method: "post",
      success:function(e){
        var json=e.data[0];
        var leaveinfojson = wx.getStorageSync('leaveinfojson');
        console.log(leaveinfojson);
        
        for(var x in leaveinfojson){
          if (leaveinfojson[x].leave_num==leave_num){
            var stime = leaveinfojson[x].start_time;
            var etime = leaveinfojson[x].end_time;
            var ensure=leaveinfojson[x].ensure;
            that.setData({
              cla: json.class,
              name: json.name,
              room: json.room,
              id: student_id,
              stime: stime,
              etime: etime,
              info: leaveinfojson[x].reason,
              ensure: ensure
            })
            break;
          }
        }
     
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
  changeflag2:function(){
    var str = wx.getStorageSync("str");
    var leave_num = parseInt(str.split('_')[0]);
      wx.request({
        url: 'http://127.0.0.1/teacher/update_leave',
        data: {
          leave_num: leave_num,
          flag:2
        },
        header: {
          "content-type": "application/json"
        },
        method: "post",
        success: function (e) {
          console.log(e.data);          
          if(e.data=="True"){
            wx.redirectTo({
              url: '../one/one',
            });
            wx.showToast({
              title: '批假成功',
              icon: 'success',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '批假失败',
              icon:'fail',
              duration:2000
            })
          }
        }
      })
  },
  changeflag0:function(){
    var str = wx.getStorageSync("str");
    var leave_num = parseInt(str.split('_')[0]);
    wx.request({
      url: 'http://127.0.0.1/teacher/update_leave',
      data: {
        leave_num: leave_num,
        flag: 0
      },
      header: {
        "content-type": "application/json"
      },
      method: "post",
      success: function (e) {
        console.log(e.data);
        if (e.data == "True") {
          wx.redirectTo({
            url: '../one/one',
          })
          wx.showToast({
            title: '批假成功',
            icon: 'success',
            duration: 2000
          });
        }else{
          wx.showToast({
            title: '批假失败',
            icon: 'fail',
            duration: 2000
          })
        }
      }
    })
  },
  preImage: function () {
    console.log("ok");
    var urlArray = new Array();
    var ensure = this.data.ensure;
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

