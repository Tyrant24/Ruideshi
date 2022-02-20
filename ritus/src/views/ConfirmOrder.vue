<template>
  <Head />
  <div
    v-if="page.Res != null && goodsinfo != null"
    class="padding-top-head"
    style="background: #f5f5f5"
  >
    <div
      class="margin flex-row flex-center padding-bottom-20"
      style="border-bottom: 1px solid #c0bdc0"
    >
      <div class="h5">确认订单</div>
      <div class="flex-1"></div>
      <div>帐号{{ page.Member.mobile }}</div>
      <div @click="membercenter" class="margin-left">我的订单</div>
    </div>
    <div class="content">
      <div class="h5">收货地址信息</div>
      <div
        @click="showModal = true"
        class="selectaddress flex-row flex-center-justify"
      >
        <div v-if="address == null" class="txt-g">请选择收货地址</div>
        <div v-if="address != null">
          <div>{{ address.name }}</div>
          <div>{{ address.mobile }}</div>
          <div>{{ address.region }}</div>
          <div>{{ address.address_name }}</div>
        </div>
      </div>
      <div class="flex-row flex-center margin-top-20">
        <div>{{ goodsinfo.goods_name }}</div>
        <div class="flex-1"></div>
        <div>RMB {{ goodsinfo.unitprice }}</div>
      </div>
      <div class="flex-row flex-bottom">
        <div>
          <div class="flex-row flex-center margin-top">
            <div class="h5 w-50">配送方式:</div>
            <div class="txt-o margin-left">包邮</div>
          </div>
          <div class="flex-row flex-center margin-top">
            <div class="h5 w-50">发票:</div>
            <div class="txt-o margin-left">电子普通发票</div>
            <div class="txt-o margin-left">个人</div>
          </div>
          <div class="flex-row flex-center margin-top">
            <div class="h5 w-50">积分抵扣:</div>
            <div class="txt-o margin-left">剩余积分{{ page.Member.jifen }}</div>
          </div>
          <div class="margin-top h5 w-50">支付平台:</div>

          <div class="flex-row flex-center margin-top">
            <!-- 支付宝支付 -->
            <div
              @click="paytype = 'alipay'"
              :class="{ or: paytype == 'alipay' }"
              class="pay flex-row flex-center-justify"
            >
              <img
                class="alipay"
                :src="page.uploadpath + 'resource/' + page.Res.alipay"
              />
            </div>

            <!-- 微信支付 -->
            <div
              @click="paytype = 'wechatpay'"
              :class="{ or: paytype == 'wechatpay' }"
              class="pay flex-row flex-center-justify"
            >
              <img
                class="wechapay"
                :src="page.uploadpath + 'resource/' + page.Res.wechapay"
              />
            </div>
          </div>
        </div>
        <div class="flex-1"></div>
        <div>
          <div class="flex-row flex-center margin-top-20">
            <div class="wr-50">商品件数</div>
            <div class="wr-50 txt-o margin-left">1件</div>
          </div>
          <div class="flex-row flex-center margin-top-20">
            <div class="wr-50">商拍总价</div>
            <div class="txt-o wr-50 margin-left">
              {{ goodsinfo.unitprice }}元
            </div>
          </div>
          <div class="flex-row flex-center margin-top-20">
            <div class="wr-50">积分抵扣</div>
            <div class="txt-o wr-50 margin-left">0元</div>
          </div>
          <div class="flex-row flex-center margin-top-20">
            <div class="wr-50">运费</div>
            <div class="txt-o wr-50 margin-left">0元</div>
          </div>
          <div class="flex-row flex-center margin-top-20">
            <div class="wr-50">应付总额</div>
            <div class="txt-o wr-50 margin-left">
              {{ goodsinfo.unitprice }}元
            </div>
          </div>
          <div class="flex-row flex-center">
            <div class="flex-1"></div>
            <n-button @click="bindpay" color="#FF6600" class="margin-top-20"
              >去结算</n-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <n-modal v-model:show="showModal" style="width: 1000px">
    <n-card style="width: 600px" title="模态框" :bordered="false" size="huge">
      <Address @my-emit="parentEmit" msg="test"></Address>
    </n-card>
  </n-modal>

  <Footer />
</template>

<script>
// @ is an alias to /src
import Head from "@/components/Head.vue";
import Footer from "@/components/Footer.vue";
import { PageHelper } from "../pageHelper";
import { ref } from "vue";
import { NButton, NModal, NCard, useMessage } from "naive-ui";
import { useRouter, useRoute } from "vue-router";
import Address from "@/views/Address.vue";
import { HttpHelper } from "../HttpHelper";
//import { HttpHelper } from "../HttpHelper";
export default {
  name: "ChangeOrder",
  components: {
    Head,
    Footer,
    NButton,
    NModal,
    Address,
    NCard,
  },
  setup() {
    let page = ref({});
    let paytype = ref("wechatpay");
    const route = useRoute();
    const router = useRouter();
    const message = useMessage();
    let showModal = ref(false);
    let address = ref(null);
    const goodsinfo = JSON.parse(route.query.cartslist);

    function parentEmit(val) {
      showModal.value = false;
      address.value = val;
    }
    function membercenter() {
      router.push("/membercenter");
    }
    function bindpay() {
      if (address.value == null) {
        message.error("请选择地址");
        return;
      }
      let json = {
        payment_amount: goodsinfo.unitprice,
        address_id: address.value.id,
        freight: 0,
        rental: goodsinfo.unitprice,
        payment_method: paytype.value == "alipay" ? "C" : "A",
        integration_all: 0,
        integration: 0,
        goods_id: goodsinfo.goods_id,
        specifications: goodsinfo.specifications,
        specifications_name: goodsinfo.specifications_name,
      };
      console.log(json);

      HttpHelper.Post("pcritus/creatorder", json).then((data) => {
        if (data.code == 0) {
          pay(data.return);
        }
      });
    }
    function pay(id) {
      router.push({
        path: "/payqrcode",
        query: {
          id: id,
        },
      });
      return;
    }

    PageHelper.Init(page, () => {});
    return {
      page,
      paytype,
      showModal,
      parentEmit,
      address,
      goodsinfo,
      bindpay,
      membercenter,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  width: 70%;
  height: 800px;
  margin-left: 15%;
  background: white;
  padding: 50px;
  box-sizing: border-box;
  text-align: left;
}
.selectaddress {
  width: 400px;
  height: 100px;
  border: 1px solid #ceced0;
  margin-top: 20px;
}
.wechapay {
  width: 137px;
  height: 39px;
}
.alipay {
  width: 118px;
  height: 41px;
}
.w-50 {
  width: 150px;
}
.pay {
  margin-left: 20px;
  width: 232px;
  height: 85px;
  border: 1px solid #a9a9a9;
}
.wr-50 {
  width: 150px;
  text-align: right;
  font-size: 20px;
}
.or {
  border: 1px solid #ff6701;
}
</style>
