<template>
    <div class="container mt-4">
        <!-- Card hiển thị danh sách theo dõi mượn sách -->
        <div class="card mb-4">
            <div class="card-header bg-primary text-white">
                <h5 class="mb-0">Theo Dõi Mượn Sách</h5>
            </div>
            <div class="card-body">
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Mã Độc Giả</th>
                            <th scope="col">Mã Sách</th>
                            <th scope="col">Ngày Mượn</th>
                            <th scope="col">Ngày Trả</th>
                            <th scope="col">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="muonsach in muonsachList" :key="muonsach._id">
                            <td>{{ muonsach.madocgia }}</td>
                            <td>{{ muonsach.masach }}</td>
                            <td>{{ muonsach.ngaymuon }}</td>
                            <td>{{ muonsach.ngaytra }}</td>
                            <td>
                                <button class="btn btn-sm btn-danger" @click="deleteMuonSach(muonsach._id)">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Nút thêm mượn sách -->
        <button class="btn btn-success mb-3" @click="codangthemMuonSach = !codangthemMuonSach">
            <i class="bi bi-plus-circle"></i> Thêm Mượn Sách
        </button>

        <!-- Form thêm mượn sách -->
        <form @submit.prevent="handleSubmit" v-if="codangthemMuonSach" class="border p-4 rounded bg-light">
            <h5 class="mb-4">Thêm Mượn Sách</h5>
            <div class="mb-3">
                <label for="madocgia" class="form-label">Mã Độc Giả</label>
                <input type="text" id="madocgia" v-model="form.madocgia" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="masach" class="form-label">Mã Sách</label>
                <input type="text" id="masach" v-model="form.masach" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="ngaymuon" class="form-label">Ngày Mượn</label>
                <input type="date" id="ngaymuon" v-model="form.ngaymuon" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="ngaytra" class="form-label">Ngày Trả</label>
                <input type="date" id="ngaytra" v-model="form.ngaytra" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary">Gửi</button>
        </form>
    </div>
</template>

<script>
import muonsachService from '../services/theodoimuonsach.service'; // Giả sử bạn đã có service để gọi API

export default {
    data() {
        return {
            codangthemMuonSach: false,
            muonsachList: [], // Danh sách các lần mượn sách
            form: {
                madocgia: "",
                masach: "",
                ngaymuon: "",
                ngaytra: ""
            }
        };
    },
    methods: {
        // Hàm xử lý khi submit form
        async handleSubmit() {
            try {
                console.log(this.form);
                const response = await muonsachService.create(this.form); // Gửi yêu cầu tạo mới
                if (response && response._id) {
                    this.muonsachList.push(response); // Thêm vào danh sách mà không tải lại
                    this.codangthemMuonSach = false;
                    console.log("Mượn sách thành công!");
                }
            } catch (error) {
                console.error("Lỗi khi thêm mượn sách:", error);
            }
        },

        // Hàm xóa mượn sách
        async deleteMuonSach(id) {
            try {
                await muonsachService.delete(id); // Gọi API xóa
                this.muonsachList = this.muonsachList.filter(muonsach => muonsach._id !== id); // Xóa khỏi danh sách
            } catch (error) {
                console.error("Lỗi khi xóa mượn sách:", error);
            }
        }
    },
    // Khi component được mounted, lấy danh sách mượn sách
    async mounted() {
        try {
            this.muonsachList = await muonsachService.findAll();
        } catch (error) {
            console.error("Lỗi khi tải danh sách mượn sách:", error);
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

.btn-success {
    background-color: #28a745;
    border-color: #28a745;
}

form {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
}
</style>
