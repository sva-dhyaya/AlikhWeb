<template>
  <div class="container row">
    <div class="col-3 left sticky-top">
      <div class="sidebar_cnt">
        <div style="text-align:center;"><img :src="logo" /></div>
        <div class="sidebar_menu">
          <ul>
            <li :class="{activePanel: selectedComponent == 'AlikhHome'}" @click="changeComponent($event, 'AlikhHome')">Home</li>
            <li :class="{activePanel: selectedComponent == 'FileBrowse'}" @click="changeComponent($event,'FileBrowse')">Files</li>
            <li :class="{activePanel: selectedComponent == 'UploadFile'}" @click="changeComponent($event,'UploadFile')">Upload</li>
            <li :class="{activePanel: selectedComponent == 'ReviewFile'}" @click="changeComponent($event,'ReviewFile')">Status</li>
            <li :class="{activePanel: selectedComponent == 'AlikhSettings'}" @click="changeComponent($event,'AlikhSettings')">Settings</li>
            <li :class="{activePanel: selectedComponent == 'BinPage'}" @click="changeComponent($event,'BinPage')">Bin</li>
            <li :class="{activePanel: selectedComponent == 'Logout'}" @click="logout($event,'Logout')">Log Out</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-7">
        <component v-if="selectedComponent" :is="selectedComponent"></component>
    </div>

  </div>
</template>

<script>
import logo from "../assets/logo.jpg";
import FileBrowse from "../components/FileBrowse.vue"
import AlikhHome from "../components/AlikhHome.vue"
import UploadFile from "@/components/UploadPage.vue";
import alikhUtils from '@/alikh.utils';
import ReviewFile from "@/components/ReviewFile.vue";

export default {
  data() {
    return {
      logo,
      selectedComponent:"AlikhHome"
    };
  },
  components:{
    "FileBrowse":FileBrowse,
    "AlikhHome": AlikhHome,
    "UploadFile": UploadFile,
    "ReviewFile": ReviewFile
  },
  methods:{
    changeComponent(event, compName){
      if (event != null){
        event.stopImmediatePropagation()
      }
      this.selectedComponent = compName
    },
    logout(event){
      if (event != null){
        event.stopImmediatePropagation()
      }
      alikhUtils.unsetLoginCookie()
      this.$router.push({"name":"home"})
    }
  }
};
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
.split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

ul li{
  color: #fff;
  font-weight:bold;
}

ul li:hover {
  background-color:rgb(0, 162, 255);
}

.activePanel{
  background-color:rgb(0, 132, 255);
}

/* ul li a:hover, ul li a:focus {
 color:rgb(0, 132, 255);
} */

/* Control the left side */
.left {
  /* left: 0%;
  width: 15%; */
  height: 100vh;
  overflow: hidden;
  /* position: fixed; */
  background-color: #000;
  padding: 50px 20px;
}

/* Control the right side */
.right {
  right: 0;
  width: 85%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
html,
body {
  margin: 0px;
  height: 100%;
}
h1 {
  font-size: 40px;
}
h2 {
  font-size: 36px;
}
h3 {
  font-size: 28px;
}
h4 {
  font-size: 26px;
}
h5 {
  font-size: 20px;
  margin-bottom: 8px;
}
h6 {
  font-size: 20px;
}
p {
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 8px;
}
.container {
  height: 100%;
}
.container_wrap_main {
  height: 100%;
}

/* sidebar */

.sidebar {
  width: 200px;
  height: 100%;
  position: fixed;
  background-color: #000;
  padding: 50px 20px;
}
.sidebar_menu {
  height: 70%;
  text-align: center;
  padding-top: 50px;
}
.sidebar_menu ul li {
  padding: 20px 0px;
  list-style: none;
}
.sidebar_menu ul li a {
  text-decoration: none;
}
.btn_side {
  padding: 10px 0px;
  font-weight: 700;
  color: #fff;
}
.main {
  margin-left: 200px;
}

.pt-50 {
  padding-top: 50px;
}
.ps-40 {
  padding-right: 40px;
  padding-left: 40px;
}
.ml-10 {
  margin-left: 10px;
}
.mt-20 {
  margin-top: 20px;
}
.sec_wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 25px;
}
.img_card {
  margin: 0 5px;
  width: 19%;
  border-bottom: 1px solid #efefef;
  border-left: 1px solid #efefef;
  border-right: 1px solid #efefef;
}
.card_cnt {
  padding: 10px 15px;
}
.img_round {
  width: 100%;
}
.card_border {
  border: 1px solid #efefef;
}
.btn {
  padding: 10px 25px;
  font-size: 18px;
  border-radius: 10px;
  background-color: #6ad8b0;
  border: none;
  color: #fff;
}
.active {
  background-color: #0c0c0c;
  color: #fff;
}
</style>