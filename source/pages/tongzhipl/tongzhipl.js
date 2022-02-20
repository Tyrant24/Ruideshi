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
import {
  CommunityApi
} from "../../apis/community.api.js";
import {
  ApiUtil
} from "../../apis/apiutil.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '评论',
    })
    this.Base.setMyData({
      showinput:false,
      choseitem:null
    })
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();
    memberapi.infopl({},(list)=>{
      if(list.length>0){
        for(let item of list){
          item.shijian = ApiUtil.Timeshow(item.shijian);
        }
      }
      
      this.Base.setMyData({
        list
      })
    })
  }
  bindconfirm(e){
    

    var content = e.detail.value;
    if(content==''){
      this.Base.toast('请说点什么呀~');
      return
    }
    var choseitem = this.Base.getMyData().choseitem;
    var pinglun_id = choseitem.pinglun_id;
    var hf_member_id = choseitem.member_id;
    var hfresponse_id = choseitem.hfresponse_id;
    var communityapi = new CommunityApi();
  
      communityapi.addpinglun2({
        content:content,
        community_id:choseitem.community_id,
        pinglun_id:pinglun_id,
        hf_member_id:hf_member_id,
        hfresponse_id:hfresponse_id,
        hf:'A'
      },(ret)=>{
        if(ret.code=='0'){
          this.onMyShow();
          this.Base.setMyData({
              showinput:false,
              choseitem:null
          })
        }else {
          this.Base.toast(ret.result);
         
        }
      })
    
  }
  huifu(e){
    var item = e.currentTarget.dataset.item;
    console.log(item)
    this.Base.setMyData({
      showinput:true,
      choseitem:item
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.bindconfirm = content.bindconfirm;
body.huifu = content.huifu;
Page(body)