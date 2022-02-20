// pages/topiclist/topiclist.js
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
    wx.setNavigationBarTitle({
      title: "以旧换新"
    })
  }
  onMyShow() {
    var that = this;
    var mallapi = new MallApi();
    mallapi.topiclist({

    },(list)=>{
      for(var i=0;i<list.length;i++){
        list[i].choose_item_id='';
        list[i].choose_item_name='';
        var topic_item=list[i];
        // for(var j=0;j<topic_item.length;j++){
        //   topic_item[j].choose=false; 
        // }
      }
      this.Base.setMyData({
        list
      })
    })
  }

  bindchoose(e){
   var index=e.currentTarget.dataset.index;
   var index2=e.currentTarget.id;
   var topic_item_id=e.currentTarget.dataset.topic_item_id;
   var list=this.Base.getMyData().list;

   console.log(list[index].topic_item[index2].name,'xxxx');

   if(list[index].choose_item_id!=''){ 
    list[index].choose_item_id += ','+topic_item_id;
   }else{ 
    list[index].choose_item_id += topic_item_id;
   }

   if(list[index].choose_item_name!=''){ 
    list[index].choose_item_name += ','+list[index].topic_item[index2].name;
   }else{ 
    list[index].choose_item_name += list[index].topic_item[index2].name;
   }

  //  list[index].choose_item_name += list[index].topic_item[index2].name + ',';

   

  var topic_item=list[index].topic_item;

  if (list[index].choose_type=='A') {
    for(var i=0;i<topic_item.length;i++){
      topic_item[i].choose=false;
    }
  } 
  list[index].topic_item[index2].choose=!list[index].topic_item[index2].choose;
   this.Base.setMyData({list})
  }

  submit(e){
    var mallapi=new MallApi();
    if(!this.selectlist()){
         this.Base.toast("请确认所有选项已选择");
         return;
    }
    wx.showLoading({
      title: '正在提交',
    })
    mallapi.addmyrenew({},(ret)=>{
      
      if(ret.code==0){
        
        var list=this.Base.getMyData().list;
        var datajson= [];
        for(var i=0;i<list.length;i++){
          datajson.push({
            myrenew_id:ret.return,
            topic_id:list[i].id,
            topic_item:list[i].choose_item_id,
            topic_item_name:list[i].choose_item_name,
            status:'A'
          })
        }
        datajson=JSON.stringify(datajson);

        mallapi.addmytopic({datajson:datajson},(ret2)=>{
          console.log(ret2);
          if(ret2.code==0){
            wx.hideLoading({
              success: (res) => {
                wx.navigateBack({
                  delta: 0,
                })
              },
            })
            
          } 
        })

      }

    })


  }

  selectlist(){
    var choose_num=0;
    var list =this.Base.getMyData().list;
    
    for(var i=0;i<list.length;i++){ 
      if(list[i].choose_item_id==''){
        choose_num++
      }
     
     
    }
    console.log(choose_num);
    if(choose_num>0){
       return false;
    }else{
       return true;
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.bindchoose = content.bindchoose;
body.selectlist = content.selectlist;
body.submit = content.submit;


Page(body)