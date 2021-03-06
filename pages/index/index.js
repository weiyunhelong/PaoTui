//index.js
//获取应用实例
const app = getApp();
var requesturl = getApp().globalData.requesturl; //请求接口的地址
Page({
  data: {
    weidu: 0, //纬度
    jingdu: 0, //经度
    chkmenu: 0, //选中的菜单的值
    feedescsort: false, //服务小费排序
    timedescsort: false, //完成时间排序
    orderlist: [], //订单列表   
    runbg: "", //背景图
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //页面的初始化
  onLoad: function() {
    if (getApp().globalData.openid == "") {
      wx.redirectTo({
        url: '../login/index',
      })
    }
    var that = this;
    that.setData({
      runbg: getApp().globalData.run_bg
    })
    //判断是否有新消息
    that.InitMessage();
  },
  //初始化数据
  InitMessage: function() {
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
      success: function(res) {
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
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
            //设置标识
            wx.showTabBarRedDot({
              index: 2
            })
          }else{
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
  //获取经纬度
  InitLocation: function() {
    var that = this;
    //获取经纬度
    wx.getLocation({
      success: function(res) {
        console.log("获取经纬度的值:");
        console.log(res);

        that.setData({
          weidu: res.latitude, //纬度
          jingdu: res.longitude, //经度
        })
        //获取订单列表
        that.InitOrder();
      },
      fail: function() {
        wx.showToast({
          title: '请打开微信定位',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        that.onShow();
      },
    })
  },
  //选中菜单
  chkmenu: function(e) {
    var that = this;
    //参数部分
    var chkmenu = e.currentTarget.dataset.id;

    that.setData({
      chkmenu: chkmenu
    })

    //获取订单列表
    that.InitOrder();
  },
  //服务小费的排序
  feesortopt: function() {
    var that = this;

    that.setData({
      feedescsort: !that.data.feedescsort
    })

    //获取订单列表
    that.InitOrder();
  },
  //完成时间的排序
  timesortopt: function() {
    var that = this;

    that.setData({
      timedescsort: !that.data.timedescsort
    })

    //获取订单列表
    that.InitOrder();
  },
  //页面的渲染
  onShow: function() {
    var that = this;
    wx.showLoading({
      title: '正在加载中...',
      mask: true
    })
    //优先获取openid
    setTimeout(function() {
      //获取经纬度
      that.InitLocation();
    }, 2000)
  },
  //获取订单列表
  InitOrder: function() {
    var that = this;

    //参数部分
    var chkmenu = that.data.chkmenu, //选中的菜单的值
      feedescsort = that.data.feedescsort, //服务小费排序
      timedescsort = that.data.timedescsort; //完成时间排序

    var sort = "asc";

    if (chkmenu == 1) {
      if (!feedescsort) {
        sort = "desc";
      }
    }

    if (chkmenu == 2) {
      if (!timedescsort) {
        sort = "desc";
      }
    }
    //请求接口
    wx.request({
      url: requesturl + '/receipt/index',
      data: {
        openid: getApp().globalData.openid,
        lng: that.data.jingdu, //经度
        lat: that.data.weidu, //纬度
        orderType: chkmenu, //排序方式：0：默认；1：服务消费；2：完成时间
        orderWay: sort //asc：升序；desc：降序
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function(res) {
        console.log("接单大厅的数据:");
        console.log(res);
        if (res.data.result) {
          that.setData({
            orderlist: res.data.data
          })
        } else {
          wx.showToast({
            title: '获取数据失败',
            mask: true,
            duration: 2000,
            icon: 'none'
          })
        }
      },
      complete: function() {
        wx.hideLoading();
      }
    })
  },
})