/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type EntityType = 'artist' | 'album' | 'track';

export interface User {
  id: string;
  username: string;
  display_name: string;
  bio_short: string;
  avatar_url: string;
  credibility_level: 'visiteur' | 'confirme' | 'qualifie';
  premium_status: boolean;
}

export interface Artist {
  id: string;
  name: string;
  slug: string;
  primary_genres: string[];
  short_bio: string;
  long_bio: string;
  hero_image_url: string;
  cover_image_url: string;
  entry_level: 'Accessible' | 'Intermédiaire' | 'Expérimental';
  consensus_score: number; // 0-100
  polarization_score: number; // 0-100
  review_count: number;
  why_it_matters: string;
  cultural_impact: string;
  top_tags: string[];
  pro_vs_community_gap: number; // -100 to 100
  era_breakdown: { era: string, score: number }[];
}

export interface Album {
  id: string;
  artist_id: string;
  artist_name: string;
  artist_slug: string;
  title: string;
  slug: string;
  release_date: string;
  cover_url: string;
  genres: string[];
  critic_score: number;
  community_score: number;
  accessibility_score: number;
  is_entry_album: boolean;
  short_description: string;
  long_description?: string;
}

export interface Track {
  id: string;
  album_id: string;
  album_title: string;
  album_slug: string;
  artist_id: string;
  artist_name: string;
  artist_slug: string;
  title: string;
  slug: string;
  duration_seconds: number;
  is_best_entry_track: boolean;
  quick_consensus_score: number;
  description?: string;
}

export interface Review {
  id: string;
  user_id: string;
  user_display_name: string;
  user_avatar: string;
  user_expertise?: string;
  target_type: EntityType;
  target_id: string;
  rating_overall: number;
  title?: string;
  keywords?: string[];
  what_i_hear: string;
  what_it_makes_me_feel: string;
  why_it_works_or_not: string;
  who_its_for: string;
  limit_or_reserve: string;
  quality_score: number;
  helpful_count: number;
  published_at: string;
  tone?: string;
}

export interface AISummary {
  target_id: string;
  summary_text: string;
  key_points_positive: string[];
  key_points_negative: string[];
}

export interface SharedList {
  id: string;
  slug: string;
  user_id: string;
  user_display_name: string;
  title: string;
  description: string;
  items: { type: EntityType; id: string; slug: string; title: string; why: string }[];
  like_count: number;
  category: 'Curated' | 'Community' | 'Thematic';
}
