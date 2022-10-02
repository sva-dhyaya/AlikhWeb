<template>
  <div>
    <div class="main">
      <div class="main_cnt">
        <div class="sec pt-50 ps-40">
          <div class="inner_sec border_blue">
            <div class="flex-40">
              <div class="user_details">
                <img
                  v-if="fileUid"
                  :ref="fileUid+'main'"
                  class="img-width"
                  :src="alikhUtils.getFileServeUrlbyId(fileUid)"
                  @click="realoadImage(fileUid+'main')"
                />
                <div v-if="uploadedFile.length !=0" class="user_details_cnt">
                  File Name : {{uploadedFile[0].name}}<br />
                  Date and Time: {{uploadedFile[0].lastModifiedDate}}<br />
                </div>
              </div>
              <v-file-input
                accept=".ai"
                label="Select a Adobe illustrator(.ai) file"
                show-size
                small-chips
                truncate-length="15"
                v-model="uploadedFile"
                outlined
                ref="uploadFile"
                @change="resumableUpload"
                >Browse</v-file-input
              >
              <!-- <button class="btn mt-10">Browse</button> -->
              <br />
              <br />
              <br />
              <v-dialog
                v-model="dialog"
                fullscreen
                :scrim="false"
                transition="dialog-bottom-transition"
              >
                <template v-slot:activator="{ props }">
                  <v-btn color="primary" dark v-bind="props">
                    Submit for Review
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Review Window</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn dark text @click="saveUploadedFile"> Save </v-btn>
                    </v-toolbar-items>
                    <v-toolbar-items>
                      <v-btn dark text @click="dsicardUploadedFile">
                        Discard
                      </v-btn>
                    </v-toolbar-items>
                  </v-toolbar>

                  <v-form ref="reviewForm">
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="4">
                          <div class="user_details">
                            <img
                              :ref="fileUid+'form'"
                              class="img-width"
                              :src="alikhUtils.getFileServeUrlbyId(fileUid)"
                              @click="realoadImage(fileUid+'form')"
                            />
                            <div class="user_details_cnt">
                              File Name : {{uploadedFile[0].name}}<br />
                              Date and Time: {{uploadedFile[0].lastModifiedDate}}<br />
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-textarea
                            v-model="metadata.description"
                            label="Description"
                            filled
                            readonly
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="metadata.category.value"
                            label="Category"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="metadata.industry_type.value"
                            label="Industry"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="isCharacter.value"
                            label="With Character"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          v-if="isCharacter.value == 'Yes'"
                          cols="12"
                          md="4"
                        >
                          <v-text-field
                            v-model="metadata.character_info.primary.value"
                            label="Primary Character"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          v-if="isCharacter.value == 'Yes'"
                          cols="12"
                          md="4"
                        >
                          <v-text-field
                            v-model="metadata.character_info.secondary.value"
                            label="Secondary Character"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="metadata.langauge.value"
                            label="Language"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="metadata.location.value"
                            label="Location"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          v-if="isCharacter.value == 'Yes'"
                          cols="12"
                          md="4"
                        >
                          <v-text-field
                            v-model="metadata.age.value"
                            label="Age"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          v-if="isCharacter.value == 'Yes'"
                          cols="12"
                          md="4"
                        >
                          <v-text-field
                            v-model="metadata.ethnicity.value"
                            label="Ethnicity"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          v-if="isCharacter.value == 'Yes'"
                          cols="12"
                          md="4"
                        >
                          <v-text-field
                            v-model="metadata.look.value"
                            label="Look"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="metadata.continental.value"
                            label="Continental"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="metadata.bg_color.value"
                            label="BG Colours"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          v-if="isCharacter.value == 'Yes'"
                          cols="12"
                          md="4"
                        >
                          <v-text-field
                            v-model="metadata.emojis.value"
                            label="Emoji"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="metadata.country.value"
                            label="Country"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          v-if="isCharacter.value == 'Yes'"
                          cols="12"
                          md="4"
                        >
                          <v-text-field
                            v-model="metadata.character_posture.value"
                            label="Character Posture"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          v-if="isCharacter.value == 'Yes'"
                          cols="12"
                          md="4"
                        >
                          <v-text-field
                            v-model="metadata.character_colour.value"
                            label="Character Colors"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="metadata.custom_tag_1"
                            label="Custom Tag 1"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="metadata.custom_tag_2"
                            label="Custom Tag 2"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="metadata.custom_tag_3"
                            label="Custom Tag 3"
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card>
              </v-dialog>
              <div v-if="openReview" id="review">
                <div class="review_user_details">
                  <div class="review_inner">
                    <img
                      :ref="fileUid+'form'"

                      class="img-width"
                      :src="alikhUtils.getFileServeUrlbyId(fileUid)"
                      @click="realoadImage(fileUid+'form')"
                    />
                  </div>
                  <div class="review_inner">
                    File Name : <br />
                    Date and Time: <br />
                    Uploaded User:
                  </div>
                </div>
                <div class="review_details_cnt">
                  <ol>
                    <li>Category</li>
                    <li>Industry</li>
                    <li>With/without Character</li>
                    <li>Character Type</li>
                    <li>Language Type</li>
                    <li>Location Type</li>
                    <li>Age Group</li>
                    <li>Ethnicity Type</li>
                    <li>Look Type</li>
                    <li>Continental</li>
                    <li>BG Colours</li>
                    <li>Emoji</li>
                    <li>Country</li>
                    <li>Character Posture</li>
                    <li>Character Colours</li>
                    <li>Custom Tag</li>
                    <li>Custom Tag</li>
                    <li>Custom Tag</li>
                  </ol>
                </div>
                <div style="float: right">
                  <button class="btn mt-10">Submit for Approval</button>
                  <a class="close"><button class="btn mt-10">Cancel</button></a>
                </div>
              </div>
            </div>
            <div class="flex-60">
              <div id="upload_form">
                <div class="ques">
                  <p>Description</p>
                  <v-textarea
                    filled
                    v-model="metadata.description"
                  ></v-textarea>
                </div>
                <div class="ques">
                  <p>Category</p>
                  <v-select
                    v-model="metadata.category"
                    :items="metadataDropdowns.categoryItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>
                <div class="ques">
                  <p>Industry</p>
                  <v-select
                    v-model="metadata.industry_type"
                    :items="metadataDropdowns.industryItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>
                <div class="ques">
                  <p>With Character</p>
                  <v-select
                    v-model="isCharacter"
                    :items="isCharacterItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>

                <div v-if="isCharacter.value == 'Yes'" class="ques">
                  <p>Primary Character</p>
                  <v-select
                    v-model="metadata.character_info.primary"
                    :items="metadataDropdowns.CharaterItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>

                <div v-if="isCharacter.value == 'Yes'" class="ques">
                  <p>Secondary Character</p>
                  <v-select
                    v-model="metadata.character_info.secondary"
                    :items="secondayCharaterItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>

                <div class="ques">
                  <p>Language</p>
                  <v-select
                    v-model="metadata.langauge"
                    :items="metadataDropdowns.langaugeItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>
                <div class="ques">
                  <p>Location</p>
                  <v-select
                    v-model="metadata.location"
                    :items="metadataDropdowns.locationItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>
                <div v-if="isCharacter.value == 'Yes'" class="ques">
                  <p>Age</p>
                  <v-select
                    v-model="metadata.age"
                    :items="metadataDropdowns.ageItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>
                <div v-if="isCharacter.value == 'Yes'" class="ques">
                  <p>Ethnicity</p>
                  <v-select
                    v-model="metadata.ethnicity"
                    :items="metadataDropdowns.ethnicityItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>
                <div v-if="isCharacter.value == 'Yes'" class="ques">
                  <p>Look</p>
                  <v-select
                    v-model="metadata.look"
                    :items="metadataDropdowns.lookItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>
                <div class="ques">
                  <p>Continental</p>
                  <v-select
                    v-model="metadata.continental"
                    :items="metadataDropdowns.continentalItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>
                <div class="ques">
                  <p>BG Colours</p>
                  <v-select
                    v-model="metadata.bg_color"
                    :items="metadataDropdowns.bg_colorItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>
                <div v-if="isCharacter.value == 'Yes'" class="ques">
                  <p>Emoji</p>
                  <v-select
                    v-model="metadata.emojis"
                    :items="metadataDropdowns.emojisItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>
                <div class="ques">
                  <p>Country</p>
                  <v-select
                    v-model="metadata.country"
                    :items="metadataDropdowns.countryItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>
                <div v-if="isCharacter.value == 'Yes'" class="ques">
                  <p>Character Posture</p>
                  <v-select
                    v-model="metadata.character_posture"
                    :items="metadataDropdowns.character_postureItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>
                <div v-if="isCharacter.value == 'Yes'" class="ques">
                  <p>Character Colors</p>
                  <v-select
                    v-model="metadata.character_colour"
                    :items="metadataDropdowns.character_colourItems"
                    item-title="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </div>
                <div class="ques">
                  <p>Custom Tag</p>
                  <v-text-field
                    v-model="metadata.custom_tag_1"
                    label="Custom Tag 1"
                    filled
                  ></v-text-field>
                </div>
                <div class="ques">
                  <p>Custom Tag</p>
                  <v-text-field
                    v-model="metadata.custom_tag_2"
                    label="Custom Tag 2"
                    filled
                  ></v-text-field>
                </div>
                <div class="ques">
                  <p>Custom Tag</p>
                  <v-text-field
                    v-model="metadata.custom_tag_3"
                    label="Custom Tag 3"
                    filled
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import alikhUtils from "@/alikh.utils";
import FileUploader from "@/plugins/fileUploader";
import { mapActions, mapGetters } from "vuex";

export default {
  //   watch:{
  //     "metadata.character_info.primary.value":function(newval,oldval){
  //         if (newval!=oldval){
  //             this.secondayCharaterItems = this.CharaterItems.filter((char)=>char.value!=newval)
  //         }
  //     }
  //   },
  computed: {
    ...mapGetters("files", ["metadataDropdowns"]),
    secondayCharaterItems() {
      let primaryCharVal = `${this.metadata.character_info.primary.value}`;
      return this.metadataDropdowns.CharaterItems.filter((char) => char.value != primaryCharVal);
    },
  },
  methods: {
    parseMetadata(){
      for (const key of Object.keys(this.metadata)) {
        if (key == "character_info" && this.isCharacter.value == "Yes"){
          this.metadata.character_info.primary = this.metadata.character_info.primary.value
          this.metadata.character_info.secondary = this.metadata.character_info.secondary.value
        }else{
          delete this.metadata.character_info
        }
        if (["description","custom_tag_1","custom_tag_2","custom_tag_3","character_info"].includes(key)){
          continue
        }
        this.metadata[key] = [this.metadata[key].value]
      }
    },
    saveUploadedFile() {
      this.dialog = false;
      let payload = {
        _id: this.fileUid,
        metadata:{},
        is_character: this.isCharacter.value == 'Yes'?true:false
      }
      this.parseMetadata()
      Object.assign(payload.metadata, this.metadata)
      this.updateFile(payload).then((data)=>{
        if(data.httpSuccess){
          alikhUtils.successToast(`${this.uploadedFile[0].name} Successfully Uploaded`)
        }else{
          alikhUtils.failToast(`Failed to Upload ${this.uploadedFile[0].name}`)
        }
      })
    },
    dsicardUploadedFile() {
      this.dialog = false;
      let payload = {
        _id: this.fileUid,
      }
      this.removeFile(payload).then((data)=>{
            if(data.httpSuccess){
              alikhUtils.successToast(`File Discarded`)
            }else{
              alikhUtils.failToast(`Failed to Discard file`)
            }
            this.fileUid = null
          })
    },
    openReviewWindow() {
      this.openReview = true;
    },
    resumableUpload(){
      for (let i = 0; i < this.$refs.uploadFile.files.length; i++) {
        this.fileUid = alikhUtils.getUUID()
        this.filesInfo[this.fileUid] = new FileUploader(this.$refs.uploadFile.files[i], "/opt/STORAGE", this.fileUid)
      }
    },
    realoadImage(refId){
      let image = this.$refs[refId]
      image.src = alikhUtils.getFileServeUrlbyId(this.fileUid) + `?${new Date().getTime()}`
    },
    ...mapActions("files", ["createFile", "updateFile", "removeFile"]),

  },
  data() {
    return {
      alikhUtils,
      fileUid: null,
      uploadedFile: [],
      filesInfo:{},
      openReview: false,
      isCharacter: { value: "No" },
      metadata: { character_info: { primary: {value:"Male"}, secondary: {value: "Female" }} },
      isCharacterItems: [{ value: "Yes" }, { value: "No" }],
      //   secondayCharaterItems:[],
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
};
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
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
.btn {
  padding: 10px 25px;
  font-size: 18px;
  border-radius: 10px;
  background-color: #6ad8b0;
  border: none;
  color: #fff;
}
.container {
  height: 100%;
}
.container_wrap_main {
  height: 100%;
}
.pt-50 {
  padding-top: 50px;
}
.ps-40 {
  padding-right: 40px;
  padding-left: 40px;
}
.ml-10 {
}
.mt-20 {
}
.sec_wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 25px;
}
.sidebar {
  width: 200px;
  height: 100%;
  position: fixed;
  background-color: #000;
  padding: 50px 20px;
}
.sidebar_menu {
  height: 70%;
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
  margin-left: 0px;
  /* width: 166%; */
}
.border_blue {
  border: 2px solid blue;
  padding: 40px 50px;
}
.inner_sec {
  margin-bottom: 20px;
}
.flex-40 {
  width: 300px;
  text-align: center;
  margin-top: 100px;
  position: fixed;
}
.flex-60 {
  margin-left: 330px;
}
#upload_form > * {
  margin: 20px 0;
}
form#upload_form .ques a {
  text-decoration: none;
}
.ques {
  background-color: #c0c4cd;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}
.cnt {
  float: right;
}
.cnt-bg {
  background: #fff;
  padding: 10px;
}
.cnt label {
  font-size: 14px;
}
.toggle {
  display: block;
}
.cnt_sel option {
  background: transparent;
  padding: 5px 10px;
}
.cnt_sel:focus-visible {
  outline: none;
}
.container {
  height: 100%;
}
.container_wrap_main {
  height: 100%;
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
.mt-10 {
  margin-top: 10px;
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
#review {
  display: none;
  position: absolute;
  margin: 0 auto;
  width: 1000px;
  top: 30%;
  left: 150%;
  transform: translate(-46%, -44%);
  background-color: #55ee01;
  padding: 50px;
  border-radius: 60px;
  text-align: left;
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
.review_details_cnt {
  padding: 10px 40px;
  line-height: 1.5;
  column-count: 3;
}
.review_inner {
  width: 40%;
}
p {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--bs-link-color);
}
</style>