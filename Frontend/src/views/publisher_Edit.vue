<template>
    <div class="container" v-if="detailPublisher !== null">
        <div class="row">
            <div class="col-lg-8">
                <div class="sidebar--left">
                    <form method="POST" class="text-center mb-4" @submit.prevent="updatePublisher()">
                        <h3 class="my-4">Cập nhật thông tin sản phẩm</h3>
    
                        <div class="form-group row">
                            <label for="publisher__name" class="col-lg-3 col-form-label form-label">Tên nhà xuất bản</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" id="publisher__name" v-model="detailPublisher.name">
                            </div>
                        </div>
    
                        <div class="form-group row">
                            <label for="publisher__address" class="col-lg-3 col-form-label form-label">Đại chỉ</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" id="publisher__address" v-model="detailPublisher.address">
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
                    <div class="publisher__img w-100">
                        <img class="w-100" :src="detailPublisher.image[0].url" alt="ảnh bìa sản phẩm">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import publisherService from '../services/publisher.service.js';

export default {
    data() {
        return {
            detailPublisher: null
        }
    },
    methods: {
        async assignValues() {
            const idpublisher = this.$route.params.id;
            const res = await publisherService.detailPublisher(idpublisher);
            this.detailPublisher = res.data;
        },

        async updateDiamond() {
            const res = await publisherService.update(this.detailPublisher._id, this.detailPublisher);
            // const res = await productService.update(this.detailProduct._id, this.detailProduct);
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