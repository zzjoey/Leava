
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "three",
  inputname:'',
  /**
   * 页面的初始数据
   */


  data: {
    name:"查无此人",
    hiddenmodalput:true,
    infojson:''
  
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


  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  confirm: function (e) {
    var name=this.data.inputname;
    this.setData({
      hiddenmodalput: true,
      name:name
    })
  //  wx.setStorageSync('name',name);
    var name = this.data.name;
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/search_name',
      data: {
        name: name
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success: function (res) {
        console.log(res.data);
        var json = res.data;
        if (json == 'name is not exist') {
          that.setData({
            name: name,
            infojson:{}
          })
          return;
        }
        for (var i = 0; json[i.toString()] != null; i++) {
          json[i].end_time = json[i].end_time.substring(0, 10);
          json[i].start_time = json[i].start_time.substring(0, 10);
        }

        that.setData({
          infojson: json,
        });
      }
    })
  },
  getInput:function(e){
    this.setData({
      inputname:e.detail.value
    })
    
  },
  goMoreInfo:function(e){
    //在three.js中已经放入缓存 infotype:'周末宿舍假',
    // cla: '计算机科学与技术',
    // id: '202160***',
    // name: '哈哈',
    // room: '北十B113',
    // info: '哈哈哈'
    try {
      var infojson = this.data.scjson;
      var index = e.target.id;//获得在<text>标签中的日期范围值
      console.log(index);
      console.log(infojson[index]);
      var student_id = infojson[index].student_id;
      var timeStartToEnd = infojson[index].start_time + '——' + infojson[index].end_time;
      wx.setStorageSync("timeStartToEnd", timeStartToEnd);
      wx.setStorageSync("student_id", student_id);
      var reason = infojson[index].reason;
      wx.setStorageSync("reason", reason);
      var flag = infojson[index].flag;
      wx.setStorageSync("flag", flag);
      var ensure = infojson[index].ensure;
      if (ensure == null) ensure = '';
      wx.setStorageSync("ensure", ensure);
      var leave_num = infojson[index].leave_num;
      wx.setStorageSync("leave_num", leave_num);      
      console.log('发送请求的'+student_id);
  


    } catch (ep) {
      console.log(ep);
    }
    wx.redirectTo({
      url: '../four/four',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    var role=wx.getStorageSync('role');
    if(role=='辅导员/班主任'){
      app.editTabBarTeacher1();
      this.teacherInit(1);  
    } else{
      app.editTabBarTeacher2();
      this.teacherInit(2);
    }
    this.setData({
      role:role
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

  teacherInit(i){
    var that=this;
    var url;
    if(i==1){
      url = 'http://127.0.0.1/teacher/search_leave';
    }else{
      url = 'http://127.0.0.1/teacher2/search_leave';
    }
    var teacher_id=wx.getStorageSync('teacher_id');
    wx.request({
      url: url,
      data: {
        teacher_id: teacher_id
      },
      header: {
        "content-type": "application/json"
      },
      method: "post",
      success:function(res){
        var json = res.data;
        var json2=json;
        console.log(json);
        for (var i = 0; json[i.toString()] != null; i++) {
          json[i].end_time = json[i].end_time.substring(0, 10);
          json[i].start_time = json[i].start_time.substring(0, 10);
        }      
        that.setData({
          infojson: json,
          scjson:json2
        });
      
      }

    })

   

  }

})

