
<template>
  <Head />
  <div v-if="page.Res!=null" class="page padding-top-head">
    <div class="centertext">首页/个人中心</div>
    <div class="flex-row">
      <div class="leftMenu">
        <div class="margin-top"><router-link to="/membercenter/order">我的订单</router-link></div>
        <div><router-link to="/membercenter/address">收货地址</router-link></div>
        <div><router-link to="/membercenter/memberinfo">个人信息</router-link></div>
       
      </div>
      <div class="center">
     
        <router-view />
     
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer.vue";
import Head from "@/components/Head.vue";
import { PageHelper } from "../pageHelper";
import { ref } from "vue";
//import { HttpHelper } from "../HttpHelper";
export default {
  name: "MemberCenter",
  components: {
    Head,
    Footer
  },
  setup() {
    let page = ref({});
    PageHelper.Init(page, () => {});
    return {
      page
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page {
  background: #f5f5f5;
}
.leftMenu {
  background: white;
  height: 800px;
  width: 20%;
  margin-left: 10%;
}
.centertext {
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: left !important;
  margin-left: 10%;
}
.center {
  min-height: 800px;
  width: 60%;
  background: white;
  margin-left: 20px;
}
.leftMenu a {
  color: black;
  line-height: 60px;
 
  font-size: 16px;
  text-decoration: none;
}
.leftMenu a.router-link-exact-active {
  color: #FF6600;
}
</style>