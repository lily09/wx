// pages/orderAmount/orderAmount.js
Page({
  data:{
    toast:true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  amountInput:function(e){
    this.data.amount = e.detail.value;
  },
  confirmAmount:function(){
    var that=this;
    var amount=that.data.amount;
    console.log(amount)

    if(amount!="" && amount!=undefined){
      wx.showToast({
        title: '支付成功',
        duration: 2000,
        success:function(){
          wx.navigateBack()
        }
      })
    }else{
      that.setData({
        toast:false,
        toastTxt:"请输入订单金额"
      })
      setTimeout(function(){
        that.setData({
          toast:true,
          toastTxt:""
        })
      },1000)
      return
    }
      
  }
})