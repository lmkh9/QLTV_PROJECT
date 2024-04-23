import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        name: '',
        _id: '',
        role: ''
      }
    }
  },
  actions: {
    async logout(){
      this.user.name = ""
      this.user._id = ""
      this.user.role = ""
      localStorage.clear();
      window.location.href = '/';
    }
  },
  persist: [
    {
      key: 'account',
      paths: ['user'],
      storage: localStorage
    }
  ]
})

