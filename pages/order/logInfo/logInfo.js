// pages/order/logoInfo/logoInfo.js
var app=getApp();
Page({
  data:{
    expressList:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    var mailNum=options.mailnum;
    console.log(mailNum+"------------------mailnum")
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
                console.log(res.data);
                that.setData({
                  expressList:res.data.expressList
                })
              }
            })
            
        } 
      })
    });
  },
  onShareAppMessage:function(){
    return {
      title: '物流详情',
      path: ''
    }
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