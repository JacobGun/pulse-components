<script setup lang="ts">
import { ref } from "vue";

const clickCount = ref(0);
const disabled = ref(false);
const checked = ref(false);

function handleClick() {
  clickCount.value += 1;
}

</script>

<template>
  <main>
    <h1>Pulse components in Vue</h1>

    <h2>Button</h2>

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

    <h2>Checkbox</h2>

    <m3e-checkbox v-model="checked">
      Pulse checkbox
    </m3e-checkbox>

    <p>Vue state: {{ checked }}</p>
  </main>
</template>
