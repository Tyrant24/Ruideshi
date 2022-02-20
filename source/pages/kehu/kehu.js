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

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '客户信息',
    })
    this.Base.setMyData({
      searchword:''
    })
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();
    var searchword = this.Base.getMyData().searchword;

    // var days=ApiUtil.daysDistance('1999-11-20');
    memberapi.mykehu({searchword:searchword},(list)=>{
      for(var i=0;i<list.length;i++){
          list[i].tishi=ApiUtil.daysDistance(list[i].birthday);
      }
      this.Base.setMyData({
        list
      })
    })
  }
  bindconfirm(e){
    this.Base.setMyData({
      searchword: e.detail.value
    })
    this.onMyShow();
  }
  todetail(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/kehuinfo/kehuinfo?id='+id,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.bindconfirm = content.bindconfirm;
body.todetail = content.todetail;
Page(body)