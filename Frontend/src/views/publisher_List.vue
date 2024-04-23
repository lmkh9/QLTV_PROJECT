<template>
    <div class="list-view container mt-4" :key="publishers.length">
        <h1 class="text-center">Danh sách nhà xuất bản</h1>
        <div class="row">
            <div class="col col-md-12">
                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên nhà xuất bản</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="datarow">
                        <tr v-for="(publisher, index) in publishers.slice(startPagination(), endPagination() + 1)" :key="publisher._id">
                            <td>{{ index + 1 }}</td>
                            <!-- <td>
                                <img :src="publisher.image[0].url" class="item__img">
                            </td> -->
                            <td>{{ publisher.name }}</td>
                            <td>{{ publisher.address }}</td>
                            <td>
                                <router-link :to="{name: 'edit-publisher', params: {id: publisher._id}}">
                                    <button type="button" class="btn btn-primary btn-edit-publisher">
                                        <font-awesome-icon :icon="['fas', 'pen']" />
                                        Sửa
                                    </button>
                                </router-link>
                                <button type="button" class="btn btn-danger btn-delete-publisher ml-2" @click="removepublisher(publisher._id)">
                                    <i class="fa fa-trash" aria-hidden="true"></i> Xóa

                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Pagination />
            </div>
        </div>
    </div>
</template>

<script>

import Pagination from '../components/Pagination.vue';
import { useUserStore } from '../stores/user.js';
import { usePaginationStore } from '../stores/pagination.js';
import publisherService from '../services/publisher.service.js';



export default {
    components: {Pagination},
    data() {
        return {
            publishers: []
        };
    },
    setup() {
        const userStore = useUserStore();
        const paginationStore = usePaginationStore();
        return {
            userStore,
            paginationStore
        }
    },

    methods: {
        // formattedPrice(price) {
        //     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
        // },

        async assignValues() {
            const res = await publisherService.allPublisher();
            this.publishers = res.data;
            this.paginationStore.totalQuantityItems = this.publishers.length;
            this.paginationStore.quantityItemsPage = 10;
        },

        startPagination() {
            return this.paginationStore.indexFirstItemPage();
        },
        endPagination() {
            return this.paginationStore.indexLastItemPage();
        },

        async removepublisher(id) {
            const res = await publisherService.remove(id);
            if(res.status === 200) {
                await this.assignValues();
                alert('Xóa sản phẩm thành công');
            }
        }
    },

    async created() {
        await this.assignValues();
    },
}

</script>
<style scoped>
.item__img {
    width: 100%;
}

.cart-view {
    min-height: 71vh;
}

.btn-buy-now {
    background-color: purple;
    padding: .5rem 2rem;
    color: #fff;
}

.btn-buy-now:hover {
    background-color: rgb(177, 49, 177);
}
</style>

