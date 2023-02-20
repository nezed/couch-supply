<script setup lang="ts">
import type { Nullable } from "@/types";

/**
 * 1. Its important for such components for NOT TO BREAK native behavior,
 * but instead help with additional behaviors.
 * This is why horizontal scroll or touch events ARE NOT INTERCEPTED,
 * while vertical mousewheel scroll is inverted to be horizontal.
 *
 *
 * 2. Unfortunately with debounce and/or throttle OS X smooth scroll is not possible.
 * Passive event handler should make performance a bit better.
 *
 * BTW, you can find my own high performance implementation of throttle and debounce here:
 * https://github.com/nezed/debounce-decorator/tree/master/src
 */
const scrollRotate = (e: WheelEvent) => {
  const currentTarget = e.currentTarget as Nullable<Element>;

  // Ignore native horizontal scroll, eg when scrolling with Shift key pressed
  if (!currentTarget || e.deltaX) {
    return;
  }

  if (
    currentTarget.scrollWidth &&
    currentTarget.scrollWidth <= currentTarget.clientWidth
  ) {
    return;
  }

  currentTarget.scrollLeft += e.deltaY;
};
</script>

<template>
  <div
    :class="$style.gallery"
    @wheel.passive="scrollRotate"
    data-test-id="gallery"
  >
    <slot></slot>
  </div>
</template>

<style module>
/* The module is used instead of scope to make child selectors possible */
.gallery {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  scroll-behavior: smooth;
}
.gallery > * {
  margin: 0 0 calc(var(--grid-base-unit) * 8) calc(var(--grid-base-unit) * 8);
}
@media (min-width: 1024px) {
  .gallery {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: unset;

    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-auto-flow: column;
  }
  .gallery::-webkit-scrollbar {
    display: none;
  }
}
</style>
