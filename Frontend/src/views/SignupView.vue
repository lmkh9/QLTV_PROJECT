<template>
  <div class="container mt-3 mb-3">
    <h1>Đăng Ký</h1>

    <br />

    <div class="row">
      <div class="col-lg-3"></div>
      <form
        method="POST"
        @submit.prevent="handleSignup"
        id="form-signup"
        class="form-col col-lg-6"
      >
        <div class="form-row">
          <div class="form-group col-md-6">
            <label class="form-group-label" for="username">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="username"
              v-model="formRegister.username"
            />
            <span class="form__msg"></span>
          </div>
          <div class="form-group col-md-6">
            <label class="form-group-label" for="pwd">Password</label>
            <input
              type="password"
              class="form-control"
              id="pwd"
              placeholder="Password"
              v-model="formRegister.password"
            />
            <span class="form__msg"></span>
          </div>
        </div>
        <div class="form-group">
          <label class="form-group-label" for="fullname">Họ và tên</label>
          <input
            type="text"
            class="form-control"
            id="fullname"
            placeholder="Nguyen Van A"
            v-model="formRegister.name"
          />
          <span class="form__msg"></span>
        </div>
        <div class="form-group">
          <label class="form-group-label" for="gender">Giới tính</label>
          <select
            class="form-control"
            id="gender"
            v-model="formRegister.gender"
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
          <span class="form__msg"></span>
        </div>
        <div class="form-group">
          <label class="form-group-label" for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="email"
            v-model="formRegister.email"
          />
          <span class="form__msg"></span>
        </div>
        <div class="form-group">
          <label class="form-group-label" for="phone">Số điện thoại</label>
          <input
            type="text"
            class="form-control"
            id="phone"
            placeholder="số điện thoại"
            v-model="formRegister.numberphone"
          />
          <span class="form__msg"></span>
        </div>
        <div class="form-group">
          <label class="form-group-label" for="address">Địa chỉ</label>
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="Khu 2, Đ. 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. CT"
            v-model="formRegister.address"
          />
          <span class="form__msg"></span>
        </div>
        <button type="submit" class="btn btn-primary">Đăng ký</button>
        <br />
        <span style="font-style: italic"
          >Bạn đã có tài khoản?
          <router-link to="/auth/signin">Đăng nhập</router-link></span
        >
      </form>
    </div>
  </div>
</template>
<script>
import authService from "../services/auth.service.js";
import { useUserStore } from "../stores/user.js";

export default {
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },

  data() {
    return {
      formRegister: {
        username: "",
        password: "",
        name: "",
        gender:"",
        numberphone: "",
        email: "",
        address: "",
      },
    };
  },

  methods: {
    async handleSignup() {
      const res = await authService.register(this.formRegister);
      if (res.status == 201) {
        window.alert("Bạn đã đăng ký thành công!!!!");
        this.$router.push("../auth/signin");
      } else {
        window.alert(
          "Tai khoan da co, vui long dang nhap hoac dang ky tai khoan khac!!!!"
        );
      }
    },
    handleValidator() {
      Validator({
        form: "#form-signup",
        errorSelector: ".form__msg",
        rules: [
          Validator.isRequired("#username"),
          Validator.minLength("#username", 6),
          Validator.isRequired("#pwd"),
          Validator.minLength("#pwd", 6),
          Validator.isRequired("#fullname", "Vui lòng nhập tên đầy đủ của bạn"),
          Validator.isFullName("#fullname"),
          Validator.isRequired("#email", "Vui lòng nhập email của bạn"),
          Validator.isEmail("#email"),
          Validator.isRequired("#phone"),
          Validator.isPhoneNumber("#phone"),
          Validator.isRequired("#address"),
        ],
      });
    },
  },
  async created() {
    console.log(this.userStore.user);
  },
  async mounted() {
    this.handleValidator();
  },
};
</script>
<style scoped>
form {
  /* background-color: #f0f0f0; */
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 15px;

  border: 2px solid #80808000;
  display: flex;
  flex-direction: column;
  align-items: right;
  position: relative;
  border-radius: 15px;
  box-shadow: 0px 0px 14px 0px grey;
  background-color: white;
}

.btn-primary {

  padding: 5px 10px;
  font-size: 1.3rem;

  border: none;

  background: linear-gradient(to right, #fc00ff, #00dbde);
}

.btn-primary:hover {

  background: linear-gradient(to right, #fc466b, #3f5efb);
}

.form-col {
  background-color: white;
  box-shadow: 0px 0px 14px 0px grey;
  margin-bottom: 2.5rem;
}

.form-group-label {
  font-weight: 600;
}

.form__msg {
  font-size: 1rem;
  line-height: 1.4rem;
  padding: 4px 0 0;
  font-style: italic;
}

.form-group.invalid .form__msg {
  color: #f33a58;
}

.form-group.invalid .form-control {
  border: 1px solid #f33a58;
}
</style>
