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
    

  }
  onMyShow() {
    var that = this;
    var courseapi = new CourseApi();
    courseapi.stepinfo({id:this.Base.options.id},(info)=>{
      wx.setNavigationBarTitle({
        title: info.name,
      })
    })
    courseapi.list({coursestep_id:this.Base.options.id},(list)=>{
      this.Base.setMyData({
        list
      })
    })
   
  }
  todetail(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/courseinfo/courseinfo?id='+id,
    })
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.todetail = content.todetail;
Page(body)