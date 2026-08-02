import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { DownloadCloud, Bell, Moon, LogOut, ShieldCheck, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Perfil() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [initials, setInitials] = useState('U');
  
  // Mock Toggles
  const [dailyReminder, setDailyReminder] = useState(true);
  const [moonAlerts, setMoonAlerts] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setInitials(storedEmail.substring(0, 2).toUpperCase());
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    window.location.href = '/'; // Hard reload to clear all states and trigger Auth flow
  };

  const triggerInstallPrompt = () => {
    // In a real scenario, this connects to the PwaInstallModal state in App.jsx via Context
    // For now, we mock the interaction with an alert or simply leave it as a high-value CTA.
    alert("Iniciando proceso de instalación de aplicación nativa...");
  };

  return (
    <div className="p-5 space-y-8 pb-28 min-h-screen bg-background relative overflow-hidden">
      {/* Background mystical blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-64 h-64 bg-accent/20 rounded-full blur-[80px] pointer-events-none" />

      {/* 1. VIP User Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center space-y-4 pt-6 relative z-10"
      >
        <div className="relative">
          <Avatar className="w-20 h-20 ring-2 ring-primary/50 ring-offset-2 ring-offset-background shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <AvatarFallback className="bg-card text-2xl font-serif text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1 border border-primary/20">
            <ShieldCheck size={16} className="text-primary" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-foreground">{email || "Buscador de Abundancia"}</h2>
          <div className="mt-2 inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border border-primary/20">
            <span>💎 Premium</span>
            <span className="opacity-50">•</span>
            <span>Acceso Vitalicio</span>
          </div>
        </div>
      </motion.div>

      {/* 2. PWA Installation Hero Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10"
      >
        <Card className="bg-gradient-to-r from-primary/20 via-primary/5 to-transparent border-primary/30 shadow-lg shadow-primary/5 overflow-hidden">
          <CardContent className="p-5 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-serif text-lg text-primary">Desbloquea la Experiencia Nativa</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Instala la app en tu teléfono para acceso instantáneo a tus rituales.
              </p>
            </div>
            <Button 
              onClick={triggerInstallPrompt}
              className="shrink-0 bg-primary text-primary-foreground shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-primary/50"
            >
              <DownloadCloud size={18} className="mr-2" />
              Instalar
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* 3. Preferences (Placebo Settings) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3 relative z-10"
      >
        <h3 className="text-sm font-semibold tracking-wide text-foreground/80 px-1">Preferencias</h3>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-0 divide-y divide-border/30">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bell size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Recordatorio de Ritual Diario</p>
                  <p className="text-[10px] text-muted-foreground">Notificaciones push cada mañana.</p>
                </div>
              </div>
              <Switch checked={dailyReminder} onCheckedChange={setDailyReminder} />
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Moon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Alertas de Fase Lunar</p>
                  <p className="text-[10px] text-muted-foreground">Sincroniza tus intenciones con la luna.</p>
                </div>
              </div>
              <Switch checked={moonAlerts} onCheckedChange={setMoonAlerts} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 4. Support & FAQ (Content Filler) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3 relative z-10"
      >
        <h3 className="text-sm font-semibold tracking-wide text-foreground/80 px-1">Ayuda y Soporte</h3>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-2">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-border/30">
                <AccordionTrigger className="text-sm py-3 px-2 hover:no-underline hover:text-primary transition-colors">
                  <div className="flex items-center gap-2">
                    <HelpCircle size={14} className="text-muted-foreground" />
                    ¿Cómo realizo los rituales?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed px-2 pb-3">
                  Ve a la pestaña 'El Código' y sigue el orden establecido. Tómate 5 minutos al día en un lugar tranquilo para alinear tu frecuencia energética.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-b-0">
                <AccordionTrigger className="text-sm py-3 px-2 hover:no-underline hover:text-primary transition-colors">
                  <div className="flex items-center gap-2">
                    <HelpCircle size={14} className="text-muted-foreground" />
                    ¿Puedo perder mi acceso?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed px-2 pb-3">
                  No, tu acceso al Código de la Prosperidad es vitalicio. La bóveda siempre estará aquí para ti.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>

      {/* 5. Danger Zone (Logout) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pt-6 relative z-10"
      >
        <Separator className="bg-border/30 mb-6" />
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut size={16} className="mr-2" />
          Cerrar Sesión
        </Button>
      </motion.div>

    </div>
  );
}
