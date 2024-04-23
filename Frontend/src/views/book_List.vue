<template>
    <div class="list-view container mt-4" :key="books.length">
        <h1 class="text-center">Danh sách sách</h1>
        <div class="row">
            <div class="col col-md-12">
                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col" style="width: 14%;">Ảnh đại diện</th>
                            <th scope="col">Tên sách</th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="datarow">
                        <tr v-for="(book, index) in books.slice(startPagination(), endPagination() + 1)" :key="book._id">
                            <td>{{ index + 1 }}</td>
                            <td>
                                <img :src="book.image[0].url" class="item__img">
                            </td>
                            <td>{{ book.name }}</td>
                            <td class="text-center text-danger" style="font-weight: 700;">{{ formattedPrice(book.price) }}</td>

                            <td>
                                <router-link :to="{name: 'edit-book', params: {id: book._id}}">
                                    <button type="button" class="btn btn-primary btn-edit-book">
                                        <font-awesome-icon :icon="['fas', 'pen']" />
                                        Sửa
                                    </button>
                                </router-link>
                                <button type="button" class="btn btn-danger btn-delete-book ml-2" @click="removeBook(book._id)">
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
import bookService from '../services/book.service.js';


export default {
    components: {Pagination},
    data() {
        return {
            books: []
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
        formattedPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
        },

        async assignValues() {
            const res = await bookService.allBook();
            this.books = res.data;
            this.paginationStore.totalQuantityItems = this.books.length;
            this.paginationStore.quantityItemsPage = 10;
        },

        startPagination() {
            return this.paginationStore.indexFirstItemPage();
        },
        endPagination() {
            return this.paginationStore.indexLastItemPage();
        },

        async removeBook(id) {
            const res = await bookService.remove(id);
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