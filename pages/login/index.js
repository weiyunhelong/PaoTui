// pages/login/index.js
var requesturl = getApp().globalData.requesturl;//请求接口的参数

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     wx.setNavigationBarTitle({
       title: '微信登录',
     })
  },
  //授权登录
  GetUserInfo:function(e){
    console.log("授权用户的信息:");
    console.log(e);
    getApp().globalData.userInfo = e.detail.userInfo;
    var userinfo = e.detail.userInfo;
    //提交用户信息
    wx.request({
      url: requesturl +'/Member/updateMyInfo',
      data: {
        openid: getApp().globalData.openid,
        user_headimg: userinfo.avatarUrl,
        nick_name: userinfo.nickName,
        other_info: userinfo.province + "," + userinfo.city + "," + userinfo.country,//userinfo.gender
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("登录结果:");
        console.log(res);

        if(res.data.result){
            
           //注册页面 
           wx.redirectTo({
             url: '../sign/index',
           }) 
           //抢单大厅
           wx.redirectTo({
             url: '../index/index',
           })
        }else{
          wx.showToast({
            title: '授权登录失败',
            mask:true,
            duration:2000,
            icon:'none'
          })
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