<script setup lang="ts">
import { useFeaturedShowsStore } from "@/stores/featured-shows";
import TheContent from "@/components/TheContent.vue";

import GalleryList from "@/components/GalleryList.vue";
import TvShowPreviewItem from "@/components/TvShowPreviewItem.vue";
import Filters from "@/components/FeaturedFilters.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const featuredShowsStore = useFeaturedShowsStore();

const route = useRoute();
const router = useRouter();

const initialSearch = Array.isArray(route.query.search)
  ? route.query.search[0]
  : route.query.search;
const search = ref(initialSearch);

featuredShowsStore.fetch(search.value);

function doSearch(phrase: string) {
  if (search.value == phrase) {
    return;
  }

  if (phrase) {
    router.push({
      query: {
        search: phrase,
      },
    });
  } else {
    router.push({
      query: {},
    });
  }

  search.value = phrase;
  featuredShowsStore.fetch(search.value);
}
</script>

<template>
  <TheContent>
    <template #section
      >{{ featuredShowsStore.count }} best featured shows
      <template v-if="search">about "{{ search }}"</template>
    </template>

    <template #filters>
      <Filters
        @submit="doSearch"
        :initialValue="initialSearch"
        placeholder="eg, detective"
      ></Filters>
    </template>

    <template #content>
      <GalleryList>
        <TvShowPreviewItem
          v-for="show in featuredShowsStore.list"
          :key="show.id"
          :title="show.title"
          :rating="show.rating"
          :id="show.id"
          :previewSrc="show.previewSrc"
          :href="'/show/' + show.id"
        ></TvShowPreviewItem>
      </GalleryList>
    </template>
  </TheContent>
</template>
