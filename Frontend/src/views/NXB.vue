<template>
  <div class="container mt-4">
    <div class="card mb-4">
      <div class="card-header">
        <h5 class="mb-0">Danh Sách Các Nhà Xuất Bản</h5>
      </div>
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Mã NXB</th>
              <th scope="col">Tên NXB</th>
              <th scope="col">Địa Chỉ</th>
              <th scope="col">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="nxb in nxbs" :key="nxb._id">
              <td>{{ nxb._id }}</td>
              <td>{{ nxb.tennxb }}</td>
              <td>{{ nxb.diachi }}</td>
              <td>
                <button class="btn btn-sm btn-primary" @click="deleteNxb(nxb._id)">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <button class="btn btn-primary mb-3" @click="codangthemnxb = !codangthemnxb">Thêm NXB</button>

    <form @submit.prevent="handleSubmit" v-if="codangthemnxb" class="mb-4">
      <div class="mb-3">
        <label for="manxb" class="form-label">Mã NXB</label>
        <input type="text" id="manxb" v-model="form.manxb" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="tennxb" class="form-label">Tên NXB</label>
        <input type="text" id="tennxb" v-model="form.tennxb" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="diachi" class="form-label">Địa Chỉ</label>
        <input type="text" id="diachi" v-model="form.diachi" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Gửi</button>
    </form>
  </div>
</template>

<script>
import nxbService from '../services/nxb.service';

export default {
  data() {
    return {
      codangthemnxb: false,
      nxbs: [],
      form: {
        manxb: "",
        tennxb: "",
        diachi: ""
      }
    };
  },
  methods: {
    async handleSubmit() {
      await nxbService.create(this.form);
      this.nxbs = await nxbService.findAll();
      this.codangthemnxb = false;
    },
    async deleteNxb(id) {
      await nxbService.delete(id);
      this.nxbs = await nxbService.findAll();
    }
  },
  async mounted() {
    this.nxbs = await nxbService.findAll();
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

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

form {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
