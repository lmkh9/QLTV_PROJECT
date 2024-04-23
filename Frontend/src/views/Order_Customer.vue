<template>
    <div class="order-view ">
        <div class="container ">
            <h2 class="text-center mb-4">PHIẾU MƯỢN CỦA BẠN</h2>
            <div class="col-lg-6  intern">
                <div v-for="(order, index) in orders" :key="index">
                    <div v-for="(book, index) in order.contentBook" :key="index">
                        <p class="title">{{ book.itemId.name }}</p>
                        <span>Số lượng: {{ book.quantity }}</span>
                        <p class="price__item">Giá: {{ formattedPrice(book.itemId.price) }}đ</p>
                    </div>
                
                    <!-- <div v-for="(product, idx) in order.contentProduct" :key="idx">
                        <p class="title">{{ product.itemId.name }}</p>
                        <span>Số lượng: {{ product.quantity }}</span>
                        <p class="price__item">Giá: {{ formattedPrice(product.itemId.price) }}đ</p>
                    </div> -->
                    <p>Ngày mượn: {{ order.dateOrder.split('T')[0] }}</p>
                    <p>Trạng thái: {{ order.isShipped }}</p>
                    <hr style="font-weight: 100;">
                    <h3 class="price">Tổng tiền: {{ formattedPrice(sumPricePayment(order)) }}đ</h3>
                    <br>
                </div>
            </div>

        </div>
    </div>

    
</template>

<script>

import { useUserStore } from '../stores/user.js';
import userService from '../services/user.service.js';
import cartService from '../services/cart.service';
import orderService from '../services/order.service';

export default {
    data() {
        return {
            orders: []
        };
    },
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },

    methods: {
        formattedPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        },

        async assignValues() {

            const res = await userService.ordersUser(this.userStore.user._id);
            this.orders = res.data.orders;
            console.log(this.orders);
        },
        async handleRemoveInCart(item) {
            const res = await cartService.removeInCart(this.userStore.user._id, item);
            if (res.status === 200) {
                await this.assignValues();
            }
        },
        async reduce(product) {
            return product.quantity--;
        },
        async increase(product) {
            return product.quantity++;
        },

        sumPricePayment(order) {
            let sum = 0;
            for (let i = 0; i < order.contentBook.length; i++) {
                const element = order.contentBook[i].itemId.price * order.contentBook[i].quantity;
                sum += element;
            }
            // for (let j= 0; j < order.contentProduct.length; j++) {
            //     const element = order.contentProduct[j].itemId.price * order.contentProduct[j].quantity;
            //     sum += element;
            // }
            return sum;
        },

        async transferItemToOrder(item, categories) { 
            let isExist = false;
            let indexRemove = -1;
            for (let i = 0; i < this.order.length; i++) {
                if(this.order[i]._id == item._id) {
                    isExist = true;
                    indexRemove = i;
                    break;
                }
            }

            if(indexRemove !== -1) {
                this.order.splice(indexRemove, 1);
            } else {
                this.order.push(item);
                this.order[this.order.length-1].categories = categories;
            }
            this.sumPricePayment();
            console.log(this.order);
        },

        async handleOrder() {
            const orderBooks = []; 
            for (let i = 0; i < this.order.length; i++) {
                if(this.order[i].categories === 1) {
                    const temp = {
                        itemId: this.order[i].item._id,
                        quantity: this.order[i].quantity
                    }
                    orderBooks.push(temp);
                } else {
                    const temp = {
                        itemId: this.order[i].item._id,
                        quantity:this.order[i].quantity
                    }
                    orderProducts.push(temp);
                }
                await this.handleRemoveInCart(this.order[i]._id);
            }
            const formOrder = {
                userID: this.user._id,
                contentBook: orderBooks,
            }
            const res = await orderService.create(formOrder);
            if(res.status === 201) {
                this.order = [];
                alert('Đặt hàng thành công, đơn hàng sẽ được giao từ 6-10 ngày');
            }
        }
    },

    async created() {
        await this.assignValues();
    },
}

</script>
<style scoped>
.container{
    position: relative;
    background-image: url('../assets/img/news.jpg');

    background-size: cover;

    background-position: center;

    background-repeat: no-repeat;
 
    color: #fff;
    border-radius: 30px;
    padding: 20px;
}
.intern{
    background-color: #f5b4eaaa;
    border-radius: 30px;
    margin-left: 300px;
}
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

.price__item {
    color: rgb(190, 5, 17);
    font-size: 1rem;
    font-weight: bold;
}
.price{
    color: rgb(190, 5, 17);
    font-weight: bold;
}
.title{
    font-size: 1.2rem;
}


</style>