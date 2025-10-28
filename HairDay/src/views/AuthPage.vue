<template>
  <div class="auth-container">
    <div class="components-container">
      <img src="/assets/Logo-blur.svg" v-if="!isMobile" class="auth-logo" alt="">
      <LoginFormDesktop v-if="!isMobile" />
      <LoginFormMobile v-else />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import LoginFormDesktop from '@/components/LoginFormDesktop.vue';
import LoginFormMobile from '@/components/LoginFormMobile.vue';

const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

</script>
<style>
body {
  margin: 0;
}

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100dvh;
  padding: 1rem;
  box-sizing: border-box;
}

.components-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-logo {
  margin-bottom: 1.5rem;
  width: 250px;
}

img {
  width: 250px;
}

@media (max-width: 768px) {
  .auth-container {
    padding: 0;
    margin: 0;
    min-height: 100dvh;
    height: 100dvh;
      width: 100dvw;
    display: block;
    overflow: hidden;
  }

  .components-container {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
