import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Share, MoreVertical } from 'lucide-react';

export default function PwaInstallModal({ isOpen, onClose }) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] w-[90vw] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-2xl text-primary">Instalar Aplicación</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4 text-center">
          <p className="text-sm text-muted-foreground">
            Para una experiencia premium y acceso sin conexión, instala esta app en tu dispositivo.
          </p>

          {isIOS ? (
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <p className="text-sm font-medium">Instrucciones para iOS (Safari):</p>
              <ol className="text-sm text-left space-y-2 list-decimal list-inside">
                <li>Toca el botón <strong>Compartir</strong> <Share className="inline w-4 h-4 mx-1" /> en la barra inferior.</li>
                <li>Desplázate hacia abajo y selecciona <strong>"Agregar a inicio"</strong>.</li>
              </ol>
            </div>
          ) : (
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <p className="text-sm font-medium">Instrucciones para Android (Chrome):</p>
              <ol className="text-sm text-left space-y-2 list-decimal list-inside">
                <li>Toca el <strong>Menú</strong> <MoreVertical className="inline w-4 h-4 mx-1" /> en la esquina superior derecha.</li>
                <li>Selecciona <strong>"Instalar aplicación"</strong> o "Agregar a la pantalla principal".</li>
              </ol>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
