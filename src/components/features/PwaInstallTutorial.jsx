import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Share, PlusSquare, MoreVertical, MonitorSmartphone, Download, CheckCircle2 } from 'lucide-react';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import { motion } from 'framer-motion';

export default function PwaInstallTutorial({ isOpen, onClose }) {
  const { isIOS } = useDeviceDetect();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] w-[90vw] rounded-2xl bg-card border-primary/20 shadow-2xl p-0 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-b from-primary/10 to-transparent p-6 pb-2 text-center relative">
          <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-[40px] pointer-events-none" />
          <DialogHeader className="space-y-3 relative z-10">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <MonitorSmartphone className="text-primary w-6 h-6" />
            </div>
            <DialogTitle className="text-2xl font-serif tracking-tight text-foreground text-center">
              Instala la Aplicación
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground text-center px-2">
              Sigue estos pasos rápidos para tener acceso directo y usar la app sin conexión.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Instructions Section */}
        <div className="p-6 pt-4">
          {isIOS ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-4 p-3 rounded-xl bg-muted/30 border border-border/50">
                <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                  <Share className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Paso 1</p>
                  <p className="text-sm text-muted-foreground">Toca el ícono de <strong>Compartir</strong> en la barra de abajo.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-xl bg-muted/30 border border-border/50">
                <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                  <PlusSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Paso 2</p>
                  <p className="text-sm text-muted-foreground">Desliza hacia abajo y busca la opción <strong>"Agregar a inicio"</strong>.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-xl bg-muted/30 border border-border/50">
                <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Paso 3</p>
                  <p className="text-sm text-muted-foreground">Toca <strong>"Agregar"</strong> arriba a la derecha. ¡Y listo!</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-4 p-3 rounded-xl bg-muted/30 border border-border/50">
                <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                  <MoreVertical className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Paso 1</p>
                  <p className="text-sm text-muted-foreground">Toca los <strong>tres puntitos</strong> en la esquina superior derecha.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-xl bg-muted/30 border border-border/50">
                <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                  <Download className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Paso 2</p>
                  <p className="text-sm text-muted-foreground">Selecciona <strong>"Instalar aplicación"</strong> o "Agregar a la pantalla principal".</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-xl bg-muted/30 border border-border/50">
                <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Paso 3</p>
                  <p className="text-sm text-muted-foreground">Confirma tocando <strong>"Instalar"</strong>. ¡Y listo!</p>
                </div>
              </div>
            </motion.div>
          )}

          <Button 
            className="w-full mt-6 h-12 font-semibold text-base shadow-[0_0_20px_rgba(212,175,55,0.3)] bg-primary text-primary-foreground"
            onClick={onClose}
          >
            Entendido
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
