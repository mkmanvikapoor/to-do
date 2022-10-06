<template>
  <navigation-bar></navigation-bar>
  <router-view></router-view>
  <div>
    <button
      v-on:click="dashboard"
      @click="confirmCreate"
      type="button"
      class="btn btn-lg"
    >
      Create Task
    </button>
    <button
      v-on:click="login"
      this.category="result.data[0].category;"
      @click="confirmList"
      type="submit"
      class="btn btn-lg"
    >
      Go To List
    </button>
  </div>

  <form @submit.prevent="taskcreate" class="modal-content form-control">
    <h1>Update The Task</h1>
    <div>
      <div :class="{ invalid: titleValidity === 'invalid' }">
        <label for="title"><b>TITLE</b></label>
        <input
          id="title"
          v-model.trim="title"
          type="text"
          placeholder="Enter Title"
          name="title"
          required
          @blur="validateTitle"
        />
        <p v-if="titleValidity === 'invalid'">
          <b>Please Enter Suitable Title</b>
        </p>
      </div>

      <div :class="{ invalid: remarkValidity === 'invalid' }">
        <label id="remark" for="remark"><b>REMARK</b></label>

        <input
          v-model.trim="remark"
          id="remark"
          type="text"
          @blur="validateRemark"
        />
        <p v-if="remarkValidity === 'invalid'">
          <b>Please Enter valid Remark for the task</b>
        </p>
      </div>

      <div
        id="date-picker-example"
        class="md-form md-outline input-with-post-icon datepicker"
        inline="true"
      >
        <label for="date"><b>DATE</b></label>
        <input
          v-model="date"
          type="date"
          id="datepicker"
          :onchange="checkDate"
          required
          class="datepicker-input"
        />
      </div>
      <div>
        <label id="category-label" for="category"><b>Category</b></label>
        <select id="category" name="category" v-model="category">
          <option value="office">OFFICE</option>
          <option value="home">HOME</option>
          <option value="market">MARKET</option>
        </select>
      </div>
      <button class="btn btn-success" type="button" v-on:click="updateTask">
        UPDATE TASK
      </button>
    </div>
    <div class="alert alert-success" role="alert" id="msg"></div>
    <div>
      <button class="btn btn-success" @click="redirectToList">
        Redirect To List
      </button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import NavigationBar from "../Nav/NavigationBar.vue";
export default {
  name: "Update-task",
  components: {
    NavigationBar,
  },
  data() {
    return {
      title: "",
      remark: "",
      date: "",
      status: "",
      category: "",
    };
  },
  async mounted() {
    const token = localStorage.getItem("token");
    await axios
      .get("https://to-do-list-4512824.herokuapp.com/api/category-list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        let str = "";
        for (let i = 0; i < response.data.length; i++) {
          str +=
            "<option value='" +
            response.data[i].id +
            "'>" +
            response.data[i].category +
            "</option>";
        }
        console.log(str);
        document.getElementById("category").innerHTML = str;
      });
    await axios
      .get(
        "https://to-do-list-4512824.herokuapp.com/api/task/" +
          this.$route.params.taskId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.warn(result.data);
        this.title = result.data[0].title;
        this.category = result.data[0].category;
        this.remark = result.data[0].remark;
        this.date = result.data[0].date;
        this.status = result.data[0].status;
      });
  },
  methods: {
    async updateTask() {
      await axios
        .put(
          "https://to-do-list-4512824.herokuapp.com/api/edit/" +
            this.$route.params.taskId,
          {
            title: this.title,
            remark: this.remark,
            date: this.date,
            category: this.category,
            status: this.status,
            userId: localStorage.getItem("userId"),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.code == 400) {
            document.getElementById("msg").innerHTML =
              "Oops ! There was something wrong.. Please try Again";
          } else {
            document.getElementById("msg").innerHTML =
              "Task has been updated successfully.";
          }
        });
    },
    redirectToList() {
      this.$router.push("/list");
    },
    checkDate() {
      var selectedDate = new Date(this.date);
      var dateNow = new Date();
      if (selectedDate < dateNow) {
        alert("Date must be in the future");
      }
    },
    validateTitle() {
      if (this.title === "") {
        this.titleValidity = "invalid";
      } else {
        this.titleValidity = "valid";
      }
    },
    validateRemark() {
      if (this.remark === "") {
        this.remarkValidity = "invalid";
      } else {
        this.remarkValidity = "valid";
      }
    },
  },
};
</script>


<style scoped>
.btn {
  background-color: rgb(7, 22, 22);
  color: white;
  padding: 14px 20px;
  margin: 8px 5px;
  border: none;
  cursor: pointer;
}
.btn:hover {
  background-color: rgb(47, 47, 251);
  color: white;
}
.modal-content {
  display: flex;
  margin: 5% auto 15% auto;
  border: 1px solid #888;
  width: 30%;
  height: 40%;
  box-shadow: 10px;
  background-color: rgb(197, 214, 211);
}
.modal-content button {
  margin: 10px 0 10px 0;
  padding: 5px;
  width: 40%;
}
.modal-content input {
  margin: 10px 0 10px 0;
  padding: 5px;
}
button,
input {
  margin-bottom: 40px;
}

h1 {
  font-weight: bold;
  color: brown;
  margin-bottom: 40px;
  margin-top: 40px;
}

textarea.form-control,
input[type="date"].form-control,
select {
  margin-left: 14px;
}
</style>
