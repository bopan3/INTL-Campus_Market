// miniprogram/pages/register/register.js
const db = wx.cloud.database();
const users = db.collection("users");

Page({
  data: {
    nameRepeat:false,
    pswRepeat:false,
    nullfont:false,
    namelength:0
},
register:function(event){
  console.log(event.detail.value)
  let psw1=event.detail.value.psw1
  let psw2=event.detail.value.psw2
  let name=event.detail.value.name
  if(event.detail.value.name.length==0||event.detail.value.psw1.length==0||event.detail.value.psw2.length==0){
    this.setData({
      nullfont:true
    })
    return
  }else{
    this.setData({
      null:false
    })
  }
  // 防止账号重复
  users.where({
    name: name
    }).get().then(res=>{
      this.setData({
        namelength: res.data.length
      })
      if(res.data.length!==0){
        this.setData({
          nameRepeat:true
        })
        
      }else{
        this.setData({
          nameRepeat:false
        })
      }
    
      }
   )
   if(this.data.namelength!==0){
     return false
   }
  //  两次输入密码不一致
  if(psw1===psw2){
    this.setData(
      {pswRepeat:false}
    )
    
    // 在数据库中添加用户信息
    users.add({
      data:{
        name:name,
        psw:psw1
      }
    })
    setTimeout(() => {
      wx.showToast({
        title: '提交成功',
        icon: "success",
      })
      setTimeout(() => {
        wx.hideToast();
      }, 5000)
    }, 0)
    wx.redirectTo({
      url: '../login/login'
    })
  }else{
    this.setData(
      {pswRepeat:true}
    )
  }
      
}
})
