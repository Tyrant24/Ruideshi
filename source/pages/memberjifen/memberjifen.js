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
      title: '积分',
    })
    var date = new Date();
    var nowyear = date.getFullYear();
    var nowmonth = date.getMonth()+1;
    var choseriqi = nowyear+'年'+nowmonth+'月';
    this.Base.setMyData({
      choseriqi,
      shijian_from:'',
      shijian_to:'',
      isguize:false
    })
  }
  onMyShow() {
    var that = this;
    var data = this.Base.getMyData();

    var memberapi = new MemberApi();
    memberapi.memberjifen({
      shijian_from:data.shijian_from,
      shijian_to:data.shijian_to,
    },(list)=>{
      if(list.length>0){
        for(let item of list){
          item.riqi = item.shijian_formatting.split(" ")[0].substring(5,item.shijian_formatting.split(" ")[0].length);
          item.riqitime = item.shijian_formatting.split(" ")[1];
        }
      }
     
      this.Base.setMyData({
        list
      })
    })
  }
  bindchange(e){
    console.log(e);
    var riqi = e.detail.value;
    var month = riqi.split("-")[1];
    var year = riqi.split("-")[0];
    var lastday = new Date(year, month+1, 0).getDate();
    var shijian_from = riqi+"-01";
    var shijian_to = riqi+"-"+lastday;
    var choseriqi = year+'年'+month+'月';
    this.Base.setMyData({
      choseriqi,
      shijian_from,
      shijian_to
    })
    this.onMyShow();
  }
  showguize(){
    var isguize = this.Base.getMyData().isguize;
    isguize = isguize?false:true;
    this.Base.setMyData({
      isguize
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.bindchange = content.bindchange;
body.showguize = content.showguize;
Page(body)