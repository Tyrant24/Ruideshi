// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CommunityApi } from "../../apis/community.api.js";

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
      orderby:'r_main.redu desc',
      type:'A'
    });
  }
  onMyShow() {
    var that = this;
    var communityapi = new CommunityApi();
    communityapi.huatiinfo({id:this.Base.options.id},(info)=>{
      this.Base.setMyData({
        info
      })
    })
    communityapi.list({
      huati_id:this.Base.options.id,
      orderby:this.Base.getMyData().orderby
    },(list)=>{
      this.Base.setMyData({
        list
      })
    })
  }

  tofatie(){
    wx.navigateTo({
      url: '/pages/fatie/fatie?id='+this.Base.getMyData().info.id,
    })
  }
  switchnav(e){
    var id = e.currentTarget.id;
    var orderby='';
    if(id=='A'){
      orderby='r_main.redu desc'
    }
    if(id=='B'){
      orderby='r_main.shijian desc'
    }
    this.Base.setMyData({
      type:id,
      orderby:orderby
    })
    this.onMyShow();
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
body.tofatie = content.tofatie; 
body.switchnav = content.switchnav; 
body.todetail = content.todetail; 
Page(body)

