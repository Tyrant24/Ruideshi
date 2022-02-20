<template>
  <Head />
  <div v-if="page.Res != null" class="padding-top-head text-left">
    <div class="flex-row">
      <div class="flex-1"></div>
      <div>
        <img
          class="loginleft"
          :src="page.uploadpath + 'resource/' + page.Res.website_loginleft"
        />
      </div>
      <div class="w100"></div>
      <div>
        <div class="loginbox flex-row">
          <div class="margin">
            <div class="flex-row">
              <div
                @click="changeLoginType(0)"
                class="logintype margin-right-20"
                
              >
                绑定手机
              </div>
              
            </div>
            <div v-if="data.logintype == 0">
              <div class="bggray margin-top-44 inputbox">
                <n-tooltip :show="data.showPopover" placement="bottom">
                  <template #trigger>
                    <input
                      v-model="mobile"
                      placeholder="手机"
                      type="text"
                      maxlength="40"
                      @focus="data.showPopover = false"
                    />
                  </template>
                  <span>请输入正确的手机号码 </span>
                </n-tooltip>
              </div>
              <div class="bggray margin-top-22 inputbox flex-row">
                <div class="flex-1">
                  <n-tooltip :show="data.showPopover2" placement="bottom">
                    <template #trigger>
                      <input
                        v-model="verifycode"
                        placeholder="验证码"
                        type="text"
                        maxlength="6"
                      />
                    </template>
                    <span>{{ data.popover2tips }} </span>
                  </n-tooltip>
                </div>
                <div class="pointer" v-if="data.reminder <= 0" @click="onShow">
                  点击获取验证码
                </div>
                <div v-if="data.reminder > 0">剩余{{ data.reminder }}s</div>
              </div>

             
              <div
                class="
                  bgorange
                  margin-top-33
                  inputbox
                  txt-w
                  text-center
                  f22
                  weight-400
                "
                @click="login"
              >
                绑定
              </div>
            </div>
          
          </div>
        </div>
      </div>
      <div class="flex-1"></div>
    </div>
  </div>
  <Vcode :show="isShow" @success="onSuccess" @close="onClose" />
  <Footer />
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer.vue";
import Head from "@/components/Head.vue";
import { PageHelper } from "../pageHelper";
import { reactive, ref } from "vue";
//import { HttpHelper } from "../HttpHelper";
import wxlogin from "vue-wxlogin";
import Vcode from "vue3-puzzle-vcode";
import { NTooltip } from "naive-ui";
import { useRoute } from "vue-router";
import { HttpHelper } from "../HttpHelper";

export default {
  name: "Login",
  components: {
    Head,
    Footer,
    wxlogin,
    Vcode,
    NTooltip,
  },
  setup() {
    const route = useRoute();

    let page = ref({});
    let data = reactive({
      logintype: 0,
      reminder: 0,
      showvcode: false,
      showPopover: false,
      showPopover2: false,
      popover2tips: "",
      vurl:route.query.vurl==undefined?"":route.query.vurl
    });
    const isShow = ref(false);

    PageHelper.Init(page, () => {});
    return {
      page,
      data,
      mobile: "",
      verifycode: "",
      isShow,
    };
  },
  methods: {
    onClose() {
      this.isShow = false;
    },

    onSuccess() {
      this.onClose(); // 验证成功，需要手动关闭模态框
      this.sendverifycode();
    },
    onShow() {
      if (this.checkMobile()) {
        this.isShow = true;
      } else {
        this.data.showPopover = true;
      }
    },
    checkMobile() {
      var mobile_mode = /^1\d{10}$/;
      if (!mobile_mode.test(this.mobile)) {
        return false;
      }
      return true;
    },
    sendverifycode() {
      this.data.reminder = 60;
      HttpHelper.Post("huawei/sendverifycode", {
        mobile: this.mobile,
        type: "login",
      }).then(() => {});
      var k = setInterval(() => {
        this.data.reminder--;
        if (this.reminder <= 0) {
          clearInterval(k);
        }
      }, 1000);
    },
    changeLoginType(logintype) {
      this.data.logintype = logintype;
    },
    showContent() {},
    vcodesuccess() {},
    vcodeclose() {},
    login() {
      HttpHelper.Post("member/bondedphone", {
        mobile: this.mobile,
        verifycode: this.verifycode,
      }).then((ret) => {
        if (ret.code == 0) {
           console.log("绑定成功");

           let Base64 = require('js-base64').Base64;
            var vurl=this.$route.query.vurl;
            if(vurl==undefined){
              this.$router.replace({
                path: "/membercenter",
                param: {},
              });
            }else{
              vurl=Base64.decode(vurl);
              window.location.href=vurl;
            }

        } else {
          
        }
      });
    },
  },
};
</script>
<style scoped>
.loginleft {
  margin-top: 100px;
  width: 761px;
}
.loginbox {
  margin-top: 118px;
  width: 682px;
  height: 809px;
  background-image: url("../assets/loginbox.png");
  background-size: 100% 100%;
}
.loginbox .margin {
  margin-top: 98px;
  margin-left: 112px;
}
.loginbox .logintype {
  font-size: 28px;
  font-weight: 400;
  line-height: 28px;
  color: #000000;
  cursor: pointer;
}
.loginbox .logintype.active {
  color: #ff6600;
}
.margin-right-20 {
  margin-right: 20px;
}
.margin-top-44 {
  margin-top: 44px;
}
.margin-top-33 {
  margin-top: 33px;
}
.margin-top-22 {
  margin-top: 22px;
}
.inputbox {
  width: 406px;
  height: 24px;
  padding: 30px;
}
.inputbox input {
  font-size: 22px;
  font-weight: 400;
  line-height: 22px;
  width: 100%;
  border: 0px;
  background: transparent;
  outline: none;
}
.tongyi {
  font-size: 16px;
  font-weight: 400;
  color: #666666;
  line-height: 22px;
}
</style>
<style>
.qrcode iframe {
  height: 450px;
}
</style>
