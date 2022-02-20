// pages/logistics/logistics.js
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
    // options.logistics_number='611270890387086';
    var mallapi = new MallApi();
    mallapi.logistics({
      nu:this.Base.options.nu
    },(ret)=>{
      console.log(ret,'没东西？');
      // var result=JSON.parse(ret).result;
      if(ret!=null&&ret.showapi_res_code==0){
        this.Base.setMyData({
          list:ret.showapi_res_body.data,
          expTextName:ret.showapi_res_body.expTextName,
          mailNo:ret.showapi_res_body.mailNo,
          tel:ret.showapi_res_body.tel,
          logo:ret.showapi_res_body.logo, 
        })
      }else{
        this.Base.setMyData({
          list:[],
          expTextName:'',
          mailNo:'',
          tel:'',
          logo:'', 
        })
      }
     

    })
  
  }
  onMyShow() {
    var that = this;

  }

  copy(e){
     var text=e.currentTarget.id;
  
    wx.setClipboardData({ 
      data: text,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
 
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.copy = content.copy;


Page(body)