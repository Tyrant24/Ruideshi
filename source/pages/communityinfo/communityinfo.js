// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CommunityApi } from "../../apis/community.api.js";
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
      title: ''
    })
    this.Base.setMyData({
      StatusBar: getApp().globalData.StatusBar,
      CustomBar: getApp().globalData.CustomBar,
      Custom: getApp().globalData.Custom,
      plvalue:'说点什么',
      contents:'',
      showinput:false,
      pinglun_id:0,
      currentIdx:0,
      isshowscj:false,
      xzscj:false,
      xjscj:false,
      scjname:'',
      scjimg:'',
      shoucang_id:0,
      scjsuccess:false,
      scjsuccess_name:'',
      totype:this.Base.options.type
    });
  }
  onMyShow() {
    var that = this;
    var communityapi = new CommunityApi();
    communityapi.info({id:this.Base.options.id},(info)=>{
      info.summary = ApiUtil.HtmlDecode(info.summary);
      WxParse.wxParse('content', 'html', info.summary, that, 10);
      this.Base.setMyData({
        info
      })
    })
    communityapi.pinglunlist({community_id:this.Base.options.id},(list)=>{
     
      this.Base.setMyData({
        list
      })
    })
    communityapi.myshoucangjia({},(myshoucangjia)=>{
     
      this.Base.setMyData({
        myshoucangjia
      })
    })
  }
  bindchange(e){
    var currentIdx = e.detail.current;
    this.Base.setMyData({
      currentIdx
    })
  }
  bindmember(e){
    var memberlevel_mark = this.Base.getMyData().memberinfo.memberlevel_mark;
    if(memberlevel_mark=='silvergray'){
      this.Base.toast(this.Base.getMyData().memberinfo.memberlevel_pinglun);
      return
    }
    console.log(e)
    var item = e.currentTarget.dataset.item;

    if(child!=null){
      var child = e.currentTarget.dataset.child;
      var hf_member_id = child.member_id;
    }else{
      var hf_member_id = item.member_id;
    }
    
    var plvalue = '@'+item.member_nickName;
    // var hf_member_id = item.member_id;
   
    var hfresponse_id = 0 ;
    // console.log(child,child.member_id,'被回复人的ID')
    if(child!=null&&child!=undefined){
      plvalue='@'+child.member_nickName;
      hf_member_id = child.member_id;
      hfresponse_id=child.id;
    }
    // return;
    var pinglun_id = item.id;
    
    this.Base.setMyData({
      plvalue,
      showinput:true,
      pinglun_id:pinglun_id,
      hf_member_id:hf_member_id,
      hfresponse_id:hfresponse_id
    })
  }
  bindmember2(e){
    var memberlevel_mark = this.Base.getMyData().memberinfo.memberlevel_mark;
    if(memberlevel_mark=='silvergray'){
      this.Base.toast(this.Base.getMyData().memberinfo.memberlevel_pinglun);
      return
    }
    var pinglun_id = 0;
    this.Base.setMyData({
      showinput:true,
      pinglun_id:pinglun_id
    })
  }
  bindconfirm(e){
    var memberlevel_mark = this.Base.getMyData().memberinfo.memberlevel_mark;
    if(memberlevel_mark=='silvergray'){
      this.Base.toast(this.Base.getMyData().memberinfo.memberlevel_pinglun);
      return
    }
    console.log(e);
    var content = e.detail.value;
    if(content==''){
      this.Base.toast('请说点什么呀~');
      return
    }
    var info = this.Base.getMyData().info;
    var pinglun_id = this.Base.getMyData().pinglun_id;
    var hf_member_id = this.Base.getMyData().hf_member_id;
    var hfresponse_id = this.Base.getMyData().hfresponse_id;
    var communityapi = new CommunityApi();
    if(pinglun_id==0){
      communityapi.addpinglun({
        content:content,
        community_id:info.id,
      
      },(ret)=>{
        if(ret.code=='0'){
          this.onMyShow();
          this.Base.setMyData({
              contents:'',
              pinglun_id:0,
              plvalue:'',
              showinput:false
          })
        }else {
          this.Base.toast(ret.result);
         
        }
      })
    }else {
      communityapi.addpinglun2({
        content:content,
        community_id:info.id,
        pinglun_id:pinglun_id,
        hf_member_id:hf_member_id,
        hfresponse_id:hfresponse_id
      },(ret)=>{
        if(ret.code=='0'){
          this.onMyShow();
          this.Base.setMyData({
              contents:'',
              pinglun_id:0,
              plvalue:'',
              showinput:false
          })
        }else {
          this.Base.toast(ret.result);
         
        }
      })
    }
   
  }
  pldianzan(e){
    var id = e.currentTarget.id;
    var communityapi = new CommunityApi();
    communityapi.addpinglundz({
      pinglun_id:id
    },(ret)=>{
      this.onMyShow();
    })
  }
  cpdianzan(){
    var id = this.Base.getMyData().info.id
    var communityapi = new CommunityApi();
    communityapi.addcommunitydz({
      community_id:id
    },(ret)=>{
      this.onMyShow();
    })
  }
  shoucang(){
    var id = this.Base.getMyData().info.id
    var communityapi = new CommunityApi();
    communityapi.addcommunitysc({
      community_id:id
    },(ret)=>{
      if(ret.code>=0){
        var id = 0;
        var isshowscj = false;
        if(ret.code==0){
           isshowscj = true;
           id=ret.return;
        }
        this.Base.setMyData({
          isshowscj:isshowscj,
          shoucang_id:id
        })
        setTimeout(() => {
            this.Base.setMyData({
              isshowscj:false
            })
        }, 5000);
        this.onMyShow();
      }
      
    })
  }
  addscj(){
    this.Base.setMyData({
      xzscj:true
    })
  }
  chosexjcsj(){
    this.Base.setMyData({
      xjscj:true
    })
  }
  qxscj(){
    this.Base.setMyData({
      xjscj:false,
      xzscj:false
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
  scjnameFn(e){
    this.Base.setMyData({
      scjname:e.detail.value
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
  jiaruscj(e){
    var item = e.currentTarget.dataset.item;
    var id = item.id;
    var name = item.name;
    var shoucang_id = this.Base.getMyData().shoucang_id;
    var communityapi = new CommunityApi();
    communityapi.addscj({
      id:shoucang_id,
      menushoucang_id:id
    },(ret)=>{
      this.Base.setMyData({
        xjscj:false,
        xzscj:false,
        isshowscj:false,
        scjsuccess:true,
        shoucang_id:0,
        scjsuccess_name:name
      })
      setTimeout(() => {
        this.Base.setMyData({
          scjsuccess:false,
          scjsuccess_name:''
        })
      }, 5000);
    })
  }
  deleteword(){
    var info = this.Base.getMyData().info;
    var communityapi = new CommunityApi();
    var that = this;
   
    wx.showModal({
      title:'',
      content:'确定删除这条作品吗？',
      cancelColor: '#999999',
      confirmColor:'#FF6900',
      confirmText:'删除',
      success:(ret)=>{
        console.log(ret)
        communityapi.deleteword({id:info.id},()=>{
          wx.showModal({
            title:'',
            content:'删除成功',
            confirmColor:'#FF6900',
            confirmText:'确定',
            showCancel:false,
            success:(ret)=>{
              wx.navigateBack({
                delta: 0,
              })
            }
          })
        })
      } 
    })
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.pinglun = content.pinglun; 
body.bindmember = content.bindmember; 
body.bindmember2 = content.bindmember2; 
body.bindconfirm = content.bindconfirm; 
body.pldianzan = content.pldianzan; 
body.cpdianzan = content.cpdianzan; 
body.shoucang = content.shoucang; 
body.bindchange = content.bindchange; 
body.addscj = content.addscj; 
body.chosexjcsj = content.chosexjcsj; 
body.quedingscj = content.quedingscj; 
body.qxscj = content.qxscj; 
body.uploadimg = content.uploadimg; 
body.scjnameFn = content.scjnameFn; 
body.jiaruscj = content.jiaruscj; 
body.deleteword = content.deleteword; 
Page(body)

