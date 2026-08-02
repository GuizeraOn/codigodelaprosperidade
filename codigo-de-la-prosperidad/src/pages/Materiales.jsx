import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, SlidersHorizontal, BookOpen, Clock, Moon, Sparkles, Shield, Star, LockOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePdfStore } from '@/store/pdfStore';
import { motion } from 'framer-motion';

const enrichedMockPdfs = [
  {
    id: "limpieza-hogar",
    title: "Guía Práctica de Limpieza",
    category: "Limpieza",
    estimatedReadTime: "12 min",
    description: "Elimina bloqueos ancestrales y desata los nudos de escasez de tu aura.",
    icon: Shield,
    badge: null
  },
  {
    id: "viaje-7-dias",
    title: "Guía de Prosperidad 7 Días",
    category: "Activacion",
    estimatedReadTime: "15 min",
    description: "Activa tu campo cuántico de recepción de abundancia.",
    icon: Sparkles,
    badge: "Esencial"
  },
  {
    id: "proteccion",
    title: "Guía Práctica de Protección",
    category: "Limpieza",
    estimatedReadTime: "8 min",
    description: "Aprende a blindar tu energía contra la envidia y el mal de ojo.",
    icon: LockOpen,
    badge: null
  },
  {
    id: "alineacion-7-noches",
    title: "Guía de 7 Noches",
    category: "Activacion",
    estimatedReadTime: "20 min",
    description: "Sincroniza tus chakras con el universo antes de dormir.",
    icon: Star,
    badge: "Premium"
  },
  {
    id: "ritual-diario",
    title: "Ritual Diario 5 Minutos",
    category: "Rituales",
    estimatedReadTime: "5 min",
    description: "Tu píldora espiritual diaria para abrir los caminos.",
    icon: BookOpen,
    badge: "Diario"
  },
  {
    id: "calendario",
    title: "Calendario Espiritual 2026",
    category: "Rituales",
    estimatedReadTime: "10 min",
    description: "Fechas astrológicas clave para potenciar tus intenciones.",
    icon: Moon,
    badge: "Exclusivo"
  },
  {
    id: "luna-nueva",
    title: "Rituales de Luna Nueva",
    category: "Rituales",
    estimatedReadTime: "15 min",
    description: "Aprovecha la energía lunar para manifestar dinero inesperado.",
    icon: Moon,
    badge: null
  },
  {
    id: "liberacion",
    title: "Liberación Guía",
    category: "Limpieza",
    estimatedReadTime: "10 min",
    description: "Protocolo de emergencia para soltar ataduras emocionales urgentes.",
    icon: Shield,
    badge: null
  }
];

export default function Materiales() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Todos');
  const navigate = useNavigate();
  const { setLastReadPdf } = usePdfStore();

  const handleOpenPdf = (id) => {
    setLastReadPdf(id);
    navigate('/lector');
  };

  const filteredPdfs = useMemo(() => {
    return enrichedMockPdfs.filter((pdf) => {
      const matchesSearch = pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            pdf.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeTab === 'Todos' || pdf.category === activeTab;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="p-5 space-y-6 pb-28 min-h-screen relative bg-background">
      
      {/* 1. Hero & Utility Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 relative z-10"
      >
        <div className="space-y-1">
          <h1 className="text-3xl font-serif text-primary tracking-tight">La Bóveda de Prosperidad</h1>
          <p className="text-sm text-muted-foreground">Tus herramientas sagradas para la manifestación.</p>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Buscar grimorios, rituales..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-11 bg-card/50 border-border focus:border-primary/50 text-sm"
            />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 shrink-0 bg-card/50 border-border">
            <SlidersHorizontal className="w-4 h-4 text-primary" />
          </Button>
        </div>
      </motion.div>

      {/* 2. Categorization & 3. Rich Horizontal Cards */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative z-10"
      >
        <Tabs defaultValue="Todos" value={activeTab} onValueChange={setActiveTab} className="w-full">
          
          <TabsList className="w-full h-auto flex flex-wrap gap-2 bg-transparent justify-start mb-6">
            <TabsTrigger value="Todos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card/50 border border-border px-4 py-2 rounded-full text-xs">Todos</TabsTrigger>
            <TabsTrigger value="Limpieza" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card/50 border border-border px-4 py-2 rounded-full text-xs">Limpieza</TabsTrigger>
            <TabsTrigger value="Activacion" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card/50 border border-border px-4 py-2 rounded-full text-xs">Activación</TabsTrigger>
            <TabsTrigger value="Rituales" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card/50 border border-border px-4 py-2 rounded-full text-xs">Rituales</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 m-0 outline-none">
            {filteredPdfs.length > 0 ? (
              filteredPdfs.map((pdf, idx) => (
                <motion.div
                  key={pdf.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card 
                    className="flex flex-row overflow-hidden bg-card/80 border-border hover:border-primary/30 transition-colors shadow-lg cursor-pointer group"
                    onClick={() => handleOpenPdf(pdf.id)}
                  >
                    {/* Visual Anchor (Left) */}
                    <div className="w-24 bg-gradient-to-br from-primary/10 to-background flex flex-col items-center justify-center border-r border-border/50 shrink-0 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-1 opacity-20"><Sparkles size={24}/></div>
                      <pdf.icon size={28} className="text-primary mb-2 z-10 group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Content (Right) */}
                    <div className="flex-1 p-4 flex flex-col justify-between space-y-2">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="font-serif text-[15px] font-medium leading-tight text-foreground line-clamp-2">{pdf.title}</h3>
                          {pdf.badge && (
                            <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 border-primary/40 text-primary uppercase shrink-0">
                              {pdf.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 italic">{pdf.description}</p>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock size={12} />
                          <span className="text-[10px] font-mono">{pdf.estimatedReadTime} lectura</span>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                          <ArrowRight size={12} className="text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-10 opacity-60">
                <p className="text-sm text-muted-foreground">No se encontraron grimorios.</p>
              </div>
            )}
          </TabsContent>

        </Tabs>
      </motion.div>

    </div>
  );
}
