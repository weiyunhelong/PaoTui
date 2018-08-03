//index.js
//获取应用实例
const app = getApp();
var requesturl = getApp().globalData.requesturl; //请求接口的地址
Page({
  data: {
    weidu: 0, //纬度
    jingdu: 0, //经度
    chkmenu: 1, //选中的菜单的值
    feedescsort: false, //服务小费排序
    timedescsort: false, //完成时间排序
    orderlist: [], //订单列表   
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //页面的初始化
  onLoad: function() {

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
    //获取经纬度
    that.InitLocation();
  },
  //获取订单列表
  InitOrder: function() {
    var that = this;

    //参数部分
    var chkmenu = that.data.chkmenu, //选中的菜单的值
      feedescsort = that.data.chkmenu, //服务小费排序
      timedescsort = that.data.chkmenu; //完成时间排序

    //请求接口
    wx.request({
      url: requesturl + '/receipt/index',
      data: {
        openid: getApp().globalData.openid,
        lng: that.data.weidu,
        lat: that.data.jingdu,
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
            //orderlist:res.data.data
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
    //请求接口获取订单列表
    var orderlist = [{
        id: 1,
        member: {
          user_headimg: "/resources/touxiang.png",
          user_name: "代买用户",
          isshop: false
        },
        addr: "广东省中山市东区古镇镇骏贤居",
        juli: 2.5,
        o_addr: "广东省中山市东区古镇镇骏贤居",
        type_desc: "代买",
        cost: 5.5,
        isshang: false,
        shang: 0,
        title: "帮我买一罐可乐，要冰的，快点送到，谢谢任务帮我买一罐可乐，要冰的，快点送到，谢谢任务",
        start_time: "15:32",
        end_time: "16:25",
        level: ""
      },
      {
        id: 2,
        member: {
          user_headimg: "/resources/touxiang.png",
          user_name: "商铺用户",
          isshop: true,
          ismember: true
        },
        addr: "广东省中山市东区古镇镇骏贤居",
        juli: 2.5,
        o_addr: "广东省中山市东区古镇镇骏贤居",
        type_desc: "代送",
        cost: 5.5,
        isshang: true,
        shang: 5.5,
        title: "帮我买一罐可乐，要冰的，快点送到，谢谢任务帮我买一罐可乐，要冰的，快点送到，谢谢任务",
        start_time: "15:32",
        end_time: "16:25",
        level: "优质客户"
      },
    ];

    //赋值部分
    that.setData({
      orderlist: orderlist
    })
  },
})