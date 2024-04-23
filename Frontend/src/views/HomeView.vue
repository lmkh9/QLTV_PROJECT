<template>
    <div class="container">
        <div id="carouselExampleControls" class="carousel slide mt-4" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="../assets/img/LMK.png"
                        class="d-block w-100" alt="img carousel">
                </div>
                <div class="carousel-item">
                    <img src="../assets/img/LMK.png"
                        class="d-block w-100" alt="img carousel">
                </div>
                <div class="carousel-item">
                    <img src="../assets/img/LMK.png"
                        class="d-block w-100" alt="img carousel">
                </div>
                <div class="carousel-item">
                    <img src="../assets/img/LMK.png"
                        class="d-block w-100" alt="img carousel">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-target="#carouselExampleControls" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-target="#carouselExampleControls" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </button>
        </div>

        <div class="row my-4">
            <div class="col-lg-3" v-for="(book, index) in books.slice(0, 12)"
                :key="index">
                <div class="card-grid">
                    <div class="card my-3">
                        <router-link :to="{ name: 'detailbook', params: { id: book._id } }">
                            <div>
                                <span>
                                    <img class="card-img-top img-fluid" :src="book.image[0].url">
                                </span>
                            </div>
                        </router-link>
                        <div class="card-body">
                            <p class="text-center">
                                {{ book.quantity }} 
                                {{ book.author}} 
                            </p>
                            <router-link :to="{ name: 'detailbook', params: { id: book._id } }">
                                <h5 class="card-title text-center">{{ book.name }}</h5>
                            </router-link>

                            <p class="book-price text-center">{{ formattedPrice(book.price) }}đ</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import bookService from '../services/book.service.js';
export default {
    data() {
        return {
            books: [],
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

        async shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

    },

    async created() {
        await this.assignValues();
        await this.shuffleArray(this.books);
    },
}
</script>
<style scoped>
.carousel-item {
    height: 520px;
}

.carousel-item img {
    height: 100%;
}

.card-text {
    text-align: center;
    display: flex;
    flex-direction: column;
}

.card {
    width: 100%;
}

.product {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
}

.sections {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;


}

.card {
    width: 14.8rem;
    margin: 10px;
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
    margin-top: 10px;


}

.card .card-body {
    padding: 10px;
}

.card p {
    margin: 0;
}

.product-price {
    color: rgb(190, 5, 17);
    font-size: 1rem;
    font-weight: bold;
}
.diamond-price{
    color: rgb(190, 5, 17);
    font-size: 1rem;
    font-weight: bold;
}
</style>