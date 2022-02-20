<template>
  <div class="padding">
    <div class="h5 txt-left">个人信息</div>
    <div class="content">
      <div class="padding-20">
        <div class="flex-row flex-center margin-top-20">
          <div class="h6">昵称:</div>
          <div class="h6">{{ page.Member.nickname2 }}</div>
          <div class="flex-1"></div>
          <div class="h6">VIP等级:</div>
          <div class="h6">
            {{
              page.Member.memberlevel_id == ""
                ? "暂无会员"
                : page.Member.memberlevel_id
            }}
          </div>
          <div class="flex-1"></div>
          <div class="h6">剩余积分:</div>
          <div class="h6">{{ page.Member.jifen }}</div>
        </div>

        <div class="flex-row flex-center margin-top-20">
          <div class="h6">安全手机:{{ page.Member.mobile }}</div>

          <div class="flex-1"></div>

          <div class="h6 txt-o">手机绑定></div>
        </div>
        <n-button color="#FF6600" class="margin-top" @click="outlogin"
          >退出登录</n-button
        >
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { PageHelper } from "../pageHelper";
import { ref } from "vue";
import { NButton } from "naive-ui";
import { useRouter } from "vue-router";
//import { HttpHelper } from "../HttpHelper";
export default {
  name: "MemberInfo",
  components: { NButton },
  setup() {
     const router = useRouter();
    let page = ref({});
    PageHelper.Init(page, () => {});

    function outlogin() {
      window.localStorage.setItem("token", "");
        router.push("/login");
    }

    return {
      page,
      outlogin,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  width: 100%;
  background: #f6f4f5;
  margin-top: 50px;
  height: 500px;
}
</style>
