// pages/sign/index.js
var requesturl = getApp().globalData.requesturl;
var validatorutil = require('../../utils/validator.js');
var timer="";//计时器
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid: "", //sessionid
    name: "", //姓名
    identity: "", //身份证
    job: "", //工作
    year: "", //年龄    
    sexindex: -1, //性别下标
    genderlist: ["女", "男", "其他"], //性别选中
    address: "", //住址
    phone: "", //手机号码
    mobile: "", //手机号码
    msgcode: "", //手机验证码
    codetip: "获取验证码", //发送验证码
    timeclock:60,//倒计时
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
    isxyshow: false,
    xiyiinfo: "", //用户协议
    lat:0,//纬度
    lng:0,//经度
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
    //获取sessionid
    that.InitSID();
    //初始化操作指南
    that.InitZN();
    //初始化用户协议
    that.InitXY();
    //获取定位
    that.GetPostion();
  },
  //获取sessionid
  InitSID: function() {
    var that = this;
    //获取sid
    wx.request({
      url: requesturl + '/Index/getSessionId',
      data: '',
      success: function(res) {
        console.log("sid获取结果:");
        console.log(res);

        if (res.data.result) {
          that.setData({
            sid: res.data.data
          })
        } else {
          console.log("获取sid失败!");
        }
      }
    })
  },
  //初始化操作指南
  InitZN: function() {
    var that = this;

    wx.request({
      url: requesturl + '/Articlecenter/articleContent',
      data: {
        article_id: 2
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("操作指南:");
        console.log(res);
        if (res.data.result) {
          that.setData({
            zhinaninfo: res.data.data.content
          })
        }
      }
    })
  },
  //初始化用户协议
  InitXY: function() {
    var that = this;

    //请求接口获取用户协议
    wx.request({
      url: requesturl + '/Articlecenter/articleContent',
      data: {
        article_id: 1
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("用户协议内容:");
        console.log(res);

        that.setData({
          xiyiinfo: res.data.data.content
        })
      }
    })
  },
  //获取定位
  GetPostion:function(){
    var that=this;

    wx.getLocation({
      success: function(res) {
        that.setData({
          lng:res.longitude,
          lat:res.latitude
        })
      },fail:function(){
        that.showAlert("请允许获取您的位置!");
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
  //自己手机号码
  getmobile: function(e) {
    var that = this;
    //参数值
    var txtval = e.detail.value;

    if (txtval == "") {
      that.showAlert("请输入手机号码");
    } else if (!validatorutil.validateMobile(txtval)) {
      that.showAlert("手机号码错误");
    } else {
      that.setData({
        mobile: txtval.trim()
      })
    }
  },
  //发送验证码
  sendcode: function(e) {
    var that = this;
    //参数值
    var mobile = that.data.mobile;
    if (mobile == "") {
      that.showAlert("请填写您的手机号码!");
    } else if (!validatorutil.validateMobile(mobile)) {
      that.showAlert("手机号码错误!");
    } else {
      //倒计时
      var timer = setInterval(function () {

        if (that.data.timeclock == 0) {
          that.setData({
            codetip: "获取验证码",
            timeclock: 60
          })
          clearInterval(timer);
        } else {
          that.setData({
            codetip: "剩余(" + (that.data.timeclock - 1) + ")s",
            timeclock: that.data.timeclock - 1
          })
        }
      }, 1000)

      /**TODO获取验证码**/
      wx.request({
        url: requesturl + '/staff/sendSmsBindMobile',
        data: {
          mobile: that.data.mobile,
          openid: getApp().globalData.openid
        },
        header: {
          "Content-Type": "application/json",
          "Cookie": "PHPSESSID=" + that.data.sid
        },
        method: 'GET',
        success: function(res) {
          console.log("获取验证码的值:");
          console.log(res);

          if (res.data.code==0){
          }else{
            console.log("获取短信验证码失败!");
          }
        }
      })
    }
  },
  //验证输入是否正确验证码
  validatecode: function(e) {
    var that = this;

    //获取输入值
    var txtval = e.detail.value;
    that.setData({
      msgcode: txtval
    })
  },
  //联系人手机号码
  getphone: function(e) {
    var that = this;
    //参数值
    var txtval = e.detail.value;

    that.setData({
      phone: txtval.trim()
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
  showxyopt: function() {
    var that = this;
    that.setData({
      isxyshow: "c-state1"
    })
  },
  //协议我知道了
  xieyimodal: function() {
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
      mobile = that.data.mobile, //手机号码
      mobilecode = that.data.msgcode, //是否通过验证
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

    var lng=that.data.lng;//经度
    var lat=that.data.lat;//纬度  
    //技能照
    var skill_imgs="";
    for (var i = 0; i < zhengtu.length;i++){
      skill_imgs += zhengtu[i]+",";
    }
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
    } else if (parseInt(year) <= 0) {
      that.showAlert("年龄大于0");
    } else if (sexindex == -1) {
      that.showAlert("请选择性别");
    } else if (address == "") {
      that.showAlert("请输入现住址");
    }else if (phone == "") {
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
    } else if (!isagree) {
      that.showAlert("请同意协议");
    } else if (lat==0||lng==0) {
      that.showAlert("请允许获取您得位置");
      that.GetPostion();
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
          mobile: mobile,
          mobile_code: mobilecode,
          urgent_tel: phone,
          urgent_relationship: guanxi,
          skill_imgs: skill_imgs,
          lat:lat,
          lng:lng
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cookie": "PHPSESSID=" + that.data.sid
        },
        method: 'POST',
        success: function(res) {
          console.log("提交申请结果:");
          console.log(res);
          if (res.data.result) {
            wx.redirectTo({
              url: '../sign/result?status=0&reason=',
            })
          } else {
            that.showAlert(res.data.msg);
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