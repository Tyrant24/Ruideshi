
<template>
  <Head />
  <div v-if="page.Res!=null" class="padding-top-head" style="background:#F4F4F5">
    <div class="content">
      <div class="flex-row flex-center top">
        <div class="memberbtn hidden"></div>
        <p class="h4 bold">选用高端产品,品味精致生活</p>
        <!-- <div class="memberbtn" @click="membercenter()">个人中心</div> -->
      </div>

      <div class="flex-row flex-center">
        <div v-for="item of machineList" v-bind:key="item.id" class="goods pointer">
          <div class="goodstext">
            <div class="txt-b bold chaochu" style="width:100%">{{item.name}}</div>
            <div class="txt-o">RMB{{item.original_price}}</div>
          </div>
          <img :src="page.uploadpath + 'goods/' + item.pcimg" @click="gotoProduct(item.id)" />
        </div>
      </div>

      <!-- <p class="h5 bold">智慧厨房 食色生香</p>

      <div class="flex-row flex-center">
        <div v-for="item of partsList" v-bind:key="item.id" class="goods">
          <div class="goodstext">
            <div class="txt-b bold chaochu">{{item.name}}</div>
            <div class="txt-o">RMB{{item.original_price}}</div>
          </div>
          <img :src="page.uploadpath + 'goods/' + item.pcimg" @click="gotoProduct(item.id)" />
        </div>
      </div> -->

      <!-- <div class="h5 bold margin-top">了解更多商品</div>
      <div class="h6 txt-o margin-top-20">点击更多</div>
      <div class="h6 txt-o">v</div> -->
    </div>
  </div>
  <Footer />
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer.vue";
import Head from "@/components/Head.vue";
import { PageHelper } from "../pageHelper";
import { ref, reactive } from "vue";
import { HttpHelper } from "../HttpHelper";
import { useRouter } from "vue-router";
//import { HttpHelper } from "../HttpHelper";
export default {
  name: "About",
  components: {
    Head,
    Footer
  },
  setup() {
    let page = ref({});
    let machineList = reactive([]);
    let partsList = reactive([]);
    const router = useRouter();
    PageHelper.Init(page);

    HttpHelper.Post("pcritus/goods", {}).then(data => {
      data.map(item => {
        if (item.ismachine_value === "Y") {
          machineList.push(item);
        }
        if (item.isparts_value === "Y") {
          partsList.push(item);
        }
      });
    });

    function membercenter() {
      router.push("/membercenter");
    }
    function gotoProduct(id) {
      router.push("/product?id="+id);
    }

    return {
      page,
      machineList,
      partsList,
      membercenter,
      gotoProduct
    };
  },
  methods: {
    routeto(path, param = {}) {
      this.$router.push({
        path,
        param,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  width: 70%;
  margin-left: 15%;
}
.top {
  width: 100%;
}

.top p {
  width: 100%;
}
.memberbtn {
  width: 157px;
  height: 50px;
  background: #ff6600;
  line-height: 50px;
  text-align: center;
  color: white;
}
.goods {
  width: 31%;
  position: relative;
  margin-left: 1%;
  margin-right: 1%;
}
.goods img {
  width: 100%;
}
.goods .goodstext {
  position: absolute;
  margin-left: 15%;
  width: 70%;
  z-index: 100;
  margin-top: 100%;
}
.goods .goodstext div:nth-child(1) {
  font-size: 150%;
}
.goods .goodstext div:nth-child(2) {
  margin-top: 5%;
  font-size: 100%;
}
.goods:hover {
  box-shadow: 0px 0px 10px #000;
}
</style>