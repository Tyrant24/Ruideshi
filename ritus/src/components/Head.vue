<template>
  <div class="wrapper flex-row flex-center">
    <router-link to="/">
      <img class="logo" alt="german wunderwerk star" src="../assets/logo.png" />
    </router-link>
    <div id="nav" class="nav">
      <router-link to="/shop">商城</router-link>
      <router-link to="/about">RITUS</router-link>
      <router-link to="/products">产品</router-link>
      <router-link to="/about1">联系我们</router-link>
    </div>
    <div class="flex-1"></div>
    <div id="nav">
      <router-link v-if="page.Member == null" to="/login">登录</router-link>
      <router-link v-if="page.Member != null" to="/membercenter"
        >个人中心</router-link
      >
    </div>

    <img class="swiss" @click="href" alt="german wunderwerk star" src="../assets/swiss.png" />
  </div>
</template>

<script>
// @ is an alias to /src
import { PageHelper } from "../pageHelper";
import { ref } from "vue";
//import { HttpHelper } from "../HttpHelper";
export default {
  name: "About",
  setup() {
    let page = ref({});
    PageHelper.Init(page, () => {});
    function href(){
      window.open("https://www.rotel-haushaltsgeraete.ch/");
    }
    return {
      page,href
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  background: #352f32;
  height: 59px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 999;
  color: #dcdcdc;
}
.wrapper .nav {
  margin-left: 10%;
}
.wrapper .logo {
  width: 152px;
  height: 32px;
  margin-left: 100px;
}
.wrapper .swiss {
  width: 54px;
  height: 35px;
  margin-left: 100px;
  margin-right: 100px;
}

#nav a {
  color: white;
  line-height: 80px;
  padding-left: 50px;
  padding-right: 50px;
  font-size: 16px;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: #ff6600;
}
</style>
