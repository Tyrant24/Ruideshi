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
  CommunityApi
} from "../../apis/community.api.js";
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
      title: '活动详情',
    })
  }
  onMyShow() {
    var that = this;
    var communityApi = new CommunityApi();
    communityApi.activityinfo({id:this.Base.options.id},(info)=>{
      info.content = ApiUtil.HtmlDecode(info.content);
      WxParse.wxParse("content","html",info.content,that,10);
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
      this.Base.toast(memberinfo.memberlevel_activitytip);
      return
    }
    var communityApi = new CommunityApi();
    communityApi.addactivity({
      activity_id:info.id
    },(ret)=>{
      if(ret.code=='0'){
        this.Base.toast('报名成功');
        this.onMyShow();
      }else {
        this.Base.toast(ret.result);
      }
     
    })
  }
  quxiao(){
    var info = this.Base.getMyData().info;
    if(info.isbaoming=='0'){
      return
    }
    var communityapi = new CommunityApi();
    var that = this;
    wx.showModal({
      title:"取消报名",
      content:'是否要取消报名',
      success:(res)=>{
        if(res.confirm){
          communityapi.deleteactivity({id:info.isbaoming},(ret)=>{
            this.Base.toast('已取消报名');
            wx.navigateBack({
              delta: 0,
            })
          })
        }
      }
    })
   
    
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.baoming = content.baoming;
body.quxiao = content.quxiao;
Page(body)