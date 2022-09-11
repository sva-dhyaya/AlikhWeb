<template>
  <div>
    <v-list>
      <v-list-item>
        <v-text-field
            label="Search"
            prepend-inner-icon="mdi-magnify"
            clear-icon="mdi-close-circle"
            clearable
            @click:prepend-inner="getFilesFromServer"
            @click:clear="clearSearch"
            v-model="search"
          ></v-text-field>
      </v-list-item>  
    <v-list-item>
    <v-item-group>
      <v-container>
        <v-row dense>
          <v-col class="mr-12 mb-12" v-for="file in files" :key="file._id">
            <v-card class="mx-auto vcard_scroll" width="238px" height="380px">
              <v-img
                class="align-end text-white"
                height="200"
                :src="alikhUtils.getFileServeUrl(file.thumbnail_path)"
                cover
              >
                <v-card-title>{{
                  alikhUtils.capitalizeFirstLetter(file.name)
                }}</v-card-title>
              </v-img>

              <v-card-subtitle v-if="file.metadata.description" class="pt-4">
                {{ file.metadata.description }}
              </v-card-subtitle>

              <v-chip v-for="tag in getTags(file)" :key="tag._id" class="ma-2">
                {{ tag.val }}
              </v-chip>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <div class="text-center">
      <v-pagination
        v-if="totalPages > 0"
        v-model="page"
        :length="totalPages"
        :total-visible="5"
        color="#000000"
        circle
      ></v-pagination>
    </div>
  </v-list-item>
  </v-list>
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
      search:null
    };
  },
  watch: {
    page(newval, oldval) {
      if (newval != oldval) {
        this.nextPage();
      }
    },
    search(newval, oldval) {
      if (newval && (newval != oldval)) {
        if (newval.length >2){
          this.page=1
          this.getFilesFromServer();
        }
      }
    },
  },
  methods: {
    clearSearch(){
      this.search=null
      this.getFilesFromServer()
    },
    getTags(file) {
      let tags = [];
      for (const key of Object.keys(file.metadata)) {
        if (
          [
            "description",
            "custom_tag_1",
            "custom_tag_2",
            "custom_tag_3",
            "character_info",
          ].includes(key)
        ) {
          continue;
        }
        if (file.metadata[key][0]) {
          tags.push({ _id: `${key}-${file._id}`, val: file.metadata[key][0] });
        }
      }
      return tags;
    },
    getFilesFromServer() {
      this.getFiles({ params: { page: this.page, globalSearch:this.search } }).then((data) => {
        if (data.httpSuccess) {
          this.files = data.files ? data.files : [];
          this.totalPages = data.page_count;
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
      });
    },
    nextPage() {
      this.getFilesFromServer();
    },
    ...mapActions("files", ["getFiles"]),
  },
  created() {
    this.getFilesFromServer();
  },
};
</script>

<style scoped>
.vcard_scroll {
  overflow-y: scroll;
}
::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
</style>