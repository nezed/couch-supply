<script setup lang="ts">
import { useShowDetailsStore } from "@/stores/show-details";
import TheContent from "@/components/TheContent.vue";

import GalleryList from "@/components/GalleryList.vue";
import TvShowPreviewItem from "@/components/TvShowPreviewItem.vue";
import { useRoute } from "vue-router";

const showDetailsStore = useShowDetailsStore();
const route = useRoute();
const { id } = route.params;
showDetailsStore.fetch(Number(id));
</script>

<template>
  <TheContent>
    <template #section>{{ showDetailsStore.details?.title }} </template>
    <template #content>
      <GalleryList>
        <TvShowPreviewItem
          v-for="season in showDetailsStore.seasons"
          :key="season.id"
          :title="season.title"
          :rating="season.rating"
          :id="Number(season.id)"
          :previewSrc="season.previewSrc"
        ></TvShowPreviewItem>
      </GalleryList>
    </template>
  </TheContent>
</template>
