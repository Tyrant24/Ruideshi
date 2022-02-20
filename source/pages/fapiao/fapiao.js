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
      title: '申请开票',
    })
    this.Base.setMyData({
      name:'增值税电子普通发票',
      taitoutype:'B',
      taitou:'',
      shuihao:'',
      kahuyinhang:'',
      yinhangzhanghao:'',
      qiyedizhi:'',
      qiyedianhua:''
      
    })
    
  }
  onMyShow() {
    var that = this;
    var mallapi = new MallApi();
    mallapi.orderinfo({id:this.Base.options.id},(info)=>{
      this.Base.setMyData({
        info
      })
    })
  }
  chosetype(e){
    var type = e.currentTarget.id;
    this.Base.setMyData({
      taitoutype:type
    })
  }
  formSubmit(e){
    console.log(e);
    var getdate = this.Base.getMyData();
    var data = e.detail.value;
    var name = getdate.name;
    var taitoutype = getdate.taitoutype;
    if(data.taitou=='' || data.taitou=='undefined'){
      this.Base.toast('请填写发票抬头');
      return
    }
    if(taitoutype=='B' && data.shuihao==''){
      this.Base.toast('请填写税号');
      return
    }
    data.name = name;
    data.taitoutype = taitoutype;
    data.order_id = this.Base.options.id;
    data.amount=getdate.info.payment_amount;
    var mallapi = new MallApi();
    mallapi.addfapiao(data,(ret)=>{
      if(ret.code=='0'){
        this.Base.toast('已提交申请');
        wx.navigateBack({
          delta: 0,
        })
      }else {
        this.Base.toast(ret.result);
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.chosetype = content.chosetype;
body.formSubmit = content.formSubmit;
Page(body)