// pages/business/index.js
var requesturl = getApp().globalData.requesturl;//请求接口的地址
//order_status表示订单状态  
// 0待接单 1已取消 2已接单 3待执行 4进行中 5已完成 6申请退款 7退款成功 8退款失败 9骑手申请取消 10雇主申请取消
Page({

  /**
   * 页面的初始数据
   */
  data: {
    istsshow: "",//投诉弹窗显示
    isznshow:"",//指南弹窗显示
    orderid:"",//订单id
    order: {},//订单详情    
    /*评价的内容*/
    xinglsit:[1,2,3,4,5],//星
    pingfen:4.5,//评分
    pinginfo:"评价内容，富士康打飞机违法评价内容.",//评分内容 
    pingtulist: ["/resources/tu1.png", "/resources/tu1.png", "/resources/tu1.png"], 
    pingtime: "2018-03-01  13:12:36",//评分时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //接受参数
    that.setData({
      orderid:options.id
    })
    //获取订单详情
    that.InitOrderDetail();
  },
  //获取订单详情
  InitOrderDetail:function(){
    var that=this;

    //参数部分
    var orderid = that.data.orderid;
    
    wx.request({
      url: requesturl+'/receipt/detail',
      data: {
        openid:getApp().globalData.openid,		
        id: orderid
      },
      header: {
        "Content-Type":"application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("接单详情:");
        console.log(res);
        if(res.data.result){
          that.setData({
            order:res.data.data
          })
        }else{
          wx.showToast({
            title: '获取详情失败',
            mask:true,
            duration:2000,
            icon:'none'
          })
        }
      }
    })
  },
  //抢单操作
  getorderopt:function(){
    /**TODO 抢单操作**/
  },
  //跳转到消息
  gomessageopt:function(){
    wx.switchTab({
      url: '../message/index',
    })
  },
  //打电话操作
  gophoneopt: function (e) {
    var phone=e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  //取消订单
  cancelopt:function(){
    var that=this;

    /**TODO 取消操作**/
  },
  //开始执行
  runopt:function(){
    var that = this;

    /**TODO 开始执行**/
  },
  //投诉雇主
  tousuopt:function(){
    var that=this;

    that.setData({
      istsshow: "c-state1"
    })
  },
  //关闭弹窗
  closemodal:function(){
    var that = this;

    that.setData({
      istsshow: ""
    })
  },
  //提交投诉
  postmodal:function(){
    var that = this;

    that.setData({
      istsshow: ""
    })
  },
  //操作指南
  zhinanopt:function(){
    var that = this;

    that.setData({
      isznshow: "c-state1"
    })
  },
  //我知道了
  knowmodal:function(){
    var that = this;

    that.setData({
      isznshow: ""
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