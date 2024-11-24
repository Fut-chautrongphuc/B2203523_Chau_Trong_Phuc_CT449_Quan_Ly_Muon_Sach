<template>
  <v-footer app color="primary" dark>
    <v-container>
      <v-row justify="center" align="center" class="footer-content">
        <v-col cols="12" md="6" class="text-center">
          <span>&copy; 2024 Quản Lý Mượn Sách</span>
        </v-col>
        <v-col cols="12" md="6" class="text-center">
          <v-btn text color="white" class="footer-link">
            <router-link to="/policy" class="nav-link">Liên hệ với chúng tôi</router-link>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
/* Custom Footer Styles */
.v-footer {
  background: linear-gradient(to right, #003399, #0066cc);
  /* Hiệu ứng gradient tương tự AppHeader */
  border-top: 2px solid #ffffff;
  /* Đường viền trên */
  padding: 16px 0;
}

.footer-content {
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  color: #ffffff;
}

.footer-link {
  margin: 0 8px;
  /* Khoảng cách giữa các nút */
}

.nav-link {
  color: inherit;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
