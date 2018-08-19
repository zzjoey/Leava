
// 引入coolsite360交互配置设定
require('coolsite.config.js');
var dateTimePicker=require('../../resources/js/dateTimePicker.js');
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
    student_id:'',
    show:false,
    showStart:false,
    showEnd:false,
    selectData: ['请假类别','事假', '病假'],//下拉列表的数据
    index:0,//选择的下拉列表下标
    startdate: '2018-01-01', //开始时间
    enddate:'2018-12-31',    //结束时间
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,  
    endYear: 2050,
    modalHidden:true,   
    txt:'对话框',   //对话框测试标题
    leaveinfo:'',
    startTime:'',
    ImgUrl: '../../../../resources/z_add.png',
    tempFilePaths:'',
    imageIndex:0,
    week: 14,
    day: '三',
    nowDate: '2018-08-15'
  },

  pic: function (options) {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
      },
       fail: function (res) {
        console.log(res.errMsg);
      },
    })
  },

  bindTextAreaBlur: function (e) {
    this.setData({
      leaveinfo: e.detail.value
    })

  },    
 
  //确定按钮点击事件
  modalBindaconfirm: function () {
    this.setData({
      modalHidden: this.data.modalHidden=true
    })
  },
  //取消按钮点击事件
  modalBindcancel: function () {
    this.setData({
      modalHidden: this.data.modalHidden=true
    })
  },

  // 点击下拉显示框
  selectTap(){
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (res) {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDay();
    switch (day) {
      case 0: day = "日"; break;
      case 1: day = "一"; break;
      case 2: day = "二"; break;
      case 3: day = "三"; break;
      case 4: day = "四"; break;
      case 5: day = "五"; break;
      case 6: day = "六"; break;
    }
    var id=wx.getStorageSync("student_id");
    console.log(id);
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      nowDate: date.toLocaleDateString(),
      day: day,
      student_id:id
    });
  },
  changeStartDate(e) {
    this.setData({ startdate: e.detail.value });
  },
  changeEndDate(e){
    this.setData({enddate:e.detail.value});
  },
  changeTime(e) {
    this.setData({ time: e.detail.value });
  },
  changeDateTime(e) {
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
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
  //对话model测试函数
  bindViewTap: function () {
    var cate = this.data.index;
    var sd = this.data.startdate;
    var ed = this.data.enddate;
    var that = this;
    var st = new Date(Date.parse(that.data.startdate.replace(/-/, "/")));
    var et = new Date(Date.parse(that.data.enddate.replace(/-/, "/")));

    console.log(that.data.startdate);
    wx.request({
      url: 'http://192.168.50.88/student/ask_leave',
      data: {
        student_id: that.data.student_id,
        start_time: that.data.startdate,
        end_time: that.data.enddate,
        reason:that.data.leaveinfo,
        flag:1, 
        teacher1_id:111111, 
        teacher2_id:222222, 
        type: 1,
        ensure: "",
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
          success: function(e){
            console.log(e);
          }
    })



  },

  // imgToBase64:function(path){
  //     var img=new Image();
  //     img.src = path;
  //     //图片加载完成执行函数
  //     img.onload = function () {
  //       //设置Canvas的宽高
  //       canvas.width = img.width;
  //       canvas.height = img.height;

  //       //绘制图片
  //       ctx.drawImage(img, 0, 0, width, height);
  //       //转换Base64数据
  //       var dataURL = canvas.toDataURL(type || "image/jpg");
  //       //回调函数
  //       callBack && callBack(dataURL);//dataURL.replace("data:image/png;base64,", "");

  // }


  testPost:function(){
        this.setData({
        student_id: that.data.student_id,
        start_time: st,//,that.data.startdate
        end_time: et,//that.data.enddate,
        flag:1, 
        teacher1_id:'111111', 
        teacher2_id:'222222', 
        type: that.data.index,
        ensure: "",
    })
    var showtxt = 
    // cate + " " + st + " " +
    //   et + " " + 
      this.data.leaveinfo+this.data.flag+this.data.ensure;
    this.setData({
      modalHidden: this.data.modalHidden = false,
      txt: showtxt
    })
  }


})

