<script setup lang="ts">
const props = defineProps<{
  class?: string;
  title?: string;
  to?: string;
  dataTestId?: string;
}>();
</script>

<template>
  <router-link
    v-if="props.to"
    :to="props.to"
    :title="props.title"
    :class="props.class"
    :data-test-id="dataTestId"
  >
    <slot></slot>
  </router-link>
  <div v-if="!props.to" :class="props.class">
    <slot></slot>
  </div>
</template>
