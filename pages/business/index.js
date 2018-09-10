// pages/business/index.js
var requesturl = getApp().globalData.requesturl; //请求接口的地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: "", //订单id
    order: {}, //订单详情    
    orderstatus: 1, //订单状态
    isnewuser: false, //是否是新用户
    /*评价的内容*/
    xinglist: [0,1, 2, 3, 4, 5], //星
  
    /*投诉雇主*/
    istsshow: "", //投诉弹窗显示
    tousuinfo: "", //投诉内容
    tousutu: [], //投诉图
    /*取消订单*/
    isqxshow: "", //取消弹窗显示
    cancelinfo: "", //取消原因
    canceltu: [], //取消图片
    cacelnum: 1, //取消次数
    /*指南内容*/
    zhinaninfo: "", //指南内容
    isznshow: "", //指南弹窗显示
    /*协议内容*/
    xieyiinfo: "", //协议内容
    isxyshow: "", //协议弹窗显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //接受参数
    that.setData({
      orderid: options.id,
      isnewuser: getApp().globalData.isnewuser,
      cacelnum: getApp().globalData.cancel_count
    })
    getApp().globalData.isnewuser = false;
    
    that.setData({
      runbg: getApp().globalData.run_bg
    })
    //获取订单详情
    that.InitOrderDetail();
  },
  //获取订单详情
  InitOrderDetail: function() {
    var that = this;

    //参数部分
    var orderid = that.data.orderid;

    wx.request({
      url: requesturl + '/receipt/detail',
      data: {
        openid: getApp().globalData.openid,
        id: orderid
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("接单详情:");
        console.log(res);
        if (res.data.result) {
          that.setData({
            order: res.data.data
          })
          //获取指南协议内容
          that.InitZhiNan();
        } else {
          wx.showToast({
            title: '获取详情失败',
            mask: true,
            duration: 2000,
            icon: 'none'
          })
        }
      }
    })
  },
  //获取指南内容
  InitZhiNan: function() {
    var that = this;
    var order=that.data.order;
    console.log("订单详情:");
    console.log(order);
    /**TODO获取指南内容**/
    wx.request({
      url: requesturl +'/receipt/run_type_detail',
      data: {
        openid:getApp().globalData.openid,
        id: order.type
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("操作指南的内容:");
        console.log(res);

        if(res.data.result){
          that.setData({
            zhinaninfo: res.data.data.run_guide,
            xieyiinfo: res.data.data.user_guide
          })
        }else{
          console.log("获取操作指南失败!")
        }
      }
    })
  
  }, 
  //抢单操作
  getorderopt: function() {
    var that = this;
    //申请抢单
    wx.request({
      url: requesturl + '/receipt/robbing',
      data: {
        openid: getApp().globalData.openid,
        id: that.data.orderid
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("抢单结果:");
        console.log(res);
        /**TODO 抢单状态判断**/
        if (res.data.result) {
          that.showAlert("抢单成功！");
          setTimeout(function () {
            wx.switchTab({
              url: '../paodan/index',
            })
          }, 2000)
        } else {
          that.showAlert(res.data.msg);
          setTimeout(function(){
            wx.switchTab({
              url: '../index/index',
            })
          },2000)
        }
      }
    })
  },
  //跳转到消息
  gomessageopt: function() {
    wx.switchTab({
      url: '../message/index',
    })
  },
  //打电话操作
  gophoneopt: function(e) {
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
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
  cancelinfo: function(e) {
    var that = this;

    that.setData({
      cancelinfo: e.detail.value
    })
  },
  //获取取消的图片
  uploadqxopt: function() {
    var that = this;

    //已经上传的图片
    var canceltu = that.data.canceltu;

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
          var tupath = that.uploadtu(tempFilePaths[i]);
          canceltu.push(tupath);
          that.setData({
            canceltu: canceltu
          })
        }
        wx.hideLoading();
      }
    })
  },
  //上传图片
  uploadtu: function(tupath) {
    wx.uploadFile({
      url: requesturl + '/upload/upload',
      filePath: tupath,
      name: 'file',
      success: function(res) {
        return res.data;
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
      orderid = that.data.orderid;

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

        that.setData({
          isqxshow: ""
        })
      }
    })
  },
  //开始执行
  runopt: function() {
    var that = this;

    //参数部分

    wx.request({
      url: requesturl + '/receipt/tasks',
      data: {
        openid: getApp().globalData.openid,
        state_des: "start",
        legs_id: that.data.orderid
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
      }
    })
  },
  //投诉雇主
  tousuopt: function() {
    var that = this;

    that.setData({
      istsshow: "c-state1"
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

    //参数部分
    var tousutu = that.data.tousutu;

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
          var tupath = that.uploadtu(tempFilePaths[i]);
          tousutu.push(tupath);
          that.setData({
            tousutu: tousutu
          })
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
      id = that.data.id; //订单id 

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
          } else {
            that.showAlert("提交投诉失败");
          }
        }
      })
    }
    that.setData({
      istsshow: ""
    })
  },
  //操作协议
  xieyiopt: function() {
    var that = this;

    that.setData({
      isxyshow: "c-state1"
    })
  },
  //协议我知道了
  xieyimodal: function() {
    var that = this;

    that.setData({
      isxyshow: ""
    })
  },
  //操作指南
  zhinanopt: function() {
    var that = this;

    that.setData({
      isznshow: "c-state1"
    })
  },
  //我知道了
  knowmodal: function() {
    var that = this;

    that.setData({
      isznshow: ""
    })
  },
  //将图片以逗号分隔的转换
  listtustring: function(tulist) {
    var result = "";
    if (tulist.length != 0) {
      for (var i = 0; i < tulist.length; i++) {
        result += tulist[i] + ",";
      }
    }
    return result;
  },
  //弹窗显示提示
  showAlert: function(message) {
    var that = this;
    that.setData({
      messagetxt: message,
      messagestyle: 'c-state1'
    });
    setTimeout(function() {
      that.setData({
        messagestyle: ''
      })
    }, 2000)
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