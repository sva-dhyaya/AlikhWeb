<template>
   <v-list>
    <v-list-item>
  <div class="review_class">
    <v-select
      v-model="reviewsToShow"
      :items="reviewsDropdown"
      item-title="value"
      label="Select"
      persistent-hint
      return-object
      single-line
    >
    </v-select>
  </div>
</v-list-item>
<v-list-item>
  <v-table fixed-header height="100%">
    <thead>
      <tr>
        <th
          v-for="header in tableValues.headers"
          :key="header"
          class="text-left"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in tableValues.values" :key="row[0]._id">
        <td
          v-for="v in row.slice(1)"
          :key="v + row[0]._id"
          @dblclick="openForReview(row[0])"
        >
          {{ v }}
        </td>
      </tr>
    </tbody>
  </v-table>
</v-list-item>
</v-list>
  <v-dialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <!-- <template v-slot:activator="{ props }">
      <v-btn color="primary" dark v-bind="props"> Submit for Review </v-btn>
    </template> -->
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Review Window</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="alikhUtils.getCookieValue('userInfo')._id == this.selectedFile.upload_info?this.selectedFile.upload_info.user_id:null">
          <v-btn dark text @click="updateFileMetatda"> Update Metatda </v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-if="alikhUtils.getCookieValue('userInfo').user_type =='ADMINISTRATOR'">
          <v-btn  dark text @click="ApproveFile"> Approve </v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-if="alikhUtils.getCookieValue('userInfo').user_type =='ADMINISTRATOR'">
          <v-btn dark text @click="RejectFile"> Reject </v-btn>
        </v-toolbar-items>
        
      </v-toolbar>

      <v-form v-if="Object.keys(selectedFile) != 0" ref="reviewForm">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <div class="user_details">
                <img
                  class="img-width"
                  :src="alikhUtils.getFileServeUrl(selectedFile.thumbnail_path)"
                />
                <div class="user_details_cnt">
                  File Name : {{ selectedFile.name }}<br />
                  Date and Time: {{ selectedFile.created_datetime }}<br />
                  Uploaded User: {{ selectedFile.upload_info.user_name }}<br />
                </div>
              </div>
            </v-col>
            <v-col v-if="alikhUtils.getCookieValue('userInfo').user_type =='ADMINISTRATOR'" cols="12" md="4">
              <v-textarea
                v-model="selectedFile.review_status.comments"
                label="Review Comments"
                filled
              ></v-textarea>
            </v-col>
            <v-col v-if="selectedFile.metadata.description" cols="12" md="4">
              <v-textarea
                v-model="selectedFile.metadata.description"
                label="Description"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-textarea>
            </v-col>
            <v-col v-if="selectedFile.metadata.category" cols="12" md="4">
              <v-text-field
                v-model="selectedFile.metadata.category[0]"
                label="Category"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col v-if="selectedFile.metadata.industry_type" cols="12" md="4">
              <v-text-field
                v-model="selectedFile.metadata.industry_type[0]"
                label="Industry"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col
              v-if="
                selectedFile.metadata.character_info &&
                selectedFile.metadata.character_info.primary
              "
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="selectedFile.metadata.character_info.primary"
                label="Primary Character"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col
              v-if="
                selectedFile.metadata.character_info &&
                selectedFile.metadata.character_info.secondary
              "
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="selectedFile.metadata.character_info.secondary"
                label="Secondary Character"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col v-if="selectedFile.metadata.langauge" cols="12" md="4">
              <v-text-field
                v-model="selectedFile.metadata.langauge[0]"
                label="Language"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col v-if="selectedFile.metadata.location" cols="12" md="4">
              <v-text-field
                v-model="selectedFile.metadata.location[0]"
                label="Location"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col v-if="selectedFile.metadata.age" cols="12" md="4">
              <v-text-field
                v-model="selectedFile.metadata.age[0]"
                label="Age"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col v-if="selectedFile.metadata.ethnicity" cols="12" md="4">
              <v-text-field
                v-model="selectedFile.metadata.ethnicity[0]"
                label="Ethnicity"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col v-if="selectedFile.metadata.look" cols="12" md="4">
              <v-text-field
                v-model="selectedFile.metadata.look[0]"
                label="Look"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col v-if="selectedFile.metadata.continental" cols="12" md="4">
              <v-text-field
                v-model="selectedFile.metadata.continental[0]"
                label="Continental"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col v-if="selectedFile.metadata.bg_color" cols="12" md="4">
              <v-text-field
                v-model="selectedFile.metadata.bg_color[0]"
                label="BG Colours"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col v-if="selectedFile.metadata.emojis" cols="12" md="4">
              <v-text-field
                v-model="selectedFile.metadata.emojis[0]"
                label="Emoji"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col v-if="selectedFile.metadata.country" cols="12" md="4">
              <v-text-field
                v-model="selectedFile.metadata.country[0]"
                label="Country"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col
              v-if="selectedFile.metadata.character_posture"
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="selectedFile.metadata.character_posture[0]"
                label="Character Posture"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col
              v-if="selectedFile.metadata.character_colour"
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="selectedFile.metadata.character_colour[0]"
                label="Character Colors"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col v-if="selectedFile.metadata.custom_tag_1" cols="12" md="4">
              <v-text-field
                v-model="selectedFile.metadata.custom_tag_1"
                label="Custom Tag 1"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col v-if="selectedFile.metadata.custom_tag_2" cols="12" md="4">
              <v-text-field
                v-model="selectedFile.metadata.custom_tag_2"
                label="Custom Tag 2"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
            <v-col v-if="selectedFile.metadata.custom_tag_3" cols="12" md="4">
              <v-text-field
                v-model="selectedFile.metadata.custom_tag_3"
                label="Custom Tag 3"
                filled
                :readonly="
                  !isValidReviewer()
                "
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
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
</template>
  <script>
import { mapActions } from "vuex";
import alikhUtils from "@/alikh.utils";
export default {
  watch: {
    page(newval, oldval) {
      if (newval != oldval) {
        this.nextPage();
      }
    },
    "reviewsToShow.value": function (newval, oldval) {
      if (newval != oldval) {
        this.page = 1;
        this.totalPages = -1;
        this.nextPage();
      }
    },
  },
  data() {
    return {
      alikhUtils,
      selectedFile: {},
      reviewsToShow: { value: "Pending Files", key: "pending" },
      reviewsDropdown: [
        { value: "Pending Files", key: "pending" },
        { value: "Rejected Files", key: "rejected" },
        { value: "Approved Files", key: "approved" },
      ],
      page: 1,
      totalPages: -1,
      reviews: [],
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
  computed: {
    tableValues() {
      let tableData = { headers: [], values: [] };
      try {
        if (this.reviewsToShow.key == "pending") {
          tableData.headers = ["File Name", "Submitted By", "Submitted Date"];
          for (const review of this.reviews) {
            tableData.values.push([
              review,
              review.name,
              review.upload_info.user_name,
              review.upload_info.uploaded_datetime.replace("T", " "),
            ]);
          }
        } else if (this.reviewsToShow.key == "rejected") {
          tableData.headers = [
            "File Name",
            "Submitted By",
            "Submitted Date",
            "Reviewed By",
            "Rejected Date",
            "Review Comments",
          ];
          for (const review of this.reviews) {
            tableData.values.push([
              review,
              review.name,
              review.upload_info.user_name,
              review.upload_info.uploaded_datetime?review.upload_info.uploaded_datetime.replace("T", " "):"",
              review.review_status.reviewer_info.user_name,
              review.review_status.review_datetime?review.review_status.review_datetime.replace("T", " "):"",
              review.review_status.comments,
            ]);
          }
        } else if (this.reviewsToShow.key == "approved") {
          tableData.headers = [
            "File Name",
            "Submitted By",
            "Submitted Date",
            "Reviewed By",
            "Approved Date",
            "Review Comments",
          ];
          for (const review of this.reviews) {
            tableData.values.push([
              review,
              review.name,
              review.upload_info.user_name,
              review.upload_info.uploaded_datetime?review.upload_info.uploaded_datetime.replace("T", " "):"",
              review.review_status.reviewer_info.user_name,
              review.review_status.review_datetime?review.review_status.review_datetime.replace("T", " "):"",
              review.review_status.comments,
            ]);
          }
        }
      } catch (error) {
        console.error("tableValues--->Exception", error);
      }

      return tableData;
    },
  },
  methods: {
    isValidReviewer(){
      return (alikhUtils.getCookieValue('userInfo').user_type =='ADMINISTRATOR')||(alikhUtils.getCookieValue('userInfo')._id == this.selectedFile.upload_info?this.selectedFile.upload_info.user_id:null)
    },
    openForReview(file) {
      Object.assign(this.selectedFile, file);
      this.dialog = true;
    },
    ApproveFile() {
      this.dialog = false;
      this.selectedFile.status = "approved"
      this.selectedFile.review_status.reviewer_info = {user_id: alikhUtils.getCookieValue('userInfo')._id, user_name: alikhUtils.getCookieValue('userInfo').username}
      this.updateFile(this.selectedFile).then((data)=>{
        if (data.httpSuccess) {
          alikhUtils.successToast(`Approved ${this.selectedFile.name}`)
          this.getFilesFromServer()

        }
      })
    },
    RejectFile() {
      this.dialog = false;
      this.selectedFile.status = "rejected"
      this.selectedFile.review_status.reviewer_info = {user_id: alikhUtils.getCookieValue('userInfo')._id, user_name: alikhUtils.getCookieValue('userInfo').username}
      this.updateFile(this.selectedFile).then((data)=>{
        if (data.httpSuccess) {
          alikhUtils.successToast(`Rejected ${this.selectedFile.name}`)
          this.getFilesFromServer()

        }
      })
    },
    updateFileMetatda(){
      this.dialog = false;
      this.updateFile(this.selectedFile).then((data)=>{
        if (data.httpSuccess) {
          alikhUtils.successToast(`Updated ${this.selectedFile.name}`)
          this.getFilesFromServer()
        }
      })
    },
    getFilesFromServer() {
      this.selectedFile = {};
      this.getFiles({
        params: {
          limit: 10,
          page: this.page,
          query: { status: this.reviewsToShow.key },
        },
      }).then((data) => {
        if (data.httpSuccess) {
          this.reviews = data.files ? data.files : [];
          this.totalPages = data.page_count;
        }
      });
    },
    nextPage() {
      this.getFilesFromServer();
    },
    ...mapActions("files", ["getFiles","updateFile"]),
  },
  created() {
    this.getFilesFromServer();
  },
};
</script>
<style scoped>
.review_class {
  position: absolute;
  top: 0px;
  right: 0px;
}
.review_user_details {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
}
.img-width {
  width: 60%;
}
.user_details_cnt {
  text-align: left;
}
</style>