import { defineStore } from "pinia";
import type { Nullable } from "@/types";
import TvMazeClient from "@/clients/tv-maze-client";
import type { TvShowItem } from "./model";

export const useShowDetailsStore = defineStore("show-details", {
  state: () => ({
    details: null as Nullable<TvShowItem>,
    seasons: null as Nullable<TvShowItem[]>,
  }),
  actions: {
    fetch(id: number) {
      return Promise.all([
        TvMazeClient.getShowDetails(id).then((details) => {
          if (!details) {
            throw new Error(
              "There is some problems while getting a show for you."
            );
          }

          this.details = {
            id: details.id,
            title: details.name,
            rating: details.rating?.average,
            previewSrc: details.image?.medium || details.image?.original,
            coverSrc: details.image?.original || details.image?.medium,
          };
        }),

        TvMazeClient.getShowSeasons(id).then((seasons) => {
          this.seasons = seasons
            .map((dto) => ({
              id: dto.number,
              title: `#${dto.number}`,
              rating: dto.rating?.average,
              previewSrc: dto.image?.medium || dto.image?.original,
              coverSrc: dto.image?.original || dto.image?.medium,
            }))
            .sort((a, b) => Number(a.id || 0) - Number(b.id || 0));
        }),
      ]);
    },
  },
});
