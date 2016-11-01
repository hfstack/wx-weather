//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    addressComponent: {},
    weather:{},
    flag:''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.loadLocation()

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  loadLocation: function () {
    var page = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        page.loadCity(latitude, longitude);
      }
    })
  },
  loadCity: function (latitude, longitude) {
    var page = this;
    wx.request({
      url:'http://api.map.baidu.com/geocoder/v2/?ak=LIkYxythH2yrgUE42GfgtkY56cLtTb51&location='+latitude+','+longitude+'&output=json&pois=0',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var addressComponent = res.data.result.addressComponent;
        var city = addressComponent.city.replace('市','');
        page.setData({
          addressComponent:addressComponent
        });
        page.loadWeather(city);
      }
    })
  },
  loadWeather: function(city) {
    let _this = this;
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city='+city,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        let weather = res.data.data;
        console.log(res)
        _this.setData({
          weather:weather
        })
      }
    })
  }
})
