import { Artist, Album, Track, User, Review, AISummary, SharedList, ProReview } from './types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    username: 'melomane_du_92',
    display_name: 'Thomas R.',
    bio_short: 'Passionné de synth-pop et de rap alternatif. Je cherche toujours la pépite cachée.',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    credibility_level: 'qualifie',
    premium_status: true,
    favorite_genre: 'Synth-Pop',
    critical_specialty: 'Production & Sound Design',
    discovery_style: 'Digging intensif sur Bandcamp',
    follow_reason: 'Pour ses sélections pointues de pépites électroniques méconnues.',
    signature: 'La musique est une architecture de l\'invisible.',
    favorite_artists_ids: ['art2', 'art5', 'art6'],
    taste_tones: ['Vaporeux', 'Synthétique', 'Mélancolique', 'Précis'],
    similar_profiles_ids: ['u3', 'u5'],
    followed_artists_ids: ['art1', 'art2', 'art5'],
    stats: { reviews_count: 42, followers_count: 128, following_count: 85, helpful_votes: 312 }
  },
  {
    id: 'u2',
    username: 'justine_vibes',
    display_name: 'Justine M.',
    bio_short: 'Exploratrice sonore. Le rock indépendant est ma maison.',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    credibility_level: 'confirme',
    premium_status: false,
    favorite_genre: 'Indie Rock',
    critical_specialty: 'Émotion & Authenticité',
    discovery_style: 'Festivals & Concerts locaux',
    follow_reason: 'Ses avis capturent parfaitement l\'énergie brute des performances live.',
    stats: { reviews_count: 15, followers_count: 45, following_count: 60, helpful_votes: 88 }
  },
  {
    id: 'u3',
    username: 'lucas_techno',
    display_name: 'Lucas B.',
    bio_short: 'Producteur amateur et fan de techno berlinoise. La précision avant tout.',
    avatar_url: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200',
    credibility_level: 'visiteur',
    premium_status: true,
    favorite_genre: 'Techno',
    critical_specialty: 'Analyse Technique',
    discovery_style: 'Labels indépendants européens',
    follow_reason: 'Une expertise technique rare sur la structure des morceaux club.',
    stats: { reviews_count: 8, followers_count: 22, following_count: 45, helpful_votes: 34 }
  },
  {
    id: 'u4',
    username: 'sophie_jazz',
    display_name: 'Sophie L.',
    bio_short: 'Le jazz est une conversation. Je collectionne les vinyles depuis 10 ans.',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    credibility_level: 'qualifie',
    premium_status: true,
    favorite_genre: 'Jazz',
    critical_specialty: 'Histoire & Contexte',
    discovery_style: 'Disquaires spécialisés',
    follow_reason: 'Pour comprendre l\'histoire derrière chaque note et chaque album.',
    stats: { reviews_count: 67, followers_count: 210, following_count: 120, helpful_votes: 540 }
  },
  {
    id: 'u5',
    username: 'marc_retro',
    display_name: 'Marc D.',
    bio_short: 'Nostalgique des années 80. Le synthé est mon instrument de prédilection.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    credibility_level: 'confirme',
    premium_status: false,
    favorite_genre: '80s Pop',
    critical_specialty: 'Mélodie & Nostalgie',
    discovery_style: 'Archives & Rééditions',
    follow_reason: 'Le guide ultime pour redécouvrir les trésors cachés de la décennie 80.',
    stats: { reviews_count: 24, followers_count: 88, following_count: 70, helpful_votes: 112 }
  },
  {
    id: 'u6',
    username: 'clara_folk',
    display_name: 'Clara V.',
    bio_short: 'Amoureuse des voix acoustiques et des récits intimes.',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    credibility_level: 'qualifie',
    premium_status: true,
    favorite_genre: 'Folk',
    critical_specialty: 'Paroles & Storytelling',
    discovery_style: 'Playlists communautaires',
    follow_reason: 'Une sensibilité unique pour dénicher les auteurs-compositeurs les plus sincères.',
    stats: { reviews_count: 35, followers_count: 156, following_count: 92, helpful_votes: 245 }
  },
  {
    id: 'u7',
    username: 'alex_hiphop',
    display_name: 'Alexandre K.',
    bio_short: 'Le rap est ma culture. Analyse de flows et de beats.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    credibility_level: 'confirme',
    premium_status: true,
    favorite_genre: 'Hip-hop',
    critical_specialty: 'Flow & Rythmique',
    discovery_style: 'SoundCloud & Réseaux sociaux',
    follow_reason: 'Toujours en avance sur les prochaines têtes d\'affiche du rap francophone.',
    stats: { reviews_count: 52, followers_count: 310, following_count: 150, helpful_votes: 620 }
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
    hero_image_url: 'https://images.unsplash.com/photo-1514525253361-bee8718a74a7?auto=format&fit=crop&q=80&w=1920',
    cover_image_url: 'https://images.unsplash.com/photo-1514525253361-bee8718a74a7?auto=format&fit=crop&q=80&w=800',
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
    name: 'Phénix',
    slug: 'phoenix',
    primary_genres: ['Indie Rock', 'Synth-Pop'],
    short_bio: 'Le groupe de Versailles qui a conquis le monde.',
    long_bio: 'Phoenix est un groupe de rock alternatif français originaire de Versailles. Ils sont l\'un des rares groupes français à avoir remporté un Grammy Award pour leur album "Wolfgang Amadeus Phoenix".',
    hero_image_url: 'https://images.unsplash.com/photo-1514525253361-bee8a187499b?auto=format&fit=crop&q=80&w=1920',
    cover_image_url: 'https://images.unsplash.com/photo-1514525253361-bee8a187499b?auto=format&fit=crop&q=80&w=800',
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
    hero_image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1920',
    cover_image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800',
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
  },
  {
    id: 'art4',
    name: 'Lana Del Rey',
    slug: 'lana-del-rey',
    primary_genres: ['Dream Pop', 'Alt-Pop'],
    short_bio: 'La reine de la mélancolie cinématographique.',
    long_bio: 'Lana Del Rey est une artiste américaine dont la musique est connue pour sa qualité cinématographique et son exploration des thèmes de la romance tragique, du glamour et de la mélancolie.',
    hero_image_url: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?auto=format&fit=crop&q=80&w=1920',
    cover_image_url: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?auto=format&fit=crop&q=80&w=800',
    entry_level: 'Accessible',
    consensus_score: 88,
    polarization_score: 30,
    review_count: 3500,
    why_it_matters: 'Elle a redéfini l\'esthétique de la pop alternative avec un univers visuel et sonore unique.',
    cultural_impact: 'Influence majeure sur la génération "Sad Girl" et le renouveau de la pop baroque.',
    top_tags: ['Vintage', 'Mélancolie', 'Cinématique', 'Iconique'],
    pro_vs_community_gap: -5,
    era_breakdown: [
      { era: 'Born to Die (2012)', score: 92 },
      { era: 'Norman Fucking Rockwell! (2019)', score: 98 },
      { era: 'Did You Know... (2023)', score: 85 }
    ]
  },
  {
    id: 'art5',
    name: 'Justice',
    slug: 'justice',
    primary_genres: ['Electronic', 'French Touch'],
    short_bio: 'Le duo qui a marié l\'électro et le heavy metal.',
    long_bio: 'Justice est un duo de musique électronique français composé de Gaspard Augé et Xavier de Rosnay. Ils sont connus pour leur mélange unique de disco, d\'électro et de rock.',
    hero_image_url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=1920',
    cover_image_url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800',
    entry_level: 'Intermédiaire',
    consensus_score: 94,
    polarization_score: 10,
    review_count: 1800,
    why_it_matters: 'Ils ont porté la French Touch vers des sommets d\'énergie brute et de grandiloquence visuelle.',
    cultural_impact: 'Leur logo en croix est devenu un symbole universel de la culture électronique moderne.',
    top_tags: ['Electro', 'French Touch', 'Énergie', 'Iconique'],
    pro_vs_community_gap: 2,
    era_breakdown: [
      { era: '† (Cross) (2007)', score: 99 },
      { era: 'Audio, Video, Disco (2011)', score: 78 },
      { era: 'Hyperdrama (2024)', score: 92 }
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
    cover_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600',
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
    artist_name: 'Phénix',
    artist_slug: 'phoenix',
    title: 'Wolfgang Amadeus Phoenix',
    slug: 'wolfgang-amadeus-phoenix',
    release_date: '2009-05-25',
    cover_url: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=600',
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
    artist_name: 'Phénix',
    artist_slug: 'phoenix',
    title: '1901',
    slug: '1901',
    duration_seconds: 197,
    is_best_entry_track: true,
    quick_consensus_score: 98,
    description: 'L\'energy pure du groupe concentrée dans un morceau de 3 minutes.'
  },
  {
    id: 'tr3',
    album_id: 'alb3',
    album_title: 'Ipséité',
    album_slug: 'ipseite',
    artist_id: 'art3',
    artist_name: 'Damso',
    artist_slug: 'damso',
    title: 'Macarena',
    slug: 'macarena',
    duration_seconds: 206,
    is_best_entry_track: true,
    quick_consensus_score: 92,
    description: 'Une ballade sombre et mélancolique qui a marqué le rap français.'
  },
  {
    id: 'tr4',
    album_id: 'alb4',
    album_title: 'Born to Die',
    album_slug: 'born-to-die',
    artist_id: 'art4',
    artist_name: 'Lana Del Rey',
    artist_slug: 'lana-del-rey',
    title: 'Video Games',
    slug: 'video-games',
    duration_seconds: 282,
    is_best_entry_track: true,
    quick_consensus_score: 95,
    description: 'Le morceau qui a lancé le phénomène Lana Del Rey.'
  },
  {
    id: 'tr5',
    album_id: 'alb5',
    album_title: '† (Cross)',
    album_slug: 'cross',
    artist_id: 'art5',
    artist_name: 'Justice',
    artist_slug: 'justice',
    title: 'D.A.N.C.E.',
    slug: 'dance',
    duration_seconds: 242,
    is_best_entry_track: true,
    quick_consensus_score: 97,
    description: 'Un classique de la French Touch, joyeux et irrésistible.'
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
    target_slug: 'angele',
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
    tone: 'positif',
    angle: 'écriture',
    genre: 'Pop',
    user_premium_status: true
  },
  {
    id: 'rev2',
    user_id: 'u2',
    user_display_name: 'Justine M.',
    user_avatar: 'https://picsum.photos/seed/user2/100/100',
    user_expertise: 'Passionnée Indie',
    target_type: 'album',
    target_id: 'alb2',
    target_slug: 'wolfgang-amadeus-phoenix',
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
    tone: 'positif',
    angle: 'production',
    genre: 'Rock-Indie',
    user_premium_status: false
  },
  {
    id: 'rev3',
    user_id: 'u3',
    user_display_name: 'Lucas B.',
    user_avatar: 'https://picsum.photos/seed/user3/100/100',
    user_expertise: 'Visiteur',
    target_type: 'track',
    target_id: 'tr2',
    target_slug: '1901',
    target_name: '1901',
    rating_overall: 4,
    title: 'Une énergie contagieuse',
    selections: {
      impression: 'efficace',
      highlights: ['énergie', 'mélodie'],
      feeling: 'euphorique',
      accessibility: 'immédiat',
      target_audience: ['grand public'],
      limitations: ['un peu court']
    },
    justifications: {
      why_words: 'C\'est le genre de morceau qui vous donne le sourire instantanément.',
      key_element: 'Le synthé au début est iconique.',
      dividing_factor: 'Peut sembler un peu répétitif à la longue.',
      recommendation: 'À mettre dans toutes les playlists de soirée.',
      entry_point: 'Écoutez-le fort.'
    },
    quality_score: 82,
    helpful_count: 45,
    published_at: '2024-04-01T09:15:00Z',
    tone: 'positif',
    angle: 'émotion',
    genre: 'Rock-Indie',
    user_premium_status: true
  },
  {
    id: 'rev4',
    user_id: 'u4',
    user_display_name: 'Sophie L.',
    user_avatar: 'https://picsum.photos/seed/user4/100/100',
    user_expertise: 'Qualifiée Jazz/Soul',
    target_type: 'artist',
    target_id: 'art3',
    target_slug: 'damso',
    target_name: 'Damso',
    rating_overall: 3,
    title: 'Brillant mais épuisant',
    selections: {
      impression: 'exigeant',
      highlights: ['écriture', 'flow'],
      feeling: 'sombre',
      accessibility: 'exigeant',
      target_audience: ['amateurs de textes'],
      limitations: ['trop sombre', 'parfois violent']
    },
    justifications: {
      why_words: 'Damso est un génie des mots, mais son univers est parfois trop lourd à porter.',
      key_element: 'Sa capacité à créer des images mentales très fortes.',
      dividing_factor: 'Sa noirceur peut en repousser plus d\'un.',
      recommendation: 'Pour ceux qui aiment analyser chaque rime.',
      entry_point: 'Ipséité reste son œuvre la plus équilibrée.'
    },
    quality_score: 91,
    helpful_count: 89,
    published_at: '2024-03-28T18:40:00Z',
    tone: 'nuancé',
    angle: 'écriture',
    genre: 'Hip-hop-Rap',
    user_premium_status: true
  },
  {
    id: 'rev5',
    user_id: 'u5',
    user_display_name: 'Marc D.',
    user_avatar: 'https://picsum.photos/seed/user5/100/100',
    user_expertise: 'Confirmé Synthé',
    target_type: 'album',
    target_id: 'alb1',
    target_slug: 'brol',
    target_name: 'Brol',
    rating_overall: 4,
    title: 'Une bouffée d\'air frais',
    selections: {
      impression: 'accessible',
      highlights: ['originalité', 'voix'],
      feeling: 'chaleureux',
      accessibility: 'accessible',
      target_audience: ['grand public'],
      limitations: ['quelques longueurs']
    },
    justifications: {
      why_words: 'C\'est un album qui fait du bien, sans être superficiel.',
      key_element: 'Le mélange entre pop et touches jazzy.',
      dividing_factor: 'Certains titres sont un peu en dessous du reste.',
      recommendation: 'Idéal pour les trajets en voiture.',
      entry_point: 'Balance ton quoi est le point de départ évident.'
    },
    quality_score: 88,
    helpful_count: 67,
    published_at: '2024-03-10T12:00:00Z',
    tone: 'positif',
    angle: 'accessibilité',
    genre: 'Pop',
    user_premium_status: false
  },
  {
    id: 'rev6',
    user_id: 'u1',
    user_display_name: 'Thomas R.',
    user_avatar: 'https://picsum.photos/seed/user1/100/100',
    user_expertise: 'Expert Pop/Rap',
    target_type: 'track',
    target_id: 'tr1',
    target_slug: 'balance-ton-quoi',
    target_name: 'Balance ton quoi',
    rating_overall: 5,
    title: 'L\'hymne d\'une génération',
    selections: {
      impression: 'marquant',
      highlights: ['écriture', 'mélodie'],
      feeling: 'frontal',
      accessibility: 'immédiat',
      target_audience: ['grand public'],
      limitations: []
    },
    justifications: {
      why_words: 'Un texte fort sur une musique légère, c\'est la recette parfaite.',
      key_element: 'Le clip et le message derrière.',
      dividing_factor: 'Peut sembler trop "entendu" maintenant.',
      recommendation: 'Indispensable pour comprendre la culture actuelle.',
      entry_point: 'À écouter avec attention.'
    },
    quality_score: 96,
    helpful_count: 312,
    published_at: '2024-01-15T10:00:00Z',
    tone: 'positif',
    angle: 'cohérence',
    genre: 'Pop',
    user_premium_status: true
  },
  {
    id: 'rev7',
    user_id: 'u2',
    user_display_name: 'Justine M.',
    user_avatar: 'https://picsum.photos/seed/user2/100/100',
    user_expertise: 'Passionnée Indie',
    target_type: 'artist',
    target_id: 'art2',
    target_slug: 'phoenix',
    target_name: 'Phénix',
    rating_overall: 4,
    title: 'L\'élégance à la française',
    selections: {
      impression: 'maîtrisé',
      highlights: ['production', 'ambiance'],
      feeling: 'aérien',
      accessibility: 'accessible',
      target_audience: ['chercheurs de nouveautés'],
      limitations: ['parfois un peu distant']
    },
    justifications: {
      why_words: 'Leur son est unique, reconnaissable entre mille.',
      key_element: 'La voix de Thomas Mars.',
      dividing_factor: 'Leur côté "Versailles" peut agacer.',
      recommendation: 'Pour ceux qui aiment le rock qui fait danser.',
      entry_point: 'Wolfgang Amadeus Phoenix est leur sommet.'
    },
    quality_score: 92,
    helpful_count: 128,
    published_at: '2024-02-10T15:30:00Z',
    tone: 'positif',
    angle: 'production',
    genre: 'Rock-Indie',
    user_premium_status: false
  },
  {
    id: 'rev8',
    user_id: 'u3',
    user_display_name: 'Lucas B.',
    user_avatar: 'https://picsum.photos/seed/user3/100/100',
    user_expertise: 'Visiteur',
    target_type: 'album',
    target_id: 'alb2',
    target_slug: 'wolfgang-amadeus-phoenix',
    target_name: 'Wolfgang Amadeus Phoenix',
    rating_overall: 2,
    title: 'Trop de hype ?',
    selections: {
      impression: 'surévalué',
      highlights: ['mélodie'],
      feeling: 'frontal',
      accessibility: 'accessible',
      target_audience: ['grand public'],
      limitations: ['manque de relief', 'trop lisse']
    },
    justifications: {
      why_words: 'Je ne comprends pas l\'engouement massif autour de cet album.',
      key_element: 'C\'est sympa mais ça s\'oublie vite.',
      dividing_factor: 'Le manque de prise de risque.',
      recommendation: 'Pour passer le temps en fond sonore.',
      entry_point: 'Écoutez les singles.'
    },
    quality_score: 65,
    helpful_count: 12,
    published_at: '2024-04-05T11:00:00Z',
    tone: 'critique',
    angle: 'cohérence',
    genre: 'Rock-Indie',
    user_premium_status: true
  },
  {
    id: 'rev9',
    user_id: 'u4',
    user_display_name: 'Sophie L.',
    user_avatar: 'https://picsum.photos/seed/user4/100/100',
    user_expertise: 'Qualifiée Jazz/Soul',
    target_type: 'track',
    target_id: 'tr1',
    target_slug: 'balance-ton-quoi',
    target_name: 'Balance ton quoi',
    rating_overall: 3,
    title: 'Efficace mais répétitif',
    selections: {
      impression: 'efficace',
      highlights: ['voix'],
      feeling: 'nerveux',
      accessibility: 'immédiat',
      target_audience: ['grand public'],
      limitations: ['trop répétitif']
    },
    justifications: {
      why_words: 'C\'est un bon morceau mais il tourne un peu en rond.',
      key_element: 'La structure couplet/refrain très classique.',
      dividing_factor: 'Le côté matraquage radio.',
      recommendation: 'Pour une écoute occasionnelle.',
      entry_point: 'À écouter une fois.'
    },
    quality_score: 78,
    helpful_count: 34,
    published_at: '2024-03-20T16:20:00Z',
    tone: 'nuancé',
    angle: 'accessibilité',
    genre: 'Pop',
    user_premium_status: true
  },
  {
    id: 'rev10',
    user_id: 'u5',
    user_display_name: 'Marc D.',
    user_avatar: 'https://picsum.photos/seed/user5/100/100',
    user_expertise: 'Confirmé Synthé',
    target_type: 'artist',
    target_id: 'art3',
    target_slug: 'damso',
    target_name: 'Damso',
    rating_overall: 5,
    title: 'Le maître du clair-obscur',
    selections: {
      impression: 'captivant',
      highlights: ['écriture', 'ambiance'],
      feeling: 'intense',
      accessibility: 'exigeant',
      target_audience: ['amateurs de textes', 'fans d\'univers marqués'],
      limitations: []
    },
    justifications: {
      why_words: 'Il arrive à rendre la mélancolie belle.',
      key_element: 'Sa voix grave et ses placements.',
      dividing_factor: 'L\'aspect très cru de certains textes.',
      recommendation: 'Indispensable pour tout fan de rap qui se respecte.',
      entry_point: 'QALF est une bonne porte d\'entrée plus "douce".'
    },
    quality_score: 94,
    helpful_count: 112,
    published_at: '2024-04-10T08:00:00Z',
    tone: 'positif',
    angle: 'émotion',
    genre: 'Hip-hop-Rap',
    user_premium_status: false
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
    user_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
    title: 'Les Essentiels de la Pop Française',
    description: 'Une sélection des albums qui ont défini la pop en France ces dernières années, entre efficacité mélodique et textes soignés.',
    items: [
      { type: 'album', id: 'alb1', slug: 'brol', title: 'Brol', why: 'L\'album qui a lancé la nouvelle vague pop.' },
      { type: 'artist', id: 'art1', slug: 'angele', title: 'Angèle', why: 'L\'artiste incontournable du genre.' }
    ],
    like_count: 450,
    category: 'Pop',
    selection_type: 'Débutant',
    discovery_promise: 'Comprendre la pop moderne en 5 écoutes.',
    image_url: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'l2',
    slug: 'portes-entree-rap-introspectif',
    user_id: 'u5',
    user_display_name: 'Marc D.',
    user_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    title: '5 Portes d\'entrée dans le Rap Introspectif',
    description: 'Pour ceux qui aiment les textes profonds, les ambiances sombres et les récits de vie sans filtre.',
    items: [
      { type: 'artist', id: 'art3', slug: 'damso', title: 'Damso', why: 'Le maître du clair-obscur belge.' }
    ],
    like_count: 890,
    category: 'Rap',
    selection_type: 'Expert',
    discovery_promise: 'Plongez dans la psyché des meilleurs lyricistes.',
    image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-02-10T14:30:00Z'
  },
  {
    id: 'l3',
    slug: 'indie-rock-accessible',
    user_id: 'u2',
    user_display_name: 'Justine M.',
    user_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    title: 'Indie Rock Accessible pour commencer',
    description: 'Pas besoin d\'être un puriste pour apprécier ces pépites rock aux mélodies immédiates.',
    items: [
      { type: 'artist', id: 'art2', slug: 'phoenix', title: 'Phénix', why: 'L\'énergie pop-rock à la française.' },
      { type: 'album', id: 'alb2', slug: 'wolfgang-amadeus-phoenix', title: 'Wolfgang Amadeus Phoenix', why: 'Un classique indémodable.' }
    ],
    like_count: 560,
    category: 'Indie',
    selection_type: 'Débutant',
    discovery_promise: 'Le rock sans la barrière de l\'élitisme.',
    image_url: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-03-05T09:15:00Z'
  },
  {
    id: 'l4',
    slug: 'albums-parfaits-pour-la-nuit',
    user_id: 'u4',
    user_display_name: 'Sophie L.',
    user_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    title: 'Albums parfaits pour la nuit',
    description: 'Des productions vaporeuses, des voix feutrées et une mélancolie douce pour vos insomnies.',
    items: [
      { type: 'artist', id: 'art4', slug: 'lana-del-rey', title: 'Lana Del Rey', why: 'La reine du glamour nostalgique.' }
    ],
    like_count: 1200,
    category: 'Humeur',
    selection_type: 'Thématique',
    discovery_promise: 'La bande-son idéale de vos pensées nocturnes.',
    image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-03-25T22:00:00Z'
  },
  {
    id: 'l5',
    slug: 'si-vous-aimez-angele',
    user_id: 'u1',
    user_display_name: 'Thomas R.',
    user_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
    title: 'Si vous aimez Angèle, essayez aussi...',
    description: 'Vous avez poncé Brol et Nonante-Cinq ? Voici la suite logique de votre parcours pop.',
    items: [
      { type: 'artist', id: 'art1', slug: 'angele', title: 'Angèle', why: 'Votre point de départ.' }
    ],
    like_count: 340,
    category: 'Sélections d\'experts',
    selection_type: 'Thématique',
    discovery_promise: 'Élargissez votre horizon pop sans perdre le fil.',
    image_url: 'https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-04-01T11:30:00Z'
  },
  {
    id: 'l6',
    slug: 'french-touch-renaissance',
    user_id: 'u5',
    user_display_name: 'Marc D.',
    user_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    title: 'French Touch : La Renaissance',
    description: 'De Justice aux nouveaux héritiers, découvrez comment l\'électro française continue de briller.',
    items: [
      { type: 'artist', id: 'art5', slug: 'justice', title: 'Justice', why: 'Les piliers de l\'électro rock.' }
    ],
    like_count: 720,
    category: 'Electronic',
    selection_type: 'Expert',
    discovery_promise: 'L\'énergie des clubs français dans vos oreilles.',
    image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-04-05T16:45:00Z'
  },
  {
    id: 'l7',
    slug: 'melancolie-estivale',
    user_id: 'u4',
    user_display_name: 'Sophie L.',
    user_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    title: 'Mélancolie Estivale',
    description: 'Pour ces fins de journées d\'été où le soleil se couche et laisse place à une douce tristesse.',
    items: [],
    like_count: 210,
    category: 'Humeur',
    selection_type: 'Humeur',
    discovery_promise: 'Des morceaux qui sentent le sable chaud et les regrets.',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-04-10T18:20:00Z'
  },
  {
    id: 'l8',
    slug: 'textes-engages-pop-actuelle',
    user_id: 'u3',
    user_display_name: 'Lucas B.',
    user_avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100',
    title: 'Textes Engagés dans la Pop Actuelle',
    description: 'Quand la mélodie sert un message fort. Féminisme, écologie, société : la pop prend position.',
    items: [
      { type: 'track', id: 'tr1', slug: 'balance-ton-quoi', title: 'Balance ton quoi', why: 'L\'hymne d\'une génération.' }
    ],
    like_count: 315,
    category: 'Pop',
    selection_type: 'Thématique',
    discovery_promise: 'Écoutez ce que les artistes ont vraiment à dire.',
    image_url: 'https://images.unsplash.com/photo-1526218626217-dc65a29bb444?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-04-12T09:00:00Z'
  }
];

export const mockProReviews: ProReview[] = [
  {
    id: 'pro1',
    target_id: 'alb2',
    source_name: 'Les Inrockuptibles',
    score: '5/5',
    excerpt: 'Phénix signe ici l\'album de rock français le plus excitant de la décennie.',
    url: 'https://www.lesinrocks.com'
  }
];
