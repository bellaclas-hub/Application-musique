import { Artist, Album, Track, User, Review, AISummary, SharedList, ProReview } from './types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    username: 'melomane_du_92',
    display_name: 'Thomas R.',
    bio_short: 'Passionné de synth-pop et de rap alternatif. Je cherche toujours la pépite cachée.',
    avatar_url: 'https://picsum.photos/seed/user1/200/200',
    credibility_level: 'qualifie',
    premium_status: true,
    stats: { reviews_count: 42, followers_count: 128, following_count: 85, helpful_votes: 312 }
  },
  {
    id: 'u2',
    username: 'claire_vibes',
    display_name: 'Claire M.',
    bio_short: 'Exploratrice sonore. Le rock indépendant est ma maison.',
    avatar_url: 'https://picsum.photos/seed/user2/200/200',
    credibility_level: 'confirme',
    premium_status: false,
    stats: { reviews_count: 15, followers_count: 45, following_count: 60, helpful_votes: 88 }
  }
];

export const mockArtists: Artist[] = [
  {
    id: 'art1',
    name: 'Angèle',
    slug: 'angele',
    primary_genres: ['Pop', 'Chanson Française'],
    short_bio: 'L\'icône de la pop francophone moderne.',
    long_bio: 'Angèle est une autrice-compositrice-interprète belge qui a révolutionné la pop francophone avec son premier album "Brol". Son style mêle humour, mélancolie et productions léchées.',
    hero_image_url: 'https://picsum.photos/seed/angele-hero/1920/1080',
    cover_image_url: 'https://picsum.photos/seed/angele-cover/800/800',
    entry_level: 'Accessible',
    consensus_score: 85,
    polarization_score: 20,
    review_count: 1240,
    why_it_matters: 'Elle a su redonner des couleurs à la pop française en y injectant une dose de réalisme et d\'autodérision.',
    cultural_impact: 'Angèle est devenue une figure de proue du féminisme moderne dans la musique pop.',
    top_tags: ['Pop', 'Belge', 'Engagé', 'Mélodique'],
    pro_vs_community_gap: 5,
    era_breakdown: [
      { era: 'Brol (2018)', score: 88 },
      { era: 'Nonante-Cinq (2021)', score: 82 }
    ]
  },
  {
    id: 'art2',
    name: 'Phoenix',
    slug: 'phoenix',
    primary_genres: ['Indie Rock', 'Synth-Pop'],
    short_bio: 'Le groupe de Versailles qui a conquis le monde.',
    long_bio: 'Phoenix est un groupe de rock alternatif français originaire de Versailles. Ils sont l\'un des rares groupes français à avoir remporté un Grammy Award pour leur album "Wolfgang Amadeus Phoenix".',
    hero_image_url: 'https://picsum.photos/seed/phoenix-hero/1920/1080',
    cover_image_url: 'https://picsum.photos/seed/phoenix-cover/800/800',
    entry_level: 'Intermédiaire',
    consensus_score: 92,
    polarization_score: 15,
    review_count: 850,
    why_it_matters: 'Ils ont prouvé que le rock français pouvait s\'exporter massivement sans perdre son élégance.',
    cultural_impact: 'Leur son "French Touch" appliqué au rock a influencé toute une génération de groupes indie.',
    top_tags: ['Indie', 'Versailles', 'Élégant', 'Pop-Rock'],
    pro_vs_community_gap: -2,
    era_breakdown: [
      { era: 'Débuts (2000-2006)', score: 75 },
      { era: 'Âge d\'Or (2009-2013)', score: 95 },
      { era: 'Moderne (2017-Présent)', score: 80 }
    ]
  },
  {
    id: 'art3',
    name: 'Damso',
    slug: 'damso',
    primary_genres: ['Hip-hop', 'Rap'],
    short_bio: 'Le lyriciste sombre et introspectif du rap belge.',
    long_bio: 'Damso est un rappeur et auteur-compositeur belgo-congolais. Connu pour ses textes crus, sombres et une introspection rare dans le milieu du rap.',
    hero_image_url: 'https://picsum.photos/seed/damso-hero/1920/1080',
    cover_image_url: 'https://picsum.photos/seed/damso-cover/800/800',
    entry_level: 'Expérimental',
    consensus_score: 89,
    polarization_score: 45,
    review_count: 2100,
    why_it_matters: 'Il a repoussé les limites de l\'écriture dans le rap francophone, traitant de thèmes complexes avec une noirceur poétique.',
    cultural_impact: 'Il a ouvert la voie à un rap plus psychologique et moins conventionnel.',
    top_tags: ['Rap', 'Sombre', 'Lyriciste', 'Belge'],
    pro_vs_community_gap: 12,
    era_breakdown: [
      { era: 'Ipséité (2017)', score: 96 },
      { era: 'Lithopédion (2018)', score: 85 },
      { era: 'QALF (2020)', score: 90 }
    ]
  }
];

export const mockAlbums: Album[] = [
  {
    id: 'alb1',
    artist_id: 'art1',
    artist_name: 'Angèle',
    artist_slug: 'angele',
    title: 'Brol',
    slug: 'brol',
    release_date: '2018-10-05',
    cover_url: 'https://picsum.photos/seed/brol/600/600',
    genres: ['Pop'],
    critic_score: 82,
    community_score: 88,
    accessibility_score: 95,
    is_entry_album: true,
    short_description: 'Le premier album phénomène qui a tout changé.',
    long_description: 'Brol est un album rafraîchissant qui explore les thèmes de la célébrité, des réseaux sociaux et de l\'amour avec une honnêteté désarmante.'
  },
  {
    id: 'alb2',
    artist_id: 'art2',
    artist_name: 'Phoenix',
    artist_slug: 'phoenix',
    title: 'Wolfgang Amadeus Phoenix',
    slug: 'wolfgang-amadeus-phoenix',
    release_date: '2009-05-25',
    cover_url: 'https://picsum.photos/seed/wolfgang/600/600',
    genres: ['Indie Rock'],
    critic_score: 94,
    community_score: 91,
    accessibility_score: 80,
    is_entry_album: true,
    short_description: 'Le chef-d\'œuvre absolu de l\'indie pop française.',
    long_description: 'Un album parfait de bout en bout, mêlant énergie rock et sens de la mélodie pop imparable.'
  }
];

export const mockTracks: Track[] = [
  {
    id: 'tr1',
    album_id: 'alb1',
    album_title: 'Brol',
    album_slug: 'brol',
    artist_id: 'art1',
    artist_name: 'Angèle',
    artist_slug: 'angele',
    title: 'Balance ton quoi',
    slug: 'balance-ton-quoi',
    duration_seconds: 189,
    is_best_entry_track: true,
    quick_consensus_score: 96,
    description: 'Un hymne féministe porté par une mélodie pop entêtante.'
  },
  {
    id: 'tr2',
    album_id: 'alb2',
    album_title: 'Wolfgang Amadeus Phoenix',
    album_slug: 'wolfgang-amadeus-phoenix',
    artist_id: 'art2',
    artist_name: 'Phoenix',
    artist_slug: 'phoenix',
    title: '1901',
    slug: '1901',
    duration_seconds: 197,
    is_best_entry_track: true,
    quick_consensus_score: 98,
    description: 'L\'energy pure du groupe concentrée dans un morceau de 3 minutes.'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev1',
    user_id: 'u1',
    user_display_name: 'Thomas R.',
    user_avatar: 'https://picsum.photos/seed/user1/100/100',
    user_expertise: 'Expert Pop/Rap',
    target_type: 'artist',
    target_id: 'art1',
    target_name: 'Angèle',
    rating_overall: 5,
    title: 'La perfection pop moderne',
    selections: {
      impression: 'marquant',
      highlights: ['écriture', 'mélodie'],
      feeling: 'euphorique',
      accessibility: 'immédiat',
      target_audience: ['grand public', 'curieux'],
      limitations: ['trop lisse']
    },
    justifications: {
      why_words: 'Angèle a réussi à créer un univers qui parle à tout le monde tout en restant très personnel.',
      key_element: 'Sa capacité à écrire des refrains qui restent en tête dès la première écoute.',
      dividing_factor: 'Certains peuvent trouver sa voix trop "lisse", mais c\'est ce qui fait son charme.',
      recommendation: 'Pour quiconque veut comprendre la pop française des années 2020.',
      entry_point: 'Commencez par "Brol", c\'est la base.'
    },
    quality_score: 95,
    helpful_count: 156,
    published_at: '2024-03-15T10:00:00Z',
    tone: 'Enthousiaste'
  },
  {
    id: 'rev2',
    user_id: 'u2',
    user_display_name: 'Claire M.',
    user_avatar: 'https://picsum.photos/seed/user2/100/100',
    user_expertise: 'Passionnée Indie',
    target_type: 'album',
    target_id: 'alb2',
    target_name: 'Wolfgang Amadeus Phoenix',
    rating_overall: 5,
    title: 'Un classique instantané',
    selections: {
      impression: 'maîtrisé',
      highlights: ['production', 'énergie'],
      feeling: 'intense',
      accessibility: 'accessible',
      target_audience: ['amateurs du genre', 'chercheurs de nouveautés'],
      limitations: []
    },
    justifications: {
      why_words: 'L\'album n\'a pas pris une ride en 15 ans. La production est toujours aussi fraîche.',
      key_element: 'L\'enchaînement parfait des morceaux, on ne s\'ennuie jamais.',
      dividing_factor: 'Peut-être un peu trop "propre" pour les puristes du rock garage.',
      recommendation: 'C\'est l\'album idéal pour découvrir le rock indépendant français.',
      entry_point: 'Écoutez "1901" et "Lisztomania" en boucle.'
    },
    quality_score: 98,
    helpful_count: 240,
    published_at: '2024-02-20T14:30:00Z',
    tone: 'Analytique'
  }
];

export const mockAISummaries: AISummary[] = [
  {
    target_id: 'art1',
    summary_text: 'Angèle fait l\'unanimité pour sa fraîcheur et son écriture honnête. Elle est perçue comme la porte d\'entrée idéale vers la pop francophone actuelle.',
    key_points_positive: ['Mélodies accrocheuses', 'Textes authentiques', 'Production moderne'],
    key_points_negative: ['Voix parfois jugée trop uniforme', 'Surexposition médiatique']
  }
];

export const mockLists: SharedList[] = [
  {
    id: 'l1',
    slug: 'essentiels-pop-francaise',
    user_id: 'u1',
    user_display_name: 'Thomas R.',
    title: 'Les Essentiels de la Pop Française',
    description: 'Une sélection des albums qui ont défini la pop en France ces dernières années.',
    items: [
      { type: 'album', id: 'alb1', slug: 'brol', title: 'Brol', why: 'L\'album qui a lancé la nouvelle vague.' },
      { type: 'artist', id: 'art1', slug: 'angele', title: 'Angèle', why: 'L\'artiste incontournable du genre.' }
    ],
    like_count: 450,
    category: 'Curated'
  }
];

export const mockProReviews: ProReview[] = [
  {
    id: 'pro1',
    target_id: 'alb2',
    source_name: 'Les Inrockuptibles',
    score: '5/5',
    excerpt: 'Phoenix signe ici l\'album de rock français le plus excitant de la décennie.',
    url: 'https://www.lesinrocks.com'
  }
];
