<template>
    <div class="container mt-4">
        <!-- Card hiển thị danh sách độc giả -->
        <div class="card mb-4">
            <div class="card-header bg-primary text-white">
                <h5 class="mb-0">Danh Sách Độc Giả</h5>
            </div>
            <div class="card-body">
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Mã Độc Giả</th>
                            <th scope="col">Họ Lót</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Ngày Sinh</th>
                            <th scope="col">Phái</th>
                            <th scope="col">Địa Chỉ</th>
                            <th scope="col">Điện Thoại</th>
                            <th scope="col">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="docgia in docgiaList" :key="docgia._id">
                            <td>{{ docgia._id }}</td>
                            <td>{{ docgia.ten }}</td>
                            <td>{{ docgia.holot }}</td>
                            <td>{{ docgia.ngaysinh }}</td>
                            <td>{{ docgia.phai }}</td>
                            <td>{{ docgia.diachi }}</td>
                            <td>{{ docgia.dienthoai }}</td>
                            <td>
                                <button class="btn btn-sm btn-danger" @click="deleteDocGia(docgia._id)">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Nút thêm độc giả -->
        <button class="btn btn-success mb-3" @click="codangthemDocGia = !codangthemDocGia">
            <i class="bi bi-plus-circle"></i> Thêm Độc Giả
        </button>

        <form @submit.prevent="handleSubmit" v-if="codangthemDocGia" class="border p-4 rounded bg-light">
            <h5 class="mb-4">Thêm Độc Giả Mới</h5>
            <div class="mb-3">
                <label for="madocgia" class="form-label">Mã Độc Giả</label>
                <input type="text" id="madocgia" v-model="form.madocgia" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="holot" class="form-label">Họ Lót</label>
                <input type="text" id="holot" v-model="form.ten" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="ten" class="form-label">Tên</label>
                <input type="text" id="ten" v-model="form.holot" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="ten" class="form-label">Mật khẩu</label>
                <input type="password" id="ten" v-model="form.password" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="ngaysinh" class="form-label">Ngày Sinh</label>
                <input type="date" id="ngaysinh" v-model="form.ngaysinh" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="phai" class="form-label">Phái</label>
                <select id="phai" v-model="form.phai" class="form-control" required>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="diachi" class="form-label">Địa Chỉ</label>
                <input type="text" id="diachi" v-model="form.diachi" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="dienthoai" class="form-label">Điện Thoại</label>
                <input type="text" id="dienthoai" v-model="form.dienthoai" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Gửi</button>
        </form>
    </div>
</template>

<script>
import docgiaService from '../services/docgia.service';
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            codangthemDocGia: false,
            docgiaList: [], // Danh sách độc giả
            form: {
                _id: "",
                holot: "",
                ten: "",
                ngaysinh: "",
                phai: "Nam",
                diachi: "",
                dienthoai: "",
                password: "",
            }
        };
    },
    methods: {
        async handleSubmit() {
            try {
                console.log(this.form);
                await docgiaService.create(this.form);
                this.docgiaList = await docgiaService.findAll();
                this.codangthemDocGia = false;
            } catch (error) {
                console.error("Lỗi khi thêm độc giả:", error);
            }
        },
        async deleteDocGia(id) {
            try {
                await docgiaService.delete(id);
                this.docgiaList = await docgiaService.findAll();
            } catch (error) {
                console.error("Lỗi khi xóa độc giả:", error);
            }
        }
    },
    async mounted() {
        try {
            this.docgiaList = await docgiaService.findAll();
        } catch (error) {
            console.error("Lỗi khi tải danh sách độc giả:", error);
        }
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
