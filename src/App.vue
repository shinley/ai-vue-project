<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue'
import BackToTop from './components/BackToTop.vue'
</script>

<template>
  <NavbarComponent />
  <RouterView />
  <BackToTop />
</template>
