import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Loader2, Sparkles, ShieldCheck, Lock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlaceboLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    setIsLoading(true);

    // Simulated 1.5-second delay to build anticipation
    setTimeout(() => {
      localStorage.setItem('userEmail', email);
      
      if (onLogin) {
        onLogin(email);
      }
      
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[100dvh] p-6 bg-background relative overflow-hidden w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 1. Immersive Hero Section Background */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[150%] h-[50vh] bg-[radial-gradient(ellipse_at_top,_var(--color-primary)_0%,_transparent_70%)] opacity-20 pointer-events-none" />

      {/* Main Content Wrapper */}
      <div className="w-full flex flex-col items-center justify-center space-y-8 z-10 relative mt-[-5dvh]">
        
        {/* Header / VSL Copy */}
        <div className="text-center space-y-4 w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center bg-primary/10 shadow-[0_0_30px_rgba(212,175,55,0.15)] mb-2"
          >
            <Sparkles className="text-primary w-8 h-8 opacity-90" />
          </motion.div>
          
          <h1 className="text-4xl font-serif text-foreground tracking-tight leading-tight">
            El Código de la<br/>Prosperidad
          </h1>
          <p className="text-muted-foreground text-sm max-w-[280px] mx-auto leading-relaxed">
            Tu ventana cósmica está abierta. Activa tu abundancia absoluta.
          </p>
        </div>

        {/* 2. The "Placebo" Form Container */}
        <Card className="w-full bg-card/80 backdrop-blur-xl border-primary/20 shadow-2xl">
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-6">
              
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input 
                    type="email" 
                    placeholder="Ingresa tu correo electrónico" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    disabled={isLoading}
                    className="pl-10 h-12 bg-background/50 border-border focus:border-primary transition-colors text-base"
                  />
                </div>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-destructive text-xs font-medium ml-1 mt-1 text-left"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={isLoading || !email}
                className="w-full h-12 text-base font-semibold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all bg-primary text-primary-foreground relative overflow-hidden"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sincronizando...
                  </>
                ) : (
                  "Activar mi Código"
                )}
              </Button>
              
            </form>
          </CardContent>
        </Card>

        {/* 3. Social Proof */}
        <div className="flex flex-col items-center justify-center space-y-3 pt-2">
          <div className="flex -space-x-3">
            <Avatar className="border-2 border-background w-8 h-8">
              <AvatarFallback className="bg-primary/20 text-[10px] text-primary">M</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background w-8 h-8">
              <AvatarFallback className="bg-primary/40 text-[10px] text-primary-foreground">C</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background w-8 h-8">
              <AvatarFallback className="bg-primary/60 text-[10px] text-primary-foreground">A</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background w-8 h-8">
              <AvatarFallback className="bg-primary/80 text-[10px] text-primary-foreground">E</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background w-8 h-8 flex items-center justify-center bg-card">
              <span className="text-[10px] font-bold">+</span>
            </Avatar>
          </div>
          <div className="flex items-center gap-1 text-xs text-foreground font-medium">
            <Star className="w-3 h-3 fill-primary text-primary" />
            <Star className="w-3 h-3 fill-primary text-primary" />
            <Star className="w-3 h-3 fill-primary text-primary" />
            <Star className="w-3 h-3 fill-primary text-primary" />
            <Star className="w-3 h-3 fill-primary text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">
            Únete a más de <span className="text-foreground font-semibold">30,000</span> personas prosperando
          </p>
        </div>
      </div>

      {/* Trust Badges Footer */}
      <div className="absolute bottom-6 left-0 right-0 w-full flex justify-center gap-6 text-xs text-muted-foreground z-10">
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 opacity-70" />
          <span className="text-[10px]">Acceso Seguro</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Lock className="w-4 h-4 opacity-70" />
          <span className="text-[10px]">Privacidad Garantizada</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Sparkles className="w-4 h-4 opacity-70" />
          <span className="text-[10px]">Acceso Vitalicio</span>
        </div>
      </div>
      
    </motion.div>
  );
}
