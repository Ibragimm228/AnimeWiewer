export interface AnimeListRoot {
  list: Anime[];
  pagination: Pagination;
}

export interface Anime {
  id: number;
  code: string;
  names: Names;
  franchises: Franchise[];
  announce?: string;
  status: Status;
  posters: Posters;
  updated: number;
  last_change: number;
  type: Type;
  genres: string[];
  team: Team;
  season: Season;
  description?: string;
  in_favorites: number;
  blocked: Blocked;
  player: Player;
  torrents: Torrents;
}

export interface Names {
  ru: string;
  en: string;
  alternative?: string;
}

export interface Franchise {
  franchise: Franchise2;
  releases: Release[];
}

export interface Franchise2 {
  id: string;
  name: string;
}

export interface Release {
  id: number;
  code: string;
  ordinal: number;
  names: Names2;
}

export interface Names2 {
  ru: string;
  en: string;
  alternative?: string;
}

export interface Status {
  string: string;
  code: number;
}

export interface Posters {
  small: Small;
  medium: Medium;
  original: Original;
}

export interface Small {
  url: string;
  raw_base64_file: any;
}

export interface Medium {
  url: string;
  raw_base64_file: any;
}

export interface Original {
  url: string;
  raw_base64_file: any;
}

export interface Type {
  full_string: string;
  code: number;
  string: string;
  episodes?: number;
  length?: number;
}

export interface Team {
  voice: string[];
  translator: string[];
  editing: string[];
  decor: string[];
  timing: string[];
}

export interface Season {
  string: string;
  code: number;
  year: number;
  week_day: number;
}

export interface Blocked {
  blocked: boolean;
  bakanim: boolean;
}

export interface Player {
  alternative_player?: string;
  host: string;
  is_rutube: boolean;
  episodes: Episodes;
  list: List2[];
  rutube: any[];
}

export interface Episodes {
  first: number;
  last: number;
  string: string;
}

export interface List2 {
  episode: number;
  name?: string;
  uuid: string;
  created_timestamp: number;
  preview?: string;
  skips: Skips;
  hls: Hls;
}

export interface Skips {
  opening: number[];
  ending: any[];
}

export interface Hls {
  fhd: string;
  hd: string;
  sd: string;
}

export interface Torrents {
  episodes: Episodes2;
  list: List3[];
}

export interface Episodes2 {
  first: number;
  last: number;
  string: string;
}

export interface List3 {
  torrent_id: number;
  episodes: Episodes3;
  quality: Quality;
  leechers: number;
  seeders: number;
  downloads: number;
  total_size: number;
  size_string: string;
  url: string;
  magnet: string;
  uploaded_timestamp: number;
  hash: string;
  metadata: any;
  raw_base64_file: any;
}

export interface Episodes3 {
  first: number;
  last: number;
  string: string;
}

export interface Quality {
  string: string;
  type: string;
  resolution: string;
  encoder: string;
  lq_audio: any;
}

export interface Pagination {
  pages: number;
  current_page: number;
  items_per_page: number;
  total_items: number;
}
