// pages/business/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    istsshow: "",//投诉弹窗显示
    isznshow:"",//指南弹窗显示
    /*订单详情*/
    ordertypeval:"",//订单类型  
    orderstatus: 0,//订单状态
    addre:"",//起始地
    oaddre: "",//目的地
    money:0,//价格
    intro:"",//描述
    starttime:"",//开始时间
    endtime:"",//结束时间
    /*顾客信息*/
    headimg:"",//用户头像
    username:"",//用户昵称
    isshop:true,//是否店家
    islevel:true,//是否等级
    phonenum:"",//手机号码
    /*订单编号时间*/
    orderid:0,//订单id
    orderno:"",//订单编号
    ordertime:"",//下单时间
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

    //获取订单的数据
    that.setData({
      /*订单详情*/
      ordertypeval: "代买",//订单类型  
      orderstatus: 3,//订单状态
      addre: "广东省中山市东区古镇镇骏贤居",//起始地
      oaddre: "广东省中山市东区古镇镇骏贤居",//目的地
      money: 5.5,//价格
      intro: "帮我买一罐可乐，要冰的帮我买一罐可乐，要冰的帮我买一罐可乐,要冰的帮我买一罐可乐",//描述
      starttime: "15:32",//开始时间
      endtime: "16:25",//结束时间
      /*顾客信息*/
      headimg: "/resources/touxiang.png",
      username: "用户昵称",
      isshop: true,
      islevel: true,
      phonenum: "13812345678",
      /*订单编号时间*/
      orderid: 0,
      orderno: "1326545825441244",
      ordertime: "2018-03-01 13:12:36"
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
  gophoneopt: function () {
    wx.makePhoneCall({
      phoneNumber: '13812345678',
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