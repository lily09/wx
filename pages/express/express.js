// pages/express/express.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    that.data.addressid1=options.addressid1;
    that.data.addressid2=options.addressid2;
    that.data.expressName1=options.expressName1;
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
  },
  chooseExpress:function(e){
    // console.log(e.currentTarget.dataset.name)
    var that=this;
    var expressName=e.currentTarget.dataset.name;
    var currentPageS=getCurrentPages()[0].data;
    currentPageS.expressName=expressName;
    // var addressid1 = that.data.addressid1;
    // var addressid2=that.data.addressid2;
   
    wx.navigateBack();
    // wx.redirectTo({
    //   url: '../index/index?expressName='+ '&addressid1=' + addressid1 + '&addressid2=' + addressid2+'&expressName1=' + expressName,
    //   success: function(res){
    //     // success

    //   },
    //   fail: function() {
    //     // fail
    //   },
    //   complete: function() {
    //     // complete
    //   }
    // })
  }
})