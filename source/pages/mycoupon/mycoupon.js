import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";
import { ApiUtil } from "../../apis/apiutil";
var WxParse = require('../../wxParse/wxParse')
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '优惠券',
    })
   this.Base.setMyData({
     type:'A',
     ishsow:false,
     coupon_id:0
   })
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();
    memberapi.mycoupons({coupon_type:this.Base.getMyData().type,use_status:'A,C',orderby:'r_main.use_status,r_main.harvest_time desc'},(list)=>{
      this.Base.setMyData({
        list
      })
    })
  }
  swtichnav(e){
    var id = e.currentTarget.id;
    this.Base.setMyData({
      type:id
    })
    this.onMyShow();
  }
  touse(e){
    var item = e.currentTarget.dataset.item;
    if(item.coupon_type=='A'){
      this.backHome();
    }
    if(item.coupon_type=='B'){
      var coupon_id = item.id;
      var usecode=item.usecode;
      this.Base.setMyData({
        ishsow:true,
        coupon_id:coupon_id,
        usecode:usecode
      })
    }
  }
  showqrcode(){
    var ishsow = this.Base.getMyData().ishsow;
    ishsow=ishsow?false:true;
    this.Base.setMyData({
      ishsow,
      coupon_id:0
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.swtichnav = content.swtichnav;
body.touse = content.touse;
body.showqrcode = content.showqrcode;
Page(body)