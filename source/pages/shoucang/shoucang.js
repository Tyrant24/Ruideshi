// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { CommunityApi } from "../../apis/community.api.js"; 
import { MallApi } from "../../apis/mall.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '收藏',
    })
    this.Base.setMyData({
      type:'B',
      scjimg:'',
      scjname:'',
      xjscj:false
    })
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();
    var mallapi = new MallApi();

    mallapi.mycookbooksc({
      
    },(list)=>{
     this.Base.setMyData({
      mycookbooksc:list
     })
    })

    memberapi.shoucanglist({},(list)=>{
      this.Base.setMyData({
        list
      })
    })
    var communityapi = new CommunityApi();
    communityapi.myshoucangjia({},(myshoucangjia)=>{
      this.Base.setMyData({
        myshoucangjia
      })
    })
  }
  swtichnav(e){
    var id = e.currentTarget.id;
    this.Base.setMyData({
      type:id
    })
  }
  qxscj(){
    var xjscj = this.Base.getMyData().xjscj;
    xjscj=xjscj?false:true;
    this.Base.setMyData({
      xjscj,
      scjimg:'',
      scjname:''
    })
  }
  todetail(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/communityinfo/communityinfo?id='+id,
    })
  }
  toshoucangjia(e){
    var id = e.currentTarget.id;
    var item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/shoucangjia/shoucangjia?id='+id+'&typename='+item.name,
    })
  }
  scjnameFn(e){
    this.Base.setMyData({
      scjname:e.detail.value
    })
  }
  uploadimg(){
    var that = this;
    this.Base.uploadImage("menushoucang",(ret)=>{
      this.Base.setMyData({
        scjimg:ret
      })
    })
  }
  quedingscj(){
    var name = this.Base.getMyData().scjname;
    var img = this.Base.getMyData().scjimg;
    var communityapi = new CommunityApi();
    communityapi.addshoucang({
      name,
      img
    },(ret)=>{
      if(ret.code==0){
        this.Base.setMyData({
          xjscj:false,
          scjimg:'',
          scjname:''
        })
        this.onMyShow()
      }else {
        this.Base.toast(ret.result)
      }
    })
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.todetail = content.todetail; 
body.swtichnav = content.swtichnav; 
body.toshoucangjia = content.toshoucangjia; 
body.quedingscj = content.quedingscj; 
body.uploadimg = content.uploadimg; 
body.scjnameFn = content.scjnameFn; 
body.qxscj = content.qxscj; 
Page(body)

