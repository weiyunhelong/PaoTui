// pages/chat/index.js
var requesturl = getApp().globalData.requesturl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatlist: [],//聊天列表
    to_uid: "",//兑换用户
    page_index: 1,//页码
    page_size: 10,//每页记录数
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

    //初始化聊天列表
    var chatlist= that.InitChatlist();

    that.setData({
      chatlist: chatlist
    })
  },
  //初始化聊天列表
  InitChatlist: function() {
    var that = this;
    //参数部分
    var to_uid = that.data.uid,
      page_index = that.data.page_index,
      page_size = that.data.page_size;

    //获取聊天
    wx.request({
      url: requesturl + '/Chat/getChatHistory',
      data: {
        openid: getApp().globalData.openid,
        from_uid: getApp().globalData.uid,
        to_uid: that.data.to_uid,
        page_index: that.data.page_index,
        page_size: that.data.page_size
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取聊天数据:");
        console.log(res);

        return res.data.data;
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
    var info="";

    if(info==""){
      wx.showToast({
        title: '请输入发送内容',
        mask:true,
        duration:2000,
        icon:"none"
      })
    }else{
      /**TODO 发送消息**/
    }
  },
  //上传图片
  uploadtu:function(){
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;
    id = parseInt(id);

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
      phoneNumber: that.data.phoneNumber,
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
      },
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