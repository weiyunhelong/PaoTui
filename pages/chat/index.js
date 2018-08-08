// pages/chat/index.js
var requesturl = getApp().globalData.requesturl;
var socketOpen = false;//socket状态
var socketMsgQueue = [];//发送的消息

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatlist: [],//聊天列表
    to_uid: "",//对话用户id
    to_utx: "",//对话用户头像
    to_uname: "",//对话用户昵称
    from_uid:"",//我的uid
    mytx:"",//我的头像
    myname:"",//我的昵称
    typeval:2,//对话类型
    info:"",//
    phone:"13812345678",//手机号码
    address:"",//地址
    jingdu:0,//经度
    weidu:0,//纬度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    //接受参数
    that.setData({
      to_uid: options.uid
    })
    //获取我的用户的信息
    that.InitMyInfo();
  },

  //获取我的用户的信息
  InitMyInfo:function(){
    var that=this; 
    
    wx.request({
      url: requesturl +'/staff/detail',
      data: {
        openid: getApp().globalData.openid
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      success: function (res) {
        console.log("获取用户信息得数据");
        console.log(res);

        that.setData({
          mytx: res.data.avatarUrl,
          from_uid: res.data.staff_id,
          myname: res.data.nickName
        })
      }
    })
  },
  //获取发送的内容
  getinfo:function(e){
    var that=this;
    //获取参数
    var txtval=e.detail.value;
    //赋值部分
    that.setData({
      info: txtval
    })
  },
  //发送消息
  sendopt:function(){
    var that=this;
    //参数部分
    var info = that.data.info;

    if(info==""){
      wx.showToast({
        title: '请输入发送内容',
        mask:true,
        duration:2000,
        icon:"none"
      })
    }else{
      /**TODO 发送消息**/
      var msg = {
        from_uid: that.data.from_uid,
        to_uid: that.data.to_uid,
        message: info,
        message_format: 0
      }
      that.sendSocketMessage(msg);
      that.setData({
        info: ""
      })
    }
  },
  //上传图片
  uploadtu:function(){
    var that = this;

    //选择图片
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        wx.showLoading({
          title: '正在上传中...',
        })
        //上传图片
        wx.uploadFile({
          url: requesturl + '/upload/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data'
          },
          formData: {},
          success: function (res) {
            console.log("上传图片的结果");
            console.log(res);
           
            /***TODO 提交到聊天记录***/
            var msg = {
              from_uid: that.data.from_uid,
              to_uid: that.data.to_uid,
              message: res.data,
              message_format: 1
            }
            that.sendSocketMessage(msg);
          },
          complete: function (res) {
            wx.hideLoading();
          },
        })
      }
    })
  },
  //拨打电话
  phoneopt:function(){
    var that=this;
    //拨打手机号码
    wx.makePhoneCall({
      phoneNumber: that.data.phone,
    })
  },
  //选择地图
  dituopt:function(){
    var that=this;
    
    //选择地址
    wx.chooseLocation({
      success: function(res) {
        console.log("选择的地址:");
        console.log(res);

        that.setData({
          address: res.name,//地址
          jingdu: res.longitude,//经度
          weidu: res.latitude,//纬度
        })
        /**TODO发送地图信息**/
        var msg = {
          from_uid:that.data.from_uid,
          to_uid: that.data.to_uid ,
          message: res.name + "," +res.address + "," + res.longitude + "," + res.latitude, 
          message_format:2
        }
        that.sendSocketMessage(msg);
      },
    })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that=this;
    //连接socket
    wx.connectSocket({
      url: 'ws://www.fsdragon.com:8088?uid=' + that.data.from_uid + '&uname=' + that.data.myname +'&avatar=' + that.data.mytx
    })
    //打开链接
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！');
      socketOpen=true;
      for (var i = 0; i < socketMsgQueue.length; i++) {
        sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []
    })
    //连接错误
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    //接受服务器消息
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data)
    })
    
  },
  //发送消息
  sendSocketMessage:function (msg) {
    if(socketOpen) {
      wx.sendSocketMessage({
        data: msg
      })
    } else {
      socketMsgQueue.push(msg)
    }
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
    var that = this;
    // 显示顶部刷新图标
    //wx.showNavigationBarLoading();
    that.setData({
      page_index: 1
    })
    //滑动获取更多分页数据
    var chatlist = that.InitChatlist();

    that.setData({
      chatlist: chatlist
    })
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;

    var page_index = that.data.page_index + 1;
    that.setData({
      page_index: page_index
    })
    //滑动获取更多分页数据
    var oldlist = that.data.chatlist;
    var chatlist = that.InitChatlist();
    oldlist = oldlist.concat(chatlist);
    that.setData({
      chatlist: oldlist
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})