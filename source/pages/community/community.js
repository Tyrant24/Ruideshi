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
    wx.setNavigationBarTitle({
      title: '',
    })
    this.Base.setMyData({
      StatusBar: getApp().globalData.StatusBar,
      CustomBar: getApp().globalData.CustomBar,
      Custom: getApp().globalData.Custom,
      type:'A',
      huati_id:0,
      orderby:'r_main.tuijian desc'
    });

    var communityapi = new CommunityApi();
    communityapi.huati({},(huati)=>{
      if(this.Base.getMyData().huati_id==0 && huati.length>0){
          this.Base.setMyData({
            huati_id:huati[0].id
          })
      }
      this.Base.setMyData({
        huati
      })
    })
  }

  onMyShow() {
    var that = this;
    var data = this.Base.getMyData();
    var huati_id = data.huati_id;
    var orderby = data.orderby;
    var communityapi = new CommunityApi();
    communityapi.list({
      huati_id:huati_id,
      orderby:orderby
    },(list)=>{
      this.Base.setMyData({
        list
      })
    })
    communityapi.activitylist({
    },(activitylist)=>{
      this.Base.setMyData({
        activitylist
      })
    })
  }
  todetail(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/communityinfo/communityinfo?id='+id,
    })
  }
  switchnav(e){
    var id = e.currentTarget.id;
    var orderby='';
    if(id=='A'){
      orderby='r_main.tuijian desc';
    }
    if(id=='B'){
      orderby='r_main.shijian desc';
    }
    if(id=='C'){
      orderby='';
    }
    this.Base.setMyData({
      type:id,
      orderby:orderby
    })
    this.onMyShow();
  }
  chosehuati(e){
    var id = e.currentTarget.id;
    this.Base.setMyData({
      huati_id:id
    })
    wx.navigateTo({
      url: '/pages/huati/huati?id='+id,
    })
    // this.onMyShow();
  }
  fatie(){
    wx.navigateTo({
      url: '/pages/fatie/fatie',
    })
  }
  toactivity(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/activity/activity?id='+id,
    })
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.todetail = content.todetail; 
body.switchnav = content.switchnav; 
body.chosehuati = content.chosehuati; 
body.fatie = content.fatie; 
body.toactivity = content.toactivity; 
Page(body)

