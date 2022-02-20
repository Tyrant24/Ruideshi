// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CommunityApi } from "../../apis/community.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '发作品',
    })
    this.Base.setMyData({
      namelen:20,
      images:[],
      info:{
        name:'',
        summary:'',
        huati:[],
        huati_name:'',
        images:''
      },
      htarr:[],
      showocc:false,
    })
  }
  onMyShow() {
    var that = this;
    var info = this.Base.getMyData().info;
    var communityapi = new CommunityApi();
    communityapi.huati({},(huati)=>{
      if(this.Base.options.id!=undefined){
        for(let item of huati){
          if(item.id == this.Base.options.id){
            info.huati.push(item);
          }
        }
      }
      this.Base.setMyData({
        huati,info
      })
    })
  }
  bindchange(e){
    var info = this.Base.getMyData().info;
    var huati = this.Base.getMyData().huati;
    info.huati = huati[e.detail.value].id;
    info.huati_name = huati[e.detail.value].name;
    this.Base.setMyData({
      info
    })
  }
  nameFn(e){
    var info = this.Base.getMyData().info;
    info.name = e.detail.value;
    this.Base.setMyData({
      info
    })
  }
  summaryFn(e){
    var info = this.Base.getMyData().info;
    info.summary = e.detail.value;
    this.Base.setMyData({
      info
    })
  }
  uploadimg(e){
    var idx = e.currentTarget.id;
    var images = this.Base.getMyData().images;
    this.Base.uploadImage("community", (ret) => {
      if(idx==-1){
        images.push({
          img:ret
        })
      }else {
        images[idx].img = ret;
      }
      this.Base.setMyData({
        images
      })
    })
  }
  shanchu(e){
    var idx = e.currentTarget.id;
    var images = this.Base.getMyData().images;
    images.splice(idx,1);
    this.Base.setMyData({
      images
    })
  }
  fabu(){
    var info = this.Base.getMyData().info;
    var images = this.Base.getMyData().images;
    var namelen = this.Base.getMyData().namelen;
    console.log(info)
    if(Number(info.name.length)>Number(namelen)){
      this.Base.toast('作品名称最多可写'+namelen+'字');
      return
    }
    if(info.name==''){
      this.Base.toast('请输入作品名称');
      return
    }
    if(info.summary==''){
      this.Base.toast('请输入作品内容');
      return
    }
    if(images.length==0){
      this.Base.toast('请上传作品图片');
      return
    }
    if(info.huati.length==0){
      this.Base.toast('请选择话题');
      return
    }
    var arr = [];
    for(let item of info.huati){
      arr.push(item.id);
    }
    info.huati = arr.join(',');
    info.summary = info.summary.split("\n").join("<br/>");

    info.images = JSON.stringify(images);
    var communityapi = new CommunityApi();
    communityapi.add(info,(ret)=>{
      if(ret.code=='0'){
        wx.showModal({
          title: '提示',
          content: "已发布作品，正在审核中~",
          showCancel: false,
          success(ret){
            wx.navigateBack({
              delta: 0,
            })
          }
        })
      }else {
        this.Base.toast(ret.result);
      }
    })
  }
  bindshowocc(){
    var showocc = this.Base.getMyData().showocc;
    showocc = showocc ?false:true;
    this.Base.setMyData({
      showocc
    })
    var info = this.Base.getMyData().info;
    var huati = this.Base.getMyData().huati;
    for(let item of huati){
      item.check=0;
      for(let json of info.huati){
        if(item.id == json.id){
          item.check=1;
        }
      }
    }
    this.Base.setMyData({
      huati
    })
  }
  choseocc(e){
    var idx = e.currentTarget.id;
    var huati = this.Base.getMyData().huati;
    huati[idx].check = huati[idx].check?false:true;
    this.Base.setMyData({
      huati
    })
  }
  saveocc(){
    var huati = this.Base.getMyData().huati;
    var info = this.Base.getMyData().info;
    var arr = [];
    for(let item of huati){
      if(item.check){
        arr.push(item);
      }
    }
    info.huati = arr;
    this.Base.setMyData({
      info,
      showocc:false,
    })
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.summaryFn = content.summaryFn; 
body.nameFn = content.nameFn; 
body.bindchange = content.bindchange; 
body.fabu = content.fabu; 
body.uploadimg = content.uploadimg; 
body.shanchu = content.shanchu; 
body.bindshowocc = content.bindshowocc; 
body.choseocc = content.choseocc; 
body.saveocc = content.saveocc; 
Page(body)

