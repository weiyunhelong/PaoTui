// pages/sign/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:0,
    reasopn:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    //接受参数
    that.setData({
      status: parseInt(options.status),
      reasopn:options.reason
    })

   
    that.setData({
      runbg: getApp().globalData.run_bg
    })
  },
  //重新注册
  gosignopt:function(){
    wx.redirectTo({
      url: '../sign/index',
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