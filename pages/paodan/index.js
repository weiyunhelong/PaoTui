// pages/paodan/index.js
var orderdata=require('../../utils/orderlist.js');
var requesturl = getApp().globalData.requesturl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chkmenu:0,//订单的状态
    orderlist:[],//订单列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //菜单的选择
  chkmenu:function(e){
    var that=this;
    //参数部分
    var id=e.currentTarget.dataset.status;
    //赋值部分
    that.setData({
      chkmenu: parseInt(id) 
    })
    //初始化订单
    that.InitOrder();
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

    //初始化订单
    that.InitOrder();
  },
  //初始化订单
  InitOrder:function(){
    var that=this;

    //参数部分
    var chkmenu = that.data.chkmenu;
    console.log("菜单id:" + chkmenu); 
    //查询数据 
    wx.request({
      url: requesturl +'/staff/index',
      data: {
        openid:getApp().globalData.openid,
        status: chkmenu
      },
      header: {
        "Content-Type":"application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("跑单列表结果:");
        console.log(res);
        //赋值部分
        that.setData({
          orderlist: res.data.data
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