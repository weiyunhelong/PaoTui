// pages/help/detail.js
var requesturl = getApp().globalData.requesturl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    title: "",
    info: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //接受参数
    that.setData({
      id: options.id
    })

    //初始化文章内容
    that.InitWenzhang();
  },
  //初始化文章内容
  InitWenzhang: function() {
    var that = this;
    //获取文章的内容
    wx.request({
      url: requesturl + '/Articlecenter/articleContent',
      data: {
        openid: getApp().globalData.openid,
        article_id: that.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取文章的内容:");
        console.log(res);
        if (res.data.result) {
          that.setData({
            title: res.data.data.title,
            info: res.data.data.content
          })
        } else {
          console.log("获取文章内容失败!");
        }
      }
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