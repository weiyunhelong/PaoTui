// pages/my/index.js
var requesturl = getApp().globalData.requesturl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touxiang: "/resources/touxiang.png", //头像
    wxname: "用户昵称", //用户昵称
    fen: 0, //打分
    qian: 0, //钱
    xinglsit: [1, 2, 3, 4, 5], //星分数显示使用
    gkefuuid:0,//官方客服uid
    gkefuname:"",//官方客服名称
    gkefutel:"",//官方客服电话
    fkefuuid: 0,//分站客服uid
    fkefuname: "",//分站客服名称
    fkefutel:"",//分站客服电话
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      runbg: getApp().globalData.run_bg
    })
    //判断是否有新消息
    that.InitMessage();
  },
  //初始化数据
  InitMessage: function () {
    var that = this;
    //参数部分
    wx.request({
      url: requesturl + '/staff/get_my_message_list',
      data: {
        openid: getApp().globalData.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log("消息列表:");
        console.log(res);

        if (res.data.result) {
          that.setData({
            newslsit: res.data.data
          })

          //遍历判断是否有未读的消息
          var datalist = res.data.data;
          var hasnum = 0;
          for (var i = 0; i < datalist.length; i++) {
            if (datalist[i].is_read == 0) {
              hasnum++;
            }
          }
          if (hasnum > 0) {
            //设置震动
            wx.vibrateLong({
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
            //设置标识
            wx.showTabBarRedDot({
              index: 2
            })
          } else {
            wx.hideTabBarRedDot({
              index: 2
            })
          }
        } else {
          console.log("获取消息列表失败");
          wx.hideTabBarRedDot({
            index: 2
          })
        }
      }
    })
  },
  //提现
  gotoput: function() {
    wx.navigateTo({
      url: '/pages/tixian/index?qian=' + this.data.qian,
    })
  },
  //被投诉记录
  complaintlist: function() {
    wx.navigateTo({
      url: '/pages/btslist/index',
    })
  },
  //我的投诉记录
  mycomplaintlist: function() {
    wx.navigateTo({
      url: '/pages/mytslist/index',
    })
  },
  //退款申请
  aftersaleservice: function() {
    wx.navigateTo({
      url: '/pages/refundbook/index',
    })
  },
  //账户金额
  account: function() {
    wx.navigateTo({
      url: '/pages/account/index',
    })
  },
  //分站客服
  gofenchat: function() {
    var that = this;
    wx.navigateTo({
      url: '../chat/index?uid=' + that.data.fkefuuid + '&utx=/resources/fenzhankf.png&uname=' + that.data.fkefuname + '&user_tel=' + that.data.fkefutel,
    })
  },
  //官方客服
  gozhuchat: function() {
    var that=this;
    wx.navigateTo({
      url: '../chat/index?uid=' + that.data.gkefuuid + '&utx=/resources/guankf.png&uname=' + that.data.gkefuname + '&user_tel=' + that.data.gkefutel,
    })
  },
  //帮助中心
  acticle: function() {
    wx.navigateTo({
      url: '/pages/help/index',
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
    var that = this;

    //初始化获取用户的信息
    that.InitWxUser();
    //初始化获取官方客服的信息
    that.InitGKeFu();
    //初始化获取分站客服的信息
    that.InitFKeFu();
  },
  //初始化获取用户的信息
  InitWxUser: function() {
    var that = this;
    //获取用户信息
    wx.request({
      url: requesturl + '/staff/detail',
      data: {
        openid: getApp().globalData.openid
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("获取用户信息得数据");
        console.log(res);

        that.setData({
          touxiang: res.data.avatarUrl,
          wxname: res.data.nickName,
          qian: res.data.money,
          fen: res.data.star
        })
      }
    })
  },
  //初始化获取官方客服的信息
  InitGKeFu: function() {
    var that = this;
    //获取数据
    wx.request({
      url: requesturl + '/Chat/getAdminCustomService',
      data: {
        openid: getApp().globalData.openid
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("官方客服的信息:");
        console.log(res);

        if(res.data.result){
          that.setData({
            gkefuuid: res.data.data[0].uid,//官方客服uid
            gkefuname: res.data.data[0].nick_name,//官方客服名称,
            gkefutel: res.data.data[0].user_tel//官方客服电话
          })
        }else{
          console.log("获取官方客服失败");
        }
      }
    })
  },
  //初始化获取分站客服的信息
  InitFKeFu: function() {
    var that = this;
    //获取数据
    wx.request({
      url: requesturl + '/Chat/getAgentCustomService',
      data: {
        openid: getApp().globalData.openid,
        province_id: "",
        city_id: "",
        district_id: "",
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("分站客服的信息:");
        console.log(res);

        if (res.data.result) {
          that.setData({
            fkefuuid: res.data.data[0].uid,//分站客服uid
            fkefuname: res.data.data[0].nick_name,//分站客服名称
            fkefutel: res.data.data[0].user_tel,//分站客服电话
          })
        } else {
          console.log("获取分站客服失败");
        }
      }
    })
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