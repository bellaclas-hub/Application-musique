import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useNavigate, 
  useParams, 
  useLocation,
  useSearchParams 
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
  PlayCircle,
  LayoutGrid,
  LayoutList
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
  <motion.div whileHover={{ y: -8 }} className="glass-card overflow-hidden cursor-pointer group flex flex-col h-full">
    <Link to={`/artiste/${artist.slug}`} className="flex flex-col h-full">
      <div className="aspect-[16/10] overflow-hidden relative">
        <img 
          src={artist.cover_image_url || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800'} 
          alt={artist.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/20 to-transparent opacity-60" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant="premium">{artist.entry_level}</Badge>
          <Badge variant="default">{artist.primary_genres[0]}</Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="bg-bg-main/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
            <Star size={12} className="text-warning fill-warning" />
            <span className="text-[10px] font-black">{artist.consensus_score}%</span>
          </div>
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-black text-xl group-hover:text-accent-primary transition-colors leading-tight">{artist.name}</h3>
        </div>
        <p className="text-text-muted text-sm line-clamp-2 mb-4 font-medium leading-relaxed italic">"{artist.short_bio}"</p>
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-text-muted">
          <div className="flex items-center gap-1.5 text-accent-secondary">
            <TrendingUp size={14} />
            <span>Consensus à {artist.consensus_score} %</span>
          </div>
          <span>{artist.review_count} avis</span>
        </div>
      </div>
    </Link>
  </motion.div>
);

const AlbumCard = ({ album, compact = false }: { album: Album, compact?: boolean }) => (
  <motion.div whileHover={{ scale: 1.02 }} className={`glass-card cursor-pointer group overflow-hidden ${compact ? 'p-3' : 'p-4'}`}>
    <Link to={`/album/${album.slug}`} className="flex gap-4 items-center">
      <div className={`${compact ? 'w-16 h-16' : 'w-24 h-24'} rounded-xl overflow-hidden flex-shrink-0 shadow-lg`}>
        <img 
          src={album.cover_url || 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=600'} 
          alt={album.title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-110" 
          referrerPolicy="no-referrer" 
        />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="success">Album</Badge>
          {album.is_entry_album && <span className="text-[8px] font-black text-accent-secondary uppercase tracking-tighter">Porte d'entrée</span>}
        </div>
        <h4 className="font-black text-lg text-text-main truncate group-hover:text-accent-primary transition-colors leading-tight">{album.title}</h4>
        <p className="text-text-muted text-xs font-bold truncate">{album.artist_name}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-black">
            <Star size={14} className="text-warning fill-warning" />
            <span>{album.community_score}/100</span>
          </div>
          <div className="text-[9px] font-black text-text-muted uppercase tracking-widest group-hover:text-text-main transition-colors flex items-center gap-1">
            Voir l'analyse <ArrowRight size={10} />
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const TrackCard = ({ track }: { track: Track }) => (
  <motion.div whileHover={{ scale: 1.01 }} className="glass-card p-4 flex items-center justify-between cursor-pointer group border-l-4 border-accent-secondary">
    <Link to={`/morceau/${track.slug}`} className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent-secondary/10 flex items-center justify-center group-hover:bg-accent-secondary/20 transition-colors shadow-inner">
          <PlayCircle size={24} className="text-accent-secondary" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Badge variant="default">Morceau</Badge>
            {track.is_best_entry_track && <span className="text-[8px] font-black text-accent-primary uppercase tracking-tighter">Incontournable</span>}
          </div>
          <h4 className="font-black text-base group-hover:text-accent-secondary transition-colors leading-tight">{track.title}</h4>
          <p className="text-[10px] text-text-muted uppercase font-black tracking-widest">{track.artist_name}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <div className="text-xs font-black text-accent-secondary">{track.quick_consensus_score}%</div>
          <div className="text-[8px] font-bold text-text-muted uppercase">Consensus</div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-secondary/20 transition-colors">
          <ChevronRight size={18} className="text-text-muted group-hover:text-text-main transition-colors" />
        </div>
      </div>
    </Link>
  </motion.div>
);

const ReviewCard = ({ review, isReaderPremium = false, compact = false }: { review: Review, isReaderPremium?: boolean, compact?: boolean }) => {
  const isLocked = !isReaderPremium && review.quality_score > 90;

  return (
    <div className={`glass-card relative overflow-hidden group transition-all duration-500 border-white/5 hover:border-accent-primary/20 ${compact ? 'p-6' : 'p-8 md:p-10'}`}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img src={review.user_avatar} alt={review.user_display_name} className="w-14 h-14 rounded-2xl object-cover border-2 border-white/5 shadow-2xl" referrerPolicy="no-referrer" />
            {review.user_premium_status && (
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-lg premium-gradient flex items-center justify-center shadow-lg">
                <Award size={12} className="text-white" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-black text-lg text-white tracking-tight">{review.user_display_name}</span>
              {review.user_premium_status ? (
                <Badge variant="premium">Premium</Badge>
              ) : (
                <Badge variant="default">Gratuit</Badge>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-black uppercase tracking-widest text-text-muted">
              <span className="text-accent-primary">{review.user_expertise || 'Contributeur'}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>{new Date(review.published_at).toLocaleDateString('fr-FR')}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <Link to={`/${review.target_type === 'artist' ? 'artiste' : review.target_type === 'album' ? 'album' : 'morceau'}/${review.target_slug}`} className="text-accent-secondary hover:underline flex items-center gap-1">
                {review.target_name} <ExternalLink size={10} />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 self-end md:self-start">
          <div className="text-right">
            <div className="text-3xl font-black text-accent-primary leading-none flex items-baseline gap-1">
              {review.rating_overall}<span className="text-sm text-text-muted font-bold tracking-normal">/5</span>
            </div>
            <div className="text-[9px] font-black text-text-muted uppercase tracking-widest mt-1">Note Globale</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-right">
            <div className="text-xl font-black text-white leading-none">{review.quality_score}%</div>
            <div className="text-[9px] font-black text-text-muted uppercase tracking-widest mt-1">Qualité</div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-8">
        <div className="space-y-4">
          {review.title && <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-white leading-tight">{review.title}</h3>}
          <div className="flex flex-wrap gap-2">
            <Badge variant="premium">{review.selections.impression}</Badge>
            <Badge variant="default">{review.selections.feeling}</Badge>
            <Badge variant="success">{review.selections.accessibility}</Badge>
            {review.tone && <Badge variant="warning">{review.tone}</Badge>}
            {review.angle && <Badge variant="default">Analyse: {review.angle}</Badge>}
          </div>
        </div>

        {!compact && (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 relative ${isLocked ? 'max-h-48 overflow-hidden' : ''}`}>
            <div className="space-y-8">
              <ReviewSection label="Pourquoi ces mots ?" content={review.justifications.why_words} icon={<Info size={14} />} />
              <ReviewSection label="Élément marquant" content={review.justifications.key_element} icon={<Zap size={14} />} />
            </div>
            <div className="space-y-8">
              <ReviewSection label="Recommandation" content={review.justifications.recommendation} icon={<Users size={14} />} />
              <ReviewSection label="Par où commencer ?" content={review.justifications.entry_point} icon={<ArrowRight size={14} />} color="text-accent-secondary" />
            </div>

            {isLocked && (
              <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/95 to-transparent flex flex-col items-center justify-end pb-8 gap-4">
                <div className="flex items-center gap-2 text-warning font-black text-[10px] uppercase tracking-widest">
                  <Lock size={12} /> Analyse réservée aux membres premium
                </div>
                <Link to="/premium" className="premium-gradient px-10 py-4 rounded-2xl font-black text-sm shadow-2xl hover:scale-105 transition-transform flex items-center gap-3">
                  PASSER AU PREMIUM POUR TOUT LIRE
                </Link>
              </div>
            )}
          </div>
        )}

        {compact && isLocked && (
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-text-muted text-xs font-bold">
              <Lock size={16} className="text-warning" /> Analyse complète masquée
            </div>
            <Link to="/premium" className="text-accent-primary font-black text-[10px] uppercase tracking-widest hover:underline">Débloquer</Link>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <button className="flex items-center gap-2.5 text-xs font-black text-text-muted hover:text-accent-primary transition-colors group uppercase tracking-widest">
            <ThumbsUp size={18} className="group-hover:scale-110 transition-transform" />
            <span>Utile <span className="text-text-main ml-1">{review.helpful_count}</span></span>
          </button>
          <button className="flex items-center gap-2.5 text-xs font-black text-text-muted hover:text-accent-primary transition-colors group uppercase tracking-widest">
            <Share2 size={18} className="group-hover:scale-110 transition-transform" />
            <span>Partager</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          {isLocked ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warning/10 text-warning text-[10px] font-black uppercase tracking-widest border border-warning/20">
              <Lock size={10} /> Extrait
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 text-success text-[10px] font-black uppercase tracking-widest border border-success/20">
              <CheckCircle2 size={10} /> Avis complet
            </div>
          )}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-text-muted text-[10px] font-black uppercase tracking-widest border border-white/10">
            Vérifié
          </div>
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

        <div className="mt-10 space-y-6">
          <div className="px-2">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4">Récemment vus</h3>
            <div className="space-y-3">
              {mockArtists.slice(0, 2).map(artist => (
                <Link key={artist.id} to={`/artiste/${artist.slug}`} className="flex items-center gap-3 group">
                  <img src={artist.cover_image_url} className="w-8 h-8 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                  <span className="text-xs font-bold text-text-muted group-hover:text-text-main transition-colors truncate">{artist.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="px-2">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4">Vos Listes</h3>
            <div className="space-y-3">
              <button className="flex items-center gap-3 text-text-muted hover:text-text-main transition-colors group w-full text-left">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <PlusCircle size={16} />
                </div>
                <span className="text-xs font-bold">Créer une liste</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
          {!isPremium && (
            <Link to="/premium" className="w-full premium-gradient p-4 rounded-2xl text-[10px] font-black flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-accent-primary/20 tracking-widest uppercase">
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
  const [viewMode, setViewMode] = React.useState<'detailed' | 'compact'>('detailed');
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
    <div className="space-y-12">
      <header className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <Badge variant="premium">Communauté Echo</Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">Avis de la <br /><span className="text-accent-primary">COMMUNAUTÉ.</span></h1>
            <p className="text-text-muted text-xl font-medium max-w-xl">Des avis structurés, utiles et nuancés pour mieux découvrir la musique</p>
          </div>
          <div className="flex gap-4">
            <div className="glass-card px-6 py-4 text-center border-white/5">
              <div className="text-2xl font-black text-accent-primary">{mockReviews.length}</div>
              <div className="text-[10px] font-black text-text-muted uppercase tracking-widest">Avis publiés</div>
            </div>
            <div className="glass-card px-6 py-4 text-center border-white/5">
              <div className="text-2xl font-black text-accent-secondary">12</div>
              <div className="text-[10px] font-black text-text-muted uppercase tracking-widest">Auteurs actifs</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition duration-500"></div>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-primary transition-colors" size={24} />
              <input 
                type="text" 
                placeholder="Rechercher un avis, un artiste, un contributeur..." 
                className="w-full bg-bg-surface border border-white/10 rounded-2xl py-6 pl-16 pr-8 text-xl font-medium focus:outline-none focus:border-accent-primary/50 transition-all shadow-2xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <FilterGroup label="Type" value={filters.type} options={[{id: 'all', label: 'Tout'}, {id: 'artist', label: 'Artiste'}, {id: 'album', label: 'Album'}, {id: 'track', label: 'Morceau'}]} onChange={(v) => setFilters({...filters, type: v})} />
              <FilterGroup label="Genre" value={filters.genre} options={[{id: 'all', label: 'Tout'}, {id: 'Pop', label: 'Pop'}, {id: 'Rock-Indie', label: 'Rock-Indie'}, {id: 'Hip-hop-Rap', label: 'Hip-hop-Rap'}]} onChange={(v) => setFilters({...filters, genre: v})} />
              <FilterGroup label="Tonalité" value={filters.tone} options={[{id: 'all', label: 'Tout'}, {id: 'positif', label: 'Positif'}, {id: 'nuancé', label: 'Nuancé'}, {id: 'critique', label: 'Critique'}]} onChange={(v) => setFilters({...filters, tone: v})} />
              <FilterGroup label="Angle" value={filters.angle} options={[{id: 'all', label: 'Tout'}, {id: 'production', label: 'Production'}, {id: 'écriture', label: 'Écriture'}, {id: 'émotion', label: 'Émotion'}]} onChange={(v) => setFilters({...filters, angle: v})} />
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 p-1.5 rounded-2xl border border-white/5">
              <button 
                onClick={() => setViewMode('detailed')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'detailed' ? 'bg-accent-primary text-white shadow-lg' : 'text-text-muted hover:text-text-main'}`}
                title="Vue détaillée"
              >
                <LayoutList size={20} />
              </button>
              <button 
                onClick={() => setViewMode('compact')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'compact' ? 'bg-accent-primary text-white shadow-lg' : 'text-text-muted hover:text-text-main'}`}
                title="Vue compacte"
              >
                <LayoutGrid size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-accent-primary/5 border border-accent-primary/20 rounded-3xl p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
          <Info className="text-accent-primary" size={20} />
        </div>
        <p className="text-sm text-text-muted leading-relaxed font-medium">
          Tous les membres peuvent publier des avis. L’abonnement payant débloque davantage de lecture, de comparaison et de personnalisation, mais ne donne pas automatiquement plus de valeur à un avis.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <div className="w-16 h-16 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-text-muted font-black uppercase tracking-[0.2em] text-xs">Analyse de la communauté en cours...</p>
        </div>
      ) : filteredReviews.length > 0 ? (
        <div className={`grid gap-10 ${viewMode === 'compact' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          {filteredReviews.map(review => (
            <motion.div 
              layout
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ReviewCard review={review} isReaderPremium={isPremium} compact={viewMode === 'compact'} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 space-y-6 glass-card border-white/5">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={40} className="text-text-muted" />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight">Aucun avis trouvé</h3>
          <p className="text-text-muted font-medium">Essayez de modifier vos filtres ou votre recherche.</p>
          <button 
            onClick={() => {setSearch(''); setFilters({type: 'all', genre: 'all', tone: 'all', angle: 'all', status: 'all', account: 'all', sort: 'recent'})}} 
            className="bg-accent-primary/10 text-accent-primary px-8 py-3 rounded-2xl font-black text-sm hover:bg-accent-primary/20 transition-all"
          >
            RÉINITIALISER LES FILTRES
          </button>
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
const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explorer?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="space-y-20">
      <header className="space-y-8 pt-10 relative">
        <div className="space-y-6">
          <Badge variant="premium">Plateforme Culturelle & Communautaire</Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
            DÉCOUVREZ PAR OÙ <br />
            <span className="text-accent-primary">COMMENCER.</span>
          </h1>
          <p className="text-text-muted text-xl md:text-2xl max-w-2xl font-medium leading-relaxed">
            Echo centralise les avis structurés et les analyses IA pour vous guider dans l'univers d'un artiste, d'un album ou d'un morceau.
          </p>
        </div>

        {/* Home Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-4xl group">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-primary transition-colors" size={24} />
            <input 
              type="text" 
              placeholder="Rechercher un artiste, un album ou un morceau..." 
              className="w-full bg-bg-surface border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-xl font-medium focus:outline-none focus:border-accent-primary/50 transition-all shadow-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 bg-accent-primary hover:bg-accent-primary/80 text-white px-6 py-3 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95">
              RECHERCHER
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link to="/explorer" className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-black text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
            <TrendingUp size={18} className="text-accent-secondary" /> VOIR LES TENDANCES
          </Link>
          <Link to="/avis" className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-black text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
            <MessageSquare size={18} className="text-accent-primary" /> LIRE LES DERNIERS AVIS
          </Link>
        </div>
      </header>

      <section>
        <div className="flex items-end justify-between mb-8">
          <SectionTitle subtitle="Les artistes qui redéfinissent la scène actuelle">Tendances du moment</SectionTitle>
          <Link to="/explorer" className="text-accent-secondary font-black text-xs uppercase tracking-widest hover:underline mb-8 flex items-center gap-2">
            Tout explorer <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockArtists.slice(0, 6).map(artist => <div key={artist.id}><ArtistCard artist={artist} /></div>)}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-12">
          <SectionTitle subtitle="Les analyses les plus pertinentes de la semaine">Avis à la une</SectionTitle>
          <div className="space-y-8">
            <ReviewCard review={mockReviews[0]} />
            <ReviewCard review={mockReviews[1]} />
          </div>
          <Link to="/avis" className="premium-gradient w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-xl hover:opacity-90 transition-opacity">
            <MessageSquare size={20} /> DÉCOUVRIR TOUS LES AVIS DE LA COMMUNAUTÉ
          </Link>
        </div>
        
        <div className="lg:col-span-5 space-y-12">
          <SectionTitle subtitle="Sélectionnés pour leur accessibilité immédiate">Par où commencer ?</SectionTitle>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] mb-4">Albums Incontournables</h3>
              {mockAlbums.filter(a => a.is_entry_album).map(album => <div key={album.id}><AlbumCard album={album} /></div>)}
            </div>
            <div className="space-y-4 pt-6">
              <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] mb-4">Morceaux Clés</h3>
              {mockTracks.filter(t => t.is_best_entry_track).map(track => <div key={track.id}><TrackCard track={track} /></div>)}
            </div>
          </div>
          
          <div className="glass-card p-8 bg-accent-primary/5 border-accent-primary/20 space-y-6">
            <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center shadow-lg">
              <Zap size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-black leading-tight">Vous ne savez toujours pas quoi écouter ?</h3>
            <p className="text-text-muted text-sm font-medium leading-relaxed">
              Laissez notre IA analyser vos goûts et vous proposer le point d'entrée parfait dans n'importe quel genre musical.
            </p>
            <button className="text-accent-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              Lancer l'assistant Echo <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[3rem] bg-bg-surface border border-white/5 p-12 md:p-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-primary/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-8">
          <Badge variant="premium">Listes de la communauté</Badge>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            DES MILLIERS DE <br />
            <span className="text-accent-secondary">SÉLECTIONS.</span>
          </h2>
          <p className="text-text-muted text-lg font-medium leading-relaxed">
            Explorez les listes thématiques créées par nos membres les plus qualifiés. De la "Synth-pop obscure" aux "Classiques du Rap Belge".
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {mockLists.map(list => (
              <Link key={list.id} to={`/liste/${list.slug}`} className="bg-bg-main/50 backdrop-blur-md p-6 rounded-3xl border border-white/5 hover:border-accent-primary/30 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="premium">{list.category}</Badge>
                  <div className="flex items-center gap-1 text-text-muted text-[10px] font-black">
                    <ThumbsUp size={12} /> {list.like_count}
                  </div>
                </div>
                <h3 className="text-lg font-black group-hover:text-accent-primary transition-colors mb-2">{list.title}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Par {list.user_display_name}</span>
                  <ArrowRight size={16} className="text-accent-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          <Link to="/listes" className="inline-flex items-center gap-2 text-accent-secondary font-black text-xs uppercase tracking-widest hover:underline pt-4">
            Voir toutes les listes <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

const ExploreScreen = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [search, setSearch] = React.useState(initialQuery);
  const [activeTab, setActiveTab] = React.useState<'artists' | 'albums' | 'tracks'>('artists');
  const [filters, setFilters] = React.useState({
    genre: 'all',
    accessibility: 'all',
    tone: 'all',
    sort: 'relevant'
  });

  const filteredArtists = mockArtists.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || 
                          a.primary_genres.some(g => g.toLowerCase().includes(search.toLowerCase()));
    const matchesGenre = filters.genre === 'all' || a.primary_genres.includes(filters.genre);
    const matchesAccess = filters.accessibility === 'all' || a.entry_level.toLowerCase() === filters.accessibility.toLowerCase();
    return matchesSearch && matchesGenre && matchesAccess;
  });

  const filteredAlbums = mockAlbums.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || 
                          a.artist_name.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = filters.genre === 'all' || a.genres.includes(filters.genre);
    return matchesSearch && matchesGenre;
  });

  const filteredTracks = mockTracks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          t.artist_name.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-8">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-primary transition-colors" size={28} />
            <input 
              type="text" 
              placeholder="Rechercher un artiste, un album ou un morceau..." 
              className="w-full bg-bg-surface border border-white/10 rounded-3xl py-8 pl-16 pr-8 text-2xl font-medium focus:outline-none focus:border-accent-primary/50 transition-all shadow-2xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filters Bar */}
        <div className="glass-card p-6 flex flex-wrap items-center gap-8 border-white/5">
          <div className="flex items-center gap-2 text-accent-primary">
            <Filter size={18} />
            <span className="text-xs font-black uppercase tracking-widest">Filtres</span>
          </div>
          
          <div className="h-8 w-px bg-white/10 hidden md:block" />

          <FilterGroup 
            label="Genre" 
            value={filters.genre} 
            options={[
              {id: 'all', label: 'Tous les genres'},
              {id: 'Pop', label: 'Pop'},
              {id: 'Rock-Indie', label: 'Rock-Indie'},
              {id: 'Hip-hop', label: 'Hip-hop / Rap'},
              {id: 'Electronic', label: 'Electronic'}
            ]} 
            onChange={(v) => setFilters({...filters, genre: v})} 
          />

          <FilterGroup 
            label="Accessibilité" 
            value={filters.accessibility} 
            options={[
              {id: 'all', label: 'Toutes'},
              {id: 'accessible', label: 'Accessible'},
              {id: 'intermédiaire', label: 'Intermédiaire'},
              {id: 'expérimental', label: 'Exigeant'}
            ]} 
            onChange={(v) => setFilters({...filters, accessibility: v})} 
          />

          <FilterGroup 
            label="Tonalité" 
            value={filters.tone} 
            options={[
              {id: 'all', label: 'Toutes'},
              {id: 'positif', label: 'Positif'},
              {id: 'nuancé', label: 'Nuancé'},
              {id: 'critique', label: 'Critique'}
            ]} 
            onChange={(v) => setFilters({...filters, tone: v})} 
          />

          <div className="ml-auto">
            <FilterGroup 
              label="Trier par" 
              value={filters.sort} 
              options={[
                {id: 'relevant', label: 'Plus pertinents'},
                {id: 'popular', label: 'Plus populaires'},
                {id: 'recent', label: 'Plus récents'}
              ]} 
              onChange={(v) => setFilters({...filters, sort: v})} 
            />
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-white/5">
        <TabButton active={activeTab === 'artists'} onClick={() => setActiveTab('artists')} label="Artistes" count={filteredArtists.length} />
        <TabButton active={activeTab === 'albums'} onClick={() => setActiveTab('albums')} label="Albums" count={filteredAlbums.length} />
        <TabButton active={activeTab === 'tracks'} onClick={() => setActiveTab('tracks')} label="Morceaux" count={filteredTracks.length} />
      </div>

      {/* Results */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + search + JSON.stringify(filters)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'artists' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArtists.length > 0 ? (
                  filteredArtists.map(a => <div key={a.id}><ArtistCard artist={a} /></div>)
                ) : (
                  <EmptyResults />
                )}
              </div>
            )}

            {activeTab === 'albums' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAlbums.length > 0 ? (
                  filteredAlbums.map(a => <div key={a.id}><AlbumCard album={a} /></div>)
                ) : (
                  <EmptyResults />
                )}
              </div>
            )}

            {activeTab === 'tracks' && (
              <div className="max-w-4xl space-y-4">
                {filteredTracks.length > 0 ? (
                  filteredTracks.map(t => <div key={t.id}><TrackCard track={t} /></div>)
                ) : (
                  <EmptyResults />
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Discovery Section */}
      {search && filteredArtists.length > 0 && (
        <section className="pt-12 border-t border-white/5 space-y-8">
          <div className="flex items-center gap-3">
            <Zap size={24} className="text-accent-primary" />
            <h3 className="text-xl font-black uppercase tracking-tight">Suggestions de découverte</h3>
          </div>
          <div className="glass-card p-8 bg-accent-secondary/5 border-accent-secondary/20">
            <p className="text-lg font-medium mb-6">
              Si vous aimez <span className="text-accent-secondary font-black">{filteredArtists[0].name}</span>, Echo vous recommande d'explorer aussi :
            </p>
            <div className="flex flex-wrap gap-4">
              {mockArtists.filter(a => a.id !== filteredArtists[0].id).slice(0, 2).map(a => (
                <Link key={a.id} to={`/artiste/${a.slug}`} className="bg-bg-main/50 px-6 py-4 rounded-2xl border border-white/10 hover:border-accent-secondary transition-all flex items-center gap-4 group">
                  <img src={a.cover_image_url} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <div className="font-black text-sm group-hover:text-accent-secondary transition-colors">{a.name}</div>
                    <div className="text-[10px] text-text-muted uppercase font-black">{a.primary_genres[0]}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

const TabButton = ({ active, onClick, label, count }: { active: boolean, onClick: () => void, label: string, count: number }) => (
  <button 
    onClick={onClick}
    className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${active ? 'text-text-main' : 'text-text-muted hover:text-text-main'}`}
  >
    <span className="flex items-center gap-2">
      {label}
      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-accent-primary text-white' : 'bg-white/5 text-text-muted'}`}>
        {count}
      </span>
    </span>
    {active && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-accent-primary rounded-full" />}
  </button>
);

const EmptyResults = () => (
  <div className="col-span-full py-20 text-center space-y-4">
    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
      <Search size={32} className="text-text-muted" />
    </div>
    <h3 className="text-xl font-black uppercase tracking-tight">Aucun résultat trouvé</h3>
    <p className="text-text-muted font-medium">Essayez d'ajuster vos filtres ou votre recherche.</p>
  </div>
);

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

const ListsPage = () => {
  const [activeCategory, setActiveCategory] = React.useState('all');
  
  const categories = [
    { id: 'all', label: 'Toutes' },
    { id: 'Débutant', label: 'Débuter' },
    { id: 'Pop', label: 'Pop' },
    { id: 'Rap', label: 'Rap' },
    { id: 'Indie', label: 'Indie' },
    { id: 'Humeur', label: 'Humeur' },
    { id: 'Sélections d\'experts', label: 'Experts' }
  ];

  const filteredLists = activeCategory === 'all' 
    ? mockLists 
    : mockLists.filter(l => l.category === activeCategory || l.selection_type === activeCategory);

  const featuredLists = mockLists.slice(0, 2);
  const popularLists = [...mockLists].sort((a, b) => b.like_count - a.like_count).slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      <header className="space-y-8 pt-10">
        <div className="space-y-4">
          <Badge variant="premium">Curation Communautaire</Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            EXPLOREZ LES <br />
            <span className="text-accent-secondary">SÉLECTIONS.</span>
          </h1>
          <p className="text-text-muted text-xl md:text-2xl max-w-2xl font-medium leading-relaxed">
            Découvrez des parcours d'écoute créés par nos membres les plus passionnés. Des guides thématiques pour ne plus jamais être perdu.
          </p>
        </div>
      </header>

      {/* Categories */}
      <div className="flex flex-wrap gap-4 border-b border-white/5 pb-8">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-3 rounded-2xl font-black text-sm transition-all ${
              activeCategory === cat.id 
                ? 'bg-accent-secondary text-white shadow-lg shadow-accent-secondary/20' 
                : 'bg-white/5 text-text-muted hover:bg-white/10'
            }`}
          >
            {cat.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Featured Section */}
      {activeCategory === 'all' && (
        <section className="space-y-10">
          <SectionTitle subtitle="Les guides les plus complets du moment">Mises en avant</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {featuredLists.map(list => <ListCard key={list.id} list={list} featured />)}
          </div>
        </section>
      )}

      {/* Main Grid */}
      <section className="space-y-10">
        <SectionTitle subtitle="Parcourez l'intégralité des listes partagées">
          {activeCategory === 'all' ? 'Toutes les listes' : `Listes ${activeCategory}`}
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLists.map(list => <ListCard key={list.id} list={list} />)}
        </div>
      </section>

      {/* Popular Section */}
      {activeCategory === 'all' && (
        <section className="space-y-10">
          <SectionTitle subtitle="Les sélections plébiscitées par la communauté">Les plus populaires</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularLists.map(list => <ListCard key={list.id} list={list} compact />)}
          </div>
        </section>
      )}
    </div>
  );
};

const ListCard = ({ list, featured = false, compact = false }: { list: SharedList, featured?: boolean, compact?: boolean, key?: string | number }) => (
  <motion.div 
    whileHover={{ y: -8 }} 
    className={`glass-card overflow-hidden group cursor-pointer flex flex-col h-full border-white/5 hover:border-accent-secondary/30 transition-all ${featured ? 'md:flex-row' : ''}`}
  >
    <Link to={`/liste/${list.slug}`} className={`flex flex-col h-full ${featured ? 'md:flex-row' : ''}`}>
      <div className={`relative overflow-hidden ${featured ? 'md:w-1/2 aspect-video md:aspect-auto' : 'aspect-video'}`}>
        <img 
          src={list.image_url} 
          alt={list.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge variant="premium">{list.category}</Badge>
          <Badge variant="default">{list.selection_type}</Badge>
        </div>
        <div className="absolute bottom-4 right-4 bg-bg-main/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 text-[10px] font-black">
          <ThumbsUp size={12} className="text-accent-secondary" /> {list.like_count}
        </div>
      </div>
      
      <div className={`p-8 flex flex-col flex-grow ${featured ? 'md:w-1/2' : ''}`}>
        <div className="space-y-4 flex-grow">
          <div className="flex items-center gap-2 text-[10px] font-black text-accent-secondary uppercase tracking-widest">
            <ListMusic size={14} /> {list.items.length} Éléments
          </div>
          <h3 className={`font-black tracking-tight group-hover:text-accent-secondary transition-colors leading-tight ${featured ? 'text-3xl' : 'text-xl'}`}>
            {list.title}
          </h3>
          {!compact && (
            <p className="text-text-muted text-sm font-medium leading-relaxed line-clamp-3">
              {list.description}
            </p>
          )}
          {featured && (
            <div className="bg-accent-secondary/5 border border-accent-secondary/20 p-4 rounded-2xl mt-4">
              <p className="text-xs font-bold italic text-accent-secondary">
                "{list.discovery_promise}"
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={list.user_avatar} className="w-8 h-8 rounded-full border border-white/10" referrerPolicy="no-referrer" />
            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Par {list.user_display_name}</span>
          </div>
          <ArrowRight size={20} className="text-accent-secondary group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </Link>
  </motion.div>
);

const ListPage = () => {
  const { slug } = useParams();
  const list = mockLists.find(l => l.slug === slug);
  if (!list) return <div className="text-center py-20">Liste non trouvée.</div>;
  return (
    <div className="space-y-12">
      <header className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <Badge variant="premium">{list.category}</Badge>
          <Badge variant="default">{list.selection_type}</Badge>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">{list.title}</h1>
        <p className="text-text-muted text-xl max-w-3xl font-medium leading-relaxed">{list.description}</p>
        <div className="flex items-center gap-4 pt-4">
          <img src={list.user_avatar} className="w-10 h-10 rounded-full border-2 border-accent-secondary/20" referrerPolicy="no-referrer" />
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-text-muted">Créée par</div>
            <div className="font-black text-accent-secondary">{list.user_display_name}</div>
          </div>
          <div className="ml-auto flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-black text-white">{list.items.length}</div>
              <div className="text-[10px] font-black text-text-muted uppercase">Éléments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-accent-primary">{list.like_count}</div>
              <div className="text-[10px] font-black text-text-muted uppercase">Likes</div>
            </div>
          </div>
        </div>
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

const CommunityPage = () => {
  const mostHelpful = [...mockUsers].sort((a, b) => b.stats.helpful_votes - a.stats.helpful_votes).slice(0, 3);
  const toFollow = [mockUsers[0], mockUsers[3], mockUsers[5]];
  const experts = mockUsers.filter(u => u.credibility_level === 'qualifie');
  const newProfiles = mockUsers.slice(-3);

  return (
    <div className="space-y-24 pb-20">
      <header className="space-y-6 pt-10">
        <Badge variant="premium">L'Intelligence Collective</Badge>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
          LA COMMUNAUTÉ <br />
          <span className="text-accent-primary">ÉCHO.</span>
        </h1>
        <p className="text-text-muted text-xl md:text-2xl max-w-2xl font-medium leading-relaxed">
          Découvrez les oreilles les plus affûtées de la plateforme. Suivez des experts qui partagent vos goûts ou explorez de nouveaux horizons.
        </p>
      </header>

      {/* À suivre cette semaine */}
      <section className="space-y-10">
        <SectionTitle subtitle="Les profils qui font bouger les lignes en ce moment">À suivre cette semaine</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {toFollow.map(user => <CommunityUserCard key={user.id} user={user} featured />)}
        </div>
      </section>

      {/* Experts par genre */}
      <section className="space-y-10">
        <SectionTitle subtitle="Une expertise pointue sur des styles spécifiques">Experts par genre</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experts.map(user => <CommunityUserCard key={user.id} user={user} compact />)}
        </div>
      </section>

      {/* Contributeurs les plus utiles */}
      <section className="space-y-10">
        <SectionTitle subtitle="Ceux dont les avis sont les plus plébiscités">Contributeurs les plus utiles</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mostHelpful.map(user => <CommunityUserCard key={user.id} user={user} />)}
        </div>
      </section>

      {/* Nouveaux profils */}
      <section className="space-y-10">
        <SectionTitle subtitle="Les nouveaux arrivants à découvrir d'urgence">Nouveaux profils intéressants</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newProfiles.map(user => <CommunityUserCard key={user.id} user={user} />)}
        </div>
      </section>
    </div>
  );
};

const CommunityUserCard = ({ user, featured = false, compact = false }: { user: User, featured?: boolean, compact?: boolean, key?: string | number }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className={`glass-card overflow-hidden group border-white/5 hover:border-accent-primary/30 transition-all flex flex-col ${featured ? 'bg-gradient-to-br from-accent-primary/5 to-transparent' : ''}`}
  >
    <div className="p-8 space-y-6 flex-grow">
      <div className="flex items-center gap-6">
        <div className="relative">
          <img 
            src={user.avatar_url} 
            className={`${compact ? 'w-16 h-16' : 'w-20 h-20'} rounded-2xl border-2 border-white/10 object-cover shadow-xl`} 
            referrerPolicy="no-referrer" 
          />
          {user.premium_status && (
            <div className="absolute -top-2 -right-2 bg-accent-primary text-bg-main p-1 rounded-lg shadow-lg">
              <Zap size={12} fill="currentColor" />
            </div>
          )}
        </div>
        <div>
          <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-black group-hover:text-accent-primary transition-colors`}>{user.display_name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={user.credibility_level === 'qualifie' ? 'premium' : 'default'}>{user.credibility_level}</Badge>
            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{user.favorite_genre}</span>
          </div>
        </div>
      </div>

      {!compact && (
        <div className="space-y-4">
          <p className="text-text-muted text-sm font-medium leading-relaxed line-clamp-2 italic">
            "{user.bio_short}"
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="text-[8px] font-black text-text-muted uppercase tracking-widest mb-1">Spécialité</div>
              <div className="text-[10px] font-bold text-white truncate">{user.critical_specialty}</div>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="text-[8px] font-black text-text-muted uppercase tracking-widest mb-1">Découverte</div>
              <div className="text-[10px] font-bold text-white truncate">{user.discovery_style}</div>
            </div>
          </div>

          {featured && (
            <div className="bg-accent-primary/10 border border-accent-primary/20 p-4 rounded-2xl">
              <div className="text-[8px] font-black text-accent-primary uppercase tracking-widest mb-1">Pourquoi le suivre ?</div>
              <p className="text-xs font-bold text-white leading-relaxed">
                {user.follow_reason}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
        <div className="text-center">
          <div className="font-black text-sm text-white">{user.stats.reviews_count}</div>
          <div className="text-[8px] font-bold text-text-muted uppercase">Avis</div>
        </div>
        <div className="text-center">
          <div className="font-black text-sm text-white">{user.stats.followers_count}</div>
          <div className="text-[8px] font-bold text-text-muted uppercase">Abonnés</div>
        </div>
        <div className="text-center">
          <div className="font-black text-sm text-accent-primary">{user.stats.helpful_votes}</div>
          <div className="text-[8px] font-bold text-text-muted uppercase">Utiles</div>
        </div>
      </div>
    </div>
    
    <button className="w-full py-4 bg-white/5 hover:bg-accent-primary hover:text-bg-main font-black text-[10px] uppercase tracking-[0.2em] transition-all">
      VOIR LE PROFIL
    </button>
  </motion.div>
);

const ProfilePage = ({ isPremium, setIsPremium }: { isPremium: boolean, setIsPremium: (v: boolean) => void }) => {
  const user = mockUsers[0];
  const userLists = mockLists.filter(l => l.user_id === user.id);
  const favoriteArtists = mockArtists.filter(a => user.favorite_artists_ids?.includes(a.id));
  const followedArtists = mockArtists.filter(a => user.followed_artists_ids?.includes(a.id));
  const similarProfiles = mockUsers.filter(u => user.similar_profiles_ids?.includes(u.id));

  return (
    <div className="space-y-20 pb-20">
      {/* Header Profil */}
      <header className="glass-card p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden border-white/5">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><UserIcon size={240} /></div>
        <div className="relative z-10">
          <img 
            src={user.avatar_url} 
            className="w-48 h-48 rounded-[3rem] border-4 border-accent-primary/30 shadow-2xl object-cover" 
            referrerPolicy="no-referrer" 
          />
          {user.premium_status && (
            <div className="absolute -bottom-2 -right-2 bg-accent-primary text-bg-main p-3 rounded-2xl shadow-xl">
              <Zap size={20} fill="currentColor" />
            </div>
          )}
        </div>
        
        <div className="space-y-6 z-10 text-center md:text-left flex-grow">
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter">{user.display_name}</h1>
              <Badge variant="premium">{user.credibility_level}</Badge>
            </div>
            {user.signature && (
              <p className="text-accent-primary font-black text-sm uppercase tracking-[0.2em]">
                {user.signature}
              </p>
            )}
          </div>

          <p className="text-text-muted text-xl max-w-2xl italic font-medium leading-relaxed">
            "{user.bio_short}"
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="bg-white/5 px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-1">Genre Favori</span>
              <span className="text-sm font-bold text-accent-primary">{user.favorite_genre}</span>
            </div>
            <div className="bg-white/5 px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-1">Angle Critique</span>
              <span className="text-sm font-bold text-white">{user.critical_specialty}</span>
            </div>
            <div className="bg-white/5 px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-1">Découverte</span>
              <span className="text-sm font-bold text-white">{user.discovery_style}</span>
            </div>
          </div>

          <div className="flex gap-10 justify-center md:justify-start pt-6 border-t border-white/5">
            <div className="text-center">
              <div className="text-3xl font-black text-white">{user.stats.reviews_count}</div>
              <div className="text-[10px] font-black text-text-muted uppercase tracking-widest">Avis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white">{user.stats.followers_count}</div>
              <div className="text-[10px] font-black text-text-muted uppercase tracking-widest">Abonnés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-accent-primary">{user.stats.helpful_votes}</div>
              <div className="text-[10px] font-black text-text-muted uppercase tracking-widest">Utiles</div>
            </div>
          </div>
        </div>
      </header>

      {/* Goûts Musicaux */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <SectionTitle subtitle="L'ADN sonore du contributeur">Goûts Musicaux</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-accent-primary flex items-center gap-2">
                <Star size={16} /> Artistes Favoris
              </h3>
              <div className="space-y-4">
                {favoriteArtists.map(artist => (
                  <Link key={artist.id} to={`/artiste/${artist.slug}`} className="flex items-center gap-4 group">
                    <img src={artist.cover_image_url} className="w-12 h-12 rounded-xl object-cover border border-white/10" referrerPolicy="no-referrer" />
                    <div className="flex-grow">
                      <div className="font-bold group-hover:text-accent-primary transition-colors">{artist.name}</div>
                      <div className="text-[10px] text-text-muted uppercase font-black">{artist.primary_genres[0]}</div>
                    </div>
                    <ChevronRight size={16} className="text-text-muted group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-accent-primary flex items-center gap-2">
                <Zap size={16} /> Tonalités de Goût
              </h3>
              <div className="flex flex-wrap gap-3">
                {user.taste_tones?.map(tone => (
                  <span key={tone} className="px-4 py-2 bg-accent-primary/10 border border-accent-primary/20 rounded-xl text-xs font-bold text-accent-primary">
                    {tone}
                  </span>
                ))}
              </div>
              <div className="pt-4 space-y-4">
                <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest">Profils Proches</h4>
                <div className="flex -space-x-3">
                  {similarProfiles.map(u => (
                    <img key={u.id} src={u.avatar_url} className="w-10 h-10 rounded-full border-2 border-bg-main object-cover" title={u.display_name} referrerPolicy="no-referrer" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <SectionTitle subtitle="Ses inspirations">Suivis</SectionTitle>
          <div className="glass-card p-8 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-accent-primary">Artistes Suivis</h3>
            <div className="grid grid-cols-2 gap-4">
              {followedArtists.map(artist => (
                <Link key={artist.id} to={`/artiste/${artist.slug}`} className="space-y-2 group">
                  <img src={artist.cover_image_url} className="w-full aspect-square rounded-2xl object-cover border border-white/10 group-hover:border-accent-primary/30 transition-all" referrerPolicy="no-referrer" />
                  <div className="text-[10px] font-black text-center truncate group-hover:text-accent-primary transition-colors">{artist.name.toUpperCase()}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Listes Créées */}
      {userLists.length > 0 && (
        <section className="space-y-10">
          <SectionTitle subtitle="Les sélections thématiques publiées">Listes Créées</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userLists.map(list => <ListCard key={list.id} list={list} />)}
          </div>
        </section>
      )}

      {/* Derniers Avis */}
      <section className="space-y-10">
        <SectionTitle subtitle="Ses analyses critiques les plus récentes">Mes derniers avis</SectionTitle>
        <div className="grid grid-cols-1 gap-8">
          {mockReviews.filter(r => r.user_id === user.id).map(review => (
            <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <ReviewCard review={review} />
            </motion.div>
          ))}
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
