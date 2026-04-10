import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useNavigate, 
  useParams, 
  useLocation 
} from 'react-router-dom';
import { 
  Home, 
  Search, 
  ListMusic, 
  Users, 
  User as UserIcon, 
  ChevronRight,
  Star,
  Zap,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Award,
  ShieldCheck,
  Lock,
  PlusCircle,
  Filter,
  Share2,
  ThumbsUp,
  AlertCircle,
  Info,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Artist, 
  Album, 
  Track, 
  User, 
  Review, 
  AISummary, 
  SharedList,
  EntityType 
} from './types';
import { 
  mockArtists, 
  mockAlbums, 
  mockTracks, 
  mockReviews, 
  mockAISummaries, 
  mockLists, 
  mockUsers 
} from './mockData';

// --- Components ---

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'premium' | 'success' | 'warning', key?: string | number }) => {
  const styles = {
    default: 'bg-bg-surface-light text-text-muted',
    premium: 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30',
    success: 'bg-success/20 text-success border border-success/30',
    warning: 'bg-warning/20 text-warning border border-warning/30',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[variant]}`}>
      {children}
    </span>
  );
};

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold tracking-tight text-text-main">{children}</h2>
    {subtitle && <p className="text-text-muted text-sm mt-1">{subtitle}</p>}
  </div>
);

const ArtistCard = ({ artist }: { artist: Artist, key?: React.Key }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="glass-card overflow-hidden cursor-pointer group"
  >
    <Link to={`/artiste/${artist.slug}`}>
      <div className="aspect-[16/9] overflow-hidden relative">
        <img src={artist.hero_image_url} alt={artist.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main/80 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <Badge variant="premium">{artist.entry_level}</Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg group-hover:text-accent-primary transition-colors">{artist.name}</h3>
        <p className="text-text-muted text-sm line-clamp-2 mt-1">{artist.short_bio}</p>
        <div className="mt-4 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-1 text-accent-secondary">
            <TrendingUp size={14} />
            <span>{artist.consensus_score}% Consensus</span>
          </div>
          <div className="text-text-muted">{artist.review_count} avis</div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const AlbumCard = ({ album }: { album: Album, key?: React.Key }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="glass-card p-3 flex gap-4 cursor-pointer group"
  >
    <Link to={`/album/${album.slug}`} className="flex gap-4 w-full">
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img src={album.cover_url} alt={album.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="font-bold text-text-main truncate group-hover:text-accent-primary transition-colors">{album.title}</h4>
        <p className="text-text-muted text-xs truncate">{album.artist_name}</p>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center gap-1 text-[10px] font-bold">
            <Star size={12} className="text-warning fill-warning" />
            <span>{album.community_score}/100</span>
          </div>
          {album.is_entry_album && <Badge variant="success">Idéal pour débuter</Badge>}
        </div>
      </div>
    </Link>
  </motion.div>
);

const TrackCard = ({ track }: { track: Track, key?: React.Key }) => (
  <motion.div 
    whileHover={{ scale: 1.01 }}
    className="glass-card p-4 flex items-center justify-between cursor-pointer group"
  >
    <Link to={`/morceau/${track.slug}`} className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
          <Zap size={20} className="text-accent-primary" />
        </div>
        <div>
          <h4 className="font-bold text-sm group-hover:text-accent-primary transition-colors">{track.title}</h4>
          <p className="text-[10px] text-text-muted uppercase font-bold">{track.artist_name} • {track.album_title}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-[10px] font-bold text-accent-secondary">
          <TrendingUp size={12} />
          <span>{track.quick_consensus_score}%</span>
        </div>
        <ChevronRight size={16} className="text-text-muted group-hover:text-text-main transition-colors" />
      </div>
    </Link>
  </motion.div>
);

const ReviewCard = ({ review }: { review: Review, key?: string | number }) => (
  <div className="glass-card p-6 space-y-6 relative overflow-hidden">
    {review.tone && (
      <div className="absolute top-0 right-0 px-4 py-1 bg-accent-primary/10 text-accent-primary text-[10px] font-bold uppercase rounded-bl-xl">
        Ton: {review.tone}
      </div>
    )}
    
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={review.user_avatar} alt={review.user_display_name} className="w-12 h-12 rounded-full border-2 border-accent-primary/20" referrerPolicy="no-referrer" />
        <div>
          <div className="font-bold text-base flex items-center gap-2">
            {review.user_display_name}
            <ShieldCheck size={16} className="text-accent-secondary" />
          </div>
          <div className="flex items-center gap-2 text-[10px] text-text-muted">
            <span className="font-bold text-accent-primary">{review.user_expertise || 'Contributeur'}</span>
            <span>•</span>
            <span>{new Date(review.published_at).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-2xl font-black text-accent-primary leading-none">
          {review.rating_overall}<span className="text-sm text-text-muted">/5</span>
        </div>
        <div className="text-[10px] font-bold text-text-muted uppercase mt-1">Score Qualité: {review.quality_score}%</div>
      </div>
    </div>

    <div className="space-y-2">
      {review.title ? (
        <h3 className="text-xl font-black tracking-tight text-white">{review.title}</h3>
      ) : (
        <h3 className="text-xl font-black tracking-tight text-accent-primary italic">
          {review.keywords && review.keywords.length > 0 
            ? `"${review.keywords.join(' • ')}"` 
            : `"${review.what_i_hear.substring(0, 60)}..."`}
        </h3>
      )}
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <ReviewSection label="Ce que j'entends" content={review.what_i_hear} icon={<Info size={14} />} />
        <ReviewSection label="Ce que ça me fait" content={review.what_it_makes_me_feel} icon={<TrendingUp size={14} />} />
        <ReviewSection label="Pourquoi ça fonctionne" content={review.why_it_works_or_not} icon={<Zap size={14} />} />
      </div>
      <div className="space-y-4">
        <ReviewSection label="Pour qui c'est" content={review.who_its_for} icon={<Users size={14} />} />
        <ReviewSection label="La limite ou réserve" content={review.limit_or_reserve} icon={<AlertCircle size={14} />} color="text-warning" />
      </div>
    </div>

    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-xs font-bold text-text-muted hover:text-accent-primary transition-colors group">
          <ThumbsUp size={16} className="group-hover:scale-110 transition-transform" />
          <span>Utile ({review.helpful_count})</span>
        </button>
        <button className="flex items-center gap-2 text-xs font-bold text-text-muted hover:text-accent-primary transition-colors group">
          <Share2 size={16} className="group-hover:scale-110 transition-transform" />
          <span>Partager</span>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="default">Vérifié</Badge>
      </div>
    </div>
  </div>
);

const ReviewSection = ({ label, content, icon, color = 'text-text-muted' }: { label: string, content: string, icon: React.ReactNode, color?: string }) => (
  <div className="space-y-2">
    <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${color}`}>
      {icon}
      <span>{label}</span>
    </div>
    <p className="text-sm text-text-main leading-relaxed font-medium">{content}</p>
  </div>
);

const AISummaryBlock = ({ summary }: { summary: AISummary }) => (
  <div className="bg-accent-primary/5 border border-accent-primary/20 rounded-2xl p-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-10">
      <Zap size={48} className="text-accent-primary" />
    </div>
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-accent-primary p-1.5 rounded-lg">
        <Zap size={16} className="text-white" />
      </div>
      <span className="font-bold text-sm tracking-tight">RÉSUMÉ IA</span>
      <Badge variant="default">Basé sur {mockReviews.length} avis</Badge>
    </div>
    <p className="text-text-main text-lg leading-relaxed mb-6 font-medium">
      {summary.summary_text}
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h5 className="text-xs font-bold text-success uppercase mb-3 flex items-center gap-2">
          <ThumbsUp size={14} /> Ce qui ressort le plus
        </h5>
        <ul className="space-y-2">
          {summary.key_points_positive.map((p, i) => (
            <li key={i} className="text-sm text-text-muted flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h5 className="text-xs font-bold text-warning uppercase mb-3 flex items-center gap-2">
          <AlertCircle size={14} /> Ce qui divise
        </h5>
        <ul className="space-y-2">
          {summary.key_points_negative.map((p, i) => (
            <li key={i} className="text-sm text-text-muted flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const Gauge = ({ value, label, color = 'accent-primary' }: { value: number, label: string, color?: string }) => (
  <div className="text-center">
    <div className="relative w-20 h-20 mx-auto mb-2">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          className="text-bg-surface-light stroke-current"
          strokeWidth="3"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={`text-${color} stroke-current`}
          strokeWidth="3"
          strokeDasharray={`${value}, 100`}
          strokeLinecap="round"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold">{value}%</span>
      </div>
    </div>
    <span className="text-[10px] font-bold uppercase text-text-muted">{label}</span>
  </div>
);

// --- Main App Component ---

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

function AppLayout() {
  const location = useLocation();
  const [isPremium, setIsPremium] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 bg-bg-surface border-r border-white/5 p-6 fixed h-full">
        <Link to="/" className="flex items-center gap-2 mb-10 px-2 group">
          <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter">ECHO</span>
        </Link>
        
        <div className="space-y-1">
          <NavItem to="/" icon={<Home size={20} />} label="Accueil" active={location.pathname === '/'} />
          <NavItem to="/explorer" icon={<Search size={20} />} label="Explorer" active={location.pathname.startsWith('/explorer')} />
          <NavItem to="/listes" icon={<ListMusic size={20} />} label="Listes" active={location.pathname.startsWith('/listes')} />
          <NavItem to="/communaute" icon={<Users size={20} />} label="Communauté" active={location.pathname.startsWith('/communaute')} />
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
          <NavItem to="/profil" icon={<UserIcon size={20} />} label="Mon Profil" active={location.pathname.startsWith('/profil')} />
          {!isPremium && (
            <Link 
              to="/premium"
              className="mt-4 w-full premium-gradient p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Award size={16} />
              PASSER AU PREMIUM
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow md:ml-64 pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 md:p-10 max-w-6xl mx-auto"
          >
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/explorer" element={<ExploreScreen />} />
              <Route path="/listes" element={<ListsPage />} />
              <Route path="/communaute" element={<CommunityPage />} />
              <Route path="/profil" element={<ProfilePage isPremium={isPremium} setIsPremium={setIsPremium} />} />
              <Route path="/premium" element={<PremiumPage />} />
              <Route path="/artiste/:slug" element={<ArtistPage />} />
              <Route path="/album/:slug" element={<AlbumPage />} />
              <Route path="/morceau/:slug" element={<TrackPage />} />
              <Route path="/avis/nouveau/:type/:id" element={<ReviewFormPage />} />
              <Route path="/liste/:slug" element={<ListPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-surface/90 backdrop-blur-xl border-t border-white/5 px-6 py-3 flex justify-between items-center z-50">
        <MobileNavItem to="/" icon={<Home size={24} />} active={location.pathname === '/'} />
        <MobileNavItem to="/explorer" icon={<Search size={24} />} active={location.pathname.startsWith('/explorer')} />
        <MobileNavItem to="/listes" icon={<ListMusic size={24} />} active={location.pathname.startsWith('/listes')} />
        <MobileNavItem to="/communaute" icon={<Users size={24} />} active={location.pathname.startsWith('/communaute')} />
        <MobileNavItem to="/profil" icon={<UserIcon size={24} />} active={location.pathname.startsWith('/profil')} />
      </nav>
    </div>
  );
}

// --- Sub-components ---

const NavItem = ({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) => (
  <Link 
    to={to}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${active ? 'bg-accent-primary/10 text-accent-primary font-bold' : 'text-text-muted hover:bg-white/5 hover:text-text-main'}`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </Link>
);

const MobileNavItem = ({ to, icon, active }: { to: string, icon: React.ReactNode, active: boolean }) => (
  <Link 
    to={to}
    className={`p-2 rounded-xl transition-all ${active ? 'text-accent-primary' : 'text-text-muted'}`}
  >
    {icon}
  </Link>
);

// --- Screens ---

const HomeScreen = () => (
  <div className="space-y-12">
    <header className="space-y-4">
      <Badge variant="premium">Nouveauté</Badge>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
        Découvrez par où commencer <br />
        <span className="text-accent-primary">avec vos artistes préférés.</span>
      </h1>
      <p className="text-text-muted text-lg max-w-2xl">
        Echo transforme les avis musicaux dispersés en jugements utiles, lisibles et actionnables pour guider votre prochaine écoute.
      </p>
    </header>

    <section>
      <SectionTitle subtitle="Les artistes qui marquent l'actualité musicale">Tendances du moment</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockArtists.map(artist => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <SectionTitle subtitle="Sélectionnés pour leur accessibilité">Portes d'entrée idéales</SectionTitle>
        <div className="space-y-4">
          {mockAlbums.filter(a => a.is_entry_album).map(album => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <SectionTitle subtitle="Les avis les plus constructifs">Dernières critiques</SectionTitle>
        <ReviewCard review={mockReviews[0]} />
      </div>
    </section>

    <section className="bg-bg-surface rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 border border-white/5">
      <div className="flex-grow space-y-4">
        <h2 className="text-3xl font-bold">Prêt à approfondir ?</h2>
        <p className="text-text-muted">Rejoignez la communauté Echo Premium pour accéder aux avis croisés illimités et aux filtres de découverte avancés.</p>
        <div className="flex flex-wrap gap-4 pt-4">
          <Link to="/premium" className="premium-gradient px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">Découvrir Echo Premium</Link>
          <button className="bg-bg-surface-light px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">En savoir plus</button>
        </div>
      </div>
      <div className="w-full md:w-64 aspect-square premium-gradient rounded-3xl rotate-3 flex items-center justify-center shadow-2xl">
        <Award size={80} className="text-white" />
      </div>
    </section>
  </div>
);

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('Tous');

  const filteredArtists = mockArtists.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredAlbums = mockAlbums.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-10">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
        <input 
          type="text" 
          placeholder="Rechercher un artiste, un album ou un morceau..."
          className="w-full bg-bg-surface border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-accent-primary transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {['Tous', 'Artistes', 'Albums', 'Morceaux', 'Pop', 'Rock', 'Hip-hop'].map(filter => (
          <FilterButton 
            key={filter} 
            active={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </FilterButton>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeFilter === 'Tous' || activeFilter === 'Artistes') && filteredArtists.map(artist => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
        {(activeFilter === 'Tous' || activeFilter === 'Albums') && filteredAlbums.map(album => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
};

const FilterButton = ({ children, active, onClick }: { children: React.ReactNode, active?: boolean, onClick?: () => void, key?: React.Key }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${active ? 'bg-accent-primary text-white' : 'bg-bg-surface text-text-muted hover:bg-bg-surface-light'}`}
  >
    {children}
  </button>
);

const ArtistPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const artist = mockArtists.find(a => a.slug === slug);

  if (!artist) return <div className="text-center py-20">Artiste non trouvé.</div>;

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-bold text-sm">
          <ChevronLeft size={20} />
          RETOUR
        </button>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-text-muted uppercase">Dernière mise à jour: Aujourd'hui</span>
          <Badge variant="success">Live Data</Badge>
        </div>
      </div>

      <header className="relative rounded-[2rem] overflow-hidden aspect-[21/9] md:aspect-[4/1] shadow-2xl group">
        <img src={artist.hero_image_url} alt={artist.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">{artist.name}</h1>
              <div className="hidden md:flex flex-col">
                <Badge variant="premium">{artist.entry_level}</Badge>
                <span className="text-[10px] font-bold text-text-muted mt-1 uppercase">Niveau d'entrée</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {artist.primary_genres.map(g => <Badge key={g} variant="default">{g}</Badge>)}
              {artist.top_tags.map(t => <span key={t} className="text-[10px] font-bold text-accent-secondary uppercase tracking-widest">#{t}</span>)}
            </div>
          </div>
          <div className="flex gap-4">
            <button className="premium-gradient px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 shadow-lg hover:shadow-accent-primary/20 transition-all hover:-translate-y-1">
              <PlusCircle size={20} /> SUIVRE L'ARTISTE
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Main Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Start Here Section */}
          <section className="glass-card p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <Zap size={120} className="text-accent-primary" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center shadow-lg">
                <Zap size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">PAR OÙ COMMENCER ?</h2>
                <p className="text-text-muted text-sm font-medium">Le parcours de découverte guidé par Echo</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <p className="text-xl text-text-main leading-relaxed font-medium italic border-l-4 border-accent-primary pl-6">
                "{artist.why_it_matters}"
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockAlbums.filter(a => a.artist_id === artist.id && a.is_entry_album).slice(0, 1).map(album => (
                  <Link key={album.id} to={`/album/${album.slug}`} className="bg-bg-surface-light p-6 rounded-3xl border border-white/5 hover:border-accent-primary/30 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black text-accent-primary uppercase tracking-widest">L'Album Pilier</span>
                      <Award size={20} className="text-accent-primary" />
                    </div>
                    <div className="flex items-center gap-4">
                      <img src={album.cover_url} className="w-20 h-20 rounded-2xl shadow-xl group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                      <div>
                        <div className="font-black text-lg leading-tight">{album.title}</div>
                        <div className="text-sm text-text-muted mt-1">Porte d'entrée universelle</div>
                      </div>
                    </div>
                  </Link>
                ))}
                
                {mockTracks.filter(t => t.artist_id === artist.id && t.is_best_entry_track).slice(0, 1).map(track => (
                  <Link key={track.id} to={`/morceau/${track.slug}`} className="bg-bg-surface-light p-6 rounded-3xl border border-white/5 hover:border-accent-secondary/30 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black text-accent-secondary uppercase tracking-widest">Le Son Signature</span>
                      <TrendingUp size={20} className="text-accent-secondary" />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-accent-secondary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Zap size={32} className="text-accent-secondary" />
                      </div>
                      <div>
                        <div className="font-black text-lg leading-tight">{track.title}</div>
                        <div className="text-sm text-text-muted mt-1">L'essence de son univers</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Cultural Impact */}
          <section className="space-y-6">
            <SectionTitle subtitle="L'héritage et l'influence dans la culture musicale">Impact Culturel</SectionTitle>
            <div className="glass-card p-8 bg-gradient-to-br from-bg-surface to-bg-main">
              <p className="text-lg text-text-main leading-relaxed">{artist.cultural_impact}</p>
            </div>
          </section>

          {/* Discography */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <SectionTitle subtitle="Les œuvres majeures analysées par Echo">Discographie Essentielle</SectionTitle>
              <button className="text-xs font-black text-accent-primary uppercase tracking-widest hover:underline">Voir tout</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockAlbums.filter(a => a.artist_id === artist.id).map(album => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <SectionTitle subtitle="Analyses approfondies de la communauté">Dernières Critiques</SectionTitle>
              <Link to={`/avis/nouveau/artiste/${artist.id}`} className="bg-accent-primary px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity">Rédiger un avis</Link>
            </div>
            <div className="space-y-8">
              {mockReviews.filter(r => r.target_id === artist.id || mockAlbums.some(a => a.id === r.target_id && a.artist_id === artist.id)).slice(0, 3).map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Dashboard Stats */}
        <div className="lg:col-span-4 space-y-8">
          {/* Core Stats */}
          <div className="glass-card p-8 space-y-8 sticky top-10">
            <div className="space-y-6">
              <h3 className="font-black text-sm uppercase tracking-widest text-text-muted">Signaux Critiques</h3>
              <div className="grid grid-cols-2 gap-8">
                <Gauge value={artist.consensus_score} label="Consensus" />
                <Gauge value={artist.polarization_score} label="Polarisation" color="warning" />
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-6">
              <h3 className="font-black text-sm uppercase tracking-widest text-text-muted">Écart Pro vs Communauté</h3>
              <div className="flex items-center gap-4">
                <div className={`text-3xl font-black ${artist.pro_vs_community_gap >= 0 ? 'text-success' : 'text-warning'}`}>
                  {artist.pro_vs_community_gap > 0 ? '+' : ''}{artist.pro_vs_community_gap}%
                </div>
                <p className="text-[10px] text-text-muted leading-tight font-bold uppercase">
                  {artist.pro_vs_community_gap >= 0 
                    ? "Les critiques pros sont plus enthousiastes que la communauté."
                    : "La communauté apprécie davantage que la critique pro."}
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-6">
              <h3 className="font-black text-sm uppercase tracking-widest text-text-muted">Breakdown par Ère</h3>
              <div className="space-y-4">
                {artist.era_breakdown.map(era => (
                  <div key={era.era} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase text-text-muted">
                      <span>{era.era}</span>
                      <span>{era.score}%</span>
                    </div>
                    <div className="h-1.5 bg-bg-surface-light rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${era.score}%` }}
                        className="h-full bg-accent-primary" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-text-muted uppercase">Avis vérifiés</span>
                <span className="font-black text-lg">{artist.review_count}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-text-muted uppercase">Listes Echo</span>
                <span className="font-black text-lg">42</span>
              </div>
            </div>

            <button className="w-full py-4 rounded-2xl bg-bg-surface-light border border-white/5 font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-colors">
              Comparer avec un autre artiste
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AlbumPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const album = mockAlbums.find(a => a.slug === slug);
  const aiSummary = mockAISummaries.find(s => s.target_id === album?.id);
  const albumReviews = mockReviews.filter(r => r.target_type === 'album' && r.target_id === album?.id);
  const albumTracks = mockTracks.filter(t => t.album_id === album?.id);

  if (!album) return <div className="text-center py-20">Album non trouvé.</div>;

  return (
    <div className="space-y-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-bold text-sm">
        <ChevronLeft size={20} />
        RETOUR
      </button>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-80 aspect-square rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
          <img src={album.cover_url} alt={album.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="space-y-6 flex-grow">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge variant="success">Album Essentiel</Badge>
              <span className="text-text-muted text-xs font-bold uppercase">{new Date(album.release_date).getFullYear()}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">{album.title}</h1>
            <Link to={`/artiste/${album.artist_slug}`} className="text-2xl font-bold text-accent-primary hover:underline block">
              {album.artist_name}
            </Link>
          </div>

          <div className="flex flex-wrap gap-8 py-4 border-y border-white/5">
            <div className="text-center">
              <div className="text-3xl font-black text-accent-primary">{album.critic_score}</div>
              <div className="text-[10px] font-bold text-text-muted uppercase">Score Critiques</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-accent-secondary">{album.community_score}</div>
              <div className="text-[10px] font-bold text-text-muted uppercase">Score Communauté</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-success">{album.accessibility_score}%</div>
              <div className="text-[10px] font-bold text-text-muted uppercase">Accessibilité</div>
            </div>
          </div>

          <p className="text-text-muted text-lg leading-relaxed">
            {album.long_description || album.short_description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {aiSummary && (
            <section className="glass-card p-8 space-y-6 border-l-4 border-accent-primary">
              <div className="flex items-center gap-3">
                <Zap size={24} className="text-accent-primary" />
                <h3 className="text-xl font-bold">Synthèse Echo AI</h3>
              </div>
              <p className="text-text-main leading-relaxed italic">"{aiSummary.summary_text}"</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-success uppercase flex items-center gap-2">
                    <CheckCircle2 size={14} /> Points Forts
                  </div>
                  <ul className="space-y-2">
                    {aiSummary.key_points_positive.map((p, i) => (
                      <li key={i} className="text-sm text-text-muted flex items-start gap-2">
                        <span className="text-success mt-1">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="text-xs font-bold text-warning uppercase flex items-center gap-2">
                    <AlertCircle size={14} /> Points de Vigilance
                  </div>
                  <ul className="space-y-2">
                    {aiSummary.key_points_negative.map((p, i) => (
                      <li key={i} className="text-sm text-text-muted flex items-start gap-2">
                        <span className="text-warning mt-1">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <SectionTitle subtitle="La structure de l'œuvre">Tracklist & Analyse</SectionTitle>
              <Badge variant="default">{albumTracks.length} Morceaux</Badge>
            </div>
            <div className="space-y-3">
              {albumTracks.map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <SectionTitle subtitle="Ce qu'en disent les auditeurs qualifiés">Critiques Détaillées</SectionTitle>
              <Link 
                to={`/avis/nouveau/album/${album.id}`}
                className="bg-accent-primary/10 text-accent-primary px-4 py-2 rounded-xl text-sm font-bold hover:bg-accent-primary/20 transition-colors flex items-center gap-2"
              >
                <PlusCircle size={18} /> Écrire un avis
              </Link>
            </div>
            <div className="space-y-6">
              {albumReviews.length > 0 ? (
                albumReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <div className="glass-card p-10 text-center space-y-4">
                  <MessageSquare size={40} className="mx-auto text-text-muted opacity-20" />
                  <p className="text-text-muted">Aucun avis détaillé pour le moment. Soyez le premier à partager votre analyse !</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="glass-card p-6 space-y-6 sticky top-10">
            <h3 className="font-bold text-lg border-b border-white/5 pb-4">Analyse de l'Album</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span className="text-text-muted">Cohérence</span>
                  <span className="text-accent-primary">88%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} className="h-full bg-accent-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span className="text-text-muted">Innovation</span>
                  <span className="text-accent-secondary">72%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '72%' }} className="h-full bg-accent-secondary" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span className="text-text-muted">Production</span>
                  <span className="text-success">94%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '94%' }} className="h-full bg-success" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <h4 className="text-xs font-bold text-text-muted uppercase">Genres</h4>
              <div className="flex flex-wrap gap-2">
                {album.genres.map(genre => (
                  <span key={genre} className="px-3 py-1 bg-white/5 rounded-lg text-xs hover:bg-white/10 transition-colors cursor-default">
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
              <Share2 size={16} /> Partager l'album
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

const ReviewFormPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    title: '',
    keywords: [] as string[],
    what_i_hear: '',
    what_it_makes_me_feel: '',
    why_it_works_or_not: '',
    who_its_for: '',
    limit_or_reserve: '',
    rating: 0
  });

  const availableKeywords = [
    "Froid", "Chaleureux", "Complexe", "Minimaliste", "Épique", 
    "Intime", "Brut", "Produit", "Mélancolique", "Énergique",
    "Expérimental", "Accessible", "Sombre", "Lumineux", "Nostalgique"
  ];

  const targetName = type === 'artist' 
    ? mockArtists.find(a => a.id === id)?.name 
    : mockAlbums.find(a => a.id === id)?.title || mockTracks.find(t => t.id === id)?.title;

  const totalChars = formData.what_i_hear.length + 
                     formData.what_it_makes_me_feel.length + 
                     formData.why_it_works_or_not.length + 
                     formData.who_its_for.length + 
                     formData.limit_or_reserve.length;
  
  const isStep1Valid = formData.rating > 0 && formData.keywords.length > 0;
  const isStep2Valid = totalChars >= 350;

  const toggleKeyword = (kw: string) => {
    if (formData.keywords.includes(kw)) {
      setFormData({ ...formData, keywords: formData.keywords.filter(k => k !== kw) });
    } else if (formData.keywords.length < 3) {
      setFormData({ ...formData, keywords: [...formData.keywords, kw] });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <div className="flex items-center justify-between">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-bold text-sm">
          <ChevronLeft size={20} />
          {step > 1 ? 'RETOUR' : 'ANNULER'}
        </button>
        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <div key={s} className={`w-8 h-1 rounded-full transition-colors ${step >= s ? 'bg-accent-primary' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>

      <header className="space-y-2">
        <Badge variant="premium">Étape {step} sur 3</Badge>
        <h1 className="text-3xl font-bold">
          {step === 1 && "Premières impressions"}
          {step === 2 && "Approfondissement"}
          {step === 3 && "Vérification finale"}
        </h1>
        <p className="text-text-muted">
          {step === 1 && `Comment décririez-vous ${targetName} en quelques mots ?`}
          {step === 2 && "Développez votre analyse pour la communauté."}
          {step === 3 && "Relisez votre avis avant de le rendre public."}
        </p>
      </header>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <div className="glass-card p-8 space-y-6">
              <label className="block text-sm font-bold text-text-muted uppercase">Note globale</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button 
                    key={star} 
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`p-4 rounded-2xl transition-all ${formData.rating >= star ? 'text-warning bg-warning/10' : 'text-text-muted bg-bg-surface'}`}
                  >
                    <Star size={40} fill={formData.rating >= star ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 space-y-6">
              <div className="flex justify-between items-end">
                <label className="block text-sm font-bold text-text-muted uppercase">Mots-clés (1 à 3)</label>
                <span className="text-xs text-text-muted font-bold">{formData.keywords.length}/3</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {availableKeywords.map(kw => (
                  <button
                    key={kw}
                    onClick={() => toggleKeyword(kw)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${formData.keywords.includes(kw) ? 'bg-accent-primary border-accent-primary text-white' : 'bg-bg-surface border-white/5 text-text-muted hover:border-white/20'}`}
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            <button 
              disabled={!isStep1Valid}
              onClick={() => setStep(2)}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${isStep1Valid ? 'premium-gradient text-white shadow-xl hover:scale-[1.02]' : 'bg-white/5 text-text-muted cursor-not-allowed'}`}
            >
              CONTINUER L'ANALYSE
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="glass-card p-8 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-text-muted uppercase">Titre de votre avis (optionnel)</label>
                <input 
                  type="text"
                  maxLength={60}
                  placeholder="Exemple : Une entrée froide mais fascinante"
                  className="w-full bg-bg-surface border border-white/10 rounded-xl p-4 focus:outline-none focus:border-accent-primary transition-colors text-text-main font-bold"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <div className="flex justify-between items-center">
                  <p className="text-[10px] text-text-muted uppercase font-bold italic">Un bon titre résume votre ressenti global.</p>
                  <span className="text-[10px] text-text-muted font-bold">{formData.title.length}/60</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <ReviewField 
                label="Ce que j'entends" 
                placeholder="Décrivez les sons, les instruments, la production..." 
                value={formData.what_i_hear}
                onChange={(v) => setFormData({ ...formData, what_i_hear: v })}
              />
              <ReviewField 
                label="Ce que ça me fait" 
                placeholder="Quelles émotions cet objet musical provoque-t-il ?" 
                value={formData.what_it_makes_me_feel}
                onChange={(v) => setFormData({ ...formData, what_it_makes_me_feel: v })}
              />
              <ReviewField 
                label="Pourquoi ça fonctionne ou pas" 
                placeholder="Analysez la structure, l'originalité, l'exécution..." 
                value={formData.why_it_works_or_not}
                onChange={(v) => setFormData({ ...formData, why_it_works_or_not: v })}
              />
              <ReviewField 
                label="Pour qui c'est" 
                placeholder="À quel type d'auditeur recommanderiez-vous cela ?" 
                value={formData.who_its_for}
                onChange={(v) => setFormData({ ...formData, who_its_for: v })}
              />
              <ReviewField 
                label="La limite ou réserve" 
                placeholder="Qu'est-ce qui pourrait freiner un auditeur ?" 
                value={formData.limit_or_reserve}
                onChange={(v) => setFormData({ ...formData, limit_or_reserve: v })}
              />
            </div>

            <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${totalChars >= 350 ? 'bg-success' : 'bg-warning'}`} />
                  <span className="text-sm font-bold">{totalChars} / 350 caractères minimum</span>
                </div>
                <p className="text-xs text-text-muted">La qualité de l'avis dépend de sa précision.</p>
              </div>
              <button 
                disabled={!isStep2Valid}
                onClick={() => setStep(3)}
                className={`px-10 py-4 rounded-full font-bold text-lg transition-all ${isStep2Valid ? 'premium-gradient text-white shadow-xl hover:scale-105' : 'bg-bg-surface-light text-text-muted cursor-not-allowed'}`}
              >
                VOIR L'APERÇU
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <SectionTitle subtitle="Voici comment votre avis apparaîtra">Aperçu final</SectionTitle>
              <ReviewCard review={{
                id: 'preview',
                user_id: 'me',
                user_display_name: mockUsers[0].display_name,
                user_avatar: mockUsers[0].avatar_url,
                user_expertise: 'Contributeur Qualifié',
                target_type: type as EntityType,
                target_id: id || '',
                rating_overall: formData.rating,
                title: formData.title,
                keywords: formData.keywords,
                what_i_hear: formData.what_i_hear,
                what_it_makes_me_feel: formData.what_it_makes_me_feel,
                why_it_works_or_not: formData.why_it_works_or_not,
                who_its_for: formData.who_its_for,
                limit_or_reserve: formData.limit_or_reserve,
                quality_score: 95,
                helpful_count: 0,
                published_at: new Date().toISOString(),
                tone: 'Analytique'
              }} />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button 
                onClick={() => setStep(2)}
                className="flex-1 py-4 rounded-2xl border border-white/10 font-bold hover:bg-white/5 transition-colors"
              >
                MODIFIER
              </button>
              <button 
                onClick={() => navigate(-1)}
                className="flex-[2] py-4 rounded-2xl premium-gradient text-white font-black text-lg shadow-2xl hover:scale-[1.02] transition-transform"
              >
                PUBLIER MON ANALYSE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ReviewField = ({ label, placeholder, value, onChange }: { label: string, placeholder: string, value: string, onChange: (v: string) => void }) => (
  <div className="space-y-2">
    <label className="block text-sm font-bold text-text-muted uppercase">{label}</label>
    <textarea 
      placeholder={placeholder}
      className="w-full bg-bg-surface border border-white/10 rounded-2xl p-4 min-h-[120px] focus:outline-none focus:border-accent-primary transition-colors text-text-main"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const ProReviewLink = ({ source, score, excerpt }: { source: string, score: string, excerpt: string }) => (
  <div className="p-4 bg-bg-surface-light rounded-2xl space-y-2 border border-white/5 hover:border-accent-secondary/30 transition-colors cursor-pointer group">
    <div className="flex justify-between items-center">
      <span className="font-bold text-sm group-hover:text-accent-secondary transition-colors">{source}</span>
      <span className="text-xs font-mono font-bold text-accent-secondary">{score}</span>
    </div>
    <p className="text-xs text-text-muted line-clamp-2 italic">"{excerpt}"</p>
    <div className="pt-2 flex items-center gap-1 text-[10px] font-bold text-text-muted group-hover:text-text-main">
      LIRE LA CRITIQUE <ArrowRight size={10} />
    </div>
  </div>
);

const ListsPage = () => (
  <div className="space-y-10">
    <SectionTitle subtitle="Découvrez la musique à travers des sélections thématiques">Listes Partagées</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockLists.map(list => (
        <div key={list.id} className="glass-card p-6 space-y-4 group cursor-pointer">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-xl font-bold group-hover:text-accent-primary transition-colors">{list.title}</h3>
              <p className="text-text-muted text-sm">{list.description}</p>
            </div>
            <div className="flex items-center gap-1 text-accent-primary">
              <ThumbsUp size={16} />
              <span className="text-sm font-bold">{list.like_count}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img src={mockUsers[0].avatar_url} className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
            <span className="text-xs text-text-muted">Par <span className="text-text-main font-medium">{list.user_display_name}</span></span>
          </div>
          <div className="pt-4 flex gap-3">
            {list.items.slice(0, 3).map((item, i) => (
              <div key={i} className="w-12 h-12 rounded-lg bg-bg-surface-light border border-white/5" />
            ))}
            <div className="w-12 h-12 rounded-lg bg-bg-surface-light border border-white/5 flex items-center justify-center text-xs font-bold text-text-muted">
              +{list.items.length - 3}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CommunityPage = () => (
  <div className="space-y-10">
    <SectionTitle subtitle="Les contributeurs les plus actifs et qualifiés">Communauté Echo</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockUsers.map(user => (
        <div key={user.id} className="glass-card p-6 flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <img src={user.avatar_url} className="w-20 h-20 rounded-full border-2 border-accent-primary" referrerPolicy="no-referrer" />
            {user.credibility_level === 'qualifie' && (
              <div className="absolute -bottom-1 -right-1 bg-accent-primary p-1 rounded-full border-2 border-bg-surface">
                <ShieldCheck size={16} className="text-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg">{user.display_name}</h3>
            <p className="text-xs text-text-muted">@{user.username}</p>
          </div>
          <p className="text-sm text-text-muted line-clamp-2">{user.bio_short}</p>
          <div className="flex gap-4 pt-2">
            <div className="text-center">
              <div className="font-bold">124</div>
              <div className="text-[10px] text-text-muted uppercase">Avis</div>
            </div>
            <div className="text-center">
              <div className="font-bold">850</div>
              <div className="text-[10px] text-text-muted uppercase">Followers</div>
            </div>
          </div>
          <button className="w-full bg-bg-surface-light py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">Voir le profil</button>
        </div>
      ))}
    </div>
  </div>
);

const ProfilePage = ({ isPremium, setIsPremium }: { isPremium: boolean, setIsPremium: (b: boolean) => void }) => (
  <div className="space-y-10">
    <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8">
      <img src={mockUsers[0].avatar_url} className="w-32 h-32 rounded-full border-4 border-accent-primary" referrerPolicy="no-referrer" />
      <div className="flex-grow text-center md:text-left space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <h1 className="text-3xl font-bold">{mockUsers[0].display_name}</h1>
          <div className="flex justify-center md:justify-start gap-2">
            <Badge variant="premium">Qualifié</Badge>
            {isPremium && <Badge variant="success">Premium</Badge>}
          </div>
        </div>
        <p className="text-text-muted max-w-xl">{mockUsers[0].bio_short}</p>
        <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-accent-primary" />
            <span className="font-bold">124</span> <span className="text-text-muted text-sm">Avis</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp size={18} className="text-accent-primary" />
            <span className="font-bold">1.2k</span> <span className="text-text-muted text-sm">Utiles</span>
          </div>
        </div>
      </div>
      <button className="bg-bg-surface-light px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors">Modifier le profil</button>
    </div>

    {!isPremium && (
      <div className="premium-gradient rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-10">
        <div className="flex-grow space-y-6">
          <h2 className="text-4xl font-bold tracking-tighter">Passez à Echo Premium</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 font-medium">
              <ShieldCheck size={20} /> Lecture illimitée des avis détaillés
            </li>
            <li className="flex items-center gap-3 font-medium">
              <Zap size={20} /> Filtres de découverte avancés
            </li>
            <li className="flex items-center gap-3 font-medium">
              <Users size={20} /> Comparaison avec des profils similaires
            </li>
            <li className="flex items-center gap-3 font-medium">
              <Lock size={20} /> Aucune publicité
            </li>
          </ul>
          <button 
            onClick={() => setIsPremium(true)}
            className="bg-white text-accent-primary px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl"
          >
            S'abonner pour 4,99€ / mois
          </button>
        </div>
        <Award size={120} className="opacity-20 hidden md:block" />
      </div>
    )}

    <section>
      <SectionTitle>Mes derniers avis</SectionTitle>
      <div className="space-y-6">
        <ReviewCard review={mockReviews[0]} />
      </div>
    </section>
  </div>
);

const PremiumPage = () => (
  <div className="space-y-12">
    <header className="text-center space-y-4 max-w-3xl mx-auto">
      <Badge variant="premium">Echo Premium</Badge>
      <h1 className="text-4xl md:text-7xl font-black tracking-tighter">L'expérience culturelle <br /><span className="text-accent-primary">sans compromis.</span></h1>
      <p className="text-text-muted text-xl">Accédez à la profondeur totale de notre base de données et rejoignez l'élite des contributeurs.</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <PremiumFeatureCard 
        icon={<Zap className="text-accent-primary" size={32} />}
        title="Analyses AI Illimitées"
        description="Accédez aux synthèses générées par IA pour chaque artiste, album et morceau de notre catalogue."
      />
      <PremiumFeatureCard 
        icon={<ShieldCheck className="text-accent-secondary" size={32} />}
        title="Statut Certifié"
        description="Vos avis sont mis en avant et votre score de crédibilité augmente plus rapidement."
      />
      <PremiumFeatureCard 
        icon={<Users className="text-success" size={32} />}
        title="Filtres Experts"
        description="Filtrez les avis par niveau d'expertise des contributeurs pour ne lire que le meilleur."
      />
    </div>

    <div className="glass-card p-10 md:p-20 text-center space-y-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 premium-gradient" />
      <div className="space-y-2">
        <div className="text-5xl font-black">4,99€ <span className="text-xl text-text-muted font-bold">/ mois</span></div>
        <p className="text-text-muted">Sans engagement, annulation en un clic.</p>
      </div>
      <button className="premium-gradient px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl">
        COMMENCER L'ESSAI GRATUIT
      </button>
      <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">7 jours d'essai offerts • Puis 4,99€/mois</p>
    </div>
  </div>
);

const PremiumFeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="glass-card p-8 space-y-4 hover:border-accent-primary/30 transition-colors">
    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-text-muted text-sm leading-relaxed">{description}</p>
  </div>
);

const TrackPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const track = mockTracks.find(t => t.slug === slug);
  const album = mockAlbums.find(a => a.id === track?.album_id);
  const trackReviews = mockReviews.filter(r => r.target_type === 'track' && r.target_id === track?.id);

  if (!track) return <div className="text-center py-20">Morceau non trouvé.</div>;

  return (
    <div className="space-y-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-bold text-sm">
        <ChevronLeft size={20} />
        RETOUR
      </button>

      <div className="glass-card p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
        <div className="w-48 h-48 rounded-2xl premium-gradient flex items-center justify-center shadow-2xl flex-shrink-0">
          <Zap size={80} className="text-white" />
        </div>
        <div className="space-y-4 flex-grow text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <Badge variant="premium">Morceau</Badge>
            {track.is_best_entry_track && <Badge variant="success">Meilleur Point d'Entrée</Badge>}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">{track.title}</h1>
          <div className="text-xl md:text-2xl font-bold space-x-2">
            <Link to={`/artiste/${track.artist_slug}`} className="text-accent-primary hover:underline">{track.artist_name}</Link>
            <span className="text-text-muted">•</span>
            <Link to={`/album/${track.album_slug}`} className="text-text-main hover:underline">{track.album_title}</Link>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-6 pt-4">
            <div className="text-center">
              <div className="text-3xl font-black text-accent-secondary">{track.quick_consensus_score}%</div>
              <div className="text-[10px] font-bold text-text-muted uppercase">Consensus Rapide</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-text-muted">
                {Math.floor(track.duration_seconds / 60)}:{(track.duration_seconds % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-[10px] font-bold text-text-muted uppercase">Durée</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <section className="space-y-6">
            <SectionTitle subtitle="Pourquoi ce morceau est important">Analyse du Morceau</SectionTitle>
            <div className="glass-card p-8 text-lg leading-relaxed text-text-muted">
              {track.description || "Ce morceau représente une facette essentielle de l'univers de l'artiste. Son impact se mesure à travers sa capacité à condenser l'esthétique de l'album tout en proposant une expérience immédiate et mémorable."}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <SectionTitle subtitle="L'avis de la communauté Echo">Critiques Flash</SectionTitle>
              <Link 
                to={`/avis/nouveau/track/${track.id}`}
                className="bg-accent-primary/10 text-accent-primary px-4 py-2 rounded-xl text-sm font-bold hover:bg-accent-primary/20 transition-colors flex items-center gap-2"
              >
                <PlusCircle size={18} /> Écrire un avis
              </Link>
            </div>
            <div className="space-y-6">
              {trackReviews.length > 0 ? (
                trackReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <div className="glass-card p-10 text-center space-y-4">
                  <MessageSquare size={40} className="mx-auto text-text-muted opacity-20" />
                  <p className="text-text-muted">Aucune critique flash pour ce morceau. Partagez votre ressenti !</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          {album && (
            <div className="glass-card p-6 space-y-6">
              <h3 className="font-bold text-lg border-b border-white/5 pb-4">Issu de l'album</h3>
              <Link to={`/album/${album.slug}`} className="group block space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img src={album.cover_url} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold group-hover:text-accent-primary transition-colors">{album.title}</h4>
                  <p className="text-xs text-text-muted">{album.artist_name}</p>
                </div>
              </Link>
              <Link to={`/album/${album.slug}`} className="w-full py-3 bg-accent-primary/10 text-accent-primary rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                Voir l'album complet <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

const ListPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const list = mockLists.find(l => l.slug === slug);

  if (!list) return <div className="text-center py-20">Liste non trouvée.</div>;

  return (
    <div className="space-y-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-bold text-sm">
        <ChevronLeft size={20} />
        RETOUR
      </button>

      <header className="space-y-4">
        <Badge variant="default">{list.category}</Badge>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">{list.title}</h1>
        <div className="flex items-center gap-3">
          <img src={mockUsers[0].avatar_url} className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
          <span className="text-sm font-bold">Par {list.user_display_name}</span>
          <span className="text-text-muted">•</span>
          <span className="text-sm text-text-muted">{list.like_count} J'aime</span>
        </div>
        <p className="text-text-muted text-lg max-w-3xl">{list.description}</p>
      </header>

      <div className="space-y-6">
        {list.items.map((item, index) => (
          <div key={item.id} className="glass-card p-6 flex flex-col md:flex-row gap-6 group">
            <div className="text-4xl font-black text-white/10 group-hover:text-accent-primary/20 transition-colors w-12 flex-shrink-0">
              {(index + 1).toString().padStart(2, '0')}
            </div>
            <div className="flex-grow space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-accent-primary transition-colors">{item.title}</h3>
                  <Link 
                    to={item.type === 'artist' ? `/artiste/${item.slug}` : `/album/${item.slug}`}
                    className="text-sm text-text-muted hover:text-accent-secondary transition-colors"
                  >
                    Voir la fiche complète
                  </Link>
                </div>
                <Badge variant={item.type === 'artist' ? 'premium' : 'success'}>{item.type}</Badge>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border-l-2 border-accent-secondary">
                <p className="text-sm text-text-muted italic">"{item.why}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
