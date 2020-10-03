// pages/mine/mine.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    status:"登录/退出"
  },
  login:function(){
    if(this.data.status==="登录/注册"){
      wx.navigateTo({
        url: '../login/login'
    })
    }else{
      app.appUser=null;
      this.setData({
        status:"登录/注册"
      })
      wx.showToast({
        title: '退出成功！',
        icon: 'success',
        duration: 2000
      })
      this.onLoad()
    }
   
  },
  mypublish:function(){
    if(app.appUser===null){
      wx.showToast({
        title: '请您先登录！',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: '../mypublish/mypublish',
    })
    }
  },
  collection:function(){
    if(app.appUser===null){
      wx.showToast({
        title: '请您先登录！',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: '../collection/collection',
    })
    }
  }, chats:function(){
    if(app.appUser===null){
      wx.showToast({
        title: '请您先登录！',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: '../chats/chats',
    })
    }
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
    console.log(this.data.active)
    if(this.data.active===1){
      wx.redirectTo({
        url: '../mine/mine'
      })
    }else{
      wx.redirectTo({
        url: '../index/index'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        if(app.appUser===null){
          this.setData({
            status:"登录/注册"
          })
        }else{
          this.setData({
            status:"退出"
          })
        }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})