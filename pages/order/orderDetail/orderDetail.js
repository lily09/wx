// pages/orderDetail/orderDetail.js
var app=getApp();
Page({
  data:{
    orderinfo:"",
    cancelH:true,
    getH:true,
    isCancel:false,
    cancelR:"",
    cancelList:[
      "点错了",
      "等太久了",
      "不想寄了",
      "修改订单信息",
      "配送员要求取消",
      "其他原因"
    ]
  },
  cancelOrder: function (e) {
    var that=this;
    that.setData({
      isCancel:!that.data.isCancel,
      cancelR:that.data.cancelList[0]
    })
  },
  bindChange: function (e) {
    var that=this;
    var val = e.detail.value
    that.setData({
      cancelR: that.data.cancelList[val]
    })
  },
  confirmC:function(e){
    var that=this;
    that.setData({
      isCancel:!that.data.isCancel,
      cancelH:false,
      osH:true,
      ordersH:true,
      getH:true,
      status:"已取消"
    })
    
  },
  close:function(e){
    var that=this;
    that.setData({
      isCancel:!that.data.isCancel
    })
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
                  orderinfo:res.data.orderinfo,
                  orderinfo:{
                    status:"待取件"
                  }
                })
                var getStxt=that.data.orderinfo.status;
                if(getStxt=="待取件"){
                  that.setData({
                    getH:false,
                    osH:true
                  })
                }
              }
            })
            
        } 
      })
    });
    
  },
  payPage:function(e){
    var that=this;
    wx.navigateTo({
      url: '../orderAmount/orderAmount',
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
    // app.getUserInfo(function(){
    //   wx.getStorage({
    //     key: 'onlyid',
    //     success: function(res) {
    //         // console.log(res.data)
    //         var openid=res.data;
    //         wx.request({
    //           url: '', //接口地址
    //           data: {
                
    //           },
    //           header: {
    //               'content-type': 'application/json'
    //           },
    //           method:"GET",
    //           success: function(res) {
    //             console.log(res.data)
    //             wx.navigateTo({
    //               url: '../orderAmount/orderAmount',
    //               success: function(res){
    //                 // success
    //               },
    //               fail: function() {
    //                 // fail
    //               },
    //               complete: function() {
    //                 // complete
    //               }
    //             })
                
    //           }
    //         })
            
    //     } 
    //   })
    // });
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