import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProsperityProgress } from '@/hooks/useProsperityProgress';
import { Play, Pause, ArrowLeft, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const PHASE_DATA = {
  '1': {
    title: 'Fase 1: Romper el Amarre',
    instruction: 'Ponte los audífonos, siéntate durante los 5 minutos.',
    audioSrc: '/mp3/Fase 1.mp3',
    completionMessage: 'Amarre roto. Tu camino está limpio.',
    onComplete: (hooks) => hooks.completePhase1(),
  },
  '2': {
    title: 'Fase 2: Activar la Frecuencia',
    instruction: 'Escúchalo acostada, antes de dormir. Puedes quedarte dormida, está bien.',
    audioSrc: '/mp3/Fase 2.mp3',
    completionMessage: 'Frecuencia activada por esta noche.',
    onComplete: (hooks) => hooks.advancePhase2Day(),
  },
  '3': {
    title: 'Fase 3: Abrir los Caminos',
    instruction: 'Ponte los audífonos, siéntate durante los 5 minutos.',
    audioSrc: '/mp3/Fase 3.mp3',
    completionMessage: 'Tus caminos hacia la abundancia están abiertos.',
    onComplete: () => {}, // Phase 3 doesn't have a next phase
  }
};

export default function AudioPlayerScreen() {
  const { phaseId } = useParams();
  const navigate = useNavigate();
  const progressHooks = useProsperityProgress();
  
  const phaseData = PHASE_DATA[phaseId];
  const isPhase2 = phaseId === '2';
  
  const audioRef = useRef(null);
  const maxTimePlayed = useRef(0);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Redirect if invalid phase
  useEffect(() => {
    if (!phaseData) navigate('/');
  }, [phaseData, navigate]);

  // Media Session API for background playing
  useEffect(() => {
    if (phaseData && 'mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: phaseData.title,
        artist: 'La Sensitiva',
        album: 'El Código de la Prosperidad',
      });

      navigator.mediaSession.setActionHandler('play', () => {
        audioRef.current?.play();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        audioRef.current?.pause();
      });
      // We intentionally do not set seek actions to prevent skipping
    }
  }, [phaseData]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Playback failed", e));
    }
    setIsPlaying(!isPlaying);
  };

  const skipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 15);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    
    // Anti-cheat: prevent seeking forward
    if (current > maxTimePlayed.current + 2) {
      audioRef.current.currentTime = maxTimePlayed.current;
    } else {
      maxTimePlayed.current = Math.max(maxTimePlayed.current, current);
    }

    setCurrentTime(audioRef.current.currentTime);
    setProgressPct((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsCompleted(true);
    phaseData.onComplete(progressHooks);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!phaseData) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-between text-foreground overflow-hidden">
      
      {/* Immersive Breathing Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_60%)] opacity-10 animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>

      <audio
        ref={audioRef}
        src={phaseData.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      />

      {/* Header */}
      <div className="w-full flex justify-between items-center p-6 relative z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full text-foreground/70 hover:text-foreground hover:bg-white/10">
          <ArrowLeft size={24} />
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div 
            key="player"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center w-full max-w-sm px-6 relative z-10 space-y-12"
          >
            {/* Title & Instructions */}
            <div className="text-center space-y-3">
              <h1 className="text-2xl font-serif text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                {phaseData.title}
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px] mx-auto">
                {phaseData.instruction}
              </p>
            </div>

            {/* Giant Circular Progress Ring */}
            <div className="relative w-64 h-64 flex items-center justify-center group">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="2" className="text-primary/10" />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeDasharray="283" 
                  strokeDashoffset={283 - (283 * progressPct) / 100}
                  className="text-primary transition-all duration-300 ease-linear drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" 
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-serif text-foreground tabular-nums tracking-tight">
                  {formatTime(currentTime)}
                </span>
                <span className="text-xs text-primary/70 font-mono mt-1">
                  / {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-8 w-full">
              <Button variant="ghost" size="icon" onClick={skipBackward} className="text-foreground/70 hover:text-foreground h-12 w-12 rounded-full">
                <RotateCcw size={24} />
              </Button>
              
              <Button 
                onClick={togglePlay} 
                className="w-20 h-20 rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all hover:scale-105"
              >
                {isPlaying ? <Pause size={32} className="fill-current" /> : <Play size={32} className="fill-current ml-2" />}
              </Button>

              <div className="w-12 h-12" /> {/* Placeholder for balance */}
            </div>

            {/* Phase 2 Moons Tracker */}
            {isPhase2 && (
              <div className="flex items-center gap-2 mt-4 opacity-80">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div 
                    key={day}
                    className={`w-3 h-3 rounded-full transition-all ${
                      day <= progressHooks.phase2TrackerDays 
                        ? 'bg-primary shadow-[0_0_8px_rgba(212,175,55,0.8)]' 
                        : 'bg-primary/20 border border-primary/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="completion"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center w-full max-w-sm px-6 relative z-10 space-y-8"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.3)]">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>
            
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-serif text-foreground">Completado</h2>
              <p className="text-lg text-primary/90 font-medium">
                {phaseData.completionMessage}
              </p>
            </div>

            <Button 
              className="w-full h-14 text-lg bg-primary text-primary-foreground shadow-lg mt-8"
              onClick={() => navigate('/')}
            >
              Continuar
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
