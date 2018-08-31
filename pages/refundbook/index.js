// pages/refundbook/index.js
var requesturl = getApp().globalData.requesturl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chkmenu:1,//选中的菜单
    datalist:[],//列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取列表数据
    that.InitList();

  
    that.setData({
      runbg: getApp().globalData.run_bg
    })
  },
  //获取列表数据
  InitList:function(){
    var that=this;
    //参数部分
    var chkmenu = that.data.chkmenu;
    var status="";
    if (chkmenu==1){
      status = "all";
    } else if (chkmenu == 2) {
      status = "refunding";
    } else if (chkmenu == 3) {
      status = "refunded";
    } else {
      status = "refuse_refund";
    } 
    //获取列表数据
    wx.request({
      url: requesturl +'/staff/refund_list',
      data: {
        openid:getApp().globalData.openid,
        status: status
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("退款申请列表:");
        console.log(res);

        if(res.data.result){
         that.setData({
           datalist:res.data.data
         })
        }else{
          console.log("获取退款申请列表失败!");
        }
      }
    })
  },
  //菜单的切换
  chkmenuopt:function(e){
    var that=this;
    //参数
    var id=e.currentTarget.dataset.id;

    that.setData({
      chkmenu:parseInt(id)
    })
    //获取列表数据
    that.InitList();
  },
  //跳转到详情
  godetailopt:function(e){
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../refundbook/detail?id='+id,
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