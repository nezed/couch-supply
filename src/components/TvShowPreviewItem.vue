<script setup lang="ts">
import RouterPseudolink from "./RouterPseudolink.vue";

const props = defineProps<{
  title: string;
  rating?: string;
  id: number;
  previewSrc?: string;
  href?: string;
}>();
</script>

<template>
  <RouterPseudolink
    :class="$style.container"
    :to="props.href"
    data-test-id="show.link"
  >
    <figure :class="$style.figure">
      <img v-if="previewSrc" :src="previewSrc" alt="" :class="$style.preview" />
      <figcaption :class="$style.title">{{ title }}</figcaption>
    </figure>
    <!-- This probable males Vue is not really safe for bank purpose -->
    <span v-if="Number(rating)" :class="$style.rating" title="rating">{{
      rating
    }}</span>
  </RouterPseudolink>
</template>

<style module>
.container {
  position: relative;
  color: inherit;
}
.container:hover {
  background: none;
}
.container:hover .preview {
  box-shadow: 0 0 0 var(--vt-c-divider-light-1);
}

.preview {
  width: calc(var(--grid-base-unit) * 45);
  height: calc(var(--grid-base-unit) * 64);
  box-shadow: 1px 1px calc(var(--grid-base-unit) * 2)
    var(--vt-c-divider-light-1);
  transition: 0.4s;
}

.preview {
  object-fit: cover;
}

.rating {
  position: absolute;
  top: calc(var(--grid-base-unit) * 1);
  left: calc(var(--grid-base-unit) * 1);
  padding: calc(var(--grid-base-unit) * 1);
  background: var(--vt-c-black-soft);
  border-radius: 0.5em;
}

.title {
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  /* should be marquee, probably */
  text-overflow: ellipsis;
  font-size: 1.5rem;
}
</style>
