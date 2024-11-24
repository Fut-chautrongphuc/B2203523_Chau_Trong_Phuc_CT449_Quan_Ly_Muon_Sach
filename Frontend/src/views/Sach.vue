<template>
    <div class="container mt-4">
        <!-- Card hiển thị danh sách sách -->
        <div class="card mb-4">
            <div class="card-header bg-primary text-white">
                <h5 class="mb-0">Danh Sách Các Mục Sách</h5>
            </div>
            <div class="card-body">
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Mã sách</th>
                            <th scope="col">Tên sách</th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col">Số quyển</th>
                            <th scope="col">Năm xuất bản</th>
                            <th scope="col">Mã nhà xuất bản</th>
                            <th scope="col">Nguồn gốc/Tác giả</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="sach in sachList" :key="sach._id">
                            <td>{{ sach._id }}</td>
                            <td>{{ sach.tensach }}</td>
                            <td>{{ sach.dongia }}</td>
                            <td>{{ sach.soquyen }}</td>
                            <td>{{ sach.namxuatban }}</td>
                            <td>{{ sach.manhaxuatban }}</td>
                            <td>{{ sach.nguongoc_tacgia }}</td>
                            <td>
                                <button class="btn btn-sm btn-danger" @click="deleteSach(sach._id)">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Nút thêm sách -->
        <button class="btn btn-success mb-3" @click="codangthemsach = !codangthemsach">
            <i class="bi bi-plus-circle"></i> Thêm Sách
        </button>

        <!-- Form thêm sách -->
        <form @submit.prevent="handleSubmit" v-if="codangthemsach" class="border p-4 rounded bg-light">
            <h5 class="mb-4">Thêm Sách Mới</h5>
            <div class="mb-3">
                <label for="masach" class="form-label">Mã sách</label>
                <input type="text" id="masach" v-model="form.masach" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="tensach" class="form-label">Tên sách</label>
                <input type="text" id="tensach" v-model="form.tensach" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="dongia" class="form-label">Đơn giá</label>
                <input type="number" id="dongia" v-model="form.dongia" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="soquyen" class="form-label">Số quyển</label>
                <input type="number" id="soquyen" v-model="form.soquyen" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="namxuatban" class="form-label">Năm xuất bản</label>
                <input type="number" id="namxuatban" v-model="form.namxuatban" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="manhaxuatban" class="form-label">Mã nhà xuất bản</label>
                <input type="text" id="manhaxuatban" v-model="form.manhaxuatban" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="nguongoc_tacgia" class="form-label">Nguồn gốc/Tác giả</label>
                <input type="text" id="nguongoc_tacgia" v-model="form.nguongoc_tacgia" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Gửi</button>
        </form>
    </div>
</template>

<script>
import sachService from '../services/sach.service';

export default {
    data() {
        return {
            codangthemsach: false,
            sachList: [], // Danh sách sách
            form: {
                masach: "",
                tensach: "",
                dongia: 0,
                soquyen: 0,
                namxuatban: "",
                manhaxuatban: "",
                nguongoc_tacgia: "",
            },
        };
    },
    methods: {
        async handleSubmit() {
            try {
                await sachService.create(this.form);
                this.sachList = await sachService.findAll();
                this.codangthemsach = false;
            } catch (error) {
                console.error("Lỗi khi thêm sách:", error);
            }
        },
        async deleteSach(id) {
            try {
                await sachService.delete(id);
                this.sachList = await sachService.findAll();
            } catch (error) {
                console.error("Lỗi khi xóa sách:", error);
            }
        },
    },
    async mounted() {
        try {
            this.sachList = await sachService.findAll();
        } catch (error) {
            console.error("Lỗi khi tải danh sách sách:", error);
        }
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
