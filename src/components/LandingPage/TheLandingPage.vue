<template>
  <the-header></the-header>

  <h1>About our To-do App</h1>

  <textarea id="summary" name="summary" rows="10" cols="55">
        The goal of this app is to help us become more aware of how we spend time in the process of doing those tasks and how productive that time is. It can help set some constraints on social media to reduce distraction and track the time we spend working on the to-do items.
        - Be Efficient at working
        - Manage your Work with Proper Time Management
        - Hassle free To-do Listing
    </textarea
  >
</template>
<script>
import TheHeader from "../Layout/TheHeader.vue";
export default {
  components: { TheHeader },
  name: "TheLandingPage",
};
</script>
<style scoped>
.row {
  margin: 10rem;
  padding: 0.5rem;
  text-align: center;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: large;
  background-color: peachpuff;
}
textarea #summary {
  text-align: justify;
  position: static;
  border-radius: 50px;
  box-shadow: 5px;
  resize: vertical;
  width: 80%;
  height: 20%;
  background-color: rgb(197, 214, 211);
}
.image {
  width: 4vw;
  height: 4vw;
  margin: 0px;
  padding: 0px;
  align-items: center;
  display: flex;
  justify-content: center;
}
marquee {
  font-size: 330%;
}
body {
  background-color: rgb(197, 214, 211);
}
textarea {
  font-family: sans-serif;
  font-size: x-large;
  border-color: black;
  border-radius: 40px;
  border-style: solid;
  border-width: thick;
  text-align: justify;
  background-color: rgb(226, 242, 239);
}
</style>
