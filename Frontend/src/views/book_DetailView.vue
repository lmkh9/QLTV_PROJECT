<template>
    <div class="detail-book-view" v-if="book !== null">
        <div class="container my-6 p-5">
            <div class="row">
                <section class="imgs col-lg-5">
                    <div style="border: 1px solid #333;">
                        <img :src="book.image[indexImgIntro].url" class="img--lg w-100">
                    </div>
                    <div class="d-flex justify-content-center mt-2">
                        <div class="img-item__wrapper w-25 mx-1" v-for="(img, index) in book.image" :key="index" @click="() => indexImgIntro = index">
                            <img class="w-100" :src="img.url" alt="anh">
                        </div>
                    </div>
                </section>

                <div class="col-lg-7 book-info-detail">
                    <div>
                        <h2>{{ book.name }}</h2>
                        <br />
                        <p style="color: red; font-weight: 600;">
                            {{ formattedPrice(book.price) }}
                        </p>
                        <div class="w-75">
                            <div class="d-flex mt-2">
                                <span class="w-25">Nhà xuất bản: </span>
                                <select class="w-75" style="flex: 3;">
                                    <option>{{ book.publisherID }}</option>
                                </select>
                            </div>
                            <div class="d-flex  mt-2">
                                <span class="w-25">Nội dung: </span>
                                <select class="w-75">
                                    <option>{{ book.discription }}</option>
                                </select>
                            </div>
                            <div class="d-flex  mt-2">
                                <span class="w-25">Tac gia: </span>
                                <select class="w-75">
                                    <option>{{ book.author }}</option>
                                </select>
                            </div>

                            <div class="d-flex  mt-4">
                                <label class="w-25" for="quantity-order">
                                    Số lượng: 
                                </label>
                                <input style="max-width: 50px; justify-content: flex-start;" type="number" id="quantity-order" min="1" v-model="pushNewItem.quantity">
                            </div>
                        </div>

                        <div class="d-flex justify-content-center w-100">
                            <button type="button" class="mt-4 btn-push-cart" @click="addCartItem()">
                                <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                                Thêm vào giỏ sách
                            </button>
                            <button type="button" class="mt-4 ml-2 btn-buy-now">
                                <font-awesome-icon :icon="['fas', 'credit-card']" />
                                Mượn ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import bookService from '../services/book.service.js';
import cartService from '../services/cart.service.js'
import { useUserStore } from '../stores/user.js';

export default {

    data() {
        return {
            pushNewItem: {
                idItem: '',
                idCustomer: '',
                category: 0,
                quantity: 1
            },
            _id: this.$route.params.id,
            indexImgIntro: 0,
            book: null
        }
    },
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    methods: {
        formattedPrice(price) {
            // Định dạng giá tiền với dấu chấm (.) ở giữa
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
        },

        async assignValues() {
            const res = await bookService.detailBook(this._id);
            this.book = res.data;
        },

        opacityImg() {
            const imgs = document.getElementsByClassName('img-item__wrapper');
            for (let i = 0; i < imgs.length; i++) {
                if(i == this.indexImgIntro) {
                    imgs[i].classList.add('active');
                } else {
                    imgs[i].classList.remove('active');
                }
            }
        },
        async addCartItem() {
            this.pushNewItem.idItem = this.$route.params.id;
            this.pushNewItem.idCustomer = this.userStore.user._id;
            const res = await cartService.pushNewItem(this.pushNewItem);
            if(res.status === 200) {
                alert('Sản phẩm đã được thêm vào giỏ hàng thành công');
            }
        }

    },
    async created() {
        await this.assignValues();
    },
    async updated() {
        this.opacityImg();
    }
}
</script>

<style scoped>
.detail-book-view {
    margin: 16px auto;
}

.btn-push-cart,
.btn-buy-now {
    padding: 1.5rem 2.5rem;
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    border: 1px solid #d7d7d7;
    cursor: pointer;
}

.btn-push-cart {
    background-color: #222;
}

.btn-push-cart:hover {
    background-color: #000;
}

.btn-buy-now {
    background-color: rgb(220, 40, 40);
}

.btn-buy-now:hover {
    background-color: red;
}

.img-item__wrapper {
    border: 1px solid #d5d5d5;
    aspect-ratio: 1/1;
    opacity: .4;
    cursor: pointer;
}

.img-item__wrapper.active {
    opacity: 1;
}

.img-item__wrapper:hover {
    opacity: 1;
}

.assure-content {
    font-size: .8rem;
    text-align: justify;
}
</style>