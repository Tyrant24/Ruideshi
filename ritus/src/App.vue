<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-dialog-provider>
      <n-message-provider>
        <div id="nav"></div>
        <router-view />
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { NMessageProvider, NDialogProvider, NConfigProvider } from "naive-ui";
const themeOverrides = {
  Select: {
    peers: {
      InternalSelection: {
        textColor: "#FF0000",
      },
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
.chaochu2 {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.chaochu {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
.margin-left {
  margin-left: 20px;
}
.bold {
  font-weight: bold;
}
.h6 {
  font-size: 21px;
  line-height: 21px;
}
.h3 {
  font-size: 91px;
  line-height: 91px;
}
.h5 {
  font-size: 33px;
  line-height: 33px;
}
.txt-left {
  text-align: left;
}
.padding {
  padding: 40px;
}
.padding-bottom {
  padding-bottom: 40px;
}
.padding-bottom-20 {
  padding-bottom: 20px;
}
.margin{
   margin:40px;
}
.h4 {
  font-size: 50px;
  line-height: 50px;
}
.f22 {
  font-size: 22px;
}
.margin-top {
  margin-top: 40px;
}
.margin-top {
  margin-top: 40px;
}
.margin-top-20 {
  margin-top: 20px;
}
.txt-w {
  color: white;
}
.txt-b {
  color: black;
}
.txt-g {
  color:#DDDCDE;
}
.weight-400 {
  font-weight: 400;
}
.txt-o {
  color: #ff6600;
}
.hidden {
  visibility: hidden;
}
.padding-top-head {
  padding-top: 59px;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.flex-row {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-center {
  align-content: center;
  align-items: center;
}
.margin-top-20 {
  margin-top: 20px;
}
.flex-center-justify {
  align-content: center;
  align-items: center;
  justify-content: center;
}
.padding-20 {
  padding: 20px;
}
/* ::-webkit-scrollbar{
  display: none;
} */
.flex-column {
  align-content: center;
  align-items: center;
  flex-direction: column;
}

.flex-bottom {
  align-content: flex-end;
  align-items: flex-end;
}

.flex-1 {
  flex: 1;
}
.flex-2 {
  flex: 2;
}
.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}
.w100 {
  width: 100px;
}
.debug {
  background: #42b983;
}
.bggray {
  background: #ececec;
}
.bgorange {
  background: #fd7522;
}
.pointer {
  cursor: pointer;
}
.text-left{
  text-align: left;
}
.leftbigimg {
  margin-top: 100px;
  width: 761px;
}
</style>
