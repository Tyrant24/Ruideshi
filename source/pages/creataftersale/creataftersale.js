// pages/creataftersale/creataftersale.js
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
    // wx.setNavigationBarTitle({
    //   title: "商品详情"
    // })
    this.Base.setMyData({ 
      overlay: false,
      reason_name:'不想要了',
      reason:'A',
      reason_id:0,
      way_name:'退货退款',
      way:'A',
      way_id:0,
      images:[],
      video:"",
      overlay_type:'',
      reasonlist:[{
        name:'不想要了',
        type:'A'
      },{
        name:'商品规格为拍错',
        type:'B'
      },{
        name:'地址/电话信息填写错误',
        type:'C'
      },{
        name:'商品有问题',
        type:'D'
      },{
        name:'其他',
        type:'E'
      }], 
      waylist:[{
        name:'退货退款',
        type:'A'
      },{
        name:'仅退款',
        type:'B'
      },{
        name:'维修',
        type:'C'
      },{
        name:'更换',
        type:'D'
      }]
    })
    
    var mallapi = new MallApi();
    mallapi.orderiteminfo({id:this.Base.options.id},(info)=>{
      this.Base.setMyData({
        info
      })
    })
  }
  onMyShow() {
    var that = this;
    var mallapi = new MallApi();
  }

  bindguige(e) {
    
    this.Base.setMyData({
      overlay: true,
      overlay_type:e.currentTarget.id
    })
  }

  bindclose(e) {
    this.Base.setMyData({
      overlay: false
    })
  }

  choosereason(e){
     var index=e.currentTarget.id;
     var reasonlist=this.Base.getMyData().reasonlist;
     this.Base.setMyData({
       reason_name:reasonlist[index].name,
       reason:reasonlist[index].type,
       reason_id:index
     })
  }

  chooseway(e){
    var index=e.currentTarget.id;
    var waylist=this.Base.getMyData().waylist;
    console.log("走这里吗")
    this.Base.setMyData({
      way_name:waylist[index].name,
      way:waylist[index].type,
      way_id:index
    })
 }


 uploadimg(e) {
  var that = this;
  this.Base.uploadImage("aftersale", (ret) => {
    var images = that.Base.getMyData().images; 
      images.push(ret);
      that.Base.setMyData({
        images
      }); 
  }, 1, undefined);
}

 minusImg(e) {
  var that = this;
    var seq = e.currentTarget.id;
    var images = that.Base.getMyData().images;
    var imgs = [];

    for (var i = 0; i < images.length; i++) {
      if (seq != i) {
        imgs.push(images[i]);
      }
    }
    that.Base.setMyData({
      images: imgs
    });

 }


 video(e) {
  var that = this;
  this.Base.uploadVideo("aftersale", (ret) => {
    // var video = that.Base.getMyData().video;  
      that.Base.setMyData({
        video:ret
      }); 
  }, undefined);
}

 minusVideo(e) {
   
    this.Base.setMyData({
      video: ""
    });

 }



 bindinput(e){
   this.Base.setMyData({
     state:e.detail.value
   })
 }

 addressinput(e){
  this.Base.setMyData({
    address:e.detail.value
  })
 }

 submit(e){
  var mallapi=new MallApi();
  var order_id=this.Base.options.order_id;
  var order_item_id=this.Base.options.id;
  var way=this.Base.getMyData().way;
  var reason=this.Base.getMyData().reason;
  var state=this.Base.getMyData().state;
  var images=this.Base.getMyData().images;
  // var datajson=JSON.stringify();
  var datajson=[];
  
  var address=this.Base.getMyData().address;
  var video=this.Base.getMyData().video;
  
  mallapi.creataftersale({
    order_id:order_id,way:way,reason:reason,state:state,order_item_id:order_item_id,address:address,video:video
  },(ret)=>{
      if(ret.code==0){
        for(var i=0;i<images.length;i++){
          datajson.push({
            after_sale_id:ret.return,
            img:images[i],
            status:'A'
          })
          // images[i].
        }
        datajson=JSON.stringify(datajson);

        mallapi.addaftersaleimg({datajson:datajson},(ret2)=>{
           
          
          wx.navigateBack({
            delta: 0,
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

body.bindguige = content.bindguige;
body.bindclose = content.bindclose;
body.choosereason = content.choosereason;
body.chooseway = content.chooseway;

body.uploadimg = content.uploadimg;
body.minusImg = content.minusImg;
body.bindinput = content.bindinput;
body.submit = content.submit;
body.addressinput = content.addressinput;
body.video = content.video;
body.minusVideo = content.minusVideo;

Page(body)