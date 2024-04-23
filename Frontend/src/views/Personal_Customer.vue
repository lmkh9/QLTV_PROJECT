<template>
    <div class="container" style="min-height: 73.5vh;">
        <div class="row">
            <div class="col col-lg-3">
                <section class="sidebar--left mt-4">
                    <div class="categories">
                        <div class="category__item">Tài khoản của tôi</div>
                        <div class="category__item">
                            <router-link :to="{ name: 'order_customer' }">
                                Phiếu mượn
                            </router-link>
                        </div>
                        <div class="category__item">Thông báo</div>
                        <div class="category__item">Đổi mật khẩu</div>
                    </div>
                </section>
            </div>
            <div class="col col-lg-1" ></div>
            <div class="col col-lg-8" >
                <section class="sidebar--right mt-4">
                    <div class="info">
                        <h4 class="info__item">Tên: {{ user.name }}</h4>
                        <p class="info__item">Giới tính: {{ user.gender }}</p>
                        <p class="info__item">Email: {{ user.email }}</p>
                        <p class="info__item">Số điện thoại: {{ user.numberphone }}</p>
                        <p class="info__item">Địa chỉ: {{ user.address }}</p>
                        
                        <p class="info__item">Loại người dùng: {{ user.role == 'customer' ? 'Độc giả' : 'Quản trị viên' }}</p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../stores/user.js';
import axios from 'axios'

export default {
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    data() {
        return {
            user: {}
        }
    },
    methods: {
        async assignValues() {
            const res = await axios.get(`http://localhost:3000/user/${this.userStore.user._id}`);
            this.user = res.data;
        }
    },
    async created() {
        await this.assignValues()
    }
}
</script>

<style scoped>
.sidebar--left {
    background-color: #f8f8f8;
}

.category__item {
    font-size: 1.4rem;
    padding: 14px 0 14px 20px;
    border-bottom: 1px solid #888;
}

.info__item {
    font-size: 1.3rem;
}
</style>