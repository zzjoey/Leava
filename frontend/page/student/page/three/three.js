
// 引入coolsite360交互配置设定
require('coolsite.config.js');
// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "three",
  /**
   * 页面的初始数据
   */

  data: {
    infojson:"",
    student_id:0,
    name:""
  },
  exit:function(){

  },
  goMoreInfo:function(e){

    //在index.js中已经放入缓存s_class，name，room，student_id
    try{
    var infojson=this.data.infojson;
    var index = e.target.id;//获得在<text>标签中的日期范围值
    var timeStartToEnd = infojson[index].start_time +'——'+infojson[index].end_time;
    wx.setStorageSync("timeStartToEnd", timeStartToEnd);
    var reason = infojson[index].reason;
    wx.setStorageSync("reason", reason);
    var flag = infojson[index].flag;
    wx.setStorageSync("flag",flag);
    var ensure=infojson[index].ensure;
    if(ensure==null)ensure='';
    wx.setStorageSync("ensure", ensure);
    }catch(e){
      console.log(e);
    }
    
    wx.redirectTo({
      url: '../four/four',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    app.editTabBar();
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#F9686C',
    })
    // 注册coolsite360交互模块
    var sname = wx.getStorageSync("name");
    var student_id = wx.getStorageSync("student_id");
    console.log(student_id);
    var that = this;
    wx.request({
      url: "http://127.0.0.1/student/search_leave",
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      data: {
        student_id: student_id
      },
      success: function (res) {
        var json = res.data;
        console.log(json);
        for(var i=0;json[i.toString()]!=null;i++){
          json[i].end_time=json[i].end_time.substring(0,10);
          json[i].start_time = json[i].start_time.substring(0, 10);
        }

        that.setData({
          infojson: json,
          name:sname
        });
      }
    })
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

