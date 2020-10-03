// miniprogram/pages/index/index.js
const db=wx.cloud.database();
const products=db.collection("products")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
 
    onsubmit:function(event){
      products.add({
        data:{
          name:event.detail.value.name,
          price:event.detail.value.price,
          size:event.detail.value.size
        }
      })
    }
 
} )