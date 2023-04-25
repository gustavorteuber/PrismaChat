<template>
  <div class="h-screen flex justify-center items-center">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <img
        src="../assets/logo_prismabox_v2_vertical-e1655142716486.png"
        alt=""
        class="h-28"
      />
      <div class="m-5"></div>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Entre agora usando seu usuário!
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="login">
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Username:</label
              >
              <input
                type="text"
                name="username"
                id="username"
                v-model="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ex: gustavorteuber"
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Senha:</label
              >
              <input
                type="password"
                name="password"
                id="password"
                v-model="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-sky-900 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Entrar
            </button>
            <p class="text-sm font-light text-gray-500">
              Ainda não tem uma conta?
              <RouterLink
                to="/signup"
                class="font-medium text-primary-600 hover:underline"
              >
                Criar agora
              </RouterLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", this.username);
        const toast = useToast();
        toast.success("Login realizado com sucesso!");
        this.$router.push("/form");
      } catch (error) {
        const toast = useToast();
        toast.error("Erro ao realizar login!");
        this.error = error.response.data.message;
      }
    },
  },
};
</script>
