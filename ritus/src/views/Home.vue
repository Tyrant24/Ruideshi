<template>
  <div v-if="page.Res != null && page.Inst != null">
    <Head />
    <div class="home padding-top-head">
      <NCarousel autoplay>
        <img
          v-for="item of swiperList"
          v-bind:key="item.id"
          class="swiper-slide"
          :src="page.uploadpath + 'swiper/' + item.img"
        />
      </NCarousel>

      <video
        ref="videoPlayer"
        autoplay
        controls
        :src="page.uploadpath + 'inst/' + page.Inst.homevideo"
      ></video>

      <!-- <div class="flex-row flex-center">
        <div class="goods">
          <div class="goodstext">
            <div class="txt-w h4">RITUS</div>
            <div class="flex-row flex-bottom">
              <div class="flex-1"></div>
              <div class="txt-w h5">珐琅锅</div>
              <div class="txt-o h6 margin-left">详情概述></div>
              <div class="flex-1"></div>
            </div>
          </div>
          <img :src="page.uploadpath + 'resource/' + page.Res.testimg1" />
        </div>
        <div class="goods">
          <div class="goodstext">
            <div class="txt-w h4">RITUS</div>
            <div class="flex-row flex-bottom">
              <div class="flex-1"></div>
              <div class="txt-w h5">珐琅锅</div>
              <div class="txt-o h6 margin-left">详情概述></div>
              <div class="flex-1"></div>
            </div>
          </div>
          <img :src="page.uploadpath + 'resource/' + page.Res.testimg1" />
        </div>
      </div> -->
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Head from "@/components/Head.vue";
import Footer from "@/components/Footer.vue";
import { NCarousel } from "naive-ui";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../pageHelper";
import { ref } from "vue";

export default {
  name: "Home",
  components: {
    Head,
    Footer,
    NCarousel,
  },
  data() {
    return {};
  },
  setup() {
    let page = ref({});
    PageHelper.Init(page, () => {});
    let swiperList = ref([]);
    HttpHelper.Post("pcritus/homeswiper", {}).then((list) => {
      swiperList.value = list;
    });

    console.log(swiperList,'为什么没数据？');
    return {
      page,
      swiperList,
    };
  },
};
</script>

<style scoped>
.swiper-slide {
  width: 100vw !important;
  line-height: 0;
}
.swiper-slide img {
  width: 100%;
}
.goods {
  width: 50%;
  position: relative;
}
.goods img {
  width: 100%;
}
.goods .goodstext {
  position: absolute;
  margin-left: 15%;
  width: 70%;
  z-index: 100;
  margin-top: 10%;
}
video {
  width: 100vw;
  object-fit: contain;
  height: 100%;
  border: 0;
  vertical-align: bottom;
}
</style>
