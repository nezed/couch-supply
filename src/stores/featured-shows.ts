import { defineStore } from "pinia";
import type { Nullable } from "@/types";
import TvMazeClient from "@/clients/tv-maze-client";
import type { TvShowItem } from "./model";
import type {
  TvShowDTO,
  TvShowSearchDTO,
} from "@/clients/tv-maze-client.model";

export const useFeaturedShowsStore = defineStore("featured-shows", {
  state: () => ({
    count: null as Nullable<number>,
    list: null as Nullable<TvShowItem[]>,
  }),
  actions: {
    async fetch(search: Nullable<string>) {
      const featured = search
        ? await TvMazeClient.getShowByQuery(search)
        : await TvMazeClient.getFeatured();

      if (!featured || !featured.length) {
        throw new Error(
          "There is some problems while getting a shows for you."
        );
      }

      this.count = featured.length;
      if (search) {
        this.list = (featured as TvShowSearchDTO[])
          .sort((a, b) => Number(b.score || 0) - Number(a.score || 0))
          .map((dto) => ({
            id: dto.show.id,
            title: dto.show.name,
            rating: dto.show.rating?.average?.toString(),
            previewSrc: dto.show.image?.medium || dto.show.image?.original,
            coverSrc: dto.show.image?.original || dto.show.image?.medium,
          }));
      } else {
        this.list = (featured as TvShowDTO[])
          .map((dto) => ({
            id: dto.id,
            title: dto.name,
            rating: dto.rating?.average?.toString(),
            previewSrc: dto.image?.medium || dto.image?.original,
            coverSrc: dto.image?.original || dto.image?.medium,
          }))
          .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
      }
    },
  },
});
