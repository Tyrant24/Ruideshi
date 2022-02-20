
<template>
  <div >
    
  </div>
</template>

<script>
// @ is an alias to /src

import { PageHelper } from "../pageHelper";
import { reactive, ref } from "vue";
import { HttpHelper } from "../HttpHelper";

export default {
  name: "Login",
  components: {
 
  },
  setup() {
    let page = ref({});
    let data = reactive({
      checked: false,
    });
    PageHelper.Init(page, () => {});
    return {
      page,
      data,
      userinfo:null
    };
  },
  mounted(){
    this.loadMemberInfo();
  },
  methods: {
    loadMemberInfo() {
      var code=(this.$route.query.code);
      HttpHelper.Post("member/scanlogin", {code}).then((userinfo) => {
        if(userinfo.errcode!=undefined){
          this.$router.push({
                path:"/login",
                param:{}
            });
        }else{
          window.localStorage.setItem("token",userinfo.unionid);
          let Base64 = require('js-base64').Base64;
            var vurl=this.$route.query.state;
            if(vurl==''){
              this.$router.replace({
                path: "/membercenter",
                param: {},
              });
            }else{
              vurl=Base64.decode(vurl);
              window.location.href=vurl;
            }
        }
      });
    },
  },
};
</script>
<style scoped>
</style>