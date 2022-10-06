<template>
  <the-header></the-header>
  <img
    class="logo"
    src="https://cdn.pixabay.com/photo/2016/12/26/18/33/logo-1932539__340.png"
  />
  <div class="modal-content">
    <div class="container">
      <div>
        <h3>LOGIN {{ name }}</h3>
        <p>Please fill in details to login to your account.</p>
      </div>
      <div :class="{ invalid: emailValidity === 'invalid' }">
        <label for="email"><b>Email</b></label>
        <input
          v-model="email"
          type="text"
          placeholder="Enter Email"
          name="email"
          @blur="validateEmailAddress"
          required
        />
        <h3 v-if="emailValidity === 'invalid'">
          <b>Please Enter valid Email address</b>
        </h3>
      </div>
      <div :class="{ invalid: passwordValidity === 'invalid' }">
        <label for="psw"><b>Password</b></label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter Password"
          name="psw"
          @blur="validatePassword"
          required
        />
        <h3 v-if="passwordValidity === 'invalid'">
          <b>Please enter valid password</b>
        </h3>
      </div>
      <div>
        <button
          @click="login"
          :disabled="loggingAccount"
          type="button"
          class="btn btn-lg"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import TheHeader from "../Layout/TheHeader.vue";
export default {
  components: { TheHeader },
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      loggingAccount: false,
      emailValidity: "pending",
      passwordValidity: "pending",
    };
  },
  methods: {
    async login() {
      this.loggingAccount = true;
      console.log("Logged in Suceesfully");
      const result = await axios.post(
        "https://to-do-list-4512824.herokuapp.com/api/login",
        {
          email: this.email,
          password: this.password,
          name: this.name,
          gender: this.gender,
        }
      );
      console.log(result);
      localStorage.setItem("result", result.data);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("userId", result.data.userId);
      localStorage.setItem("id", result.data.id);
      this.loggingAccount = false;
      this.$router.push({
        name: "dash-board",
      });
    },
    validateEmailAddress() {
      if (this.email === "") {
        this.emailValidity = "invalid";
      } else {
        this.emailValidity = "valid";
      }
    },
    validatePassword() {
      if (this.password === "") {
        this.passwordValidity = "invalid";
      } else {
        this.passwordValidity = "valid";
      }
    },
  },
};
</script>
<style scoped>
.logo {
  width: 100px;
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
.container {
  padding: 16px;
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
label {
  margin: 0 10px 0 0px;
  width: 35vw;
  display: inline-block;
  text-align: left;
}
</style>
