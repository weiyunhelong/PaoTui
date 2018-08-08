// pages/my/index.js
var requesturl = getApp().globalData.requesturl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touxiang:"/resources/touxiang.png",//头像
    wxname:"用户昵称",//用户昵称
    fen: 0,//打分
    qian:0,//钱
    xinglsit:[1,2,3,4,5],//星分数显示使用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  
  //提现
  gotoput:function() {
    wx.navigateTo({
      url: '/pages/tixian/index?qian='+this.data.qian,
    })
  },
  //被投诉记录
  complaintlist: function() {
    wx.navigateTo({
      url: '/pages/btslist/index',
    })
  },
  //我的投诉记录
  mycomplaintlist: function() {
    wx.navigateTo({
      url: '/pages/mytslist/index',
    })
  },
  //退款申请
  aftersaleservice: function() {
    wx.navigateTo({
      url: '/pages/refundbook/index',
    })
  },
  //账户金额
  account: function() {
    wx.navigateTo({
      url: '/pages/account/index',
    })
  },
  //帮助中心
  acticle:function() {
    wx.navigateTo({
      url: '/pages/help/index',
    })
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
    var that=this;

    //初始化获取用户的信息
    that.InitWxUser();
  },
  //初始化获取用户的信息
  InitWxUser:function(){
    var that=this;
    //获取用户信息
    wx.request({
      url: requesturl +'/staff/detail',
      data: {
        openid:getApp().globalData.openid
      },
      header: {
        "Content-Type":"application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("获取用户信息得数据");
        console.log(res);

        that.setData({
          touxiang: res.data.avatarUrl,
          wxname: res.data.nickName,
          qian: res.data.money,
          fen:res.data.star
        })
      }
    })
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