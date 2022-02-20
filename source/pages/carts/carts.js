// pages/carts/carts.js
// pages/mall/mall.js
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
      title: "购物车"
    })
    wx.showLoading({
      title: '正在加载',
    })
    this.cartslist();

  }
  onMyShow() {
    var that = this;
 
  }

  cartslist(){
    this.Base.setMyData({
      edit: false,
      choosenumber: 0,
      all: false,
      amount: 0
    })

    var mallapi = new MallApi(); 
    mallapi.cartslist({member_id:this.Base.options.member_id}, (list) => {


      for (var i = 0; i < list.length; i++) {
        list[i].choose = false;

 
        // mallapi.selectprice({
        //   chooseid: list[i].specifications
        // }, (ret) => { 
        //     // specificationsinfo: ret.return, 
        //     console.log(ret.return.price,'返回值')

        //     if(ret.return.price !=undefined &&ret.return.price !=""){
        //       console.log("为什么走这里面？")
        //       list[i].unitprice=ret.return.price;
        //     }
           
        //     //  console.log(ret.return.price ,'返回值',ret.return,ret);
        // })
 
      }

      this.Base.setMyData({
        list
      });
      wx.hideLoading({ 
      })
    });
  }

  // 编辑列表开关
  bindedit(e) {
    var edit = this.Base.getMyData().edit;
    this.Base.setMyData({
      edit: !edit
    })
  }

  //选中商品
  choose_goods(e) {
    console.log("点击区域");
    var list = this.Base.getMyData().list;
    var index = e.currentTarget.dataset.index;
    list[index].choose = !list[index].choose;

    if (this.select_choosenum(list) == true) {
      var all = true;
    } else {
      var all = false;
    }

    this.Base.setMyData({
      list,
      all
    })
  }

  // 数量减
  bindsubtract(e) {
    var list = this.Base.getMyData().list;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.id;
    var count = e.currentTarget.dataset.count;
    var goods_id = e.currentTarget.dataset.goods_id;
    if (count <= 1) {
      this.Base.toast("宝贝数量不能再减少了");
      return;
    }

    var mallapi = new MallApi();
    mallapi.cartsnumber({
      type: 'B',
      id: id,
      goods_id: goods_id
    }, (ret) => {
      if (ret.code == 0) {

        list[index].count--

        if (this.select_choosenum(list) == true) {
          var all = true;
        } else {
          var all = false;
        }
        this.Base.setMyData({
          list,
          all
        })

      }
    });

    // this.Base.setMyData({
    //   list
    // })
  }

  // 数量加
  bindadd(e) {
    var mallapi = new MallApi();
    var goods_id = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;

    var specifications_name = e.currentTarget.dataset.specifications_name;
    var specifications = e.currentTarget.dataset.specifications;
    var unitprice = e.currentTarget.dataset.unitprice;
    var coverimg = e.currentTarget.dataset.coverimg;

    var list=this.Base.getMyData().list;
 
    // return;
    mallapi.cartsnumber({
      type: 'A',
      goods_id: goods_id,
       specifications_name:specifications_name,
        specifications:specifications,
        unitprice:unitprice,
        coverimg:coverimg
    }, (ret) => {

        list[index].count++

        if (this.select_choosenum(list) == true) {
          var all = true;
        } else {
          var all = false;
        }
        this.Base.setMyData({
          list,
          all
        })
 



    });
  }

  //全选
  choose_all(e) {
    var list = this.Base.getMyData().list;
    if(list.length==0){
      return;
    }
    for (var i = 0; i < list.length; i++) {
      if (this.Base.getMyData().all) {
        list[i].choose = false;
      } else {
        list[i].choose = true;
      }

    }
    if (this.select_choosenum(list) == true) {
      var all = true;
    } else {
      var all = false;
    }
    this.Base.setMyData({
      list,
      all
    })

  }

  // 检查选中的商品数量是否为全部,计算选中数量,计算选中价格总额
  select_choosenum(list) {
    var choosenumber = 0;
    var amount = 0;
    for (var i = 0; i < list.length; i++) {
      if (list[i].choose) {
        choosenumber++;
        amount += parseFloat(list[i].unitprice) * parseInt(list[i].count);
      }
    }
    amount=amount.toFixed(2);
    if (choosenumber == list.length) {
      this.Base.setMyData({
        choosenumber,
        amount
      })
      return true
    } else {
      this.Base.setMyData({
        choosenumber,
        amount
      })
      return false
    }
  }


  bindbalance(e){
    var list=this.Base.getMyData().list;
    if(list.length==0){
      return;
    }
    
    var cartslist=[];
    for(var i=0;i<list.length;i++){
      if (list[i].choose==true) {
          cartslist.push(list[i]);
      }
    }
   
    cartslist=JSON.stringify(cartslist);
    console.log(cartslist);
    // JSON.parse(jsonstr);
    
    wx.navigateTo({
      url: '/pages/confirmorder/confirmorder?cartslist='+cartslist+'&amount='+this.Base.getMyData().amount,
    })
  }

  binddelete(e){
    var list=this.Base.getMyData().list;
    var idlist="";
    var mallapi = new MallApi(); 
    for(var i=0;i<list.length;i++){
      if (list[i].choose==true) {
        idlist+='"'+list[i].specifications+'"'+','
      }
    }
    idlist=idlist.slice(0,-1);
   console.log(idlist,'多少');
  //  return;
    mallapi.deletecarts({idlist:idlist}, (ret) => {
    
      this.cartslist();
      console.log(ret);
    })

  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.choose_goods = content.choose_goods;
body.choose_all = content.choose_all;

body.bindsubtract = content.bindsubtract;
body.bindadd = content.bindadd;
body.bindedit = content.bindedit;

body.select_choosenum = content.select_choosenum;
body.bindbalance = content.bindbalance;

body.binddelete = content.binddelete;
body.cartslist = content.cartslist;

Page(body)