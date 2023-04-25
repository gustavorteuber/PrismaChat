<template>
  <div class="h-screen flex justify-center items-center">
    <div
      class="bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg shadow-lg p-5 w-96"
    >
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <img
            src="../assets/logo_prismabox_v2_vertical-e1655142716486.png"
            alt="Logo"
            class="h-10 w-10 rounded-full mr-2"
          />
          <h1 class="text-xl font-bold text-gray-800">PrismaChat</h1>
        </div>
        <button class="text-red-800" @click="disconnect">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </button>
      </div>
      <hr class="my-2" />
      <div class="h-64 overflow-y-scroll" ref="messageContainer">
        <transition-group name="message-list" tag="div">
          <div v-for="(message, index) in messages" :key="index">
            <div
              v-bind:class="{
                'flex flex-col-reverse items-end': message.name === name,
                'flex flex-col items-start': message.name !== name,
              }"
              class="mb-2"
            >
              <div
                v-bind:class="{
                  'bg-green-500 text-white rounded-t-lg rounded-bl-lg rounded-br-lg':
                    message.name === name,
                  'bg-gray-200 text-gray-800 rounded-t-lg rounded-br-lg rounded-bl-lg shadow-md':
                    message.name !== name,
                }"
                class="py-2 px-4 max-w-xs break-words"
              >
                {{ message.message }}
              </div>
              <p
                v-bind:class="{
                  'text-sm text-right': message.name === name,
                  'text-sm': message.name !== name,
                }"
                class="text-gray-500"
              >
                {{ message.name }}
              </p>
            </div>
          </div>
        </transition-group>
      </div>
      <div class="mt-4 flex">
        <input
          type="text"
          class="border rounded-l-full py-2 px-3 w-full"
          v-model="message"
          placeholder="Digite uma mensagem..."
          @keyup.enter="sendMessage"
        />
        <button
          class="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded ml-2"
          @click="sendMessage"
        >
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.message-list-enter-active,
.message-list-leave-active {
  transition: all 0.3s;
}

.message-list-enter {
  opacity: 0;
  transform: translateY(20px);
}

.message-list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.bg-green-500 {
  background-color: #0d3b7f;
}

.bg-red-500 {
  background-color: #7a1c17;
}

.shadow-md {
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
}

.max-w-xs {
  max-width: 200px;
}

input:focus {
  outline: none;
  border-color: #25d366;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
      message: "",
      name: localStorage.getItem("username"),
      endpoint: "http://localhost:3000",
      intervalId: null,
    };
  },
  methods: {
    async connect() {
      try {
        const { data } = await axios.post(`${this.endpoint}/connect`, {
          name: this.name,
        });
        this.getMessages();
        this.intervalId = setInterval(this.getMessages, 1000);
      } catch (error) {
        console.error(error);
      }
    },
    async disconnect() {
      try {
        await axios.post(`${this.endpoint}/disconnect`, { name: this.name });
        clearInterval(this.intervalId);
        this.messages = [];
      } catch (error) {
        console.error(error);
      }
      this.$router.push("/");
    },
    async sendMessage() {
      if (this.message !== "") {
        try {
          await axios.post(`${this.endpoint}/message`, {
            name: this.name,
            message: this.message,
          });
          this.messages.push({ name: this.name, message: this.message });
          this.message = "";

          this.$nextTick(() => {
            const messageContainer = this.$refs.messageContainer;
            messageContainer.scrollTo({
              top: messageContainer.scrollHeight,
              behavior: "smooth",
            });
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    async getMessages() {
      try {
        const { data } = await axios.get(`${this.endpoint}/messages`);
        this.messages = data;

        this.$nextTick(() => {
          const messageContainer = this.$refs.messageContainer;
          messageContainer.scrollTo({
            top: messageContainer.scrollHeight,
            behavior: "smooth",
          });
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.connect();
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>
