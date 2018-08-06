// pages/tixian/index.js
var requesturl = getApp().globalData.requesturl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 0, //账户余额
    menkan: 50, //提款门槛
    tikuan: "", //提款的钱
    messagestyle: "", //提示的样式
    messageinfo: "", //提示的内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      money: parseFloat(options.qian)
    })
  },
  //获取提款的金额
  settotal: function(e) {
    var that = this;
    //获取参数
    var txtval = e.detail.value;

    that.setData({
      tikuan: txtval
    })
  },
  //提现按钮
  putmoney: function() {
    var that = this;
    //参数部分
    var money = that.data.money, //账户余额
      menkan = that.data.menkan, //提款门槛
      tikuan = that.data.tikuan, //提款的钱
      messagestyle = that.data.messagestyle, //提示的样式
      messageinfo = that.data.messageinfo; //提示的内容

    //判断提款的钱不能为空
    if (tikuan == "") {
      that.setData({
        messagestyle: 'c-state1',
        messageinfo: "请输入提款金额"
      });
      setTimeout(function() {
        that.setData({
          messagestyle: ''
        })
      }, 1000);
    } else if (money < menkan) {
      that.setData({
        messagestyle: 'c-state1',
        messageinfo: "账户余额小于提款门槛"
      });
      setTimeout(function() {
        that.setData({
          messagestyle: ''
        })
      }, 1000);
    } else if (money < parseFloat(tikuan)) {
      that.setData({
        messagestyle: 'c-state1',
        messageinfo: "账户余额小于提款金额"
      });
      setTimeout(function() {
        that.setData({
          messagestyle: ''
        })
      }, 1000);
    } else {
      /**TODO 提款操作**/
      wx.request({
        url: requesturl + '/staff/cash',
        data: {
          openid: getApp().globalData.openid,
          money: parseFloat(money),
          acc_id: ""
        },
        header: {
          "Content-Type":"application/json"
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log("提现结果:");
          console.log(res);
          if(res.data.result){

            that.setData({
              money: money - parseFloat(tikuan)
            })
          }else{
            //弹窗显示内容
            that.showAlert("提现获取失败!");
          }
        }
      })     
    }
  },
  //弹窗显示提示内容
  showAlert:function(message){
    that.setData({
      messagestyle: 'c-state1',
      messageinfo: message
    });
    setTimeout(function () {
      that.setData({
        messagestyle: ''
      })
    }, 1000);
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})