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
  CheckCircle2,
  ExternalLink,
  PlayCircle
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
  EntityType,
  ProReview
} from './types';
import { 
  mockArtists, 
  mockAlbums, 
  mockTracks, 
  mockReviews, 
  mockAISummaries, 
  mockLists, 
  mockUsers,
  mockProReviews
} from './mockData';

// --- Reusable UI Components ---

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'premium' | 'success' | 'warning' }) => {
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

const ArtistCard = ({ artist }: { artist: Artist }) => (
  <motion.div whileHover={{ y: -4 }} className="glass-card overflow-hidden cursor-pointer group">
    <Link to={`/artiste/${artist.slug}`}>
      <div className="aspect-[16/9] overflow-hidden relative">
        <img src={artist.hero_image_url} alt={artist.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main/80 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          <Badge variant="premium">{artist.entry_level}</Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg group-hover:text-accent-primary transition-colors">{artist.name}</h3>
        <p className="text-text-muted text-sm line-clamp-1 mt-1">{artist.short_bio}</p>
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

const AlbumCard = ({ album }: { album: Album }) => (
  <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-3 flex gap-4 cursor-pointer group">
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

const TrackCard = ({ track }: { track: Track }) => (
  <motion.div whileHover={{ scale: 1.01 }} className="glass-card p-4 flex items-center justify-between cursor-pointer group">
    <Link to={`/morceau/${track.slug}`} className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
          <PlayCircle size={20} className="text-accent-primary" />
        </div>
        <div>
          <h4 className="font-bold text-sm group-hover:text-accent-primary transition-colors">{track.title}</h4>
          <p className="text-[10px] text-text-muted uppercase font-bold">{track.artist_name}</p>
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

const ReviewCard = ({ review, isReaderPremium = false }: { review: Review, isReaderPremium?: boolean }) => {
  const isLocked = !isReaderPremium && review.quality_score > 90; // Logic: high quality reviews are partially locked for free readers

  return (
    <div className="glass-card p-6 space-y-6 relative overflow-hidden group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={review.user_avatar} alt={review.user_display_name} className="w-12 h-12 rounded-full border-2 border-accent-primary/20" referrerPolicy="no-referrer" />
          <div>
            <div className="font-bold text-base flex items-center gap-2">
              {review.user_display_name}
              <ShieldCheck size={16} className="text-accent-secondary" />
              {review.user_premium_status ? (
                <Badge variant="premium">Membre Payant</Badge>
              ) : (
                <Badge variant="default">Membre Gratuit</Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-text-muted">
              <span className="font-bold text-accent-primary">{review.user_expertise || 'Contributeur'}</span>
              <span>•</span>
              <span>{new Date(review.published_at).toLocaleDateString('fr-FR')}</span>
              <span>•</span>
              <Link to={`/${review.target_type === 'artist' ? 'artiste' : review.target_type === 'album' ? 'album' : 'morceau'}/${review.target_slug}`} className="text-accent-secondary uppercase hover:underline">
                {review.target_type}: {review.target_name}
              </Link>
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
        {review.title && <h3 className="text-xl font-black tracking-tight text-white">{review.title}</h3>}
        <div className="flex flex-wrap gap-2">
          <Badge variant="premium">{review.selections.impression}</Badge>
          <Badge variant="default">{review.selections.feeling}</Badge>
          <Badge variant="success">{review.selections.accessibility}</Badge>
          {review.tone && <Badge variant="warning">{review.tone}</Badge>}
          {review.angle && <Badge variant="default">Angle: {review.angle}</Badge>}
        </div>
      </div>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 relative ${isLocked ? 'max-h-40 overflow-hidden' : ''}`}>
        <div className="space-y-4">
          <ReviewSection label="Pourquoi ces mots ?" content={review.justifications.why_words} icon={<Info size={14} />} />
          <ReviewSection label="Élément marquant" content={review.justifications.key_element} icon={<Zap size={14} />} />
        </div>
        <div className="space-y-4">
          <ReviewSection label="Recommandation" content={review.justifications.recommendation} icon={<Users size={14} />} />
          <ReviewSection label="Par où commencer ?" content={review.justifications.entry_point} icon={<ArrowRight size={14} />} color="text-accent-secondary" />
        </div>

        {isLocked && (
          <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/80 to-transparent flex items-end justify-center pb-4">
            <Link to="/premium" className="premium-gradient px-6 py-2 rounded-xl text-xs font-black flex items-center gap-2 shadow-xl">
              <Lock size={14} /> DÉBLOQUER L'ANALYSE COMPLÈTE
            </Link>
          </div>
        )}
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
          {isLocked ? (
            <Badge variant="warning">Extrait</Badge>
          ) : (
            <Badge variant="success">Avis complet</Badge>
          )}
          <Badge variant="default">Vérifié</Badge>
        </div>
      </div>
    </div>
  );
};

const ReviewSection = ({ label, content, icon, color = 'text-text-muted' }: { label: string, content: string, icon: React.ReactNode, color?: string }) => (
  <div className="space-y-2">
    <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${color}`}>
      {icon}
      <span>{label}</span>
    </div>
    <p className="text-sm text-text-main leading-relaxed font-medium">{content}</p>
  </div>
);

const Gauge = ({ value, label, color = 'accent-primary' }: { value: number, label: string, color?: string }) => (
  <div className="text-center">
    <div className="relative w-20 h-20 mx-auto mb-2">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path className="text-bg-surface-light stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        <path className={`text-${color} stroke-current`} strokeWidth="3" strokeDasharray={`${value}, 100`} strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold">{value}%</span>
      </div>
    </div>
    <span className="text-[10px] font-bold uppercase text-text-muted">{label}</span>
  </div>
);

// --- Layout Components ---

const NavItem = ({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) => (
  <Link to={to} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${active ? 'bg-accent-primary/10 text-accent-primary font-bold' : 'text-text-muted hover:bg-white/5 hover:text-text-main'}`}>
    {icon}
    <span className="text-sm">{label}</span>
  </Link>
);

const MobileNavItem = ({ to, icon, active }: { to: string, icon: React.ReactNode, active: boolean }) => (
  <Link to={to} className={`p-2 rounded-xl transition-all ${active ? 'text-accent-primary' : 'text-text-muted'}`}>
    {icon}
  </Link>
);

function AppLayout() {
  const location = useLocation();
  const [isPremium, setIsPremium] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-bg-main text-text-main">
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 bg-bg-surface border-r border-white/5 p-6 fixed h-full z-40">
        <Link to="/" className="flex items-center gap-2 mb-10 px-2 group">
          <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter">ECHO</span>
        </Link>
        <div className="space-y-1">
          <NavItem to="/" icon={<Home size={20} />} label="Accueil" active={location.pathname === '/'} />
          <NavItem to="/explorer" icon={<Search size={20} />} label="Explorer" active={location.pathname === '/explorer'} />
          <NavItem to="/avis" icon={<MessageSquare size={20} />} label="Avis" active={location.pathname === '/avis'} />
          <NavItem to="/listes" icon={<ListMusic size={20} />} label="Listes" active={location.pathname === '/listes'} />
          <NavItem to="/communaute" icon={<Users size={20} />} label="Communauté" active={location.pathname === '/communaute'} />
          <NavItem to="/profil" icon={<UserIcon size={20} />} label="Profil" active={location.pathname === '/profil'} />
        </div>
        <div className="mt-auto pt-6 border-t border-white/5">
          {!isPremium && (
            <Link to="/premium" className="w-full premium-gradient p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-accent-primary/20">
              <Award size={16} /> PASSER AU PREMIUM
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content */}
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
              <Route path="/avis" element={<ReviewsPage isPremium={isPremium} />} />
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

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-surface/90 backdrop-blur-xl border-t border-white/5 px-6 py-3 flex justify-between items-center z-50">
        <MobileNavItem to="/" icon={<Home size={24} />} active={location.pathname === '/'} />
        <MobileNavItem to="/explorer" icon={<Search size={24} />} active={location.pathname === '/explorer'} />
        <MobileNavItem to="/avis" icon={<MessageSquare size={24} />} active={location.pathname === '/avis'} />
        <MobileNavItem to="/listes" icon={<ListMusic size={24} />} active={location.pathname === '/listes'} />
        <MobileNavItem to="/communaute" icon={<Users size={24} />} active={location.pathname === '/communaute'} />
        <MobileNavItem to="/profil" icon={<UserIcon size={24} />} active={location.pathname === '/profil'} />
      </nav>
    </div>
  );
}

// --- Screens ---

const ReviewsPage = ({ isPremium }: { isPremium: boolean }) => {
  const [search, setSearch] = React.useState('');
  const [filters, setFilters] = React.useState({
    type: 'all',
    genre: 'all',
    tone: 'all',
    angle: 'all',
    status: 'all',
    account: 'all',
    sort: 'recent'
  });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = review.target_name.toLowerCase().includes(search.toLowerCase()) || 
                         review.title?.toLowerCase().includes(search.toLowerCase()) ||
                         review.user_display_name.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = filters.type === 'all' || review.target_type === filters.type;
    const matchesGenre = filters.genre === 'all' || review.genre === filters.genre;
    const matchesTone = filters.tone === 'all' || review.tone === filters.tone;
    const matchesAngle = filters.angle === 'all' || review.angle === filters.angle;
    const matchesStatus = filters.status === 'all' || 
                         (filters.status === 'qualifie' && review.user_expertise?.includes('Qualifié')) ||
                         (filters.status === 'confirme' && review.user_expertise?.includes('Confirmé'));
    const matchesAccount = filters.account === 'all' || 
                          (filters.account === 'premium' && review.user_premium_status) ||
                          (filters.account === 'free' && !review.user_premium_status);

    return matchesSearch && matchesType && matchesGenre && matchesTone && matchesAngle && matchesStatus && matchesAccount;
  }).sort((a, b) => {
    if (filters.sort === 'recent') return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    if (filters.sort === 'useful') return b.helpful_count - a.helpful_count;
    if (filters.sort === 'loved') return b.quality_score - a.quality_score;
    return 0;
  });

  return (
    <div className="space-y-10">
      <header className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Avis de la communauté</h1>
          <p className="text-text-muted text-xl font-medium">Des avis structurés, utiles et nuancés pour mieux découvrir la musique</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher un avis, un artiste, un contributeur..." 
            className="w-full bg-bg-surface border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-lg focus:outline-none focus:border-accent-primary transition-all shadow-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="glass-card p-6 space-y-6">
          <div className="flex flex-wrap gap-6">
            <FilterGroup label="Type" value={filters.type} options={[{id: 'all', label: 'Tout'}, {id: 'artist', label: 'Artiste'}, {id: 'album', label: 'Album'}, {id: 'track', label: 'Morceau'}]} onChange={(v) => setFilters({...filters, type: v})} />
            <FilterGroup label="Genre" value={filters.genre} options={[{id: 'all', label: 'Tout'}, {id: 'Pop', label: 'Pop'}, {id: 'Rock-Indie', label: 'Rock-Indie'}, {id: 'Hip-hop-Rap', label: 'Hip-hop-Rap'}]} onChange={(v) => setFilters({...filters, genre: v})} />
            <FilterGroup label="Tonalité" value={filters.tone} options={[{id: 'all', label: 'Tout'}, {id: 'positif', label: 'Positif'}, {id: 'nuancé', label: 'Nuancé'}, {id: 'critique', label: 'Critique'}]} onChange={(v) => setFilters({...filters, tone: v})} />
            <FilterGroup label="Angle" value={filters.angle} options={[{id: 'all', label: 'Tout'}, {id: 'production', label: 'Production'}, {id: 'écriture', label: 'Écriture'}, {id: 'émotion', label: 'Émotion'}, {id: 'accessibilité', label: 'Accessibilité'}, {id: 'cohérence', label: 'Cohérence'}]} onChange={(v) => setFilters({...filters, angle: v})} />
            <FilterGroup label="Contributeur" value={filters.status} options={[{id: 'all', label: 'Tout'}, {id: 'confirme', label: 'Confirmé'}, {id: 'qualifie', label: 'Qualifié'}]} onChange={(v) => setFilters({...filters, status: v})} />
            <FilterGroup label="Compte Auteur" value={filters.account} options={[{id: 'all', label: 'Tout'}, {id: 'free', label: 'Gratuit'}, {id: 'premium', label: 'Payant'}]} onChange={(v) => setFilters({...filters, account: v})} />
            <FilterGroup label="Trier par" value={filters.sort} options={[{id: 'recent', label: 'Plus récents'}, {id: 'useful', label: 'Plus utiles'}, {id: 'loved', label: 'Les plus aimés'}]} onChange={(v) => setFilters({...filters, sort: v})} />
          </div>
        </div>
      </header>

      <div className="bg-accent-primary/5 border border-accent-primary/20 rounded-2xl p-6 flex items-start gap-4">
        <Info className="text-accent-primary flex-shrink-0 mt-1" size={20} />
        <p className="text-sm text-text-muted leading-relaxed">
          Tous les membres peuvent publier des avis. L’abonnement payant débloque davantage de lecture, de comparaison et de personnalisation, mais ne donne pas automatiquement plus de valeur à un avis.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-text-muted font-bold uppercase tracking-widest text-xs">Chargement des avis...</p>
        </div>
      ) : filteredReviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-8">
          {filteredReviews.map(review => (
            <div key={review.id}>
              <ReviewCard review={review} isReaderPremium={isPremium} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4 glass-card">
          <AlertCircle size={48} className="mx-auto text-text-muted" />
          <h3 className="text-xl font-bold">Aucun avis trouvé</h3>
          <p className="text-text-muted">Essayez de modifier vos filtres ou votre recherche.</p>
          <button onClick={() => {setSearch(''); setFilters({type: 'all', genre: 'all', tone: 'all', angle: 'all', status: 'all', account: 'all', sort: 'recent'})}} className="text-accent-primary font-bold hover:underline">Réinitialiser les filtres</button>
        </div>
      )}
    </div>
  );
};

const FilterGroup = ({ label, value, options, onChange }: { label: string, value: string, options: {id: string, label: string}[], onChange: (v: string) => void }) => (
  <div className="space-y-2">
    <label className="block text-[10px] font-black text-text-muted uppercase tracking-widest">{label}</label>
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="bg-bg-surface-light border border-white/5 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-accent-primary transition-all cursor-pointer"
    >
      {options.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
    </select>
  </div>
);
const HomeScreen = () => (
  <div className="space-y-16">
    <header className="space-y-6 pt-10">
      <Badge variant="premium">Plateforme Culturelle</Badge>
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
        DÉCOUVREZ PAR OÙ <br />
        <span className="text-accent-primary">COMMENCER.</span>
      </h1>
      <p className="text-text-muted text-xl max-w-2xl font-medium">
        Echo centralise les avis structurés et les analyses IA pour vous guider dans l'univers d'un artiste, d'un album ou d'un morceau.
      </p>
      <div className="flex flex-wrap gap-4 pt-4">
        <Link to="/explorer" className="premium-gradient px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform">Explorer les artistes</Link>
        <Link to="/communaute" className="bg-bg-surface-light px-8 py-4 rounded-2xl font-black text-lg hover:bg-white/10 transition-colors">Lire les avis utiles</Link>
      </div>
    </header>

    <section>
      <SectionTitle subtitle="Les artistes qui redéfinissent la scène actuelle">Tendances du moment</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockArtists.map(artist => <div key={artist.id}><ArtistCard artist={artist} /></div>)}
      </div>
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <SectionTitle subtitle="Sélectionnés pour leur accessibilité immédiate">Par où commencer ?</SectionTitle>
        <div className="space-y-4">
          {mockAlbums.filter(a => a.is_entry_album).map(album => <div key={album.id}><AlbumCard album={album} /></div>)}
        </div>
      </div>
      <div className="space-y-8">
        <SectionTitle subtitle="Les analyses les plus pertinentes de la semaine">Avis à la une</SectionTitle>
        <ReviewCard review={mockReviews[0]} />
      </div>
    </section>

    <section>
      <SectionTitle subtitle="Des sélections thématiques par nos experts">Listes partagées</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockLists.map(list => (
          <Link key={list.id} to={`/liste/${list.slug}`} className="glass-card p-6 flex flex-col justify-between hover:border-accent-primary/30 transition-colors group">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <Badge variant="premium">{list.category}</Badge>
                <div className="flex items-center gap-1 text-text-muted text-xs font-bold">
                  <ThumbsUp size={14} /> {list.like_count}
                </div>
              </div>
              <h3 className="text-xl font-black group-hover:text-accent-primary transition-colors">{list.title}</h3>
              <p className="text-text-muted text-sm line-clamp-2">{list.description}</p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-[10px] font-bold text-text-muted uppercase">Par {list.user_display_name}</span>
              <ArrowRight size={18} className="text-accent-primary group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  </div>
);

const ExploreScreen = () => {
  const [search, setSearch] = React.useState('');
  const filteredArtists = mockArtists.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));
  const filteredAlbums = mockAlbums.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-10">
      <div className="relative pt-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted mt-3" size={24} />
        <input 
          type="text" 
          placeholder="Rechercher un artiste, un album..." 
          className="w-full bg-bg-surface border border-white/10 rounded-3xl py-6 pl-14 pr-6 text-xl focus:outline-none focus:border-accent-primary transition-all shadow-2xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtists.map(a => <div key={a.id}><ArtistCard artist={a} /></div>)}
        {filteredAlbums.map(a => <div key={a.id}><AlbumCard album={a} /></div>)}
      </div>
    </div>
  );
};

const ArtistPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const artist = mockArtists.find(a => a.slug === slug);
  const aiSummary = mockAISummaries.find(s => s.target_id === artist?.id);

  if (!artist) return <div className="text-center py-20">Artiste non trouvé.</div>;

  return (
    <div className="space-y-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-bold text-sm">
        <ChevronLeft size={20} /> RETOUR
      </button>

      <header className="relative rounded-[3rem] overflow-hidden aspect-[21/9] md:aspect-[4/1] shadow-2xl group">
        <img src={artist.hero_image_url} alt={artist.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">{artist.name}</h1>
              <Badge variant="premium">{artist.entry_level}</Badge>
            </div>
            <div className="flex flex-wrap gap-3">
              {artist.primary_genres.map(g => <span key={g}><Badge>{g}</Badge></span>)}
              {artist.top_tags.map(t => <span key={t} className="text-[10px] font-black text-accent-secondary uppercase tracking-widest">#{t}</span>)}
            </div>
          </div>
          <button className="premium-gradient px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 shadow-lg hover:scale-105 transition-transform">
            <PlusCircle size={20} /> SUIVRE L'ARTISTE
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <section className="glass-card p-10 relative overflow-hidden border-l-4 border-accent-primary">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center shadow-lg">
                <Zap size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-black tracking-tight uppercase">Par où commencer ?</h2>
            </div>
            <p className="text-xl text-text-main leading-relaxed font-medium italic mb-8">"{artist.why_it_matters}"</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockAlbums.filter(a => a.artist_id === artist.id && a.is_entry_album).map(album => (
                <Link key={album.id} to={`/album/${album.slug}`} className="bg-bg-surface-light p-6 rounded-3xl border border-white/5 hover:border-accent-primary/30 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black text-accent-primary uppercase tracking-widest">L'Album Pilier</span>
                    <Award size={20} className="text-accent-primary" />
                  </div>
                  <div className="flex items-center gap-4">
                    <img src={album.cover_url} className="w-20 h-20 rounded-2xl shadow-xl" referrerPolicy="no-referrer" />
                    <div>
                      <div className="font-black text-lg leading-tight">{album.title}</div>
                      <div className="text-sm text-text-muted mt-1">Porte d'entrée universelle</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {aiSummary && (
            <section className="bg-accent-primary/5 border border-accent-primary/20 rounded-[2.5rem] p-10 space-y-8">
              <div className="flex items-center gap-3">
                <Zap size={24} className="text-accent-primary" />
                <h3 className="text-xl font-black uppercase tracking-tight">Synthèse Echo AI</h3>
              </div>
              <p className="text-2xl font-medium leading-tight text-text-main">"{aiSummary.summary_text}"</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-success uppercase flex items-center gap-2"><ThumbsUp size={14} /> Points Forts</h4>
                  <ul className="space-y-3">
                    {aiSummary.key_points_positive.map((p, i) => <li key={i} className="text-sm text-text-muted flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />{p}</li>)}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-warning uppercase flex items-center gap-2"><AlertCircle size={14} /> Points de Vigilance</h4>
                  <ul className="space-y-3">
                    {aiSummary.key_points_negative.map((p, i) => <li key={i} className="text-sm text-text-muted flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />{p}</li>)}
                  </ul>
                </div>
              </div>
            </section>
          )}

          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <SectionTitle subtitle="Analyses approfondies de la communauté">Dernières Critiques</SectionTitle>
              <Link to={`/avis/nouveau/artiste/${artist.id}`} className="bg-accent-primary px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity">Rédiger un avis</Link>
            </div>
            <div className="space-y-8">
              {mockReviews.filter(r => r.target_id === artist.id).map(review => <div key={review.id}><ReviewCard review={review} /></div>)}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
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
                <div className={`text-4xl font-black ${artist.pro_vs_community_gap >= 0 ? 'text-success' : 'text-warning'}`}>
                  {artist.pro_vs_community_gap > 0 ? '+' : ''}{artist.pro_vs_community_gap}%
                </div>
                <p className="text-[10px] text-text-muted leading-tight font-bold uppercase">
                  {artist.pro_vs_community_gap >= 0 ? "Les critiques pros sont plus enthousiastes." : "La communauté apprécie davantage."}
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
                      <motion.div initial={{ width: 0 }} animate={{ width: `${era.score}%` }} className="h-full bg-accent-primary" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
  const albumReviews = mockReviews.filter(r => r.target_type === 'album' && r.target_id === album?.id);

  if (!album) return <div className="text-center py-20">Album non trouvé.</div>;

  return (
    <div className="space-y-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-bold text-sm">
        <ChevronLeft size={20} /> RETOUR
      </button>
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="w-full md:w-96 aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl flex-shrink-0">
          <img src={album.cover_url} alt={album.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="space-y-8 flex-grow">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="success">Album Essentiel</Badge>
              <span className="text-text-muted text-sm font-bold uppercase tracking-widest">{new Date(album.release_date).getFullYear()}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">{album.title}</h1>
            <Link to={`/artiste/${album.artist_slug}`} className="text-3xl font-bold text-accent-primary hover:underline block">{album.artist_name}</Link>
          </div>
          <div className="flex flex-wrap gap-12 py-8 border-y border-white/5">
            <div className="text-center">
              <div className="text-4xl font-black text-accent-primary">{album.critic_score}</div>
              <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Score Critiques</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-accent-secondary">{album.community_score}</div>
              <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Score Communauté</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-success">{album.accessibility_score}%</div>
              <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Accessibilité</div>
            </div>
          </div>
          <p className="text-text-muted text-xl leading-relaxed font-medium">{album.long_description || album.short_description}</p>
        </div>
      </div>
      <section className="space-y-8">
        <SectionTitle subtitle="Analyses détaillées de l'album">Critiques de la communauté</SectionTitle>
        <div className="space-y-8">
          {albumReviews.map(review => <div key={review.id}><ReviewCard review={review} /></div>)}
        </div>
      </section>
    </div>
  );
};

const TrackPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const track = mockTracks.find(t => t.slug === slug);

  if (!track) return <div className="text-center py-20">Morceau non trouvé.</div>;

  return (
    <div className="space-y-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-bold text-sm">
        <ChevronLeft size={20} /> RETOUR
      </button>
      <div className="glass-card p-12 flex flex-col md:flex-row items-center gap-12">
        <div className="w-24 h-24 rounded-3xl premium-gradient flex items-center justify-center shadow-2xl">
          <PlayCircle size={48} className="text-white" />
        </div>
        <div className="flex-grow text-center md:text-left space-y-2">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">{track.title}</h1>
          <p className="text-2xl font-bold text-text-muted">{track.artist_name} — {track.album_title}</p>
        </div>
        <div className="text-center">
          <div className="text-5xl font-black text-accent-secondary">{track.quick_consensus_score}%</div>
          <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Consensus Rapide</div>
        </div>
      </div>
      <section className="max-w-3xl mx-auto space-y-8">
        <SectionTitle>À propos de ce morceau</SectionTitle>
        <p className="text-xl text-text-muted leading-relaxed">{track.description}</p>
      </section>
    </div>
  );
};

const ReviewFormPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    rating: 0,
    title: '',
    selections: {
      impression: '',
      highlights: [] as string[],
      feeling: '',
      accessibility: '',
      target_audience: [] as string[],
      limitations: [] as string[]
    },
    justifications: {
      why_words: '',
      key_element: '',
      dividing_factor: '',
      recommendation: '',
      entry_point: ''
    }
  });

  const options = {
    impression: ['marquant', 'accessible', 'exigeant', 'captivant', 'inégal', 'surévalué', 'singulier', 'efficace', 'ambitieux', 'répétitif', 'maîtrisé', 'polarisant'],
    highlights: ['production', 'voix', 'écriture', 'flow', 'mélodie', 'émotion', 'énergie', 'cohérence', 'originalité', 'ambiance', 'structure', 'instrumentation'],
    feeling: ['intense', 'mélancolique', 'euphorique', 'introspectif', 'brut', 'aérien', 'sombre', 'chaleureux', 'nerveux', 'immersif', 'frontal', 'apaisant'],
    accessibility: ['immédiat', 'accessible', 'intermédiaire', 'exigeant', 'réservé aux amateurs'],
    target_audience: ['curieux', 'grand public', 'amateurs du genre', 'fans de production', 'amateurs de textes', 'auditeurs émotionnels', 'chercheurs de nouveautés', 'fans d\'univers marqués'],
    limitations: ['trop long', 'trop répétitif', 'trop lisse', 'trop dense', 'trop froid', 'trop technique', 'manque de relief', 'manque d\'originalité', 'difficile d\'accès', 'inégal', 'peu mémorable']
  };

  const isStep1Valid = formData.rating > 0 && formData.selections.impression && formData.selections.highlights.length > 0 && formData.selections.feeling && formData.selections.accessibility && formData.selections.target_audience.length > 0;
  const isStep2Valid = formData.justifications.why_words.length > 20 && formData.justifications.key_element.length > 20;

  const toggleMulti = (category: 'highlights' | 'target_audience' | 'limitations', val: string) => {
    const current = formData.selections[category];
    if (current.includes(val)) {
      setFormData({ ...formData, selections: { ...formData.selections, [category]: current.filter(v => v !== val) } });
    } else {
      setFormData({ ...formData, selections: { ...formData.selections, [category]: [...current, val] } });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10">
      <div className="flex items-center justify-between">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-text-main font-bold uppercase text-xs tracking-widest">
          <ChevronLeft size={20} /> {step > 1 ? 'Retour' : 'Annuler'}
        </button>
        <div className="flex gap-4">
          {[1, 2, 3].map(s => (
            <div key={s} className={`w-12 h-1.5 rounded-full transition-all ${step >= s ? 'bg-accent-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>

      <header className="space-y-4">
        <Badge variant="premium">Étape {step} sur 3</Badge>
        <h1 className="text-4xl font-black tracking-tighter">
          {step === 1 && "Vos premières impressions"}
          {step === 2 && "Justifiez votre analyse"}
          {step === 3 && "Vérification et publication"}
        </h1>
        <p className="text-text-muted text-lg">
          {step === 1 && "Construisez votre avis en sélectionnant les mots les plus justes."}
          {step === 2 && "Développez vos arguments pour aider la communauté."}
          {step === 3 && "Relisez votre avis avant de le rendre public."}
        </p>
      </header>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
            <div className="glass-card p-10 space-y-8">
              <label className="block text-xs font-black text-text-muted uppercase tracking-widest">Note globale</label>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} onClick={() => setFormData({ ...formData, rating: star })} className={`p-5 rounded-2xl transition-all ${formData.rating >= star ? 'text-warning bg-warning/10 shadow-lg' : 'text-text-muted bg-bg-surface-light hover:bg-white/5'}`}>
                    <Star size={48} fill={formData.rating >= star ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SelectionGroup label="Impression globale" options={options.impression} selected={formData.selections.impression} onSelect={(v) => setFormData({ ...formData, selections: { ...formData.selections, impression: v } })} />
              <SelectionGroup label="Ce qui ressort le plus" options={options.highlights} selected={formData.selections.highlights} onSelect={(v) => toggleMulti('highlights', v)} multi />
              <SelectionGroup label="Ressenti dominant" options={options.feeling} selected={formData.selections.feeling} onSelect={(v) => setFormData({ ...formData, selections: { ...formData.selections, feeling: v } })} />
              <SelectionGroup label="Niveau d'accès" options={options.accessibility} selected={formData.selections.accessibility} onSelect={(v) => setFormData({ ...formData, selections: { ...formData.selections, accessibility: v } })} />
              <SelectionGroup label="Pour qui c'est" options={options.target_audience} selected={formData.selections.target_audience} onSelect={(v) => toggleMulti('target_audience', v)} multi />
              <SelectionGroup label="Limites perçues" options={options.limitations} selected={formData.selections.limitations} onSelect={(v) => toggleMulti('limitations', v)} multi />
            </div>

            <button disabled={!isStep1Valid} onClick={() => setStep(2)} className={`w-full py-6 rounded-[2rem] font-black text-xl transition-all ${isStep1Valid ? 'premium-gradient text-white shadow-2xl hover:scale-[1.02]' : 'bg-white/5 text-text-muted cursor-not-allowed'}`}>
              CONTINUER L'ANALYSE
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
            <div className="glass-card p-10 space-y-8">
              <div className="space-y-4">
                <label className="block text-xs font-black text-text-muted uppercase tracking-widest">Titre de votre avis (optionnel)</label>
                <input 
                  type="text" 
                  maxLength={60}
                  placeholder="Exemple : Une entrée froide mais fascinante"
                  className="w-full bg-bg-surface-light border border-white/10 rounded-2xl p-5 text-xl font-bold focus:outline-none focus:border-accent-primary transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-8">
              <TextArea label="Pourquoi avez-vous choisi ces mots ?" value={formData.justifications.why_words} onChange={(v) => setFormData({ ...formData, justifications: { ...formData.justifications, why_words: v } })} />
              <TextArea label="Quel élément vous a le plus marqué ?" value={formData.justifications.key_element} onChange={(v) => setFormData({ ...formData, justifications: { ...formData.justifications, key_element: v } })} />
              <TextArea label="Qu'est-ce qui peut freiner ou diviser ?" value={formData.justifications.dividing_factor} onChange={(v) => setFormData({ ...formData, justifications: { ...formData.justifications, dividing_factor: v } })} />
              <TextArea label="À qui le recommanderiez-vous ?" value={formData.justifications.recommendation} onChange={(v) => setFormData({ ...formData, justifications: { ...formData.justifications, recommendation: v } })} />
              <TextArea label="Par quoi faudrait-il commencer ?" value={formData.justifications.entry_point} onChange={(v) => setFormData({ ...formData, justifications: { ...formData.justifications, entry_point: v } })} />
            </div>

            <button disabled={!isStep2Valid} onClick={() => setStep(3)} className={`w-full py-6 rounded-[2rem] font-black text-xl transition-all ${isStep2Valid ? 'premium-gradient text-white shadow-2xl hover:scale-[1.02]' : 'bg-white/5 text-text-muted cursor-not-allowed'}`}>
              VOIR L'APERÇU
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
            <div className="space-y-6">
              <SectionTitle subtitle="Voici comment votre avis apparaîtra dans la communauté">Aperçu de votre carte</SectionTitle>
              <ReviewCard review={{
                id: 'preview',
                user_id: 'me',
                user_display_name: mockUsers[0].display_name,
                user_avatar: mockUsers[0].avatar_url,
                user_expertise: 'Contributeur Qualifié',
                target_type: type as EntityType,
                target_id: id || '',
                target_slug: id || '',
                target_name: 'Objet Musical',
                rating_overall: formData.rating,
                title: formData.title,
                selections: formData.selections,
                justifications: formData.justifications,
                quality_score: 95,
                helpful_count: 0,
                published_at: new Date().toISOString(),
                tone: 'nuancé'
              }} />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <button onClick={() => setStep(2)} className="flex-1 py-5 rounded-2xl border border-white/10 font-bold hover:bg-white/5 transition-colors">MODIFIER</button>
              <button onClick={() => navigate('/')} className="flex-[2] py-5 rounded-2xl premium-gradient text-white font-black text-xl shadow-2xl hover:scale-[1.02] transition-transform">PUBLIER MON ANALYSE</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SelectionGroup = ({ label, options, selected, onSelect, multi }: { label: string, options: string[], selected: any, onSelect: (v: string) => void, multi?: boolean }) => (
  <div className="glass-card p-8 space-y-6">
    <label className="block text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">{label}</label>
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const isSelected = multi ? selected.includes(opt) : selected === opt;
        return (
          <button 
            key={opt} 
            onClick={() => onSelect(opt)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${isSelected ? 'bg-accent-primary border-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'bg-bg-surface-light border-white/5 text-text-muted hover:border-white/20'}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

const TextArea = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
  <div className="glass-card p-10 space-y-6">
    <label className="block text-xs font-black text-text-muted uppercase tracking-widest">{label}</label>
    <textarea 
      className="w-full bg-bg-surface-light border border-white/10 rounded-2xl p-6 text-lg font-medium focus:outline-none focus:border-accent-primary transition-all min-h-[150px] resize-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Développez votre pensée ici..."
    />
  </div>
);

const ListsPage = () => (
  <div className="space-y-12">
    <SectionTitle subtitle="Les sélections thématiques de la communauté">Listes Partagées</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {mockLists.map(list => (
        <Link key={list.id} to={`/liste/${list.slug}`} className="glass-card p-10 space-y-6 hover:border-accent-primary/30 transition-all group">
          <div className="flex justify-between items-start">
            <Badge variant="premium">{list.category}</Badge>
            <div className="flex items-center gap-2 text-text-muted font-bold">
              <ThumbsUp size={16} /> {list.like_count}
            </div>
          </div>
          <h2 className="text-3xl font-black group-hover:text-accent-primary transition-colors">{list.title}</h2>
          <p className="text-text-muted text-lg leading-relaxed">{list.description}</p>
          <div className="pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-bold text-xs">
                {list.user_display_name[0]}
              </div>
              <span className="text-sm font-bold text-text-muted">{list.user_display_name}</span>
            </div>
            <ArrowRight size={24} className="text-accent-primary group-hover:translate-x-2 transition-transform" />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

const ListPage = () => {
  const { slug } = useParams();
  const list = mockLists.find(l => l.slug === slug);
  if (!list) return <div className="text-center py-20">Liste non trouvée.</div>;
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <Badge variant="premium">{list.category}</Badge>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">{list.title}</h1>
        <p className="text-text-muted text-xl max-w-3xl">{list.description}</p>
      </header>
      <div className="space-y-6">
        {list.items.map((item, i) => (
          <div key={i} className="glass-card p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="text-4xl font-black text-accent-primary opacity-50">#{i + 1}</div>
            <div className="flex-grow space-y-2">
              <h3 className="text-2xl font-black">{item.title}</h3>
              <p className="text-text-muted italic">"{item.why}"</p>
            </div>
            <Link to={`/${item.type}/${item.slug}`} className="bg-bg-surface-light px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/5 transition-colors">Voir la fiche</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommunityPage = () => (
  <div className="space-y-12">
    <SectionTitle subtitle="Rencontrez les contributeurs les plus actifs">Communauté Echo</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mockUsers.map(user => (
        <div key={user.id} className="glass-card p-8 text-center space-y-6">
          <img src={user.avatar_url} className="w-24 h-24 rounded-full mx-auto border-4 border-accent-primary/20" referrerPolicy="no-referrer" />
          <div>
            <h3 className="text-xl font-black">{user.display_name}</h3>
            <Badge variant={user.credibility_level === 'qualifie' ? 'premium' : 'default'}>{user.credibility_level}</Badge>
          </div>
          <p className="text-text-muted text-sm line-clamp-2">{user.bio_short}</p>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
            <div><div className="font-black text-lg">{user.stats.reviews_count}</div><div className="text-[8px] font-bold text-text-muted uppercase">Avis</div></div>
            <div><div className="font-black text-lg">{user.stats.followers_count}</div><div className="text-[8px] font-bold text-text-muted uppercase">Followers</div></div>
            <div><div className="font-black text-lg">{user.stats.helpful_votes}</div><div className="text-[8px] font-bold text-text-muted uppercase">Utiles</div></div>
          </div>
          <button className="w-full py-3 rounded-xl bg-bg-surface-light font-bold text-xs hover:bg-white/5 transition-colors">VOIR LE PROFIL</button>
        </div>
      ))}
    </div>
  </div>
);

const ProfilePage = ({ isPremium, setIsPremium }: { isPremium: boolean, setIsPremium: (v: boolean) => void }) => {
  const user = mockUsers[0];
  return (
    <div className="space-y-12">
      <header className="glass-card p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5"><UserIcon size={200} /></div>
        <img src={user.avatar_url} className="w-40 h-40 rounded-[2.5rem] border-4 border-accent-primary/30 shadow-2xl z-10" referrerPolicy="no-referrer" />
        <div className="space-y-4 z-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h1 className="text-5xl font-black tracking-tighter">{user.display_name}</h1>
            <Badge variant="premium">{user.credibility_level}</Badge>
          </div>
          <p className="text-text-muted text-xl max-w-xl">{user.bio_short}</p>
          <div className="flex gap-8 justify-center md:justify-start">
            <div className="text-center"><div className="text-3xl font-black">{user.stats.reviews_count}</div><div className="text-[10px] font-bold text-text-muted uppercase">Avis</div></div>
            <div className="text-center"><div className="text-3xl font-black">{user.stats.followers_count}</div><div className="text-[10px] font-bold text-text-muted uppercase">Abonnés</div></div>
            <div className="text-center"><div className="text-3xl font-black">{user.stats.helpful_votes}</div><div className="text-[10px] font-bold text-text-muted uppercase">Votes</div></div>
          </div>
        </div>
      </header>
      <section className="space-y-8">
        <SectionTitle>Mes derniers avis</SectionTitle>
        <div className="space-y-8">
          {mockReviews.filter(r => r.user_id === user.id).map(review => <div key={review.id}><ReviewCard review={review} /></div>)}
        </div>
      </section>
    </div>
  );
};

const PremiumPage = () => (
  <div className="max-w-5xl mx-auto space-y-16 py-10">
    <header className="text-center space-y-6">
      <Badge variant="premium">Echo Premium</Badge>
      <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
        L'EXPÉRIENCE <br />
        <span className="text-accent-primary">SANS LIMITES.</span>
      </h1>
      <p className="text-text-muted text-xl max-w-2xl mx-auto">
        Approfondissez votre culture musicale avec des outils d'analyse avancés et une communauté d'experts.
      </p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="glass-card p-10 space-y-8 border-white/5">
        <h3 className="text-2xl font-black uppercase tracking-tight">Version Gratuite</h3>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-text-muted"><CheckCircle2 size={20} className="text-success" /> Accès à l'accueil et Explorer</li>
          <li className="flex items-center gap-3 text-text-muted"><CheckCircle2 size={20} className="text-success" /> Résumés IA principaux</li>
          <li className="flex items-center gap-3 text-text-muted"><CheckCircle2 size={20} className="text-success" /> Publication d'avis</li>
          <li className="flex items-center gap-3 text-text-muted opacity-50"><Lock size={20} /> 10 sauvegardes max</li>
          <li className="flex items-center gap-3 text-text-muted opacity-50"><Lock size={20} /> Publicité légère</li>
        </ul>
        <div className="pt-6"><div className="text-4xl font-black">0€<span className="text-sm text-text-muted">/mois</span></div></div>
        <button className="w-full py-4 rounded-2xl bg-bg-surface-light font-bold">Actuel</button>
      </div>

      <div className="glass-card p-10 space-y-8 border-accent-primary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6"><Badge variant="premium">Recommandé</Badge></div>
        <h3 className="text-2xl font-black uppercase tracking-tight text-accent-primary">Echo Premium</h3>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-text-main"><CheckCircle2 size={20} className="text-accent-primary" /> Lecture illimitée des avis</li>
          <li className="flex items-center gap-3 text-text-main"><CheckCircle2 size={20} className="text-accent-primary" /> Filtres de découverte avancés</li>
          <li className="flex items-center gap-3 text-text-main"><CheckCircle2 size={20} className="text-accent-primary" /> Parcours "Par où commencer" enrichis</li>
          <li className="flex items-center gap-3 text-text-main"><CheckCircle2 size={20} className="text-accent-primary" /> Sauvegardes & Listes illimitées</li>
          <li className="flex items-center gap-3 text-text-main"><CheckCircle2 size={20} className="text-accent-primary" /> Zéro publicité</li>
        </ul>
        <div className="pt-6"><div className="text-4xl font-black">4.99€<span className="text-sm text-text-muted">/mois</span></div></div>
        <button className="w-full py-4 rounded-2xl premium-gradient text-white font-black shadow-xl shadow-accent-primary/20 hover:scale-[1.02] transition-transform">S'ABONNER MAINTENANT</button>
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
