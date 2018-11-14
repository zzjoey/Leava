
// 引入coolsite360交互配置设定
require('coolsite.config.js');
var dateTimePicker=require('../../../../resources/js/dateTimePicker.js');
// 获取全局应用程序实例对象
const app = getApp();

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
    savedFilePath:'/resources/z_add.png',
    base64: '',
    imageIndex:0,
    week: 14,
    day: '三',
    nowDate: '2018-08-15',
    school:['请先选择院系','计算机工程学院','通信工程学院','艺术与设计学院','能源与动力工程学院','电力工程学院'],
    s1index:0,
    s2index:0,
    t1: [' '],
    t2:[' '],
    t1id:['0'],
    t2id:['0'],
    t1index:0,
    t2index:0,
    t1disabled:false,
    t2disabled:false,
    filepath:'',
    cancelConfirm:true
  },
  exit:function(){
    app.exit();
  },
  s1PickerSelected:function(e){
    // console.log(e.detail.value);
    this.setData({
      s1index: e.detail.value
    })
    var that =this;
    var school=this.data.school[this.data.s1index];
    wx.request({
      url: "http://127.0.0.1/teacher/search_id",
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      data:{
        school: school
      },
      success:function(e){
        var json=e.data;
        var namearr=new Array();
        var idarr=new Array();
        for(var x in json){
          console.log(json[x]);
          if(json[x].role==0){
            var id = json[x].teacher_id;
            var name=json[x].name;
            namearr.push(name);
            idarr.push(id);
          }
        }
        that.setData({
          t1: namearr,
          t1id:idarr,
          t1disabled:true
        })
      }
    })
  },
  s2PickerSelected: function (e) {
    this.setData({
      s2index: e.detail.value
    })

    var that = this;
    var school = this.data.school[this.data.s2index];
    wx.request({
      url: "http://127.0.0.1/teacher/search_id",
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      data: {
        school: school
      },
      success: function (e) {
        var json = e.data;
        var namearr = new Array();
        var idarr = new Array();
        for (var x in json) {
          console.log(json[x]);
          if (json[x].role == 1) {
            var id = json[x].teacher_id;
            var name = json[x].name;
            namearr.push(name);
            idarr.push(id);
          }
        }
        that.setData({
          t2: namearr,
          t2id: idarr,
          t2disabled:true
        })
      }
    })
  },
  t1PickerSelected: function (e) {
    this.setData({
      t1index: e.detail.value
    })
  },
  t2PickerSelected: function (e) {
    this.setData({
      t2index: e.detail.value
    })
  },
  chooseImageTap:function(){
    let that=this;
    wx.showActionSheet({
      itemList: ['从相册中选择','拍照'],
      itemColor:'black',
      success:function(e){
        if(!e.canel){
          if(e.tapIndex==0){
            that.chooseWxImage('album');
          }else if(e.tapIndex==1){
            that.chooseWxImage('camera');
          }
        }

      }
    })


  },

  chooseWxImage:function(type){
    let that=this;
    let tempPath;
    wx.chooseImage({
      count:1,
      sizeType:['original','compressed'],
      sourceType:[type],
      success: function(res) {
        tempPath=res.tempFilePaths[0];
        let tmpFilepath = res.tempFiles[0].path;
        let _this=that;
        wx.saveFile({
          tempFilePath: tempPath,
          success:function(res){
            let savedFilePath=res.savedFilePath;
            console.log(savedFilePath);
            _this.setData({
              savedFilePath: savedFilePath,
              filepath:tmpFilepath
            })
          }
        })
      }
    })

  },

  pickCamera:function(){
    this.chooseWxImage('camera');
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
  cancelConfirmExit:function(){
    wx.showModal({
      title: '提示',
      content: '确定要退出吗',
      success:function(res){
        if (res.confirm) app.exit();
      }
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
    app.editTabBar();
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#F9686C',
    })
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
    var today=date.getDate();
    today=today<10?'0'+today:today;
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
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      nowDate: date.toLocaleDateString(),
      startdate: year+'-'+month+'-'+today,
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
    var that = this;
    if(cate==0){
      that.setData({
        txt: '添加失败(>_<)',
        modalHidden: !that.data.modalHidden
      })
      return;
    }

    var sd = this.data.startdate;
    var ed = this.data.enddate;
    var st = new Date(Date.parse(that.data.startdate.replace(/-/, "/")));
    var et = new Date(Date.parse(that.data.enddate.replace(/-/, "/")));

    var _this =this;
    
    var fileId;
    var file=this.data.savedFilePath;
    file = file.substring(file.lastIndexOf("/")+1);
    if (file =='z_add.png'){
      file="";
      that.upLoad(file);
      return;
      }
    wx.cloud.uploadFile({
      cloudPath: file,
      filePath: this.data.savedFilePath,
      success:function(res){
        fileId=res.fileID;
        that.upLoad(fileId);
      },
      fail:console.error
    })
  },

  upLoad:function(fileId){
    var t1id = this.data.t1id[this.data.t1index];
    var t2id = this.data.t2id[this.data.t2index];
    var typ = this.data.index;//不能与关键字type冲突，命名为typ
    var that=this;
     wx.request({
      url: 'http://127.0.0.1/student/ask_leave',
      data: {
        student_id: that.data.student_id,
        start_time: that.data.startdate,
        end_time: that.data.enddate,
        reason:that.data.leaveinfo,
        flag:1, 
        teacher1_id:t1id, 
        teacher2_id:t2id, 
        type: typ,//请假类型
        ensure:fileId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
          success: function(e){
            console.log(e);
            if(e.data=='True')
            that.setData({
                txt:'添加成功',
                modalHidden:!that.data.modalHidden
              })
            else{
              that.setData({
                txt: '添加失败(>_<)',
                modalHidden: !that.data.modalHidden
              })
            }
          }
    })


  },

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
      this.data.leaveinfo+this.data.flag+this.data.ensure;
    this.setData({
      modalHidden: this.data.modalHidden = false,
      txt: showtxt
    })
  }


})