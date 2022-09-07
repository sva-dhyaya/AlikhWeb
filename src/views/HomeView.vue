<template>
  <LoginPage />
</template>

<script>
// Components
import LoginPage from '../components/LoginPage.vue';
import alikhUtils from '@/alikh.utils';

export default {
  name: 'HomeView',
  data(){
    return{
      showLogin:false
    }
  },
  components: {
    LoginPage,
  },
  created(){
    if (alikhUtils.getCookieValue("userId")){
      this.$router.push({"name":"alikh"})
    }else{
      this.showLogin = true
    }
  }

};
</script>
