<template>
    <Header v-if="userStore.user.role !== 'admin'"/>
    <HeaderAdmin v-else></HeaderAdmin>
    <RouterView></RouterView>
    <Footer/>
</template>

<script>
import Header from './components/Header.vue';
import HeaderAdmin from './components/HeaderAdmin.vue';
import Footer from './components/Footer.vue';
import RouterView from './router';
import { useUserStore } from './stores/user.js';
export default {
    components: {
        Header,
        Footer,
        HeaderAdmin
    },
    setup(){
        const userStore = useUserStore();
        return {
            userStore
        }
    }
}
</script>

<style scoped>

</style>