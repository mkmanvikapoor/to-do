<template>
  <the-header></the-header>
  <img
    class="logo"
    src="https://cdn.pixabay.com/photo/2016/12/26/18/33/logo-1932539__340.png"
  />

  <div class="modal-content form-control">
    <div>
      <div>
        <h3>Signup</h3>
        <p>Please fill in details to Signup to your account.</p>
      </div>
      <div :class="{ invalid: nameValidity === 'invalid' }">
        <label for="name"><b class="labels">Name</b></label>
        <input
          v-model="name"
          type="text"
          placeholder="Enter Name"
          name="name"
          @blur="validateName"
          required
        />
        <h3 v-if="nameValidity === 'invalid'">
          <b>Please enter valid name</b>
        </h3>
      </div>
      <div :class="{ invalid: emailValidity === 'invalid' }">
        <label for="email"><b class="labels">Email</b></label>
        <input
          v-model="email"
          type="text"
          placeholder="Enter Email"
          name="email"
          @blur="validateEmailAddress"
          required
        />
        <h3 v-if="emailValidity === 'invalid'">
          <b>Please enter a valid email address</b>
        </h3>
      </div>
      <div>
        <label for="radio" name="gender" id="gender"
          ><b class="labels">Gender</b></label
        >
        <input type="radio" v-model="gender" value="male" name="gender" />Male
        <input
          type="radio"
          v-model="gender"
          value="female"
          name="gender"
        />Female<br />
      </div>
      <div :class="{ invalid: passwordValidity === 'invalid' }">
        <label for="psw"><b class="labels">Password</b></label>
        <input
          v-model="psw"
          type="password"
          placeholder="Enter Password"
          name="psw"
          @blur="validatePassword"
          required
        />
        <h3 v-if="passwordValidity === 'invalid'">
          <b>Enter atleast 4 characters for password</b>
        </h3>
      </div>
      <div>
        <label for="confirmpsw"><b class="labels"> Confirm Password</b></label>
        <input
          v-model="confirmpsw"
          type="password"
          placeholder="Enter Password"
          name="confirmpsw"
          required
        />
        <h3 v-if="passwordValidity === 'invalid'">
          <b>Enter the same password</b>
        </h3>
      </div>
      <div>
        <button
          @click="signUp"
          type="button"
          :disabled="creatingAccount"
          class="btn btn-lg"
        >
          Signup
        </button>
        <button @click="Login" type="button" class="btn btn-lg">
          Login Instead
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
  name: "SignupPage",
  data() {
    return {
      name: "",
      email: "",
      gender: "",
      psw: "",
      userId: "",
      nameValidity: "pending",
      passwordValidity: "pending",
      emailValidity: "pending",
      creatingAccount: false,
    };
  },
  methods: {
    async signUp() {
      this.creatingAccount = true;
      console.warn("signup");
      let result = await axios.post(
        "https://to-do-list-4512824.herokuapp.com/api/signup",
        {
          name: this.name,
          email: this.email,
          gender: this.gender,
          password: this.psw,
          userId: this.userId,
        }
      );
      console.warn(result);
      this.creatingAccount = false;
      if (result.status == 201) {
        alert("Signup is successful");
        localStorage.setItem("user-info", JSON.stringify(result.data));
        this.$router.push({ name: "LoginPage" });
      }
    },
    Login() {
      this.$router.push({ name: "LoginPage" });
    },
    mounted() {
      let user = localStorage.getItem("user-info");
      if (user) {
        this.$router.push({ name: "TheDashboard" });
      }
    },
    validateName() {
      if (this.name === "") {
        this.nameValidity = "invalid";
      } else {
        this.nameValidity = "valid";
      }
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
  margin: 10px 10px 10px 0;
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
  margin: 0 10px 0 0;
  width: 35vw;
  display: inline-block;
  text-align: left;
  font-size: 20px;
}
</style>

