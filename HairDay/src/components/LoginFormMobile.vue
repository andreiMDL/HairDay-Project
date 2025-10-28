<template>
  <div class="background-image"></div>
  <div class="container">
    <div class="form-container">
      <div class="auth-container" v-bind:class="{ 'slide-up': isSignUp }">
        <div class="logo-container">
          <img src="/assets/Logo-blur.svg" alt="">
        </div>
        <form action="#" class="sign-up-form" v-on:submit.prevent="handleSignup">
          <h1>Crie sua Conta</h1>
          <input type="text" name="name" placeholder="Nome" v-model="signupName"
            v-bind:class="{ 'has-error': signupErrors.name }">
          <input type="email" name="email" placeholder="Email" v-model="signupEmail"
            v-bind:class="{ 'has-error': signupErrors.email }">
          <input type="password" name="password" placeholder="Senha" v-model="signupPassword"
            v-bind:class="{ 'has-error': signupErrors.password }">
          <button class="button-signup">Cadastrar</button>
          <a href="#" class="switch-button" v-on:click.prevent="toggleForm">
            Já possui uma conta? Faça login!
          </a>
        </form>
        <div class="logo-container">
          <img src="/assets/Logo-blur.svg" alt="">
        </div>
        <form action="#" class="sign-in-form" v-on:submit.prevent="handlelogin">
          <h1>Faça Login</h1>
          <input type="email" name="email" placeholder="Email" v-model="loginEmail"
            v-bind:class="{ 'has-error': loginErrors.email }">
          <input type="password" name="password" placeholder="Senha" v-model="loginPassword"
            v-bind:class="{ 'has-error': loginErrors.password }">
          <button class="button-login">Entrar</button>
          <a href="#" class="switch-button" v-on:click="toggleForm">
            Cadastre-se aqui gratuitamente
          </a>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const isSignUp = ref(false);

const signupName = ref('');
const signupEmail = ref('');
const signupPassword = ref('');
const loginEmail = ref('');
const loginPassword = ref('');

const signupErrors = reactive({
  name: false,
  email: false,
  password: false,
});

const loginErrors = reactive({
  email: false,
  password: false,
});

function toggleForm() {
  isSignUp.value = !isSignUp.value;
}

const failedSingup = () => {
  toast.error('Erro ao realizar cadastro, tente novamente!', {
    position: 'top',
    duration: 3000,
    dismissible: true,
  });
};

const failedlogin = () => {
  toast.error('Erro ao realizar login, preencha os campos obrigatórios.', {
    position: 'top',
    duration: 3000,
    dismissible: true,
  });
};

const successSignup = () => {
  toast.success('Cadastro realizado com sucesso!', {
    position: 'top',
    duration: 3000,
    dismissible: true,
  });
}

const successLogin = () => {
  toast.success('Login realizado com sucesso!', {
    position: 'top',
    duration: 3000,
    dismissible: true,
  });
};

function handleSignup() {
  signupErrors.name = false;
  signupErrors.email = false;
  signupErrors.password = false;

  let hasError = false;

  if (!signupName.value) {
    signupErrors.name = true;
    hasError = true;
  }
  if (!signupEmail.value) {
    signupErrors.email = true;
    hasError = true;
  }
  if (!signupPassword.value) {
    signupErrors.password = true;
    hasError = true;
  }

  if (hasError) {
    failedSingup();
    return;
  }

  successSignup();
}

function handlelogin() {
  loginErrors.email = false;
  loginErrors.password = false;

  let hasError = false;

  if (!loginEmail.value) {
    loginErrors.email = true;
    hasError = true;
  }
  if (!loginPassword.value) {
    loginErrors.password = true;
    hasError = true;
  }

  if (hasError) {
    failedlogin();
    return;
  }

  successLogin();
  router.push('/schedules');
}
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100dvw;
  height: 100dvh;
}

.background-image {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('/assets/yellow-abstract-bg-3.png');
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding-bottom: 1rem;
}

.form-container {
  position: relative;
  width: 90dvw;
  max-width: 400px;
  height: 65dvh;
  max-height: 600px;
  display: flex;
  background-color: var(--color-gray-800);
  box-shadow: 0 0 15px black;
  overflow: hidden;
  border-radius: 3rem;
  z-index: 1;
}

.auth-container {
  position: absolute;
  width: 100%;
  height: 200%;
  top: 0;
  left: 0;
  transition: transform .6s ease-in-out;
}

.auth-container.slide-up {
  transform: translateY(-50%);
}

form {
  padding-inline: 2.5rem;
  padding-bottom: 2.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

h1 {
  font-weight: bold;
  color: #eee;
  margin-bottom: 1rem;
}

input {
  background-color: var(--color-gray-700);
  border: 1px solid var(--color-gray-600);
  box-shadow: 0 0 25px black;
  border-radius: 2rem;
  padding: 14px 25px;
  width: 100%;
  color: #eee;
  font-size: 1rem;
  transition: all .2s ease;
}

input:focus {
  outline: none;
  border-color: var(--color-yellow);
  box-shadow: 0 0 5px var(--color-yellow);
}

button {
  border-radius: 2rem;
  border: none;
  background-color: var(--color-yellow);
  color: var(--color-gray-800);
  box-shadow: 0 0 5px black;
  font-size: 1rem;
  font-weight: bold;
  padding: 14px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  width: 100%;
  cursor: pointer;
  margin-top: 1rem;
  transition: all .2s ease;
}

button:hover {
  opacity: 0.9;
}

button:active {
  scale: 1.05;
  box-shadow: inset 0 0 5px black;
}

.switch-button {
  text-decoration: none;
  color: #b68500;
  text-shadow: 0 0 5px #000000;
}

.has-error {
  border-color: #e74c4c;
  box-shadow: 0 0 5px #e74c4c;
}
</style>
