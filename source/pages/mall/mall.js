// pages/mall/mall.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MallApi } from "../../apis/mall.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    
  }
  onMyShow() {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this;
    var mallapi = new MallApi(); 
    mallapi.mallimglist({}, (mallimglist) => {
      this.Base.setMyData({ mallimglist });
    }); 

    mallapi.classification({}, (classification) => {
 
    var arr=[];
    for(var i=0;i<classification.length;i+=10){
      arr.push({
        list:classification.slice(i,i+10)
      })
    }

      this.Base.setMyData({ classification,arr });
    }); 

    mallapi.goodslist({}, (goodslist) => {
      // for(var i=0;i<goodslist.length;i++){
      //   if (Number(goodslist[i].price) >= 10000) {
      //     goodslist[i].price = Math.round(Number(goodslist[i].price) / 1000) / 10 + 'w'
      // }
 
      // }
      this.Base.setMyData({ goodslist });
    }); 


    wx.hideLoading({ 
    })

  }
  clickAdv(e){
    console.log(e);
    var url=e.currentTarget.dataset.url;
    if(url!=""){
      wx.navigateTo({
        url:url
      });
    }
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.clickAdv=content.clickAdv;
Page(body)