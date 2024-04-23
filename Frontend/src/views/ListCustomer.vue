<template>
    <div class="list-customer-view container mt-4" :key="customers.length">
        <h1 class="text-center">Danh sách độc giả</h1>
        <div class="row">
            <div class="col col-md-12">
                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên độc giả</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="datarow">
                        <tr v-for="(customer, index) in customers" :key="customer._id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ customer.name }}</td>
                            <td class="text-center">{{ customer.username }}</td>
                            <td class="text-center">{{ customer.email }}</td>
                            <td class="text-center">{{ customer.numberphone }}</td>

                            <td>
                                <button type="button" data-sp-ma="2" class="btn btn-primary mr-2">
                                    <font-awesome-icon :icon="['fas', 'box']" /> Phiếu mượn sách
                                </button>
                                <button type="button" data-sp-ma="2" class="btn btn-danger" @click="forceDelete(customer._id)">
                                    <font-awesome-icon :icon="['fas', 'trash']" /> Xóa
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import { useUserStore } from '../stores/user.js';
import userService from '../services/user.service.js';

export default {
    data() {
        return {
            customers: [],
        };
    },
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },

    methods: {
        async assignValues() {
            const res = await userService.allUser();
            this.customers = res.data;
        },
        async forceDelete(id) {
            const res = await userService.remove(id);
            if(res.status === 200) {
                await this.assignValues();
                alert('Khách hàng đã được xóa');
            }
        }
    },

    async created() {
        await this.assignValues();
    },
}

</script>
<style scoped>
.list-customer-view {
    min-height: 71vh;
}
.item__img {
    width: 100%;
}
</style>