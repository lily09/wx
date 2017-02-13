//app.js

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that=this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 设备信息
		wx.getSystemInfo({
			success: function(res) {
				that.screenWidth = res.windowWidth;
				that.screenHeight = res.windowHeight;
				that.pixelRatio = res.pixelRatio;
			}
		});
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid:"wxf8926497d05d5c26",
              secret:"4158d5405702037a22c2ac3ea2b00928",
              js_code:res.code,
              grant_type:"authorization_code"
            },
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              var openid=res.data.openid;
              wx.setStorage({
                key:"onlyid",
                data:openid
              })
              
              // console.log(res.data.openid)
            }
          })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }

          wx.getUserInfo({
            success: function (res) {
              // console.log(res)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
 
  globalData:{
    userInfo:null,
    url:'https://wx.bangbangda.cn'
  }

})