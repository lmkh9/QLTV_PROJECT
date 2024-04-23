<template>
    <div class="container mt-3 mb-3">
        <h1>Đăng Nhập</h1>
        <div class="row">

            <div class="col-lg-3"></div>
            <form class="form-col col-lg-6" method="POST" @submit.prevent="handleSubmitForm()" id="form-signin">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" v-model="formLogin.username">
                    <span class="form__msg"></span>
                </div>
                <div class="form-group">
                    <label for="pwd">Password</label>
                    <input type="password" class="form-control" id="pwd" v-model="formLogin.password">
                    <span class="form__msg"></span>
                </div>

                <button type="submit" class="btn btn-primary">Đăng nhập</button>
                <span style="font-style: italic; margin-top: 1.5rem;">Bạn chưa có tài khoản? <router-link
                        to="/auth/signup">Đăng ký</router-link></span>

            </form>
        </div>
    </div>
</template>
<script>

import authService from '../services/auth.service.js';
import { useUserStore } from '../stores/user.js'

export default {
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    data() {
        return {
            formLogin: {
                username: '',
                password: ''
            }
        }
    },

    methods: {
        async handleSubmitForm() {
            try {
                const res = await authService.login(this.formLogin);
                if (res.status === 200) {
                    this.userStore.user.name = res.data.name;
                    this.userStore.user._id = res.data._id;
                    this.userStore.user.role = res.data.role;
                    alert('Login successfully!!!')
                    if(this.userStore.user.role === 'customer') {
                        this.$router.push('/');
                    } else{
                        this.$router.push('/book/store');
                    }
                }
            } catch (error) {
                alert('username hoặc password không đúng');
            }
        },

        handleValidator() {
            Validator({
                form: '#form-signin',
                errorSelector: '.form__msg',
                rules: [
                    Validator.isRequired('#username', 'vui lòng nhập trường này'),
                    Validator.isRequired('#pwd', 'vui lòng nhập trường này')
                ]
            });
        },
    },
    async created() {
        console.log(this.userStore.user);
    },
    async mounted() {
        this.handleValidator();
    }
}


</script>
<style scoped>
.container {
    min-height: 71.3vh;


}

form {
    margin-top: 4rem;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 15px;

    border: 2px solid #80808000;
    width: 450px;
    display: flex;
    flex-direction: column;
    align-items: right;
    position: relative;
    border-radius: 15px;
    box-shadow: 0px 0px 14px 0px grey;
    background-color: white;

}

.btn-primary {
    float: right;
    padding: 7px;
    width: 50%;
    border-radius: 10px;
    border: none;

    bottom: 10px;
    cursor: pointer;
    background: linear-gradient(to right, #fc00ff, #00dbde);
}

.btn-primary:hover {

    background: linear-gradient(to right, #fc466b, #3f5efb);
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
