<template>
  <header>
    <img alt="Logo" class="logo" src="@/assets/logo.svg" />
    <h1>Welkom bij Couch Supply</h1>
  </header>
</template>

<style scoped>
header {
  display: flex;
  height: 42px;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  padding: calc(var(--grid-base-unit) * 2) 0;
  box-sizing: content-box;
  position: relative;
}

.logo {
  width: calc(var(--grid-base-unit) * 6);
  height: calc(var(--grid-base-unit) * 6);
  margin-right: calc(var(--grid-base-unit) * 2);
}
</style>
