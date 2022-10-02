<template>
  <div>
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-img :src="logo"></v-img>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <template v-for="link in links" :key="link.text">
          <v-list-item
            v-if="!link.subLinks && link.type == 'route'"
            :to="link.to"
            class="ml-5"
            :prepend-icon="link.icon"
            :title="link.text"
            :value="link.text"
          ></v-list-item>
          <v-list-item
            v-else-if="!link.subLinks && link.type == 'function'"
            @click="link.func($event, link.text)"
            class="ml-5"
            :prepend-icon="link.icon"
            :title="link.text"
            :value="link.text"
          ></v-list-item>
          <v-list-group :value="true" no-action v-else-if="link.subLinks" :key="link.text">
            <template v-slot:activator>
              <v-list-item
                class="ml-5"
                :prepend-icon="link.icon"
                :title="link.text"
                :value="link.text"
                :to="link.to"
              ></v-list-item>
            </template>
            <template v-for="slink in link.subLinks" :key="slink.text">
              <v-list-item
                v-if="slink.type == 'route'"
                :to="slink.to"
                class="ml-5"
                :prepend-icon="slink.icon"
                :title="slink.text"
                :value="slink.text"
              >
              </v-list-item>
              <v-list-item
                v-else-if="slink.type == 'function'"
                @click="slink.func($event, slink.text)"
                class="ml-5"
                :prepend-icon="slink.icon"
                :title="slink.text"
                :value="slink.text"
              ></v-list-item>
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view
        v-if="selectedComponent"
        :is="selectedComponent"
      ></router-view>
    </v-main>
  </div>
</template>

<script>
import alikhUtils from "@/alikh.utils";
import logo from "../assets/logo.jpg";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      logo,
      selectedComponent: "AlikhHome",
      links: [
        {
          to: "/alikh/dashboard",
          icon: "mdi-view-dashboard",
          text: "Dashboard",
          type: "route",
        },
        {
          to: "/alikh/files",
          icon: "mdi-folder",
          text: "Files",
          type: "route",
        },
        {
          to: "/alikh/upload",
          icon: "mdi-upload",
          text: "Upload",
          type: "route",
        },
        {
          to: "/alikh/review",
          icon: "mdi-history",
          text: "Review",
          type: "route",
        },
        {
          icon: "mdi-cog",
          text: "Settings",
          to: "/alikh/users",
          subLinks: [
            {
              icon: "mdi-account-multiple",
              text: "User Settings",
              to: "/alikh/users",
              type: "route",
            },
          ],
        },

        {
          to: "/alikh/bin",
          icon: "mdi-delete-empty",
          text: "Bin",
          type: "route",
        },
        {
          icon: "mdi-logout",
          text: "Logout",
          type: "function",
          func: this.logout,
        },
      ],
    };
  },
  methods: {
    changeComponent(event, compName) {
      if (event != null) {
        event.stopImmediatePropagation();
      }
      this.selectedComponent = compName;
    },
    logout(event) {
      if (event != null) {
        event.stopImmediatePropagation();
      }
      alikhUtils.unsetLoginCookie();
      this.$router.push({ name: "home" });
    },
    ...mapActions("files",["storeDefaultMetadataDropdowns"])
  },
  created() {
    this.$router.push({ name: "dashboard" });
    this.storeDefaultMetadataDropdowns({})
  },
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

ul li {
  color: #fff;
  font-weight: bold;
}

ul li:hover {
  background-color: rgb(0, 162, 255);
}

.activePanel {
  background-color: rgb(0, 132, 255);
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