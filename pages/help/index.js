// pages/help/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menulist:[],//菜单的分类
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //初始化列表
    that.IniMenuList();
  },
  //初始化列表
  IniMenuList:function(){
    var that=this;
    //请求获取参数
    var menulist=[
      {
        id:1,
        title:"文章分类一"
      },
      {
        id: 2,
        title: "文章分类二"
      },
      {
        id: 3,
        title: "文章分类三"
      }
    ];

    that.setData({
      menulist: menulist
    })
  },
  //跳转到文章列表
  gohelp:function(e){
    var that=this;

    //参数
    var id=e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../help/list?id='+id,
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