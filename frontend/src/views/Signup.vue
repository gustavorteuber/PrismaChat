<template>
  <div
    class="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
  >
    <!-- <img
      src="../assets/logo_prismabox_v2_vertical-e1655142716486.png"
      alt=""
      class="h-20"
    /> -->
    <div class="m-5"></div>
    <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
          Criar conta
        </h1>
        <form
          class="space-y-4 md:space-y-6"
          action="#"
          @submit.prevent="handleSubmit"
        >
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Nome:</label
            >
            <input
              type="text"
              name="name"
              id="name"
              v-model="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="ex: Gustavo Reis"
              required
            />
          </div>
          <div>
            <label
              for="user"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Username:</label
            >
            <input
              type="text"
              name="user"
              id="user"
              v-model="username"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="ex: sergio.plinho"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Senha:
            </label>
            <input
              type="password"
              name="password"
              v-model="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              for="confirm-password"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Confirme sua senha:
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              v-model="confirmPassword"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>
          <div class="flex items-start"></div>
          <button
            type="submit"
            class="w-full text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Criar conta
          </button>
        </form>
        <p class="text-sm font-light text-gray-500">
          Já tem uma conta?
          <RouterLink to="/" class="font-medium text-green-400 hover:underline">
            Login</RouterLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    handleSubmit() {
      axios
        .post("http://localhost:3000/signup", {
          name: this.name,
          username: this.username,
          password: this.password,
          confirmPassword: this.confirmPassword, // Verifique se o nome do campo está correto
        })
        .then(() => {
          const toast = useToast();
          toast.success("Usuario criado com sucesso!");
          this.$router.push("/");
        })
        .catch((error) => {
          const toast = useToast();
          toast.error("Erro ao criar usuario!");
        });
    },
  },
};
</script>
