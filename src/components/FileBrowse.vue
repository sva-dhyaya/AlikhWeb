<template>
  <div>
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
    <ul v-if="false" class="thumbnail-view-ul common-view-ul">
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
        v-if="totalPages > 0"
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
  watch: {
    page(newval, oldval) {
      if (newval != oldval) {
        this.nextPage();
      }
    },
  },
  methods: {
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
      this.getFiles({ params: { page: this.page } }).then((data) => {
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