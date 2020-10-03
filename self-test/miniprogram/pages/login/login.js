// miniprogram/pages/login/login.js
var app = getApp();
const db = wx.cloud.database();
const users = db.collection("users");

Page({

  /**
   * 页面的初始数据
   */
  data: {
      notFind:false
  },
  login:function(event){
      users.where({
        name:event.detail.value.name,
        psw:event.detail.value.psw
      }).get().then(res=>{
        if(res.data.length===0){
          this.setData({
            notFind:true
          })
        }else{
          this.setData({
            notFind:false
          })
          
          app.appUser = res.data[0]
          console.log(app.appUser)
         
          setTimeout(() => {
            wx.showToast({
              title: '登录成功',
              icon: "success",
            })
            setTimeout(() => {
              wx.hideToast();
            }, 3000)
          }, 0)
          wx.redirectTo({
            url: '../index/index'
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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