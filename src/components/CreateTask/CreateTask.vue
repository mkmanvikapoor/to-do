<template>
  <the-header></the-header>
  <navigation-bar></navigation-bar>
  <router-view></router-view>
  <div>
    <button
      v-on:click="login"
      this.category="result.data[0].category;"
      @click="confirmList"
      type="submit"
      class="btn btn-lg"
    >
      Go To List
    </button>
    <button @click="redirectToDashboard" class="btn btn-lg">Dashboard</button>
  </div>

  <form @submit.prevent="taskcreate" class="modal-content">
    <h1>ADD TO DO</h1>
    <h2>Create Task by filling the details</h2>
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
        id="date-picker"
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
        <label for="category"><b>Category</b></label>
        <select id="category" name="category" v-model="category">
          <option value="office">OFFICE</option>
          <option value="home">HOME</option>
          <option value="market">MARKET</option>
        </select>
      </div>
      <div>
        <button @click="add" class="btn btn-lg">Create Task</button>
      </div>

      <div>
        <button @click="view" class="btn btn-lg">View Task List</button>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
import NavigationBar from "../Nav/NavigationBar.vue";
import TheHeader from "../Layout/TheHeader.vue";
export default {
  emits: ["save-data"],
  name: "CreateTask",
  component: {
    NavigationBar,
    TheHeader,
  },
  data() {
    return {
      title: "",
      remark: "",
      date: "",
      category: "",
      userId: localStorage.getItem("userId"),
      status: "",
      titleValidity: "pending",
      remarkValidity: "pending",
    };
  },
  async mounted() {
    await axios
      .get("https://to-do-list-4512824.herokuapp.com/api/category-list", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
    console.log("mounted");
  },
  methods: {
    async add() {
      console.log(
        "CreateTask",
        this.title,
        this.remark,
        this.date,
        this.status,
        this.userId
      );
      let token = localStorage.getItem("token");
      console.log(token);
      let userId = localStorage.getItem("userId");
      console.log(userId);

      let result = await axios.post(
        "https://to-do-list-4512824.herokuapp.com/api/add-task",

        {
          title: this.title,
          remark: this.remark,
          date: this.date,
          category: this.category,
          userId: this.userId,
          status: 0,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(result);
      console.log(token);
      console.log(userId);

      console.log("Task Created Successfully");
      if (result.data.code == 201) {
        alert("Task has been Created");
        document.getElementById("title").value = "";
      }
    },
    confirmList() {
      this.$router.push("/list");
    },
    confirmCreate() {
      this.$router.push("/createtask");
    },
    checkDate() {
      var selectedDate = new Date(this.date);
      var dateNow = new Date();
      if (selectedDate < dateNow) {
        alert("Date must be in the future");
      }
    },

    taskcreate() {
      const taskData = {
        title: this.title,
        remark: this.remark,
        date: this.date,
        status: this.status,
        id: this.userId,
      };
      this.$emit("save-data", taskData);
      console.log(taskData);
    },
    view() {
      this.$router.push("/list");
    },
    validateTitle() {
      if (this.title === "") {
        this.titleValidity = "invalid";
      } else {
        this.titleValidity = "valid";
      }
    },
    redirectToDashboard() {
      this.$router.push("/dashboard");
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

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

div.input.invalid input {
  border-color: red;
}

div.input.invalid label {
  color: red;
}

div.input.invalid label p {
  color: red;
}

h1 h2 {
  text-align: center;
  align-items: center;
}

input[type="text"],
input[type="password"],
input[type="number"],
input[type="date"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

.signuplogo img {
  justify-content: center;
  width: 5vw;
  height: 5vw;
  align-items: center;
  margin: 1rem;
}
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

.container {
  padding: 16px;
}

.modal-content {
  display: flex;
  margin: 5% auto 15% auto;
  border: 1px solid #888;
  width: 80%;
  width: 30%;
  height: 30%;
  box-shadow: 10px;
  background-color: rgb(197, 214, 211);
}
.modal-content button {
  margin: 10px 0 10px 0;
  padding: 5px;
  width: 40%;
}
.modal-content input {
  margin: 10px 10px 10px 0px;
  padding: 5px;
}

label {
  margin: 0 10px 0 0px;
  width: 35vw;
  display: inline-block;
  text-align: left;
  padding: 0 5px;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.close {
  position: absolute;
  right: 35px;
  top: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #f1f1f1;
}

.close:hover,
.close:focus {
  color: #f44336;
  cursor: pointer;
}
#category-label {
  margin: 0 10px;
  padding: 10px;
}
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
select#category {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}
</style>
        
    