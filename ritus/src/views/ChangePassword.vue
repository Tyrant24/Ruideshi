
<template>
  <Head />
  
   <div class="padding">测试支付</div>
 
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
  name: "ChangePassword",
  components: {
    Head,
    Footer,
  },
  setup() {
    let page = ref({});

    PageHelper.Init(page, () => {
       
    });
    return {
      page
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>