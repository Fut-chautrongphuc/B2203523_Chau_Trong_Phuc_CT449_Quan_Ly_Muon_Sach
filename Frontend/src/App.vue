<template>
  <v-app>
    <AppHeader />
    <v-main>
      <v-container>
        <div id="nav">
        </div>
        <router-view />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue'
import { mapGetters } from 'vuex/dist/vuex.cjs.js';

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  computed: {
    ...mapGetters(['getAuth']), // Truy cập biến auth từ Vuex store
  },
  async mounted() {
    try {
      await this.$store.dispatch('fetchAuth'); // Gọi action để fetch auth
      console.log('Auth:', this.getAuth); // Kiểm tra auth trong console
    } catch (error) {
      console.error('Lỗi khi lấy auth:', error);
    }
  },
};
</script>

<style>
/* Thêm CSS tùy chỉnh ở đây nếu cần */
</style>
