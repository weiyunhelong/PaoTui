// pages/message/index.js
var requesturl = getApp().globalData.requesturl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasnews: false, //是否有通知消息
    chkmenu: 1, //菜单的选中
    newslsit: [], //通知列表
    chatlist: [], //聊天列表
    uid: "", //用户id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      uid: options.uid == undefined ? "" : options.uid
    })

    that.setData({
      runbg: getApp().globalData.run_bg
    })
    that.GetNewChatMsg();
  },
  //判断是否有新消息
  GetNewChatMsg: function() {
    var that = this;
    //请求接口获取未读取的消息
    wx.request({
      url: requesturl + '/Chat/checkHasNewMsg',
      data: {
        openid: getApp().globalData.openid,
        from_uid: getApp().globalData.uid,
        from_user_type: 2
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log("是否有新消息列表：");
        console.log(res);

        if (res.data.result) {
          that.setData({
            hasnews: res.data.new_msg_count > 0 ? true : false
          })
        } else {
          console.log("暂无获取未读的消息");
        }
      }
    })
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
    if (id == 1) {
      that.InitMessage();
    } else { //消息列表
      that.GetNewChatMsg();
      that.getchatlist(); //聊天列表
    }
  },
  //初始化数据
  InitMessage: function() {
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
      success: function(res) {
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
          }          
        } else {
          console.log("获取消息列表失败");
        }
      }
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
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("聊天记录结果:");
        console.log(res);
        if (res.data.result) {
          that.setData({
            chatlist: res.data.data.data
          })
        } else {
          console.log("获取聊天记录失败！");
        }
      }
    })
  },
  //跳转到消息详情
  gomsgdetail: function(e) {
    var id = e.currentTarget.dataset.id;
    var msgid = e.currentTarget.dataset.msgid;

    //请求接口
    wx.request({
      url: requesturl + '/staff/get_message_detail',
      data: {
        openid: getApp().globalData.openid,
        msg_id: msgid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("通知消息修改为已读:");
        console.log(res);

        wx.navigateTo({
          url: '../paodan/detail?id=' + id,
        })
      }
    })


  },
  //跳转到聊天室
  gochat: function(e) {
    var that = this;
    //参数部分
    var uid = e.currentTarget.dataset.uid;
    var utx = e.currentTarget.dataset.utx;
    var uname = e.currentTarget.dataset.uname;
    var utel = e.currentTarget.dataset.utel;
    var msgid = e.currentTarget.dataset.msgid;

    //消息设置为已读
    wx.request({
      url: requesturl + '/Chat/setMessageRead',
      data: {
        openid: getApp().globalData.openid,
        message_id: msgid,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("聊天消息设置为已读:");
        console.log(res);

        //调整到聊天页面
        wx.navigateTo({
          url: '../chat/index?uid=' + uid + "&utx=" + utx + "&uname=" + uname + "&user_tel=" + utel,
        })
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
    var that = this;
    //初始化通知数据
    that.InitMessage();
    //消息列表
    that.GetNewChatMsg();
    that.getchatlist(); //聊天列表
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