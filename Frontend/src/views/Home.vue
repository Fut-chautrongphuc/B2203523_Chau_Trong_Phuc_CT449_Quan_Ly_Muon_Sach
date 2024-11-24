<template>
  <div class="container mt-4">
    <!-- Card hiển thị danh sách sách -->
    <div class="card mb-4">
      <div class="card-header">
        <h5 class="mb-0">Danh Sách Các Mục Sách</h5>
      </div>
      <div class="card-body">
        <table class="table table-striped table-hover">
          <thead class="table-dark">
            <tr>
              <th>Mã sách</th>
              <th>Tên sách</th>
              <th>Đơn giá</th>
              <th>Số quyển</th>
              <th>Năm xuất bản</th>
              <th>Mã nhà xuất bản</th>
              <th>Nguồn gốc/Tác giả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody v-for="sach in sachList" :key="sach._id">
            <tr>
              <td>{{ sach._id }}</td>
              <td>{{ sach.tensach }}</td>
              <td>{{ sach.dongia }}</td>
              <td>{{ sach.soquyen }}</td>
              <td>{{ sach.namxuatban }}</td>
              <td>{{ sach.manhaxuatban }}</td>
              <td>{{ sach.nguongoc_tacgia }}</td>
              <td>
                <button
                  class="btn btn-sm btn-primary"
                  @click="toggleForm(sach._id)"
                >
                  Mượn
                </button>
              </td>
            </tr>
            <!-- Form mượn sách -->
            <tr v-if="selectedBookId === sach._id">
              <td colspan="8">
                <div class="borrow-form">
                  <form @submit.prevent="handleBorrow(sach._id)">
                    <div class="form-group">
                      <label for="ngayMuon">Ngày mượn</label>
                      <input
                        type="date"
                        id="ngayMuon"
                        v-model="borrowForm.ngayMuon"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="ngayTra">Ngày trả</label>
                      <input
                        type="date"
                        id="ngayTra"
                        v-model="borrowForm.ngayTra"
                        class="form-control"
                        :class="{ 'is-invalid': !isNgayTraValid(borrowForm.ngayTra) }"
                        required
                      />
                      <div
                        v-if="!isNgayTraValid(borrowForm.ngayTra)"
                        class="invalid-feedback"
                      >
                        Ngày trả phải sau ngày mượn.
                      </div>
                    </div>
                    <button type="submit" class="btn btn-success">
                      Gửi
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="toggleForm(null)"
                    >
                      Hủy
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import sachService from "../services/sach.service";
import theodoimuonsachService from "../services/theodoimuonsach.service";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      sachList: [], // Danh sách sách từ API
      selectedBookId: null, // ID sách đang chọn mượn
      borrowForm: {
        ngayMuon: "",
        ngayTra: "",
      },
    };
  },
  methods: {
    async fetchSachList() {
      try {
        this.sachList = await sachService.findAll();
      } catch (error) {
        console.error("Lỗi khi tải danh sách sách:", error);
      }
    },
    toggleForm(bookId) {
      this.selectedBookId = this.selectedBookId === bookId ? null : bookId;
    },
    isNgayTraValid(ngayTra) {
      if (!this.borrowForm.ngayMuon || !ngayTra) return true;
      const ngayMuon = new Date(this.borrowForm.ngayMuon);
      const ngayTraDate = new Date(ngayTra);
      return ngayTraDate > ngayMuon;
    },
    async handleBorrow(bookId) {
      // if (!this.isNgayTraValid(this.borrowForm.ngayTra)) {
      //   alert("Ngày trả không hợp lệ!");
      //   return;
      // }
      const payload= {
        ngaymuon: this.borrowForm.ngayMuon,
        ngaytra: this.borrowForm.ngayTra,
        masach: bookId,
        madocgia: this.getAuth.madocgia
      }
      console.log(payload);
      try {
        await theodoimuonsachService.create(payload);
        alert("Mượn sách thành công!");
        this.resetBorrowForm();
      } catch (error) {
        console.error("Lỗi khi mượn sách:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
      }
    },
    resetBorrowForm() {
      this.borrowForm.ngayMuon = "";
      this.borrowForm.ngayTra = "";
      this.selectedBookId = null;
    },
  },
  async mounted() {
    await this.fetchSachList();
  },
      computed: {
    ...mapGetters(["getAuth"]), // Truy cập trạng thái đăng nhập từ Vuex
  },
};
</script>

<style scoped>
.card-header {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.table-hover tbody tr:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}

.borrow-form {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f8f9fa;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
}
</style>
