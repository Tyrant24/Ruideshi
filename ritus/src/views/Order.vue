<template>
  <div class="padding">
    <div class="h5 txt-left">我的订单</div>

    <div class="flex-row flex-center margin-top">
      <div :class="{ active: orderstatus === 'F' }" @click="bindchoose('F')">
        全部订单
      </div>
      <div
        :class="{ active: orderstatus === 'A' }"
        @click="bindchoose('A')"
        class="margin-left"
      >
        待支付
      </div>
      <div
        :class="{ active: orderstatus === 'B' }"
        @click="bindchoose('B')"
        class="margin-left"
      >
        待收货
      </div>
      <div class="flex-1"></div>
      <n-input
        v-model:value="orderno"
        placeholder="输入订单号"
        :style="{ width: '30%' }"
      />
      <n-button class="margin-left" type="primary" @click="searchorder" ghost
        >搜索</n-button
      >
    </div>
    <div
      v-for="item of state.orderlist"
      v-bind:key="item.id"
      class="ordercontent"
    >
      <div class="titile">
        <div class="padding">
          <div class="txt-o">{{ item.order_status_name }}</div>
          <div class="flex-row flex-bottom">
            <div class="h6">{{ item.submit_time }}</div>

            <div class="h6 margin-left">订单号:{{ item.orderno }}</div>
            <div class="flex-1"></div>
            <div class="h6">应付金额：</div>
            <div class="h5 txt-o">{{ item.payment_amount }}</div>
            <div class="h6">元</div>
          </div>
        </div>
      </div>
      <div class="goods flex-row flex-center">
        <div
          v-for="order of item.order_item"
          v-bind:key="order.id"
          class="flex-row flex-center margin-top-20"
          style="width: 100%"
        >
          <img
            class="goodsimg"
            :src="page.uploadpath + 'goods/' + order.goods_coverimage"
          />
          <div class="margin-left flex-1">
            <div class="chaochu2" style="width: 30%">
              {{ order.goods_name }}
            </div>
            <div>{{ order.unitprice }}元 X{{ order.number }}</div>
          </div>

          <div class="flex-wrap">
            <div>
              <n-button
                v-if="item.order_status == 'A'"
                color="#FF6600"
                class="margin-top-20"
                @click="pay(item.id)"
                >立即付款</n-button
              >
            </div>
            <div>
              
            </div>
            <n-popover trigger="click">
              <template #trigger>
                <n-button class="margin-top-20" @click="searchorder"
                  >联系客服</n-button
                >
              </template>
              <span>手机号码:{{ page.Inst.instmobile }}</span>
            </n-popover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, reactive } from "vue";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../pageHelper";
import { NButton, NInput, NPopover } from "naive-ui";
import { useRouter, useRoute } from "vue-router";
//import { HttpHelper } from "../HttpHelper";
export default {
  name: "Order",
  components: { NButton, NInput, NPopover },
  setup() {
    let page = ref({});
    const router = useRouter();
    let orderstatus = ref("F");
    let orderno = ref("");
    const state = reactive({
      orderlist: [],
    });
    PageHelper.Init(page);
    orderlist();

    function orderlist() {
      let order_status = orderstatus.value === "F" ? "" : orderstatus.value;
      HttpHelper.Post("mall/orderlist", {
        order_status,
      }).then((data) => {
        state.orderlist = data;
      });
    }
    function bindchoose(status) {
      orderstatus.value = status;
      orderlist();
    }
    function searchorder() {
      let order_status = orderstatus.value === "F" ? "" : orderstatus.value;
      HttpHelper.Post("mall/orderlist", {
        order_status,
        orderno: orderno.value,
      }).then((data) => {
        state.orderlist = data;
        orderno.value == "";
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
   
    console.log(state.orderlist);
    return {
      page,
      state,
      orderstatus,
      bindchoose,
      searchorder,
      orderno,
      pay
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ordercontent {
  margin-top: 20px;

  width: 100%;
  text-align: left;
  border: 1px solid #cccccc;
}
.goods {
  padding: 40px;
  padding-top: 20px;
}
.goodsimg {
  min-width: 110px;
  height: 110px;
}
.ordercontent .titile {
  width: 100%;
  height: 150px;
  background: #f4f4f6;
}
.active {
  color: #ff6600;
}
</style>
