<template>
  <div class="dropdown-wrapper">
    <button class="client-dropdown-button" @click="toggleDropdown">
      <div class="client-info">
        <span class="client-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </span>
        <span class="client-name">{{ selectedClient.name }}</span>
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
        v-for="client in clients"
        :key="client.id"
        class="dropdown-item"
        @click="selectClient(client)"
      >
        <div class="client-info">
          <span class="client-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          <span class="client-name">{{ client.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const clients = ref([
  { id: 1, name: 'Helena Souza' },
  { id: 2, name: 'João Silva' },
  { id: 3, name: 'Maria Oliveira' },
  { id: 4, name: 'Pedro Santos' },
])
const selectedClient = ref(clients.value[0])

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectClient = (client) => {
  selectedClient.value = client
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

.client-dropdown-button {
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

.client-dropdown-button:hover {
  background-color: var(--color-gray-600);
  border-color: var(--color-gray-900);
  box-shadow: 0 0 5px black;
}

.client-info {
  display: flex;
  align-items: center;
}

.client-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.75rem;
  color: #FFC107;
}

.client-icon svg {
  width: 100%;
  height: 100%;
}

.client-name {
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
  top: calc(100% + 0.3rem);
  left: 0;
  right: 0;
  width: auto;
  min-width: 100%;
  background-color: #333;
  border: 1px solid #555;
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
