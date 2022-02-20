<template>
  <div class="padding">
    <div class="h5 txt-left">收货地址</div>

    <div class="address flex-row flex-center margin-top">
      <div
        @click="editaddress(item.id)"
        v-for="item of state.addresslist"
        v-bind:key="item.id"
        class="addressitem"
      >
        <div>{{ item.name }}</div>
        <div>{{ item.mobile }}</div>
        <div>{{ item.region }}</div>
        <div>{{ item.address_name }}</div>
      </div>

      <div
        @click="
          showModal = true;

          initaddress();
        "
        class="addressitem flex-row flex-center-justify"
      >
        <div class="flex-row flex-column">
          <img
            class="jia"
            :src="page.uploadpath + 'resource/' + page.Res.jia"
          />
          <div class="margin-top-20">添加新地址</div>
        </div>
      </div>

      <n-modal v-model:show="showModal">
        <n-card style="width: 900px" title="地址" :bordered="false" size="huge">
          <div class="flex-row flex-center">
            <div class="flex-1">收件人</div>

            <n-input
              v-model:value="addressinfo.name"
              type="text"
              placeholder="请输入收件人"
              autosize
              class="flex-1"
            />
          </div>
          <div class="flex-row flex-center margin-top-20">
            <div class="flex-1">手机号</div>

            <n-input
              v-model:value="addressinfo.mobile"
              type="text"
              placeholder="请输入手机号"
              autosize
              class="flex-1"
            />
          </div>
          <div class="flex-row flex-center margin-top-20">
            <div class="flex-1">收货地址</div>

            <n-input
              v-model:value="addressinfo.region"
              type="text"
              placeholder="请输入收货地址"
              autosize
              class="flex-1"
            />
          </div>
          <div class="flex-row flex-center margin-top-20">
            <div class="flex-1">详细地址</div>

            <n-input
              v-model:value="addressinfo.address_name"
              type="textarea"
              placeholder="请输入详细地址"
              size="small"
              :autosize="{
                minRows: 3,
                maxRows: 5,
              }"
              class="flex-1"
            />
          </div>
          <div class="flex-row flex-center margin-top-20">
            <div class="flex-1">设为默认地址</div>

            <n-switch v-model:value="addressinfo.isdefault" />
          </div>
          <div class="flex-row flex-center margin-top-20">
            <div class="flex-1"></div>
            <n-button v-if="isedit === false" @click="newaddress" type="primary"
              >新增</n-button
            >
            <n-button v-if="isedit" @click="newaddress()" type="primary"
              >修改</n-button
            >
            <n-button
              class="margin-left"
              v-if="isedit"
              @click="deladdress(addressinfo.primary_id)"
              type="error"
              >删除</n-button
            >
            <div class="flex-1"></div>
          </div>
        </n-card>
      </n-modal>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, reactive } from "vue";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../pageHelper";
import {
  NCard,
  NModal,
  NInput,
  NSwitch,
  NButton,
  useMessage,
  useDialog,
} from "naive-ui";

//import { HttpHelper } from "../HttpHelper";
export default {
  name: "Address",
  components: { NCard, NModal, NInput, NSwitch, NButton },
  props: {
    msg: String,
  },
  setup(props, { emit }) {
    console.log(props.msg);
    let page = ref({});
    let showModal = ref(false);
    PageHelper.Init(page);
    initaddresslist();
    let state = reactive({
      addresslist: [],
    });
    let isedit = ref(false);
    const message = useMessage();
    const dialog = useDialog();
    let addressinfo = reactive({
      name: "",
      mobile: "",
      isdefault: false,
      address_name: "",
      region: "",
    });

    function initaddress() {
      addressinfo.name = "";
      addressinfo.mobile = "";
      addressinfo.isdefault = false;
      addressinfo.address_name = "";
      addressinfo.region = "";
      isedit.value = false;
    }
    function deladdress(id) {
      dialog.warning({
        title: "警告",
        content: "你确定？",
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: () => {
          HttpHelper.Post("mall/deleteaddress", { id }).then(() => {
            showModal.value = false;
            initaddresslist();
          });
        },
        onNegativeClick: () => {
          // message.error("不确定");
        },
      });

      console.log(id);
    }

    function newaddress() {
      let param = { ...addressinfo };
      param.isdefault = param.isdefault === true ? "Y" : "N";
      if (param.name === "") {
        message.error("请输入姓名");
        return;
      }
      if (param.mobile === "") {
        message.error("请输入手机号");
        return;
      }
      if (param.region === "") {
        message.error("请输入地址");
        return;
      }
      if (param.address_name === "") {
        message.error("请输入详细地址");
        return;
      }

      if (!isedit.value) {
        delete param.primary_id;
      }

      HttpHelper.Post("mall/creataddress", param).then(() => {
        showModal.value = false;
        message.success("保存成功");
        initaddresslist();
      });
    }
    function editaddress(id) {
      HttpHelper.Post("mall/addressinfo", { id }).then((data) => {
        if (props.msg == "test") {
           showModal.value = false;
          emit("my-emit", data);
         
          return;
        }
        console.log(data);
        addressinfo.name = data.name;
        addressinfo.mobile = data.mobile;
        addressinfo.address_name = data.address_name;
        addressinfo.region = data.region;
        addressinfo.isdefault = data.isdefault_value == "Y" ? true : false;
        isedit.value = true;
        showModal.value = true;
        addressinfo["primary_id"] = id;
      });
    }

    function initaddresslist() {
      HttpHelper.Post("mall/addresslist", {}).then((data) => {
        state.addresslist = data;
      });
    }

    return {
      page,
      state,
      showModal,
      addressinfo,
      editaddress,
      newaddress,
      isedit,
      initaddress,
      deladdress,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jia {
  width: 40px;
  height: 40px;
}
.addressitem {
  margin-left: 20px;
  text-align: left;
  padding: 40px;
  background: #f4f4f6;
  width: 25%;
  height: 120px;
}
</style>
