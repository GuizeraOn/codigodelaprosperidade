import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PhaseCard({
  phaseNumber,
  title,
  isLocked,
  statusLabel,
  statusVariant = 'default',
  statusClassName = '',
  borderClass = 'border-l-primary',
  bgClass = 'bg-card',
  children,
  delay = 0
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    >
      <Card 
        className={`border-l-4 ${borderClass} ${bgClass} shadow-lg transition-all relative overflow-hidden`}
      >
        <AnimatePresence>
          {isLocked && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              className="absolute inset-0 bg-background/50 backdrop-blur-[2px] flex flex-col items-center justify-center z-20 space-y-3"
            >
              <div className="bg-card/90 px-4 py-2 rounded-full border border-border shadow-lg flex items-center gap-2">
                <Lock size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">Fase Bloqueada</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <CardContent className={`p-5 space-y-4 transition-all duration-500 ${isLocked ? 'blur-[2px] opacity-70' : 'blur-0 opacity-100'}`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">
                Fase {phaseNumber}
              </div>
              <h3 className="text-lg font-serif">{title}</h3>
            </div>
            
            {statusLabel && (
              <Badge variant={statusVariant} className={statusClassName}>
                {statusLabel}
              </Badge>
            )}
          </div>
          
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}
