// pages/paodan/index.js
var requesturl = getApp().globalData.requesturl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chkmenu: 1, //订单的状态
    status: "all", //状态值
    orderlist: [], //订单列表
    chkorderid: 0, //选择的订单id
    /*投诉雇主*/
    istsshow: "", //投诉弹窗显示
    tousuinfo: "", //投诉内容
    tousutu: [], //投诉图
    /*取消订单*/
    isqxshow: "", //取消弹窗显示
    cancelinfo: "", //取消原因
    canceltu: [], //取消图片
    cacelnum: 0, //取消次数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //菜单的选择
  chkmenu: function(e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.status;
    id = parseInt(id);
    //赋值部分
    that.setData({
      chkmenu: id,
      status: id == 1 ? "all" : id
    })
    //初始化订单
    that.InitOrder();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;

    //初始化订单
    that.InitOrder();
  },
  //初始化订单
  InitOrder: function() {
    var that = this;

    //参数部分
    var chkmenu = that.data.chkmenu;
    console.log("菜单id:" + chkmenu);
    //查询数据 
    wx.request({
      url: requesturl + '/staff/index',
      data: {
        openid: getApp().globalData.openid,
        status: that.data.status
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("跑单列表结果:");
        console.log(res);
        //赋值部分
        that.setData({
          orderlist: res.data.data,
          cacelnum: getApp().globalData.cancel_count
        })
      }
    })
  },
  //跳转到详情
  godetail: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../paodan/detail?id=' + id,
    })
  },
  //调整到消息
  gonews:function(e){
    wx.switchTab({
      url: '../message/index?uid='+e.currentTarget.dataset.id,
    })
  },
  //取消跑单
  cancelorder: function(e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;

    that.setData({
      chkorderid: id
    })

    //取消订单
    that.cancelopt();
  },
  //取消订单
  cancelopt: function() {
    var that = this;

    that.setData({
      isqxshow: "c-state1"
    })
  },
  //关闭取消弹窗
  closeqxmodal: function() {
    var that = this;

    that.setData({
      isqxshow: ""
    })
  },
  //获取取消原因
  getqxopt: function(e) {
    var that = this;

    that.setData({
      cancelinfo: e.detail.value
    })
  },
  //获取取消的图片
  uploadqxopt: function() {
    var that = this;

    //选取图片上传
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        wx.showLoading({
          title: '正在上传中...',
        })

        for (var i = 0; i < tempFilePaths.length; i++) {
          that.uploadtu(tempFilePaths[i],1);         
        }
        wx.hideLoading();
      }
    })
  },
  //上传图片
  uploadtu: function(tupath,kind) {
    var that=this;
    //参数部分
    var canceltu = that.data.canceltu;  //已经上传取消的图片
    var tousutu = that.data.tousutu;//已经上传投诉的图片
    //上传文件
    wx.uploadFile({
      url: requesturl + '/upload/upload',
      filePath: tupath,
      name: 'file',
      success: function(res) {
        if(kind==1){
          canceltu=canceltu.concat(res.data);
          that.setData({
            canceltu: canceltu
          })
        }else{
          tousutu=tousutu.concat(res.data);
          that.setData({
            tousutu: tousutu
          })
        }
      }
    })
  },
  //提交申请取消跑单
  postbook: function() {
    var that = this;
    //参数部分
    var openid = getApp().globalData.openid,
      cancelinfo = that.data.cancelinfo, //取消原因
      canceltu = that.listtustring(that.data.canceltu), //取消图片    
      orderid = that.data.chkorderid;

    //提交
    wx.request({
      url: requesturl + '/receipt/cancel',
      data: {
        openid: openid,
        cancelinfo: cancelinfo, //取消原因
        canceltu: canceltu, //取消图片    
        leg_id: orderid
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log("取消订单结果:");
        console.log(res);
        if(res.data.result){
          that.setData({
            isqxshow: "",
            cancelinfo:"", //取消原因
            canceltu:[]
          })
          that.showAlert("申请取消跑单成功.");
          that.InitOrder();
        }else{
          that.showAlert(res.data.msg);
          that.InitOrder();
        }        
      }
    })
  },
  //开始执行
  runopt: function(e) {
    var that = this;

    //参数部分
    var id = e.currentTarget.dataset.id;
    //请求接口提交
    wx.request({
      url: requesturl + '/receipt/tasks',
      data: {
        openid: getApp().globalData.openid,
        state_des: "start",
        legs_id: id
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("开始执行的结果:");
        console.log(res);
        if (!res.data.result) {
          that.showAlert(res.data.msg);
        }
        that.InitOrder();
      }
    })
  },
  //进行中
  finishopt:function(e){
    var that = this;

    //参数部分
    var id = e.currentTarget.dataset.id;
    //请求接口提交
    wx.request({
      url: requesturl + '/receipt/tasks',
      data: {
        openid: getApp().globalData.openid,
        state_des: "complete",
        legs_id: id
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      success: function (res) {
        console.log("完成执行的结果:");
        console.log(res);
        if (!res.data.result) {
          that.showAlert(res.data.msg);
        }
        that.InitOrder();
      }
    })
  },
  //投诉雇主
  tousuopt: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;

    that.setData({
      istsshow: "c-state1",
      chkorderid: id
    })
  },
  //关闭弹窗
  closemodal: function() {
    var that = this;

    that.setData({
      istsshow: ""
    })
  },
  //获取投诉内容
  gettsopt: function(e) {
    var that = this;

    that.setData({
      tousuinfo: e.detail.value
    })
  },
  //上传投诉图片
  uploadtsopt: function() {
    var that = this;
    
    //选取图片上传
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        wx.showLoading({
          title: '正在上传中...',
        })

        for (var i = 0; i < tempFilePaths.length; i++) {
          var tupath = that.uploadtu(tempFilePaths[i],2);         
        }
        wx.hideLoading();
      }
    })
  },
  //提交投诉
  postmodal: function() {
    var that = this;
    //参数部分
    var openid = getApp().globalData.openid,
      content = that.data.tousuinfo, //	投诉内容
      imgs = that.listtustring(that.data.tousutu), //投诉图片 多个以逗号分隔
      id = that.data.chkorderid; //订单id 

    //验证必填项
    if (content == "") {
      that.showAlert("请填写投诉内容");
    } else {
      //提交投诉
      wx.request({
        url: requesturl + '/receipt/complaint',
        data: {
          openid: openid,
          content: content, //	投诉内容
          imgs: imgs, //投诉图片 多个以逗号分隔
          id: id //订单id
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: function(res) {
          console.log("提交投诉的结果:");
          console.log(res);

          if (res.data.result) {
            that.showAlert(res.data.msg);
            that.setData({
              istsshow: "",
              tousuinfo:"",
              tousutu:[]
            })
          } else {
            that.showAlert("提交投诉失败");
          }
          that.InitOrder();
        }
      })
    }
  },
  //弹窗显示提示
  showAlert: function (message) {
    var that = this;
    that.setData({
      messagetxt: message,
      messagestyle: 'c-state1'
    });
    setTimeout(function () {
      that.setData({
        messagestyle: ''
      })
    }, 2000)
  },
  //将图片以逗号分隔的转换
  listtustring: function (tulist) {
    var result = "";
    if (tulist.length != 0) {
      for (var i = 0; i < tulist.length; i++) {
        result += tulist[i] + ",";
      }
    }
    return result;
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})