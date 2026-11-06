<script setup lang="ts">
import { ref } from "vue";

const clickCount = ref(0);
const disabled = ref(false);

function handleClick() {
  clickCount.value += 1;
}
</script>

<template>
  <main>
    <h1>Pulse Button in Vue</h1>

    <m3e-button
      variant="filled"
      size="md"
      :disabled="disabled"
      @click="handleClick"
    >
      Vue clicked {{ clickCount }} times
    </m3e-button>

    <label>
      <input v-model="disabled" type="checkbox" />
      Disable Pulse button
    </label>
  </main>
</template>
