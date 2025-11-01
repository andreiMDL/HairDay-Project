import {
	emailAlreadyExists,
	failedLogin,
	failedSingup,
	incorrectInfos,
	mandatoryFields,
	serverError,
	successLogin,
	successSignup,
	invalidEmail,
  weakPassword,
} from '@/utils/toastMessages';
import schema from '@/utils/passwordSchema';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import validator from 'email-validator';
import api from '@/services/api';

export function useAuth() {


  const router = useRouter();
  const toast = useToast();

  const isPanelActive = ref(false);

  const loginEmail = ref('');
  const loginPassword = ref('');
  const loginErrors = reactive({
    email: false,
    password: false,
  });

  const signupName = ref('');
  const signupEmail = ref('');
  const signupPassword = ref('');
  const signupErrors = reactive({
    name: false,
    email: false,
    password: false,
  });

  async function handleLogin() {
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
      mandatoryFields(toast);
      return;
    }

    try {
      const response = await api.post('/login', {
        email: loginEmail.value,
        password: loginPassword.value,
      })

      const token = response.data.token;

      if (token) {
        localStorage.setItem('hairday_token', token);
      } else {
         throw new Error('Token não recebido do servidor.');
        }

        successLogin(toast);
        router.push('/schedules');
    } catch (error) {
      loginErrors.email = true;
      loginErrors.password = true;

      if (error.response) {
        if (error.response.status === 401) {
          incorrectInfos(toast);
        }
      } else if (error.request) {
        serverError(toast);
      } else {
        failedSingup(toast);
      }

      failedLogin(toast);
    }
  };

  async function handleSignup() {
    signupErrors.name = false;
    signupErrors.email = false;
    signupErrors.password = false;

    let hasError = false;

    if (!signupName.value) {
      signupErrors.name = true;
      hasError = true;
    }
    if (!signupEmail.value.trim()) {
      signupErrors.email = true;
      hasError = true;
    }

    if (!signupPassword.value.trim()) {
      signupErrors.password = true;
      hasError = true;
    }

    if (hasError) {
      mandatoryFields(toast);
      return;
    }

    if (!validator.validate(signupEmail.value)) {
      signupErrors.email = true;
      hasError = true;
      invalidEmail(toast);
      return
    }

    if (!schema.validate(signupPassword.value)) {
      signupErrors.password = true;
      hasError = true;
      weakPassword(toast);
      return
    }

    try {
      const response = await api.post('/users', {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
      });

      const token = response.data.token;

      if (token) {
        localStorage.setItem('hairday_token', token);
      }

      signupName.value = '';
      signupEmail.value = '';
      signupPassword.value = '';

      successSignup(toast);
      router.push('/schedules');

    } catch (error) {
      if (error.response) {
        signupErrors.email = true;
        emailAlreadyExists(toast);
      } else if (error.request) {
        serverError(toast);
      } else {
        failedSingup(toast);
      }
    }
  }

  return {
    isPanelActive,
    loginEmail,
    loginPassword,
    loginErrors,
    handleLogin,
    signupName,
    signupEmail,
    signupPassword,
    signupErrors,
    handleSignup
  };
}
