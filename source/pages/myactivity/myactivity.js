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
      title: '我的活动',
    })
    this.Base.setMyData({
      type:'B'
    })
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();
    
    memberapi.myactivity({usestatus:this.Base.getMyData().type},(list)=>{
      this.Base.setMyData({
        list
      })
    })
  }
  toactivity(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/activity/activity?id='+id,
    })
  }
  switchnav(e){
    var type = e.currentTarget.id;
    this.Base.setMyData({
      type:type
    })
    this.onMyShow();
  }
  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.toactivity = content.toactivity;
body.switchnav = content.switchnav;
Page(body)