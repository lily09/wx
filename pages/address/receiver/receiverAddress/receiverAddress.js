// pages/address/deliverAddress/deliverAddress.js
var app = getApp();
Page({
  data: {
    addressList: "",
    radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // console.log(options)
    var that = this;
    wx.request({
      url: app.globalData.url+'/wx/address/getList',
      data: {
        openid: options.openid,
        flag:2
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        // success
        that.setData({
          addressList: res.data.addresslist
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  chooseAddress: function (e) {
   
    var that = this;
    var currentPageS=getCurrentPages()[0].data;
    currentPageS.toWh=true;
    currentPageS.toWhC=false;
    var i;
    var addressid = e.currentTarget.dataset.addressid;
    var addressL = that.data.addressList;
    for(i=0;i<addressL.length;i++){
      
      if(addressL[i].addressid == addressid){
        currentPageS.name2=addressL[i].name;
        currentPageS.phone2 = addressL[i].phone;
        currentPageS.province2 = addressL[i].prov;
        currentPageS.city2 = addressL[i].city;
        currentPageS.county2 = addressL[i].area;
        currentPageS.address2 = addressL[i].address;
      }
    }

    wx.navigateBack();

  },
  editDaddress: function (e) {
    var that = this;
    var i;
    var addressid = e.target.dataset.addressid;
    
    var addressL = that.data.addressList;
    for(i=0;i<addressL.length;i++){
      
      if(addressL[i].addressid == addressid){
        var userName = addressL[i].name;
        var phone = addressL[i].phone;
        var province = addressL[i].prov;
        var city = addressL[i].city;
        var county = addressL[i].area;
        var address = addressL[i].address;
      }
    }
    app.getUserInfo(function () {
      wx.getStorage({
        key: 'onlyid',
        success: function (res) {
          // console.log(res.data)
          console.log(that.data.addressList.length)
          var openid = res.data;
          
            
          
          wx.navigateTo({
            url: '../editReceiverAddress/editReceiverAddress?openid='+openid+'&addressid='+addressid+'&name='+userName+'&phone='+phone+'&prov='+province+'&city='+city+'&area='+county+'&address='+address+'',
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




  },
  addAddress:function(e){
    wx.navigateTo({
      url: '../addReceiverAddress/addReceiverAddress',
      success: function(res){
        // success
      //  console.log(res)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that=this;
    console.log("onshow");
    app.getUserInfo(function(){
      wx.getStorage({
        key: 'onlyid',
        success: function(res) {
          var openid=res.data;
          wx.request({
            url: app.globalData.url+'/wx/address/getList',
            data: {
              openid:openid,
              flag:2
            },
            method: 'GET', 
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data.addresslist)
              // success
              that.setData({
                addressList: res.data.addresslist
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
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})