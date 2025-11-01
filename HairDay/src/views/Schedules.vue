<template>
  <div class="container-schedules">
    <div class="schedule-container">
      <div class="schedule-title">
        <h2>Agende um atendimento</h2>
        <span class="schedule-input-title">Data</span>
      </div>
      <div class="date-input-container">
        <DpCalendar v-model="selectedDate" v-bind:minDate="new Date()" />
      </div>
      <div class="schedule-picker">
        <span class="schedule-picker-title">Horários</span>
        <div v-if="isDayAvailable">
          <div v-if="scheduleForSelectedDay" class="schedule-picker-container">
            <div class="schedule-picker-time">
              <span
                v-for="time in scheduleForSelectedDay.schedules"
                v-bind:key="time"
                class="avaiable-schedule"
                v-on:click="!isTimeBooked(time) && !isTimePast(time) && (selectedHour = (selectedHour === time ? null : time))"
                v-bind:class="{ 'selected-schedule': time === selectedHour, 'has-error': errors.selectedHour, 'booked-schedule': isTimeBooked(time), 'past-schedule': isTimePast(time) }">
                {{ time }}
              </span>
            </div>
          </div>
        </div>

        <div v-else class="unavailable-message">
          <p>Não há horários disponíveis para este dia. Por favor, selecione outra data.</p>
        </div>
      </div>
      <div class="client-dropdown">
        <p class="schedule-picker-subtitle">Barbeiro</p>
      </div>
      <div class="select-barber">
        <DropdownButton v-model="barberName" v-bind:class="{ 'has-error': errors.barberName }" />
      </div>
      <div class="schedule-submit">
        <button class="submit-schedule" v-on:click="validateFields" v-bind:disabled="isLoading">
          AGENDAR
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { avaiableDays, dayMap } from '@/utils/avaiableDays';
import { validateBeforeSubmit } from '@/composables/validateFields';
import { useToast } from "vue-toast-notification";
import { useAppointmentsStore } from '@/stores/appointments';
import { useRouter } from 'vue-router';
import DropdownButton from '@/components/DropdownButton.vue';
import DpCalendar from '@/components/DpCalendar.vue'
import dayjs from 'dayjs';
import api from '@/services/api';

defineOptions({
  name: 'HairDaySchedules'
});

const router = useRouter();
const appointmentsStore = useAppointmentsStore();
const barberName = ref('');
const selectedDate = ref(new Date());
const selectedHour = ref(null);
const isLoading = ref(false);
const toast = useToast()
const { errors, validate } = validateBeforeSubmit();


const appointmentsForSelectedDay = computed(() => {
  return appointmentsStore.allAppointments.filter(app => {
    return dayjs(app.date).isSame(selectedDate.value, 'day');
  });
});

function isTimeBooked(time) {
  return appointmentsForSelectedDay.value.some(app => app.time === time);
};

function isTimePast(time) {
  const selectedDateDayjs = dayjs(selectedDate.value).format('YYYY-MM-DD');
  const slotDateTime = dayjs(`${selectedDateDayjs} ${time}`, 'YYYY-MM-DD HH:mm');

  return slotDateTime.isBefore(dayjs());
}

const showSuccess = () => {
  toast.success('Agendamento realizado com sucesso!', {
    position: 'top',
    duration: 3000,
    dismissible: true,
  });
};

const showError = () =>
  toast.error('Preencha os campos obrigatórios.', {
    position: 'top',
    duration: 3000,
    dismissible: true,
  })

async function validateFields() {
  if (isLoading.value) return;
  const fieldsToValidate = {
    barberName: barberName.value,
    selectedHour: selectedHour.value,
  };

  if (!validate(fieldsToValidate)) {
    showError();
    return;
  }

  isLoading.value = true;

  const scheduled_formatISO = dayjs(selectedDate.value)
    .set('hour', parseInt(selectedHour.value.split(':')[0]))
    .set('minute', parseInt(selectedHour.value.split(':')[1]))
    .toISOString();

  const newAppointmentData = {
    scheduled_for: scheduled_formatISO,
    barber: barberName.value,
  };
  const token = localStorage.getItem('hairday_token');

  try {
    const response = await api.post('/schedules', newAppointmentData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    showSuccess();
    appointmentsStore.addAppointment(response.data);
    selectedHour.value = null;

  } catch (error) {
    let errorMessage = 'Falha ao agendar. Tente novamente.';

    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        errorMessage = 'Sua sessão expirou ou o token é inválido. Faça login novamente';
        localStorage.removeItem('hairday_token');
        router.push('/');
      } else {
        errorMessage = error.response.data.message || errorMessage;
      }
      toast.error(errorMessage, { position: 'top', duration: 4000 });

    }
  } finally {
    isLoading.value = false;
  }
};

const isDayAvailable = computed(() => {
  const dayNumber = dayjs(selectedDate.value).day();
  const dayName = dayMap[dayNumber];
  return !!avaiableDays[dayName];
});

const scheduleForSelectedDay = computed(() => {
  const dayNumber = dayjs(selectedDate.value).day();
  const dayName = dayMap[dayNumber];
  const daySchedules = avaiableDays[dayName];

  if (!daySchedules) {
    return {
      schedules: []
    };
  }

  return daySchedules;
});

</script>
<style>
.container-schedules {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: var(--color-gray-700);
  flex: 1;
}

img {
  width: 150px;
}

.schedule-container {
  background-color: var(--color-gray-700);
  padding-inline: 3rem;
}

.schedule-title {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  h2 {
    margin-bottom: 2rem;
    font-size: 32px;
  }

  p {
    margin-top: 0;
  }
}

.select-barber {
  display: flex;
}

.schedule-picker {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.schedule-input-title, .schedule-picker-title, .schedule-picker-subtitle {
  font-size: larger;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.schedule-picker-time {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: .5rem;
}

.avaiable-schedule {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-gray-600);
  box-shadow: 0 0 10px black;
  padding: .8rem;
  border-radius: .5rem;
  cursor: pointer;
  transition: .2s ease;
}

.avaiable-schedule:hover {
  background-color: var(--color-yellow);
  scale: 1.05;
}

.selected-schedule {
  background-color: var(--color-yellow);
  box-shadow: 0 0 5px var(--color-yellow);
  transition: .2s ease;
}

.selected-schedule:hover {
  scale: 1.05;
}

.schedule-picker-container {
  min-height: 7rem;
}

.schedule-submit {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.submit-schedule {
  color: var(--color-gray-600);
  font-family: var(--font-family-base);
  font-weight: 800;
  padding: .8rem;
  width: 50%;
  background-color: var(--color-yellow);
  border: none;
  border-radius: 1rem;
  transition: .2s ease;
  margin-bottom: 3rem;
  cursor: pointer;
}

.submit-schedule:hover {
  box-shadow: 0 0 10px var(--color-yellow);
  scale: 1.05;
}

input {
  color: #eee;
  background-color: var(--color-gray-600);
  border: 1px solid var(--color-gray-800);
  box-shadow: 0 0 10px black;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 1rem;
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

.has-error {
  border: 1px solid red;
}

.booked-schedule {
  background-color: var(--color-gray-700);
  border: 1px solid var(--color-gray-800);
  box-shadow: inset 0 0 10px var(--color-gray-800);
  color: var(--color-gray-400);
  cursor: not-allowed;
}

.booked-schedule:hover {
  background-color: var(--color-gray-700);
  border: 1px solid var(--color-gray-800);
  box-shadow: inset 0 0 10px var(--color-gray-800);
  color: var(--color-gray-400);
  cursor: not-allowed;
}

.unavailable-message {
  display: flex;
  margin-top: 1rem;
  margin-inline: auto;
  padding-inline: 1rem;
  align-items: center;
  background-color: rgba(128, 98, 0, 0.349);
  border: 2px solid var(--color-yellow);
  border-radius: .5rem;
  color: var(--color-yellow);
}

.past-schedule {
   background-color: var(--color-gray-700);
  border: 1px solid var(--color-gray-800);
  box-shadow: inset 0 0 10px var(--color-gray-800);
  color: var(--color-gray-400);
  cursor: not-allowed;
}

.past-schedule:hover {
  background-color: var(--color-gray-700);
  border: 1px solid var(--color-gray-800);
  box-shadow: inset 0 0 10px var(--color-gray-800);
  color: var(--color-gray-400);
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .container-schedules {
    width: 100%;
    min-height: 100dvh;
    height: auto;
    border-right: none;
  }

  .schedule-picker-time {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
