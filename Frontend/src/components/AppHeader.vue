<template>
  <v-app-bar app color="primary" dark elevate-on-scroll>
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title class="font-weight-bold">QL MƯỢN SÁCH</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn text color="white" v-if="this.getAuth && this.getAuth.role==='docgia'" to="/home">Home</v-btn>
    <v-btn text color="white" v-if="this.getAuth && this.getAuth.role!=='docgia'"><router-link to="/nxb" class="nav-link">NXB</router-link></v-btn>
    <v-btn text color="white" v-if="this.getAuth && this.getAuth.role!=='docgia'"><router-link to="/sach" class="nav-link">SÁCH</router-link></v-btn>
    <v-btn text color="white" v-if="this.getAuth && this.getAuth.role!=='docgia'"><router-link to="/theodoimuonsach" class="nav-link">THEO DÕI MƯỢN SÁCH</router-link></v-btn>
    <v-btn text color="white" v-if="this.getAuth && this.getAuth.role!=='docgia'"><router-link to="/docgia" class="nav-link">ĐỘC GIẢ</router-link></v-btn>
    <v-btn text color="white" v-if="this.getAuth && this.getAuth.role!=='docgia'"><router-link to="/nhanvien" class="nav-link">NHÂN VIÊN</router-link></v-btn>
    <v-btn text color="white" v-if="this.getAuth && this.getAuth.role==='docgia'"><router-link to="/damuon" class="nav-link">Sách đăng ký mượn</router-link></v-btn>
    <v-btn
      text
      color="white"
      v-if="getAuth"
      @click="logout"
      to="/"
    >
      Đăng Xuất
    </v-btn>
    <v-btn
      text
      color="white"
      v-else
      to="/"
    >
      Đăng Nhập
    </v-btn>
  </v-app-bar>
</template>

<script>
import authService from "../services/auth.service";
import { mapGetters } from "vuex";

export default {
  name: "AppBar",
  methods: {
    async logout() {
      try {
        await authService.logout();
        this.$store.commit("setAuth", null); // Cập nhật trạng thái đăng nhập trong Vuex
        this.$router.push("/");
      } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
      }
    },
  },
  computed: {
    ...mapGetters(["getAuth"]), // Truy cập trạng thái đăng nhập từ Vuex
  },
  async mounted() {
    try {
      await this.$store.dispatch('fetchAuth');
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái đăng nhập:", error);
    }
  },
};
</script>

<style scoped>
/* Custom Header Styles */
.v-app-bar {
  background: linear-gradient(to right, #0066cc, #003399); /* Hiệu ứng gradient */
  border-bottom: 2px solid #ffffff; /* Đường viền dưới */
  padding-left: 16px; /* Thêm lề trái */
  padding-right: 16px; /* Thêm lề phải */
  color: white; /* Màu chữ */
}

.v-app-bar-title {
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
}

.v-btn {
  margin: 0 8px; /* Tạo khoảng cách giữa các nút */
  font-weight: bold;
}

.nav-link {
  color: inherit;
  text-decoration: none;
  font-size: 0.95rem;
}

.nav-link:hover {
  text-decoration: underline;
}

/* Hiệu ứng khi cuộn */
.v-app-bar--is-scrolled {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Đổ bóng khi cuộn */
}
</style>
