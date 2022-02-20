// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { ApiUtil } from "../../apis/apiutil";
import { MallApi } from "../../apis/mall.api";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      StatusBar: getApp().globalData.StatusBar,
      CustomBar: getApp().globalData.CustomBar,
      Custom: getApp().globalData.Custom,
      type:'A',
      isfenxiao:false,
      isqiandao:false,
      ishexiao:false,
    });
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();

    
     

    memberapi.myzuoping({},(myzuoping)=>{
      this.Base.setMyData({
        myzuoping,
       
      })
      if(this.Base.getMyData().type=='A'){
        this.Base.setMyData({
          list:myzuoping
        })
      }
    })
    memberapi.shoucanglist({},(shoucanglist)=>{
      this.Base.setMyData({
        shoucanglist
      })
      if(this.Base.getMyData().type=='B'){
        this.Base.setMyData({
          list:shoucanglist
        })
      }
    })
  
  }
  switchnav(e){
    var id = e.currentTarget.id;
    var myzuoping = this.Base.getMyData().myzuoping;
    var shoucanglist = this.Base.getMyData().shoucanglist;
    var list = [];
    if(id=='A'){
      list=myzuoping;
    }
    if(id=='B'){
      list=shoucanglist;
    }

    this.Base.setMyData({
      type:id,
      list:list
    })
  }
  toshoucang(){
    wx.navigateTo({
      url: '/pages/shoucang/shoucang',
    })
  }
  toshequ(e){
    var item = e.currentTarget.dataset.item;
    var type = this.Base.getMyData().type;
    var id = 0;
    if(type=='A'){
      id = item.id;
    }
    if(type=='B'){
      id = item.community_id;
    }
    wx.navigateTo({
      url: '/pages/communityinfo/communityinfo?id='+id+'&type='+type,
    })
  }
  tomember(){
    wx.navigateTo({
      url: '/pages/memberinfo/memberinfo',
    })
  }
  fxfenxiang(){
    var isfenxiao = this.Base.getMyData().isfenxiao;
    isfenxiao=isfenxiao?false:true;
    this.Base.setMyData({
      isfenxiao
    })
  }
  saveerweima(e){
      var id = e.currentTarget.id;
      this.Base.download(id,(ret)=>{
        this.Base.toast('保存成功');
      })
  }
  tokehu(){
    wx.navigateTo({
      url: '/pages/kehu/kehu',
    })
  }
  toaboutus(){
    wx.navigateTo({
      url: '/pages/aboutus/aboutus',
    })
  }
  tofeedback(){
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  }
  tongzhi(){
    wx.navigateTo({
      url: '/pages/tongzhi/tongzhi',
    })
  }
  tokehuorder (){
    wx.navigateTo({
      url: '/pages/kehuorder/kehuorder',
    })
  }
  tohuiyuan(){
    wx.navigateTo({
      url: '/pages/member/member',
    })
  }
  tojifen(){
    wx.navigateTo({
      url: '/pages/memberjifen/memberjifen',
    })
  }
  tocoupon(){
    wx.navigateTo({
      url: '/pages/mycoupon/mycoupon',
    })
  }
  toscan(e){
    console.log('扫一扫');
    var memberapi = new MemberApi();
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: [],
      success: (result) => {
        console.log(result,'扫码成功结果')
        var code = result.result.split("-")[1];
        memberapi.dakajifen({
          dakajifen_id:code
        },(ret)=>{
          if(ret.code>=0){
           that.Base.setMyData({
             isqiandao:true
           })
          }else {
            that.Base.toast(ret.result);
          }
        })
      },
      fail: (res) => {
        console.log(res,'失败结果')
      },
      complete: (res) => {},
    })
  }
  qxmask(){
    this.Base.setMyData({
      isqiandao:false,
      isfenxiao:false,
      ishexiao:false
    })
  }
  onShareAppMessage(e){
    console.log(e)
    var path = "/pages/me/me?u_member_id="+this.Base.getMyData().memberinfo.id;
    return {
      title:'分销分享',
      path:path,
    }
  }
  hexiao(e){
      
    var memberapi = new MemberApi();
    var mallapi = new MallApi();
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: [],
      success: (result) => {
        // console.log(result,'扫码成功结果') ;

        mallapi.hexiao({id:result.result},(ret)=>{
          that.Base.setMyData({
            ishexiao:true
          })
        })
        
      },
      fail: (res) => {
        console.log(res,'失败结果')
      },
      complete: (res) => {},
    })
  }
 
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.switchnav = content.switchnav; 
body.toshoucang = content.toshoucang; 
body.toshequ = content.toshequ; 
body.tomember = content.tomember; 
body.fxfenxiang = content.fxfenxiang; 
body.saveerweima = content.saveerweima; 
body.tokehu = content.tokehu; 
body.toaboutus = content.toaboutus; 
body.tofeedback = content.tofeedback; 
body.tongzhi = content.tongzhi; 
body.tokehuorder = content.tokehuorder; 
body.tohuiyuan = content.tohuiyuan; 
body.tojifen = content.tojifen; 
body.tocoupon = content.tocoupon; 
body.toscan = content.toscan; 
body.hexiao = content.hexiao;  
body.qxmask = content.qxmask; 
body.onShareAppMessage = content.onShareAppMessage; 
Page(body)

