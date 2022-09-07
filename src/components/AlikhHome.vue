<template>
  <div>
    <div class="main">
      <div class="main_cnt">
        <div v-for="review in reviews" :key="review.user_id" id="home" class="sec pt-50 ps-40">
          <div class="home_cnt pt-50 ps-40">
			<h1>{{capitalize(review.display_name)}}'s Info</h1>
            <ul>
              <li id="app_files" class="home_cnt_list active">
                <p>Approved Files</p>
                <p>{{review.approved_files}}</p>
              </li>
              <li id="rej_files" class="home_cnt_list">
                <p>Rejected Files</p>
                <p>{{review.rejected_files}}</p>
              </li>
              <li id="pending_files" class="home_cnt_list">
                <p>Pending Files</p>
                <p>{{review.pending_files}}</p>
              </li>
              <li id="upload_files" class="home_cnt_list">
                <p>Total Uploaded Files</p>
                <p>{{review.total_files}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from "../alikh.utils.js"
import {mapActions} from "vuex"

export default {
	data(){
		return{
			reviews:[]
		}
	},
	methods:{
		capitalize(string){
			return Utils.capitalizeFirstLetter(string)
		},
		...mapActions("reviews",["getReviewDashboardData"])
	},
    created(){
		this.getReviewDashboardData({}).then((data)=>{
			if (data.httpSuccess){
				this.reviews = data.file_reviews
			}
		})
	}
}
</script>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Roboto', sans-serif;
}
html, body {
  margin:0px;
  height:100%;
}
h1{
	font-size: 40px;
}
h2{
	font-size: 36px;
}
h3{
	font-size: 28px;
}
h4{
	font-size: 26px;
}
h5{
	font-size: 20px;
	margin-bottom: 8px;
}
h6{
	font-size: 18px;
}
p{
	font-size: 14px;
	font-weight: 300;
	margin-bottom: 8px;
}
.container {
	height: 100%;
}
.container_wrap_main{
	height: 100%;
}
.pt-50 {
	padding-top: 50px;
}
.ps-40{
	padding-right: 40px;
	padding-left: 40px;
}
.ml-10{
	/* margin-left: 10px; */
}
.mt-20{
	margin-top:20px;
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
.card_cnt{
	padding: 10px 15px;
}
.img_round {
	width: 100%;
}
.card_border{
	border: 1px solid #efefef;
}
/* sidebar */

.sidebar {
	width: 200px;
    height: 100%;
    position: fixed;
    background-color: #000;
    padding: 50px 20px;
}
.sidebar_menu{
    height: 70%;
    padding-top: 50px;
}
.sidebar_menu ul li{
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

.main{
	/* margin-left: 0; */
}
.border_blue {
	border: 2px solid blue;
	padding: 40px 50px;
}
.home_cnt {
	border: 1px solid blue;
	border-radius: 25px;
	padding: 35px 60px;
	/* margin: 40px 15%; */
	width: 160%;
	background-color: #4873cf;
}
.home_cnt li{
	list-style: none;
	padding: 20px;	
}
.home_cnt_list{
	margin: 2px 0;
	display: flex;
	justify-content: space-between;
}
#app_files {
	background-color: #56b32e;
}
#rej_files {
	background-color: #f6b32e;
}
#pending_files {
	background-color: #f3d72e;
}
#upload_files {
	background-color: #f6f3fe;
}
</style>