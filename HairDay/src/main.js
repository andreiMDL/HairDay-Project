import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ptBR } from 'date-fns/locale/pt-BR';

import App from './App.vue'
import router from './router'
import VueDatePicker from '@vuepic/vue-datepicker';
import ToastPlugin from 'vue-toast-notification';
import '@vuepic/vue-datepicker/dist/main.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);
app.config.globalProperties.$datepicker = {
  locale: ptBR
};

app.use(ToastPlugin);
app.use(createPinia())
app.use(router)

app.mount('#app')
