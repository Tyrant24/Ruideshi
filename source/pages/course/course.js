// pages/goodsinfo/goodsinfo.js
// pages/mall/mall.js
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
  CourseApi
} from "../../apis/course.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;

    super.onLoad(options);
    this.Base.setMyData({
      StatusBar: getApp().globalData.StatusBar,
      CustomBar: getApp().globalData.CustomBar,
      Custom: getApp().globalData.Custom,
      typeidx:0,
      typeid:0,
    });

  }
  onMyShow() {
    var that = this;
    var courseapi = new CourseApi();
    courseapi.lunbolist({},(lunbolist)=>{
      this.Base.setMyData({
        lunbolist
      })
    })
    var typeid = this.Base.getMyData().typeid;
    courseapi.typelist({},(typelist)=>{
      if(typeid==0 ||typeid==undefined){
        typeid = typelist[0].id;
      }
      
      this.Base.setMyData({
        typelist
      })

      courseapi.steplist({typeid:typeid},(steplist)=>{
        for(let item of steplist){
          for(let json of item.list){
            if(json.typename!=''){
              json.typelist = json.typename.split(',');
            }
          }
        }
        this.Base.setMyData({
          steplist
        })
      })
    })
   
  }

  switchnav(e){
    var idx = e.currentTarget.id;
    var typelist = this.Base.getMyData().typelist;
    var typeid = typelist[idx].id;
    this.Base.setMyData({
      typeid:typeid,
      typeidx:idx
    })
    this.onMyShow();
  }
  tolist(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/courselist/courselist?id='+id,
    })

  }
  todetail(e){
    return;
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/courseinfo/courseinfo?id='+id,
    })
  }
  tobanner(e){
    var item = e.currentTarget.dataset.item;
    if(item.type=='A'){
      wx.navigateTo({
        url: '/pages/courseinfo/courseinfo?id='+item.course_id,
      })
    }else if(item.type=='B'){
      wx.navigateTo({
        url: item.urls,
      })
    }else {}
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.switchnav = content.switchnav;
body.tolist = content.tolist;
body.todetail = content.todetail;
body.tobanner = content.tobanner;
Page(body)