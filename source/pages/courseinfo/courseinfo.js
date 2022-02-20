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
import {
  ApiUtil
} from "../../apis/apiutil.js";

var WxParse = require('../../wxParse/wxParse')

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
    });

  }
  onMyShow() {
    var that = this;
    var courseapi = new CourseApi();
    courseapi.info({id:this.Base.options.id},(info)=>{
      info.content = ApiUtil.HtmlDecode(info.content);
      WxParse.wxParse('content', 'html', info.content, that, 10);
      this.Base.setMyData({
        info
      })
    })
   
  }
  baoming(){
    var info = this.Base.getMyData().info;
    if(Number(info.people)<=Number(info.baoming)){
      this.Base.toast('名额已满，请选择其他课程');
      return
    }
    var memberinfo = this.Base.getMyData().memberinfo;
    if(info.sf_status=='A' && (info.iscanyu=='' || info.iscanyu==0 )){
      this.Base.toast(memberinfo.memberlevel_coursetip);
      return
    }
    if(info.sf_status=='C' && Number(memberinfo.jifen)<Number(info.jifen)){
      wx.showModal({
        title:'提示',
        content:'您的积分('+memberinfo.jifen+')不足，请充值',
        confirmText:'去充值',
        cancelText:'取消',
        success:(ret)=>{
          if(ret.confirm){
            wx.navigateTo({
              url: '/pages/member/member',
            })
          }
        }
      })
      return
    }
    var courseapi = new CourseApi();
    courseapi.coursebooking({
      course_id:info.id
    },(ret)=>{
      if(ret.code=='0'){
        this.Base.toast('报名成功');
        this.onMyShow();
      }else {
        this.Base.toast(ret.result);
      }
      
    })
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.baoming = content.baoming;
Page(body)