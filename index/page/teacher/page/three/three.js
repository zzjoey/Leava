
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
    name:"赵星",
    hiddenmodalput:true
  
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
    console.log(this.data.inputname);
    this.setData({
      hiddenmodalput: true
    })
  },
  getInput:function(e){
    this.setData({
      inputname:e.detail.value
    })
    
  },
  goTwo:function(){
    wx.navigateTo({
      url: '../two/two',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // init:function(){
  //   var that=this;
  //   var teacher_id=wx.getStorageSync('teacher_id');
  //   var name=wx.getStorageSync('name');
  //   wx.request({
  //     url: 'http://api.zzjoeyyy.com/teacher/search_leave',
  //     data: {
  //       teacher_id: teacher_id
  //     },
  //     header: {
  //       "content-type": "application/json"
  //     },
  //     method: "post",
  //     success: function (e) {
  //       var json=e.data;
  //       var stuarr=new Array();
  //       var stuinfo =new Array();
  //       var emptyjson=JSON.parse("{}");
  //       for (var x = 0; JSON.stringify(json[x])!='{}'&&json[x]!=undefined;x++){
  //         //console.log(json[x]);
  //         var student_id = json[x].student_id;
  //         if (stuarr.indexOf(student_id)==-1){
  //           wx.request({
  //             url: 'http://api.zzjoeyyy.com/student/search_leave_detail',
  //             data: {
  //               student_id: student_id
  //             },
  //             header: {
  //               "content-type": "application/json"
  //             },
  //             method: "post",
  //             success: function (e) {
  //               stuarr.push(student_id); 
  //               if (JSON.stringify(e.data)!="{}"){
  //                 //console.log(e.data[0]);
  //                 var cla = e.data[0].class;
  //                 var name = e.data[0].name;
  //                 var str=cla+name;
  //                 stuinfo.push(str);
  //               }
  //             }
  //           })
  //         }
  //      }
  //     }
  //   })
  //   console.log(stuinfo.length);
  //   for (var i = 0; i < stuinfo.length; i++) {
  //     console.log(stuinfo[i]);
  //   }
  //   that.setData({
  //     stuinfo: stuinfo,
  //     name: name
  //   })
 // },
  onLoad () {
   // this.init();
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    var role=wx.getStorageSync('role');
    if(role=='辅导员/班主任'){
      app.editTabBarTeacher1();  
    } else{
      app.editTabBarTeacher2();
      this.teacher2Init();
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

  teacher2Init(){
    var teacher_id=wx.getStorageSync('teacher_id');
    wx.request({
              url: 'http://api.zzjoeyyy.com/teacher2/search_leave',
              data: {
                teacher_id: teacher_id
              },
              header: {
                "content-type": "application/json"
              },
              method: "post",
              success:function(e){
             
                }

    })
  }

})

