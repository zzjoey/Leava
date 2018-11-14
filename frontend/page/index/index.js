
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
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#F9686C',
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
  goStudent: function () {
    wx.redirectTo({
      url: '../student/page/two/two',
    })
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 3000
    })
  },
  goTeacher: function () {
    wx.redirectTo({
      url: '../teacher/page/one/one',
    })
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 3000
    })
  },
  goClass:function(){
    wx.redirectTo({
      url: '../teacher/page/three/three',
    })
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 3000
    })
   
  },
  submit: function () {
    var that=this;
    var id = this.data.id;
    if (this.data.id == "") {
      this.setData({
        txt: "学号不能为空",
        modalHidden: !this.data.modalHidden
      })
      return;
    }
    wx.request({
      url: 'http://127.0.0.1/login',
      data: {
        userId: this.data.id,
        userPwd: this.data.pwd
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success: function (res) {
        var json = res.data;
        console.log(json);
        var flag = parseInt(json["flag"]);
        var role = parseInt(json["role"]);
        switch (flag) {
          case 0:
            that.setData({
              txt: "学号或者工号不存在",
              modalHidden: !that.data.modalHidden
            });
            break;
          case 1:
            that.setData({
              txt: "密码错误",
              modalHidden: !that.data.modalHidden
            });
            break;
          case 2:  
            var school=json["school"];
            console.log(school);
            wx.setStorageSync("school", school);
            if(role==0){
              var name = json["name"];
              var teacher_id = json["teacher_id"];
              wx.setStorageSync("teacher_id", teacher_id);
              wx.setStorageSync('role', '辅导员/班主任');
              wx.setStorageSync("name", name);
              that.goTeacher();
            }            
            else if(role==1) {
              var name = json["name"];
              wx.setStorageSync("name", name);
              var teacher_id = json["teacher_id"];
              wx.setStorageSync("teacher_id", teacher_id);
              wx.setStorageSync('role', '任课老师');
              that.goClass();
            }
            else{
              var s_class=json["s_class"];
              var student_id=json["student_id"];
              var room=json["room"];
              var name = json["name"];
              //添加学生信息到本地缓存，在退出时记得释放
              wx.setStorageSync("s_class",s_class);
              wx.setStorageSync("name", name);
              wx.setStorageSync("room", room);
              wx.setStorageSync("student_id", student_id);
             that.goStudent();
            } 
            break;
        }
      }
   })


  }
})

