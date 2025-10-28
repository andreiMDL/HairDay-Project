<template>
  <div class="container">
    <Schedules />
    <MyAgenda />
  </div>
</template>
<script setup>
import MyAgenda from './MyAgenda.vue';
import Schedules from './Schedules.vue';
</script>
<style>

.container {
  display: flex;
  width: 100dvw;
    height: 100dvh;
    overflow: hidden;
  }
  
  @media (max-width: 900px) {
    .container {
      flex-direction: column;
      height: auto;
      overflow: visible;
    }
  }
</style>
