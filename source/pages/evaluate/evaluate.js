// pages/evaluate/evaluate.js
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
    var mallapi = new MallApi();
    mallapi.orderinfo({
      id: this.Base.options.order_id
    }, (info) => {
      for (var i = 0; i < info.order_item.length; i++) {
        info.order_item[i].score = 0;
        info.order_item[i].content = "";
        info.order_item[i].evaluateimg = [];
      }
      this.Base.setMyData({
        // info: info,
        list: info.order_item,
        images: []
      })
    })

  }
  onMyShow() {
    var that = this;
  }
  touch_star(e) {
    var star_index = e.currentTarget.id;
    var goods_index = e.currentTarget.dataset.goodsindex;
    var list = this.Base.getMyData().list;
    list[goods_index].score = star_index;
    this.Base.setMyData({
      list
    })
  }
  bindinput(e) {
    var list = this.Base.getMyData().list;
    var goods_index = e.currentTarget.dataset.goodsindex;
    var value = e.detail.value;
    list[goods_index].content = value;
    console.log(goods_index, '---', value, '---');
    this.Base.setMyData({
      list
    })
  }

  jguploadimg(e) {
    var that = this;
    var list = this.Base.getMyData().list;
    var goods_index = e.currentTarget.dataset.goodsindex;
    this.Base.uploadImage("evaluate", (ret) => {
      // var images = that.Base.getMyData().images;
      list[goods_index].evaluateimg.push(ret);
      // list[goods_index].evaluateimg = images;
      that.Base.setMyData({
        list
      });
    }, 9, undefined);
  }

  jgminusImg(e) {
    var that = this;
    var seq = e.currentTarget.id;
    // var images = that.Base.getMyData().images;
    var list = this.Base.getMyData().list;
    var goods_index = e.currentTarget.dataset.goodsindex;

    var imgs = [];

    for (var i = 0; i < list[goods_index].evaluateimg.length; i++) {
      if (seq != i) {
        imgs.push(list[goods_index].evaluateimg[i]);
      }
    }
    list[goods_index].evaluateimg = imgs;
    that.Base.setMyData({
      list: list
    });

  }

  submit() {
    wx.showLoading({
      title: '正在提交',
    })
    var datajson = [];
    var list = this.Base.getMyData().list;
    var mallapi = new MallApi();
 
    for (var i = 0; i < list.length; i++) {
      datajson.push({
        member_id:this.Base.getMyData().memberinfo.id,
        order_id:this.Base.options.order_id,
        goods_id:list[i].goods_id,
        content:list[i].content,
        imgitem:list[i].evaluateimg,
        score:list[i].score,
        status:'A'
       })
    }

    datajson=JSON.stringify(datajson);

    mallapi.submitevaluate({
      datajson:datajson
    }, (ret) => {
     console.log(ret);
     if (ret.code==0) {
      wx.hideLoading({
        success: (res) => {
          wx.navigateBack({
            delta: 0,
          })
        },
      })
      // mallapi.cancelorder({
      //   status:'E',id:this.Base.options.order_id
      // }, (back) => { 
      // })

     }
  

    })


  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.touch_star = content.touch_star;

body.bindinput = content.bindinput;

body.jguploadimg = content.jguploadimg;
body.jgminusImg = content.jgminusImg;


body.submit = content.submit;

Page(body)