// pages/myrenew/myrenew.js
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

    this.Base.setMyData({
      choose: 'F',
      renew_status: 'A,B'
    })
    wx.setNavigationBarTitle({
      title: "我的回收单"
    })
  }
  onMyShow() {
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    this.list();
  }
  bindchoose(e) {
    wx.showLoading({
      title: '正在加载',
    })
    this.Base.setMyData({
      choose: e.currentTarget.id,
      renew_status: e.currentTarget.id
    })
    this.list();
  }

  list() {
    var mallapi = new MallApi();
    var renew_status = this.Base.getMyData().renew_status;

    if (renew_status == 'F') {
      renew_status = 'A,B'
    }
    mallapi.myrenew({
      renew_status: renew_status
    }, (list) => {
      this.Base.setMyData({
        list
      })
      wx.hideLoading({ 
      })
    })
  }

  bindcancel(e) {
    var that =this;
    var mallapi = new MallApi();

    var id = e.currentTarget.id;
   
      wx.showModal({
        content: '确认取消申请',
        success: (res) => {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {

            mallapi.cancelrenew({
              status: 'C',
              id: id
            }, (ret) => {
              that.list();
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
body.bindchoose = content.bindchoose;
body.list = content.list;
body.bindcancel = content.bindcancel;

Page(body)