var app=getApp();
const db = wx.cloud.database();
const goods = db.collection("goods");
const collections=db.collection("collections")
Page({
  data: {
    goods_list_pre: [],
    startNum: 0,
    inputShowed: false,
    value: '',
    goods_list:[],
    collection:"取消收藏",
    cancel_list:[]
  },
  cancel:function(event){
      console.log(event.currentTarget.dataset.id)
      var good_id = event.currentTarget.dataset.id;
      var appUser = app.appUser._id;
      console.log(good_id) 
      console.log(appUser)
      var that = this;
      wx.showModal({
        title: '提示',
        content: '确定要删除该发布吗？',
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击确定')
                goods.where({
                  // pub_id:appUser,
                  _id:good_id
                  
                }).get({
                  success:res=>{
                    console.log("成功")
                    that.data.cancel_list
                    console.log(res.data)
                    var cancel_list = res.data;
                    that.setData({
                      cancel_list:cancel_list
                    })
                    
                    for(var i=0;i<that.data.cancel_list.length;++i){
                      console.log("开始删除")
                      goods.doc(that.data.cancel_list[i]._id).remove()
                      console.log("删除成功")
                    }
                    
                  }
                  ,
                  fail:res=>{
                    console.log("失败")
                  }
                  
                  // }
                })

            }else{
               console.log('用户点击取消')
            }
        }
    })

      
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
  })
  var that = this;
  goods.where({
    pub_id:app.appUser._id
  }).get({
    success:res=>{
      let goods_list = res.data;
   this.setData({
      goods_list:goods_list
   })
   wx.stopPullDownRefresh(); // 停止下拉刷新
   wx.hideLoading();
  //  goods_list_pre中有数据啦
 if(this.data.goods_list.length===0){
  setTimeout(() => {
    wx.showToast({
      title: '您还没有发布过宝贝呐！',
      icon: "success",
    })
    setTimeout(() => {
      wx.hideToast();
    }, 8000)
  }, 0)
  wx.redirectTo({
    url: '../index/index'
  })
 }
  }
})
  }
})