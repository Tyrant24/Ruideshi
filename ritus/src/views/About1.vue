<template>
  <div v-if="page.Res != null">
    <Head />
    <div class="padding-top-head">
      <div class="about">
        <div class="textcontent">
          <div style="height:100px"></div>
          <p class="h3 bold txt-w" style="margin-bottom:0">ABOUT US</p>
          <p class="h4 bold txt-w" style="margin:0">瑞士精工<span style="margin-left:50px"> </span>一芯十核</p>
          <p class="h6 txt-w" style="margi-top:20px">
            RITUS瑞得仕 隶属于瑞士ROTEL集团，ROTEL集团于1948年由瑞士著名工
            程师及企业家沃尔特-斯图创办，公司名称是法语单词“旋转”和“电气”的
            合并,自此成为延续70余年的智能高端厨房设备缔造者。2019年，正式进入
            中国市场，由瑞得仕（深圳）贸易有限公司独立运营。
          </p>
          <p class="h6 txt-w">
            2021年，发布首款“一芯十核”瑞得仕R10数字厨师烹饪机。与此同时，其
            中国第一家线下体验店在深圳华侨城落成开业，未来品牌将不断推出包括“
            COOK&MORE”及“食+”小程序和APP等线上线下融合的新兴消费场景，
            提供给消费者更多增值服务，并提供平台让不同文化、不同领域的的人来参
            与和分享生活的态度，输出健康科学，有品质有品位的生活方式。
          </p>
        </div>
        <img :src="page.uploadpath + 'resource/' + page.Res.about1" />
      </div>

      <div class="about">
        <div class="textcontent2">
          <p class="h4 bold txt-w">品牌大事记</p>
          <p class="h6 txt-w">
            1948年，著名工程师及企业家沃尔特-斯图在瑞士创立公司 —ROTEL
            ，公司名称是法语单词“旋转”和“电气”的合并。
          </p>
          <p class="h6 txt-w">
            1954年，法国、意大利等地出现ROTEL产品，奠定了它在电器
            行业中的领先地位
          </p>
        </div>
        <img :src="page.uploadpath + 'resource/' + page.Res.about2" />
      </div>

      <div class="about">
        <div class="textcontent3">
          <p class="h4 bold txt-b">品牌大事记</p>
          <p class="h6 txt-b">
            1964年，ROTEL厨电研发历史上的传奇之作——世界上首次
            打造出5合一厨房机器“ROTEL2000”。
          </p>
        </div>
        <img :src="page.uploadpath + 'resource/' + page.Res.about3" />
      </div>

      <div class="about">
        <div class="textcontent4">
          <p class="h4 bold txt-b">品牌大事记</p>
          <p class="h6 txt-b">
            1969年，开始成立自有电机工厂，拥有自主电动机生产线。
          </p>
          <p class="h6 txt-b">
            1975年，技术开始革新，产品线开始丰富，ROTEL 产品销往
            美国、加拿大、澳大利亚等30多个国家和地区。
          </p>
        </div>
        <img :src="page.uploadpath + 'resource/' + page.Res.about4" />
      </div>
      <div class="about">
        <div class="textcontent5">
          <p class="h4 bold txt-w">品牌大事记</p>
          <p class="h6 txt-w">
            1969年，开始成立自有电机工厂，拥有自主电动机生产线。
          </p>
        </div>
        <img :src="page.uploadpath + 'resource/' + page.Res.about5" />
      </div>

      <div class="about">
        <div class="textcontent6">
          <p class="h4 bold txt-w">品牌大事记</p>
          <p class="h6 txt-o">从“芯”升级</p>
          <p class="h6 txt-w">
            2021年，从“芯”升级，发布首款“一芯十核”瑞得仕R10数字厨师烹饪机。
          </p>
        </div>
        <img :src="page.uploadpath + 'resource/' + page.Res.about6" />
      </div>
        <div class="about" id="ch_title">
        <div class="textcontent7">
          <p class="h4 bold txt-o">联系RITUS</p>

          <div class="flex-row flex-center">
            <div style="width: 50%; text-align: left">
              <p class="txt-w h5">在线商店</p>
              <p class="txt-w h6">
              {{page.Inst.zaixian1}}
              </p>
            
            </div>
            <div class="flex-1"></div>
            <div style="width: 25%; text-align: left">
              <p class="txt-w h5">企业地址</p>
              <p class="txt-w h6">
               {{page.Inst.zaixian2}}
              </p>
            </div>
          </div>

          <div class="flex-row flex-center">
            <div style="width: 50%; text-align: left">
              <p class="txt-w h5">品质生活体验中心</p>
              <p class="txt-w h6">
              {{page.Inst.zaixian3}}
              </p>
            
            </div>
            <div class="flex-1"></div>
            <div style="width: 25%; text-align: left">
              <p class="txt-w h5">售后联系</p>
              <p class="txt-w h6">
               {{page.Inst.zaixian4}}
              </p>
            </div>
          </div>
        </div>
        <img :src="page.uploadpath + 'resource/' + page.Res.about7" />
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
import { ref } from "vue";
//import { HttpHelper } from "../HttpHelper";
export default {
  name: "About1",
  components: {
    Head,
    Footer,
  },
  setup() {
    let page = ref({});
    

    PageHelper.Init(page, () => {});
    return {
      page,
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
.h6{
   font-size: 21px;
  line-height: 33px;
}
</style>
