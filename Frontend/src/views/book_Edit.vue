<template>
    <div class="container" v-if="detailBook !== null">
        <div class="row">
            <div class="col-lg-8">
                <div class="sidebar--left">
                    <form method="POST" class="text-center mb-4" @submit.prevent="updateBook()">
                        <h3 class="my-4">Cập nhật thông tin sản phẩm</h3>
    
                        <div class="form-group row">
                            <label for="book__name" class="col-lg-3 col-form-label form-label">Tên sản phẩm</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" id="book__name" v-model="detailBook.name">
                            </div>
                        </div>
    
                        <div class="form-group row">
                            <label for="book__quantity" class="col-lg-3 col-form-label form-label">so luong</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" id="book__quantity" v-model="detailBook.quantity">
                            </div>
                        </div>
    
                        <div class="form-group row">
                            <label for="book__main" class="col-lg-3 col-form-label form-label">Nội dung</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" id="book__main" v-model="detailBook.discription">
                            </div>
                        </div>
    
                        <div class="form-group row">
                            <label for="book__extra" class="col-lg-3 col-form-label form-label">Tác giả</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" id="book__extra" v-model="detailBook.author">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="book__pub" class="col-lg-3 col-form-label form-label">Nhà xuất bản</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" id="book__pub" v-model="detailBook.publisherID">
                            </div>
                        </div>                       
    
                        <div class="form-group row">
                            <label for="book__price" class="col-lg-3 col-form-label form-label">Giá tiền</label>
                            <div class="col-lg-9">
                                <input type="number" class="form-control w-25" id="book__price" v-model="detailBook.price">
                            </div>
                        </div>
    
                        <div class="btn-update">
                            <button type="submit" class="btn btn-success">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="sidebar--right">
                    <div class="book__img w-100">
                        <img class="w-100" :src="detailBook.image[0].url" alt="ảnh bìa sản phẩm">
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
            detailBook: null
        }
    },
    methods: {
        async assignValues() {
            const idbook = this.$route.params.id;
            const res = await bookService.detailBook(idbook);
            this.detailBook = res.data;
        },

        async updateBook() {
            const res = await bookService.update(this.detailBook._id, this.detailBook);
            if(res.status === 200) {
                alert('Cập nhật thông tin thành công!!!');
            }
        }
    },
    async created() {
        await this.assignValues();
    }
}
</script>

<style scoped>
.container {
    min-height: 74.4vh;
}

.form-label {
    font-size: 1.31rem;
    text-align: left;
    font-weight: 600;
}

.btn-update {
    text-align: right;
}

.btn-update .btn {
    padding: 10px 15px;
    font-size: 1.35rem;
}
</style>