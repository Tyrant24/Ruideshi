// pages/cookbookinfo/cookbookinfo.js
  
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  MallApi
} from "../../apis/mall.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    // wx.setNavigationBarTitle({
    //   title: "商品详情"
    // })
  }
  onMyShow() {
    var that = this;
    var mallapi = new MallApi();
    mallapi.cookbookinfo({
      id:this.Base.options.id
    },(info)=>{
     this.Base.setMyData({
       info
     })
    })
  }
  bindsend(e){
    console.log(e);
    var mallapi = new MallApi();
    mallapi.comment({
      cookbookinfo_id:this.Base.options.id,
      content:e.detail.value
    },(ret)=>{
       if(ret.code==0){
         this.onMyShow();
       }
    })
  }
  binddz(e){
   
    var mallapi = new MallApi();
    mallapi.cookbookdz({
      cookbookinfo_id:this.Base.options.id,
      status:'A'
    },(ret)=>{
      if(ret.code==0){ 
        this.onMyShow();
      }
    })
  }
  bindsc(e){
   
    var mallapi = new MallApi();
    mallapi.cookbooksc({
      cookbookinfo_id:this.Base.options.id,
      status:'A'
    },(ret)=>{
      if(ret.code==0){ 
        this.onMyShow();
      }
    })
  }
  bindcommentdz(e){
   
    var mallapi = new MallApi();
    mallapi.commentdz({
      comment_id:e.currentTarget.id,
      status:'A'
    },(ret)=>{
      if(ret.code==0){ 
        this.onMyShow();
      }
    })
  }

  

  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindsend = content.bindsend;
body.binddz = content.binddz;
body.bindsc = content.bindsc;
body.bindcommentdz = content.bindcommentdz;

Page(body)