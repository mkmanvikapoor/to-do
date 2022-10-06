<template>
  <navigation-bar></navigation-bar>
  <router-view></router-view>
  <div class="list-redirect">
    <button @click="confirmCreate" type="button" class="btn btn-lg">
      Create Task
    </button>
    <button @click="redirectToDashboard" class="btn btn-lg">Dashboard</button>
  </div>

  <h1><b> List page</b></h1>
  <div class="container">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Task Id</th>
          <th scope="col">Title</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in list"
          :key="item.id"
          :class="previousDate(item.date) ? 'overdue' : ''"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>
            <button v-if="item.status == 0">
              <router-link :to="{ name: 'Update', params: { taskId: item.id } }"
                >Edit</router-link
              >
            </button>
            <button
              v-if="item.status == 0"
              v-on:click="updateStatus(1, item.id)"
            >
              Complete
            </button>
            <button v-else-if="item.status == 1">Completed</button>
            <button
              v-if="item.status == 0"
              v-on:click="updateStatus(2, item.id)"
            >
              Delete
            </button>
            <button v-else-if="item.status == 2">Deleted</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import NavigationBar from "../Nav/NavigationBar.vue";
export default {
  components: { NavigationBar },
  name: "TheList",
  data() {
    return {
      name: "",
      list: [],
    };
  },
  async mounted() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("userId");
    this.name = JSON.parse(user).name;
    let result = await axios.get(
      "https://to-do-list-4512824.herokuapp.com/api/tasks/" + user,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.warn(result);
    this.list = result.data;
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({
        name: "Login",
      });
    },
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
    redirectToDashboard() {
      this.$router.push("/dashboard");
    },
    previousDate(taskDate) {
      var selectedDate = new Date(taskDate);
      var dateNow = new Date();
      if (selectedDate > dateNow) {
        console.log(taskDate);
        return false;
      }
      return true;
    },
    async updateStatus(status, taskId) {
      await axios
        .patch(
          "https://to-do-list-4512824.herokuapp.com/api/update-status",
          {
            status: status,
            id: taskId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.code == 400) {
            alert("Oops ! There was something wrong.. Please try Again");
          } else {
            alert("Task status has been updated successfully.");
          }
        });
    },
  },
};
</script>

<style scoped>
div.list-redirect {
  margin-top: 10px;
  margin-bottom: 10px;
}
body {
  background-color: white;
}

table tr th {
  background-color: white;
}

table tr td {
  background-color: white;
}

.nav {
  background-color: #333;
  position: fixed;
  width: 2000px;
  margin-bottom: 100px;
  overflow: visible;
}

.nav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 19px 25px;
  text-decoration: none;
  font-size: 20px;
  margin: 4px;
}

.nav a:hover {
  background-color: rgb(161, 41, 41);
}
table {
  margin-top: 30px;
}

.overdue {
  background-color: red;
  color: red;
}
</style>
