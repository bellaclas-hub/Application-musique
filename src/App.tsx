import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useNavigate, 
  useParams, 
  useLocation,
  useSearchParams,
  Navigate
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
  LayoutList,
  MapPin,
  Target,
  Heart,
  MoreHorizontal,
  TrendingDown,
  Activity,
  Compass,
  Layers,
  Sparkles,
  BarChart3,
  Calendar,
  ThumbsDown,
  X,
  Check,
  Clock,
  Music2,
  Mic2,
  Disc,
  Headphones,
  Maximize2,
  Minimize2,
  Hash
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
  ProReview,
  ConsensusData,
  SummaryBlock
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

const AccessLevelBadge = ({ level }: { level: 'Immédiat' | 'Accessible' | 'Intermédiaire' | 'Exigeant' }) => {
  const config = {
    'Immédiat': { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', label: 'Immédiat' },
    'Accessible': { color: 'bg-sky-500/20 text-sky-400 border-sky-500/30', label: 'Accessible' },
    'Intermédiaire': { color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', label: 'Intermédiaire' },
    'Exigeant': { color: 'bg-rose-500/20 text-rose-400 border-rose-500/30', label: 'Exigeant' }
  };
  const { color, label } = config[level] || config['Accessible'];
  return (
    <div className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${color} flex items-center gap-1.5`}>
      <ShieldCheck size={10} />
      {label}
    </div>
  );
};

const PolarizationMeter = ({ score }: { score: number }) => {
  const getLevel = (s: number) => {
    if (s < 20) return { label: 'Unanimité Totale', color: 'text-success', bg: 'bg-success/10' };
    if (s < 45) return { label: 'Consensus Large', color: 'text-success', bg: 'bg-success/10' };
    if (s < 70) return { label: 'Points de Friction', color: 'text-warning', bg: 'bg-warning/10' };
    return { label: 'Clivage Majeur', color: 'text-accent-secondary', bg: 'bg-accent-secondary/10' };
  };
  const level = getLevel(score);
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Indice de Clivage</span>
        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${level.bg} ${level.color}`}>{level.label}</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          className={`h-full ${score > 70 ? 'bg-accent-secondary' : 'bg-accent-primary'}`}
        />
      </div>
    </div>
  );
};

const ProVsCommunityBlock = ({ 
  proScore, 
  communityScore, 
  proConcensus, 
  communityConcensus, 
  gap 
}: { 
  proScore: number, 
  communityScore: number, 
  proConcensus: string, 
  communityConcensus: string,
  gap: number
}) => {
  const gapType = proScore > communityScore + 10 ? 'Elite' : communityScore > proScore + 10 ? 'Public' : 'Equilibre';
  
  const insights = {
    Elite: "Ce projet est plus valorisé par la critique technique que par l'auditeur moyen. Souvent signe d'une complexité qui nécessite plusieurs écoutes.",
    Public: "Un véritable plébiscite populaire qui dépasse les réserves parfois techniques de la critique pro.",
    Equilibre: "Une rare harmonie entre l'exigence critique et le plaisir d'écoute globale."
  };

  return (
    <div className="glass-card overflow-hidden border-accent-primary/20 relative">
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <TrendingUp size={120} />
      </div>
      
      <div className="premium-gradient p-4 text-center relative z-10">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Analyse de Perception : Pro vs Communauté</h3>
      </div>
      
      <div className="p-8 md:p-12 space-y-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-around items-center relative">
             <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-px h-12 bg-white/10" />
             
             <div className="text-center space-y-2">
               <div className="text-[10px] font-black text-accent-primary uppercase tracking-widest">Score Pro</div>
               <div className="text-6xl font-black text-white">{proScore}</div>
             </div>
             
             <div className="text-center space-y-2">
               <div className="text-[10px] font-black text-accent-secondary uppercase tracking-widest">Communauté</div>
               <div className="text-6xl font-black text-white">{communityScore}</div>
             </div>
          </div>

          <div className="bg-bg-surface-light p-6 rounded-3xl border border-white/5 space-y-4">
             <div className="flex items-center justify-between">
               <Badge variant={gapType === 'Equilibre' ? 'success' : 'premium'}>
                 {gapType === 'Equilibre' ? 'VIBRATIONS SYNC' : gapType === 'Elite' ? 'PRÉCISION D\'ELITE' : 'PLÉBISCITE TOTAL'}
               </Badge>
               <div className="text-[10px] font-black text-accent-secondary flex items-center gap-2">
                 <Zap size={10} /> ÉCART : {Math.abs(gap)} PTS
               </div>
             </div>
             <p className="text-sm text-text-main leading-relaxed font-bold italic border-l-2 border-accent-primary pl-4 py-2">
               &ldquo;{insights[gapType]}&rdquo;
             </p>
             {Math.abs(gap) > 12 && (
               <p className="text-[10px] text-text-muted leading-relaxed font-medium">
                 Note : Un écart de {Math.abs(gap)} points indique une vision radicalement différente entre l'aspect technique et le ressenti émotionnel.
               </p>
             )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-white/5">
          <div className="space-y-4">
            <h4 className="text-[11px] font-black text-accent-primary uppercase tracking-widest flex items-center gap-2">
              <Award size={14} /> Le Regard Expert
            </h4>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/5 border-l-4 border-l-accent-primary">
              <p className="text-xs text-text-muted leading-relaxed italic">"{proConcensus}"</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-[11px] font-black text-accent-secondary uppercase tracking-widest flex items-center gap-2">
              <Users size={14} /> L'Avis du Public
            </h4>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/5 border-l-4 border-l-accent-secondary">
              <p className="text-xs text-text-muted leading-relaxed italic">"{communityConcensus}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConsensusBlock = ({ data }: { data: ConsensusData }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="glass-card p-6 border-success/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center text-success">
          <CheckCircle2 size={18} />
        </div>
        <h4 className="text-[11px] font-black uppercase tracking-widest text-success">Ce qui fait consensus</h4>
      </div>
      <ul className="space-y-3">
        {data.pros.map((item, i) => (
          <li key={i} className="text-sm text-text-main flex items-start gap-2 leading-relaxed">
            <span className="text-success mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>

    <div className="glass-card p-6 border-warning/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center text-warning">
          <Zap size={18} />
        </div>
        <h4 className="text-[11px] font-black uppercase tracking-widest text-warning">Ce qui divise</h4>
      </div>
      <ul className="space-y-3">
        {data.dividing_points.map((item, i) => (
          <li key={i} className="text-sm text-text-main flex items-start gap-2 leading-relaxed">
            <span className="text-warning mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>

    <div className="glass-card p-6 border-white/5 bg-bg-surface-light">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
          <ShieldCheck size={18} />
        </div>
        <h4 className="text-[11px] font-black uppercase tracking-widest text-text-muted">Recommandé pour</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.recommended_for.map((item, i) => (
          <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-text-main">
            {item}
          </span>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-white/5">
        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Synthèse globale</p>
        <p className="text-xs text-text-muted leading-relaxed">{data.consensus_summary}</p>
      </div>
    </div>
  </div>
);

const SummaryBriefBlock = ({ summary }: { summary: SummaryBlock }) => (
  <div className="glass-card p-6 bg-accent-primary/5 flex flex-col md:flex-row gap-8 relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
      <Info size={120} />
    </div>
    
    <div className="flex-grow space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-success mb-3 flex items-center gap-2">
            <ThumbsUp size={12} /> Pourquoi ça plaît
          </h4>
          <ul className="space-y-2">
            {summary.why_it_pleases.map((point, i) => (
              <li key={i} className="text-sm text-text-main flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-success" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary mb-3 flex items-center gap-2">
            <AlertCircle size={12} /> Ce qui peut freiner
          </h4>
          <ul className="space-y-2">
            {summary.friction_points.map((point, i) => (
              <li key={i} className="text-sm text-text-main flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-secondary" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">En résumé</h4>
        <p className="text-sm text-text-main font-bold leading-relaxed">{summary.ideal_for}</p>
      </div>
    </div>

    <div className="md:w-64 flex-shrink-0 flex flex-col justify-center border-l border-white/5 md:pl-8">
      <p className="text-[10px] font-black uppercase tracking-widest text-accent-primary mb-3">Par où commencer ?</p>
      <div className="space-y-3">
        <h5 className="font-black text-white text-lg leading-tight uppercase">{summary.starting_point.title}</h5>
        <p className="text-xs text-text-muted leading-relaxed line-clamp-2 italic">"{summary.starting_point.description}"</p>
        <Link to={`/${summary.starting_point.type === 'album' ? 'album' : 'morceau'}/${summary.starting_point.id}`} className="mt-2 text-[10px] font-black text-accent-primary uppercase tracking-widest flex items-center gap-2 hover:underline">
          Accéder au contenu <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    const scrollTarget = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
      const main = document.querySelector('main');
      if (main) main.scrollTo(0, 0);
    };

    scrollTarget();
    // Immediate and delayed scroll to handle animations and layout shifts
    const handle = requestAnimationFrame(scrollTarget);
    const timer = setTimeout(scrollTarget, 100);
    return () => {
      cancelAnimationFrame(handle);
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
};

const SafeImage = ({ 
  src, 
  alt, 
  className, 
  fallbackType = 'album',
  ...props 
}: { 
  src?: string, 
  alt?: string, 
  className?: string, 
  fallbackType?: 'artist' | 'album' | 'track' | 'user' | 'list' | 'musical_premium'
} & React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [retryCount, setRetryCount] = React.useState(0);

  const getFallback = () => {
    const fallbacks = {
      artist: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
      album: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800',
      track: 'https://images.unsplash.com/photo-1487180144669-ebf7df964979?auto=format&fit=crop&q=80&w=800',
      user: 'https://images.unsplash.com/photo-1550684848-86a5d8727436?auto=format&fit=crop&q=80&w=200',
      list: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
      musical_premium: 'https://images.unsplash.com/photo-1514525253361-bee8a187499b?auto=format&fit=crop&q=80&w=800',
    };
    return fallbacks[fallbackType] || fallbacks.album;
  };

  React.useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setRetryCount(0);

    // Safety timeout to ensure loader doesn't get stuck forever
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [src]);

  const finalSrc = isError || !src ? getFallback() : src;

  return (
    <div className={`relative overflow-hidden bg-bg-surface-light ${className}`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-bg-surface-light animate-pulse flex items-center justify-center z-10"
          >
            <Zap size={24} className="text-accent-primary/20" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Last resort fallback: a stylized gradient if everything fails */}
      <div className="absolute inset-0 premium-gradient opacity-10" />
      
      <motion.img
        key={finalSrc}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} // Force opacity 1, we rely on the loader overlay hiding it
        transition={{ duration: 0.5 }}
        src={finalSrc}
        alt={alt}
        className="w-full h-full object-cover relative z-0"
        onError={() => {
          if (!isError) {
            setIsError(true);
            setIsLoading(true);
          } else if (retryCount < 2) {
            setRetryCount(prev => prev + 1);
            setIsLoading(true);
          } else {
            setIsLoading(false);
          }
        }}
        onLoad={() => setIsLoading(false)}
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
};

const Badge = ({ children, variant = 'default', ...props }: { children: React.ReactNode, variant?: 'default' | 'premium' | 'success' | 'warning', [key: string]: any }) => {
  const styles = {
    default: 'bg-bg-surface-light text-text-muted',
    premium: 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30',
    success: 'bg-success/20 text-success border border-success/30',
    warning: 'bg-warning/20 text-warning border border-warning/30',
  };
  return (
    <span {...props} className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[variant]}`}>
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
  <motion.div whileHover={{ y: -8 }} className="glass-card overflow-hidden cursor-pointer group flex flex-col h-full border border-white/5 hover:border-accent-primary/30">
    <Link to={`/artiste/${artist.slug}`} className="flex flex-col h-full">
      <div className="aspect-[16/10] overflow-hidden relative">
        <SafeImage 
          src={artist.cover_image_url} 
          alt={artist.name} 
          fallbackType="artist"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/20 to-transparent opacity-60" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant="premium">{artist.entry_level}</Badge>
          <Badge variant="default">{artist.primary_genres[0]}</Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="bg-bg-main/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-xl">
            <TrendingUp size={12} className="text-accent-primary" />
            <span className="text-[10px] font-black text-white">{artist.consensus_score}% Consensus</span>
          </div>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-black text-xl group-hover:text-accent-primary transition-colors leading-tight mb-2">{artist.name}</h3>
        <p className="text-text-muted text-sm line-clamp-2 mb-6 font-medium leading-relaxed italic">"{artist.short_bio}"</p>
        
        <div className="mt-auto space-y-3">
          <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-text-muted">
             <span>Polarisation critique</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${artist.polarization_score}%` }}
              className={`h-full ${artist.polarization_score > 60 ? 'bg-accent-secondary' : 'bg-accent-primary'}`} 
            />
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const AlbumCard = ({ album, compact = false }: { album: Album, compact?: boolean, key?: React.Key }) => (
  <motion.div whileHover={{ scale: 1.02 }} className={`glass-card cursor-pointer group overflow-hidden border border-white/5 hover:border-accent-secondary/30 ${compact ? 'p-3' : 'p-4'}`}>
    <Link to={`/album/${album.slug}`} className="flex gap-4 items-center">
      <div className={`${compact ? 'w-16 h-16' : 'w-28 h-28'} rounded-xl overflow-hidden flex-shrink-0 shadow-lg relative`}>
        <SafeImage 
          src={album.cover_url} 
          alt={album.title} 
          fallbackType="album"
          className="w-full h-full object-cover transition-transform group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="default" className="scale-75 origin-left">{new Date(album.release_date).getFullYear()}</Badge>
          <div className="text-[9px] font-black text-accent-secondary uppercase tracking-widest">{album.coherence_score}% Cohérence</div>
        </div>
        <h4 className={`font-black text-text-main truncate group-hover:text-accent-secondary transition-colors leading-tight ${compact ? 'text-base' : 'text-xl'}`}>{album.title}</h4>
        <p className="text-text-muted text-xs font-bold truncate mb-3">{album.artist_name}</p>
        
        {!compact && (
          <div className="flex items-center gap-4">
             <div className="flex flex-col">
               <span className="text-[8px] font-black uppercase text-text-muted">Critique</span>
               <span className="text-sm font-black text-white">{album.critic_score}</span>
             </div>
             <div className="flex flex-col">
               <span className="text-[8px] font-black uppercase text-text-muted">Public</span>
               <span className="text-sm font-black text-accent-secondary">{album.community_score}</span>
             </div>
          </div>
        )}
      </div>
    </Link>
  </motion.div>
);

const TrackCard = ({ track }: { track: Track, key?: React.Key }) => (
  <motion.div whileHover={{ x: 4 }} className="glass-card flex items-center justify-between cursor-pointer group border-l-4 border-accent-secondary hover:border-accent-primary transition-all overflow-hidden h-24">
    <Link to={`/morceau/${track.slug}`} className="flex items-center justify-between w-full h-full px-6">
      <div className="flex items-center gap-6 h-full py-2">
        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg relative flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
           <SafeImage 
             src={track.image_url || track.album_cover_url} 
             alt={track.title} 
             fallbackType="track"
             className="w-full h-full object-cover" 
           />
           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/link:opacity-100 transition-opacity flex items-center justify-center">
              <PlayCircle size={24} className="text-white" />
           </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[8px] font-black text-accent-secondary uppercase tracking-widest px-1.5 py-0.5 rounded bg-accent-secondary/10">{track.dominant_feeling}</span>
            {track.is_best_entry_track && <span className="text-[8px] font-black text-accent-primary uppercase tracking-tighter">Incontournable</span>}
          </div>
          <h4 className="font-black text-lg group-hover:text-accent-secondary transition-colors leading-tight truncate max-w-[200px]">{track.title}</h4>
          <p className="text-[10px] text-text-muted uppercase font-black tracking-widest truncate">{track.artist_name} • {track.access_level}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <div className="text-sm font-black text-accent-secondary">{track.quick_consensus_score}%</div>
          <div className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Consensus</div>
        </div>
        <ChevronRight size={18} className="text-text-muted group-hover:translate-x-1 group-hover:text-text-main transition-all" />
      </div>
    </Link>
  </motion.div>
);

const ReviewCard = ({ review, isReaderPremium = false, compact = false, index = 0, ...props }: { review: Review, isReaderPremium?: boolean, compact?: boolean, index?: number, [key: string]: any }) => {
  const isLocked = !isReaderPremium && review.quality_score > 90;
  const isAltLayout = index % 3 === 1;
  const isDeepLayout = index % 3 === 2;

  return (
    <div {...props} className={`glass-card relative overflow-hidden group transition-all duration-700 border-white/5 hover:border-accent-primary/30 ${compact ? 'p-6' : 'p-10 md:p-14'} ${isDeepLayout ? 'bg-gradient-to-br from-bg-surface to-bg-main shadow-2xl ring-1 ring-white/10' : ''}`}>
      {/* Background Accent for variety */}
      {isAltLayout && !compact && (
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-primary/5 blur-[100px] pointer-events-none rounded-full" />
      )}
      
      {/* Header Section */}
      <div className={`flex flex-col md:flex-row md:items-start justify-between gap-10 mb-12`}>
        <div className="flex items-center gap-6">
          <Link to={`/profil/${review.user_slug || review.user_id}`} className="relative block transform group-hover:scale-105 transition-transform duration-500">
            <SafeImage 
              src={review.user_avatar} 
              alt={review.user_display_name} 
              fallbackType="user"
              className="w-16 h-16 rounded-[1.25rem] object-cover border-4 border-white/5 shadow-2xl ring-4 ring-bg-main/50" 
            />
            {review.user_premium_status && (
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-xl premium-gradient flex items-center justify-center shadow-2xl border-4 border-bg-main">
                <Award size={14} className="text-white" />
              </div>
            )}
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link to={`/profil/${review.user_slug || review.user_id}`} className="font-black text-xl text-white tracking-tight hover:text-accent-primary transition-colors underline decoration-white/10 decoration-2 underline-offset-4">{review.user_display_name}</Link>
              {review.user_premium_status ? (
                <Badge variant="premium">Elite</Badge>
              ) : (
                <Badge variant="default">Membre</Badge>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-black uppercase tracking-widest text-text-muted">
              <span className="text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded italic">{review.user_expertise || 'Contributeur'}</span>
              <span className="flex items-center gap-2">
                <Info size={10} className="opacity-40" />
                {new Date(review.published_at).toLocaleDateString('fr-FR')}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary/40 shrink-0" />
              <Link to={`/${review.target_type === 'artist' ? 'artiste' : review.target_type === 'album' ? 'album' : 'morceau'}/${review.target_slug}`} className="text-white/60 hover:text-accent-secondary transition-colors font-bold border-b border-transparent hover:border-accent-secondary/30">
                {review.target_name}
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 self-end md:self-start bg-white/5 p-4 rounded-3xl border border-white/5 backdrop-blur-md">
          <div className="text-right">
            <div className={`text-4xl font-black leading-none flex items-baseline gap-1 ${review.rating_overall >= 4 ? 'text-accent-primary' : 'text-white'}`}>
              {review.rating_overall}<span className="text-sm text-text-muted font-bold tracking-normal">/5</span>
            </div>
            <div className="text-[9px] font-black text-text-muted uppercase tracking-widest mt-2">Note Avis</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-right">
            <div className="text-2xl font-black text-white leading-none">{review.quality_score}%</div>
            <div className="text-[9px] font-black text-text-muted uppercase tracking-widest mt-2">Précision</div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-12 relative z-10">
        <div className="space-y-6">
          {review.title && <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-[1.1] max-w-4xl">{review.title}</h3>}
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="premium" className="bg-accent-primary/20 text-accent-primary border-accent-primary/30 uppercase tracking-widest text-[9px] px-3 py-1.5">{review.selections.impression}</Badge>
            <Badge variant="default" className="uppercase tracking-widest text-[9px] px-3 py-1.5">{review.selections.feeling}</Badge>
            <Badge variant="success" className="uppercase tracking-widest text-[9px] px-3 py-1.5">{review.selections.accessibility}</Badge>
            {review.tone && <Badge variant="warning" className="uppercase tracking-widest text-[9px] px-3 py-1.5">{review.tone}</Badge>}
            {review.angle && <Badge variant="default" className="bg-white/5 border-white/10 uppercase tracking-widest text-[9px] px-3 py-1.5 italic">Analyse {review.angle}</Badge>}
          </div>
        </div>

        {!compact && (
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative ${isLocked ? 'max-h-64 overflow-hidden mask-fade-bottom' : ''}`}>
             {isLocked && (
               <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-bg-main via-bg-main/60 to-transparent z-20 pointer-events-none" />
             )}

            <div className="space-y-12">
              <ReviewSection 
                label="Le verdict en quelques mots" 
                content={review.justifications.why_words} 
                icon={<MessageSquare size={16} />} 
              />
              <ReviewSection 
                label="L'étincelle ou le bémol" 
                content={review.justifications.key_element} 
                icon={<Zap size={16} />} 
                className="bg-accent-primary/5 border border-accent-primary/10 rounded-3xl p-8"
              />
            </div>
            <div className="space-y-12">
              <ReviewSection 
                label="À qui s'adresse cette œuvre ?" 
                content={review.justifications.recommendation} 
                icon={<Users size={16} />} 
              />
              <ReviewSection 
                label="Conseil d'entrée" 
                content={review.justifications.entry_point} 
                icon={<ArrowRight size={16} />} 
                color="text-accent-secondary font-black"
                className="bg-accent-secondary/5 border border-accent-secondary/10 rounded-3xl p-8"
              />
            </div>

            {isLocked && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-12 px-6">
                <div className="glass-card p-10 max-w-lg w-full text-center space-y-8 bg-bg-surface/80 blur-backdrop border-accent-primary/30 shadow-[0_0_50px_rgba(139,92,246,0.3)]">
                  <div className="space-y-4">
                     <div className="w-16 h-16 bg-accent-primary/20 rounded-2xl flex items-center justify-center mx-auto text-accent-primary mb-4">
                        <Lock size={32} />
                     </div>
                     <h4 className="text-xl font-black uppercase tracking-tight">Analyse Approfondie Masquée</h4>
                     <p className="text-text-muted leading-relaxed text-sm">
                       Cet avis de qualité <strong>({review.quality_score}%)</strong> contient des arguments détaillés réservés aux membres ÉCHO Premium.
                     </p>
                  </div>
                  <Link to="/premium" className="w-full premium-gradient px-10 py-5 rounded-2xl font-black text-sm shadow-2xl hover:scale-[1.03] transition-all flex items-center justify-center gap-3 text-white uppercase tracking-widest">
                    Débloquer l'Analyse <ShieldCheck size={20} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {compact && isLocked && (
          <div className="bg-bg-surface-light p-6 rounded-3xl border border-white/10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center text-warning">
                <Lock size={18} />
              </div>
              <p className="text-xs font-bold text-text-muted leading-relaxed">
                Passez premium pour lire l'analyse complète de {review.quality_score}%
              </p>
            </div>
            <Link to="/premium" className="bg-accent-primary/10 text-accent-primary px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all whitespace-nowrap">
              DÉBLOQUER
            </Link>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className={`mt-14 pt-10 border-t border-white/10 flex flex-wrap items-center justify-between gap-10`}>
        <div className="flex items-center gap-12">
          <button className="flex items-center gap-3 text-xs font-black text-text-muted hover:text-accent-primary transition-colors group uppercase tracking-widest">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent-primary/10 transition-all">
              <ThumbsUp size={20} className="group-hover:scale-110 group-hover:text-accent-primary transition-all" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-white text-lg font-black mb-1">{review.helpful_count}</span>
              <span>Jugé Utile</span>
            </div>
          </button>
          
          <button className="flex items-center gap-3 text-xs font-black text-text-muted hover:text-accent-secondary transition-colors group uppercase tracking-widest">
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent-secondary/10 transition-all">
                <Share2 size={20} />
             </div>
             <div className="flex flex-col items-start leading-none">
              <span className="text-white font-bold mb-1">Partager</span>
              <span>L'Insight</span>
            </div>
          </button>
        </div>
        <div className="flex items-center gap-4">
          {isLocked ? (
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-warning/10 text-warning text-[10px] font-black uppercase tracking-widest border border-warning/20 shadow-sm shadow-warning/10">
              <Lock size={10} /> Extrait Verrouillé
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-success/10 text-success text-[10px] font-black uppercase tracking-widest border border-success/20 shadow-sm shadow-success/10">
              <ShieldCheck size={10} /> Analyse Complète
            </div>
          )}
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 text-text-muted text-[10px] font-black uppercase tracking-widest border border-white/10 opacity-60">
            Audit Echo
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewSection = ({ label, content, icon, color = 'text-text-muted', className = '' }: { label: string, content: string, icon: React.ReactNode, color?: string, className?: string }) => (
  <div className={`space-y-4 ${className}`}>
    <div className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest ${color}`}>
      <div className="opacity-60">{icon}</div>
      <span className="opacity-80">{label}</span>
    </div>
    <p className="text-sm text-text-main leading-relaxed font-bold italic opacity-90 border-l-2 border-white/10 pl-6">{content}</p>
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

const ExploreScreen = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [search, setSearch] = React.useState(initialQuery);
  const [activeTab, setActiveTab] = React.useState<'artists' | 'albums' | 'tracks'>('artists');
  const [filters, setFilters] = React.useState({
    genre: 'all',
    accessibility: 'all',
    consensus: 'all',
    sort: 'relevant'
  });

  const filteredArtists = mockArtists.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || 
                          a.primary_genres.some(g => g.toLowerCase().includes(search.toLowerCase())) ||
                          a.top_tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesGenre = filters.genre === 'all' || a.primary_genres.some(g => g === filters.genre);
    const matchesAccess = filters.accessibility === 'all' || a.entry_level === filters.accessibility;
    const matchesConsensus = filters.consensus === 'all' || (
      filters.consensus === 'high' ? a.consensus_score >= 80 : a.consensus_score < 80
    );
    return matchesSearch && matchesGenre && matchesAccess && matchesConsensus;
  });

  const filteredAlbums = mockAlbums.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || 
                          a.artist_name.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = filters.genre === 'all' || a.genres.includes(filters.genre);
    const matchesAccess = filters.accessibility === 'all' || (
      filters.accessibility === 'Immédiat' ? a.accessibility_score >= 80 :
      filters.accessibility === 'Accessible' ? a.accessibility_score >= 60 && a.accessibility_score < 80 :
      filters.accessibility === 'Intermédiaire' ? a.accessibility_score >= 40 && a.accessibility_score < 60 :
      a.accessibility_score < 40
    );
    return matchesSearch && matchesGenre && matchesAccess;
  });

  const filteredTracks = mockTracks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          t.artist_name.toLowerCase().includes(search.toLowerCase()) ||
                          t.community_keywords.some(kw => kw.toLowerCase().includes(search.toLowerCase()));
    const matchesAccess = filters.accessibility === 'all' || t.access_level === filters.accessibility;
    return matchesSearch && matchesAccess;
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
              placeholder="Rechercher par nom, genre, ou mot-clé critique (#vintage, #lourdeur, #lyriciste)..." 
              className="w-full bg-bg-surface border border-white/10 rounded-3xl py-8 pl-18 pr-8 text-2xl font-medium focus:outline-none focus:border-accent-primary/50 transition-all shadow-2xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filters Bar */}
        <div className="glass-card p-6 flex flex-wrap items-center gap-8 border-white/5">
          <div className="flex items-center gap-2 text-accent-primary">
            <Filter size={18} />
            <span className="text-xs font-black uppercase tracking-widest">Guide Discovery</span>
          </div>
          
          <div className="h-8 w-px bg-white/10 hidden md:block" />

          <FilterGroup 
            label="Genre" 
            value={filters.genre} 
            options={[
              {id: 'all', label: 'Tous les genres'},
              {id: 'Pop', label: 'Pop'},
              {id: 'Indie Rock', label: 'Indie Rock'},
              {id: 'Hip-hop', label: 'Hip-hop / Rap'},
              {id: 'Electronic', label: 'Electronic'}
            ]} 
            onChange={(v) => setFilters({...filters, genre: v})} 
          />

          <FilterGroup 
            label="Niveau d'accès" 
            value={filters.accessibility} 
            options={[
              {id: 'all', label: 'Toutes les portes'},
              {id: 'Immédiat', label: 'Immédiat'},
              {id: 'Accessible', label: 'Accessible'},
              {id: 'Intermédiaire', label: 'Intermédiaire'},
              {id: 'Exigeant', label: 'Exigeant'}
            ]} 
            onChange={(v) => setFilters({...filters, accessibility: v})} 
          />

          <FilterGroup 
            label="Consensus" 
            value={filters.consensus} 
            options={[
              {id: 'all', label: 'Indifférent'},
              {id: 'high', label: 'Plébiscite (>80%)'},
              {id: 'divisive', label: 'Polémiqué (<80%)'}
            ]} 
            onChange={(v) => setFilters({...filters, consensus: v})} 
          />

          <div className="ml-auto">
            <FilterGroup 
              label="Trier par" 
              value={filters.sort} 
              options={[
                {id: 'relevant', label: 'Pertinence critique'},
                {id: 'score', label: 'Meilleurs scores'},
                {id: 'polarization', label: 'Plus discutés'}
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

      <div className="min-h-[400px]">
        {search && (
          <div className="mb-12">
            <SectionTitle subtitle="Analyses croisées basées sur votre recherche">Focus : {search}</SectionTitle>
          </div>
        )}
        
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAlbums.length > 0 ? (
                  filteredAlbums.map(a => <div key={a.id}><AlbumCard album={a} /></div>)
                ) : (
                  <EmptyResults />
                )}
              </div>
            )}

            {activeTab === 'tracks' && (
              <div className="max-w-4xl space-y-4 mx-auto">
                {filteredTracks.length > 0 ? (
                  filteredTracks.map(t => <TrackCard key={t.id} track={t} />)
                ) : (
                  <EmptyResults />
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* SI VOUS AIMEZ... ESSAYEZ ÇA */}
        {!search && activeTab === 'artists' && (
          <section className="mt-24 space-y-12">
            <div className="flex border-t border-white/5 pt-12">
               <SectionTitle subtitle="Recommandations algorithmiques d'Echo">Si vous aimez ça, essayez ceci</SectionTitle>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="glass-card p-12 bg-gradient-to-br from-accent-primary/10 to-transparent border-accent-primary/20 space-y-8 relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                    <TrendingUp size={200} />
                  </div>
                  <div className="flex items-center gap-3 text-accent-primary relative z-10">
                    <Zap size={24} />
                    <span className="text-xs font-black uppercase tracking-widest">Le Match Discovery</span>
                  </div>
                  <div className="flex justify-between items-center relative z-10 px-4">
                    <div className="text-center space-y-3">
                       <SafeImage src={mockArtists[1].cover_image_url} className="w-24 h-24 rounded-full object-cover border-4 border-accent-primary/30 shadow-2xl group-hover:scale-110 transition-transform" fallbackType="artist" />
                       <div className="text-[10px] font-black uppercase text-white tracking-widest">{mockArtists[1].name}</div>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                       <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-accent-secondary/50 to-transparent rounded-full" />
                       <div className="text-[11px] font-black text-accent-secondary uppercase tracking-[0.2em]">88% MÉLODIQUE</div>
                       <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-accent-secondary/50 to-transparent rounded-full" />
                    </div>
                    <div className="text-center space-y-3">
                       <SafeImage src={mockArtists[4].cover_image_url} className="w-24 h-24 rounded-full object-cover border-4 border-accent-secondary/30 shadow-2xl group-hover:scale-110 transition-transform" fallbackType="artist" />
                       <div className="text-[10px] font-black uppercase text-white tracking-widest">{mockArtists[4].name}</div>
                    </div>
                  </div>
                  <p className="text-base text-text-muted leading-relaxed font-medium relative z-10">
                    "Bien que séparés par des années de production, ces deux univers partagent une science du riff synthétique et une mélancolie solaire typiquement européenne."
                  </p>
                  <button className="bg-accent-primary text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-transform w-full relative z-10">
                    DÉCOUVRIR LE PARCOURS COMMUN
                  </button>
               </div>

               <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted block mb-4">Focus Critique : Consensus ou Clivage ?</h4>
                  {[
                    { title: "Justice : Toujours pertinent en 2024 ?", desc: "Analyse du dernier album Hyperdrama face à l'héritage de Cross.", type: 'Analysis' },
                    { title: "Angèle : Le triomphe de la pop efficace", desc: "Comment Brol est devenu un modèle de structure pop pour toute une génération.", type: 'Review' },
                    { title: "Damso : L'obscurité qui rassemble", desc: "Pourquoi Ipséité reste l'album le plus discuté de la décennie.", type: 'Insight' }
                  ].map((item, i) => (
                    <div key={i} className="glass-card p-6 border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-black text-accent-secondary uppercase tracking-widest">{item.type}</span>
                        <ArrowRight size={14} className="text-text-muted group-hover:text-accent-secondary group-hover:translate-x-1 transition-all" />
                      </div>
                      <h5 className="font-black text-white mb-2">{item.title}</h5>
                      <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
          </section>
        )}
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
                  <SafeImage src={a.cover_image_url} className="w-10 h-10 rounded-full object-cover" fallbackType="artist" />
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
      <ScrollToTop />
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
          <NavItem to="/explorer" icon={<Search size={20} />} label="Explorer" active={location.pathname.startsWith('/explorer')} />
          <NavItem to="/avis" icon={<MessageSquare size={20} />} label="Avis" active={location.pathname.startsWith('/avis')} />
          <NavItem to="/listes" icon={<ListMusic size={20} />} label="Listes" active={location.pathname.startsWith('/listes')} />
          <NavItem to="/communaute" icon={<Users size={20} />} label="Communauté" active={location.pathname.startsWith('/communaute')} />
          <NavItem to="/profil" icon={<UserIcon size={20} />} label="Profil" active={location.pathname.startsWith('/profil')} />
        </div>

        <div className="mt-10 space-y-6">
          <div className="px-2">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4">Récemment vus</h3>
            <div className="space-y-3">
              {mockArtists.slice(0, 2).map(artist => (
                <Link key={artist.id} to={`/artiste/${artist.slug}`} className="flex items-center gap-3 group">
                  <SafeImage src={artist.cover_image_url} className="w-8 h-8 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all" fallbackType="artist" />
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
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/explorer" element={<ExploreScreen />} />
              <Route path="/explore" element={<Navigate to="/explorer" replace />} />
              <Route path="/avis" element={<ReviewsPage isPremium={isPremium} />} />
              <Route path="/listes" element={<ListsPage />} />
              <Route path="/parcours" element={<Navigate to="/listes" replace />} />
              <Route path="/parcours/:slug" element={<ListPage />} />
              <Route path="/communaute" element={<CommunityPage />} />
              <Route path="/profil" element={<ProfilePage isPremium={isPremium} setIsPremium={setIsPremium} />} />
              <Route path="/profil/:slug" element={<ProfilePage isPremium={isPremium} setIsPremium={setIsPremium} />} />
              <Route path="/premium" element={<PremiumPage isPremium={isPremium} setIsPremium={setIsPremium} />} />
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
        <MobileNavItem to="/explorer" icon={<Search size={24} />} active={location.pathname.startsWith('/explorer')} />
        <MobileNavItem to="/avis" icon={<MessageSquare size={24} />} active={location.pathname.startsWith('/avis')} />
        <MobileNavItem to="/listes" icon={<ListMusic size={24} />} active={location.pathname.startsWith('/listes')} />
        <MobileNavItem to="/communaute" icon={<Users size={24} />} active={location.pathname.startsWith('/communaute')} />
        <MobileNavItem to="/profil" icon={<UserIcon size={24} />} active={location.pathname.startsWith('/profil')} />
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
    <div className="space-y-24 pb-20">
      <header className="space-y-12 pt-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent-primary/10 border border-accent-primary/20 rounded-full text-accent-primary text-[10px] font-black uppercase tracking-widest">
              <MessageSquare size={14} /> Intelligence Collective
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
              LE REGARD <br />
              <span className="text-accent-primary">DE LA COMMUNAUTÉ.</span>
            </h1>
            <p className="text-text-muted text-xl md:text-2xl font-medium leading-relaxed max-w-2xl">
              Plus que des notes, des analyses structurées pour comprendre la démarche, les clivages et l'impact de chaque œuvre.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 flex-shrink-0">
            <div className="glass-card px-8 py-6 text-center border-white/5 bg-gradient-to-br from-white/5 to-transparent shadow-2xl">
              <div className="text-3xl font-black text-white">{mockReviews.length}</div>
              <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Avis d'experts</div>
            </div>
            <div className="glass-card px-8 py-6 text-center border-white/5 bg-gradient-to-br from-white/5 to-transparent shadow-2xl">
              <div className="text-3xl font-black text-accent-primary">{mockUsers.length}</div>
              <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Contributeurs</div>
            </div>
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-white/5">
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform">
              <TrendingUp size={18} />
            </div>
            <div className="text-xs">
              <span className="text-text-muted font-bold block uppercase tracking-widest text-[9px]">Tendance</span>
              <span className="text-white font-black truncate max-w-[200px] block">L'impact de la synth-pop en 2024</span>
            </div>
          </div>
          <div className="w-px h-8 bg-white/5 hidden md:block" />
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full bg-accent-secondary/10 flex items-center justify-center text-accent-secondary group-hover:scale-110 transition-transform">
              <Award size={18} />
            </div>
            <div className="text-xs">
              <span className="text-text-muted font-bold block uppercase tracking-widest text-[9px]">Avis d'Or</span>
              <span className="text-white font-black truncate max-w-[200px] block">Justine M. sur "Neon Nights"</span>
            </div>
          </div>
          <div className="w-px h-8 bg-white/5 hidden md:block" />
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success group-hover:scale-110 transition-transform">
               <Zap size={18} />
            </div>
            <div className="text-xs">
              <span className="text-text-muted font-bold block uppercase tracking-widest text-[9px]">Dernier Débat</span>
              <span className="text-white font-black truncate max-w-[200px] block">12 commentaires sur "The Void"</span>
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
        <div className={`grid ${viewMode === 'compact' ? 'grid-cols-1 md:grid-cols-2 gap-8' : 'grid-cols-1 gap-20'}`}>
          {filteredReviews.map((review, idx) => (
            <motion.div 
              layout
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ReviewCard review={review} isReaderPremium={isPremium} compact={viewMode === 'compact'} index={idx} />
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
    <div className="space-y-24">
      <header className="space-y-8 pt-10 relative">
        <div className="space-y-6">
          <Badge variant="premium">Echo Intelligence</Badge>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.82] uppercase text-white">
            MAÎTRISEZ VOTRE <br />
            <span className="text-accent-primary italic">ÉCOUTE.</span>
          </h1>
          <p className="text-text-muted text-xl md:text-2xl max-w-2xl font-medium leading-relaxed">
            Echo n'est pas qu'une plateforme de découverte. C'est l'assistant critique qui vous donne les clés pour comprendre, comparer et juger n'importe quel univers musical.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative max-w-4xl group">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-primary transition-colors" size={24} />
            <input 
              type="text" 
              placeholder="Rechercher par #style, #mood ou nom d'artiste..." 
              className="w-full bg-bg-surface border border-white/10 rounded-[2.5rem] py-8 pl-16 pr-8 text-xl font-medium focus:outline-none focus:border-accent-primary/50 transition-all shadow-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 premium-gradient text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95">
              ANALYSER
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-4 pt-4">
          {['#vintage', '#hypnotique', '#production-brute', '#écriture-ciselée'].map(tag => (
            <button key={tag} onClick={() => { setSearchQuery(tag); navigate(`/explorer?q=${encodeURIComponent(tag)}`); }} className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] hover:text-accent-secondary transition-colors cursor-pointer">
              {tag}
            </button>
          ))}
        </div>
      </header>

      {/* Featured Entry Points */}
      <section className="space-y-12">
        <div className="flex items-end justify-between border-b border-white/5 pb-8">
           <SectionTitle subtitle="Les portes d'entrée les plus accessibles de la plateforme">Par où commencer ?</SectionTitle>
           <div className="flex gap-4">
             <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"><ChevronLeft size={20} /></button>
             <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"><ChevronRight size={20} /></button>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockAlbums.filter(a => a.is_entry_album).slice(0, 4).map(album => <AlbumCard key={album.id} album={album} compact />)}
        </div>
      </section>

      {/* Mid-page Break: Community List Spotlight */}
      <section className="relative overflow-hidden rounded-[3.5rem] bg-gradient-to-br from-bg-surface to-bg-main border border-white/10 p-12 md:p-20 shadow-2xl">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-accent-secondary/5 to-transparent pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <Badge variant="premium">Sélection Curatée</Badge>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase text-white">
              DES GUIDES <br />
              <span className="text-accent-secondary">THÉMATIQUES.</span>
            </h2>
            <p className="text-text-muted text-lg font-medium leading-relaxed">
              Nos experts ne se contentent pas de lister. Ils construisent des parcours de découverte pour vous aider à appréhender des discographies complexes.
            </p>
            <div className="flex gap-4 pt-4">
              <Link to="/listes" className="premium-gradient px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl hover:scale-105 transition-transform">Explorer les guides</Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {mockLists.slice(0, 2).map(list => (
              <Link key={list.id} to={`/liste/${list.slug}`} className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 hover:border-accent-secondary/40 transition-all flex items-center gap-8 group">
                <SafeImage src={list.image_url} className="w-24 h-24 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform" fallbackType="album" />
                <div className="flex-grow">
                  <div className="text-[10px] font-black text-accent-secondary uppercase tracking-[0.2em] mb-2">{list.category}</div>
                  <h3 className="text-xl font-black group-hover:text-white transition-colors">{list.title}</h3>
                </div>
                <ArrowRight size={24} className="text-text-muted group-hover:text-accent-secondary group-hover:translate-x-2 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Analysis Sections */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-8 space-y-16">
          <SectionTitle subtitle="Analyses certifiées par le comité de rédaction Echo">Analyses à ne pas manquer</SectionTitle>
          <div className="space-y-12">
            {mockReviews.slice(0, 3).map(review => <ReviewCard key={review.id} review={review} />)}
          </div>
          <Link to="/avis" className="bg-white/5 border border-white/10 w-full py-5 rounded-3xl font-black text-sm flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
             VOIR TOUS LES AVIS QUALIFIÉS <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="lg:col-span-4 sticky top-24 h-fit space-y-12">
          <div className="space-y-8">
            <SectionTitle subtitle="Ils font l'actualité critique">À suivre</SectionTitle>
            <div className="space-y-6">
              {mockArtists.slice(4, 7).map(artist => (
                <Link key={artist.id} to={`/artiste/${artist.slug}`} className="flex items-center gap-4 group">
                   <div className="relative">
                     <SafeImage src={artist.cover_image_url} className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all shadow-lg" fallbackType="artist" />
                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-primary rounded-full border-2 border-bg-main" />
                   </div>
                   <div className="flex-grow">
                     <div className="font-black text-sm group-hover:text-accent-primary transition-colors">{artist.name}</div>
                     <div className="text-[9px] font-black text-text-muted uppercase tracking-widest">{artist.primary_genres[0]} • {artist.consensus_score}% Consensus</div>
                   </div>
                   <ChevronRight size={16} className="text-text-muted group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          <div className="glass-card p-10 border-accent-secondary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><MessageSquare size={120} /></div>
            <h3 className="text-xl font-black mb-4">Contribuez à l'intelligence de la plateforme.</h3>
            <p className="text-text-muted text-sm font-medium leading-relaxed mb-8">
              Partagez vos impressions structurées pour aider les autres à s'orienter dans la jungle des sorties.
            </p>
            <Link to="/explorer" className="bg-accent-secondary px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white shadow-xl hover:shadow-accent-secondary/20 transition-all w-full flex items-center justify-center">CRÉER UNE ANALYSE</Link>
          </div>
        </div>
      </section>
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
    <div className="space-y-16 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-bold text-sm mb-8">
          <ChevronLeft size={20} /> RETOUR
        </button>

        <header className="relative rounded-[3rem] overflow-hidden aspect-[21/9] md:aspect-[4/1] shadow-2xl group border border-white/5">
          <SafeImage 
            src={artist.hero_image_url} 
            alt={artist.name} 
            fallbackType="artist"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-white">{artist.name}</h1>
                <AccessLevelBadge level={artist.entry_level} />
              </div>
              <div className="flex flex-wrap gap-3">
                {artist.primary_genres.map(g => <Badge key={g} variant="default">{g}</Badge>)}
                {artist.top_tags.map(t => <span key={t} className="text-[10px] font-black text-accent-secondary uppercase tracking-widest">#{t}</span>)}
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl font-black text-sm flex items-center gap-3 border border-white/10 hover:bg-white/20 transition-all">
                <Share2 size={20} />
              </button>
              <button className="premium-gradient px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 shadow-lg hover:scale-105 transition-transform">
                <PlusCircle size={20} /> SUIVRE L'ARTISTE
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-16">
            
            {/* Quick Summary Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <Sparkles size={24} className="text-accent-primary" />
                <h2 className="text-xl font-black uppercase tracking-widest">En Bref</h2>
              </div>
              <SummaryBriefBlock summary={artist.summary} />
            </section>

            {/* Points d'entrée différenciés */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <Compass size={24} className="text-accent-secondary" />
                <h2 className="text-xl font-black uppercase tracking-widest">Différencier les points d'entrée</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Le plus accessible", id: artist.discography_matrix?.entry_point_id, icon: <PlayCircle size={16} />, color: 'bg-emerald-500/10 text-emerald-400' },
                  { label: "Le plus acclamé", id: artist.discography_matrix?.masterpiece_id, icon: <Award size={16} />, color: 'bg-accent-primary/10 text-accent-primary' },
                  { label: "Le plus représentatif", id: artist.essential_works_ids[0]?.id, icon: <Target size={16} />, color: 'bg-accent-secondary/10 text-accent-secondary' },
                  { label: "La meilleure porte", id: artist.summary.starting_point.id, icon: <Headphones size={16} />, color: 'bg-amber-500/10 text-amber-400' }
                ].map((point, i) => {
                  const album = mockAlbums.find(a => a.id === point.id) || mockAlbums.find(a => a.id === artist.discography_matrix?.entry_point_id);
                  return (
                    <Link key={i} to={`/album/${album?.slug}`} className={`${point.color} p-4 rounded-2xl border border-white/5 hover:border-white/20 transition-all space-y-3 group`}>
                      <div className="flex items-center gap-2">
                        {point.icon}
                        <span className="text-[9px] font-black uppercase tracking-widest">{point.label}</span>
                      </div>
                      <div className="font-bold text-sm leading-tight line-clamp-1 group-hover:underline">{album?.title}</div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Repères Rapides */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-8 border-l-4 border-accent-secondary relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><PlayCircle size={100} /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-4">Le morceau le plus accessible</h3>
                {artist.essential_works_ids.filter(w => w.type === 'track').slice(0, 1).map(work => {
                  const track = mockTracks.find(t => t.id === work.id);
                  return (
                    <div key={work.id} className="space-y-4">
                      <div className="text-2xl font-black text-white">{track?.title || work.label}</div>
                      <p className="text-xs text-text-muted leading-relaxed line-clamp-2">{work.label}</p>
                      {track && <Link to={`/morceau/${track.slug}`} className="inline-flex items-center gap-2 text-accent-secondary text-[10px] font-black uppercase tracking-widest border-b border-accent-secondary/30 pb-1">Analyser le morceau</Link>}
                    </div>
                  );
                })}
              </div>
              <div className="glass-card p-8 border-l-4 border-accent-primary relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Award size={100} /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-4">L'album le plus acclamé</h3>
                {artist.essential_works_ids.filter(w => w.type === 'album').slice(0, 1).map(work => {
                  const album = mockAlbums.find(a => a.id === work.id);
                  return (
                    <div key={work.id} className="space-y-4">
                      <div className="text-2xl font-black text-white">{album?.title || work.label}</div>
                      <p className="text-xs text-text-muted leading-relaxed line-clamp-2">{work.label}</p>
                      {album && <Link to={`/album/${album.slug}`} className="inline-flex items-center gap-2 text-accent-primary text-[10px] font-black uppercase tracking-widest border-b border-accent-primary/30 pb-1">Explorer l'album</Link>}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Pro vs Community Block */}
            <section className="space-y-8">
              <ProVsCommunityBlock 
                proScore={artist.pro_score}
                communityScore={artist.community_score}
                proConcensus={artist.pro_consensus}
                communityConcensus={artist.community_consensus}
                gap={artist.pro_vs_community_gap}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 border-white/5 space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-accent-primary">Ce que la presse met en avant</h4>
                  <p className="text-xs text-text-muted leading-relaxed font-medium line-clamp-3">"{artist.why_it_matters}"</p>
                </div>
                <div className="glass-card p-6 border-white/5 space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-accent-secondary">Ce que les auditeurs mettent en avant</h4>
                  <p className="text-xs text-text-muted leading-relaxed font-medium line-clamp-3">"{artist.community_consensus}"</p>
                </div>
              </div>
            </section>

            {/* Consensus Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <TrendingUp size={24} className="text-accent-primary" />
                <h2 className="text-xl font-black uppercase tracking-widest">Consensus & Clivages</h2>
              </div>
              <ConsensusBlock data={artist.consensus_data} />
            </section>

            {/* Strategy of Discovery Matrix */}
            {artist.discography_matrix && (
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  <MapPin size={24} className="text-accent-secondary" />
                  <h2 className="text-xl font-black uppercase tracking-widest">Stratégie de Découverte</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: artist.discography_matrix.entry_point_id, label: "La Porte d'Entrée", desc: "L'idéal pour comprendre l'univers sans être heurté par la complexité.", icon: <PlayCircle size={20} />, color: 'accent-primary' },
                    { id: artist.discography_matrix.masterpiece_id, label: "Le Chef-d'Œuvre", desc: "Là où la technique et l'émotion atteignent leur paroxysme.", icon: <Award size={20} />, color: 'success' },
                    { id: artist.discography_matrix.experimental_id, label: "Le Virage Expérimental", desc: "Pour les auditeurs avertis cherchant la rupture.", icon: <Zap size={20} />, color: 'warning' },
                    { id: artist.discography_matrix.hidden_gem_id, label: "La Pépite Cachée", desc: "Moins accessible, mais révélatrice d'une facette rare.", icon: <Search size={20} />, color: 'accent-secondary' }
                  ].filter(m => m.id).map((m, i) => {
                    const album = mockAlbums.find(a => a.id === m.id);
                    return (
                      <div key={i} className="glass-card p-6 border-white/5 space-y-4 group hover:border-accent-primary/20 transition-all">
                        <div className="flex justify-between items-start">
                          <div className={`flex items-center gap-2 text-${m.color.split('-')[1]}`}>
                            {m.icon}
                            <span className="text-[10px] font-black uppercase tracking-widest">{m.label}</span>
                          </div>
                        </div>
                        {album && (
                          <Link to={`/album/${album.slug}`} className="flex gap-4 items-center group/link">
                            <SafeImage src={album.cover_url} className="w-16 h-16 rounded-xl object-cover shadow-lg" />
                            <div className="flex-grow min-w-0">
                              <div className="font-bold text-white truncate">{album.title}</div>
                              <p className="text-[10px] text-text-muted leading-relaxed line-clamp-2 mt-1">{m.desc}</p>
                            </div>
                            <ChevronRight size={16} className="text-text-muted group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Analysis & Polarization */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-10 border-l-4 border-l-accent-primary space-y-6">
                <div className="flex items-center gap-3">
                   <ShieldCheck size={24} className="text-accent-primary" />
                   <h3 className="text-sm font-black uppercase tracking-widest text-white">Impact Culturel</h3>
                </div>
                <p className="text-sm text-text-muted leading-relaxed font-medium">{artist.cultural_impact}</p>
              </div>
              <div className="glass-card p-10 border-l-4 border-l-accent-secondary space-y-6">
                <div className="flex items-center gap-3">
                   <TrendingUp size={24} className="text-accent-secondary" />
                   <h3 className="text-sm font-black uppercase tracking-widest text-white">Taux de Clivage</h3>
                </div>
                <PolarizationMeter score={artist.polarization_score} />
                <p className="text-[10px] text-text-muted leading-relaxed italic">
                  Méthode ÉCHO : Analyse croisée de l'écart type des notes et de la sémantique des avis.
                </p>
              </div>
            </section>

            {/* Artistes Similaires & Œuvres Essentielles */}
            <section className="space-y-10">
              <div className="flex items-center gap-3">
                <Users size={24} className="text-accent-primary" />
                <h2 className="text-xl font-black uppercase tracking-widest">Si vous aimez {artist.name}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-text-muted">Artistes Similaires</h3>
                  <div className="space-y-4">
                    {artist.similar_artists_ids.map(id => {
                      const similar = mockArtists.find(a => a.id === id);
                      if (!similar) return null;
                      return (
                        <Link key={id} to={`/artiste/${similar.slug}`} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5">
                          <SafeImage src={similar.cover_image_url} className="w-16 h-16 rounded-xl object-cover" fallbackType="artist" />
                          <div className="flex-grow">
                            <div className="font-black text-white group-hover:text-accent-primary transition-colors">{similar.name}</div>
                            <div className="text-[10px] text-text-muted uppercase tracking-widest">{similar.primary_genres[0]}</div>
                          </div>
                          <ChevronRight size={16} className="text-text-muted group-hover:translate-x-1 transition-transform" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-text-muted">Œuvres Essentielles</h3>
                  <div className="space-y-4">
                    {artist.essential_works_ids.slice(1, 4).map((work, idx) => {
                      const item = work.type === 'album' ? mockAlbums.find(a => a.id === work.id) : mockTracks.find(t => t.id === work.id);
                      if (!item) return null;
                      return (
                        <Link key={idx} to={`/${work.type === 'album' ? 'album' : 'morceau'}/${item.slug}`} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5">
                          <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${work.type === 'album' ? 'bg-accent-primary/20' : 'bg-accent-secondary/20'}`}>
                            {work.type === 'album' ? <Award className="text-accent-primary" /> : <PlayCircle className="text-accent-secondary" />}
                          </div>
                          <div className="flex-grow">
                            <div className="font-black text-white group-hover:text-accent-secondary transition-colors line-clamp-1">{item?.title || work.label}</div>
                            <div className="text-[10px] text-text-muted uppercase tracking-widest">{work.label}</div>
                          </div>
                          <ChevronRight size={16} className="text-text-muted group-hover:translate-x-1 transition-transform" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Community Reviews Section */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <SectionTitle subtitle="Analyses approfondies approuvées">Meilleurs avis à lire</SectionTitle>
                <Link to={`/avis/nouveau/artiste/${artist.id}`} className="bg-accent-primary px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity">Rédiger un avis</Link>
              </div>
              <div className="space-y-8">
                {mockReviews.filter(r => r.target_id === artist.id).slice(0, 3).map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">
              <div className="glass-card p-8 space-y-8">
                <div className="space-y-6">
                  <h3 className="font-black text-sm uppercase tracking-widest text-text-muted">Signaux Critiques</h3>
                  <div className="grid grid-cols-2 gap-8">
                    <Gauge value={artist.consensus_score} label="Consensus" />
                    <Gauge value={artist.polarization_score} label="Polarisation" color="warning" />
                  </div>
                </div>
                <div className="pt-8 border-t border-white/5">
                   <h3 className="font-black text-sm uppercase tracking-widest text-text-muted mb-6">Évolution Artistique</h3>
                   <div className="space-y-6">
                      {artist.era_breakdown.map((era, i) => (
                        <div key={i} className="space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase text-text-muted tracking-widest">
                            <span>{era.era}</span>
                            <span className="text-text-main">{era.score}%</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} 
                              whileInView={{ width: `${era.score}%` }} 
                              viewport={{ once: true }}
                              className="h-full premium-gradient" 
                            />
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
              
              <div className="glass-card p-8">
                 <h3 className="font-black text-sm uppercase tracking-widest text-text-muted mb-6">Pourquoi ça compte ?</h3>
                 <p className="text-sm text-text-main leading-relaxed font-medium">{artist.why_it_matters}</p>
                 <div className="mt-8 pt-8 border-t border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-4">Impact Culturel</h4>
                    <p className="text-xs text-text-muted leading-relaxed italic">"{artist.cultural_impact}"</p>
                 </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const TrackItem = ({ track, index }: { track: any, index: number, key?: React.Key }) => (
  <div className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-all relative overflow-hidden">
    <div className="text-xs font-black text-text-muted w-6">{String(index + 1).padStart(2, '0')}</div>
    <div className="flex-grow min-w-0">
      <div className="flex items-center gap-3">
        <Link to={`/morceau/${track.slug || track.id}`} className="font-bold text-white truncate hover:text-accent-primary transition-colors">{track.title}</Link>
        {track.is_entry_track && <Badge variant="premium">Fondamental</Badge>}
        {track.is_community_favorite && <Badge variant="success">Plébiscité</Badge>}
      </div>
      <div className="text-[10px] text-text-muted uppercase font-black mt-1 flex items-center gap-2">
        <span>{track.duration}</span>
        <span className="opacity-20">•</span>
        <span className="text-accent-primary">{track.sentiment || 'Neutre'}</span>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="text-[9px] font-black text-white/40 uppercase hidden sm:block">Parfait pour : {track.sentiment === 'Énergique' ? 'S\'ambiancer' : track.sentiment === 'Mélancolique' ? 'Le soir' : 'Découvrir'}</div>
      <ChevronRight size={14} className="text-text-muted group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

const AlbumFlowAnalysis = ({ tracks, coherence }: { tracks: any[], coherence: number }) => {
  return (
    <div className="glass-card p-10 border-t-4 border-accent-secondary">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="space-y-1">
          <h3 className="text-xl font-black uppercase tracking-widest text-white">Analyse du Projet</h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Cohérence narrative et morceaux clés</p>
        </div>
        <div className="flex gap-10">
           <div className="text-right">
            <div className="text-3xl font-black text-white">{tracks.length}</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-text-muted">Pistes</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-accent-secondary">{coherence}%</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-text-muted">Impact Global</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {tracks.map((track, i) => (
          <TrackItem key={track.id || i} track={track} index={i} />
        ))}
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
    <div className="space-y-16 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-bold text-sm mb-8">
          <ChevronLeft size={20} /> RETOUR
        </button>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="w-full lg:w-[450px] aspect-square rounded-[3rem] overflow-hidden shadow-2xl flex-shrink-0 group sticky top-24 border border-white/10">
            <SafeImage 
              src={album.cover_url} 
              alt={album.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              fallbackType="album" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-main/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-8">
              <button className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl font-black text-sm text-white border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2">
                <Share2 size={18} /> PARTAGER L'ANALYSE
              </button>
            </div>
          </div>
          
          <div className="space-y-12 flex-grow">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Badge variant="success">Album</Badge>
                <span className="text-text-muted text-xs font-black uppercase tracking-[0.2em]">{new Date(album.release_date).getFullYear()}</span>
                {album.is_entry_album && <div className="px-2 py-1 bg-accent-primary/20 text-accent-primary rounded-md text-[9px] font-black uppercase tracking-widest border border-accent-primary/30">Meilleure porte d'entrée</div>}
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-white">{album.title}</h1>
              <Link to={`/artiste/${album.artist_slug}`} className="text-3xl font-black text-accent-primary hover:text-accent-primary/80 transition-colors inline-block">{album.artist_name}</Link>
            </div>

            <SummaryBriefBlock summary={album.summary} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-8 border-l-4 border-accent-primary space-y-4">
                 <div className="flex items-center gap-3 text-accent-primary">
                    <Check size={18} /> <h4 className="text-xs font-black uppercase tracking-widest">Le Consensus</h4>
                 </div>
                 <p className="text-sm text-text-main leading-relaxed font-medium italic">"{album.consensus_data.consensus_summary}"</p>
              </div>
              <div className="glass-card p-8 border-l-4 border-warning space-y-4">
                 <div className="flex items-center gap-3 text-warning">
                    <Zap size={18} /> <h4 className="text-xs font-black uppercase tracking-widest">Ce qui divise</h4>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {album.consensus_data.dividing_points.map((p, i) => (
                      <span key={i} className="text-[10px] font-black px-2 py-1 bg-warning/10 text-warning rounded-lg uppercase">{p}</span>
                    ))}
                 </div>
              </div>
            </div>

            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <Users size={24} className="text-accent-primary" />
                <h2 className="text-xl font-black uppercase tracking-widest">Écart de Perception</h2>
              </div>
              <ProVsCommunityBlock 
                proScore={album.critic_score}
                communityScore={album.community_score}
                proConcensus={album.pro_vs_community_analysis}
                communityConcensus={album.summary.ideal_for}
                gap={album.critic_score - album.community_score}
              />
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <ListMusic size={24} className="text-accent-secondary" />
                <h2 className="text-xl font-black uppercase tracking-widest">Analyse du Flux</h2>
              </div>
              <AlbumFlowAnalysis tracks={album.track_list} coherence={album.coherence_score} />
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <TrendingUp size={24} className="text-accent-primary" />
                <h2 className="text-xl font-black uppercase tracking-widest">Consensus & Points de Friction</h2>
              </div>
              <ConsensusBlock data={album.consensus_data} />
            </section>

            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <SectionTitle subtitle="Analyses détaillées de l'album">Critiques de la communauté</SectionTitle>
                <Link to={`/avis/nouveau/album/${album.id}`} className="bg-accent-primary px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity">Donner mon avis</Link>
              </div>
              <div className="space-y-8">
                {albumReviews.map(review => <div key={review.id}><ReviewCard review={review} /></div>)}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrackPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const track = mockTracks.find(t => t.slug === slug);

  if (!track) return <div className="text-center py-20">Morceau non trouvé.</div>;

  return (
    <div className="space-y-16 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-bold text-sm mb-8">
          <ChevronLeft size={20} /> RETOUR
        </button>

        <header className="relative glass-card p-12 border-l-8 border-accent-secondary flex flex-col md:flex-row items-center gap-12 overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700">
             <PlayCircle size={200} />
          </div>
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] overflow-hidden shadow-2xl flex-shrink-0 group-hover:scale-105 transition-transform duration-700 relative bg-bg-surface-light border border-white/10">
            <SafeImage 
              src={mockAlbums.find(a => a.id === track.album_id)?.cover_url} 
              alt={track.title}
              className="w-full h-full object-cover" 
              fallbackType="album" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <PlayCircle size={64} className="text-white" />
            </div>
          </div>
          <div className="flex-grow text-center md:text-left space-y-6 relative z-10">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Badge variant="default">Morceau</Badge>
              <AccessLevelBadge level={track.access_level || 'Accessible'} />
              {track.is_best_entry_track && <Badge variant="premium">Point de départ idéal</Badge>}
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-white">{track.title}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
                <Link to={`/artiste/${track.artist_slug}`} className="text-2xl md:text-3xl font-black text-accent-secondary hover:underline">{track.artist_name}</Link>
                <span className="text-text-muted opacity-30 text-2xl">/</span>
                <Link to={`/album/${track.album_slug}`} className="text-xl md:text-2xl font-black text-text-muted hover:text-white transition-colors">{track.album_title}</Link>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              {track.community_keywords?.map(k => (
                <span key={k} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black text-text-muted uppercase tracking-widest border border-white/5">#{k}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 px-12 border-l border-white/5 h-full justify-center">
            <div className="text-center">
              <div className="text-6xl font-black text-accent-secondary">{track.quick_consensus_score}%</div>
              <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mt-2">Echo Pulse</div>
            </div>
          </div>
        </header>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <SummaryBriefBlock summary={track.summary!} />
               <div className="glass-card p-10 border-accent-secondary/20 flex flex-col justify-center space-y-8 bg-black/10">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Feeling Dominant</h4>
                    <div className="flex items-center gap-4">
                       <Activity className="text-accent-secondary" />
                       <div className="text-4xl font-black text-white uppercase italic">{track.dominant_feeling}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Niveau d'Accessibilité</h4>
                    <div className="flex items-center gap-4">
                       <Target className="text-accent-primary" />
                       <div className="text-2xl font-black text-white">{track.access_level}</div>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed font-medium">"{track.coherence_context}"</p>
                  </div>
               </div>
            </div>
            
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <ShieldCheck size={24} className="text-accent-primary" />
                <h2 className="text-xl font-black uppercase tracking-widest">Analyse de Perception</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 border-l-4 border-accent-primary space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Profil de l'Auditeur Idéal</h4>
                  <p className="text-sm text-text-main leading-relaxed font-bold italic">
                    &ldquo;{track.summary!.ideal_for}&rdquo;
                  </p>
                  <div className="flex flex-wrap gap-2 text-[9px] font-bold uppercase tracking-widest text-accent-primary">
                    {track.consensus_data?.recommended_for.map(r => (
                      <span key={r} className="px-2 py-1 bg-accent-primary/10 rounded-md border border-accent-primary/20">{r}</span>
                    ))}
                  </div>
                </div>
                <div className="glass-card p-8 border-l-4 border-accent-secondary space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Cohérence & Contexte</h4>
                  <p className="text-sm text-text-main leading-relaxed">
                    {track.coherence_context}
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">Feeling Dominant : </span>
                    <span className="text-xs font-black text-accent-secondary uppercase">{track.dominant_feeling}</span>
                  </div>
                </div>
              </div>
            </section>

            <ConsensusBlock data={track.consensus_data!} />

            <section className="space-y-8">
               <div className="flex items-center gap-3">
                <Users size={24} className="text-accent-primary" />
                <h2 className="text-xl font-black uppercase tracking-widest">Avis Croisés</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {track.cross_reviews_excerpts!.map((excerpt, i) => (
                   <div key={i} className="glass-card p-6 border-white/5 relative bg-white/2 hover:border-accent-primary/20 transition-all group">
                      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <MessageSquare size={40} />
                      </div>
                      <p className="text-sm text-text-main italic leading-relaxed mb-6">"{excerpt.text}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center font-black text-[10px] text-accent-primary border border-accent-primary/30 group-hover:scale-110 transition-transform">
                          {excerpt.user_name[0]}
                        </div>
                        <span className="text-xs font-black text-text-muted uppercase tracking-widest">{excerpt.user_name}</span>
                      </div>
                   </div>
                 ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8 space-y-8">
              <h3 className="font-black text-sm uppercase tracking-widest text-text-muted">Limites perçues</h3>
              <div className="space-y-4">
                {track.perceived_limits.map((limit, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-text-main bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-warning flex-shrink-0" />
                    {limit}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 space-y-8">
              <h3 className="font-black text-sm uppercase tracking-widest text-text-muted">Écouter ensuite</h3>
              <div className="space-y-4">
                {track.listen_next_ids.map((item, i) => (
                  <Link key={i} to={`/${item.type === 'album' ? 'album' : 'artiste'}/${item.id}`} className="block group p-4 rounded-2xl border border-white/5 hover:border-accent-secondary/30 transition-colors bg-white/2">
                    <div className="text-[9px] font-black uppercase text-accent-secondary mb-1">Car vous avez aimé {track.title}</div>
                    <div className="font-black text-white group-hover:text-accent-secondary transition-colors">{item.title}</div>
                    <p className="text-[10px] text-text-muted italic mt-2 leading-relaxed">"{item.reason}"</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 bg-accent-primary/10 border-accent-primary/20">
               <h3 className="font-black text-sm uppercase tracking-widest text-accent-primary mb-4">Cohérence & Contexte</h3>
               <p className="text-xs text-text-main leading-relaxed font-medium italic">"{track.coherence_context}"</p>
            </div>
          </aside>
        </div>
      </div>
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
  const navigate = useNavigate();
  
  const categories = [
    { id: 'all', label: 'Toutes Sélections' },
    { id: 'Débutant', label: 'Parcours Initiation' },
    { id: 'Expert', label: 'Analyse Expert' },
    { id: 'Genre', label: 'Focus Genre' },
    { id: 'Humeur', label: 'États d\'Âme' },
  ];

  const filteredLists = activeCategory === 'all' 
    ? mockLists 
    : mockLists.filter(l => l.category === activeCategory || l.selection_type === activeCategory);

  const featuredLists = mockLists.filter(l => l.selection_type === 'Expert' || l.category === 'Débutant').slice(0, 2);
  const popularLists = [...mockLists].sort((a, b) => b.like_count - a.like_count).slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      <header className="space-y-8 pt-10">
        <div className="space-y-6">
          <Badge variant="premium">Guided Discovery</Badge>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none uppercase text-white">
            EXPLOREZ LES <br />
            <span className="text-accent-secondary italic">PARCOURS.</span>
          </h1>
          <p className="text-text-muted text-xl md:text-2xl max-w-3xl font-medium leading-relaxed">
            Ne vous contentez pas d'écouter. Apprenez à juger, comparer et découvrir avec des listes conçues comme des guides critiques et des chemins de traverse musicaux.
          </p>
        </div>
      </header>

      {/* Guided Path Introduction */}
      <section className="bg-accent-primary/5 rounded-[3rem] p-8 md:p-12 border border-accent-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Zap size={240} />
        </div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2 space-y-6">
               <h2 className="text-4xl font-black tracking-tight text-white uppercase">Le jugement musical est un art.</h2>
               <p className="text-lg text-text-muted leading-relaxed">
                  Nos curateurs ne se contentent pas de lister des morceaux. Ils vous expliquent <strong>pourquoi</strong> les écouter, comment les comparer et ce qui définit leur importance dans l'histoire de la musique.
               </p>
               <div className="flex gap-4">
                  <div className="bg-bg-main p-4 rounded-2xl border border-white/5 space-y-2">
                    <div className="text-accent-primary font-black text-xs uppercase tracking-widest">Étape 1</div>
                    <div className="text-sm font-bold text-white uppercase">S'initier</div>
                  </div>
                  <div className="bg-bg-main p-4 rounded-2xl border border-white/5 space-y-2">
                    <div className="text-accent-secondary font-black text-xs uppercase tracking-widest">Étape 2</div>
                    <div className="text-sm font-bold text-white uppercase">Comparer</div>
                  </div>
                  <div className="bg-bg-main p-4 rounded-2xl border border-white/5 space-y-2">
                    <div className="text-success font-black text-xs uppercase tracking-widest">Étape 3</div>
                    <div className="text-sm font-bold text-white uppercase">Maîtriser</div>
                  </div>
               </div>
            </div>
            <div className="text-center md:text-right">
               <button 
                 onClick={() => navigate('/explorer')}
                 className="premium-gradient px-8 py-5 rounded-3xl font-black text-sm text-white shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 w-full md:w-auto"
               >
                 CRÉER MON GUIDE <PlusCircle size={20} />
               </button>
            </div>
        </div>
      </section>

      {/* Categories */}
      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-text-muted border-b border-white/5 pb-4">Filtrer par approche</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all border ${
                activeCategory === cat.id 
                  ? 'bg-white text-bg-main border-white shadow-2xl shadow-white/10 scale-105' 
                  : 'bg-white/5 border-white/10 text-text-muted hover:border-white/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      {activeCategory === 'all' && (
        <section className="space-y-12">
          <div className="flex items-end justify-between gap-6">
            <SectionTitle subtitle="L'excellence éditoriale sélectionnée par nos équipes">Parcours Certifiés ÉCHO</SectionTitle>
            <div className="hidden md:flex items-center gap-2 text-accent-secondary font-black text-[10px] uppercase tracking-widest bg-accent-secondary/5 px-4 py-2 rounded-full border border-accent-secondary/20">
               <Award size={14} /> Recommandés
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {featuredLists.map((list, idx) => (
               <div key={list.id} className={idx === 0 ? 'lg:col-span-2' : ''}>
                  <ListCard list={list} featured={idx === 0} />
               </div>
            ))}
          </div>
        </section>
      )}

      {/* Trending / Popular Horizontal - Simplified */}
      {activeCategory === 'all' && (
        <section className="py-20 -mx-6 md:-mx-10 px-6 md:px-10 bg-white/5 border-y border-white/5">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex items-center gap-4">
              <TrendingUp className="text-accent-primary" />
              <h3 className="text-2xl font-black uppercase tracking-tighter">Les plus suivis</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularLists.map(list => (
                <Link key={list.id} to={`/liste/${list.slug}`} className="group space-y-4">
                  <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 relative">
                    <SafeImage src={list.image_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" fallbackType="album" />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[9px] font-black text-white border border-white/10">
                      {list.like_count} <Heart size={8} className="inline ml-1 text-accent-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-white group-hover:text-accent-primary transition-colors line-clamp-1">{list.title}</h4>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{list.category} • {list.items.length} Étapes</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Grid */}
      <section className="space-y-10">
        <SectionTitle subtitle="L'intelligence collective à votre service">
          {activeCategory === 'all' ? 'Toutes les explorations' : `Guides : ${categories.find(c => c.id === activeCategory)?.label}`}
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLists.map(list => <ListCard key={list.id} list={list} />)}
        </div>
      </section>

      {/* User Discovery Section - Call to Action */}
      <section className="glass-card p-12 text-center space-y-8 relative overflow-hidden bg-bg-surface-light">
          <div className="space-y-4">
             <h2 className="text-4xl font-black tracking-tight text-white uppercase">Partagez votre expertise.</h2>
             <p className="text-text-muted text-lg max-w-2xl mx-auto">
                Vous avez un angle unique sur un genre ou un artiste ? Créez une liste et aidez la communauté à découvrir la musique à travers vos yeux.
             </p>
          </div>
          <div className="flex justify-center gap-6">
             <button className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-2xl font-black text-sm transition-all border border-white/10">VOIR MES GUIDES</button>
             <button className="bg-accent-primary px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:shadow-accent-primary/20 transition-all">CRÉER UNE NOUVELLE LISTE</button>
          </div>
      </section>
    </div>
  );
};

const ListCard = ({ list, featured = false, compact = false }: { list: SharedList, featured?: boolean, compact?: boolean, key?: string | number }) => (
  <motion.div 
    whileHover={{ y: -8 }} 
    className={`glass-card overflow-hidden group cursor-pointer flex flex-col h-full border-white/5 hover:border-accent-secondary/30 transition-all ${featured ? 'md:flex-row' : ''}`}
  >
    <Link to={`/liste/${list.slug}`} className={`flex flex-col h-full w-full ${featured ? 'md:flex-row' : ''}`}>
      <div className={`relative overflow-hidden ${featured ? 'md:w-1/2 aspect-video md:aspect-auto' : 'aspect-video'}`}>
        <SafeImage 
          src={list.image_url} 
          alt={list.title} 
          fallbackType="list"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main/90 via-bg-main/20 to-transparent" />
        
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge variant="premium">{list.category}</Badge>
          {list.is_premium_exclusive && (
            <div className="bg-warning/20 text-warning px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border border-warning/30 flex items-center gap-1.5 backdrop-blur-md">
              <Lock size={10} /> Premium
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-3">
           <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${list.entry_level === 'Immédiat' ? 'bg-success' : list.entry_level === 'Exigeant' ? 'bg-error' : 'bg-warning'}`} />
              <span className="text-[9px] font-black text-white uppercase tracking-widest">{list.entry_level || 'Niveau non défini'}</span>
           </div>
        </div>

        <div className="absolute bottom-4 right-4 bg-bg-main/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 text-[10px] font-black">
          <ThumbsUp size={12} className="text-accent-secondary" /> {list.like_count}
        </div>
      </div>
      
      <div className={`p-8 flex flex-col flex-grow ${featured ? 'md:w-1/2' : ''}`}>
        <div className="space-y-4 flex-grow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-black text-accent-secondary uppercase tracking-widest">
              <ListMusic size={14} /> {list.items.length} Insights
            </div>
            {list.tone_mood && (
              <span className="text-[9px] font-black text-text-muted uppercase tracking-widest opacity-60">
                {list.tone_mood}
              </span>
            )}
          </div>

          <h3 className={`font-black tracking-tight group-hover:text-accent-secondary transition-colors leading-tight ${featured ? 'text-3xl' : 'text-xl'}`}>
            {list.title}
          </h3>

          {!compact && (
            <p className="text-text-muted text-sm font-medium leading-relaxed line-clamp-3">
              {list.description}
            </p>
          )}

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl mt-4 relative overflow-hidden group/promise">
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <Zap size={32} />
            </div>
            <p className="text-[10px] font-black text-accent-primary uppercase tracking-[0.2em] mb-2">Promesse de découverte</p>
            <p className="text-xs font-bold text-white leading-relaxed italic">
              "{list.discovery_promise}"
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SafeImage src={list.user_avatar} className="w-10 h-10 rounded-full border border-white/10 shadow-lg" fallbackType="user" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">{list.user_display_name}</span>
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest leading-none">Curateur Certifié</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-accent-secondary text-[10px] font-black uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
            VOIR LE PARCOURS <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const ListPage = () => {
  const { slug } = useParams();
  const list = mockLists.find(l => l.slug === slug);
  
  if (!list) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-6">
      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-text-muted">
        <AlertCircle size={40} />
      </div>
      <h2 className="text-2xl font-black uppercase tracking-tight">Parcours Introuvable</h2>
      <p className="text-text-muted">Ce guide a peut-être été déplacé ou supprimé.</p>
      <Link to="/listes" className="bg-accent-primary px-8 py-4 rounded-2xl font-bold text-sm">Retourner aux explorations</Link>
    </div>
  );

  return (
    <div className="space-y-24 pb-32">
      {/* Editorial Header */}
      <header className="relative pt-10 min-h-[500px] flex items-center overflow-hidden rounded-[4rem] border border-white/5">
        <div className="absolute inset-0 z-0">
          <SafeImage src={list.image_url} className="w-full h-full object-cover opacity-30" fallbackType="list" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-main via-bg-main/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-main to-transparent" />
        </div>
        
        <div className="relative z-10 p-12 md:p-20 space-y-12 max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="flex-grow space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge variant="premium" className="px-5 py-2">{list.category}</Badge>
                <div className="bg-white/5 border border-white/10 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-text-muted">
                  {list.selection_type}
                </div>
                {list.is_premium_exclusive && (
                  <div className="bg-warning/10 text-warning px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-warning/20 shadow-lg shadow-warning/5 flex items-center gap-2">
                    <Lock size={12} /> Accès Premium
                  </div>
                )}
              </div>

              <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase text-white drop-shadow-2xl">
                {list.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 3 === 2 ? 'text-accent-secondary italic' : ''}>{word} </span>
                ))}
              </h1>

              <p className="text-text-muted text-xl md:text-3xl font-medium leading-relaxed max-w-4xl border-l-4 border-accent-secondary/30 pl-8 drop-shadow-lg">
                {list.description}
              </p>

              <div className="flex flex-wrap items-center gap-10 pt-4">
                <Link to={`/profil/${list.user_id}`} className="flex items-center gap-4 group">
                  <SafeImage src={list.user_avatar} className="w-16 h-16 rounded-2xl border-2 border-white/10 group-hover:border-accent-secondary transition-all shadow-xl" fallbackType="user" />
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Curateur Certifié</div>
                    <div className="font-black text-white text-xl group-hover:text-accent-secondary transition-colors underline decoration-accent-secondary/30 underline-offset-4">{list.user_display_name}</div>
                  </div>
                </Link>
                
                <div className="h-10 w-px bg-white/10" />

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-black text-white">{list.items.length}</div>
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Insights</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-accent-secondary">{list.like_count}</div>
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Explorateurs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 relative z-10 -mt-20">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-grow space-y-24">
            {/* Note Éditoriale */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-accent-secondary/10 rounded-2xl flex items-center justify-center text-accent-secondary border border-accent-secondary/20 shadow-lg">
                  <Info size={28} />
                </div>
                <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">Analyse du Curateur</h2>
              </div>
              <div className="bg-bg-surface-light p-12 rounded-[3rem] border border-white/5 space-y-8 relative overflow-hidden group hover:border-accent-secondary/20 transition-all duration-500">
                <div className="absolute top-10 right-12 text-9xl font-serif text-white/5 pointer-events-none select-none group-hover:text-accent-secondary/5 transition-colors">“</div>
                <p className="text-2xl text-text-main font-medium leading-relaxed italic opacity-90 first-letter:text-6xl first-letter:font-black first-letter:text-accent-secondary first-letter:float-left first-letter:mr-4 first-letter:mt-2 relative z-10">
                  {list.editorial_intro}
                </p>
                <div className="pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                   <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-accent-secondary uppercase tracking-[0.3em]">Genèse du projet</h4>
                      <p className="text-sm text-text-muted leading-relaxed font-medium">{list.why_exists}</p>
                   </div>
                   <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-accent-secondary uppercase tracking-[0.3em]">Logique de découverte</h4>
                      <p className="text-sm text-text-muted leading-relaxed font-medium">{list.journey_logic}</p>
                   </div>
                </div>
              </div>
            </section>

          {/* List Items - Detailed View */}
          <section className="space-y-12">
            <div className="flex items-center justify-between">
               <h2 className="text-3xl font-black tracking-tight text-white uppercase">Les Étapes du Parcours</h2>
               <div className="text-xs font-black text-text-muted uppercase tracking-widest">{list.items.length} SÉLECTIONS</div>
            </div>
            
            <div className="space-y-8">
              {list.items.map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="group relative"
                >
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-px bg-accent-primary/30 group-hover:w-12 transition-all hidden md:block" />
                  <div className="glass-card p-10 flex flex-col md:flex-row gap-10 items-start border-white/5 hover:border-accent-primary/30 transition-all bg-gradient-to-br from-white/5 to-transparent shadow-2xl">
                    <div className="flex-shrink-0 flex flex-col items-center gap-4">
                       <div className="w-16 h-16 rounded-3xl bg-bg-main flex items-center justify-center text-2xl font-black text-white group-hover:text-accent-primary transition-colors border border-white/10 shadow-inner">
                         {i + 1}
                       </div>
                       <div className="h-full w-px bg-gradient-to-b from-white/10 to-transparent flex-grow" />
                    </div>

                    <div className="flex-grow space-y-6">
                      <div className="flex flex-wrap items-center gap-3">
                         <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10 bg-white/5 text-text-muted`}>
                           {item.type === 'artist' ? 'Artiste Focus' : item.type === 'album' ? 'Album Essentiel' : 'Morceau Clé'}
                         </div>
                         {item.access_level === 'Premium' && (
                           <div className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-warning/20 text-warning border border-warning/30">
                             Premium
                           </div>
                         )}
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-4xl font-black text-white tracking-tight group-hover:translate-x-1 transition-transform">{item.title}</h3>
                        {item.artist_name && (
                           <div className="text-accent-primary font-black uppercase tracking-[0.2em] text-xs pb-2 border-b border-white/5 inline-block">
                              EXPLORATION : {item.artist_name}
                           </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 italic text-text-main leading-relaxed">
                           <div className="text-accent-secondary mt-1"><Info size={16} /></div>
                           <p>"{item.why}"</p>
                        </div>
                        {item.promise && (
                           <div className="flex items-center gap-3 text-xs font-bold text-accent-secondary bg-accent-secondary/5 px-4 py-2 rounded-xl inline-flex w-full md:w-auto">
                              <Zap size={14} /> {item.promise}
                           </div>
                        )}
                      </div>

                      <div className="pt-6 flex flex-wrap gap-4">
                         <Link 
                           to={`/${item.type}/${item.slug}`} 
                           className="bg-accent-primary px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-[1.05] shadow-xl shadow-accent-primary/20 transition-all flex items-center gap-3"
                         >
                           Analyse Détaillée <ArrowRight size={16} />
                         </Link>
                         <button className="bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all">
                           Écouter un extrait
                         </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        <aside className="w-full lg:w-[400px] space-y-12 flex-shrink-0">
           <section className="space-y-6">
              <h3 className="text-xl font-black uppercase tracking-tighter text-white px-2 border-l-4 border-accent-secondary">Plus de ce curateur</h3>
              <div className="space-y-4">
                 {mockLists.filter(l => l.user_id === list.user_id && l.id !== list.id).slice(0, 3).map(l => (
                    <Link key={l.id} to={`/liste/${l.slug}`} className="block group">
                       <div className="glass-card p-5 bg-white/5 hover:bg-white/10 border-white/5 transition-all flex gap-4 items-center">
                          <SafeImage src={l.image_url} className="w-16 h-16 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" fallbackType="album" />
                          <div>
                             <h4 className="text-xs font-black text-white group-hover:text-accent-secondary transition-colors line-clamp-1">{l.title}</h4>
                             <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{l.category} • {l.items.length} Étapes</span>
                          </div>
                       </div>
                    </Link>
                 ))}
                 {mockLists.filter(l => l.user_id === list.user_id && l.id !== list.id).length === 0 && (
                    <p className="text-xs text-text-muted italic px-2">C'est le seul guide de ce curateur pour l'instant.</p>
                 )}
              </div>
           </section>

           <section className="bg-accent-primary/10 rounded-3xl p-8 border border-accent-primary/20 space-y-6">
              <div className="flex items-center gap-3 text-accent-primary">
                 <Search size={20} />
                 <h3 className="text-lg font-black uppercase tracking-tight">Curation Continue</h3>
              </div>
              <p className="text-xs text-text-muted leading-relaxed font-medium"> Les parcours d'ÉCHO sont vivants. Nos experts mettent à jour leurs listes au gré des sorties et de l'évolution du consensus pro/commu.</p>
              <button className="w-full bg-accent-primary/20 hover:bg-accent-primary/30 text-accent-primary px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                 Abonnez-vous aux mises à jour
              </button>
           </section>
        </aside>
      </div>
    </div>
  </div>
);
};

const CommunityPage = () => {
  const mostHelpful = [...mockUsers].sort((a, b) => b.stats.helpful_votes - a.stats.helpful_votes).slice(0, 4);
  const experts = mockUsers.filter(u => u.credibility_level === 'qualifie');
  const risingStars = [mockUsers[1], mockUsers[4], mockUsers[6]];
  const newArrivals = mockUsers.slice(-3).reverse();

  return (
    <div className="space-y-32 pb-32 pt-10">
      <header className="space-y-8 max-w-4xl">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent-primary/10 border border-accent-primary/20 rounded-full text-accent-primary text-[10px] font-black uppercase tracking-widest">
          <Users size={14} /> Intelligence Collective
        </div>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
          L'ÉLITE <br />
          <span className="text-accent-primary">CRITIQUE.</span>
        </h1>
        <p className="text-text-muted text-xl md:text-2xl font-medium leading-relaxed max-w-2xl">
          ÉCHO est porté par ses membres. Découvrez des passionnés, des experts techniques et des diggers insatiables qui redéfinissent la découverte musicale.
        </p>
      </header>

      {/* Section 1: Étoiles Montantes - Cartes Premium Larges */}
      <section className="space-y-12">
        <SectionTitle subtitle="Analyses de fond et découvertes majeures cette semaine">À suivre absolument</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {risingStars.map(user => (
            <CommunityUserCard key={user.id} user={user} variant="featured" />
          ))}
        </div>
      </section>

      {/* Section 2: Experts par Genre - Design Plus Compact & Technique */}
      <section className="py-24 bg-gradient-to-r from-bg-surface-light via-transparent to-bg-surface-light border-y border-white/5 -mx-6 md:-mx-10 px-6 md:px-10">
        <div className="max-w-6xl mx-auto space-y-12">
           <SectionTitle subtitle="Une maîtrise historique et stylistique absolue">La Garde des Genres</SectionTitle>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {experts.map(user => <CommunityUserCard key={user.id} user={user} variant="expert" />)}
           </div>
        </div>
      </section>

      {/* Section 3: Contributeurs Utiles - Focus Statistiques */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <SectionTitle subtitle="Ceux dont les oreilles guident la communauté">Piliers de Confiance</SectionTitle>
          <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-accent-secondary/20 flex items-center justify-center text-accent-secondary shadow-lg">
                <ThumbsUp size={18} />
             </div>
             <div className="text-xs font-bold text-text-muted">Total votes utiles <br/><span className="text-white text-lg font-black">2.4k+</span></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mostHelpful.map(user => <CommunityUserCard key={user.id} user={user} variant="standard" />)}
        </div>
      </section>

      {/* Section 4: Nouveaux Profils - Épuré */}
      <section className="space-y-12">
        <SectionTitle subtitle="Le sang neuf de la critique musicale">Nouveaux regards</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newArrivals.map(user => <CommunityUserCard key={user.id} user={user} variant="minimal" />)}
        </div>
      </section>

      {/* CTA Final */}
      <section className="glass-card p-16 text-center space-y-10 relative overflow-hidden bg-gradient-to-br from-accent-primary/20 to-transparent border-accent-primary/30">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000')] bg-cover mix-blend-overlay" />
          <div className="relative z-10 space-y-6">
             <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none uppercase">VOUS AUSSI, <br />DEVENEZ UNE <span className="text-accent-primary">RÉFÉRENCE.</span></h2>
             <p className="text-text-muted text-xl max-w-xl mx-auto font-medium">
                Partagez votre expertise, peaufinez vos analyses et grimpez dans les rangs de la communauté ÉCHO.
             </p>
             <button className="premium-gradient px-10 py-5 rounded-[2rem] font-black text-sm text-white shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                Compléter mon profil
             </button>
          </div>
      </section>
    </div>
  );
};

const CommunityUserCard = ({ user, variant = 'standard' }: { user: User, variant?: 'featured' | 'expert' | 'standard' | 'minimal', key?: React.Key }) => {
  const isFeatured = variant === 'featured';
  const isExpert = variant === 'expert';
  const isMinimal = variant === 'minimal';

  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.01 }}
      className={`glass-card overflow-hidden group border-white/5 hover:border-accent-primary/40 transition-all flex flex-col relative
        ${isFeatured ? 'bg-gradient-to-br from-white/5 to-transparent shadow-2xl' : ''}
        ${isExpert ? 'bg-bg-surface-light border-white/10' : ''}
      `}
    >
      <Link to={`/profil/${user.slug || user.id}`} className="flex flex-col h-full">
        {isFeatured && (
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-accent-primary/20 backdrop-blur-md px-3 py-1 rounded-full border border-accent-primary/30 text-[8px] font-black text-accent-primary uppercase tracking-[0.2em]">
              PROFIL VEDETTE
            </div>
          </div>
        )}

        <div className={`${isMinimal ? 'p-6' : 'p-8'} space-y-6 flex-grow`}>
          <div className={`flex ${isMinimal ? 'flex-col items-center text-center' : 'items-center'} gap-6`}>
            <div className="relative">
              <SafeImage 
                src={user.avatar_url} 
                className={`${isMinimal ? 'w-24 h-24' : isExpert ? 'w-16 h-16' : 'w-20 h-20'} 
                  rounded-3xl border-2 border-white/10 object-cover shadow-2xl group-hover:border-accent-primary/50 transition-all`} 
                fallbackType="user"
              />
              {user.premium_status && (
                <div className="absolute -top-2 -right-2 bg-accent-primary text-bg-main p-1.5 rounded-xl shadow-xl border-2 border-bg-main">
                  <Zap size={14} fill="currentColor" />
                </div>
              )}
            </div>
            <div className="flex-grow">
              <h3 className={`${isExpert ? 'text-lg' : 'text-xl'} font-black text-white group-hover:text-accent-primary transition-colors leading-tight`}>{user.display_name}</h3>
              <div className={`flex items-center gap-2 mt-1 ${isMinimal ? 'justify-center' : 'justify-start'}`}>
                <Badge variant={user.credibility_level === 'qualifie' ? 'premium' : 'default'}>
                  {user.credibility_level === 'qualifie' ? 'Expert' : user.credibility_level === 'confirme' ? 'Actif' : 'Explo'}
                </Badge>
                <span className="text-[9px] font-black text-accent-secondary uppercase tracking-widest">{user.favorite_genre}</span>
              </div>
            </div>
          </div>

          {!isMinimal && (
            <div className="space-y-6">
              <p className="text-text-muted text-sm font-medium leading-relaxed line-clamp-2 italic border-l-2 border-accent-primary/20 pl-4 py-1">
                &ldquo;{user.bio_short}&rdquo;
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5 group-hover:bg-accent-primary/5 transition-colors">
                  <div className="text-[8px] font-black text-text-muted uppercase tracking-widest mb-1.5">Focus Principal</div>
                  <div className="text-[10px] font-bold text-white truncate">{user.critical_specialty}</div>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5 group-hover:bg-accent-secondary/5 transition-colors">
                  <div className="text-[8px] font-black text-text-muted uppercase tracking-widest mb-1.5">Discovery Style</div>
                  <div className="text-[10px] font-bold text-white truncate">{user.discovery_style}</div>
                </div>
              </div>

              {isFeatured && (
                <div className="bg-accent-primary/10 border border-accent-primary/20 p-5 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Award size={48} /></div>
                  <div className="text-[9px] font-black text-accent-primary uppercase tracking-widest mb-2 font-black italic">Le mot pour l'équipe</div>
                  <p className="text-xs font-bold text-white leading-relaxed relative z-10 italic">
                    &ldquo;{user.follow_reason}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}

          {isMinimal && (
            <div className="pt-4 text-center">
              <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Dernière analyse</div>
              <div className="text-xs font-bold text-accent-secondary line-clamp-1 italic">
                {user.favorite_artists_ids && user.favorite_artists_ids.length > 0 ? (
                  mockArtists.find(a => a.id === user.favorite_artists_ids![0])?.name
                ) : 'Selection en cours...'}
              </div>
            </div>
          )}

          <div className={`grid grid-cols-3 gap-4 ${isMinimal ? 'pt-4' : 'pt-6'} border-t border-white/5`}>
            <div className="text-center group/stat">
              <div className="font-black text-lg text-white group-hover/stat:text-accent-primary transition-colors leading-tight">{user.stats.reviews_count}</div>
              <div className="text-[8px] font-black text-text-muted uppercase tracking-widest">Avis</div>
            </div>
            <div className="text-center group/stat">
              <div className="font-black text-lg text-white group-hover/stat:text-accent-secondary transition-colors leading-tight">{user.stats.followers_count}</div>
              <div className="text-[8px] font-black text-text-muted uppercase tracking-widest">Fans</div>
            </div>
            <div className="text-center group/stat">
              <div className="font-black text-lg text-accent-primary leading-none group-hover/stat:scale-110 transition-transform">{user.stats.helpful_votes}</div>
              <div className="text-[8px] font-black text-text-muted uppercase tracking-widest mt-1">Utiles</div>
            </div>
          </div>
        </div>
        
        <div 
          className="w-full py-5 bg-white/5 group-hover:bg-accent-primary group-hover:text-bg-main font-black text-[10px] uppercase tracking-[0.3em] transition-all text-center border-t border-white/5 flex items-center justify-center gap-3"
        >
          VOIR LE PROFIL <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
};

const ProfilePage = ({ isPremium, setIsPremium }: { isPremium: boolean, setIsPremium: (v: boolean) => void }) => {
  const { slug } = useParams();
  // If slug is present, find user by slug, else default to mockUsers[0] (current user)
  const user = slug ? mockUsers.find(u => u.slug === slug) || mockUsers[0] : mockUsers[0];
  
  const userLists = mockLists.filter(l => l.user_id === user.id);
  const favoriteArtists = mockArtists.filter(a => user.favorite_artists_ids?.includes(a.id));
  const followedArtists = mockArtists.filter(a => user.followed_artists_ids?.includes(a.id));
  const similarProfiles = mockUsers.filter(u => user.similar_profiles_ids?.includes(u.id));
  const userReviews = mockReviews.filter(r => r.user_id === user.id);

  return (
    <div className="space-y-20 pb-20">
      {/* Header Profil */}
      <header className="glass-card p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden border-white/5 bg-gradient-to-br from-bg-surface to-bg-main">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
          <UserIcon size={320} className="text-accent-primary" />
        </div>
        
        <div className="relative z-10">
          <div className="relative">
            <SafeImage 
              src={user.avatar_url} 
              className="w-48 h-48 rounded-[3rem] border-4 border-accent-primary/30 shadow-2xl object-cover ring-8 ring-accent-primary/10" 
              fallbackType="user"
            />
            {user.premium_status && (
              <div className="absolute -bottom-2 -right-2 bg-accent-primary text-bg-main p-3 rounded-2xl shadow-xl border-4 border-bg-main">
                <Zap size={24} fill="currentColor" />
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-8 z-10 text-center md:text-left flex-grow">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">{user.display_name}</h1>
              <div className="flex gap-2">
                <Badge variant={user.credibility_level === 'qualifie' ? 'premium' : 'default'}>
                  {user.credibility_level === 'qualifie' ? 'Expert Certifié' : user.credibility_level === 'confirme' ? 'Contributeur Actif' : 'Explorateur'}
                </Badge>
                {user.premium_status && <Badge variant="success">Premium</Badge>}
              </div>
            </div>
            {user.signature && (
              <p className="text-accent-primary font-black text-sm uppercase tracking-[0.3em] inline-block px-4 py-1 bg-accent-primary/10 rounded-full">
                {user.signature}
              </p>
            )}
          </div>

          <p className="text-text-muted text-xl max-w-2xl italic font-medium leading-relaxed bg-white/5 p-6 rounded-3xl border border-white/5 border-l-4 border-accent-secondary">
            "{user.bio_short}"
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="bg-bg-surface-light px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-1">Genre Prédilection</span>
              <span className="text-sm font-bold text-accent-secondary">{user.favorite_genre}</span>
            </div>
            <div className="bg-bg-surface-light px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-1">Spécialité</span>
              <span className="text-sm font-bold text-white">{user.critical_specialty}</span>
            </div>
            <div className="bg-bg-surface-light px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-1">Méthode</span>
              <span className="text-sm font-bold text-white uppercase tracking-tighter">{user.discovery_style}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-row md:flex-col gap-8 md:gap-4 justify-center md:justify-center p-8 bg-white/5 rounded-3xl border border-white/5">
            <div className="text-center md:text-right">
              <div className="text-4xl font-black text-white leading-none">{user.stats.reviews_count}</div>
              <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Avis</div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-4xl font-black text-white leading-none">{user.stats.followers_count}</div>
              <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Abonnés</div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-4xl font-black text-accent-primary leading-none">{user.stats.helpful_votes}</div>
              <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Votes Utiles</div>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-24">
          {/* ADN Sonore */}
          <section className="space-y-10">
            <SectionTitle subtitle="L'empreinte musicale et les préférences de ce membre">Identité Critique</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-10 space-y-8 border-accent-secondary/20 bg-gradient-to-br from-accent-secondary/5 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent-secondary/20 flex items-center justify-center text-accent-secondary">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight">Vision Critique</h3>
                    <p className="text-[10px] text-text-muted uppercase font-black tracking-widest">Angle de jugement</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <p className="text-sm text-text-main leading-relaxed font-bold italic">
                    &ldquo;{user.follow_reason}&rdquo;
                  </p>
                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Texture de son préférée</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.taste_tones?.map(tone => (
                        <span key={tone} className="px-4 py-2 bg-accent-secondary/10 border border-accent-secondary/20 rounded-xl text-[10px] font-black text-accent-secondary uppercase tracking-widest">
                          {tone}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-10 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent-primary/20 flex items-center justify-center text-accent-primary">
                    <Star size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight">Artistes Favoris</h3>
                    <p className="text-[10px] text-text-muted uppercase font-black tracking-widest">Références majeures</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {favoriteArtists.length > 0 ? favoriteArtists.map(artist => (
                    <Link key={artist.id} to={`/artiste/${artist.slug}`} className="flex items-center gap-4 group bg-white/2 p-3 rounded-2xl border border-white/5 hover:border-accent-primary/30 transition-all">
                      <SafeImage src={artist.cover_image_url} className="w-14 h-14 rounded-xl object-cover border border-white/10 shadow-lg" fallbackType="artist" />
                      <div className="flex-grow">
                        <div className="font-bold group-hover:text-accent-primary transition-colors">{artist.name}</div>
                        <div className="text-[10px] text-text-muted uppercase font-black tracking-widest">{artist.primary_genres[0]}</div>
                      </div>
                      <ChevronRight size={18} className="text-text-muted group-hover:translate-x-1 group-hover:text-accent-primary transition-all" />
                    </Link>
                  )) : (
                    <div className="text-xs text-text-muted italic p-4 text-center border-2 border-dashed border-white/5 rounded-2xl">
                      Aucun artiste favori enregistré
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Listes Créées */}
          {userLists.length > 0 && (
            <section className="space-y-10">
              <SectionTitle subtitle="Les guides et parcours conçus par ce contributeur">Guides de Découverte</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {userLists.map(list => <ListCard key={list.id} list={list} />)}
              </div>
            </section>
          )}

          {/* Derniers Avis */}
          <section className="space-y-10">
            <SectionTitle subtitle={`Analyses critiques de ${user.display_name}`}>Derniers Avis</SectionTitle>
            <div className="grid grid-cols-1 gap-8">
              {userReviews.length > 0 ? userReviews.map(review => (
                <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <ReviewCard review={review} />
                </motion.div>
              )) : (
                <div className="glass-card p-12 text-center space-y-4 border-white/5">
                  <MessageSquare size={48} className="mx-auto text-text-muted opacity-20" />
                  <p className="text-text-muted font-bold">Aucun avis publié pour le moment.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Profil */}
        <aside className="lg:col-span-1 space-y-12">
          <div className="sticky top-24 space-y-12">
            <div className="glass-card p-10 space-y-8 border-white/5 bg-bg-surface">
              <div className="flex items-center gap-3 text-accent-primary">
                <ShieldCheck size={20} />
                <h3 className="font-black text-sm uppercase tracking-widest">Statut de Confiance</h3>
              </div>
              <div className="space-y-6">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                  <div className="text-[10px] font-black text-accent-primary uppercase tracking-widest">Contributeur {user.credibility_level}</div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Ce membre a partagé {user.stats.reviews_count} avis et aidé {user.stats.helpful_votes} personnes avec ses analyses pertinentes.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 space-y-8">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-6">Profils Similaires</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {similarProfiles.map(u => (
                      <Link to={`/profil/${u.slug}`} key={u.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors group">
                        <SafeImage src={u.avatar_url} className="w-12 h-12 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform shadow-md" fallbackType="user" />
                        <div className="flex-grow">
                          <div className="text-sm font-bold group-hover:text-accent-primary transition-colors">{u.display_name}</div>
                          <div className="text-[9px] text-text-muted font-black uppercase tracking-widest">{u.favorite_genre}</div>
                        </div>
                        <button className="text-[9px] font-black text-accent-primary uppercase border border-accent-primary/20 bg-accent-primary/5 px-3 py-1.5 rounded-lg hover:bg-accent-primary hover:text-white transition-all">Suivre</button>
                      </Link>
                    ))}
                  </div>
                </div>

                {followedArtists.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-6">Suivi récemment</h4>
                    <div className="flex flex-wrap gap-3">
                      {followedArtists.map(artist => (
                        <Link key={artist.id} to={`/artiste/${artist.slug}`} className="block">
                          <SafeImage src={artist.cover_image_url} className="w-12 h-12 rounded-xl object-cover border border-white/10 hover:border-accent-primary transition-colors shadow-sm" fallbackType="artist" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-8 border-t border-white/5">
                <button className="w-full py-5 premium-gradient rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-white">
                  S'ABONNER À {user.display_name.toUpperCase()}
                </button>
              </div>
            </div>

            <div className="glass-card p-8 bg-gradient-to-br from-accent-primary/10 to-transparent border-accent-primary/20 text-center space-y-4">
               <div className="w-16 h-16 rounded-full bg-accent-primary/20 flex items-center justify-center mx-auto text-accent-primary">
                 <Zap size={32} />
               </div>
               <h4 className="font-black text-sm uppercase tracking-widest text-white">Précision Critique</h4>
               <p className="text-xs text-text-muted leading-relaxed">
                 Le score d'utilité moyen de ce membre est de {Math.round((user.stats.helpful_votes / user.stats.reviews_count) * 10) / 10} par avis. Une référence fiable.
               </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const PremiumPage = ({ isPremium, setIsPremium }: { isPremium: boolean, setIsPremium: (v: boolean) => void }) => {
  const navigate = useNavigate();

  const handleActivate = () => {
    setIsPremium(true);
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-32 py-10 pb-32">
      {/* Existing Hero */}
      <header className="text-center space-y-8 pt-10">
        <Badge variant="premium">Echo Premium</Badge>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
          L'EXPÉRIENCE <br />
          <span className="text-accent-primary">SANS LIMITES.</span>
        </h1>
        <p className="text-text-muted text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
          Ne restez pas à la surface. Accédez à l'intégralité de l'intelligence musicale d'ÉCHO pour affiner votre oreille et vos choix.
        </p>
      </header>

    {/* Existing Pricing Columns */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="glass-card p-12 space-y-10 border-white/5 bg-bg-surface-light/30">
        <div className="space-y-2">
          <h3 className="text-2xl font-black uppercase tracking-tight">Version Gratuite</h3>
          <p className="text-xs font-bold text-text-muted uppercase tracking-widest">L'essentiel de la découverte</p>
        </div>
        <ul className="space-y-6">
          <li className="flex items-center gap-4 text-text-muted font-medium"><CheckCircle2 size={24} className="text-success/50" /> Accès à l'accueil et Explorer</li>
          <li className="flex items-center gap-4 text-text-muted font-medium"><CheckCircle2 size={24} className="text-success/50" /> Résumés IA principaux</li>
          <li className="flex items-center gap-4 text-text-muted font-medium"><CheckCircle2 size={24} className="text-success/50" /> Publication d'avis</li>
          <li className="flex items-center gap-4 text-text-muted opacity-40 font-medium line-through"><Lock size={24} /> 10 sauvegardes max</li>
          <li className="flex items-center gap-4 text-text-muted opacity-40 font-medium line-through"><Lock size={24} /> Publicité légère</li>
        </ul>
        <div className="pt-6 border-t border-white/5">
          <div className="text-5xl font-black text-white">0€<span className="text-lg text-text-muted font-bold ml-2">/mois</span></div>
        </div>
        <button className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 font-black text-sm uppercase tracking-widest text-text-muted">Votre formule actuelle</button>
      </div>

      <div className="glass-card p-12 space-y-10 border-accent-primary/40 relative overflow-hidden bg-gradient-to-br from-accent-primary/10 to-transparent shadow-2xl">
        <div className="absolute top-0 right-0 p-8"><Badge variant="premium">Meilleure Valeur</Badge></div>
        <div className="space-y-2">
          <h3 className="text-3xl font-black uppercase tracking-tight text-accent-primary">Echo Premium</h3>
          <p className="text-xs font-bold text-accent-secondary uppercase tracking-widest">Le plein potentiel critique</p>
        </div>
        <ul className="space-y-6">
          <li className="flex items-center gap-4 text-text-main font-bold"><CheckCircle2 size={24} className="text-accent-primary" /> Lecture illimitée des avis complets</li>
          <li className="flex items-center gap-4 text-text-main font-bold"><CheckCircle2 size={24} className="text-accent-primary" /> Filtres de découverte haute précision</li>
          <li className="flex items-center gap-4 text-text-main font-bold"><CheckCircle2 size={24} className="text-accent-primary" /> Parcours "Par où commencer" détaillés</li>
          <li className="flex items-center gap-4 text-text-main font-bold"><CheckCircle2 size={24} className="text-accent-primary" /> Sauvegardes & Listes illimitées</li>
          <li className="flex items-center gap-4 text-text-main font-bold"><CheckCircle2 size={24} className="text-accent-primary" /> Expérience 100% sans publicité</li>
        </ul>
        <div className="pt-6 border-t border-accent-primary/20">
          <div className="text-5xl font-black text-white">4.99€<span className="text-lg text-text-muted font-bold ml-2">/mois</span></div>
        </div>
        <button 
          onClick={handleActivate}
          className="w-full py-5 rounded-2xl premium-gradient text-white font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(255,107,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          {isPremium ? 'DÉJÀ PREMIUM' : "S'ABONNER MAINTENANT"}
        </button>
      </div>
    </div>

    {/* Section: Ce que ça change concrètement */}
    <section className="space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Ce que ça change <br /><span className="text-accent-secondary">concrètement.</span></h2>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">Voyez comment Premium transforme votre navigation quotidienne.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-accent-primary/10 rounded-2xl flex items-center justify-center text-accent-primary font-black">01</div>
            <h3 className="text-2xl font-black uppercase tracking-tight">Accès total à la pensée critique</h3>
            <p className="text-text-muted leading-relaxed">Fini les extraits tronqués. Lisez l'intégralité des analyses techniques, des comparaisons historiques et des avis argumentés de la communauté.</p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 bg-accent-secondary/10 rounded-2xl flex items-center justify-center text-accent-secondary font-black">02</div>
            <h3 className="text-2xl font-black uppercase tracking-tight">Navigation sans friction</h3>
            <p className="text-text-muted leading-relaxed">Concentrez-vous uniquement sur ce qui compte : la musique. Zéro bannière, zéro interruption, 100% immersion.</p>
          </div>
          <div className="space-y-6">
             <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center text-success font-black">03</div>
             <h3 className="text-2xl font-black uppercase tracking-tight">Algorithmes d'Accompagnement</h3>
             <p className="text-text-muted leading-relaxed">Débloquez les blocs "Profils proches du vôtre" et "Par où commencer" pour ne plus jamais errer dans les catalogues sans boussole.</p>
          </div>
        </div>

        <div className="relative group">
           <div className="absolute -inset-4 bg-accent-primary/20 blur-[100px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" />
           <div className="space-y-6 relative">
              {/* Visual Proof 1: Unlocked Review */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="glass-card p-6 border-accent-primary/30 shadow-2xl relative translate-x-4"
              >
                 <div className="flex items-center gap-3 mb-4">
                    <SafeImage src="https://images.unsplash.com/photo-1550684848-86a5d8727436?auto=format&fit=crop&q=80&w=100" className="w-8 h-8 rounded-full" />
                    <div className="text-[10px] font-black uppercase tracking-widest text-text-muted">Avis complet débloqué</div>
                    <Badge variant="premium" className="ml-auto">FULL</Badge>
                 </div>
                 <div className="space-y-2">
                    <div className="h-2 w-full bg-white/10 rounded-full" />
                    <div className="h-2 w-[90%] bg-white/10 rounded-full" />
                    <p className="text-xs font-bold text-white line-clamp-2 italic">"...un mixage révolutionnaire qui place la voix au centre d'un chaos harmonique maîtrisé... C'est ici que le genre se redéfinit..."</p>
                 </div>
              </motion.div>

              {/* Visual Proof 2: Advanced Filter */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 bg-accent-secondary/5 border-accent-secondary/30 shadow-xl -translate-x-8"
              >
                 <div className="flex items-center gap-2 mb-4 text-accent-secondary">
                    <Filter size={14} /> <span className="text-[10px] font-black uppercase tracking-widest">Filtre Précision</span>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1 bg-accent-secondary text-white rounded-lg text-[9px] font-black">PROD SATUREE</div>
                    <div className="px-3 py-1 bg-white/10 text-white rounded-lg text-[9px] font-black italic">BPM +140</div>
                    <div className="px-3 py-1 border border-accent-secondary/30 text-accent-secondary rounded-lg text-[9px] font-black">DÉSERT ROCK</div>
                 </div>
              </motion.div>

              {/* Visual Proof 3: Similar Profiles */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6 border-success/30 shadow-lg translate-x-12"
              >
                 <div className="flex items-center gap-2 mb-4 text-success">
                    <Users size={14} /> <span className="text-[10px] font-black uppercase tracking-widest">Auditeurs similaires</span>
                 </div>
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                       <SafeImage key={i} src={`https://images.unsplash.com/photo-1550684848-86a5d8727436?auto=format&fit=crop&q=80&w=100`} className="w-10 h-10 rounded-full border-2 border-bg-main" fallbackType="user" />
                    ))}
                    <div className="w-10 h-10 rounded-full bg-success/20 border-2 border-bg-main flex items-center justify-center text-success text-[10px] font-black">+14</div>
                 </div>
              </motion.div>
           </div>
        </div>
      </div>
    </section>

    {/* Section: Pour qui est le Premium */}
    <section className="bg-bg-surface-light/50 p-12 md:p-20 rounded-[3rem] border border-white/5 space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">Pour qui est <br /><span className="text-accent-primary">Echo Premium ?</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-6 text-center">
           <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-white mx-auto shadow-inner">
             <LayoutList size={28} />
           </div>
           <h4 className="text-xl font-black uppercase tracking-tight">Pour les lecteurs de fond</h4>
           <p className="text-text-muted text-sm leading-relaxed">Vous détestez rester en surface. Vous voulez comprendre l'histoire de chaque note et peser chaque argument de la critique.</p>
        </div>
        <div className="space-y-6 text-center">
           <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-white mx-auto shadow-inner">
             <ShieldCheck size={28} />
           </div>
           <h4 className="text-xl font-black uppercase tracking-tight">Pour les indécis exigeants</h4>
           <p className="text-text-muted text-sm leading-relaxed">Vous voulez être sûr(e) que votre prochaine écoute sera la bonne. Premium vous donne les clés pour comparer avant de cliquer.</p>
        </div>
        <div className="space-y-6 text-center">
           <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-white mx-auto shadow-inner">
             <TrendingUp size={28} />
           </div>
           <h4 className="text-xl font-black uppercase tracking-tight">Pour les explorateurs rapides</h4>
           <p className="text-text-muted text-sm leading-relaxed">Plus de temps à perdre avec des algorithmes génériques. Allez droit au but avec des filtres et des parcours d'experts ultra-précis.</p>
        </div>
      </div>

      <div className="pt-10 flex flex-col items-center space-y-6">
        <p className="text-text-muted font-bold text-lg mb-4 italic">Rejoignez 1,200+ membres déjà abonnés.</p>
        <button className="premium-gradient px-12 py-6 rounded-[2.5rem] font-black text-lg text-white shadow-2xl hover:scale-[1.05] active:scale-[0.95] transition-all">
           DÉBLOQUER MON EXPÉRIENCE
        </button>
        <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-black">ANNULABLE À TOUT MOMENT • ESSAI GRATUIT DE 7 JOURS</p>
      </div>
    </section>
  </div>
);
};

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
