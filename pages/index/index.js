//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    chkmenu:1,//选中的菜单的值
    feedescsort:false,//服务小费排序
    timedescsort:false,//完成时间排序
    orderlist:[],//订单列表   
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //页面的初始化
  onLoad: function () {
    
  },
  //选中菜单
  chkmenu:function(e){
    var that=this;
    //参数部分
    var chkmenu=e.currentTarget.dataset.id;

    that.setData({
      chkmenu: chkmenu
    })
  },
  //服务小费的排序
  feesortopt:function(){
    var that=this;

    that.setData({
      feedescsort: !that.data.feedescsort
    })
  },
  //完成时间的排序
  timesortopt: function () {
    var that = this;

    that.setData({
      timedescsort: !that.data.timedescsort
    })
  },
  //页面的渲染
  onShow:function(){
    var that=this;

    //获取订单列表
    that.InitOrder();
  },
  //获取订单列表
  InitOrder:function(){
    var that=this;

    //参数部分
    var chkmenu = that.data.chkmenu,//选中的菜单的值
      feedescsort = that.data.chkmenu,//服务小费排序
      timedescsort = that.data.chkmenu;//完成时间排序

    //请求接口获取订单列表
    var orderlist=[
      {
        id:1,
        member:{
          user_headimg:"/resources/touxiang.png",
          user_name:"代买用户",
          isshop:false,
          ismember: false
        },
        addr:"广东省中山市东区古镇镇骏贤居",
        juli:2.5,
        o_addr:"广东省中山市东区古镇镇骏贤居",
        type_desc:"代买",
        cost:5.5,
        isshang:false,
        shang:0,
        title: "帮我买一罐可乐，要冰的，快点送到，谢谢任务帮我买一罐可乐，要冰的，快点送到，谢谢任务",
        start_time:"15:32",
        end_time:"16:25"
      },
      {
        id: 2,
        member: {
          user_headimg: "/resources/touxiang.png",
          user_name: "商铺用户",
          isshop: true,
          ismember: true
        },
        addr: "广东省中山市东区古镇镇骏贤居",
        juli: 2.5,
        o_addr: "广东省中山市东区古镇镇骏贤居",
        type_desc: "代送",
        cost: 5.5,
        isshang: true,
        shang: 5.5,
        title: "帮我买一罐可乐，要冰的，快点送到，谢谢任务帮我买一罐可乐，要冰的，快点送到，谢谢任务",
        start_time: "15:32",
        end_time: "16:25"
      },
    ];
    
    //赋值部分
    that.setData({
      orderlist:orderlist
    })
  },
})
