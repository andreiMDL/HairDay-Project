<template>
  <div class="dropdown-wrapper">
    <button class="barber-dropdown-button" v-on:click="toggleDropdown">
      <div class="barber-info">
        <span class="barber-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </span>
        <span class="barber-name">{{ selectedBarber.name }}</span>
      </div>
      <span class="dropdown-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    </button>

    <div v-if="isOpen" class="dropdown-list">
      <div
        v-for="barber in barbers"
        v-bind:key="barber.id"
        class="dropdown-item"
        v-on:click="selectBarber(barber)"
      >
        <div class="barber-info">
          <span class="barber-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          <span class="barber-name">{{ barber.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false)
const barbers = ref([
  { id: 1, name: 'Helena Souza' },
  { id: 2, name: 'João Silva' },
  { id: 3, name: 'Maria Oliveira' },
  { id: 4, name: 'Pedro Santos' },
])
const selectedBarber = ref(barbers.value.find(b => b.name === props.modelValue) || barbers.value[0]);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

watch(selectedBarber, (newBarber) => {
  emit('update:modelValue', newBarber.name)
}, { immediate: true });

const selectBarber = (barber) => {
  selectedBarber.value = barber
  isOpen.value = false
}


const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.dropdown-wrapper')
  if (dropdown && !dropdown.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.barber-dropdown-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--color-gray-700);
  border: 1px solid var(--color-gray-600);
  cursor: pointer;
  transition: all 0.2s;
}

.barber-dropdown-button:hover {
  background-color: var(--color-gray-600);
  border-color: var(--color-gray-900);
  box-shadow: 0 0 5px black;
}

.barber-info {
  display: flex;
  align-items: center;
}

.barber-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.75rem;
  color: #FFC107;
}

.barber-icon svg {
  width: 100%;
  height: 100%;
}

.barber-name {
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
}

.dropdown-arrow {
  width: 1rem;
  height: 1rem;
  color: #fff;
}

.dropdown-list {
  position: absolute;
  bottom: calc(100% + 0.3rem);
  left: 0;
  right: 0;
  width: auto;
  min-width: 100%;
  background-color: var(--color-gray-700);
  border: 1px solid var(--color-gray-500);
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  z-index: 9999;
  overflow: hidden;
  animation: 0.2s ease;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #444;
}

</style>
