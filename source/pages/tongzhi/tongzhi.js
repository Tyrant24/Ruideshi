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

import {
  ApiUtil
} from "../../apis/apiutil.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '消息',
    })
    this.Base.setMyData({
      info:null
    })
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();
    memberapi.totalinfo({},(info)=>{
      if(info!=null){
        if(info.sysshijian!=''){
          info.sysshijian=ApiUtil.Timeshow(info.sysshijian);
        }
        if(info.plshijian!=''){
          info.plshijian=ApiUtil.Timeshow(info.plshijian);
        }
        if(info.scshijian!=''){
          info.scshijian=ApiUtil.Timeshow(info.scshijian);
        }
        if(info.dzshijian!=''){
          info.dzshijian=ApiUtil.Timeshow(info.dzshijian);
        }
      }
      this.Base.setMyData({
        info
      })
    })
  }
  totongzhi(){
    wx.navigateTo({
      url: '/pages/tongzhiinfo/tongzhiinfo',
    })
  }
  topinglun(){
    wx.navigateTo({
      url: '/pages/tongzhipl/tongzhipl',
    })
  }
  toshoucang(){
    wx.navigateTo({
      url: '/pages/tongzhisc/tongzhisc',
    })
  }
  todianzan(){
    wx.navigateTo({
      url: '/pages/tongzhidz/tongzhidz',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.totongzhi = content.totongzhi;
body.topinglun = content.topinglun;
body.toshoucang = content.toshoucang;
body.todianzan = content.todianzan;
Page(body)