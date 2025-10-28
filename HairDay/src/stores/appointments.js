import { ref } from "vue";
import { defineStore } from "pinia";
import { useToast } from "vue-toast-notification";

const toast = useToast();

export const useAppointmentsStore = defineStore('appointments', () => {
  const allAppointments = ref([]);

  const successAppointment = () => {
    toast.success('Novo agendamento adicionado: ', allAppointments.value, {
      position: 'top',
      duration: 3000,
		  dismissible: true,
    });
  };

  function addAppointment(appointmentDetails){
    allAppointments.value.push(appointmentDetails);
    successAppointment();
  }

  return {
    allAppointments,
    addAppointment
  };
});
