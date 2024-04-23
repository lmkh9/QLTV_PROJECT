<template >
    <div class="container mt-4 mb-3" style="min-height: 70vh;">
        <div class="row">
            <div class="col-lg-2"></div>
            <form ref="form" method="POST" @submit.prevent="addBook()" class="form-col col-lg-8">
                <div class="form-group row ">
                    <label for="name-book" class="col-lg-3 col-form-label font-weight-bold">Tên </label>
                    <div class="col-lg-9">
                        <input type="text" v-model="posts.name" class="form-control">
                    </div>
                </div>
             
                <div class="form-group col">
                    <input type="file" multiple id = "photo" class="form-control-file photo__file" />
                </div>

                <div class="form-group row">
                    <label for="quantity-book" class="col-lg-3 col-form-label font-weight-bold">Số lượng</label>
                    <div class="col-lg-9">
                        <input type="number" v-model="posts.quantity" class="form-control w-25">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="discription-book" class="col-lg-3 col-form-label font-weight-bold">Mô tả:</label>
                    <div class="col-lg-9">
                        <input type="text" v-model="posts.discription" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="clarity-book" class="col-lg-3 col-form-label font-weight-bold">Đơn giá:</label>
                    <div class="col-lg-9">
                        <input type="text" v-model="posts.price" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="author-book" class="col-lg-3 col-form-label font-weight-bold">Tác giả</label>
                    <div class="col-lg-9">
                        <input type="text" v-model="posts.author" class="form-control">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="publisherID-book" class="col-lg-3 col-form-label font-weight-bold">Nhà xuất bản</label>
                    <div class="col-lg-9">
                        <option v-for="publisher in publishers" :value="publisher.id">{{ publisher.name }}</option>
                        <div class="form-group row">
                            
                            <select v-model="posts.publisherID" class="form-control" id="publisherID-book"
                            style="width: 80%;" placeholder="Nhà xuất bản">
                                <option value="Trẻ">Trẻ</option>
                                <option value="Kim Đồng"> Kim Đồng</option>
                                <option value="Giáo dục Việt Nam"> Giáo dục Việt Nam</option>
                                <option value="Tổng hợp thành phố Hồ Chí Minh">Tổng hợp thành phố Hồ Chí Minh</option>
                                <option value="Hội Nhà văn Việt Nam">Hội Nhà văn Việt Nam</option>
                                <option value="Chính trị quốc gia sự thật">Chính trị quốc gia sự thật</option>
                                <option value="Phụ nữ Việt Nam">Phụ nữ Việt Nam</option>
                                <option value="Lao Động ">Lao Động </option>
                                <option value="Nhã Nam ">Nhã Nam </option>
                                <option value="Văn học ">Văn học</option>
                                <option value="Đinh Tị Books">Đinh Tị Books</option>
                                <option value="Đông A">Đông A</option>
                                <option value="Tư pháp">Tư pháp</option>
                                <option value="Truyền thông và Tin tức (ICPublisher)">Truyền thông và Tin tức (ICPublisher)</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-lg-12" style="text-align: right;">
                        <button type="submit" class="btn btn-primary" >Thêm</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import bookService from '../services/book.service';

export default {
    data() {
        return {
            posts: {
                name: '',
                quantity: '',
                image: [
                    {
                        public_id: "",
                        url: "",
                    },
                ],
                discription: '',
                author: '',
                publisherID: '',
                price: ''
            }
        };
    },
    
    methods: {

        async handleUploadCloud(){
            const files = await document.getElementById('photo').files
            const presetName = import.meta.env.VITE_PRESET_NAME
            const presetFolder = import.meta.env.VITE_FOLDER_product
            const name_cloud = import.meta.env.VITE_CLOUD_NAME

            const api = `https://api.cloudinary.com/v1_1/${name_cloud}/image/upload`
            const imgs_result = []
            for (let i = 0; i < files.length; i++) {
                const form = new FormData();
                form.append('upload_preset', presetName);
                form.append('folder', presetFolder);
                form.append('file', files[i]);
                
                const res = await axios.post(api, form, {
                    headers: {
                        "Content-Type" : "multipart/form-data"
                    }
                })
                const img = {
                    public_id: res.data.public_id,
                    url: res.data.secure_url
                }
                imgs_result.push(img)
            }
            this.posts.image = imgs_result

        },

        async addBook() {
            await this.handleUploadCloud()
            const res = await bookService.createNewBook(this.posts);
            if(res.status === 201) {
                alert('Them sach moi thanh cong');
                this.posts.name = "";
                this.posts.quantity = "";
                this.posts.discription = "";
                this.posts.author = "";
                this.posts.publisherID = "";
                this.posts.image = [this.posts.image[0]] // gan ve 1 mang chua phan tu dau tien
                this.posts.image[0].public_id = "";
                this.posts.image[0].url = "";
                this.posts.price = ""
            }
            else{
                alert('Them sach that bai')
            }
        }
    }
    
    
}
</script>

<style scoped>
form {
    /* background-color: #f0f0f0; */
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 15px;


    border: 2px solid #80808000;
    display: flex;
    flex-direction: column;
    align-items: right;
    position: relative;
    border-radius: 15px;
    box-shadow: 0px 0px 14px 0px grey;
    background-color: white;


}

.btn-primary {
    /* background-color: #007bff;
    border-color: #007bff; */
    padding: 5px 10px;
    font-size: 1.3rem;
    /* 
    float: right; */
    /* padding: 7px; */
    /* width: 50%;
    border-radius: 10px; */
    border: none;
    /* position: absolute; */
    /* /* bottom: 10px; */
    cursor: pointer;
    background: linear-gradient(to right, #fc00ff, #00dbde);
}

/* Đổi màu chữ của nút Sign in */
.btn-primary:hover {
    /* background-color: #0056b3;
    border-color: #0056b3; */
    background: linear-gradient(to right, #fc466b, #3f5efb);

}

.form-col {
    background-color: white;
    box-shadow: 0px 0px 14px 0px grey;
    margin-bottom: 2.5rem;
}

.form-group-label {
    font-weight: 600;
}
</style>