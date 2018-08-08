// pages/mytslist/detail.js
var requesturl = getApp().globalData.requesturl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",//id的值
    datainfo:{}//投诉详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    that.setData({
      id:options.id
    })
    //初始化投诉
    that.InitTousu();
  },
  //初始化投诉
  InitTousu:function(){
    var that=this;

    //参数部分
    var id=that.data.id;

    //获取投诉详情
    wx.request({
      url: requesturl +'/staff/receive_complaint',
      data: {
        openid:getApp().globalData.openid,
        id: id
      },
      header: {
        "Content-Type":"application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("投诉详情结果:");
        console.log(res);
        if(res.data.result){
          that.setData({
            datainfo:res.data.data
          })
        }else{
          console.log("获取投诉详情失败");
        }
      }
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