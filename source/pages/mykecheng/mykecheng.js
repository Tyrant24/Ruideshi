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
        title: '我的课程',
      })
      this.Base.setMyData({
        type:'B'
      })
    }
    onMyShow() {
      var that = this;
      var memberapi = new MemberApi();

      memberapi.mykecheng({usestatus:this.Base.getMyData().type},(list)=>{
        this.Base.setMyData({
          list
        })
      })
    }
    tocourse(e){
      var id = e.currentTarget.id;
      wx.navigateTo({
        url: '/pages/courseinfo/courseinfo?id='+id,
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
  body.tocourse = content.tocourse;
  body.switchnav = content.switchnav;
  Page(body)