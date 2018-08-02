// pages/mytslist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chkmenu: 1,//菜单的选中
    btslist: [],//被投诉列表
    showtip: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //被投诉列表
    that.Initbtslist();
  },
  //被投诉列表
  Initbtslist: function () {
    var that = this;
    //参数部分
    var chkmenu = that.data.chkmenu;

    //请求接口获取参数
    var btslist = [
      {
        id: 1,
        typeval: "代买",
        orderno: "2326541515122",
        desc: "超时完成任务了。",
        status: 1,
        imglist: []
      },
      {
        id: 2,
        typeval: "代买",
        orderno: "2326541515123",
        desc: "51分8篮板8助攻，我不想说这一场比赛詹姆斯输了。不论是有个别的争议球没有吹，还是最后4.7秒那个希尔的罚球与JR的传球，各种状况都撞到一块，最后加时赛里詹姆斯甚至51分8篮板8助攻",
        status: 2,
        imglist: [
          "/resources/tu1.png",
          "/resources/tu1.png",
          "/resources/tu1.png"
        ]
      },
    ];

    that.setData({
      btslist: btslist,
      showtip: btslist.length == 0 ? true : false
    })
  },
  //菜单的选中
  chkemnuopt: function (e) {
    var that = this;
    //参数值
    var id = e.currentTarget.dataset.id;

    that.setData({
      chkmenu: parseInt(id)
    })
    //被投诉列表
    that.Initbtslist();
  },
  //查看操作
  gochkbtsopt: function (e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../btslist/detail?id=' + id,
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