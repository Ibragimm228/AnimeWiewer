export interface QueryInterface {
  limit?: number;
  playlist_type?: string;
  page?: number;
  items_per_page?: number;
}

export interface QueryTitleProps {
  code: string | undefined;
  playlist_type?: string;
}
