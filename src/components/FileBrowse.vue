<template>
  <div>
    <ul class="thumbnail-view-ul common-view-ul">
      <li v-for="file in files" :key="file._id">
        <div>
          <div style="height: 180px; width: 220px">
            <img
              :src="alikhUtils.getFileServeUrl(file.thumbnail_path)"
              height="180"
              width="220"
              draggable="false"
            />
          </div>
          <div>
            <h5>{{ alikhUtils.capitalizeFirstLetter(file.name) }}</h5>
            <p v-if="file.metadata.description">
              {{ file.metadata.description }}
            </p>
            <v-chip
              v-for="tag in getTags(file)"
              :key="tag._id"
              class="ma-2 short"
            >
              {{ tag.val }}
            </v-chip>
          </div>
        </div>
      </li>
    </ul>
    <div class="text-center">
      <v-pagination
        v-if="totalPages>0"
        v-model="page"
        :length="totalPages"
        :total-visible="5"
        color="#000000"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import alikhUtils from "@/alikh.utils";
export default {
  data() {
    return {
      files: [],
      alikhUtils,
      page: 1,
      totalPages: -1,
    };
  },
  watch:{
    page(newval, oldval){
      if (newval != oldval){
        this.nextPage()
      }
    }
  },
  methods: {
    getTags(file) {
      let tags = [];
      for (const key of Object.keys(file.metadata)) {
        if (["description","custom_tag_1","custom_tag_2","custom_tag_3","character_info"].includes(key)) {
          continue;
        }
        if (file.metadata[key][0]) {
          tags.push({ _id: `${key}-${file._id}`, val: file.metadata[key][0] });
        }
      }
      return tags;
    },
    getFilesFromServer() {
      this.getFiles({params:{page:this.page}}).then((data) => {
        if (data.httpSuccess) {
          this.files = data.files ? data.files : [];
          this.totalPages = data.page_count;
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
      });
    },
    nextPage() {
      this.getFilesFromServer()
    },
    ...mapActions("files", ["getFiles"]),
  },
  created() {
    this.getFilesFromServer()
  },
};
</script>

<style scoped>
p {
  word-break: break-all;
  white-space: normal;
}
* {
  margin: 0;
  padding: 0 0 0 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
.short {
  width: 64px;
  font-size: 11px;
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
  overflow: hidden;
}
.thumbnail-view-ul li {
  display: inline-block;
  /* margin-right: 8%; */
  width: 25%;
  padding-left: 5px;
  padding-top: 7%;
  /* margin-top: 5px; */
  height: 300%;
}
.thumbnail-view-ul li .thumbnail-data {
  text-align: center !important;
}
.thumbnail-view-ul li .asset-thumbnail {
  height: 180px;
  width: 220px;
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