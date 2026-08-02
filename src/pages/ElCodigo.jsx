import { useProsperityProgress } from '@/hooks/useProsperityProgress';
import PhaseCard from '@/components/features/codigo/PhaseCard';
import InlineAudioPlayer from '@/components/features/codigo/InlineAudioPlayer';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePdfStore } from '@/store/pdfStore';

export default function ElCodigo() {
  const { 
    phase1Completed, 
    phase2TrackerDays, 
    phase3Unlocked, 
    completePhase1, 
    advancePhase2Day 
  } = useProsperityProgress();
  
  const navigate = useNavigate();
  const { setLastReadPdf } = usePdfStore();

  const openPdf = (id) => {
    setLastReadPdf(id);
    navigate('/lector');
  };

  // Calculate master progress percentage
  const masterProgress = 100;

  return (
    <div className="p-5 space-y-8 pb-28 min-h-screen relative overflow-hidden bg-background">
      {/* Background mystical blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. Hero Section & Master Progress */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 relative z-10"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif text-primary tracking-tight leading-tight">
            El Código de la<br/>Prosperidad
          </h1>
          <p className="text-sm text-primary/70 font-medium">Tu viaje hacia la abundancia absoluta</p>
        </div>
        
        <Card className="bg-card/50 border-primary/20 shadow-lg">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold">Acceso Completo</span>
              <span className="text-primary font-mono font-bold tracking-widest">100% Desbloqueado</span>
            </div>
            <Progress value={masterProgress} className="h-2 bg-primary/10 shadow-[0_0_10px_rgba(212,175,55,0.2)]" />
          </CardContent>
        </Card>
      </motion.div>

      {/* 2. The Journey (Interactive Timeline) */}
      <div className="space-y-6 relative z-10">
        
        {/* FASE 1: Romper el Amarre */}
        <PhaseCard
          phaseNumber={1}
          title="Romper el Amarre"
          isLocked={false}
          statusLabel="Completado"
          statusVariant="outline"
          statusClassName="text-green-500 border-green-500"
          borderClass="border-l-green-500"
          bgClass="bg-card"
          delay={0.1}
        >
          <InlineAudioPlayer 
            title="Audio de Limpieza"
            durationLabel="5:00 min"
            onComplete={completePhase1}
          />
          
          <Button 
            variant="link" 
            className="p-0 h-auto text-primary text-sm"
            onClick={() => openPdf('limpieza-hogar')}
          >
            Ver transcripción completa (PDF)
          </Button>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="lore" className="border-border/50">
              <AccordionTrigger className="text-sm font-medium py-2">¿Qué está sucediendo aquí?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-xs leading-relaxed">
                Este audio utiliza frecuencias ancestrales para disolver la energía de escasez y limpiar creencias limitantes plantadas en tu infancia. Escúchalo en un lugar tranquilo para romper las cadenas energéticas.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </PhaseCard>

        {/* FASE 2: Activar la Frecuencia */}
        <PhaseCard
          phaseNumber={2}
          title="Activar la Frecuencia"
          isLocked={false}
          statusLabel="Acceso Instantáneo"
          statusVariant="outline"
          statusClassName="border-primary/30 text-primary bg-primary/10"
          borderClass="border-l-primary"
          bgClass="bg-gradient-to-br from-primary/10 to-card"
          delay={0.2}
        >
          <p className="text-sm text-muted-foreground">
            Escucha este audio antes de dormir durante 7 días consecutivos para alinear tu vibración con el universo.
          </p>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span>Progreso de Activación</span>
              <span className="text-primary font-mono">{phase2TrackerDays}/7 Días</span>
            </div>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div 
                  key={day}
                  className={`flex-1 aspect-square rounded-full flex items-center justify-center border ${
                    day <= phase2TrackerDays ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 
                    day === phase2TrackerDays + 1 ? 'bg-primary/20 border-primary text-primary animate-pulse' : 
                    'border-border/50 text-muted-foreground'
                  }`}
                >
                  {day <= phase2TrackerDays ? <CheckCircle2 size={14} /> : <span className="text-[10px] font-mono">{day}</span>}
                </div>
              ))}
            </div>
          </div>

          <Button 
            className="w-full shadow-md bg-primary text-primary-foreground mt-2" 
            onClick={advancePhase2Day}
            disabled={phase2TrackerDays >= 7}
          >
            {phase2TrackerDays >= 7 ? "Fase 2 Completada" : "Completar Activación de Hoy"}
          </Button>
          
          <Button 
            variant="link" 
            className="w-full text-primary text-sm h-auto p-0"
            onClick={() => openPdf('viaje-7-dias')}
          >
            Leer PDF
          </Button>
        </PhaseCard>

        {/* FASE 3: Abrir los Caminos */}
        <PhaseCard
          phaseNumber={3}
          title="Abrir los Caminos"
          isLocked={false}
          statusLabel="Rituales Desbloqueados"
          statusVariant="outline"
          statusClassName="border-primary/30 text-primary"
          borderClass="border-l-primary"
          delay={0.3}
        >
          <div className="space-y-3">
            <div className="bg-secondary/30 p-3 rounded-lg flex items-center gap-3 border border-primary/20">
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm text-foreground font-medium">
                Ritual: Atraer Dinero Inesperado
              </span>
            </div>
            <div className="bg-secondary/30 p-3 rounded-lg flex items-center gap-3 border border-primary/20">
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm text-foreground font-medium">
                Ritual: Pago de Deudas
              </span>
            </div>
            
            <Button 
              className="w-full bg-primary text-primary-foreground mt-2 shadow-lg shadow-primary/20"
              onClick={() => openPdf('luna-nueva')}
            >
              Abrir Rituales
            </Button>
          </div>
        </PhaseCard>

      </div>

      {/* 3. Testimonial Footer */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.6 }}
        className="pt-8 pb-4 flex flex-col items-center justify-center text-center space-y-4 relative z-10"
      >
        <Quote className="text-primary/30 w-8 h-8 rotate-180 mb-[-10px]" />
        <p className="text-sm italic text-muted-foreground px-6 font-serif leading-relaxed">
          "Para el universo nada es imposible. La cuestión nunca fue si el universo puede darte, sino si estás abierta para recibir."
        </p>
        <span className="text-xs font-bold uppercase tracking-widest text-primary/80">— La Sensitiva</span>
      </motion.div>

    </div>
  );
}
