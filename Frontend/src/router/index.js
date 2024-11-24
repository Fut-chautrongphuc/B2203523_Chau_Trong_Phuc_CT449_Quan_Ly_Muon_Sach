import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue"
import Login from "../views/Login.vue";
import NXB from "../views/NXB.vue";
import Sach from "../views/Sach.vue";
import DocGia from "../views/DocGia.vue";
import TheoDoiMuonSach from "../views/TheoDoiMuonSach.vue";
import NhanVien from "../views/NhanVien.vue";
import DaMuon from "../views/DaMuon.vue";

const routes = [
    {
        path: "/",
        name: "login",
        component: Login,
    },
    {
        path: "/home",
        name: "home",
        component: Home,
    },
    {
        path: "/nxb",
        name: "nxb",
        component: NXB,
    },
    {
        path: "/sach",
        name: "sach",
        component: Sach,
    },
    {
        path: "/docgia",
        name: "docgia",
        component: DocGia,
    },
    {
        path: "/theodoimuonsach",
        name: "theodoimuonsach",
        component: TheoDoiMuonSach,
    },
    {
        path: "/nhanvien",
        name: "nhanvien",
        component: NhanVien,
    },
    {
        path: "/damuon",
        name: "damuon",
        component: DaMuon
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("../views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;