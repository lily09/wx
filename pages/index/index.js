//index.js
var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    dates: [
      "今天",
      "明天",
      "2016.02.05"
    ],
    times: [
      "12:00-14:00",
      "14:00-16:00",
      "16:00-18:00"
    ],
    goodsType: [
      "文件",
      "衣服",
      "日用品",
      "食品",
      "电子产品",
      "其他"
    ],
    goodsWeight: [
      "3公斤以下",
      "3-5公斤",
      "5-8公斤",
      "8-10公斤",
      "10-15公斤",
      "15公斤以上"
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    isTime: false,
    date: "今天",
    time: "12:00-14:00",
    initText: "请选择",
    initTextW: "请选择",
    fromWh: false,
    fromWhC: true,
    toWh: false,
    toWhC: true,
    expressName: "请选择",
    arr:"",
    toast:true,
    toastTxt:"",
    estimatefee:"￥13.00",
    feeH:true
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      isTime: !this.data.isTime
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，类型携带值为', e.detail.value)
    var index=e.detail.value;
    this.setData({
      index: e.detail.value,
      initText:this.data.goodsType[index]
    })
  },
  bindWeightChange: function (e) {
    console.log('picker发送选择改变，重量携带值为', e.detail.value)
    var index=e.detail.value;
    this.setData({
      index2: e.detail.value,
      initTextW: this.data.goodsWeight[index]
    })
  },
  close: function (e) {
    this.setData({
      isTime: !this.data.isTime
    })
  },
  bindChange: function (e) {
    var val = e.detail.value
    this.setData({
      date: this.data.dates[val[0]],
      time: this.data.times[val[1]]
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  sendAddress: function (e) {
    var that = this;
    app.getUserInfo(function () {
      wx.getStorage({
        key: 'onlyid',
        success: function (res) {
          // console.log(res.data)
          var openid = res.data;
          wx.navigateTo({
            url: '../address/deliver/deliverAddress/deliverAddress?openid=' + openid,
            success: function (res) {
              // success
              //  console.log(res)
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })

        }
      })
    })
  },
  receiverAddress: function (e) {
    var that = this;
    // console.log(addressid1)
    app.getUserInfo(function () {
      wx.getStorage({
        key: 'onlyid',
        success: function (res) {
          // console.log(res.data)
          var openid = res.data;
          wx.navigateTo({
            url: '../address/receiver/receiverAddress/receiverAddress?openid=' + openid,
            success: function (res) {
              // success
              //  console.log(res)
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })

        }
      })
    })
  },
  fromW: function (e) {
    wx.navigateTo({
      url: '../address/deliver/addDeliverAddress/addDeliverAddress?id=1',
      success: function (res) {
        // success
        //  console.log(res)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  toW: function (e) {
    wx.navigateTo({
      url: '../address/receiver/addReceiverAddress/addReceiverAddress',
      success: function (res) {
        // success
        //  console.log(res)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onLoad: function (options) {
    // indexHei
    var j=util.formatTime2(0);
    var m=util.formatTime2(1);
    var h=util.formatTime2(2);
    this.setData({
      dates:{
        j,
        m,
        h
      } 
     
      
    })
    console.log(this.data.dates)
  },
  expressTap: function (e) {
    var that=this;
    // openid
    app.getUserInfo(function () {
      wx.getStorage({
        key: 'onlyid',
        success: function (res) {
          var openid = res.data;
          wx.navigateTo({
            url: '../express/express?openid=' + openid,
            success: function (res) {
              // success
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })
        }
      })
    })
    // openid

  },
  confirmOrder:function(e){
    var that=this;
    var senderName=that.data.name;
    var senderPhone=that.data.phone;
    var senderAddress=that.data.province+that.data.city+that.data.county+that.data.address;

    var receiverName=that.data.name2;
    var receiverPhone=that.data.phone2;
    var receiverAddress=that.data.province2+that.data.city2+that.data.county2+that.data.address2;

    var expectTim=that.data.date+that.data.time;
    var express=that.data.expressName;
    var goodstyp=that.data.initText;
    var weight=that.data.initTextW;
    
    if(senderName==undefined || senderPhone==undefined || senderAddress==undefined){
      that.setData({
        toast:false,
        toastTxt:"请选择发件地址"
      })
      setTimeout(function(){
        that.setData({
          toast:true,
          toastTxt:""
        })
      },1000)
      return
    }else if(receiverName==undefined || receiverPhone==undefined || receiverAddress==undefined){
      that.setData({
        toast:false,
        toastTxt:"请选择收件地址"
      })
      setTimeout(function(){
        that.setData({
          toast:true,
          toastTxt:""
        })
      },1000)
      return
    }else if(expectTim=="" || expectTim==undefined){
      that.setData({
        toast:false,
        toastTxt:"请选择期待上门时间"
      })
      setTimeout(function(){
        that.setData({
          toast:true,
          toastTxt:""
        })
      },1000)
      return
    }else if(express=="" || express==undefined){
      that.setData({
        toast:false,
        toastTxt:"请选择快递公司"
      })
      setTimeout(function(){
        that.setData({
          toast:true,
          toastTxt:""
        })
      },1000)
      return
    }else if(goodstyp=="" || goodstyp==undefined){
      that.setData({
        toast:false,
        toastTxt:"请选择物品类型"
      })
      setTimeout(function(){
        that.setData({
          toast:true,
          toastTxt:""
        })
      },1000)
      return
    }else if(weight=="" || weight==undefined){
      that.setData({
        toast:false,
        toastTxt:"请选择物品重量"
      })
      setTimeout(function(){
        that.setData({
          toast:true,
          toastTxt:""
        })
      },1000)
      return
    }else{
      that.setData({
        feeH:false
      })
    }

    app.getUserInfo(function(){
      wx.getStorage({
        key: 'onlyid',
        success: function(res) {
          var openid=res.data;
          wx.request({
            url: app.globalData.url+'/wx/trade/add',
            data: {
              openid:openid,
              goodstyp:goodstyp,
              weight:weight,
              estimatefee:"￥13",
              express:express,
              expect_tim:expectTim,
              receiver_phone:receiverPhone,
              receiver_name:receiverName,
              receiver_address:receiverAddress,
              sender_phone:senderPhone,
              sender_name:senderName,
              sender_address:senderAddress
            },
            method: 'POST', 
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            }, 
            success: function(res){
              // success
              console.log(res);
              wx.navigateTo({
                url: '../order/orderList/orderList?openid='+openid,
                success: function(res){
                  // success
                },
                fail: function() {
                  // fail
                },
                complete: function() {
                  // complete
                }
              })
            },
            fail: function() {
              // fail
            },
            complete: function() {
              // complete
            }
          })
        }
      })
    })
  },
  onShow: function () {
    console.log("onShow")
    var that=this;
    var currentPageX=getCurrentPages()[0].data
    that.setData({
      fromWh: currentPageX.fromWh,
      fromWhC: currentPageX.fromWhC,
      name:currentPageX.name,
      phone:currentPageX.phone,
      province:currentPageX.province,
      city:currentPageX.city,
      county:currentPageX.county,
      address:currentPageX.address,

      toWh: currentPageX.toWh,
      toWhC: currentPageX.toWhC,
      name2:currentPageX.name2,
      phone2:currentPageX.phone2,
      province2:currentPageX.province2,
      city2:currentPageX.city2,
      county2:currentPageX.county2,
      address2:currentPageX.address2,

      expressName:currentPageX.expressName
    })
  }
})
