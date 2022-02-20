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
      title: '收藏',
    })
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();
    memberapi.infosc({},(list)=>{
      if(list.length>0){
        for(let item of list){
          item.shijian = ApiUtil.Timeshow(item.shijian);
        }
      }
      
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