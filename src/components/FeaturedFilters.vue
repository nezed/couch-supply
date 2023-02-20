<script setup lang="ts">
import type { Nullable } from "@/types";
import { ref } from "vue";

const props = defineProps<{
  initialValue?: Nullable<string>;
  placeholder?: string;
}>();

const emits = defineEmits<{
  (e: "submit", query: string): void;
}>();

const search = ref(props.initialValue);

function doSubmit() {
  emits("submit", search.value || "");
}

function doReset() {
  emits("submit", "");
}
</script>

<template>
  <form @submit.prevent="doSubmit" @reset="doReset" data-test-id="filters">
    <label for="query">Search:</label>
    <input
      id="query"
      v-model="search"
      type="text"
      @blur="doSubmit"
      :placeholder="placeholder"
    />
    <input class="reset" type="reset" value="&#10010;" />
  </form>
</template>

<style scoped>
form {
  position: relative;
}
label {
  cursor: pointer;
  font-size: 1.5em;
  margin-right: calc(var(--grid-base-unit) * 1);
}

#query,
.reset {
  border: none;
  background: none;
  color: inherit;
  font-size: 1.5em;
}

#query {
  padding: calc(var(--grid-base-unit) * 0.5) calc(var(--grid-base-unit) * 1);
  border-radius: calc(var(--grid-base-unit) * 1);
  border: 1px solid var(--color-background-soft);
  cursor: text;
}

.reset {
  transform: rotate(45deg);
  /* Beauty for tab navigation */
  border-radius: 50%;
  cursor: pointer;

  display: block;
  width: calc(var(--grid-base-unit) * 6);
  height: calc(var(--grid-base-unit) * 6);
  position: absolute;
  top: 50%;
  right: 0;
  margin: calc(var(--grid-base-unit) * -3) 0 0 0;
}
</style>
