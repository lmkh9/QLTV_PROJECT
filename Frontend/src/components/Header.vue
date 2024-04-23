<template>
  <div class="container-fluid header-top">
    <div class="row" style="height: 100px">
      <div class="col-lg-5"></div>
      <div class="col-lg-2 h-100">
        <div class="logo__wrapper h-100">
          <img src="../assets/img/LMK.png" alt="logo" class="logo" />
        </div>
      </div>
      <div class="col-lg-5">
        <div class="header-top__sidebar--right h-100">
          <div class="logo__icon" v-if="userStore.user._id.length === 0">
            <router-link :to="{ name: 'signin' }" class="nav__link">
              <font-awesome-icon :icon="['fas', 'user']" />
              <span style="margin-left: 6px"> Thông tin tài khoản </span>
            </router-link>
          </div>
          <div class="dropdown mr-3" v-else>
            <button
              class="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <font-awesome-icon :icon="['fas', 'user']" />
              {{ userStore.user.name }}
            </button>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
              v-if="userStore.user.role == 'admin'"
            >
              <div class="dropdown-item">
                <router-link :to="{ name: 'home' }" class="dropdown__link">
                  Thông tin tài khoản
                </router-link>
              </div>
              <div class="dropdown-item">
                <router-link
                  :to="{ name: 'storepublisher' }"
                  class="dropdown__link"
                >
                  Thêm Nha xuat ban
                </router-link>
              </div>
              <div class="dropdown-item">
                <router-link
                  :to="{ name: 'storebook' }"
                  class="dropdown__link"
                >
                  Thêm sach
                </router-link>
              </div>
              <div class="dropdown-item" @click="userStore.logout()">
                <router-link :to="{ name: 'home' }" class="dropdown__link">
                  Đăng xuất
                </router-link>
              </div>
            </div>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
              v-else
            >
              <div class="dropdown-item">
                <router-link
                  :to="{ name: 'personal', params: { id: userStore.user._id } }"
                  class="dropdown__link"
                >
                  Thông tin tài khoản
                </router-link>
              </div>
              <div class="dropdown-item" @click="userStore.logout()">
                Đăng xuất
              </div>
            </div>
          </div>
          <div
            class="cart"
            v-if="
              userStore.user.role === 'customer' || userStore.user.role === ''
            "
          >
            <font-awesome-icon :icon="['fas', 'cart-shopping']" />
            <router-link :to="{ name: 'cart' }" class="nav__link">
              Giỏ sách
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="categories">
          <div class="categories__item">
            <router-link to="/" class="nav__link">Trang Chủ</router-link>
          </div>
          <div class="categories__item">
            <router-link :to="{ name: 'book' }" class="nav__link">
              Sách
            </router-link>
          </div>
          <div class="categories__item">
            <router-link :to="{ name: 'contact' }" class="nav__link">
              Liên hệ
            </router-link>
          </div>
          <div class="categories__item">
            <input
              type="search"
              id="search"
              v-model="searchStore.contentSearch"
              placeholder="tìm kiếm..."
            />
            <font-awesome-icon
              :icon="['fas', 'magnifying-glass']"
              @click="handleSearch()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from "../stores/user.js";
import { useSearchStore } from "../stores/search.js";

export default {
  setup() {
    const userStore = useUserStore();
    const searchStore = useSearchStore();
    return {
      userStore,
      searchStore,
    };
  },
  data() {
    return {
      books: [],
      // filteredProducts: []
    };
  },

  methods: {
    filterItemsByName() {
      const temp = this.search__item.toLowerCase();
      return this.books.filter((item) =>
        item.name.toLowerCase().includes(temp)
      );
    },

    async handleSearch() {
      if (this.searchStore.contentSearch.length > 0) {
        this.$router.push({ name: "result-search" });
      }
    },
  },

  created() {
    axios
      .get("http://localhost:3000/book")
      .then((res) => {
        this.books = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.header-top {
  background-color: #fffefb;
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
}

.logo__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 30%;
  height: 80%;
  border-radius: 50%;
}

.header-top__sidebar--right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.logo__icon {
  margin-right: 0.8rem;
  color: #333;
}

.nav__link {
  color: inherit;
  text-decoration: none;
}

.categories {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 1px solid #ccc;
}

.categories__item {
  font-size: 1rem;
  line-height: 3.2rem;
  font-weight: 400;
  text-transform: uppercase;
}

#search {
  outline: none;
  border: none;
  border-radius: 5px;
  line-height: 2rem;
  padding-left: 12px;
  margin-right: 8px;
  background-color: #eee;
}

#dropdownMenuButton:focus {
  box-shadow: none;
}

.dropdown__link {
  color: inherit;
  text-decoration: none;
}
</style>
