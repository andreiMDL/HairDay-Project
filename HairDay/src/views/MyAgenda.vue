<template>
  <div class="container-my-agenda">
    <div class="my-agenda-header">
      <div class="my-agenda-title">
        <h1>Sua Agenda</h1>
      </div>
      <div class="container-datepicker">
        <DpCalendar v-model="selectedDate" />
      </div>
    </div>
    <div class="list-container">
      <div class="morning-list-container">
        <div class="morning-list-header">
          <img src="/public/assets/yellow-sun-horizon.svg" alt="">
          <span>Manhã</span>
        </div>
        <div class="morning-list-body">
          <ul class="schedule-item-list">
            <li v-for="(appointment, index) in morningAppointments" v-bind:key="index" class="schedule-item">
              <span class="scheduled-time">{{ appointment.time }}</span>
              <span class="scheduled-customer">{{ appointment.client }}</span>
            </li>
            <li v-if="morningAppointments.length === 0" class="schedule-item">
              <span>Nenhum agendamento para o dia selecionado.</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="evening-list-container">
        <div class="evening-list-header">
          <img src="/public/assets/yellow-cloud-sun.svg" alt="">
          <span>Tarde</span>
        </div>
        <div class="evening-list-body">
          <ul class="schedule-item-list">
            <li v-for="(appointment, index) in eveningAppointments" v-bind:key="index" class="schedule-item">
              <span class="scheduled-time">{{ appointment.time }}</span>
              <span class="scheduled-customer">{{ appointment.client }}</span>
            </li>
            <li v-if="eveningAppointments.length === 0" class="schedule-item">
              <span>Nenhum agendamento para hoje.</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="night-list-container">
        <div class="night-list-header">
          <img src="/public/assets/yellow-moon-stars.svg" alt="">
          <span>Noite</span>
        </div>
        <div class="night-list-body">
          <ul class="schedule-item-list">
            <li v-for="(appointment, index) in nightAppointments" v-bind:key="index" class="schedule-item">
              <span class="scheduled-time">{{ appointment.time }}</span>
              <span class="scheduled-customer">{{ appointment.client }}</span>
            </li>
            <li v-if="nightAppointments.length === 0" class="schedule-item">
              <span>Nenhum agendamento para hoje.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useAppointmentsStore } from '@/stores/appointments';
import DpCalendar from '@/components/DpCalendar.vue';
import dayjs from 'dayjs';

defineOptions({
  name: 'HairDaySchedules'
});

const appointmentsStore = useAppointmentsStore();
const selectedDate = ref(new Date());

const appointmentsForDay = computed(() => {
  return appointmentsStore.allAppointments.filter(app =>
    dayjs(app.date).isSame(selectedDate.value, 'day')
  );
});

const morningAppointments = computed(() => {
  return appointmentsForDay.value.filter(app => {
    const hour = parseInt(app.time.split(':')[0]);
    return hour < 12;
  });
});

const eveningAppointments = computed(() => {
  return appointmentsForDay.value.filter(app => {
    const hour = parseInt(app.time.split(':')[0]);
    return hour >= 12 && hour < 18;
  });
});

const nightAppointments = computed(() => {
  return appointmentsForDay.value.filter(app => {
    const hour = parseInt(app.time.split(':')[0]);
    return hour >= 18 && hour < 21;
  });
});

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
  overflow-y: auto;
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
  margin-right: 0;
  margin-block: auto;
}

.list-container {
  flex: 1;
  overflow-y: auto;
  padding-right: 1rem;
  margin-right: -1rem;
}

.morning-list-container {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  img {
    width: 35px;
    margin-right: .8rem;
  }
}

.morning-list-header {
  padding: 1rem;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  border: 1px solid var(--color-gray-600);
  display: flex;
  margin-block: auto;
  align-items: center;
  justify-items: center;
}

.morning-list-body {
  border: 1px solid var(--color-gray-600);
  border-top: none;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  font-size: larger;
}


.scheduled-time {
  font-weight: 600;
  margin-right: 1.5rem;
}

.evening-list-container {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  img {
    width: 35px;
    margin-right: .8rem;
  }
}

.evening-list-header {
  padding: 1rem;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  border: 1px solid var(--color-gray-600);
  display: flex;
  margin-block: auto;
  align-items: center;
  justify-items: center;
}

.evening-list-body {
  border: 1px solid var(--color-gray-600);
  border-top: none;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  font-size: larger;
}

.night-list-container {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  img {
    width: 35px;
    margin-right: .8rem;
  }
}

.night-list-header {
  padding: 1rem;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  border: 1px solid var(--color-gray-600);
  display: flex;
  margin-block: auto;
  align-items: center;
  justify-items: center;
}

.night-list-body {
  border: 1px solid var(--color-gray-600);
  border-top: none;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  font-size: larger;
}

.schedule-item-list {
  appearance: none;
  list-style: none;
}

.schedule-item {
  padding-block: 1rem;
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
