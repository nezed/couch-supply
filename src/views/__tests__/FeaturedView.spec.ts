import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia, createPinia } from "pinia";
import { mount } from "@vue/test-utils";
import FeaturedViewVue from "../FeaturedView.vue";
import { useRoute } from "vue-router";

import type {
  TvShowDTO,
  TvShowSeasonDTO,
} from "@/clients/tv-maze-client.model";
import featuredShows from "@/clients/fixtures/featured-shows.json";
import dramaShows from "@/clients/fixtures/drama-shows.json";
import seasons from "@/clients/fixtures/seasons.json";

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: () => {},
  })),
}));

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
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch featured when no search query", async () => {
    // Arrange
    (useRoute as any).mockImplementationOnce(() => ({
      query: {},
    }));

    const view = mount(FeaturedViewVue, {
      global: {
        stubs: ["router-link", "router-view"],
      },
    });
    // Act
    await view.get('[data-test-id="gallery"]').trigger("wheel", {
      deltaY: 100,
    });

    const el = (await view.get('[data-test-id="gallery"]').element) as Element;

    expect(el.scrollTop).toBe(0);
    expect(el.scrollLeft).toBe(100);
  });
});
