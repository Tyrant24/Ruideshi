import Config from "./Config";
import {
    HttpHelper
} from "./HttpHelper";
import wx from "weixin-jsapi";

export class PageHelper {

    static InWechat = false;

    static getUrlKey(name) { //获取url 参数
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [""])[1].replace(/\+/g, '%20')) || null;
    }

    static getCodeApi(appid) { //获取code   
        let urlNow = encodeURIComponent(window.location.href);
        let scope = 'snsapi_base'; //snsapi_userinfo   //静默授权 用户无感知
        //let appid='wx4cc5d5c123123123';
        let state = "123";
        let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;

        window.location.href = url;
    }


    static AppInstance = null;
    static Res = null;
    static Inst = null;
    static Member = null;
    static Init(page, resourcecallback = undefined, membercallback = undefined) {
        page.value.api = Config.ApiUrl;
        page.value.uploadpath = Config.UploadPath;
        page.value.fileupload = Config.FileUploadAPI;
        page.value.domain=window.location.protocol+"//"+window.location.host
        if (PageHelper.Res == null) {
            HttpHelper.Post("inst/resources", {}).then((res) => {
                page.value.Res = res;
                PageHelper.Res = res;
                if (resourcecallback != undefined) {
                    resourcecallback(PageHelper.Res);
                }
            });
        } else {
            page.value.Res = PageHelper.Res;
            if (resourcecallback != undefined) {
                resourcecallback(PageHelper.Res);
            }
        }

        if (PageHelper.Inst == null) {
            HttpHelper.Post("inst/info", {}).then((res) => {
                page.value.Inst = res;
                PageHelper.Inst = res;

                PageHelper.loadwechat(page);

            });
        } else {
            page.value.Inst = PageHelper.Inst;
            PageHelper.loadwechat(page);
        }
        console.log("pageinfo", page);

        page.home = function () {
            page.$router.push({
                path: "/"
            });
        };
        page.contactkefu = function () {
            window.open(page.uploadpath + "inst/" + page.Inst.qrcode)
        }
        page.goBack = function () {
            page.$router.back(-1);
        }
        page.showloginbox = function () {
            PageHelper.AppInstance.ShowLoginBox();
        }

        page.copy = function (str) {

            var _input = document.createElement("input"); // 直接构建input
            _input.value = str; // 设置内容
            document.body.appendChild(_input); // 添加临时实例
            _input.select(); // 选择实例内容
            document.execCommand("Copy"); // 执行复制
            //alert(a);

            document.body.removeChild(_input); // 删除临时实例


        }
        page.getFlowSize = function (size) {
            if (size < 1024) {
                return parseInt(size).toString() + "KB";
            }
            size = size / 1024;

            if (size < 1024) {
                return parseInt(size).toString() + "MB";
            }
            size = size / 1024;
            return parseInt(size).toString() + "GB";
        }
        var token = window.localStorage.getItem("token");
        if (token != null) {
            if (PageHelper.Member == null) {
                
                HttpHelper.Post("member/info", {}).then((Member) => {
                   
                    if(Member==null)
                    {
                        window.localStorage.setItem("token", "");
                    }
                    page.value.Member = Member;
                    PageHelper.Member = Member;
                });
            } else {
                page.value.Member = PageHelper.Member;
                HttpHelper.Post("member/info", {}).then((Member) => {
                    
                    page.value.Member = Member;
                    PageHelper.Member = Member;
                    if (membercallback != undefined) {
                        membercallback(Member);
                    }
                });
            }
        } else {
            page.value.Member = null;
            PageHelper.Member = null;
            if (membercallback != undefined) {
                membercallback(PageHelper.Member);
            }
        }

    }

    static ReloadMember(page, callback) {
        var token = window.localStorage.getItem("token");
        if (token != null) {
            HttpHelper.Post("member/info", {}).then((Member) => {
                page.Member = Member;
                PageHelper.Member = Member;
                callback(Member);
            });
        } else {
            page.Member = null;
            PageHelper.Member = null;
            callback(null);
        }
    }

    static setTitle(title) {
        var iframe = document.createElement('iframe');

        iframe.style.display = 'none';
        // iframe.src = 'blank.html';

        iframe.onload = function () {
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 0);
        };

        document.title = title;
        document.body.appendChild(iframe);
    }

    static LoginAuth() {
        // page.home();
        var token = window.localStorage.getItem("token");
        console.log("试试openid111");
        if (token != null) {
            HttpHelper.Post("member/info", {}).then((Member) => {
                if (Member == null) {
                    // page.home();
                } else {
                    console.log("试试openid");
                    var openid = window.localStorage.getItem("openid");
                    if (openid != null) {
                        HttpHelper.Post("member/updateopenid", {
                            openid: openid
                        });
                    }
                }

            });
        } else {
            // page.home();
        }
    }
    static CheckLoginCallback(callback) {
        var token = window.localStorage.getItem("token");
        if (token != null) {
            HttpHelper.Post("member/info", {}).then((Member) => {
                callback(Member);
            });
        } else {
            callback(null);
        }
    }

    static loadwechatconfig(page) {
        HttpHelper.Post("wechat/gensign", {
            url: location.href.split('#')[0]
        }).then((config) => {

            var json = {
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: PageHelper.Inst.appid, // 必填，公众号的唯一标识
                timestamp: config.timestamp, // 必填，生成签名的时间戳
                nonceStr: config.nonceStr, // 必填，生成签名的随机串
                signature: config.signature, // 必填，签名，见附录1
                jsApiList: ['scanQRCode', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            };
            console.log("wxconfig", config, json);
            wx.config(json);

            wx.ready(function () {
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: (page.Inst.name), // 分享时的标题
                    link: window.location.protocol + "//" + window.location.host + '/#' + window.location.href.split('#')[1],
                    imgUrl: page.uploadpath + 'inst/' + page.Inst.logo,
                    success: function () {
                        console.log("分享成功");

                    },
                    cancel: function () {
                        console.log("取消分享");
                    }
                });
                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: (page.Inst.name),
                    desc: (page.Inst.summary),
                    link: window.location.protocol + "//" + window.location.host + '/#' + window.location.href.split('#')[1],
                    imgUrl: page.uploadpath + 'inst/' + page.Inst.logo,
                    type: '',
                    dataUrl: '',
                    success: function () {
                        console.log("分享成功");
                        //alert("success");
                    },
                    cancel: function () {
                        console.log("取消分享");
                        //alert("cancel");
                    }
                });
                //alert("succss");
            })


        });
    }

    static loadwechat(page) {
        let viewer = window.navigator.userAgent.toLowerCase();
        if (viewer.match(/MicroMessenger/i) == "micromessenger") {

            page.inwechat = true;


            //直接调用微信支付
            let code = PageHelper.getUrlKey("code"); //获取url参数code
            if (code) { //拿到code， code传递给后台接口换取opend
                HttpHelper.Post("member/getwechatinfo", {
                    code
                }).then((res) => {
                    if (res.errcode == undefined) {
                        localStorage.setItem("openid", res.openid);
                        PageHelper.loadwechatconfig(page);
                    }
                });
            } else {
                console.log(PageHelper.Inst);
                PageHelper.getCodeApi(PageHelper.Inst.appid);
            }
        }
    }
}