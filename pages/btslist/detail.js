// pages/btslist/detail.js
var requesturl = getApp().globalData.requesturl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    dataorder: {},//投诉详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that=this;

     that.setData({
       id:options.id
     })
     
    that.setData({
      runbg: getApp().globalData.run_bg
    })
     //初始化详情
     that.InitDetail();
  },
  //初始化详情
  InitDetail:function(){
    var that=this;

    wx.request({
      url: requesturl +'/staff/my_complaint',
      data: {
        openid:getApp().globalData.openid,
        id: that.data.id
      },
      header: {
        "Content-Type":"application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("投诉详情结果:");
        console.log(res);
        
        if(res.data.result){
          that.setData({
            dataorder:res.data.data
          })
        }else{
          console.log("获取投诉详情失败！");
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