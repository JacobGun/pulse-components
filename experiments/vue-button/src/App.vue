<script setup lang="ts">
import { ref } from "vue";

const clickCount = ref(0);
const disabled = ref(false);
const checked = ref(false);
type PulseDialogElement = HTMLElement & {
  show: () => void;
  hide: () => void;
};

const dialog = ref<PulseDialogElement | null>(null);
const dialogStatus = ref("closed");

function showDialog() {
  dialog.value?.show();
}

function hideDialog() {
  dialog.value?.hide();
}

function handleDialogOpening() {
  dialogStatus.value = "opening";
}

function handleDialogOpened() {
  dialogStatus.value = "opened";
}

function handleDialogClosing() {
  dialogStatus.value = "closing";
}

function handleDialogClosed() {
  dialogStatus.value = "closed";
}

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

    <h2>Dialog</h2>

<m3e-button @click="showDialog">
  Open dialog
</m3e-button>

<p>Dialog status: {{ dialogStatus }}</p>

<m3e-dialog
  ref="dialog"
  dismissible
  @opening="handleDialogOpening"
  @opened="handleDialogOpened"
  @closing="handleDialogClosing"
  @closed="handleDialogClosed"
>
  <span slot="header">Vue Dialog</span>

  <p>
    This dialog is consumed directly from @pulse/web.
  </p>

  <div slot="actions">
    <m3e-button @click="hideDialog">
      Close
    </m3e-button>
  </div>
</m3e-dialog>

    <p>Vue state: {{ checked }}</p>
  </main>
</template>
