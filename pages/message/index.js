// pages/message/index.js
var requesturl = getApp().globalData.requesturl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasnews: false, //是否有消息
    chkmenu: 1, //菜单的选中
    newslsit: [], //通知列表
    chatlist: [], //聊天列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    //初始化数据
    that.InitMessage();
  },
  //菜单的切换
  chkmenuopt: function(e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;
    id = parseInt(id);

    that.setData({
      chkmenu: id
    })
    //通知列表
    if(id==1){
      that.InitMessage();  
    }else{//消息列表
      that.getchatlist(); 
    }
  },
  //初始化数据
  InitMessage: function() {
    var that = this;
    //参数部分

    var newslsit = [{
        id: 1,
        headerimg: "/resources/touxiang.png",
        username: '雇主昵称',
        time: "3秒前",
        info: "跑腿员XXX已接单，请尽快支付服务小费。赶紧付钱跑腿员XXX已接单，请尽快支付服务小费。赶紧付钱",
        msgnum: 1,
        isnew: true
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
  //获取聊天记录
  getchatlist: function() {
    var that = this;
    
    //请求接口获取聊天列表数据
    wx.request({
      url: requesturl + '/Chat/getChatUser',
      data: {
        openid: getApp().globalData.openid,
        uid: getApp().globalData.uid
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("聊天记录结果:");
        console.log(res);
        
        var chatlist=[
          {
            id:1,
            uid:"1",
            headerimg:"/resources/touxiang.png",
            info: "超出完成时间30分钟，雇主可退款或投诉，请联系雇主说明。",
            isnew:true,
            time:"12秒前"
          },
          {
            id: 2,
            uid: "2",
            headerimg: "/resources/touxiang.png",
            info: "超出完成时间30分钟，雇主可退款或投诉，请联系雇主说明。",
            isnew: false,
            time: "2018-06-01"
          }
        ]
        that.setData({
          //chatlist: res.data.data
          chatlist: chatlist
        })
      }
    })
  },
  //跳转到聊天页
  gochat:function(e){
    var that=this;
    //参数部分
    var uid=e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: '../chat/index?uid='+uid,
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