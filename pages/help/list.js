// pages/help/list.js
var requesturl = getApp().globalData.requesturl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,//分类id
    menulist:[],//列表部分
    page_index:1,//分页的页码
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
  },
  //初始化列表
  IniMenuList: function () {
    var that = this;
    
    //请求获取参数
    wx.request({
      url: requesturl +'/Articlecenter/getArticleList',
      data: {
        class_id:that.data.id,
        page_index: that.data.page_index,
        page_size: 10
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("列表数据结果:");
        console.log(res);
        
        if(res.data.result){

          that.setData({
            menulist: res.data.data
          })
        }else{
          console.log("获取列表失败！");
        }
      }
    })

  },
  //跳转到文章列表
  gohelp: function (e) {
    var that = this;

    //参数
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../help/detail?id=' + id,
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
    var that=this;

    //初始化列表
    that.IniMenuList();
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
    var that = this;
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    that.setData({
      page_index: 1
    })
    //滑动获取更多分页数据
    that.IniMenuList();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;

    var page_index = that.data.page_index + 1;
    that.setData({
      page_index: page_index
    })
    //滑动获取更多分页数据
    that.IniMenuList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})