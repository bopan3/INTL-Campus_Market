// pages/market/market.js
const db = wx.cloud.database();
const goods = db.collection("goods");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_list: [],
    startNum: 0,
    inputShowed: false,
    value: ''

  
  },
  detail:function(event){
    var id = event.currentTarget.dataset.id;
    if(app.appUser===null){
      wx.showToast({
        title: '请您先登录！',
        icon: 'none',
        duration: 1500
      })
    }else{
      wx.navigateTo({
        url: '/pages/details/details?id='+id,
    })
    }
  },
  onChange(e) {
    this.setData({
      value: e.detail
    });
  },
  onClick() {
    console.log(this.data.value);
    wx.navigateTo({
      url: '../search/search?content='+this.data.value
    })
   
  },
 
    
 
  
    
    // wx.cloud.callFunction({
    //     name: 'getGoods_list',
    //     data: {
    //         startNum
    //     },
       
  // })


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
  })
  goods.orderBy('pub_time',"desc").get({
    success: res => {
      console.log(res);
      this.setData({
        goods_list:res
      })
      console.log(this.data.goods_list)
      wx.stopPullDownRefresh(); // 停止下拉刷新
      wx.hideLoading();

  },
  fail: err => {
      wx.hideLoading();
      console.log(err);
  }
  })
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
    wx.showLoading({
      title: '加载中'
  })
  goods.orderBy('pub_time',"asc").get({
    success: res => {
      console.log(res);
      this.setData({
        goods_list:res
      })
      console.log(this.data.goods_list)
      wx.stopPullDownRefresh(); // 停止下拉刷新
      wx.hideLoading();

  },
  fail: err => {
      wx.hideLoading();
      console.log(err);
  }
  })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})