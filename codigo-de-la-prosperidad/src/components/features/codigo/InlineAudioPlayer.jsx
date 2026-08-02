import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InlineAudioPlayer({ title, durationLabel, onComplete }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying && progress < 100) {
      // Simulate 5 second playback
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            if (onComplete) onComplete();
            return 100;
          }
          // Increment by 2% every 100ms = 100% in 5000ms
          return prev + 2; 
        });
      }, 100);
    }
  };

  return (
    <div className="bg-background/60 rounded-xl p-3 flex items-center gap-3 border border-border/50">
      <Button 
        size="icon" 
        onClick={handlePlayToggle}
        className={`rounded-full h-10 w-10 shrink-0 relative overflow-hidden transition-colors ${
          progress >= 100 
            ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' 
            : isPlaying 
              ? 'bg-primary/20 text-primary hover:bg-primary/30' 
              : 'bg-primary text-primary-foreground shadow-md'
        }`}
      >
        <div className="relative z-10 flex items-center justify-center">
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
        </div>
      </Button>
      
      <div className="flex-1 space-y-2">
        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
          <span>{isPlaying ? 'Reproduciendo...' : progress >= 100 ? 'Completado' : title}</span>
          <span>{durationLabel}</span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="h-1.5 w-full bg-primary/20 rounded-full overflow-hidden relative">
          <motion.div 
            className={`absolute top-0 left-0 bottom-0 ${progress >= 100 ? 'bg-green-500' : 'bg-primary'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
          />
        </div>
      </div>
      
      <Headphones size={18} className="text-primary/50 shrink-0" />
    </div>
  );
}
