<template>
  <v-container>
    <v-form v-if="!isLogin" @submit.prevent="handleLogin">
      <v-text-field v-model="msnv" label="Tên Đăng Nhập" required></v-text-field>
      <v-text-field v-model="password" label="Mật Khẩu" type="password" required></v-text-field>
      <v-btn type="submit" color="primary">Đăng Nhập</v-btn>
    </v-form>
    <div v-if="isLogin">
      <h1>Chào mừng bạn đến với Home</h1>
      <v-btn @click="goHome">Về Trang Chủ</v-btn>
    </div>
  </v-container>
</template>

<script>
import authService from '../services/auth.service';


export default {
  data() {
    return {
      isLogin: false,  // Trạng thái đăng nhập
      msnv: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        // Gọi dịch vụ đăng nhập
        const response = await authService.login({ msnv: this.msnv, password: this.password });
        await this.$store.dispatch('fetchAuth');
          // Đặt trạng thái đăng nhập thành công
          this.isLogin = true;
          // Chuyển hướng đến trang Home sau khi đăng nhập thành công
          this.$router.push({ name: 'home' });  // Cần có route với tên 'home' trong Vue Rout
      } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        alert('Đã xảy ra lỗi, vui lòng thử lại.');
      }
    },
    goHome() {
      this.$router.push({ name: 'home' });  // Quay lại trang Home
    },
    async mounted() {
    try {
      await this.$store.dispatch('fetchAuth');
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái đăng nhập:", error);
    }
  },
  },
};
</script>

<style scoped>
/* CSS tùy chỉnh nếu cần */
</style>
