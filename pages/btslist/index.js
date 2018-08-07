// pages/btslist/index.js
var requesturl = getApp().globalData.requesturl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chkmenu:1,//菜单的选中
    btslist:[],//被投诉列表
    showtip:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    //被投诉列表
    that.Initbtslist();
  },  
  //被投诉列表
  Initbtslist:function(){
    var that=this;
    //参数部分
    var chkmenu = that.data.chkmenu;
    //状态值
    var status = "all";
    if (chkmenu == 1) {
      status = "all";
    } else if (chkmenu == 2) {
      status = "1";
    } else if (chkmenu == 3) {
      status = "0";
    }
    //请求接口，获取列表数据
    wx.request({
      url: requesturl +'/staff/receive_complaint_list',
      data: {
        openid:getApp().globalData.openid,
        status: status
      },
      header: {
        "Content-Type":"application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("被投诉的列表:");
        console.log(res);

        if(res.data.result){
          that.setData({
            btslist: res.data.data,
            showtip: res.data.data.length == 0 ? true : false
          })
        }else{
          that.setData({
            showtip: true 
          })
        }
      }
    })
  },
  //菜单的选中
  chkemnuopt:function(e){
    var that=this;
    //参数值
    var id=e.currentTarget.dataset.id;

    that.setData({
      chkmenu:parseInt(id)
    })
    //被投诉列表
    that.Initbtslist();
  },
  //查看操作
  gochkbtsopt:function(e){
    var that=this;
    //参数部分
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../btslist/detail?id='+id,
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