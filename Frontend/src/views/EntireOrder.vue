<template>
    <div class="list-order-view container mt-4" :key="orders.length">
        <div class="row">
            <div class="col col-md-12">
                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Độc giả</th>
                            <th scope="col">Sách</th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col">Ngày mượn</th>
                            <th scope="col">Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    
                    <tbody id="datarow">
                        <tr class="record" v-for="(order, index) in orders" :key="order._id">
                            <td>{{ index + 1 }}</td>
                            <td>
                                
                                {{ order.userID.name }}
                            </td>
                            <td style="text-align: left;">
                                <div v-for="(book, idx) in order.contentBook" :key="idx" v-if="order.contentBook.length > 0">
                                    <div>{{ book?.itemId?.name }}</div>
                                    <div>Giá: {{ book?.itemId?.price }}</div>
                                    <div>Số lượng: {{ book?.quantity }}</div>
                                    <br>
                                </div>

                                <!-- <div v-for="(product, i) in order.contentProduct" :key="i" v-if="order.contentProduct.length > 0">
                                    <div>{{ product?.itemId?.name }}</div>
                                    <div>Giá: {{ product?.itemId?.price }}</div>
                                    <div>Số lượng: {{ product?.quantity }}</div>
                                    <br>
                                </div> -->
                            </td>
                            <td>{{ order.sum }}</td>
                            <td>{{ order.dateOrder.split('T')[0] }}</td>
                            <td>{{ order.isShipped ? "Đã giao" : "Chưa giao" }}</td>
                            <td>
                                <button type="button" class="btn--remove btn btn-danger" @click="removeOrder(order.userID._id, order._id)">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
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
import orderService from '../services/order.service.js';

export default {
    data() {
        return {
            orders: []
        };
    },

    methods: {
        async assignValues() {
            const res = await orderService.allOrder();
            this.orders = res.data;
        },
        async sumPayment() {
            for (let i = 0; i < this.orders.length; i++) {
                console.log(this.orders[i]);
                let sum = 0;
                for (let j = 0; j < this.orders[i].contentBook.length; j++) {
                    const temp = this.orders[i].contentBook[j].itemId.price * this.orders[i].contentBook[j].quantity;
                    console.log(this.orders[i].contentBook[j].itemId.price);
                    sum += temp;
                }
                // for (let k = 0; k < this.orders[i].contentProduct.length; k++) {
                //     const temp1 = this.orders[i].contentProduct[k].itemId.price * this.orders[i].contentProduct[k].quantity;
                //     console.log(this.orders[i].contentProduct[k].itemId.price);
                //     sum += temp1;
                // }
                this.orders[i].sum = sum;
            }
        },

        markedIsShipped() {
            const record = document.getElementsByClassName('record');
            for (let i = 0; i < this.orders.length; i++) {
                if(this.orders[i].isShipped === true) {
                    record[i].classList.add('active');
                } else {
                    record[i].classList.remove('active');
                }
            }
        },

        async removeOrder(idBuyer, idItem) {
            const res = await orderService.removeOrder(idBuyer, idItem);
            if(res.status === 200) {
                await this.assignValues();
                alert('Xóa đơn hàng thành công');
            }
        }
    },

    async created() {
        await this.assignValues();
        await this.sumPayment();
    },

    async updated() {
        this.markedIsShipped();
    }
}

</script>
<style scoped>
.record.active {
    background-color: rgb(239, 188, 122);
}
</style>