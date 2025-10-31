<template>
  <div v-show="modelValue" class="modal-overlay">
    <div class="modal-content">
      <h4>Confirmar Cancelamento</h4>
      <p v-if="props.appointment">
        Cancelar o agendamento do dia
        <strong>{{ dayjs(appointment.date).format('DD/MM/YYYY') }}</strong> às
        <strong>{{ appointment.time }}</strong>
        com <strong>{{ appointment.barber }}</strong> ?
      </p>
      <div class="modal-actions">
        <button class="btn-confirm" v-on:click="confirmDelete">Confirmar</button>
        <button class="btn-cancel" v-on:click="closeModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import dayjs from 'dayjs';


const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  appointment: {
    type: Object,
    required: false
  }
});

const emits = defineEmits(['update:modelValue', 'confirm']);

function closeModal() {
  emits('update:modelValue', false);
};

function confirmDelete() {
  emits('confirm', props.appointment);
  closeModal();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--color-gray-700);
  border: 1px solid var(--color-gray-600);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 400px;
  box-sizing: border-box;
}

.modal-content h4 {
  margin-top: 0;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
}

.modal-content p {
  color: var(--color-gray-300);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.modal-content p strong {
  color: var(--color-yellow);
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.modal-actions button {
  appearance: none;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.modal-actions button:hover {
  transform: scale(1.05);
}

.btn-cancel {
  background-color: var(--color-gray-600);
  color: #fff;
}
.btn-cancel:hover {
  box-shadow: 0 0 5px var(--color-gray-900);
}

.btn-confirm {
  background-color: var(--color-yellow);
  color: var(--color-gray-800);
}
.btn-confirm:hover {
  box-shadow: 0 0 10px var(--color-yellow);
}
</style>
