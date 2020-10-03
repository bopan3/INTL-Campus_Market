// pages/collection/collection.js
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
    cancel_list:[],
    expire:1
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
        content: '确定要删除收藏吗？',
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击确定')

                collections.where({
                  appUser:appUser,
                  good_id:good_id
                
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
                      collections.doc(that.data.cancel_list[i]._id).remove()
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
//获取特殊商品 “收藏失效”
 //goods.where({
  // title:"该宝贝已经被拍走辣！"
 //}).get({
  // success:res=>{
  //  that.setData({
  //    expire:res.data[0]
   // })
   //}

 //})

 

  collections.where({
    appUser:app.appUser._id
  }).get({
    success:res=>{
      let goods_list_pre = res.data;
   this.setData({
      goods_list_pre:goods_list_pre  
   })
  //  goods_list_pre中有数据啦
 if(this.data.goods_list_pre.length===0){
  setTimeout(() => {
    wx.showToast({
      title: '没有收藏的宝贝！',
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
 
 

  for(var i=0;i<this.data.goods_list_pre.length;i++)
{
  var goods_id = this.data.goods_list_pre[i].good_id;
  var that =  this;
  goods.where({
    _id:goods_id
  }).get({
    success:res=>{
      console.log(res.data[0])
      if ( res.data[0] !==undefined){
        var goods_list = that.data.goods_list;
        goods_list.push(res.data[0])
        that.setData({
          goods_list:goods_list
        })
      }

     
      wx.stopPullDownRefresh(); // 停止下拉刷新
      wx.hideLoading();
    },
    fail:res=>{
      console.log("失败")
    }
  })
}
  }
})
  }
})