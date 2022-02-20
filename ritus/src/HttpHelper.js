import Config from "./Config";
import Axios from "axios";
export class HttpHelper {
  static Sign = "";
  static Token = "";
  static TokenKey = "";
  static Unicode = "Ruideshi";
  static Post(url, data) {
    var fullurl = Config.ApiUrl + url;
    var token =  window.localStorage.getItem("token");
    var tokenkey = window.sessionStorage.getItem("v");
    return Axios.post(fullurl, HttpHelper.ParamUrlencoded(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Sign': HttpHelper.Sign,
        'Token': token,
        'TokenKey': tokenkey,
        'UNICODE': HttpHelper.Unicode
      }
    }).then((res) => {
      console.log(url, data, res.data);
      return res.data;
    });
  }


  static UploadBase64(module, base64content) {
    var data = {
      module: module,
      base64: base64content,
      rettype: "json",
    };
    var fullurl = Config.FileUploadAPI;
    var token = window.localStorage.getItem("token");
    return Axios.post(fullurl, HttpHelper.ParamUrlencoded(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Sign': HttpHelper.Sign,
        'Token': token,
        'TokenKey': HttpHelper.TokenKey,
        'UNICODE': HttpHelper.Unicode
      }
    }).then((res) => {
      //console.log(url, data, res.data);
      console.log("UploadBase64", res);
      return res.data;
    });
  }

  static datedifference(sDate1, sDate2) {
    var dateSpan,
      iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    //dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays
  }

  static getNowDate() {
    var date = new Date();
    var sign1 = "-";
    var sign2 = ":";
    var year = date.getFullYear() // 年
    var month = date.getMonth() + 1; // 月
    var day = date.getDate(); // 日
    var hour = date.getHours(); // 时
    var minutes = date.getMinutes(); // 分
    var seconds = date.getSeconds() //秒
    //var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
    // var week = weekArr[date.getDay()];
    // 给一位数数据前面加 “0”
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
      day = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
    }
    var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds;
    return currentdate;
  }

  static ParamUrlencoded(json) {
    var arr = new Array();
    for (let i in json) {
      arr.push(i + "=" + encodeURIComponent(json[i]));
    }
    return arr.join("&");
  }
}