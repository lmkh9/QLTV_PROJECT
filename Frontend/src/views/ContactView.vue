<template>
    <div class="contact-views">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="text-center my-4">LIÊN HỆ VỚI LMK</h1>
                </div>
                <div class="col-lg-6">
                    <h4> Thư viện sách LMK </h4>
                    <ul style="list-style: none;margin-top: 2rem;">

                        <li class="contact__item">
                            <font-awesome-icon :icon="['fas', 'location-dot']" />
                            <span class="contact__text">
                                66 Trần Bạch Đằng, phường An Khánh, quận Ninh Kiều, thành phố Cần Thơ
                            </span>
                        </li>
                        <li class="contact__item">
                            <font-awesome-icon :icon="['far', 'envelope']" />
                            <span class="contact__text">
                                lmk@gmail.com
                            </span>
                        </li>
                        <li class="contact__item">
                            <font-awesome-icon :icon="['fas', 'phone']" />
                            <span class="contact__text">
                                0123456789
                            </span>
                        </li>
                        <li class="contact__item">
                            <font-awesome-icon :icon="['fas', 'house']" />
                            <span class="contact__text">
                                www.lmk.com
                            </span>
                        </li>

                    </ul>
                </div>
                <div class="col-lg-6">
                    <div style="text-align: right;"><img
                        src="../assets/img/LMK.png" class="w-75 mb-4">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.contact__item {
    font-size: 1.4rem;

}

.contact__text {
    margin-left: 10px;
}</style>