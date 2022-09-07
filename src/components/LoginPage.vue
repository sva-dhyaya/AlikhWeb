<template>
  <div>
    <div class="nav_bar">
      <img :src="logo" height="" width="" />
      <div class="menu-block">
        <ul class="main-menu">
          <li>
            <a href=""
              >Lottie<i class="fa fa-angle-down ml-10" aria-hidden="true"></i
            ></a>
            <ul class="sub-menu">
              <li><a href="">Link 1</a></li>
              <li><a href="">Link 2</a></li>
              <li><a href="">Link 3</a></li>
            </ul>
          </li>
          <li>
            <a href=""
              >Vector<i class="fa fa-angle-down ml-10" aria-hidden="true"></i
            ></a>
            <ul class="sub-menu">
              <li><a href="">Link 1</a></li>
              <li><a href="">Link 2</a></li>
              <li><a href="">Link 3</a></li>
            </ul>
          </li>
          <li><a href="">Free</a></li>
        </ul>
      </div>
      <div class="search-block flex-45">
        <form id="form-search">
          <select class="no_border" name="options">
            <option value="all">All</option>
            <option value="lottie_animation">Lottie Animation</option>
            <option value="icons">Icons</option>
            <option value="animated_icons">Animated Icons</option>
          </select>
          <input
            class="no_border"
            type="text"
            placeholder="Search lottie animations, illustrations or icons"
          />
          <button type="submit">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </form>
      </div>
      <div class="signin-block">
        <button class="btn" :onclick="loginClick">Sign In</button>
        <div v-if="showLogin" id="form-signin">
          <div class="signin-cnt">
            <div class="nav-cancel is-active" id="nav-cancel" :onclick="closeLoginForm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
                />
              </svg>
            </div>
            <h2 class="text-center">Sign In</h2>
            <hr class="hr" />
            <input
              type="text"
              name="user_name"
              v-model="username"
              placeholder="Enter User Name"
            /><br />
            <input
              type="password"
              name="password"
              v-model="password"
              placeholder="Enter Password"
            /><br />
            <input type="submit" value="Sign In" :onclick="loginToAlikh"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "../assets/logo.jpg";
import Utils from "../alikh.utils.js"
import {mapActions} from "vuex"

export default {
  data() {
    return {
      logo,
      showLogin:false,
      username:null,
      password:null
    };
  },
  methods:{
    loginClick(){
      this.showLogin = !this.showLogin
    },
    closeLoginForm(){
      this.showLogin = false
    },
    loginToAlikh(){
      if (this.username == null || this.password == null){
        Utils.failToast("Username or Password not Provided!!!")
        return 
      }else {
        this.logInToServer({username: this.username, password: this.password}).then((data)=>{
          if (data.httpSuccess){
            Utils.successToast(`Logging in ${this.username}`)
            this.closeLoginForm()
            this.$router.push({name:"alikh"})
          }else{
            Utils.failToast(data.errors?typeof(data.errors)=="string"?data.errors:data.errors[0]:`Failed to Login`)
          }
        })
      }
    },
    ...mapActions("users", ["logInToServer"])
  }
};
</script>

<style scoped>
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
/* nav_bar */
.nav_bar {
  display: flex;
  justify-content: space-between;
  box-shadow: 0 5px 10px #e3e3e3;
  padding: 5px 10px;
  align-items: center;
}
.main-menu {
  list-style-type: none;
  margin: 40 auto;
  padding: 0;
  overflow: hidden;
}
.ml-10 {
  margin-left: 10px;
}
.main-menu > li {
  float: left;
}
.main-menu li ul {
  display: none;
  margin: 0;
  padding: 0 15px;
  list-style: none;
  position: absolute;
  background-color: #fff;
}
.main-menu li:hover ul {
  display: block;
}
.main-menu li a {
  display: block;
  text-decoration: none;
  text-align: center;
  margin-top: 10px;
  padding: 13px 15px;
  color: #0c0c0c;
}
.main-menu li a:hover {
  background-color: #000;
  color: #fff;
}
.flex-45 {
  width: 45%;
}
.search-block {
  border-radius: 35px;
  border: 1px solid black;
}
#form-search {
  display: flex;
  justify-content: space-around;
  padding: 5px 10px;
  align-items: center;
}
.no_border {
  border: none;
}
#form-search input[type="text"] {
  float: left;
  width: 60%;
  padding-left: 10px;
  display: inline-block;
}
#form-search button {
  float: left;
  padding: 10px 12px;
  background: #000;
  color: white;
  border: 1px solid grey;
  border-radius: 50%;
  cursor: pointer;
}
#form-search select,
input[type="text"]:focus-visible {
  outline: none;
}
.signin-block h2 {
  color: #fff;
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
#form-signin {
  display: block;
  position: absolute;
  margin: 0 auto;
  width: 500px;
  background-color: #c0c0c0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #fff;
}
.signin-cnt {
  position: relative;
  padding: 80px 100px;
}
#nav-cancel {
  position: absolute;
  top: 10px;
  right: 10px;
}
#nav-cancel path {
  fill: #fff;
}
.text-center {
  text-align: center;
}
.hr {
  background-color: #fff;
  width: 30%;
  margin: 10px auto;
  margin-bottom: 20px;
  padding: 1px 0;
  border: none;
}
#form-signin input:focus-visible {
  outline: none;
}
#form-signin input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: 1px solid #fff;
  border-radius: 15px;
  font-size: 16px;
}
#form-signin input[type="submit"] {
  width: 100%;
  background-color: #0c0c0c;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: 1px solid black;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
}
/*container*/
.container {
  height: 100%;
}
.container_wrap_main {
  display: flex;
  height: 100%;
}
.pt-50 {
  padding-top: 50px;
}
.ps-40 {
  padding-right: 40px;
  padding-left: 40px;
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
</style>
