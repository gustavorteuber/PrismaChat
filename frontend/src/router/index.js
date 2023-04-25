import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Form from "../views/Form.vue";
import Signup from "../views/Signup.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/form",
    name: "Form",
    component: Form,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];
const router = Router();
export default router;
function Router() {
  const router = new createRouter({
    history: createWebHistory(),
    routes,
  });
  return router;
}
