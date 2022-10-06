<template>
  <the-header>
    <nav class="navbar navbar-dark bg-dark">
      <ul>
        <li v-if="!login">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li v-if="!login">
          <router-link to="/list">List</router-link>
        </li>
        <li v-if="!login">
          <router-link to="/createtask">Create Task</router-link>
        </li>
      </ul>
    </nav>
  </the-header>
</template>
<script>
import TheHeader from "../Layout/TheHeader.vue";
export default {
  components: { TheHeader },
  name: "NavigationBar",
};
</script>
<style scoped>
nav {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
nav a {
  color: white;
  margin: 40px;
  list-style: none;
}
router-link {
  color: wheat;
  word-spacing: inherit;
  margin: 10px;
  padding: 5px;
  font-size: large;
}
nav li {
  list-style: none;
}

/*
li {
  margin: 0 0.5rem;
  color: white;
} */
</style>
