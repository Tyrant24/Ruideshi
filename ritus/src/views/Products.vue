<template>
  <Head />
  <div v-if="page.Res!=null" class="padding-top-head">
    <img class="flex-row" style="width:100vw" :src="page.uploadpath + 'resource/' + page.Res.product" />
    <img class="flex-row" style="width:100vw" :src="page.uploadpath + 'resource/' + page.Res.product1" />
    <img class="flex-row" style="width:100vw" :src="page.uploadpath + 'resource/' + page.Res.product2" />
  </div>
  <Footer />
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer.vue";
import Head from "@/components/Head.vue";
import { PageHelper } from "../pageHelper";
import { ref } from "vue";
import { useRouter } from "vue-router";
//import { HttpHelper } from "../HttpHelper";
export default {
  name: "Products",
  components: {
    Head,
    Footer,
  },
  setup() {
     const router = useRouter();
    let page = ref({});
    PageHelper.Init(page, () => {});
    function aasaa() {
      router.push("/product?id=" + 7);
    }
    return {
      page,
      aasaa,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about {
  width: 100vw;
}
.about img {
  width: 100vw;
  font-size: 0;
  display: block;
  background: #000000;
}
.about .textcontent {
  text-align: left;
  position: absolute;
  width: 35%;
  padding-left: 214px;
}
.about .textcontent2 {
  text-align: left;
  position: absolute;
  width: 35%;
  padding-left: 214px;
  padding-top: 200px;
}
.about .textcontent3 {
  text-align: left;
  position: absolute;
  width: 35%;
  padding-left: 50%;
  padding-top: 300px;
}
.about .textcontent4 {
  text-align: left;
  position: absolute;
  width: 35%;
  padding-left: 214px;
  padding-top: 300px;
}

.about .textcontent5 {
  text-align: left;
  position: absolute;
  width: 50%;
  background: rgba(00, 00, 00, 0.2);
  text-align: center;
  left: 25%;
  margin-top: 30%;
}
.about .textcontent6 {
  text-align: left;
  position: absolute;
  width: 50%;
  text-align: center;
  left: 25%;
}
.about .textcontent7 {
  text-align: left;
  position: absolute;
  width: 70%;
  text-align: center;
  left: 15%;
  margin-top: 5%;
}
</style>
