<template >
    <div class="search-result-view mt-4 container" :key="searchStore.contentSearch">
        <h2 class="text-center">KẾT QUẢ TÌM KIẾM</h2>
        <div class="row my-4">
            <div class="col-lg-12">
                <h4>Sách</h4>
                
            </div>
            <div class="col-lg-3" v-for="(book, index) in filteredBook"
                :key="index">
                <div class="card-grid">
                    <div class="card my-3">
                        <router-link :to="{ name: 'detailBook', params: { id: book._id } }">
                            <div>
                                <span>
                                    <img class="card-img-top img-fluid" :src="book.image[0].url">
                                </span>
                            </div>
                        </router-link>
                        <div class="card-body">
                            <p class="text-center">{{ book.quantity }} {{ book.discription }} {{ book.price }} {{ book.author }} {{ book.publisher }}
                            </p>
                            <router-link :to="{ name: 'detailBook', params: { id: book._id } }">
                                <h5 class="card-title text-center">{{ book.name }}</h5>
                            </router-link>
                            <p class="book-price">{{ formattedPrice(book.price) }}đ</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>

import bookService from '../services/book.service.js';
import { usePaginationStore } from '../stores/pagination.js';
import { useSearchStore } from '../stores/search.js';


export default {
    setup() {
        const paginationStore = usePaginationStore();
        const searchStore = useSearchStore();
        return {
            paginationStore,
            searchStore
        }
    },
    data() {
        return {
            books: [],
            filteredBook: [],
        };
    },

    methods: {
        formattedPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        },

        async assignValues() {
            const res = await bookService.allBook();
            if (res.status === 200) {
                this.books = res.data;
            }


        },


        async filterResult() {
            this.filteredBooks = this.books.filter(item => item.name.toLowerCase().includes(this.searchStore.contentSearch.toLowerCase()));
          
        }
    },

    async created() {
        if (this.searchStore.contentSearch.length === 0) {
            this.$router.push({ name: 'home' });
        }
        await this.assignValues();
        await this.filterResult();
    },
    
    async updated() {
        if (this.searchStore.contentSearch.length === 0) {
            this.$router.push({ name: 'home' });
        }
        await this.assignValues();
        await this.filterResult();
    }
}
</script>
<style scoped>
.card {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
}

.card:hover {
    transform: scale(1.05);
}

.card .card-img-top {
    max-width: 100%;
}

.card .card-title {
    font-size: 0.8rem;
    font-weight: bold;
    margin-top: 10px;
    color: black;
}

.card .card-body {
    padding: 10px;
}

.card p {
    margin: 0;
}

.book-price {
    color: rgb(190, 5, 17);
    font-size: 1rem;
    font-weight: bold;
}
</style>

