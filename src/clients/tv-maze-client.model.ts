export interface TvBaseEntity {
  rating?: {
    average: string;
  };
  image?: {
    medium?: string;
    original?: string;
  };
  network?: {
    name: string;
  };
}

export interface TvShowDTO extends TvBaseEntity {
  id: number;
  name: string;
}
export interface TvShowSearchDTO {
  score: number;
  show: TvShowDTO;
}

export interface TvShowSeasonDTO extends TvBaseEntity {
  id: number;
  number: number;
}
