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
    var that = this;
    that.setData({
      runbg: getApp().globalData.run_bg
    })
    //判断是否有新消息
    that.InitMessage();
  },
  //初始化数据
  InitMessage: function () {
    var that = this;
    //参数部分
    wx.request({
      url: requesturl + '/staff/get_my_message_list',
      data: {
        openid: getApp().globalData.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log("消息列表:");
        console.log(res);

        if (res.data.result) {
          that.setData({
            newslsit: res.data.data
          })
          //遍历判断是否有未读的消息
          var datalist = res.data.data;
          var hasnum = 0;
          for (var i = 0; i < datalist.length; i++) {
            if (datalist[i].is_read == 0) {
              hasnum++;
            }
          }
          if (hasnum > 0) {
            //设置震动
            wx.vibrateLong({
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
            //设置标识
            wx.showTabBarRedDot({
              index: 2
            })
          } else {
            wx.hideTabBarRedDot({
              index: 2
            })
          }
        } else {
          console.log("获取消息列表失败");
          wx.hideTabBarRedDot({
            index: 2
          })
        }
      }
    })
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
    var that=this;
    //参数部分
    var uid = e.currentTarget.dataset.uid;
    var uname = e.currentTarget.dataset.uname;
    var utx = e.currentTarget.dataset.utx;
    var user_tel = e.currentTarget.dataset.utel;

    wx.navigateTo({
      url: '../chat/index?uid=' + uid + "&utx=" + utx + "&uname=" + uname + "&user_tel=" + user_tel,
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

        that.uploadtu(tempFilePaths, 1);  
        wx.hideLoading();
      }
    })
  },
  //上传图片
  uploadtu: function(tupathlist,kind) {
    var that=this;
    //参数部分
    var canceltu = that.data.canceltu;  //已经上传取消的图片
    var tousutu = that.data.tousutu;//已经上传投诉的图片

    for (var i = 0; i < tupathlist.length;i++)
    {
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
          getApp().globalData.cancel_count = that.data.cacelnum + 1;
          that.setData({
            cacelnum: getApp().globalData.cancel_count
          })
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
        //上传文件
        that.uploadtu(tempFilePaths, 2); 
          
        wx.hideLoading();
      }
    })
  },
  //删除投诉的图片
  deltsimg: function (e) {
    var that = this;
    //删除投诉的图片
    var tousutu = that.data.tousutu;
    var index = e.currentTarget.dataset.index;
    index = parseInt(index);
    tousutu.splice(index, 1);
    that.setData({
      tousutu: tousutu
    })
  },
  //替换投诉上传的图片
  uploadtstu: function (e) {
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