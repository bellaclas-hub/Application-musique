/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  favorite_genre?: string;
  critical_specialty?: string;
  discovery_style?: string;
  follow_reason?: string;
  signature?: string;
  favorite_artists_ids?: string[];
  taste_tones?: string[];
  similar_profiles_ids?: string[];
  followed_artists_ids?: string[];
  stats: {
    reviews_count: number;
    followers_count: number;
    following_count: number;
    helpful_votes: number;
  };
}

export interface ConsensusData {
  pros: string[];
  cons: string[];
  dividing_points: string[];
  consensus_summary: string;
  recommended_for: string[];
}

export interface SummaryBlock {
  why_it_pleases: string[];
  friction_points: string[];
  ideal_for: string;
  starting_point: {
    type: EntityType;
    id: string;
    title: string;
    description: string;
  };
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
  entry_level: 'Immédiat' | 'Accessible' | 'Intermédiaire' | 'Exigeant';
  consensus_score: number;
  polarization_score: number;
  review_count: number;
  why_it_matters: string;
  cultural_impact: string;
  top_tags: string[];
  pro_vs_community_gap: number;
  era_breakdown: { era: string, score: number }[];
  
  // New features
  similar_artists_ids: string[];
  essential_works_ids: { type: 'album' | 'track', id: string, label: string }[];
  evolution_description: string;
  discography_matrix?: {
    entry_point_id: string; // ID de l'album idéal pour commencer
    masterpiece_id: string; // Chef d'œuvre technique
    experimental_id?: string; // Pour les auditeurs avertis
    hidden_gem_id?: string; // La pépite méconnue
  };
  pro_consensus: string;
  community_consensus: string;
  pro_score: number;
  community_score: number;
  consensus_data: ConsensusData;
  summary: SummaryBlock;
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
  
  // New features
  track_list: {
    id: string;
    title: string;
    duration: string;
    is_entry_track?: boolean;
    is_community_favorite?: boolean;
    sentiment?: string;
  }[];
  coherence_score: number; // 0-100
  pro_highlights: string[];
  community_highlights: string[];
  pro_vs_community_analysis: string;
  consensus_data: ConsensusData;
  summary: SummaryBlock;
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
  
  // New features
  community_keywords?: string[];
  dominant_feeling?: string;
  access_level?: 'Immédiat' | 'Accessible' | 'Intermédiaire' | 'Exigeant';
  perceived_limits?: string[];
  cross_reviews_excerpts?: { user_id: string, user_name: string, text: string }[];
  listen_next_ids?: { type: EntityType, id: string, title: string, reason: string }[];
  coherence_context?: string; // How it fits in the artist/album journey
  consensus_data?: ConsensusData;
  summary?: SummaryBlock;
}

export interface Review {
  id: string;
  user_id: string;
  user_display_name: string;
  user_avatar: string;
  user_expertise?: string;
  target_type: EntityType;
  target_id: string;
  target_slug: string;
  target_name: string;
  rating_overall: number; // 1-5
  title?: string;
  
  // ÉTAPE 1: Choix guidés
  selections: {
    impression: string;
    highlights: string[];
    feeling: string;
    accessibility: string;
    target_audience: string[];
    limitations: string[];
  };

  // ÉTAPE 2: Justifications
  justifications: {
    why_words: string;
    key_element: string;
    dividing_factor: string;
    recommendation: string;
    entry_point: string;
  };
  
  quality_score: number;
  helpful_count: number;
  published_at: string;
  tone?: 'positif' | 'nuancé' | 'critique';
  angle?: 'production' | 'écriture' | 'émotion' | 'accessibilité' | 'cohérence';
  genre?: string;
  user_premium_status?: boolean;
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
  user_avatar?: string;
  title: string;
  description: string;
  items: { type: EntityType; id: string; slug: string; title: string; why: string }[];
  like_count: number;
  category: string;
  selection_type: 'Débutant' | 'Expert' | 'Thématique' | 'Humeur';
  discovery_promise: string;
  image_url: string;
  created_at: string;
}

export interface ProReview {
  id: string;
  target_id: string;
  source_name: string;
  source_logo?: string;
  score: string;
  excerpt: string;
  url: string;
}
