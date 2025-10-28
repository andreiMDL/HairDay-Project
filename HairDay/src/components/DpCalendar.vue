<template>
  <VueDatePicker
    :model-value="props.modelValue"
    @date-update="updateDate"
    class="custom-datepicker"
    week-start="0"
    :locale="locale"
    month-name-format="long"
    :disabled-week-days="disabledDays"
    :day-names="dayNames"
    format="dd/MM/yyyy"
  />
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'

const dayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const locale = 'pt-BR';
const disabledDays = [0];

const props = defineProps({
  modelValue: {
    type: Date,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

function updateDate(novoValor) {
  console.log('Sinal enviado do DpCalendar com a data:', novoValor)
  emit('update:modelValue', novoValor)
}
</script>
<style>
.custom-datepicker {
  --dp-icon-color: var(--color-yellow);
  --dp-background-color: var(--color-gray-700);
  --dp-border-color: var(--color-gray-600);
  --dp-border-radius: .5rem;
  --dp-input-padding: 0.75rem 30px 0.75rem 12px;
  --dp-border-color-hover: var(--color-yellow);
  --dp-color: white;
  }

  .custom-datepicker .dp__input:hover {
    background-color: var(--color-gray-600);
    border: 1px solid var(--color-gray-900);
    box-shadow: 0 0 5px black;
  }

  .dp__input_wrap {
    display: flex;
    align-items: center;
    align-content: center;
  }

  .dp__input {
    color: #fff;
}

.dp__menu {
  background-color: var(--color-gray-600);
  border: 1px solid var(--color-gray-800);
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.dp__today {
  color: #fff;
  border: none;
  background-color: var(--color-gray-500);
}

.dp__active_date {
  background-color: var(--color-gray-500);
  border: 1px solid var(--color-yellow);
  color: var(--color-yellow);
}

.dp__cell_offset {
  color: var(--color-gray-400) !important;
}

.dp__arrow_top {
  display: none;
}

.dp--tp-wrap {
  display: none;
}

.dp__action_row {
  display: none;
}

.dp__calendar_header_separator {
  display: none;
}

.dp__instance_calendar {
  width: 350px;
}

.dp__month_year_select {
  justify-content: center;
  align-items: center;
}

.dp__month_year_wrap {
  padding-block: 5px;
  justify-content: center;
  margin-left: auto;
  gap: 0;
  color: aqua;
}

.dp__btn {
  color: #fff;
  font-weight: 500;
}

.dp__calendar_item {
  padding: 5px;
}

.dp__cell_inner {
  margin: auto;
}

.dp__cell_inner:hover {
  background-color: var(--color-gray-600);
  box-shadow: 0 0 5px black;
  color: var(--color-yellow);
}

.dp__calendar_header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  padding: 5px;
}

.dp__calendar_header_item {
  align-items: center;
  justify-self: auto;
  color: var(--color-yellow);
}

.dp--future {
  color: var(--color-gray-200);
}

.dp__month_year_select {
  color: var(--color-yellow);
  font-size: large;
  background-color: var(--color-gray-600);
  box-shadow: 0 0 5px black;
}

.dp__month_year_select:hover {
  color: var(--color-yellow);
  background-color: var(--color-gray-700);
  box-shadow: inset 0 0 5px black;
}

.dp__month_year_select:nth-child(2) {
  display: none;
}

</style>
