export interface GiphyResponse {
  data: Datum[];
  meta: Meta;
  pagination: Pagination;
}

export interface Datum {
  type: Type;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: Rating;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: Date;
  trending_datetime: Date | TrendingDatetime;
  images: Images;
  analytics_response_payload: string;
  analytics: Analytics;
  alt_text: string;
  is_low_contrast: boolean;
  user?: User;
}

export interface Analytics {
  onload: Onclick;
  onclick: Onclick;
  onsent: Onclick;
}

export interface Onclick {
  url: string;
}

export interface Images {
  original: FixedHeight;
  downsized: The480WStill;
  downsized_large: The480WStill;
  downsized_medium: The480WStill;
  downsized_small: The4K;
  downsized_still: The480WStill;
  fixed_height: FixedHeight;
  fixed_height_downsampled: FixedHeight;
  fixed_height_small: FixedHeight;
  fixed_height_small_still: The480WStill;
  fixed_height_still: The480WStill;
  fixed_width: FixedHeight;
  fixed_width_downsampled: FixedHeight;
  fixed_width_small: FixedHeight;
  fixed_width_small_still: The480WStill;
  fixed_width_still: The480WStill;
  looping: The4K;
  original_still: The480WStill;
  original_mp4: The4K;
  preview: The4K;
  preview_gif: The480WStill;
  preview_webp: The480WStill;
  '480w_still': The480WStill;
  hd?: The4K;
  '4k'?: The4K;
}

export interface The480WStill {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface The4K {
  height?: string;
  width?: string;
  mp4_size?: string;
  mp4?: string;
}

export interface FixedHeight {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size?: string;
  mp4?: string;
  webp_size: string;
  webp: string;
  frames?: string;
  hash?: string;
}

export type Rating = 'g' | 'r';

export type TrendingDatetime = '0000-00-00 00:00:00';

export type Type = 'gif';

export interface User {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}
