// pages/message/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasnews:false,//是否有消息
    chkmenu:1,//菜单的选中
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    
    //初始化数据
    that.InitMessage();
  },
  //菜单的切换
  chkmenuopt:function(e){
    var that=this;
    //参数部分
    var id=e.currentTarget.dataset.id;
    id=parseInt(id);
    
    that.setData({
      chkmenu:id
    })
  },
  //初始化数据
  InitMessage:function(){
    var that=this;
    //参数部分

    var newslsit=[
      {
        id:1,
        headerimg:"/resources/touxiang.png",
        username:'雇主昵称',
        time:"3秒前",
        info:"跑腿员XXX已接单，请尽快支付服务小费。赶紧付钱跑腿员XXX已接单，请尽快支付服务小费。赶紧付钱",
        msgnum:1,
        isnew:true
      },
      {
        id: 2,
        headerimg: "/resources/touxiang.png",
        username: '雇主昵称',
        time: "3秒前",
        info: "跑腿员XXX已接单，请尽快支付服务小费。赶紧付钱跑腿员XXX已接单，请尽快支付服务小费。赶紧付钱",
        msgnum: 0,
        isnew: false
      },
      {
        id: 3,
        headerimg: "/resources/touxiang.png",
        username: '雇主昵称',
        time: "3秒前",
        info: "跑腿员XXX已接单，请尽快支付服务小费。赶紧付钱跑腿员XXX已接单，请尽快支付服务小费。赶紧付钱",
        msgnum: 0,
        isnew: false
      },
    ];
    that.setData({
      newslsit: newslsit
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