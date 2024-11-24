<template>
  <div class="container mt-4">
    <div class="card mb-4">
      <div class="card-header">
        <h5 class="mb-0">Danh Sách Nhân Viên</h5>
      </div>
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">MSNV</th>
              <th scope="col">Họ Tên NV</th>
              <th scope="col">Chức Vụ</th>
              <th scope="col">Địa Chỉ</th>
              <th scope="col">Số Điện Thoại</th>
              <th scope="col">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="nv in nhanvienList" :key="nv._id">
              <td>{{ nv._id }}</td>
              <td>{{ nv.hotennv }}</td>
              <td>{{ nv.chucvu }}</td>
              <td>{{ nv.diachi }}</td>
              <td>{{ nv.sodienthoai }}</td>
              <td>
                <button class="btn btn-sm btn-danger" @click="deleteNhanVien(nv._id)">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <button class="btn btn-primary mb-3" @click="codangthemnv = !codangthemnv">Thêm Nhân Viên</button>

    <form @submit.prevent="handleSubmit" v-if="codangthemnv" class="mb-4">
      <div class="mb-3">
        <label for="manv" class="form-label">Mã Nhân Viên</label>
        <input type="text" id="msnv" v-model="form.msnv" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="hotennv" class="form-label">Họ Tên</label>
        <input type="text" id="hotennv" v-model="form.hotennv" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mật Khẩu</label>
        <input type="password" id="password" v-model="form.password" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="chucvu" class="form-label">Chức Vụ</label>
        <input type="text" id="chucvu" v-model="form.chucvu" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="diachi" class="form-label">Địa Chỉ</label>
        <input type="text" id="diachi" v-model="form.diachi" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="sodienthoai" class="form-label">Số Điện Thoại</label>
        <input type="text" id="sodienthoai" v-model="form.sodienthoai" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Gửi</button>
    </form>
  </div>
</template>


<script>
import nhanvienService from '../services/nhanvien.service';

export default {
  data() {
    return {
      codangthemnv: false,
      nhanvienList: [], // Danh sách nhân viên
      form: {
        msnv: "", // Mã nhân viên
        tennv: "", // Tên nhân viên
        password: "", // Mật khẩu
        chucvu: "", // Chức vụ
        diachi: "", // Địa chỉ
        sodienthoai: "" // Số điện thoại
      }
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // Gửi dữ liệu thêm nhân viên
        await nhanvienService.create(this.form);
        // Cập nhật danh sách
        this.nhanvienList = await nhanvienService.findAll();
        this.codangthemnv = false; // Đóng form sau khi thêm
      } catch (error) {
        console.error("Lỗi khi thêm nhân viên:", error);
      }
    },
    async deleteNhanVien(id) {
      try {
        // Xóa nhân viên theo ID
        await nhanvienService.delete(id);
        // Cập nhật danh sách
        this.nhanvienList = await nhanvienService.findAll();
      } catch (error) {
        console.error("Lỗi khi xóa nhân viên:", error);
      }
    }
  },
  async mounted() {
    try {
      // Lấy danh sách nhân viên khi component được tải
      this.nhanvienList = await nhanvienService.findAll();
      //console.log(this.nhanvienList);
    } catch (error) {
      console.error("Lỗi khi tải danh sách nhân viên:", error);
    }
  }
};
</script>


<style scoped>
.card-header {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

form {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
