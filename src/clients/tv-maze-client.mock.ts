import type { TvShowDTO, TvShowSeasonDTO } from "./tv-maze-client.model";
import featuredShows from "./fixtures/featured-shows.json";
import dramaShows from "./fixtures/drama-shows.json";
import seasons from "./fixtures/seasons.json";

/**
 * This is how it should like if I'd be able to make `vi.importActual` finally works.
 */
export default {
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
};
