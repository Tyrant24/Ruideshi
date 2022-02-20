<template>
  <Head />
  <div v-if="page.Res != null" class="padding-top-head">
    <div class="qrcode flex-row flex-center-justify">
      <div>
        <h1>请使用微信扫码支付</h1>
        <qrcode-vue :value="qrcodestr" :size="size" level="H" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer.vue";
import Head from "@/components/Head.vue";
import { useRouter, useRoute } from "vue-router";
import { PageHelper } from "../pageHelper";
import { ref, onUnmounted, onBeforeUnmount } from "vue";
import QrcodeVue from "qrcode.vue";
import { HttpHelper } from "../HttpHelper";
export default {
  name: "PayQrcode",
  components: {
    Head,
    Footer,
    QrcodeVue,
  },
  setup() {
    let page = ref({});
    const route = useRoute();
    const router = useRouter();
    let qrcodestr = ref("");

    let timer = null;
    PageHelper.Init(page, () => {});

    onUnmounted(() => {
      clearInterval(timer);
      timer = null;
    });
    onBeforeUnmount(() => {
      clearInterval(timer);
      timer = null;
    });

    function CheckOrder(id) {
      HttpHelper.Post("pcritus/checkorder", { id }).then((ret) => {
        if (ret.order_status == "B") {
          router.push("/membercenter");
          // this.routeto("/success?order_id=" + this.order_id);
        } else {
          timer = setTimeout(() => {
            CheckOrder(id);
          }, 1000);
        }
      });
    }

    HttpHelper.Post("wechat/paymentqrcode", { id: route.query.id }).then(
      (data) => {
        if (data.result != "") {
          qrcodestr.value = data.return;
          CheckOrder(data.result);
        }
      }
    );

    return {
      page,
      qrcodestr,
      size: 300,
    };
  },
  beforeRouteLeave(to, from, next) {
    next();
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.qrcode {
  width: 100vw;
  height: 1000px;
}
</style>
