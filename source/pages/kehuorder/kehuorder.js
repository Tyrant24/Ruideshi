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
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '客户订单',
    })
    this.Base.setMyData({
      order_status:'B'
    })
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();
    var order_status = this.Base.getMyData().order_status;
    memberapi.kehuorder({order_status:order_status},(list)=>{
      this.Base.setMyData({
        list
      })
    })
  }
  switchnav(e){
    var type = e.currentTarget.id;
    this.Base.setMyData({
      order_status:type
    })
    this.onMyShow();
  }
  toorder(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/orderinfo/orderinfo?id='+id,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.switchnav = content.switchnav;
body.toorder = content.toorder;
Page(body)