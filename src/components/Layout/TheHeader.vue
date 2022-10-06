<template>
  <header>
    <nav>
      <h1>
        <router-link to="/"
          ><img
            class="image"
            src="https://cdn.pixabay.com/photo/2016/12/26/18/33/logo-1932539__340.png"
          />
          <span>To-DoApp</span>
        </router-link>
      </h1>
      <ul>
        <li v-if="!login">
          <router-link to="/login">LOGIN</router-link>
        </li>
        <li v-if="!login">
          <router-link to="/signup">SIGN UP</router-link>
        </li>
        <li>
          <a v-if="login" @click="logout">LOGOUT</a>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  name: "TheHeader",
  data() {
    return {
      login: localStorage.getItem("token"),
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      console.log("Logged out Please Login to continue");
      this.$router.push({ name: "LoginPage" });
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  width: auto;
  height: 5rem;
  background-color: #095674;
  justify-content: center;
  align-items: center;
  margin-top: 0;
}

header a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0;
  border: 12px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0;
  border: 12px solid transparent;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
  color: white;
}

img.image {
  margin-top: 20px;
  width: 5vw;
  height: 2vw;
  margin: 0px;
  padding: 0px;
  align-items: center;
  display: flex;
  justify-content: center;
}

span {
  color: white;
  font-size: large;
}
</style>