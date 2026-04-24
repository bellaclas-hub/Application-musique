import { Artist, Album, Track, User, Review, AISummary, SharedList, ProReview } from './types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    username: 'melomane_du_92',
    display_name: 'Thomas R.',
    slug: 'thomas-r',
    bio_short: 'Passionné de synth-pop et de rap alternatif. Je cherche toujours la pépite cachée.',
    avatar_url: 'https://images.unsplash.com/photo-1550684848-86a5d8727436?auto=format&fit=crop&q=80&w=200',
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
    slug: 'justine-m',
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
    slug: 'lucas-b',
    bio_short: 'Producteur amateur et fan de techno berlinoise. La précision avant tout.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
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
    slug: 'sophie-l',
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
    slug: 'marc-d',
    bio_short: 'Nostalgique des années 80. Le synthé est mon instrument de prédilection.',
    avatar_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=200',
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
    slug: 'clara-v',
    bio_short: 'Amoureuse des voix acoustiques et des récits intimes.',
    avatar_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=200',
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
    slug: 'alexandre-k',
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
    hero_image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1920',
    cover_image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    entry_level: 'Immédiat',
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
    ],
    similar_artists_ids: ['art8', 'art9', 'art10'],
    essential_works_ids: [
      { type: 'album', id: 'alb1', label: 'L\'album culte' },
      { type: 'track', id: 'tr1', label: 'Le hit mondial' }
    ],
    evolution_description: 'D\'une pop bricolée et ironique vers des productions plus denses et une mélancolie assumée.',
    pro_consensus: 'Une écriture fine et une efficacité mélodique redoutable.',
    community_consensus: 'Une artiste authentique qui parle de sa génération sans filtre.',
    pro_score: 82,
    community_score: 88,
    consensus_data: {
      pros: ['Efficacité mélodique', 'Textes ancrés dans le réel', 'Production moderne'],
      cons: ['Voix parfois trop uniforme', 'Lissage excessif sur certains titres'],
      dividing_points: ['Récupération politique/sociétale', 'Omniprésence médiatique'],
      consensus_summary: 'Angèle est la porte d\'entrée idéale vers la pop actuelle, mêlant accessibilité et fond.',
      recommended_for: ['Amateurs de pop', 'Ceux qui cherchent des textes actuels', 'Pour commencer la pop FR']
    },
    summary: {
      why_it_pleases: ['Mélodies entêtantes', 'Humour et autodérision', 'Univers visuel fort'],
      friction_points: ['Production parfois trop clinique', 'Thèmes récurrents'],
      ideal_for: 'Les auditeurs cherchant une pop intelligente et immédiate.',
      starting_point: {
        type: 'album',
        id: 'alb1',
        title: 'Brol',
        description: 'La base absolue pour comprendre son univers.'
      }
    }
  },
  {
    id: 'art2',
    name: 'Phénix',
    slug: 'phoenix',
    primary_genres: ['Indie Rock', 'Synth-Pop'],
    short_bio: 'Le groupe de Versailles qui a conquis le monde.',
    long_bio: 'Phoenix est un groupe de rock alternatif français originaire de Versailles. Ils sont l\'un des rares groupes français à avoir remporté un Grammy Award pour leur album "Wolfgang Amadeus Phoenix".',
    hero_image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1920',
    cover_image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=800',
    entry_level: 'Accessible',
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
    ],
    similar_artists_ids: ['art11', 'art12'],
    essential_works_ids: [
      { type: 'album', id: 'alb2', label: 'Le chef-d\'œuvre global' },
      { type: 'track', id: 'tr2', label: 'L\'hymne indie' }
    ],
    evolution_description: 'Passage d\'un rock garage teinté de soul vers une pop synthétique raffinée et internationale.',
    pro_consensus: 'Une maîtrise de la production et un sens inné de la mélodie intemporelle.',
    community_consensus: 'Le groupe parfait pour les fins d\'après-midi d\'été.',
    pro_score: 94,
    community_score: 92,
    consensus_data: {
      pros: ['Sonnique unique', 'Énergie live communicative', 'Élégance française'],
      cons: ['Parfois un peu trop distant/chic', 'Manque de renouvellement récent'],
      dividing_points: ['L\'aspect "Versailles" un peu élitiste', 'L\'usage intensif des synthés'],
      consensus_summary: 'Un consensus massif sur leur période 2009, unanimement saluée comme un sommet du genre.',
      recommended_for: ['Amateurs d\'Indie Rock', 'Fans de production léchée', 'Ceux qui aiment danser sur du rock']
    },
    summary: {
      why_it_pleases: ['Rythmiques entraînantes', 'Mélodies accrocheuses', 'Atmosphère solaire'],
      friction_points: ['Voix parfois trop vocodée', 'Structure de morceaux classique'],
      ideal_for: 'Pour ceux qui cherchent l\'équilibre parfait entre rock et pop électronique.',
      starting_point: {
        type: 'track',
        id: 'tr2',
        title: '1901',
        description: '3 minutes de pur bonheur indie qui résument parfaitement leur talent.'
      }
    }
  },
  {
    id: 'art3',
    name: 'Damso',
    slug: 'damso',
    primary_genres: ['Hip-hop', 'Rap'],
    short_bio: 'Le lyriciste sombre et introspectif du rap belge.',
    long_bio: 'Damso est un rappeur et auteur-compositeur belgo-congolais. Connu pour ses textes crus, sombres et une introspection rare dans le milieu du rap.',
    hero_image_url: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80&w=1920',
    cover_image_url: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80&w=800',
    entry_level: 'Exigeant',
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
    ],
    similar_artists_ids: ['art13', 'art14'],
    essential_works_ids: [
      { type: 'album', id: 'alb3', label: 'Le classique instantané' },
      { type: 'track', id: 'tr3', label: 'La mélancolie pure' }
    ],
    evolution_description: 'D\'une noirceur absolue et violente vers une introspection plus apaisée et musicale.',
    discography_matrix: {
      entry_point_id: 'alb3', // Ipséité
      masterpiece_id: 'alb3', // Ipséité
      experimental_id: 'alb11', // Lithopédion (supposé pour l'exemple)
      hidden_gem_id: 'alb12' // Batterie Faible (supposé pour l'exemple)
    },
    pro_consensus: 'Un flow technique et une écriture d\'une densité rare.',
    community_consensus: 'Le rappeur le plus profond de sa génération, malgré ses sorties clivantes.',
    pro_score: 91,
    community_score: 89,
    consensus_data: {
      pros: ['Qualité des textes', 'Univers sonore unique', 'Réinvention constante'],
      cons: ['Paroles parfois trop crues', 'Communication mystérieuse'],
      dividing_points: ['Ses prises de position', 'Le virage musical de Lithopédion'],
      consensus_summary: 'Damso divise sur la forme mais fait l\'unanimité sur le fond et son importance culturelle.',
      recommended_for: ['Amateurs de textes', 'Fans de rap introspectif', 'Ceux qui cherchent de la profondeur']
    },
    summary: {
      why_it_pleases: ['Complexité lyrical', 'Ambiance immersive', 'Authenticité'],
      friction_points: ['Violence verbale', 'Accès parfois difficile'],
      ideal_for: 'Les auditeurs qui aiment décortiquer les paroles et les ambiances sombres.',
      starting_point: {
        type: 'album',
        id: 'alb3',
        title: 'Ipséité',
        description: 'L\'album qui a défini son style et marqué le rap français.'
      }
    }
  },
  {
    id: 'art4',
    name: 'Lana Del Rey',
    slug: 'lana-del-rey',
    primary_genres: ['Dream Pop', 'Alt-Pop'],
    short_bio: 'La reine de la mélancolie cinématographique.',
    long_bio: 'Lana Del Rey est une artiste américaine dont la musique est connue pour sa qualité cinématographique et son exploration des thèmes de la romance tragique, du glamour et de la mélancolie.',
    hero_image_url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1920',
    cover_image_url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800',
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
    ],
    similar_artists_ids: ['art15', 'art16'],
    essential_works_ids: [
      { type: 'album', id: 'alb4', label: 'La genèse iconique' },
      { type: 'track', id: 'tr4', label: 'Le hit viral' }
    ],
    evolution_description: 'D\'une pop orchestrale et vintage vers un songwriting folk complexe et dépouillé.',
    pro_consensus: 'Une icône culturelle avec un sens du récit exceptionnel.',
    community_consensus: 'Sa voix et son univers sont un refuge pour toute une génération.',
    pro_score: 95,
    community_score: 90,
    consensus_data: {
      pros: ['Esthétique inégalée', 'Voix captivante', 'Songwriting de haut vol'],
      cons: ['Parois un peu répétitif', 'Image parfois trop construite'],
      dividing_points: ['Son romantisme tragique', 'Sa période de débuts controversée'],
      consensus_summary: 'Lana Del Rey est passée du statut de curiosité web à celui d\'une des plus grandes musiciennes US.',
      recommended_for: ['Amateurs d\'atmosphères', 'Fans de pop alternative', 'Auditeurs sensibles à la mélancolie']
    },
    summary: {
      why_it_pleases: ['Immersion totale', 'Beauté formelle', 'Émotion'],
      friction_points: ['Lenteur rythmique', 'Thèmes récurrents'],
      ideal_for: 'S\'évader dans un univers cinématographique et nostalgique.',
      starting_point: {
        type: 'album',
        id: 'alb2',
        title: 'Born to Die',
        description: 'L\'entrée fracassante dans son univers vintage.'
      }
    }
  },
  {
    id: 'art5',
    name: 'Justice',
    slug: 'justice',
    primary_genres: ['Electronic', 'French Touch'],
    short_bio: 'Le duo qui a marié l\'électro et le heavy metal.',
    long_bio: 'Justice est un duo de musique électronique français composé de Gaspard Augé et Xavier de Rosnay. Ils sont connus pour leur mélange unique de disco, d\'électro et de rock.',
    hero_image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1920',
    cover_image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
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
    ],
    similar_artists_ids: ['art17', 'art18'],
    essential_works_ids: [
      { type: 'album', id: 'alb5', label: 'Le monument électronique' },
      { type: 'track', id: 'tr5', label: 'Le hit disco-electro' }
    ],
    evolution_description: 'D\'une saturation maximale et d\'une violence "disco-metal" vers une pop de stade orchestrale et raffinée.',
    pro_consensus: 'Une science hors pair de la compression et du gimmick sonore.',
    community_consensus: 'Le groupe qui a rendu l\'électro aussi cool que le rock pour toute une génération.',
    pro_score: 96,
    community_score: 94,
    consensus_data: {
      pros: ['Sonnique surpuissante', 'Mélange des genres osé', 'Identité visuelle forte'],
      cons: ['Peut fatiguer par sa grandiloquence', 'Production parfois trop agressive'],
      dividing_points: ['Leur virage rock progressif', 'La simplicité de certains thèmes'],
      consensus_summary: 'Justice fait consensus sur son importance historique pour la French Touch 2.0.',
      recommended_for: ['Fans d\'électro', 'Amateurs d\'énergie brute', 'Ceux qui aiment le mélange rock/dance']
    },
    summary: {
      why_it_pleases: ['Efficacité redoutable', 'Sens du spectacle', 'Innovation sonore'],
      friction_points: ['Saturation auditive', 'Esthétique parfois sombre'],
      ideal_for: 'Les auditeurs cherchant une expérience sonore intense et monumentale.',
      starting_point: {
        type: 'album',
        id: 'alb5',
        title: '† (Cross)',
        description: 'La pierre angulaire de leur discographie.'
      }
    }
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
    cover_url: 'https://images.unsplash.com/photo-1542120503-62f79f8fa19e?auto=format&fit=crop&q=80&w=600',
    genres: ['Pop'],
    critic_score: 82,
    community_score: 88,
    accessibility_score: 95,
    is_entry_album: true,
    short_description: 'Le premier album phénomène qui a tout changé.',
    long_description: 'Brol est un album rafraîchissant qui explore les thèmes de la célébrité, des réseaux sociaux et de l\'amour avec une honnêteté désarmante.',
    track_list: [
      { id: 'tr1', title: 'Balance ton quoi', duration: '3:09', is_entry_track: true, is_community_favorite: true, sentiment: 'Revendicatif' },
      { id: 'tr11', title: 'Tout oublier', duration: '3:22', is_community_favorite: true, sentiment: 'Mélancolique' },
      { id: 'tr12', title: 'La Loi de Murphy', duration: '3:15', sentiment: 'Ironique' },
      { id: 'tr13', title: 'Jalousie', duration: '3:45', sentiment: 'Introspectif' },
      { id: 'tr14', title: 'Ta Reine', duration: '3:33', is_community_favorite: true, sentiment: 'Émotionnel' }
    ],
    coherence_score: 85,
    pro_highlights: ['Efficacité mélodique', 'Fraîcheur des textes'],
    community_highlights: ['Titres accrocheurs', 'Identité belge'],
    pro_vs_community_analysis: 'La critique a salué le vent de fraîcheur tandis que la communauté s\'est reconnue dans les thèmes quotidiens.',
    consensus_data: {
      pros: ['Pas de remplissage', 'Sonorités modernes', 'Facile d\'écoute'],
      cons: ['Parfois un peu répétitif'],
      dividing_points: ['Usage intensif de l\'autotune'],
      consensus_summary: 'Un des meilleurs premiers albums pop de ces dernières années.',
      recommended_for: ['Débutants', 'Amateurs de pop actuelle']
    },
    summary: {
      why_it_pleases: ['Accessibilité totale', 'Modernité', 'Humour'],
      friction_points: ['Production parfois trop clinique'],
      ideal_for: 'Découvrir la nouvelle scène pop francophone.',
      starting_point: { type: 'track', id: 'tr1', title: 'Balance ton quoi', description: 'Le hit incontournable.' }
    }
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
    long_description: 'Un album parfait de bout en bout, mêlant énergie rock et sens de la mélodie pop imparable.',
    track_list: [
      { id: 'tr21', title: 'Lisztomania', duration: '4:01', is_entry_track: true, is_community_favorite: true, sentiment: 'Énergique' },
      { id: 'tr2', title: '1901', duration: '3:13', is_community_favorite: true, sentiment: 'Électrique' },
      { id: 'tr22', title: 'Fences', duration: '3:45', sentiment: 'Vaporeux' },
      { id: 'tr23', title: 'Lasso', duration: '2:48', sentiment: 'Rapide' },
      { id: 'tr24', title: 'Rome', duration: '5:38', sentiment: 'Épique' }
    ],
    coherence_score: 98,
    pro_highlights: ['Précision rythmique', 'Élégance de la production'],
    community_highlights: ['Sonnique unique', 'Énergie constante'],
    pro_vs_community_analysis: 'Considéré comme un sans-faute historique par les deux camps.',
    consensus_data: {
      pros: ['Production cristalline', 'Écriture ciselée', 'Zéro déchet'],
      cons: ['Durée un peu courte'],
      dividing_points: ['Sonorités très 2010'],
      consensus_summary: 'Un pilier de l\'indie rock mondial.',
      recommended_for: ['Amateurs de rock', 'Chercheurs de sons parfaits']
    },
    summary: {
      why_it_pleases: ['Énergie solaire', 'Mastering exemplaire'],
      friction_points: ['Parfois trop policé'],
      ideal_for: 'Une immersion dans ce que le rock français a produit de plus exportable.',
      starting_point: { type: 'track', id: 'tr21', title: 'Lisztomania', description: 'Une ouverture magistrale.' }
    }
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
    description: 'Un hymne féministe porté par une mélodie pop entêtante.',
    community_keywords: ['Féminisme', 'Ironie', 'Pop-Jazz', 'Générationnel'],
    dominant_feeling: 'Revendicatif',
    access_level: 'Immédiat',
    perceived_limits: ['Sur-diffusion radio', 'Structure couplet-refrain prévisible'],
    cross_reviews_excerpts: [
      { user_id: 'u1', user_name: 'Thomas R.', text: 'Une écriture qui tape juste sans être moralisatrice.' },
      { user_id: 'u7', user_name: 'Alexandre K.', text: 'Le beat est simple mais ça reste en tête tout de suite.' }
    ],
    listen_next_ids: [
      { type: 'track', id: 'tr11', title: 'Tout oublier', reason: 'Pour la suite de son univers pop solaire.' },
      { type: 'track', id: 'tr3', title: 'Macarena', reason: 'Pour une autre facette de la mélancolie belge (rap).' }
    ],
    coherence_context: 'C\'est le morceau qui a ouvert les portes du grand public à Angèle, résumant son équilibre entre fond et forme.',
    consensus_data: {
      pros: ['Message clair et fort', 'Production fraîche'],
      cons: ['Répétitif à la longue'],
      dividing_points: ['Sujet de société clivant'],
      consensus_summary: 'Un classique de la pop française moderne.',
      recommended_for: ['Tout le monde', 'Auditeurs engagés']
    },
    summary: {
      why_it_pleases: ['Mélodie entêtante', 'Clarté du propos'],
      friction_points: ['Un peu trop entendu'],
      ideal_for: 'Les auditeurs qui veulent une pop intelligente.',
      starting_point: { type: 'track', id: 'tr1', title: 'Balance ton quoi', description: 'Le titre lui-même.' }
    }
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
    description: 'L\'energy pure du groupe concentrée dans un morceau de 3 minutes.',
    community_keywords: ['Électrique', 'Festival', 'Indie', 'Versailles'],
    dominant_feeling: 'Euphorique',
    access_level: 'Accessible',
    perceived_limits: ['Voix très traitée', 'Manque de "vrai" solo'],
    cross_reviews_excerpts: [
      { user_id: 'u3', user_name: 'Lucas B.', text: 'La production est un modèle de clarté rythmique.' },
      { user_id: 'u2', user_name: 'Justine M.', text: 'L\'essence même de Phoenix en 3 minutes.' }
    ],
    listen_next_ids: [
      { type: 'track', id: 'tr21', title: 'Lisztomania', reason: 'L\'autre pilier de l\'album.' },
      { type: 'artist', id: 'art5', title: 'Justice', reason: 'Pour l\'énergie French Touch commune.' }
    ],
    coherence_context: 'Le morceau qui a défini le son Phoenix pour le monde entier.',
    consensus_data: {
      pros: ['Dynamisme incroyable', 'Synthés iconiques'],
      cons: ['Un peu court'],
      dividing_points: ['Production trop léchée pour les puristes rock'],
      consensus_summary: 'Un des meilleurs morceaux d\'indie rock des années 2000.',
      recommended_for: ['Fans de rock alternatif', 'Fans d\'électro-pop']
    },
    summary: {
      why_it_pleases: ['Énergie brute', 'Gimmicks mémorables'],
      friction_points: ['Structure très pop'],
      ideal_for: 'Se donner un coup de boost matinal.',
      starting_point: { type: 'track', id: 'tr2', title: '1901', description: 'Le titre lui-même.' }
    }
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
    description: 'Une ballade sombre et mélancolique qui a marqué le rap français par sa justesse et sa crudité.',
    community_keywords: ['Mélancolie', 'Culte', 'Lyrisme', 'Rap belge'],
    dominant_feeling: 'Mélancolie Profonde',
    access_level: 'Accessible',
    perceived_limits: ['Paroles crues', 'Beat minimaliste'],
    cross_reviews_excerpts: [
      { user_id: 'u1', user_name: 'Thomas R.', text: 'Une écriture chirurgicale qui ne laisse personne indifférent.' },
      { user_id: 'u4', user_name: 'Sophie L.', text: 'Le sample de guitare est d\'une simplicité géniale.' }
    ],
    listen_next_ids: [
      { type: 'track', id: 'tr13', title: 'Amnésie', reason: 'Pour explorer encore plus loin la noirceur introspective.' }
    ],
    coherence_context: 'Le pivot émotionnel de l\'album Ipséité.',
    consensus_data: {
      pros: ['Sincérité brute', 'Mélodie entêtante'],
      cons: ['Vulgarité gratuite pour certains'],
      dividing_points: ['Le second degré des paroles'],
      consensus_summary: 'Un morceau qui fait l\'unanimité sur sa production mais divise sur son texte.',
      recommended_for: ['Fans de storytelling', 'Auditeurs nocturnes']
    },
    summary: {
      why_it_pleases: ['Vibes mélancoliques', 'Flow parfaitement maîtrisé'],
      friction_points: ['Crudité verbale'],
      ideal_for: 'Les fins de soirées introspectives.',
      starting_point: { type: 'artist', id: 'art3', title: 'Damso', description: 'Le créateur du morceau.' }
    }
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
    user_avatar: 'https://images.unsplash.com/photo-1550684848-86a5d8727436?auto=format&fit=crop&q=80&w=100',
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
    user_avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
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
    user_premium_status: false,
    user_slug: 'justine-m'
  },
  {
    id: 'rev3',
    user_id: 'u3',
    user_display_name: 'Lucas B.',
    user_slug: 'lucas-b',
    user_avatar: 'https://images.unsplash.com/photo-1514525253361-bee8a187499b?auto=format&fit=crop&q=80&w=100',
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
    user_slug: 'sophie-l',
    user_avatar: 'https://images.unsplash.com/photo-1594623125724-504935219d2d?auto=format&fit=crop&q=80&w=100',
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
    user_avatar: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=100',
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
    user_avatar: 'https://images.unsplash.com/photo-1550684848-86a5d8727436?auto=format&fit=crop&q=80&w=100',
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
    user_avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
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
    user_id: 'u7',
    user_display_name: 'Alexandre K.',
    user_avatar: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=100',
    user_expertise: 'Confirmé Rap',
    target_type: 'track',
    target_id: 'tr3',
    target_slug: 'macarena',
    target_name: 'Macarena',
    rating_overall: 5,
    title: 'La mélancolie du succès',
    selections: {
      impression: 'captivant',
      highlights: ['émotion', 'ambiance'],
      feeling: 'sombre',
      accessibility: 'accessible',
      target_audience: ['grand public', 'auditeurs émotionnels'],
      limitations: []
    },
    justifications: {
      why_words: 'Damso signe ici l\'un de ses morceaux les plus touchants et universels.',
      key_element: 'La guitare acoustique qui porte tout le morceau.',
      dividing_factor: 'Un peu trop entendu en radio peut-être.',
      recommendation: 'À écouter un soir de pluie.',
      entry_point: 'Le clip est aussi une œuvre à part entière.'
    },
    quality_score: 94,
    helpful_count: 88,
    published_at: '2024-04-05T11:00:00Z',
    tone: 'positif',
    angle: 'émotion',
    genre: 'Hip-hop-Rap',
    user_premium_status: true
  },
  {
    id: 'rev9',
    user_id: 'u6',
    user_display_name: 'Clara V.',
    user_avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=100',
    user_expertise: 'Qualifiée Folk',
    target_type: 'track',
    target_id: 'tr4',
    target_slug: 'video-games',
    target_name: 'Video Games',
    rating_overall: 4,
    title: 'Une icône est née',
    selections: {
      impression: 'singulier',
      highlights: ['voix', 'ambiance'],
      feeling: 'mélancolique',
      accessibility: 'immédiat',
      target_audience: ['chercheurs de nouveautés', 'auditeurs émotionnels'],
      limitations: ['un peu lent']
    },
    justifications: {
      why_words: 'Ce morceau a redéfini les codes de la pop alternative.',
      key_element: 'La voix grave et vaporeuse de Lana.',
      dividing_factor: 'Son esthétique nostalgique peut sembler forcée.',
      recommendation: 'Indispensable pour comprendre la pop des années 2010.',
      entry_point: 'L\'album Born to Die est un must.'
    },
    quality_score: 89,
    helpful_count: 112,
    published_at: '2024-03-20T16:20:00Z',
    tone: 'nuancé',
    angle: 'écriture',
    genre: 'Pop',
    user_premium_status: true
  },
  {
    id: 'rev10',
    user_id: 'u3',
    user_display_name: 'Lucas B.',
    user_avatar: 'https://images.unsplash.com/photo-1514525253361-bee8a187499b?auto=format&fit=crop&q=80&w=100',
    user_expertise: 'Visiteur',
    target_type: 'artist',
    target_id: 'art5',
    target_slug: 'justice',
    target_name: 'Justice',
    rating_overall: 5,
    title: 'L\'énergie brute de la French Touch',
    selections: {
      impression: 'marquant',
      highlights: ['énergie', 'production'],
      feeling: 'intense',
      accessibility: 'accessible',
      target_audience: ['fans de production', 'chercheurs de nouveautés'],
      limitations: []
    },
    justifications: {
      why_words: 'Justice a réussi à marier l\'électro et le rock comme personne.',
      key_element: 'Leur sens de la grandiloquence et du spectacle.',
      dividing_factor: 'Leur son très compressé peut fatiguer à la longue.',
      recommendation: 'À écouter avant de sortir en club.',
      entry_point: 'L\'album † (Cross) est un monument.'
    },
    quality_score: 97,
    helpful_count: 145,
    published_at: '2024-04-10T08:00:00Z',
    tone: 'positif',
    angle: 'production',
    genre: 'Electronic',
    user_premium_status: true
  },
  {
    id: 'rev11',
    user_id: 'u4',
    user_display_name: 'Sophie L.',
    user_avatar: 'https://images.unsplash.com/photo-1594623125724-504935219d2d?auto=format&fit=crop&q=80&w=100',
    user_expertise: 'Qualifiée Jazz/Soul',
    target_type: 'artist',
    target_id: 'art4',
    target_slug: 'lana-del-rey',
    target_name: 'Lana Del Rey',
    rating_overall: 3,
    title: 'Captivant mais monotone',
    selections: {
      impression: 'singulier',
      highlights: ['ambiance', 'voix'],
      feeling: 'vaporeux',
      accessibility: 'accessible',
      target_audience: ['auditeurs émotionnels'],
      limitations: ['trop répétitif', 'manque de relief']
    },
    justifications: {
      why_words: 'Lana Del Rey a un univers incroyable, mais elle a tendance à se répéter.',
      key_element: 'Son imagerie cinématographique très forte.',
      dividing_factor: 'La lenteur de ses compositions.',
      recommendation: 'Pour une écoute de fond en fin de soirée.',
      entry_point: 'Norman Fucking Rockwell est son album le plus abouti.'
    },
    quality_score: 82,
    helpful_count: 56,
    published_at: '2024-04-12T14:30:00Z',
    tone: 'nuancé',
    angle: 'cohérence',
    genre: 'Pop',
    user_premium_status: true
  },
  {
    id: 'rev12',
    user_id: 'u5',
    user_display_name: 'Marc D.',
    user_avatar: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=100',
    user_expertise: 'Confirmé Synthé',
    target_type: 'track',
    target_id: 'tr5',
    target_slug: 'dance',
    target_name: 'D.A.N.C.E.',
    rating_overall: 5,
    title: 'Un classique indémodable',
    selections: {
      impression: 'efficace',
      highlights: ['mélodie', 'originalité'],
      feeling: 'chaleureux',
      accessibility: 'immédiat',
      target_audience: ['grand public'],
      limitations: []
    },
    justifications: {
      why_words: 'C\'est le morceau qui a fait découvrir Justice au monde entier.',
      key_element: 'Les voix d\'enfants et la ligne de basse funky.',
      dividing_factor: 'Peut sembler trop "pop" pour les fans de leur côté sombre.',
      recommendation: 'Impossible de ne pas danser en l\'écoutant.',
      entry_point: 'À écouter en boucle.'
    },
    quality_score: 95,
    helpful_count: 210,
    published_at: '2024-04-14T10:00:00Z',
    tone: 'positif',
    angle: 'production',
    genre: 'Electronic',
    user_premium_status: false
  },
  {
    id: 'rev13',
    user_id: 'u3',
    user_display_name: 'Lucas B.',
    user_avatar: 'https://images.unsplash.com/photo-1514525253361-bee8a187499b?auto=format&fit=crop&q=80&w=100',
    user_expertise: 'Visiteur',
    target_type: 'album',
    target_id: 'alb1',
    target_slug: 'brol',
    target_name: 'Brol',
    rating_overall: 2,
    title: 'Trop de marketing, pas assez de fond',
    selections: {
      impression: 'surévalué',
      highlights: ['mélodie'],
      feeling: 'frontal',
      accessibility: 'accessible',
      target_audience: ['grand public'],
      limitations: ['manque de relief', 'trop lisse', 'trop répétitif']
    },
    justifications: {
      why_words: 'Je ne comprends pas l\'engouement massif. C\'est de la pop très générique.',
      key_element: 'La production est propre mais sans aucune prise de risque.',
      dividing_factor: 'Le côté "produit marketing" très présent.',
      recommendation: 'Pour passer en fond sonore dans un magasin.',
      entry_point: 'Les singles suffisent amplement.'
    },
    quality_score: 62,
    helpful_count: 45,
    published_at: '2024-04-15T09:00:00Z',
    tone: 'critique',
    angle: 'cohérence',
    genre: 'Pop',
    user_premium_status: true
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
    user_avatar: 'https://images.unsplash.com/photo-1550684848-86a5d8727436?auto=format&fit=crop&q=80&w=100',
    title: 'Les Essentiels de la Pop Française',
    description: 'Une sélection des albums qui ont défini la pop en France ces dernières années, entre efficacité mélodique et textes soignés.',
    editorial_intro: 'La pop n\'est plus ce qu\'elle était. Elle est devenue hybride, introspective et techniquement brillante.',
    why_exists: 'Pour offrir un panorama rapide mais pointu de l\'état de la pop actuelle.',
    target_audience: 'Nouveaux venus curieux de comprendre la prod actuelle.',
    journey_logic: 'Commencez par les voix familières pour glisser vers des structures plus complexes.',
    entry_level: 'Immédiat',
    items: [
      { type: 'album', id: 'alb1', slug: 'brol', title: 'Brol', artist_name: 'Angèle', why: 'L\'album qui a lancé la nouvelle vague pop.', access_level: 'Gratuit', promise: 'Le sommet de l\'écriture pop-jazz.' },
      { type: 'artist', id: 'art1', slug: 'angele', title: 'Angèle', artist_name: 'Angèle', why: 'L\'artiste incontournable du genre.', access_level: 'Premium', promise: 'L\'indé à son sommet.' }
    ],
    like_count: 450,
    category: 'Pop',
    selection_type: 'Débutant',
    tone_mood: 'Vibrant & Frais',
    discovery_promise: 'Comprendre la pop moderne en 5 écoutes.',
    image_url: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-01-15T10:00:00Z',
    is_premium_exclusive: false
  },
  {
    id: 'l2',
    slug: 'portes-entree-rap-introspectif',
    user_id: 'u5',
    user_display_name: 'Marc D.',
    user_avatar: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=100',
    title: '5 Portes d\'entrée dans le Rap Introspectif',
    description: 'Pour ceux qui aiment les textes profonds, les ambiances sombres et les récits de vie sans filtre.',
    editorial_intro: 'Le rap n\'est pas qu\'une question de BPM. C\'est souvent une thérapie à ciel ouvert.',
    why_exists: 'Mettre en lumière la plume plutôt que le "flow" pur.',
    target_audience: 'Fans de poésie moderne et de récits urbains.',
    journey_logic: 'Une descente progressive dans la noirceur et la vérité brute.',
    entry_level: 'Intermédiaire',
    items: [
      { type: 'artist', id: 'art3', slug: 'damso', title: 'Damso', artist_name: 'Damso', why: 'Le maître du clair-obscur belge.', access_level: 'Gratuit', promise: 'Profondeur textuelle et prod chirurgicale.' }
    ],
    like_count: 890,
    category: 'Rap',
    selection_type: 'Expert',
    tone_mood: 'Sombre & Poétique',
    discovery_promise: 'Plongez dans la psyché des meilleurs lyricistes.',
    image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-02-10T14:30:00Z',
    is_premium_exclusive: true
  },
  {
    id: 'l3',
    slug: 'indie-rock-accessible',
    user_id: 'u2',
    user_display_name: 'Justine M.',
    user_avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
    title: 'Indie Rock Accessible pour commencer',
    description: 'Pas besoin d\'être un puriste pour apprécier ces pépites rock aux mélodies immédiates.',
    editorial_intro: 'L\'indie peut être intimidant. Ces listes sont là pour vous prouver le contraire.',
    why_exists: 'Démystifier le rock indépendant "pointu".',
    target_audience: 'Auditeurs lassés de la radio mais cherchant de l\'énergie.',
    journey_logic: 'Focus sur l\'efficacité mélodique immédiate.',
    entry_level: 'Accessible',
    items: [
      { type: 'artist', id: 'art2', slug: 'phoenix', title: 'Phénix', artist_name: 'Phoenix', why: 'L\'énergie pop-rock à la française.', access_level: 'Gratuit', promise: 'L\'album parfait pour l\'été.' },
      { type: 'album', id: 'alb2', slug: 'wolfgang-amadeus-phoenix', title: 'Wolfgang Amadeus Phoenix', artist_name: 'Phoenix', why: 'Un classique indémodable.', access_level: 'Premium', promise: 'L\'indé à son sommet.' }
    ],
    like_count: 560,
    category: 'Indie',
    selection_type: 'Débutant',
    tone_mood: 'Énergique & Solaire',
    discovery_promise: 'Le rock sans la barrière de l\'élitisme.',
    image_url: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-03-05T09:15:00Z',
    is_premium_exclusive: false
  },
  {
    id: 'l4',
    slug: 'albums-parfaits-pour-la-nuit',
    user_id: 'u4',
    user_display_name: 'Sophie L.',
    user_avatar: 'https://images.unsplash.com/photo-1594623125724-504935219d2d?auto=format&fit=crop&q=80&w=100',
    title: 'Albums parfaits pour la nuit',
    description: 'Des productions vaporeuses, des voix feutrées et une mélancolie douce pour vos insomnies.',
    editorial_intro: 'Quand le bruit du monde se tait, ces albums prennent tout leur sens.',
    why_exists: 'Accompagner la solitude nocturne avec goût.',
    target_audience: 'Insomniaques, rêveurs et travailleurs tardifs.',
    journey_logic: 'Une immersion de plus en plus profonde dans le calme.',
    entry_level: 'Accessible',
    items: [
      { type: 'artist', id: 'art4', slug: 'lana-del-rey', title: 'Lana Del Rey', artist_name: 'Lana Del Rey', why: 'La reine du glamour nostalgique.', access_level: 'Gratuit', promise: 'Cinématique et intemporel.' }
    ],
    like_count: 1200,
    category: 'Humeur',
    selection_type: 'Thématique',
    tone_mood: 'Nocturne & Vaporeux',
    discovery_promise: 'La bande-son idéale de vos pensées nocturnes.',
    image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-03-25T22:00:00Z',
    is_premium_exclusive: false
  },
  {
    id: 'l5',
    slug: 'si-vous-aimez-angele',
    user_id: 'u1',
    user_display_name: 'Thomas R.',
    user_avatar: 'https://images.unsplash.com/photo-1550684848-86a5d8727436?auto=format&fit=crop&q=80&w=100',
    title: 'Si vous aimez Angèle, essayez aussi...',
    description: 'Vous avez poncé Brol et Nonante-Cinq ? Voici la suite logique de votre parcours pop.',
    editorial_intro: 'Vour avez dévoré la pop belge, voici le reste du monde.',
    why_exists: 'Élargir l\'horizon des fans d\'Angèle.',
    target_audience: 'Fans de pop francophone moderne.',
    journey_logic: 'Des proximités évidentes vers des découvertes plus audacieuses.',
    entry_level: 'Accessible',
    items: [
      { type: 'artist', id: 'art1', slug: 'angele', title: 'Angèle', artist_name: 'Angèle', why: 'Votre point de départ.', access_level: 'Gratuit', promise: 'Pop pétillante et texte malin.' }
    ],
    like_count: 340,
    category: 'Sélections d\'experts',
    selection_type: 'Thématique',
    tone_mood: 'Curieux & Complémentaire',
    discovery_promise: 'Élargissez votre horizon pop sans perdre le fil.',
    image_url: 'https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-04-01T11:30:00Z',
    is_premium_exclusive: false
  },
  {
    id: 'l6',
    slug: 'french-touch-renaissance',
    user_id: 'u5',
    user_display_name: 'Marc D.',
    user_avatar: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=100',
    title: 'French Touch : La Renaissance',
    description: 'De Justice aux nouveaux héritiers, découvrez comment l\'électro française continue de briller.',
    editorial_intro: 'Le "French Sound" n\'est pas mort, il a juste muté de manière spectaculaire.',
    why_exists: 'Réhabiliter le clubbing à la française.',
    target_audience: 'Nostalgiques de Daft Punk et curieux de la scène club.',
    journey_logic: 'Des classiques vers les futurs anthems.',
    entry_level: 'Intermédiaire',
    items: [
      { type: 'artist', id: 'art5', slug: 'justice', title: 'Justice', artist_name: 'Justice', why: 'Les piliers de l\'électro rock.', access_level: 'Gratuit', promise: 'L\'énergie brute du dancefloor.' }
    ],
    like_count: 720,
    category: 'Electronic',
    selection_type: 'Expert',
    tone_mood: 'Électrique & Dansant',
    discovery_promise: 'L\'énergie des clubs français dans vos oreilles.',
    image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-04-05T16:45:00Z',
    is_premium_exclusive: true
  },
  {
    id: 'l7',
    slug: 'melancolie-estivale',
    user_id: 'u4',
    user_display_name: 'Sophie L.',
    user_avatar: 'https://images.unsplash.com/photo-1594623125724-504935219d2d?auto=format&fit=crop&q=80&w=100',
    title: 'Mélancolie Estivale',
    description: 'Pour ces fins de journées d\'été où le soleil se couche et laisse place à une douce tristesse.',
    editorial_intro: 'Le soleil qui pique et le cœur qui serre.',
    why_exists: 'Capturer l\'essence du "summer blues".',
    target_audience: 'Ceux qui aiment conduire la nuit en été.',
    journey_logic: 'Une lente dérive vers la nostalgie.',
    entry_level: 'Immédiat',
    items: [],
    like_count: 210,
    category: 'Humeur',
    selection_type: 'Humeur',
    tone_mood: 'Chaud & Mélancolique',
    discovery_promise: 'Des morceaux qui sentent le sable chaud et les regrets.',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-04-10T18:20:00Z',
    is_premium_exclusive: false
  },
  {
    id: 'l8',
    slug: 'textes-engages-pop-actuelle',
    user_id: 'u3',
    user_display_name: 'Lucas B.',
    user_avatar: 'https://images.unsplash.com/photo-1514525253361-bee8a187499b?auto=format&fit=crop&q=80&w=100',
    title: 'Textes Engagés dans la Pop Actuelle',
    description: 'Quand la mélodie sert un message fort. Féminisme, écologie, société : la pop prend position.',
    editorial_intro: 'La pop n\'est plus superficielle, elle est politique.',
    why_exists: 'Montrer que le fond et la forme peuvent cohabiter.',
    target_audience: 'Auditeurs en quête de sens.',
    journey_logic: 'Un tour d\'horizon des thématiques sociales actuelles.',
    entry_level: 'Accessible',
    items: [
      { type: 'track', id: 'tr1', slug: 'balance-ton-quoi', title: 'Balance ton quoi', artist_name: 'Angèle', why: 'L\'hymne d\'une génération.', access_level: 'Gratuit', promise: 'Un manifeste pop éclatant.' }
    ],
    like_count: 315,
    category: 'Pop',
    selection_type: 'Thématique',
    tone_mood: 'Frontal & Nécessaire',
    discovery_promise: 'Écoutez ce que les artistes ont vraiment à dire.',
    image_url: 'https://images.unsplash.com/photo-1526218626217-dc65a29bb444?auto=format&fit=crop&q=80&w=800',
    created_at: '2024-04-12T09:00:00Z',
    is_premium_exclusive: false
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
