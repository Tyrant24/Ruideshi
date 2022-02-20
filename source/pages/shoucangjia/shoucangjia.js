// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { CommunityApi } from "../../apis/community.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: decodeURIComponent( this.Base.options.typename),
    })
    this.Base.setMyData({
      type:'A'
    })
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();
    memberapi.shoucanglist({menushoucang_id:this.Base.options.id},(list)=>{
      this.Base.setMyData({
        list
      })
    })
  }
  todetail(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/communityinfo/communityinfo?id='+id,
    })
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.todetail = content.todetail; 
Page(body)

