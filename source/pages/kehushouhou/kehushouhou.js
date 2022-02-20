// pages/aftersale/aftersale.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  MallApi
} from "../../apis/mall.api.js";
import {
    MemberApi
  } from "../../apis/member.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: "售后跟踪"
    })
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();
    memberapi.kehushouhou({},(list)=>{
      this.Base.setMyData({
        list
      })
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)