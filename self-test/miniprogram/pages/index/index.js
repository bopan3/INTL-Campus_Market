// miniprogram/pages/index/index.js
const db = wx.cloud.database();
const goods =db.collection("goods");
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // products:[],
    background: [    
    {url:'cloud://yun-pb-6gilbruf8aad50ab.7975-yun-pb-6gilbruf8aad50ab-1303834591/index/images/屏幕快照 2020-10-02 下午7.42.44.png'},
    {url:'cloud://yun-pb-6gilbruf8aad50ab.7975-yun-pb-6gilbruf8aad50ab-1303834591/index/images/屏幕快照 2020-10-02 下午7.42.44.png'} 
    ] ,
    goods:[
//       {url:"cloud://selftest-l77eh.7365-selftest-l77eh-1301972541/index/goods/微信图片_20200428162719.jpg",
//     price:15,
//   title:"马原课本-团河",
//   desc:"有大量精致笔记，可以帮助你高分通过考试，拒绝还价！",
//   tag:"hot"
// },
//       {url:"cloud://selftest-l77eh.7365-selftest-l77eh-1301972541/index/goods/微信图片_20200428162734.jpg",      
//       price:5,
//     title:"月饼-木区",
//     desc:"超级好吃，只不过，我吃不下了！",
//   tag:"好吃"},
//   {url:"cloud://selftest-l77eh.7365-selftest-l77eh-1301972541/index/goods/微信图片_20200428162710.jpg",      
//   price:30,
// title:"flask书-团河",
// desc:"较新，价格可商议！",
// tag:"实惠"
// }
    ],
    active: 0,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 2000
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
  publish:function(){
      if(app.appUser===null){
        wx.showToast({
          title: '请您先登录！',
          icon: 'none',
          duration: 2000
        })
      }else{
        wx.navigateTo({
          url: '../publish/publish',
      })
      }
  },
  secondHand:function(){
    wx.navigateTo({
      url: '../market/market',
  })
  } ,
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
      goods.orderBy('pub_time',"desc").limit(4).get({
        success: res => {
          console.log(res.data)
          var goods = res.data
          console.log(goods)
          this.setData({
            goods:goods
          })
          console.log(this.data.goods)
  }
      })
    } 
})