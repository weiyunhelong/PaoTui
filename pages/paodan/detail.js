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
    isnewuser: false,//是否是新用户
    /*评价的内容*/
    xinglsit: [1, 2, 3, 4, 5], //星
    pingfen: 4.5, //评分
    pinginfo: "评价内容，富士康打飞机违法评价内容.", //评分内容 
    pingtulist: ["/resources/tu1.png", "/resources/tu1.png", "/resources/tu1.png"],
    pingtime: "2018-03-01  13:12:36", //评分时间
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
  onLoad: function (options) {
    var that = this;
    //接受参数
    that.setData({
      orderid: options.id,
      isnewuser: getApp().globalData.isnewuser
    })
    getApp().globalData.isnewuser = false;
    //获取订单详情
    that.InitOrderDetail();
    //获取指南内容
    that.InitZhiNan();
    //获取协议内容
    that.InitXieYi();
  },
  //获取指南内容
  InitZhiNan: function () {
    var that = this;

    /**TODO获取指南内容**/
    var zhinaninfo = "  今年唯一不同的是，行动最快的竟然是各个二线城市。年轻人还在脑内构思辞职信草稿，职场老手正向有意提供工作的大佬问好。新一年的未来还在迷惘中酝酿，二线城市的人才招揽广告已然杀到！    2月27日，杭州地铁1号线龙翔桥站C口，返城潮汹涌，两旁广告箱如往常般亮着瓦力十足的灯光。Sophie经过时，被上头的文字吸引了——“‘蓉漂’计划青年人才驿站”、“成都 · 许你一个美好的未来”。    成都抢人抢到了杭州家门口，还来不及为杭州倒吸一口冷气，其它二线城市也纷纷使出杀招。城市政策并非唯一推力，房产开发商为人才争夺战添了一把火。根据中国证券报的报道，2018年春节后，武汉、西安、南京等地多个楼盘均推出优惠政策，“送钱送房送户口”的口号不绝于耳。    人口集聚，则为城。    二线城市人才争夺战，本质是资源竞争和城市竞争。各城市在这场PK中孰胜孰败？    多城市政策齐发，并驱争先    “古时千里马常有，伯乐不常有；今日伯乐已翘首期盼，千里马却迟迟不归。”受国家双创政策的春风照拂，从世界范围看，2017全球十大创业生态系统中中国占据两席，北京上海分别排名第二、第七；从中国范围看，杭州紧随北上广深成为排名第五最适宜创业的城市，武汉、天津、苏州、成都、南京依次进入前十排行榜。    曾经的“上海后花园”杭州今非昔比一跃成为国际化大都市，先后举办了G20峰会、云栖大会、移动互联网大会等多个享誉国际的会议，拿下2022年亚运会的举办权，杭州的振兴为其他省市起了带头.";

    that.setData({
      zhinaninfo: zhinaninfo
    })
  },
  //获取协议内容
  InitXieYi: function () {
    var that = this;

    /**TODO获取协议内容**/
    var xieyiinfo = "  今年唯一不同的是，行动最快的竟然是各个二线城市。年轻人还在脑内构思辞职信草稿，职场老手正向有意提供工作的大佬问好。新一年的未来还在迷惘中酝酿，二线城市的人才招揽广告已然杀到！    2月27日，杭州地铁1号线龙翔桥站C口，返城潮汹涌，两旁广告箱如往常般亮着瓦力十足的灯光。Sophie经过时，被上头的文字吸引了——“‘蓉漂’计划青年人才驿站”、“成都 · 许你一个美好的未来”。    成都抢人抢到了杭州家门口，还来不及为杭州倒吸一口冷气，其它二线城市也纷纷使出杀招。城市政策并非唯一推力，房产开发商为人才争夺战添了一把火。根据中国证券报的报道，2018年春节后，武汉、西安、南京等地多个楼盘均推出优惠政策，“送钱送房送户口”的口号不绝于耳。    人口集聚，则为城。    二线城市人才争夺战，本质是资源竞争和城市竞争。各城市在这场PK中孰胜孰败？    多城市政策齐发，并驱争先    “古时千里马常有，伯乐不常有；今日伯乐已翘首期盼，千里马却迟迟不归。”受国家双创政策的春风照拂，从世界范围看，2017全球十大创业生态系统中中国占据两席，北京上海分别排名第二、第七；从中国范围看，杭州紧随北上广深成为排名第五最适宜创业的城市，武汉、天津、苏州、成都、南京依次进入前十排行榜。    曾经的“上海后花园”杭州今非昔比一跃成为国际化大都市，先后举办了G20峰会、云栖大会、移动互联网大会等多个享誉国际的会议，拿下2022年亚运会的举办权，杭州的振兴为其他省市起了带头.";

    that.setData({
      xieyiinfo: xieyiinfo
    })
  },
  //获取订单详情
  InitOrderDetail: function () {
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
      success: function (res) {
        console.log("接单详情:");
        console.log(res);
        if (res.data.result) {
          that.setData({
            order: res.data.data
          })
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
  //抢单操作
  getorderopt: function () {
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
      success: function (res) {
        console.log("抢单结果:");
        console.log(res);
        /**TODO 抢单状态判断**/
        if (res.data.result) {
          that.onLoad(that.data.orderid);
        } else {
          that.showAlert("抢单失败！");
        }
      }
    })
  },
  //跳转到消息
  gomessageopt: function () {
    wx.switchTab({
      url: '../message/index',
    })
  },
  //打电话操作
  gophoneopt: function (e) {
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  //取消订单
  cancelopt: function () {
    var that = this;

    that.setData({
      isqxshow: "c-state1"
    })
  },
  //关闭取消弹窗
  closeqxmodal: function () {
    var that = this;

    that.setData({
      isqxshow: ""
    })
  },
  //获取取消原因
  cancelinfo: function (e) {
    var that = this;

    that.setData({
      cancelinfo: e.detail.value
    })
  },
  //获取取消的图片
  uploadqxopt: function () {
    var that = this;

    //已经上传的图片
    var canceltu = that.data.canceltu;

    //选取图片上传
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        wx.showLoading({
          title: '正在上传中...',
        })

        for (var i = 0; i < tempFilePaths.length; i++) {
          var tupath = that.uploadtu(tempFilePaths[i],1);
        }
        wx.hideLoading();
      }
    })
  },
  //上传图片
  uploadtu: function (tupath, kind) {
    var that = this;
    //参数部分
    var canceltu = that.data.canceltu;  //已经上传取消的图片
    var tousutu = that.data.tousutu;//已经上传投诉的图片
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
  },
  //提交申请取消跑单
  postbook: function () {
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
      success: function (res) {
        console.log("取消订单结果:");
        console.log(res);

        that.setData({
          isqxshow: ""
        })
      }
    })
  },
  //开始执行
  runopt: function () {
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
      success: function (res) {
        console.log("开始执行的结果:");
        console.log(res);
        if (!res.data.result) {
          that.showAlert(res.data.msg);
        }
      }
    })
  },
  //投诉雇主
  tousuopt: function () {
    var that = this;

    that.setData({
      istsshow: "c-state1"
    })
  },
  //关闭弹窗
  closemodal: function () {
    var that = this;

    that.setData({
      istsshow: ""
    })
  },
  //获取投诉内容
  gettsopt: function (e) {
    var that = this;

    that.setData({
      tousuinfo: e.detail.value
    })
  },
  //上传投诉图片
  uploadtsopt: function () {
    var that = this;

    //参数部分
    var tousutu = that.data.tousutu;

    //选取图片上传
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
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
  postmodal: function () {
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
        success: function (res) {
          console.log("提交投诉的结果:");
          console.log(res);

          if (res.data.result) {
            that.showAlert(res.data.msg);
            that.setData({
              istsshow: ""
            })
          } else {
            that.showAlert("提交投诉失败");
          }
        }
      })
    }
  },
  //操作协议
  xieyiopt: function () {
    var that = this;

    that.setData({
      isxyshow: "c-state1"
    })
  },
  //协议我知道了
  xieyimodal: function () {
    var that = this;

    that.setData({
      isxyshow: ""
    })
  },
  //操作指南
  zhinanopt: function () {
    var that = this;

    that.setData({
      isznshow: "c-state1"
    })
  },
  //我知道了
  knowmodal: function () {
    var that = this;

    that.setData({
      isznshow: ""
    })
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})