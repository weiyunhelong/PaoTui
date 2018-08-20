// pages/chat/index.js
var requesturl = getApp().globalData.requesturl;
var timer="";//计时器

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatlist: [], //聊天列表
    to_uid: "", //对话用户id
    to_utx: "", //对话用户头像
    to_uname: "", //对话用户昵称
    from_uid: "", //我的uid
    mytx: "", //我的头像
    myname: "", //我的昵称
    typeval: 3, //对话类型
    info: "", //
    phone: "", //手机号码
    address: "", //地址
    jingdu: 0, //经度
    weidu: 0, //纬度
    page_index:1,//页码
    page_size:10,//每页显示记录数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log("参数部分:");
    console.log(options); 
    //接受参数
    that.setData({
      to_uid: options.uid,//对话用户id
      to_utx: options.utx, //对话用户头像
      to_uname: options.uname, //对话用户昵称
      phone: options.user_tel,//电话号码
    })
    //获取用户的信息
    that.InitWxUserInfo
    //获取我的的信息
    that.InitMyInfo();
  }, 
  //获取用户联系电话
  InitWxUserInfo:function(){
    var that=this;
    //请求接口获取参数
    wx.request({
      url: requesturl +'/Forum/getUserInfo',
      data: {
        openid:getApp().globalData.openid,
        uid: parseInt(that.data.to_uid) 
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取用户的信息得数据");
        console.log(res);
        
        if(res.data.result){
          that.setData({
            phone: res.data.data.user_tel
          })
        }else{
          console.log("获取用户的信息数据失败");
        }        
      }
    })
  },
  //获取我的信息
  InitMyInfo: function() {
    var that = this;
    //获取我的信息
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
        console.log("获取我的信息得数据");
        console.log(res);
        
        //赋值部分
        that.setData({
          mytx: res.data.avatarUrl,
          from_uid: res.data.staff_id,
          myname: res.data.name
        })
        //获取聊天历史
        that.getHistory();        
      }
    })
  },
  //获取发送的内容
  getinfo: function(e) {
    var that = this;
    //获取参数
    var txtval = e.detail.value;
    //赋值部分
    that.setData({
      info: txtval
    })
  },
  //发送消息
  sendopt: function() {
    var that = this;
    //参数部分
    var info = that.data.info;

    if (info == "") {
      wx.showToast({
        title: '请输入发送内容',
        mask: true,
        duration: 2000,
        icon: "none"
      })
    } else {
      /**TODO 发送消息**/
      var msg = {
        from_uid: that.data.from_uid,
        from_user_type: 2,
        to_uid: that.data.to_uid,
        to_user_type: 1,
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
  uploadtu: function() {
    var that = this;

    //选择图片
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
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
          success: function(res) {
            console.log("上传图片的结果");
            console.log(res);

            /***TODO 提交到聊天记录***/
            var msg = {
              from_uid: that.data.from_uid + "",
              from_user_type: "2",
              to_uid: that.data.to_uid + "",
              to_user_type: "1",
              message: res.data,
              message_format: 1
            }
            that.sendSocketMessage(msg);
          },
          complete: function(res) {
            wx.hideLoading();
          },
        })
      }
    })
  },
  //拨打电话
  phoneopt: function() {
    var that = this;
    //拨打手机号码
    wx.makePhoneCall({
      phoneNumber: that.data.phone,
    })
  },
  //选择地图
  dituopt: function() {
    var that = this;

    //选择地址
    wx.chooseLocation({
      success: function(res) {
        console.log("选择的地址:");
        console.log(res);

        that.setData({
          address: res.name, //地址
          jingdu: res.longitude, //经度
          weidu: res.latitude, //纬度
        })
        /**TODO发送地图信息**/
        var msg = {
          from_uid: that.data.from_uid + "",
          from_user_type: "2",
          to_uid: that.data.to_uid + "",
          to_user_type: "1",
          message: res.name + ";"+ res.longitude + ";" + res.latitude,
          message_format: 2
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
    //获取聊天记录
    timer = setTimeout(function () {
      that.getHistory();
    }, 10000)
  },
  //发送消息
  sendSocketMessage: function(msg) {
    var that=this;
    //发送消息
    wx.request({
      url: requesturl + '/Chat/sendMessage',
      data: {
        openid: getApp().globalData.openid, //openid
        from_uid: msg.from_uid,
        from_user_type: "2",
        to_uid: msg.to_uid,
        to_user_type: "1",
        message_format: msg.message_format,
        message: msg.message,
        message_type:0,
        is_read:0
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("发送聊天信息:");
        console.log(res);
        
        if(res.data.result){
          that.getHistory();
        }else{
          console.log("发送聊天信息失败");
          wx.showToast({
            title: '消息发送失败',
            mask:true,
            icon:"none",
            duration:2000
          })
        }
      }
    })
  },
  //获取消息列表
  getHistory: function() {
    var that = this;
    //参数部分
    var openid = getApp().globalData.openid, //OPENID
      from_uid = getApp().globalData.uid, //uid
      from_user_type = 2, //用户类型
      to_uid = that.data.to_uid, //收信人uid
      to_user_type = 1, //收信人类型
      page_index = that.data.page_index, //页码
      page_size = 10; //每页显示的记录数

    //获取聊天记录
    wx.request({
      url: requesturl +'/chat/getChatHistory',
      data: {
        openid:openid, //OPENID
        from_uid:from_uid, //uid
        from_user_type: from_user_type, //用户类型
        to_uid:to_uid, //收信人uid
        to_user_type: to_user_type, //收信人类型
        page_index: that.data.page_index, //页码
        page_size: that.data.page_size //每页显示的记录数
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取聊天记录:");
        console.log(res);

        if(res.data.result){
           that.DealData(res.data.data.data);
        }else{
          console.log("获取聊天记录失败");
        }
      }
    })  
  },
  //数据的处理
  DealData:function(datalist){
    console.log("接受的数据:");
    console.log(datalist);
    var that=this;
    //数据的处理
    var chatlist=[];
    
    //循环遍历，获取数据
    for (var i = 0; i < datalist.length;i++){
      //地图类型
      if (datalist[i].message_format==2){
        chatlist[i]={
          create_time: datalist[i].create_time,
          from_user_type: datalist[i].from_user_type,
          message:{
            name: datalist[i].message.split(";")[0],
            longitude: datalist[i].message.split(";")[1],
            latitude: datalist[i].message.split(";")[2],
          },
          message_format: datalist[i].message_format
        }
      }else{
        chatlist[i] = {
          create_time: datalist[i].create_time,
          from_user_type: datalist[i].from_user_type,
          message: datalist[i].message,
          message_format: datalist[i].message_format
        }
      }
    }
    //重置后的数据
    console.log("聊天列表数据:");
    console.log(chatlist);
    
    //数据的赋值
    if(that.data.page_index==1){
      that.setData({
        chatlist: chatlist
      })
    }else{
      var newchatlist = that.data.chatlist.concat(chatlist);
      that.setData({
        chatlist: newchatlist
      })
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
    clearInterval(timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(timer);
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
    that.getHistory();
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
    that.getHistory()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})