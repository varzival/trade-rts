<script setup lang="ts">
import PhaserContainer from "./PhaserContainer.vue";
</script>

<template>
  <Suspense>
    <PhaserContainer />

    <template #fallback>
      <div class="placeholder">Downloading ...</div>
    </template>
  </Suspense>
</template>

<style lang="scss" scoped>
.placeholder {
  font-size: 2rem;
  font-family: "Courier New", Courier, monospace;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
