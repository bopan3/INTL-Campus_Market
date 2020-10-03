// pages/search/search.js
const db = wx.cloud.database();
const goods = db.collection("goods");
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

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    let that = this;
    console.log(options.content)
    console.log(options.content)

    wx.showLoading({
      title: '加载中'
  })

   goods
   .where({
      title:{
        $regex: '.*' + options.content + '.*',
        $options: 'i'
    }}).get({
      success: res => {
        console.log(res);
        console.log('开始')
       
        that.setData({
          goods_list:res
        })
        console.log("chenggong!")
        console.log(that.goods_list)
        wx.stopPullDownRefresh(); // 停止下拉刷新
        wx.hideLoading();
  
    },
    fail: err => {
        wx.hideLoading();
        console.log(err);
    }
    })
  // goods.orderBy('pub_time',"asc").get()
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