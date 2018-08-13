// pages/refundbook/detail.js
var requesturl = getApp().globalData.requesturl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    orderobj:{},//退款
    comments: [], //评价列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that=this;
     that.setData({
       id:options.id
     })

     that.InitOrderObj();
  },
  //获取退款详情
  InitOrderObj:function(){
    var that=this;

    //请求获取数据
    wx.request({
      url: requesturl +'/receipt/detail',
      data: {
        openid:getApp().globalData.openid,
        id:that.data.id
      },
      header: {
        "Content-Type":"application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("获取退款详情:");
        console.log(res);

        if(res.data.result){
          that.setData({
            orderobj:res.data.data,
            comments: res.data.data.comments//评价部分
          })
        }else{
          console.log("获取退款详情失败");
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