
<template>
    <div class="container mt-4 mb-3" style="min-height: 70vh;">
        <div class="row">
            <div class="col-lg-2"></div>
            <form ref="form" method="POST" @submit.prevent="addPublisher" class="form-col col-lg-6">
                <div class="form-group row">
                    <label for="name-publisher" class="col-sm-3 col-form-label font-weight-bold">Tên Nhà xuất bản</label>
                    <div class="col-sm-9">
                        <input type="text" v-model="posts.name" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="address-publisher" class="col-sm-3 col-form-label font-weight-bold">Địa chỉ</label>
                    <div class="col-sm-9">
                        <input type="text" v-model="posts.address" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-lg-12" style="text-align: right;">
                        <button type="submit" class="btn btn-primary">Thêm</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import publisherService from '../services/publisher.service.js';

export default {
    data() {
        return {
            posts: {
                name: '',
                address: '',
            }
        };
    },

    methods: {
        async addPublisher() {
            try {
                const res = await publisherService.createNewPublisher(this.posts);
                if (res.status === 201) {
                    alert('Thêm nhà xuất bản mới thành công');
                    this.posts.name = "";
                    this.posts.address = "";
                } else {
                    alert('Thêm nhà xuất bản thất bại');
                }
            } catch (error) {
                alert('Có lỗi xảy ra trong quá trình thêm nhà xuất bản');
            }
        }
    }
}
</script>

<style scoped>
form {
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 15px;
    box-shadow: 0px 0px 14px 0px grey;
    background-color: white;
}

.btn-primary {
    padding: 5px 10px;
    font-size: 1.3rem;
    border: none;
    cursor: pointer;
    background: linear-gradient(to right, #fc00ff, #00dbde);
}

.btn-primary:hover {
    background: linear-gradient(to right, #fc466b, #3f5efb);
}

.form-col {
    background-color: white;
    box-shadow: 0px 0px 14px 0px grey;
    margin-bottom: 2.5rem;
}
</style>
