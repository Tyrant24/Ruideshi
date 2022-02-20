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
  AppApi
} from "../../apis/app.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.needauth = false;
    this.Base.setMyData({authcode:options.authcode});
  }
  onMyShow() {
    var that = this;
  }
  checkPermission() {
    
  }

  getUserInfo(e) {
    console.log(666666666);
    wx.switchTab({
      url: '/pages/home/home',
    });
    //open-type="getUserInfo" bindgetuserinfo="getUserInfo"
  }
  authconfirm(){
    var authcode=this.Base.getMyData().authcode;
    var appapi=new AppApi();
    appapi.authconfirm({authcode},(ret)=>{
      wx.showToast({
        title: '授权成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(()=>{
        wx.reLaunch({
          url: '/pages/mall/mall',
        })
      },2000);
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.getUserInfo = content.getUserInfo;
body.authconfirm = content.authconfirm;
Page(body)