<template>
  <v-list>
    <v-list-item
      v-if="alikhUtils.getCookieValue('userInfo').user_type == 'ADMINISTRATOR'"
    >
      <div class="usercreate_class">
        <v-btn @click="OpenForCreatingUser">Create User</v-btn>
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
              @dblclick="openForEditing(row[0])"
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
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title
          >{{ selectedUser.display_name }}'s Info</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items
          v-if="
            alikhUtils.getCookieValue('userInfo')._id == this.selectedUser._id
          "
        >
          <v-btn dark text @click="EditUser" :readonly="!isPrivilegedUser()">
            Update
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-items
          v-if="
            alikhUtils.getCookieValue('userInfo').user_type ==
              'ADMINISTRATOR' && creating
          "
        >
          <v-btn
            dark
            text
            @click="createNewUser"
            :readonly="!isPrivilegedUser()"
          >
            Create
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-items
          v-if="
            alikhUtils.getCookieValue('userInfo').user_type == 'ADMINISTRATOR'
          "
        >
          <v-btn dark text @click="cancelEdit"> Cancel </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-form
        v-if="Object.keys(selectedUser) != 0 || creating"
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-container>
          <v-row>
            <v-col v-if="selectedUser.username || creating" cols="12" md="4">
              <v-text-field
                v-model="selectedUser.username"
                label="User Name"
                filled
                :readonly="!creating"
              ></v-text-field>
            </v-col>

            <v-col v-if="selectedUser.password || creating" cols="12" md="4">
              <v-text-field
                v-model="selectedUser.password"
                label="Password"
                type="password"
                filled
                :readonly="!isPrivilegedUser() || !creating"
              ></v-text-field>
            </v-col>

            <v-col
              v-if="selectedUser.display_name || creating"
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="selectedUser.display_name"
                label="Display Name"
                filled
                :readonly="!isPrivilegedUser() || !creating"
              ></v-text-field>
            </v-col>

            <v-col v-if="selectedUser.user_type || creating" cols="12" md="4">
              <v-select
                v-model="selectedUser.user_type"
                :items="['ADMINISTRATOR', 'USER']"
                label="Type"
                filled
                :readonly="!creating"
              ></v-select>
            </v-col>

            <v-col v-if="selectedUser.email || creating" cols="12" md="4">
              <v-text-field
                v-model="selectedUser.email"
                label="Email"
                filled
                :readonly="!isPrivilegedUser() || !creating"
              ></v-text-field>
            </v-col>

            <v-col v-if="selectedUser.mobile || creating" cols="12" md="4">
              <v-text-field
                v-model="selectedUser.mobile"
                label="Mobile"
                filled
                :readonly="!isPrivilegedUser() || !creating"
              ></v-text-field>
            </v-col>

            <v-col
              v-if="selectedUser.last_login_time && !creating"
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="selectedUser.last_login_time"
                label="Last Login"
                filled
                readonly
              ></v-text-field>
            </v-col>

            <v-col v-if="selectedUser.logged_in && !creating" cols="12" md="4">
              <v-text-field
                v-model="selectedUser.logged_in"
                label="Is Logged In?"
                filled
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              v-if="selectedUser.created_datetime && !creating"
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="selectedUser.created_datetime"
                label="Created Date Time"
                filled
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              v-if="selectedUser.modified_datetime && !creating"
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="selectedUser.modified_datetime"
                label="Modified Date Time"
                filled
                readonly
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
  },
  data() {
    return {
      alikhUtils,
      selectedUser: {},
      valid: true,
      page: 1,
      totalPages: -1,
      users: [],
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      c_index: -1,
      creating: false,
    };
  },
  computed: {
    tableValues() {
      let tableData = { headers: [], values: [] };
      try {
        tableData.headers = [
          "User Name",
          "Display Name",
          "User Type",
          "Loggedin",
          "Last Login Time",
        ];
        for (const user of this.users) {
          tableData.values.push([
            user,
            user.username,
            user.display_name,
            user.user_type == "ADMINISTRATOR" ? "Admin" : "Normal User",
            user.logged_in ? "Yes" : "No",
            user.last_login_time ? user.last_login_time.replace("T", " ") : "-",
          ]);
        }
      } catch (error) {
        console.error("tableValues--->Exception", error);
      }
      return tableData;
    },
  },
  methods: {
    theadMouseHover() {
      this.c_index = 100;
    },
    theadMouseLeave() {
      this.c_index = -1;
    },
    isPrivilegedUser() {
      return (
        alikhUtils.getCookieValue("userInfo").user_type == "ADMINISTRATOR" ||
        alikhUtils.getCookieValue("userInfo")._id == this.selectedUser.user_id
      );
    },
    openForEditing(user) {
      Object.assign(this.selectedUser, user);
      this.dialog = true;
      this.creating = false;
    },
    OpenForCreatingUser() {
      this.selectedUser = {};
      this.creating = true;
      this.dialog = true;
    },
    EditUser() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        this.creating = false;
        this.editUserInServer(this.selectedUser).then((data) => {
          if (data.httpSuccess) {
            alikhUtils.successToast(`Updated ${this.selectedUser.username}`);
            this.getUsers();
          }
        });
      }
    },
    createNewUser() {
      this.dialog = false;
      this.creating = false;
      this.createUserInServer(this.selectedUser).then((data) => {
        if (data.httpSuccess) {
          alikhUtils.successToast(`Created ${this.selectedUser.username}`);
          this.getUsers();
        }
      });
    },
    cancelEdit() {
      this.dialog = false;
      this.creating = false;
    },
    getUsers() {
      this.selectedUser = {};
      this.getUsersFromServer({
        params: {
          limit: 10,
          page: this.page,
        },
      }).then((data) => {
        if (data.httpSuccess) {
          this.users = data.users ? data.users : [];
          this.totalPages = data.page_count;
        }
      });
    },
    nextPage() {
      this.getUsers();
    },
    ...mapActions("users", [
      "createUserInServer",
      "editUserInServer",
      "getUsersFromServer",
    ]),
  },
  created() {
    this.getUsers();
  },
};
</script>
 <style scoped>
.usercreate_class {
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