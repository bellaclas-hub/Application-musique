import { Artist, Album, Track, User, Review, AISummary, SharedList } from './types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    username: 'melo_fan',
    display_name: 'Julien Musique',
    bio_short: 'Passionné de synth-pop et de rock indé depuis 15 ans.',
    avatar_url: 'https://i.pravatar.cc/150?u=julien',
    credibility_level: 'qualifie',
    premium_status: true,
  },
  {
    id: 'u2',
    username: 'claire_v',
    display_name: 'Claire Vallet',
    bio_short: 'Exploratrice de sons hip-hop et electro.',
    avatar_url: 'https://i.pravatar.cc/150?u=claire',
    credibility_level: 'confirme',
    premium_status: false,
  }
];

export const mockArtists: Artist[] = [
  {
    id: 'a1',
    name: 'Daft Punk',
    slug: 'daft-punk',
    primary_genres: ['Electronic', 'Pop'],
    short_bio: 'Le duo casqué qui a redéfini la musique électronique mondiale.',
    long_bio: 'Daft Punk est un duo de musique électronique français originaire de Paris, composé de Thomas Bangalter et Guy-Manuel de Homem-Christo. Ils ont connu un succès mondial à partir de la fin des années 1990.',
    hero_image_url: 'https://picsum.photos/seed/daft/1200/600',
    cover_image_url: 'https://picsum.photos/seed/daftcover/400/400',
    entry_level: 'Accessible',
    consensus_score: 92,
    polarization_score: 15,
    review_count: 1240,
    why_it_matters: 'Ils ont fait le pont entre l\'underground techno et la pop mondiale avec une exigence artistique rare.',
    cultural_impact: 'Immense. Ils ont influencé toute une génération de producteurs et ont imposé l\'esthétique robotique dans la culture pop.',
    top_tags: ['Futuriste', 'Mélodique', 'Synthétique', 'Culte'],
    pro_vs_community_gap: 5,
    era_breakdown: [
      { era: '90s (Homework)', score: 88 },
      { era: '00s (Discovery)', score: 95 },
      { era: '10s (RAM)', score: 92 }
    ]
  },
  {
    id: 'a2',
    name: 'PNL',
    slug: 'pnl',
    primary_genres: ['Hip-hop', 'Cloud Rap'],
    short_bio: 'Les frères de Corbeil-Essonnes qui ont révolutionné le rap français.',
    long_bio: 'PNL (Peace N\' Lovés) est un groupe de rap français composé des deux frères Ademo et N.O.S. Ils sont connus pour leur esthétique cloud rap et leur indépendance totale.',
    hero_image_url: 'https://picsum.photos/seed/pnl/1200/600',
    cover_image_url: 'https://picsum.photos/seed/pnlcover/400/400',
    entry_level: 'Intermédiaire',
    consensus_score: 85,
    polarization_score: 45,
    review_count: 850,
    why_it_matters: 'Ils ont imposé une mélancolie et une imagerie cinématographique inédite dans le paysage urbain.',
    cultural_impact: 'Ils ont redéfini les codes du marketing musical (indépendance, rareté) et ont popularisé le cloud rap en France.',
    top_tags: ['Mélancolique', 'Atmosphérique', 'Urbain', 'Indépendant'],
    pro_vs_community_gap: -12,
    era_breakdown: [
      { era: 'QLF / Le Monde Chico', score: 82 },
      { era: 'Dans la légende', score: 90 },
      { era: 'Deux frères', score: 88 }
    ]
  },
  {
    id: 'a3',
    name: 'Phoenix',
    slug: 'phoenix',
    primary_genres: ['Indie Rock', 'Pop'],
    short_bio: 'Le groupe versaillais qui fait briller l\'indie-pop à l\'international.',
    long_bio: 'Phoenix est un groupe de rock alternatif français, originaire de Versailles. Leur musique mêle mélodies pop accrocheuses et arrangements rock sophistiqués.',
    hero_image_url: 'https://picsum.photos/seed/phoenix/1200/600',
    cover_image_url: 'https://picsum.photos/seed/phoenixcover/400/400',
    entry_level: 'Accessible',
    consensus_score: 88,
    polarization_score: 10,
    review_count: 450,
    why_it_matters: 'Ils représentent la "French Touch" version rock avec une élégance mélodique constante.',
    cultural_impact: 'L\'un des rares groupes français à avoir conquis les USA, ouvrant la voie à l\'indie-pop hexagonale.',
    top_tags: ['Élégant', 'Solaire', 'Versaillais', 'Pop'],
    pro_vs_community_gap: 2,
    era_breakdown: [
      { era: 'United / Alphabetical', score: 78 },
      { era: 'Wolfgang Amadeus', score: 94 },
      { era: 'Bankrupt! / Ti Amo', score: 82 }
    ]
  }
];

export const mockAlbums: Album[] = [
  {
    id: 'al1',
    artist_id: 'a1',
    artist_name: 'Daft Punk',
    artist_slug: 'daft-punk',
    title: 'Discovery',
    slug: 'discovery',
    release_date: '2001-03-12',
    cover_url: 'https://picsum.photos/seed/discovery/600/600',
    genres: ['Electronic', 'House', 'Pop'],
    critic_score: 95,
    community_score: 98,
    accessibility_score: 95,
    is_entry_album: true,
    short_description: 'Un chef-d\'œuvre de la French Touch, mêlant disco, pop et house.',
    long_description: 'Discovery est le deuxième album studio du duo de musique électronique français Daft Punk, sorti le 12 mars 2001. Il marque un tournant vers des sonorités plus pop, disco et garage house.'
  },
  {
    id: 'al2',
    artist_id: 'a2',
    artist_name: 'PNL',
    artist_slug: 'pnl',
    title: 'Dans la légende',
    slug: 'dans-la-legende',
    release_date: '2016-09-16',
    cover_url: 'https://picsum.photos/seed/pnl-album/600/600',
    genres: ['Cloud Rap'],
    critic_score: 82,
    community_score: 90,
    accessibility_score: 70,
    is_entry_album: true,
    short_description: 'L\'album qui a scellé leur domination sur le rap français.',
    long_description: 'Dans la légende est le deuxième album studio du groupe de rap français PNL. Certifié disque de diamant, cet album a marqué l\'histoire du rap français par son esthétique vaporeuse.'
  },
  {
    id: 'al3',
    artist_id: 'a3',
    artist_name: 'Phoenix',
    artist_slug: 'phoenix',
    title: 'Wolfgang Amadeus Phoenix',
    slug: 'wolfgang-amadeus-phoenix',
    release_date: '2009-05-25',
    cover_url: 'https://picsum.photos/seed/wolfgang/600/600',
    genres: ['Indie Rock'],
    critic_score: 92,
    community_score: 90,
    accessibility_score: 95,
    is_entry_album: true,
    short_description: 'L\'explosion mondiale de l\'indie-pop versaillaise.',
    long_description: 'Wolfgang Amadeus Phoenix est le quatrième album studio du groupe de rock alternatif français Phoenix. Il a remporté le Grammy Award du meilleur album alternative.'
  }
];

export const mockTracks: Track[] = [
  {
    id: 't1',
    album_id: 'al1',
    album_title: 'Discovery',
    album_slug: 'discovery',
    artist_id: 'a1',
    artist_name: 'Daft Punk',
    artist_slug: 'daft-punk',
    title: 'One More Time',
    slug: 'one-more-time',
    duration_seconds: 320,
    is_best_entry_track: true,
    quick_consensus_score: 99,
    description: 'L\'hymne ultime de la French Touch, une célébration de la vie et de la musique.'
  },
  {
    id: 't2',
    album_id: 'al1',
    album_title: 'Discovery',
    album_slug: 'discovery',
    artist_id: 'a1',
    artist_name: 'Daft Punk',
    artist_slug: 'daft-punk',
    title: 'Digital Love',
    slug: 'digital-love',
    duration_seconds: 298,
    is_best_entry_track: false,
    quick_consensus_score: 96,
    description: 'Une ballade électronique romantique avec un solo de synthétiseur légendaire.'
  },
  {
    id: 't3',
    album_id: 'al2',
    album_title: 'Dans la légende',
    album_slug: 'dans-la-legende',
    artist_id: 'a2',
    artist_name: 'PNL',
    artist_slug: 'pnl',
    title: 'DA',
    slug: 'da',
    duration_seconds: 230,
    is_best_entry_track: true,
    quick_consensus_score: 94,
    description: 'Le morceau qui définit l\'esthétique PNL : mélancolie, succès et solitude.'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    user_id: 'u1',
    user_display_name: 'Julien Musique',
    user_avatar: 'https://i.pravatar.cc/150?u=julien',
    user_expertise: 'Expert Electro',
    target_type: 'album',
    target_id: 'al1',
    rating_overall: 5,
    what_i_hear: 'Une fusion parfaite entre des samples disco oubliés et une production futuriste.',
    what_it_makes_me_feel: 'Une nostalgie joyeuse, comme un souvenir d\'enfance qu\'on redécouvre.',
    why_it_works_or_not: 'La structure des morceaux est simple mais l\'exécution est d\'une précision chirurgicale.',
    who_its_for: 'Tout le monde. C\'est l\'album universel par excellence.',
    limit_or_reserve: 'Peut-être un peu trop "propre" pour les puristes de la techno underground.',
    quality_score: 85,
    helpful_count: 42,
    published_at: '2024-03-10T10:00:00Z',
    tone: 'Analytique'
  },
  {
    id: 'r2',
    user_id: 'u2',
    user_display_name: 'Claire Vallet',
    user_avatar: 'https://i.pravatar.cc/150?u=claire',
    user_expertise: 'Critique Urbain',
    target_type: 'album',
    target_id: 'al2',
    rating_overall: 4.5,
    what_i_hear: 'Des nappes vaporeuses et des flows autotunés d\'une grande précision.',
    what_it_makes_me_feel: 'Une immersion dans la solitude urbaine et la fraternité.',
    why_it_works_or_not: 'L\'alchimie entre les deux frères crée une atmosphère unique.',
    who_its_for: 'Ceux qui cherchent un rap introspectif et atmosphérique.',
    limit_or_reserve: 'L\'usage intensif de l\'autotune peut rebuter certains auditeurs.',
    quality_score: 92,
    helpful_count: 89,
    published_at: '2025-11-05T14:30:00Z',
    tone: 'Passionné'
  }
];

export const mockAISummaries: AISummary[] = [
  {
    target_id: 'al1',
    summary_text: 'Discovery est largement considéré comme l\'un des albums les plus influents du 21ème siècle. Les avis convergent sur son accessibilité universelle et son génie mélodique.',
    key_points_positive: ['Mélodies intemporelles', 'Production révolutionnaire', 'Cohérence visuelle et sonore'],
    key_points_negative: ['Certains samples jugés trop répétitifs par une minorité']
  }
];

export const mockLists: SharedList[] = [
  {
    id: 'l1',
    slug: 'essentiels-french-touch',
    user_id: 'u1',
    user_display_name: 'Julien Musique',
    title: 'Les Essentiels French Touch',
    description: 'La sélection ultime pour découvrir le son qui a conquis le monde.',
    items: [
      { type: 'artist', id: 'a1', slug: 'daft-punk', title: 'Daft Punk', why: 'Les pionniers incontestés.' },
      { type: 'album', id: 'al3', slug: 'wolfgang-amadeus-phoenix', title: 'Wolfgang Amadeus Phoenix', why: 'L\'élégance pop versaillaise.' }
    ],
    like_count: 450,
    category: 'Curated'
  },
  {
    id: 'l2',
    slug: 'cloud-rap-français',
    user_id: 'u2',
    user_display_name: 'Claire Vallet',
    title: 'Voyage Cloud Rap',
    description: 'Une immersion dans les sonorités les plus planantes du rap FR.',
    items: [
      { type: 'artist', id: 'a2', slug: 'pnl', title: 'PNL', why: 'Les rois du genre.' }
    ],
    like_count: 230,
    category: 'Thematic'
  }
];
