import { ref } from "vue";
import { defineStore } from "pinia";
import { useToast } from "vue-toast-notification";
import axios from "axios";
import dayjs from "dayjs";

const toast = useToast();
const API_URL = 'http://localhost:3000';

export const useAppointmentsStore = defineStore('appointments', () => {
  const allAppointments = ref([]);

  function addAppointment(appointmentDetails) {
    const formattedAppointment = {
      id: appointmentDetails.id,
      barber: appointmentDetails.barber,
      user: appointmentDetails.user_name,
      date: dayjs(appointmentDetails.scheduled_for).toDate(),
      time: dayjs(appointmentDetails.scheduled_for).format('HH:mm'),
    };
    allAppointments.value.push(formattedAppointment);
  }

  async function fetchAppointments() {
    const token = localStorage.getItem('hairday_token');

    if (!token) {
      console.error('Fetch Appointments Error: No token found.');
      allAppointments.value = [];
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/schedules`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const fetchedData = response.data.map(appointment => ({
          id: appointment.id,
          barber: appointment.barber,
          user: appointment.user_name,
          date: dayjs(appointment.scheduled_for).toDate(),
          time: dayjs(appointment.scheduled_for).format('HH:mm'),
      }));

      allAppointments.value = fetchedData;
      console.log('Agendamentos carregados:', allAppointments.value);

    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      allAppointments.value = [];

      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          toast.error('Sessão inválida. Faça login novamente.', { position: 'top'});
          localStorage.removeItem('hairday_token');
      } else {
          toast.error('Erro ao carregar agendamentos do servidor.', { position: 'top'});
      }
    }
  }

  return {
    allAppointments,
    addAppointment,
    fetchAppointments,
  };
});
