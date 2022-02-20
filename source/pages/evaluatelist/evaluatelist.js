// pages/evaluatelist/evaluatelist.js
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
    wx.setNavigationBarTitle({
      title: "商品评价"
    })
  }
  onMyShow() {
    var that = this;
    
    wx.showLoading({
      title: '正在加载',
    })
    var mallapi = new MallApi();
    mallapi.goodsinfo({
      id: this.Base.options.goods_id
    }, (info) => {
    
      this.Base.setMyData({
        evaluatelist:info.evaluatelist
      });
      wx.hideLoading({ 
      })
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)