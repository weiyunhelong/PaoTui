//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    var that=this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.globalData.code = res.code; 
        //获取openid              
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,//微信用户的信息
    code:"",//登录code值
    openid:"",//openid的值
    uid:"",//用户id
    isnewuser: false,//是否是新用户
    cancel_count:0,//取消的次数
    requesturl: "https://www.fsdragon.com/small",//请求的接口
    orderstatus:0,//订单状态值:
    /*******
     * 1:待接单
     * 2:待支付
     * 3:支付成功
     * 4:进行中
     * 5:确认收货
     * 6:结束
     * 7:已取消
     * 8:退款中
     * 9:退款成功
     * 10:退款失败
     * 11:已评价
     * *****/
  }
})