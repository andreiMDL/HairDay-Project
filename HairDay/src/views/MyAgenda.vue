<template>
  <div class="container-my-agenda">
    <div class="my-agenda-header">
      <div class="my-agenda-title">
        <h1>Sua Agenda</h1>
      </div>
    </div>
    <div class="list-container">
      <div class="all-list-container">
        <div class="list-header">
          <div class="header-left-content">
            <img src="/public/assets/scissor-logo.svg" alt="">
            <span>Cortes agendados</span>
          </div>
          <div class="container-datepicker datepicker-wrapper">
            <DpCalendar v-model="selectedDate" v-bind:teleport="true" />
            <button
              class="clear-date-btn"
              v-on:click="clearDate"
            >
              <img src="/assets/close-icon.svg" alt="Limpar data" />
            </button>
          </div>
        </div>
        <div class="list-body">
          <ul class="schedule-item-list">
            <li v-for="(appointment, index) in displayedAppointments" v-bind:key="index" class="schedule-item">
              <div class="item-list-frame">
                <img v-bind:src="getIconForTime(appointment.time)" alt="Ícone do período" class="time-icon">
                <span class="scheduled-date">{{ dayjs(appointment.date).format('DD/MM/YYYY') }}</span>
                <span class="scheduled-time">{{ appointment.time }}</span>
                <span class="scheduled-customer">{{ appointment.barber }}</span>
              </div>
              <button
                class="delete-btn"
                v-on:click="openDeleteModal(appointment)"
              >
                <img src="/public/assets/icon-trash2.svg" alt="Excluir" />
              </button>
            </li>
            <li v-if="displayedAppointments.length === 0" class="schedule-item">
              <span>Nenhum agendamento para o dia selecionado.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <ConfirmationModal
    v-model="modalActive"
    v-bind:appointment="selectedAppointment"
    v-on:confirm="deleteAppointment"
  />
</template>
<script setup>
import { serverError, successDelete } from '@/utils/toastMessages';
import { ref, computed, onMounted } from 'vue';
import { useAppointmentsStore } from '@/stores/appointments';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toast-notification";
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import DpCalendar from '@/components/DpCalendar.vue';
import dayjs from 'dayjs';
import api from '@/services/api';


defineOptions({
  name: 'MyAgenda'
});

const appointmentsStore = useAppointmentsStore();
const selectedDate = ref(null);
const modalActive = ref(false);
const selectedAppointment = ref(null);
const router = useRouter();
const toast = useToast();

onMounted(() => {
  appointmentsStore.fetchAppointments();
});

const displayedAppointments = computed(() => {
  const all = appointmentsStore.allAppointments;

  if (!selectedDate.value) {
    return [...all].sort((a, b) => {
      const dateComparison = dayjs(a.date).diff(dayjs(b.date));
      if (dateComparison !== 0) return dateComparison;
      return a.time.localeCompare(b.time);
    });
  }

  const filtered = all.filter(app =>
    dayjs(app.date).isSame(selectedDate.value, 'day')
  );
  return [...filtered].sort((a, b) => a.time.localeCompare(b.time));
});

function clearDate() {
  selectedDate.value = null;
}

function openDeleteModal(appointment) {
  console.log('appointment: ', appointment);
  selectedAppointment.value = appointment;
  modalActive.value = true;
}

async function deleteAppointment(appointment) {
  const token = localStorage.getItem('hairday_token');

  if (!token) {
    serverError(toast);
    router.push('/');
    return;
  }

  try {
    await api.delete(`/schedules/${appointment.id}`, {
      headers: {
      'Authorization': `Bearer ${token}`
      }
    });

    successDelete(toast);
    await appointmentsStore.fetchAppointments();
  } catch (error) {
    console.error('Erro ao excluir agendamento:', error);
    if (error.response?.status === 401 || error.response?.status === 403) {
      router.push('/');
    } else if (error.response?.status === 404) {
      await appointmentsStore.fetchAppointments();
    } else {
      serverError(toast);
    }
  }
}

function getIconForTime(timeString) {
  if (!timeString) return '';
  const hour = parseInt(timeString.split(':')[0]);
  if (hour < 12) {
    return '/public/assets/yellow-sun-horizon.svg';
  } else if (hour < 18) {
    return '/public/assets/yellow-cloud-sun.svg';
  } else {
    return '/public/assets/yellow-moon-stars.svg';
  }
};

</script>
<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.container-my-agenda {
  padding: 4rem 6rem;
  background-color: var(--color-gray-800);
  display: flex;
  flex-direction: column;
  box-shadow: inset 5px 0 20px var(--color-gray-900);
  flex: 2;
  box-sizing: border-box;
  height: 100dvh;
}

.my-agenda-header {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
}

.my-agenda-title {
  h1 {
    margin-bottom: 0;
    margin-block: auto;
  }
}

.container-datepicker {
  margin: 0;
  margin-block: auto;
}

.list-container {
  flex: 1;
  overflow-y: auto;
  padding-right: 1rem;
  margin-right: -1rem;
}

.all-list-container {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  img {
    width: 35px;
    margin-right: .8rem;
  }
}

.list-header {
  padding: 1rem;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  border: 1px solid var(--color-gray-600);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: larger;
  font-weight: 700;
}

.header-left-content {
  display: flex;
  align-items: center;
}

.datepicker-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.clear-date-btn {
  appearance: none;
  border: none;
  background-color: var(--color-gray-800);
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: ease 0.2s;
}

.clear-date-btn:hover {
  scale: 1.3;
}

.list-body {
  border: 1px solid var(--color-gray-600);
  border-top: none;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  font-size: larger;
}

.time-icon {
  width: 25px;
  height: 25px;
  margin-right: 1rem;
}

.scheduled-time, .scheduled-date, .scheduled-customer {
  font-weight: 600;
  margin-right: 1.5rem;
}

.schedule-item-list {
  appearance: none;
  list-style: none;
  margin-top: 1rem;
  padding-inline: 2rem;
}

.item-list-frame {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: auto;
  flex: 1;
}

.schedule-item {

  border-radius: 0.75rem;
  padding: 0.8rem 1.2rem;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: ease .2s;
}

.schedule-item:hover {
  background: var(--color-gray-700);
}

.delete-btn {
  display: flex;
  appearance: none;
  border: none;
  opacity: 0;
  background-color: var(--color-gray-700);
  transition: ease .2s;
}

.delete-btn img {
  width: 28px;
  height: 28px;
  filter: drop-shadow(0 0 2px rgba(255, 200, 0, 0.3));
}

.schedule-item:hover .delete-btn {
  opacity: 1;
  transform: scale(1.05);
}

.delete-btn:hover img {
  transform: scale(1.2);
  cursor: pointer;
}


@media (max-width: 768px) {
  .list-header {
    background-color: var(--color-gray-700);
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    padding: 0.8rem;
  }

  .container-datepicker {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .header-left-content {
     display: flex;
     align-items: center;
  }

  .schedule-item-list {
    padding-inline: 0.5rem;
  }

  .schedule-item {
    padding: 0.8rem;
    flex-wrap: wrap;
  }

  .time-icon {
    display: none;
  }

  .item-list-frame {
    flex-wrap: wrap;
    gap: 0.5rem;
    flex: 1;
  }

  .list-body {
    background-color: var(--color-gray-700);
    font-size: 1rem;
  }

  .scheduled-time, .scheduled-date, .scheduled-customer {
    margin-right: 0.5rem;
  }

  .delete-btn {
    background-color: var(--color-gray-700);
    opacity: 1;
  }


  .delete-btn img {
    width: 24px;
    height: 24px;
  }

}

@media (max-width: 900px) {
  .container-my-agenda {
    width: 100%;
    min-height: 100vh;
    height: auto;
    padding: 2rem 1rem;
    box-shadow: inset 0 5px 20px var(--color-gray-900);
  }

  .my-agenda-header {
    flex-direction: column;
    gap: 1rem;
  }

  .container-datepicker {
    margin: auto;
    margin-block: auto;
  }
}
</style>
