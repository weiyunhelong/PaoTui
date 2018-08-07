// pages/sign/index.js
var requesturl = getApp().globalData.requesturl;
var validatorutil = require('../../utils/validator.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "", //姓名
    identity: "", //身份证
    job: "", //工作
    year: "", //年龄    
    sexindex: -1, //性别下标
    genderlist: ["女", "男", "其他"], //性别选中
    address: "", //住址
    phone: "", //手机号码
    guanxi: "", //关系
    isfront: false, //是否上传正面照
    fronttu: "", //正面照
    isback: false, //是否上传反面照
    backtu: "", //反面照
    isshouchi: false, //是否上传手持面照
    shouchitu: "", //手持照
    iszheng: false, //是否上传技能照
    zhengtu: [], //技能照
    isagree: false, //勾选协议
    isznshow: "", //操作指南
    zhinaninfo: "", //指南
    messagestyle: "", //提示弹窗
    messagetxt: "", //提示内容
    isxyshow:false,
    xiyiinfo:"",//用户协议
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //设置顶部的文字
    wx.setNavigationBarTitle({
      title: '申请成为跑腿员',
    })
    //初始化操作指南
    that.InitZN();
    //初始化用户协议
    that.InitXY();
  },
  //初始化操作指南
  InitZN: function() {
    var that = this;

    that.setData({
      zhinaninfo: "今年唯一不同的是，行动最快的竟然是各个二线城市。年轻人还在脑内构思辞职信草稿，职场老手正向有意提供工作的大佬问好。新一年的未来还在迷惘中酝酿，二线城市的人才招揽广告已然杀到！     2月27日，杭州地铁1号线龙翔桥站C口，返城潮汹涌，两旁广告箱如往常般亮着瓦力十足的灯光。Sophie经过时，被上头的文字吸引了——“‘蓉漂’计划青年人才驿站”、“成都 · 许你一个美好的未来”。     成都抢人抢到了杭州家门口，还来不及为杭州倒吸一口冷气，其它二线城市也纷纷使出杀招。城市政策并非唯一推力，房产开发商为人才争夺战添了一把火。根据中国证券报的报道，2018年春节后，武汉、西安、南京等地多个楼盘均推出优惠政策，“送钱送房送户口”的口号不绝于耳。 人口集聚，则为城。  二线城市人才争夺战，本质是资源竞争和城市竞争。各城市在这场PK中孰胜孰败？   多城市政策齐发，并驱争先 “古时千里马常有，伯乐不常有；今日伯乐已翘首期盼，千里马却迟迟不归。”受国家双创政策的春风照拂，从世界范围看，2017全球十大创业生态系统中中国占据两席，北京上海分别排名第二、第七；从中国范围看，杭州紧随北上广深成为排名第五最适宜创业的城市，武汉、天津、苏州、成都、南京依次进入前十排行榜。 曾经的“上海后花园”杭州今非昔比一跃成为国际化大都市，先后举办了G20峰会、云栖大会、移动互联网大会等多个享誉国际的会议，拿下2022年亚运会的举办权，杭州的振兴为其他省市起了带头"
    })
  },
  //初始化用户协议
  InitXY:function(){
    var that=this;

    //请求接口获取用户协议
    wx.request({
      url: requesturl +'/Helpcenter/index',
      data: {
        openid:getApp().globalData.openid
      },
      header: {
        "Content-Type":"application/json"
      },
      method: 'GET',
      success: function(res) {
        console.log("用户协议内容:");
        console.log(res);

        that.setData({
          xiyiinfo:res.data.data
        })
      }
    })
  },
  //姓名
  getname: function(e) {
    var that = this;
    //参数值
    var txtval = e.detail.value;

    that.setData({
      name: txtval
    })
  },
  //身份证号
  getidentity: function(e) {
    var that = this;
    //参数值
    var txtval = e.detail.value;

    that.setData({
      identity: txtval
    })
  },
  //现职业
  getjob: function(e) {
    var that = this;
    //参数值
    var txtval = e.detail.value;

    that.setData({
      job: txtval
    })
  },
  //年龄
  getyear: function(e) {
    var that = this;
    //参数值
    var txtval = e.detail.value;

    that.setData({
      year: txtval
    })
  },
  //性别的选择
  bindPickerChange: function(e) {
    var that = this;
    that.setData({
      sexindex: e.detail.value
    })
  },
  //地址
  getaddress: function(e) {
    var that = this;
    //参数值
    var txtval = e.detail.value;

    that.setData({
      address: txtval
    })
  },
  //手机号码
  getphone: function(e) {
    var that = this;
    //参数值
    var txtval = e.detail.value;

    that.setData({
      phone: txtval
    })
  },
  //关系
  getguanxi: function(e) {
    var that = this;
    //参数值
    var txtval = e.detail.value;

    that.setData({
      guanxi: txtval
    })
  },
  //上传照片
  uploadfile: function(e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;
    id = parseInt(id);

    //选择图片
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        wx.showLoading({
          title: '正在上传中...',
        })
        //上传图片
        wx.uploadFile({
          url: requesturl + '/upload/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data'
          },
          formData: {},
          success: function(res) {
            console.log("上传图片的结果");
            console.log(res);
            //赋值图片
            that.InitTu(id, res.data);
          },
          complete: function(res) {
            wx.hideLoading();
          },
        })
      }
    })
  },
  //赋值图片
  InitTu: function(id, tu) {
    var that = this;
    if (id == 1) {
      that.setData({
        isfront: true,
        fronttu: tu
      })
    } else if (id == 2) {
      that.setData({
        isback: true,
        backtu: tu
      })
    } else if (id == 3) {
      that.setData({
        isshouchi: true,
        shouchitu: tu
      })
    }
  },
  //上传技能照片
  uploadzheng: function() {
    var that = this;
    //已上传的技能照
    var zhengtu = that.data.zhengtu;

    if (zhengtu.length == 3) {
      that.setData({
        iszheng: true
      })
    } else {
      //选择图片
      wx.chooseImage({
        count: 3 - zhengtu.length, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;

          wx.showLoading({
            title: '正在上传中...',
          })

          for (var i = 0; i < tempFilePaths.length; i++) {
            that.chuanzhengopt(tempFilePaths[i]);
          }
          wx.hideLoading();
        }
      })
    }
  },
  //上传技能照
  chuanzhengopt: function(tu) {
    var that = this;
    var zhengtu = that.data.zhengtu;
    //上传图片
    wx.uploadFile({
      url: requesturl + '/upload/upload',
      filePath: tu,
      name: 'file',
      header: {
        'Content-Type': 'multipart/form-data'
      },
      formData: {},
      success: function(res) {
        console.log("上传图片的结果");
        console.log(res);
        //赋值图片
        zhengtu.push(res.data);
        that.setData({
          zhengtu: zhengtu,
          iszheng: zhengtu.length == 3 ? true : false
        })
      }
    })
  },
  //勾选同意
  agreetopt: function() {
    var that = this;
    that.setData({
      isagree: !that.data.isagree
    })
  },
  //显示协议
  showxyopt: function () {
    var that = this;
    that.setData({
      isxyshow: "c-state1"
    })
  },
  //协议我知道了
  xieyimodal: function () {
    var that = this;

    that.setData({
      isxyshow: ""
    })
  },
  //显示指南
  showmodal: function() {
    var that = this;
    that.setData({
      isznshow: "c-state1"
    })
  },
  //我知道了
  knowmodal: function() {
    var that = this;

    that.setData({
      isznshow: ""
    })
  },
  //提交申请
  postbookopt: function() {
    var that = this;
    //参数部分
    var name = that.data.name, //姓名
      identity = that.data.identity, //身份证
      job = that.data.job, //工作
      year = that.data.year, //年龄    
      sexindex = that.data.sexindex, //性别下标
      genderlist = that.data.genderlist, //性别选中
      address = that.data.address, //住址
      phone = that.data.phone, //手机号码
      guanxi = that.data.guanxi, //关系
      isfront = that.data.isfront, //是否上传正面照
      fronttu = that.data.fronttu, //正面照
      isback = that.data.isback, //是否上传反面照
      backtu = that.data.backtu, //反面照
      isshouchi = that.data.isshouchi, //是否上传手持面照
      shouchitu = that.data.shouchitu, //手持照
      iszheng = that.data.iszheng, //是否上传技能照
      zhengtu = that.data.zhengtu, //技能照
      isagree = that.data.isagree, //勾选协议
      isznshow = that.data.isznshow, //操作指南
      zhinaninfo = that.data.zhinaninfo; //指南

    //验证必填项
    if (name == "") {
      that.showAlert("请输入真实姓名");
    } else if (identity == "") {
      that.showAlert("请输入身份证号码");
    } else if (!validatorutil.validateIDCard(identity)) {
      that.showAlert("身份证号码错误");
    } else if (job == "") {
      that.showAlert("请输入现职业");
    } else if (year == "") {
      that.showAlert("请输入年龄");
    } else if (parseInt(year)<= 0) {
      that.showAlert("年龄大于0");
    } else if (sexindex == -1) {
      that.showAlert("请选择性别");
    } else if (address == "") {
      that.showAlert("请输入现住址");
    } else if (phone == "") {
      that.showAlert("请输入手机号码");
    } else if (!validatorutil.validateMobile(phone)) {
      that.showAlert("手机号码错误");
    } else if (guanxi == "") {
      that.showAlert("请输入联系人关系");
    } else if (!isfront) {
      that.showAlert("请上传身份证正面");
    } else if (!isback) {
      that.showAlert("请上传身份证反面");
    } else if (!isshouchi) {
      that.showAlert("请上传手持身份证");
    } else if (!iszheng) {
      that.showAlert("请上传技能证书");
    } else if (!isagree) {
      that.showAlert("请同意协议");
    } else {
      //提交申请
      wx.request({
        url: requesturl + '/form/rider_application',
        data: {
          openid: getApp().globalData.openid,
          name: name,
          id_number: identity,
          id_photo_positive: fronttu,
          id_photo_opposite: backtu,
          id_photo_hold: shouchitu,
          occupation: job,
          age: year,
          sex: sexindex,
          addr: address,
          urgent_tel: phone,
          urgent_relationship: guanxi
        },
        header: {
          "Content-Type":"application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: function(res) {
          console.log("提交申请结果:");
          console.log(res);
          if (res.data.data.result){
            getApp().globalData.isnewuser = true;
            wx.switchTab({
              url: '../index/index',
            })
          }else{
            that.showAlert("入驻失败，请重新填写.");
            that.onLoad();
          }
        }
      })
    } 
  },
  //弹窗显示提示
  showAlert: function(message) {
    var that = this;
    that.setData({
      messagetxt: message,
      messagestyle: 'c-state1'
    });
    setTimeout(function() {
      that.setData({
        messagestyle: ''
      })
    }, 2000)
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