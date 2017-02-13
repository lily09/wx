// pages/orderDetail/orderDetail.js
var app=getApp();
Page({
  data:{
    orderinfo:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    var orderid=options.orderid;
    console.log(orderid+"------------orderid")
    app.getUserInfo(function(){
      wx.getStorage({
        key: 'onlyid',
        success: function(res) {
            // console.log(res.data)
            var openid=res.data;
            wx.request({
              url: app.globalData.url+'/wx/trade/getInfo', //接口地址
              data: {
                openid:openid,
                orderid:orderid
              },
              header: {
                  'content-type': 'application/json'
              },
              method:"GET",
              success: function(res) {
                console.log(res.data.orderinfo)
                that.setData({
                  orderinfo:res.data.orderinfo
                })
                
              }
            })
            
        } 
      })
    });
    
  },
  viewLog:function(e){
    var that=this;
    var mailNum=that.data.orderinfo.mailnum;
    app.getUserInfo(function(){
      wx.getStorage({
        key: 'onlyid',
        success: function(res) {
            // console.log(res.data)
            var openid=res.data;
            wx.request({
              url: app.globalData.url+'/wx/express/getInfo', //接口地址
              data: {
                openid:openid,
                mailNum:mailNum
              },
              header: {
                  'content-type': 'application/json'
              },
              method:"GET",
              success: function(res) {
                console.log(res.data)
                wx.navigateTo({
                  url: '../logInfo/logInfo',
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
                
              }
            })
            
        } 
      })
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})