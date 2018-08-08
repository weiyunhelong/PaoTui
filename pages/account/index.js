// pages/account/index.js
var requesturl=getApp().globalData.requesturl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chkmenu:0,//选中的菜单
    datalist:[],//列表
    showtip:false,//是否显示数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //更新列表数据
    that.InitList();
  },
  //更新列表数据
  InitList:function(){
    var that=this;
    //参数部分
    var chkmenu = that.data.chkmenu;
    var status="all";
    if (chkmenu==1){
      status="1";
    } else if (chkmenu == -1){
      status = "-1";
    }
    //请求接口获取账户流水
    wx.request({
      url: requesturl +'/staff/account_details',
      data: {
        openid:getApp().globalData.openid,
        type: status
      },
      header: {
        "Content_Type":"application/json"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log("获取流水信息:");
        console.log(res);

        if(res.data.result){
          that.setData({
            datalist: res.data.data,
            showtip: res.data.data.length == 0 ? true : false
          })
        }
      }
    })
  },
  //选中菜单操作
  chkmenuopt:function(e){
    var that=this;
    //参数部分
    var id=e.currentTarget.dataset.id;
    that.setData({
      chkmenu:parseInt(id)
    })
    //更新列表数据
    that.InitList();
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