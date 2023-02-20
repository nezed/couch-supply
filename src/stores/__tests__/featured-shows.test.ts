import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useFeaturedShowsStore } from "../featured-shows";
import type { TvShowItem } from "../model";

import type {
  TvShowDTO,
  TvShowSeasonDTO,
} from "@/clients/tv-maze-client.model";
import featuredShows from "@/clients/fixtures/featured-shows.json";
import dramaShows from "@/clients/fixtures/drama-shows.json";
import seasons from "@/clients/fixtures/seasons.json";

// Unfortunately for now I'we didn't found the way to make this mock reusable due to specific of isolated mock code evaluation.
// As well as `vi.importActual` didn't import nothing, which is strange.
vi.mock("@/clients/tv-maze-client", () => ({
  default: {
    getFeatured(): Promise<TvShowDTO[]> {
      return Promise.resolve(featuredShows as any as TvShowDTO[]);
    },
    getShowByQuery(_query: string): Promise<TvShowDTO[]> {
      return Promise.resolve(dramaShows as any as TvShowDTO[]);
    },
    getShowDetails(id: number): Promise<TvShowDTO> {
      const show = ((dramaShows as any as TvShowDTO[]).find(
        (show) => show.id === id
      ) || dramaShows[0]) as any as TvShowDTO;

      return Promise.resolve(show);
    },
    getShowSeasons(_id: number): Promise<TvShowSeasonDTO[]> {
      return Promise.resolve(seasons);
    },
  },
}));

describe("get a list of todo items", () => {
  setActivePinia(createPinia());
  const store = useFeaturedShowsStore();

  beforeEach(() => {});

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch featured when no search query", async () => {
    // Arrange
    const search = null;
    // Act
    await store.fetch(search);
    // Assert
    expect(store.list).not.toBeNull();
    expect((store.list as TvShowItem[])[0].title).toBe("Breaking Bad");
  });

  it("should fetch with search query", async () => {
    // Arrange
    const search = "drama";
    // Act
    await store.fetch(search);
    // Assert
    expect(store.list).not.toBeNull();
    expect((store.list as TvShowItem[])[0].title).toBe("Drama");
  });
});
