<template>
  <div>
    <ul class="thumbnail-view-ul common-view-ul">
      <li  v-for="file in files" :key="file._id">
        <div>
          <div style="height:93px; width: 160px;">
            <img :src="alikhUtils.getFileServeUrl(file.thumbnail_path)" height="93" width="160" draggable="false"/>
          </div>
          <div>
            <h5>{{alikhUtils.capitalizeFirstLetter(file.name)}}</h5>
            <v-chip v-for="tag in getTags(file)" :key="tag._id" class="ma-2 short">
                Tag-220
            </v-chip>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import alikhUtils from "@/alikh.utils";
export default {
  data() {
    return {
      files: [],
      alikhUtils
    };
  },
  methods: {
    getTags(file){
        return []
    },
    ...mapActions("files", ["getFiles"]),
  },
  created() {
    this.getFiles({}).then((data) => {
      if (data.httpSuccess) {
        this.files = data.files ? data.files : [];
      }
    });
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0 0 0 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
.short {
    width:64px;
    font-size:11px
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
.thumbnail-view-ul {
  list-style-type: none;
  display: inline-flex;
  flex-wrap: wrap;
  padding: 0px;
  margin-top: 0px;
  width: 170%;
  padding-left: 20px;
  justify-content: left;
  overflow:hidden;
}
.thumbnail-view-ul li {
  display: inline-block;
  margin-right: 10px;
  width: 174px;
  padding-left: 5px;
  margin-top: 5px;
  height: 300%;
}
.thumbnail-view-ul li .thumbnail-data {
  text-align: center !important;
}
.thumbnail-view-ul li .asset-thumbnail {
  height: 93px;
  width: 160px;
  border-radius: 7px;
  margin-top: 8px;
  position: relative;
}

.thumbnail-view-ul li .asset-thumbnail img {
    width: 100%;
    height: 100%;
    border-radius: 7px;
  }
</style>