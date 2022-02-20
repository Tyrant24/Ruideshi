// pages/dakaedit/dakaedit.js
  
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

    // var myDate = new Date();
    // var year =myDate.getFullYear();
    // var date = myDate.toLocaleDateString().replace(/-/g, '/') ; 
    this.Base.setMyData({
      dakatypelist:[{
        name:'课程',
        type:'A'
      },{
        name:'活动',
        type:'B'
      }],
      typename:'课程',
      type:'A',
      date:'2021-01-01',
      name:"",
      time:'00:00',
      date2:'2021-01-01',
      time2:'00:00',
      jifen:""
    })
  
    // wx.setNavigationBarTitle({
    //   title: "商品详情"
    // })
  }
  onMyShow() {
    var that = this;
    var mallapi = new MallApi();
    
  }
  bindclear(e){
    console.log("走没走");
    this.Base.setMyData({
      name:''
    })
  }
  bindname(e){
    this.Base.setMyData({
      name:e.detail.value
    })
  }
  bindjifen(e){
    this.Base.setMyData({
      jifen:e.detail.value
    })
  }
  
  binddakatype(e){
    var dakatypelist=this.Base.getMyData().dakatypelist;
    console.log(e);
    this.Base.setMyData({
      typename:dakatypelist[e.detail.value].name,
      type:dakatypelist[e.detail.value].type,
    })
  }

  bindDateChange(e) { 
    this.setData({
      date: e.detail.value
    })
  }
  bindTimeChange(e) { 
    this.setData({
      time: e.detail.value
    })
  }

  bindDateChange2(e) { 
    this.setData({
      date2: e.detail.value
    })
  }
  bindTimeChange2(e) { 
    this.setData({
      time2: e.detail.value
    })
  }

  submit(e){
    var mallapi=new MallApi();
    var data=this.Base.getMyData();
    var type=data.type;
    var name= data.name;
    var jifen= data.jifen;
    var start_time=data.date+" "+data.time; 
    var end_time=data.date2+" "+data.time2;
    console.log(start_time,end_time);

    if(name==''){
         this.Base.toast("请填写打卡名称");
         return;
    }if(jifen==""||jifen==0){
      this.Base.toast("请输入至少为1的积分额度");
      return;
    }
    // return;
    mallapi.creatdaka({
      type:type,
      name:name,
      jifen:jifen,
      status:'A',
      start_time:start_time,
      end_time:end_time
    },(ret)=>{
       if(ret.code==0){
         wx.reLaunch({
           url: '/pages/dakajifeninfo/dakajifeninfo?id='+ret.return,
         })
       }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.binddakatype = content.binddakatype;
body.bindclear = content.bindclear;
body.bindname = content.bindname;
body.bindjifen = content.bindjifen;

body.bindDateChange = content.bindDateChange;
body.bindTimeChange = content.bindTimeChange;
body.bindDateChange2 = content.bindDateChange2;
body.bindTimeChange2 = content.bindTimeChange2;
body.submit = content.submit;


Page(body)