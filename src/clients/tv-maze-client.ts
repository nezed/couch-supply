import { mande } from "mande";
import type {
  TvShowDTO,
  TvShowSearchDTO,
  TvShowSeasonDTO,
} from "./tv-maze-client.model";

const api = mande(import.meta.env.VITE_TV_MAZE_BASE_URI);

export default {
  getFeatured(): Promise<TvShowDTO[]> {
    return api.get<TvShowDTO[]>("/shows");
  },
  getShowByQuery(query: string): Promise<TvShowSearchDTO[]> {
    return api.get<TvShowSearchDTO[]>(`/search/shows`, {
      query: {
        q: query,
      },
    });
  },
  getShowDetails(id: number): Promise<TvShowDTO> {
    return api.get<TvShowDTO>(`/shows/${id}`);
  },
  getShowSeasons(id: number): Promise<TvShowSeasonDTO[]> {
    return api.get<TvShowSeasonDTO[]>(`/shows/${id}/seasons`);
  },
};
