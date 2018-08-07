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
  },
  //获取列表数据
  InitList:function(){
    var that=this;
    //参数部分
    var chkmenu = that.data.chkmenu;
    
    //获取列表数据
    var datalist=[      
      {
        id: 1,
        typeval: "代买",
        orderno: "2326541515121",
        info: "超时完成任务了。",
        imglist: [],
        status: 1,
      },
      {
        id: 2,
        typeval: "代买",
        orderno: "2326541515122",
        info: "51分8篮板8助攻，我不想说这一场比赛詹姆斯输了。不论是有个别的争议球没有吹，还是最后4.7秒那个希尔的罚球与JR的传球，各种状况都撞到一块，最后加时赛里詹姆斯甚至啊啊啊",
        imglist: ["/resources/tu1.png", "/resources/tu1.png", "/resources/tu1.png"],
        status: 2,
      },
      {
        id: 3,
        typeval: "代买",
        orderno: "2326541515123",
        info: "51分8篮板8助攻，我不想说这一场比赛詹姆斯输了。不论是有个别的争议球没有吹，还是最后4.7秒那个希尔的罚球与JR的传球，各种状况都撞到一块，最后加时赛里詹姆斯甚至啊啊啊",
        imglist: ["/resources/tu1.png", "/resources/tu1.png", "/resources/tu1.png"],
        status: 3,
      },
    ];
    
    //赋值部分
    that.setData({
      datalist: datalist
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