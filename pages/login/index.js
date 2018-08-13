// pages/login/index.js
var requesturl = getApp().globalData.requesturl; //请求接口的参数

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '微信登录',
    })
  },
  //授权登录
  GetUserInfo: function(e) {
    wx.showLoading({
      title: '正在登录中...',
      mask:true
    })
    console.log("授权用户的信息:");
    console.log(e);
    getApp().globalData.userInfo = e.detail.userInfo;
    var userinfo = e.detail.userInfo;
    //提交用户信息
    wx.request({
      url: requesturl + '/Index/runWxLogin',
      data: {
        code: getApp().globalData.code,
        avatarUrl: userinfo.avatarUrl,
        nickName: userinfo.nickName,
        province: userinfo.province,
        city: userinfo.city,
        country: userinfo.country,
        gender: userinfo.gender
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("登录结果:");
        console.log(res);

        if (res.data.result) 
        {
          getApp().globalData.openid = res.data.data.openid;//openid
          getApp().globalData.uid=res.data.data.staff_id;//uid
          getApp().globalData.cancel_count = res.data.data.cancel_count;//取消次数

          getApp().globalData.isnewuser = res.data.data.is_new_staff==1?true:false;//是不是新骑手
         
          if (res.data.data.name == "") {
            //注册页面 
            wx.redirectTo({
              url: '../login/index',
            })
          } else if (res.data.data.is_examine == 1) {
            //首页页面 
            wx.switchTab({
              url: '../index/index',
            })
          } else if (res.data.data.is_examine == 0) {
            //入住页面 
            wx.redirectTo({
              url: '../sign/index',
            })
          } else {
            //注册结果页面
            wx.redirectTo({
              url: '../sign/result?status=' + res.data.data.is_examine + "&reason=" + res.data.data.fail_reason,
            })
          }
        } else {
          wx.showToast({
            title: '授权登录失败',
            mask: true,
            duration: 2000,
            icon: 'none'
          })
        }
      wx.hideLoading();  
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