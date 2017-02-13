// pages/addDeliverAddress/addDeliverAddress.js
var tcity = require("../../../../utils/citys.js");
var app = getApp();
Page({
  data:{
    defaultSize:"default",
    loading:false,
    plain:false,
    disabled:false,

    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,

    userName:"",
    phone:"",
    address:"",

    toast:true
  },
  bindChange: function(e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;
    
    if(val[0] != t[0]){
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0 ; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0 ; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys:citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys:countys,
        values: val,
        value:[val[0],0,0]
      })
      
      return;
    }
    if(val[1] != t[1]){
      console.log('city no');
      const countys = [];

      for (let i = 0 ; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }
      
      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys:countys,
        values: val,
        value:[val[0],val[1],0]
      })
      return;
    }
    if(val[2] != t[2]){
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val,
        value:[val[0],val[1],val[2]]
      })
      return;
    }
    

  },
  open:function(){
    this.setData({
      condition:!this.data.condition
    })
  },
  onLoad: function () {
    console.log("onLoad");
    var that = this;
    
    tcity.init(that);

    var cityData = that.data.cityData;

    
    const provinces = [];
    const citys = [];
    const countys = [];

    for(let i=0;i<cityData.length;i++){
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0 ; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0 ; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys':citys,
      'countys':countys,
      'province':cityData[0].name,
      'city':cityData[0].sub[0].name,
      'county':cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');
  },
  userNameInput:function(e){
    this.data.userName = e.detail.value;
  },
  phoneInput:function(e){
    this.data.phone = e.detail.value;
  },
  addressInput:function(e){
    this.data.address = e.detail.value;
  },
  saveAddress:function(){
    var that=this;
    app.getUserInfo(function(){
      wx.getStorage({
        key: 'onlyid',
        success: function(res) {
            // console.log(res.data)
            var openid=res.data;
            
            var userName=that.data.userName;
            var phone=that.data.phone;
            var province=that.data.province;
            var city=that.data.city;
            var county=that.data.county;
            var address=that.data.address;
            // console.log(address)
            if(userName!=""){

              console.log()
            }else{
              console.log("请输入姓名")
              return;
            }

            if(phone!="" && phone.length == 11){
              console.log()
            }else{
              that.setData({
                toast:false,
                toastTxt:"请输入11位手机号码"
              })
              setTimeout(function(){
                that.setData({
                  toast:true,
                  toastTxt:""
                })
              },1000)
              return;
            }

            if(province!="" && city!="" && county!=""){
              console.log()
            }else{
              console.log("请选择省市区")
              return;
            }

            if(address!=""){
              console.log()
            }else{
                console.log("请填写地址")
                return;
            }
            wx.request({
              url: app.globalData.url+'/wx/address/save', //接口地址
              data: {
                openid:openid,
                addressid:'0',
                name:userName,
                phone:phone,
                prov:province,
                city:city,
                area:county,
                address:address,
                flag:2
              },
              header: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              method:"POST",
              success: function(res) {
                // console.log(res.data)
                wx.showToast({
                  title: '创建成功',
                  duration: 1000,
                  success:function(){
                    // wx.redirectTo({
                    //   url: '../receiverAddress/receiverAddress?openid='+openid
                    // })
                    wx.navigateBack()
                    
                  }
                })
              }
            })
            
        } 
      })
    })
  }


  

})