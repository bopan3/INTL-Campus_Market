import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp();
const db= wx.cloud.database();
const users = db.collection("users");
const goods = db.collection("goods")
const collections = db.collection("collections")
Page({

    /**
    * 页面的初始数据
    */
    data: {
        good_imgs: [],
        detail: {},
        params:{},
        isLike: false,
        logged: false,
        goods_id: 0,
        status: 1,
        id:'',
        
        collection:"收藏"
       
    },
    collect:function(){
      // wx.showToast({
      //   title: '收藏成功',
      //   icon: "success",
      // })
      if(this.data.collection==="收藏"){
        // 收藏成功
      this.setData({
          collection:"已收藏"
      })
      
// 数据库操作
       console.log(app.appUser._id)
       console.log(this.data.id)
      collections.add({
        data:{
          appUser:app.appUser._id,
          good_id:this.data.id
        }
      }).then(res=>{
       console.log(res)
       console.log(res)
       console.log(app.appUser._id)
       console.log(this.data.id)
          wx.showToast({
            title: '收藏成功',
            icon: "success",
          })
          console.log(res)
          // this.setData({
          //   counterId: '',
          //   count: null,
          // })
       
      })
    }else{
      // 取消收藏
  
    wx.showToast({
      title: '抱歉，请到“我的收藏”中取消!!!',
      icon: "none",
    })
    // 数据库操作
    // let find_id=collections.where({
    //     appUser:app.getApp,
    //      good_id:this.data.id
    // })
    // console.log(find_id)
    // collections.doc(find_id._id).remove()
    }},

    /**
    * 生命周期函数--监听页面加载
    */
   
    onLoad: function (options) {
        this.setData({
          id:options.id,
          // appUser:app.appUser
        })
        var that = this;      
        goods.where({
          _id:this.data.id
        }).get({
          success: res => {
            console.log(this.data.id)
            console.log(res)
            console.log(res.data[0].params)
              this.setData({
                            good_imgs: res.data[0].params.pic_url,
                            params:res.data[0].params
                        })
        }
      })
      var good_id = this.data.id;
      var appUser = app.appUser._id;
      console.log(good_id) 
      console.log(appUser)
      var that = this;
      
                 collections.where({
                  appUser:appUser,
                  good_id:good_id              
                }).get({
                  success:res=>{
                    console.log("成功")
                    console.log(res.data)
                    var clct=res.data;
                    console.log(clct)
                    if(clct.length!==0){
                      that.setData(   {
                        collection:"已收藏"   
                      }                                               
                        )
                    }else{
                      that.setData(   {
                        collection:"收藏"   
                      }                                               
                        )
                    }
                    // that.setData({
                    //   cancel_list:cancel_list
                    // })
   },  
   fail:res=>{}
})
    },
  })