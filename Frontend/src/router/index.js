import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import book_DetailView from '../views/book_DetailView.vue'
import SearchResult from '../views/SearchResult.vue'
import publisher_Create from '../views/publisher_Create.vue'
import books_Create from '../views/books_Create.vue'
import SignupView from '../views/SignupView.vue'
import SigninView from '../views/SigninView.vue'
import Personal_Customer from '../views/Personal_Customer.vue'
import book_View from '../views/book_View.vue'
import CartView from '../views/CartView.vue'
import book_List from '../views/book_List.vue'
import Publisher_List from '../views/publisher_List.vue'
import book_Edit from '../views/book_Edit.vue'
import publisher_Edit from '../views/publisher_Edit.vue'
import ContactView from '../views/ContactView.vue'
import EntireOrder from '../views/EntireOrder.vue'
import Order_Customer from '../views/Order_Customer.vue'
import ListCustomer from '../views/ListCustomer.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search/result',
      name: 'result-search',
      component: SearchResult
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/auth/signin',
      name: 'signin',
      component: SigninView
    },
    {
      path: '/book/:id',
      name: 'detailbook',
      component: book_DetailView
    },

    {
      path: '/book',
      name: 'book',
      component: book_View
    },
    {
      path: '/book/:id/edit',
      name: 'edit-book',
      component: book_Edit
    },
    {
      path: '/user/:id',
      name: 'personal',
      component: Personal_Customer
    },
    {
      path: '/publisher/create',
      name: 'create-publisher',
      component: publisher_Create
    },
    {
      path: '/publisher/:id/edit',
      name: 'edit-publisher',
      component: publisher_Edit
    },

    {
      path: '/book/create',
      name: 'create-book',
      component: books_Create
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/book/store',
      name: 'listbook',
      component: book_List
    },
    {
      path: '/publisher/store',
      name: 'listpublisher',
      component: Publisher_List
    },
    {
      path: '/customer/store',
      name: 'listcustomer',
      component: ListCustomer
    },
    {
      path: '/list/order',
      name: 'list-order',
      component: EntireOrder
    },
    {
      path: '/user/:id/order',
      name: 'order_customer',
      component: Order_Customer
    },
  ]
})

export default router
