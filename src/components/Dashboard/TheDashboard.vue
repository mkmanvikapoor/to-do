<template>
  <navigation-bar></navigation-bar>
  <router-view></router-view>

  <h1 style="color: black; font-weight: 20; font-size: 3vw">To Do Tasks</h1>
  <div>
    <button @click="confirmCreate" type="button" class="btn btn-lg">
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
  <div class="container">
    <div class="row">
      <span class="a">
        <h4>TOTAL TASK</h4>
        <h4>{{ data }}</h4>
      </span>
      <span class="b">
        <h4>DUE TASK</h4>
        <h4>{{ data1 }}</h4>
      </span>
      <span class="c">
        <h4>COMPLETED TASK</h4>
        <h4>{{ data2 }}</h4>
      </span>
    </div>
  </div>
</template>


<script>
import axios from "axios";
// import createtask from "../Createtask/CreateTask.vue";
// import list from "../list/TheList.vue";
import NavigationBar from "../Nav/NavigationBar.vue";

export default {
  components: { NavigationBar },
  name: "dash-board",
  data() {
    return {
      name: localStorage.getItem("userId"),
      data: "",
      data1: "",
      data2: "",
    };
  },

  // component: {
  //   createtask,
  //   list,
  // },
  // inject: ["createtask", "list"],

  async mounted() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("userId");
    this.name = JSON.parse(user).name;
    let result = await axios.post(
      "https://to-do-list-4512824.herokuapp.com/api/dashboard",
      {
        userId: user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.warn(result);
    this.data = result.data[0].total_task;
    this.data1 = result.data[0].due_task;
    this.data2 = result.data[0].completed;
  },
  methods: {
    confirmList() {
      this.$router.push("/list");
    },
    confirmCreate() {
      this.$router.push("/createtask");
    },
  },
};
</script>
<style scoped>
p {
  color: rgb(30, 78, 180);
  text-align: center;
  font-size: 30px;
}

div.row {
  display: inline-block;
  width: 100%;
}
span.a {
  display: inline-block;
  width: 33.33%;
  height: 12vw;
  padding: 3vw;
  border: 1px solid black;
  background-color: rgb(141, 167, 243);
}
span.b {
  display: inline-block;
  width: 33.33%;
  height: 12vw;
  padding: 3vw;
  border: 1px solid black;
  background-color: rgb(250, 250, 167);
}
span.c {
  display: inline-block;
  width: 33.33%;
  height: 12vw;
  padding: 3vw;
  border: 1px solid black;
  background-color: rgb(82, 180, 82);
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
</style>