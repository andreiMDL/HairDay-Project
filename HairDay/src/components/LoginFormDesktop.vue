<template>
	<div class="container" :class="{ 'right-panel-active': isPanelActive }" id="container">
		<div class="form-container sign-up-container">
			<form action="#" @submit.prevent="handleSignup">
				<h1>Crie sua Conta</h1>
				<input type="text" name="name" placeholder="Nome" v-model="signupName"
					v-bind:class="{ 'has-error': signupErrors.name }">
				<input type="email" name="email" placeholder="Email" v-model="signupEmail"
					v-bind:class="{ 'has-error': signupErrors.email }">
				<input type="password" name="password" placeholder="Senha" v-model="signupPassword"
					v-bind:class="{ 'has-error': signupErrors.password }">
				<button class="button-signup">Cadastrar</button>
			</form>
		</div>
		<div class="form-container sign-in-container">
			<form action="#" @submit.prevent="handleLogin">
				<h1>Faça login</h1>
				<input type="email" name="email" placeholder="Email" v-model="loginEmail"
					v-bind:class="{ 'has-error': loginErrors.email }">
				<input type="password" name="password" placeholder="Senha" v-model="loginPassword"
					v-bind:class="{ 'has-error': loginErrors.email }">
				<a class="forgot-password" href="#">Esqueci minha senha</a>
				<button>Entrar</button>
			</form>
		</div>
		<div class="overlay-container">
			<div class="overlay">
				<div class="overlay-panel overlay-left">
					<h1>Já possui uma conta?</h1>
					<p>Faça login para acessar sua agenda e gerenciar seus horários.</p>
					<button class="ghost" @click="isPanelActive = false" id="login">Entrar</button>
				</div>
				<div class="overlay-panel overlay-right">
					<h1>Ainda não é possui uma conta?</h1>
					<p>Cadastre-se para começar a organizar seus agendamentos e simplificar seu dia a dia.</p>
					<button class="ghost" @click="isPanelActive = true" id="signUp">Cadastre-se</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const router = useRouter();
const isPanelActive = ref(false);

const loginEmail = ref('');
const loginPassword = ref('');
const toast = useToast();

const signupErrors = reactive({
	name: false,
	email: false,
	password: false,
});

const loginErrors = reactive({
	email: false,
	password: false,
});

const successLogin = () => {
	toast.success('Login realizado com sucesso!', {
		position: 'top',
		duration: 3000,
		dismissible: true,
	});
};

const failedLogin = () => {
	toast.error('Erro ao realizar login. Por favor, preencha o email e a senha.', {
		position: 'top',
		duration: 3000,
		dismissible: true,
	});
};

const successSignup = () => {
	toast.success(`Cadastro realizado com sucesso! Seja bem vindo(a) ${signupName.value}!`, {
		position: 'top',
		duration: 3000,
		dismissible: true,
	});
};

const failedSingup = () => {
	toast.error('Erro ao realizar cadastro, tente novamente!', {
		position: 'top',
		duration: 3000,
		dismissible: true,
	})
}

const handleLogin = () => {
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
    failedLogin();
    return;
  }

  successLogin();
  router.push('/schedules');
};

const signupName = ref('');
const signupEmail = ref('');
const signupPassword = ref('');

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

</script>
<style scoped>

* {
	box-sizing: border-box;
}


body {
	display: flex;
	justify-content: center;
	align-items: center;
  flex-direction: column;
	height: 100vh;
	margin: -20px 0 50px;
}

img {
  width: 180px;
}

h1 {
	margin: 0;
	margin-bottom: 1rem;
	font-weight: bold;
}


h2 {
	text-align: center;
}


p {
	font-weight: 400;
  text-shadow: 0 0 5px rgb(0, 0, 0);
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}


span {
	font-size: 12px;
}


a {
	color: var(--color-gray-300);
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
  transition: .2s ease;
}

a:hover {
  color: var(--color-yellow);
  scale: 1.05;
}


button {
	border-radius: 2rem;
	border: 1px solid var(--color-yellow);
	background-color: var(--color-gray-600);
	color: var(--color-yellow);
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
  transition: .2s ease;
}

button:hover {
  scale: 1.1;
  box-shadow: 0 0 10px rgb(255, 174, 0);
  text-shadow: 0 0 10px rgb(255, 174, 0);
}


button:active {
	transform: scale(0.95);
}


button:focus {
	outline: none;
}

.button-signup {
  margin-top: 3rem;
}


button.ghost {
  color: #eee;
	background-color: rgba(255, 115, 0, 0.082);
	border: 1px solid rgb(70, 48, 0);
  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px rgb(70, 48, 0);
  text-shadow: 0 0 10px rgb(0, 0, 0);
  transition: .2s ease-in;
}

button.ghost:hover {
  scale: 1.1;
  background-color: rgba(255, 166, 0, 0.342);
  box-shadow:  0 0 10px var(--color-gray-800);
  text-shadow: 0 0 10px var(--color-gray-800);
  cursor: pointer;
}


form {
  background-color: var(--color-gray-800);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}


input {
  color: #eee;
	background-color: var(--color-gray-600);
	border: 1px solid var(--color-gray-800);
  box-shadow: 0 0 10px black;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
  border-radius: 2rem;
  transition: .2s ease;
}

input:focus {
  outline: none;
  border: 1px solid var(--color-yellow);
  box-shadow: 0 0 10px black,
              0 0 5px rgb(255, 196, 0);
}

input:hover {
  border: 1px solid var(--color-yellow);
  box-shadow: 0 0 10px black,
              0 0 5px rgb(255, 196, 0);
}

.container {
	border-radius: 2rem;
  border: 3px solid var(--color-gray-700);
  box-shadow: 0 0 28px rgb(0, 0, 0);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 580px;
  background-color: var(--color-gray-800);
}


.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}


.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}


.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}


.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}


.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}


@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}

	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}


.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}


.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}


.overlay {
	background: url(/public/assets/yellow-abstract-bg-2.png);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
  border-radius: 2rem;
  text-shadow: 0 0 10px rgb(61, 33, 0);
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  transform: translateX(0);
	transition: transform 0.6s ease-in-out;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0);
}



.container.right-panel-active .overlay {
  	transform: translateX(50%);
}


.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}


.overlay-left {
	transform: translateX(-20%);
}


.container.right-panel-active .overlay-left {
	transform: translateX(0);
}


.overlay-right {
	right: 0;
	transform: translateX(0);
}


.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}


.social-container {
	margin: 20px 0;
}


.social-container a {
  font-size: 24px;
  color: #eee;
	border: 1px solid var(--color-yellow);
	border-radius: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
  text-align: center;
  line-height: 16px;
	margin: 0 10px;
	height: 40px;
	width: 40px;
}

.has-error {
	border-color: #e74c4c;
	box-shadow: 0 0 5px #e74c4c;
}
</style>
