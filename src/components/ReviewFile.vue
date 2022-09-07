<template>
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
      <tr v-for="row in tableValues.values" :key="row[0]">
        <td v-for="v in row.slice(1)" :key="v + row[0]">{{ v }}</td>
      </tr>
    </tbody>
  </v-table>
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
    "reviewsToShow.value": function(newval, oldval){
      if (newval != oldval){
        this.page = 1
        this.totalPages = -1
        this.nextPage();
      }
    }
  },
  data() {
    return {
      alikhUtils,
      reviewsToShow: { value: "Pending Files", key: "pending" },
      reviewsDropdown: [
        { value: "Pending Files", key: "pending" },
        { value: "Rejected Files", key: "rejected" },
        { value: "Approved Files", key: "approved" },
      ],
      page: 1,
      totalPages: -1,
      reviews: [],
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
              review._id,
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
              review._id,
              review.name,
              review.upload_info.user_name,
              review.upload_info.uploaded_datetime.replace("T", " "),
              review.review_status.reviewer_info.user_name,
              review.review_status.review_datetime.replace("T", " "),
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
              review._id,
              review.name,
              review.upload_info.user_name,
              review.upload_info.uploaded_datetime.replace("T", " "),
              review.review_status.reviewer_info.user_name,
              review.review_status.review_datetime.replace("T", " "),
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
    getFilesFromServer() {
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
    ...mapActions("files", ["getFiles"]),
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
</style>