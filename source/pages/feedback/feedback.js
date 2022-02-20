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
      title: '意见反馈',
    })
    this.Base.setMyData({
      contents:'',
      image:[]
    })
    
  }
  onMyShow() {
    var that = this;

  }
  contentsFn(e){
    this.Base.setMyData({
      contents:e.detail.value
    })
  }
  uploadimg(e){
    var idx = e.currentTarget.id;
    var image = this.Base.getMyData().image;
    this.Base.uploadImage("feedback",(ret)=>{
      if(idx>=0){
        image[idx].img = ret;
      }else {
        image.push({
          img:ret
        })
      }
     
      this.Base.setMyData({
        image
      })
    })
  }
  deleteimg(e){
    var idx = e.currentTarget.id;
    var image = this.Base.getMyData().image;
    image.splice(idx,1);
    this.Base.setMyData({
      image
    })
  }
  tijiao(){
    var image = this.Base.getMyData().image;
    var contents = this.Base.getMyData().contents;
    var memberapi = new MemberApi();
    if(contents==''){
      this.Base.toast('请输入您要反馈的问题');
      return
    }
    
    memberapi.addfeedback({
      summary:contents,
      img:JSON.stringify(image)
    },(ret)=>{
      if(ret.code=='0'){
        wx.showModal({
          content:'提交成功！',
          showCancel:false,
          confirmText:'好的',
          success:()=>{
            wx.navigateBack({
              delta: 0,
            })
          }
        })
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.contentsFn = content.contentsFn;
body.uploadimg = content.uploadimg;
body.deleteimg = content.deleteimg;
body.tijiao = content.tijiao;
Page(body)