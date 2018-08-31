// pages/paodan/detail.js
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
    xinglsit: [1, 2, 3, 4, 5], //星
    comments: [], //评价列表
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //接受参数
    that.setData({
      orderid: options.id,
      isnewuser: getApp().globalData.isnewuser
    })
    getApp().globalData.isnewuser = false;
    //获取订单详情
    that.InitOrderDetail();

  
    that.setData({
      runbg: getApp().globalData.run_bg
    })
  },
  //获取指南内容
  InitZhiNan: function() {
    var that = this;

    /**TODO获取指南内容**/
    wx.request({
      url: requesturl + '/receipt/run_type_detail',
      data: {
        openid: getApp().globalData.openid,
        id: that.data.order.type
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("操作指南内容:");
        console.log(res);

        if (res.data.result) {
          that.setData({
            zhinaninfo: res.data.data.run_guide,
            xieyiinfo: res.data.data.user_guide
          })
        }
      }
    })
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
            order: res.data.data,
            comments: res.data.data.comments //评价部分
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
  //地址打开
  goaddress:function(e){
    //参数部分
    var lat=e.currentTarget.dataset.lat;
    var lng=e.currentTarget.dataset.lng;
    var name=e.currentTarget.dataset.name;
    console.log("地图经纬度参数:" + lat + "," + lng + "," + name);
    //打开地图
    wx.openLocation({
      latitude: parseFloat(lat) ,
      longitude: parseFloat(lng) ,
      name:name
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
          //获取订单详情
          that.InitOrderDetail();
        } else {
          that.showAlert("抢单失败！");
        }
      }
    })
  },
  //跳转到消息
  gomessageopt: function(e) {
    var uid = e.currentTarget.dataset.uid;
    var utx = e.currentTarget.dataset.utx;
    var uname = e.currentTarget.dataset.uname;
    var uname = e.currentTarget.dataset.uname;
    var user_tel = e.currentTarget.dataset.utel;
    wx.navigateTo({
      url: '../chat/index?uid=' + uid + "&utx=" + utx + "&uname=" + uname + "&user_tel=" + user_tel,
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

        that.uploadtu(tempFilePaths, 1);
        wx.hideLoading();
      }
    })
  },
  //上传图片
  uploadtu: function(tupathlist, kind) {
    var that = this;
    //参数部分
    var canceltu = that.data.canceltu; //已经上传取消的图片
    var tousutu = that.data.tousutu; //已经上传投诉的图片
    for (var i = 0; i < tupathlist.length;i++){
      var tupath = tupathlist[i];
      //上传文件
      wx.uploadFile({
        url: requesturl + '/upload/upload',
        filePath: tupath,
        name: 'file',
        success: function (res) {
          if (kind == 1) {
            canceltu = canceltu.concat(res.data);
            that.setData({
              canceltu: canceltu
            })
          } else {
            tousutu = tousutu.concat(res.data);
            that.setData({
              tousutu: tousutu
            })
          }
        }
      })
    }    
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
        //刷新页面，获取订单详情
        that.InitOrderDetail();
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
        }else{
          //获取订单详情
          that.InitOrderDetail();
        }
      }
    })
  },
  //执行中
  finishopt: function() {
    var that = this;

    //参数部分
    wx.request({
      url: requesturl + '/receipt/tasks',
      data: {
        openid: getApp().globalData.openid,
        state_des: "complete",
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
        }else{
          //获取订单详情
          that.InitOrderDetail();
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
        that.uploadtu(tempFilePaths, 2);
        wx.hideLoading();
      }
    })
  },
  //删除投诉的图片
  deltsimg:function(e){
    var that=this;
    //删除投诉的图片
    var tousutu=that.data.tousutu;
    var index=e.currentTarget.dataset.index;
    index=parseInt(index);
    tousutu.splice(index, 1);
    that.setData({
      tousutu: tousutu
    })
  },
  //替换投诉上传的图片
  uploadtstu:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    index = parseInt(index); 

    //选取图片上传
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        wx.showLoading({
          title: '正在上传中...',
        })
        var tupath = tempFilePaths[0];
        //替换上传的图片
        //上传文件
        wx.uploadFile({
          url: requesturl + '/upload/upload',
          filePath: tupath,
          name: 'file',
          success: function (res) {
            var result = res.data;
            //参数部分
            var tousutu = that.data.tousutu;
            tousutu.splice(index, 1, result);
            that.setData({
              tousutu: tousutu
            })
          }
        })       
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
      id = that.data.orderid; //订单id 

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
              istsshow: ""
            })
            //获取订单详情
            that.InitOrderDetail();
          } else {
            that.showAlert("提交投诉失败");
          }
        }
      })
    }
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
  //用户取消跑单
  userCancelOrder: function(e) {

    var that = this;
    //参数部分
    var kind=e.currentTarget.dataset.type;
    kind=parseInt(kind);
    var condition="";
    if(kind==1){
      condition ="agree";
    }else{
      condition ="refuse";
    }
    //同意取消订单
    wx.request({
      url: requesturl + '/receipt/agree_refuse',
      data: {
        openid: getApp().globalData.openid,
        id: that.data.orderid,
        condition: condition, 
      },
      header: {
        "Content-Type":"application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("用户取消跑单结果:");
        console.log(res);

        if(res.data.result){
          getApp().globalData.cancel_count = that.data.cacelnum+1;
          that.setData({
            cacelnum: getApp().globalData.cancel_count
          })
          //获取订单详情
          that.InitOrderDetail();
        }else{
          console.log("取消失败");
          that.showAlert(res.data.msg);
        }
      }
    })
  },
  //删除取消订单的图片
  delqximg: function (e) {
    var that = this;
    //删除取消订单的图片
    var canceltu = that.data.canceltu;
    var index = e.currentTarget.dataset.index;
    index = parseInt(index);
    canceltu.splice(index, 1);
    that.setData({
      canceltu: canceltu
    })
  },
  //替换取消订单上传的图片
  uploadqxtu: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    index = parseInt(index);

    //选取图片上传
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        wx.showLoading({
          title: '正在上传中...',
        })
        var tupath = tempFilePaths[0];
        //替换上传的图片
        //上传文件
        wx.uploadFile({
          url: requesturl + '/upload/upload',
          filePath: tupath,
          name: 'file',
          success: function (res) {
            var result = res.data;
            //参数部分
            var canceltu = that.data.canceltu;
            canceltu.splice(index, 1, result);
            that.setData({
              canceltu: canceltu
            })
          }
        })
        wx.hideLoading();
      }
    })
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