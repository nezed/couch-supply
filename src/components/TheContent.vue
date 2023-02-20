<template>
  <div class="container">
    <nav>
      <h2>
        <slot name="section"></slot>
      </h2>
      <slot name="filters"></slot>
    </nav>
    <section>
      <slot name="content"></slot>
    </section>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-content: stretch;
  flex-direction: column;
  min-height: calc(100vh - var(--grid-base-unit) * 10);
}
section {
  margin-top: calc(var(--grid-base-unit) * 2);
}
section {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
nav {
  display: flex;
  justify-content: space-between;
}
</style>
