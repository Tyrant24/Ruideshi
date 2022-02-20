<template>
  <div v-if="page.Res != null">
    <Head />
    <div class="padding-top-head text-left">
      <div
        class="flex-row"
        v-if="data.good != null && data.selectprice != null"
      >
        <div class="flex-1"></div>
        <div>
          <img
            class="leftbigimg"
            :src="page.uploadpath + 'goods/' + data.selectprice.img"
          />
        </div>
        <div class="w212"></div>
        <div class="detailbox">
          <div class="name">{{ data.good.name }}</div>
          <div class="price">RMB {{ data.selectprice.price }}元</div>
          <div class="h80"></div>
          <div
            v-for="item of data.good.specifications_type"
            v-bind:key="item.id"
          >
            <div class="guigetitle">选择{{ item.name }}</div>
            <div class="flex-row flex-wrap">
              <div
                v-for="item2 of item.specificationslist"
                v-bind:key="item2.id"
              >
                <div
                  class="guigebox pointer"
                  :class="{ active: item.specifications_id == item2.id }"
                  @click="selectSpecification(item, item2.id)"
                >
                  {{ item2.name }}
                </div>
              </div>
            </div>
          </div>
          <!-- <div v-if="data.selectprice!=null">总计：{{data.selectprice.price}}元</div> -->
          <div class="flex-row flex-center">
            <n-button
              color="#FF6600"
              class="margin-top-20"
              @click="confirmorder"
              >确认订单</n-button
            >
          </div>
        </div>

        <div class="flex-1"></div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer.vue";
import Head from "@/components/Head.vue";
import { PageHelper } from "../pageHelper";
import { reactive, ref } from "vue";
import { HttpHelper } from "../HttpHelper";
import { useRouter } from "vue-router";
import { NButton } from "naive-ui";

export default {
  name: "About",
  components: {
    Head,
    Footer,
    NButton,
  },
  setup() {
    var thisurl=window.location.href;
    const router = useRouter();
  
    let page = ref({});
    let data = reactive({
      good: null,
      selectprice: null,
    });
    PageHelper.Init(page, () => {});
    
    function confirmorder() {
      var url=window.location.href;
      let Base64 = require('js-base64').Base64;
      console.log("page",page.value.Member);
      if(page.value.Member==null){
        router.push({
          path: "/login",
          query: {
            vurl:Base64.encode(url),
          },
        });
        return;
      }
      
      if(page.value.Member!=null&&page.value.Member.mobile==""){
        console.log("跳去验证电话")
        router.push({
          path: "/bondedPhone",
          query: {
            vurl:Base64.encode(url),
          },
        });
        return;
      }

      let cartslist ={
        goods_id: data.good.id,
        goods_name: data.good.name,
        specifications: data.selectprice.id,
        specifications_name:data.selectprice.name,
        unitprice: data.selectprice.price,
      };
      cartslist = JSON.stringify(cartslist);
      console.log(cartslist);
    
      router.push({
        path: "/confirmorder",
        query: {
          cartslist,
        },
      });
    }
    return {
      page,
      data,
      confirmorder,
    };
  },
  mounted() {
    HttpHelper.Post("mall/goodsinfo", { id: this.$route.query.id }).then(
      (info) => {
        for (var i = 0; i < info.specifications_type.length; i++) {
          if (info.specifications_type[i].specificationslist.length > 0) {
            info.specifications_type[i].specifications_id =
              info.specifications_type[i].specificationslist[0].id;
          }
        }
        this.data.good = info;
        this.refreshprice();
      }
    );
  },
  methods: {
    routeto(path, param = {}) {
      this.$router.push({
        path,
        param,
      });
    },
    selectSpecification(item, id) {
      item.specifications_id = id;
      this.refreshprice();
    },
    refreshprice() {
      var chooseid = [];
      for (var i = 0; i < this.data.good.specifications_type.length; i++) {
        chooseid.push(this.data.good.specifications_type[i].specifications_id);
      }
      chooseid.sort();
      HttpHelper.Post("mall/selectprice", {
        chooseid: chooseid.join(","),
      }).then((ret) => {
        this.data.selectprice = ret.return;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.w212 {
  width: 212px;
}
.detailbox {
  margin-top: 176px;
  width: 496px;
}
.name {
  font-size: 39px;
  font-weight: 400;
  color: #000000;
  line-height: 39px;
}
.h80 {
  height: 78px;
}
.guigetitle {
  font-size: 20px;
  font-weight: 400;
  color: #4d4d4d;
  line-height: 20px;
  margin-bottom: 10px;
}
.guigebox {
  border: 2px solid #cccccc;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 400;
  color: #000000;
  line-height: 20px;
  padding: 23px 35px;
  margin-right: 15px;
  margin-bottom: 15px;
}
.guigebox.active {
  border: 2px solid #ff6600;
}
.calcbox {
  background: #e5e5e5;
  padding: 35px 30px;
}
.price {
  margin-top: 10px;
  font-size: 28px;
  font-weight: 400;
  color: #ff6600;
  line-height: 28px;
}
</style>
