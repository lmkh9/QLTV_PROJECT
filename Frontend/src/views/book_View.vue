<template >
  <div class="book-view mt-4 container">
    <div class="row my-4">
      <div class="col-lg-3" v-for="(book, index) in books.slice(startPagination(), endPagination() + 1)" :key="index">
        <div class="card-grid">
          <div class="card my-3">
            <router-link :to="{ name: 'detailbook', params: { id: book._id } }">
              <div>
                <span>
                  <img class="card-img-top img-fluid" :src="book.image[0].url">
                </span>
              </div>
            </router-link>
            <div class="card-body">
              <p class="text-center">{{ book.quantity }} {{ book.author }}</p>
              <router-link :to="{ name: 'detailbook', params: { id: book._id } }">
                <h5 class="card-title text-center">{{ book.name }}</h5>
              </router-link>
              <p class="book-price">{{ formattedPrice(book.price) }}đ</p>
            </div>
          </div>

        </div>
      </div>
    </div>
    <Pagination v-if="books.length > 0" />
  </div>
</template>
<script>
import bookService from '../services/book.service.js';
import { usePaginationStore } from '../stores/pagination.js';
import Pagination from '../components/Pagination.vue';

export default {
  components: { Pagination },
    setup() {
        const paginationStore = usePaginationStore();
        return {
            paginationStore
        }
    },
  data() {
    return {
      books: []
    };
  },
  methods: {
    formattedPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    async assignValues() {
      const res = await bookService.allBook();
      if (res.status === 200) {
        this.books = res.data;
      }

      this.paginationStore.totalQuantityItems = this.books.length;
      this.paginationStore.quantityItemsPage = 8;
    },

    startPagination() {
      return this.paginationStore.indexFirstItemPage();
    },
    endPagination() {
      return this.paginationStore.indexLastItemPage();
    }
  },
  async created() {
    await this.assignValues();
  },
}

</script>
<style scoped>
.card {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: scale(1.05);
}

.card .card-img-top {
  max-width: 100%;
}

.card .card-title {
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: 10px;
  color: black;
}

.card .card-body {
  padding: 10px;
}

.card p {
  margin: 0;
}

.book-price {
  color: rgb(190, 5, 17);
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}
</style>
