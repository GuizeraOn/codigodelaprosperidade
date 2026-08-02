import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, ArrowLeft, Bookmark, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import { useSwipeable } from 'react-swipeable';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { usePdfStore } from '@/store/pdfStore';
import mockPdfs from '@/data/mockPdfs.json';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set worker path for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// --- Custom Hooks ---

// 1. Scroll Direction Hook for Auto-Hide Toolbar
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [prevOffset, setPrevOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.scrollY;
      if (Math.abs(currentOffset - prevOffset) < 10) return; // Add threshold
      
      const direction = currentOffset > prevOffset ? 'down' : 'up';
      if (direction !== scrollDirection && currentOffset > 50) {
        setScrollDirection(direction);
      }
      if (currentOffset <= 50 && scrollDirection !== 'up') {
        setScrollDirection('up'); // Always show when at the top
      }
      setPrevOffset(currentOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDirection, prevOffset]);

  return scrollDirection;
}

// Removed useContainerWidth in favor of direct window listener
export default function Lector() {
  const { lastReadPdfId, setLastReadPdf, pdfProgress, saveProgress } = usePdfStore();
  const navigate = useNavigate();

  // Find the active PDF metadata
  const activePdf = mockPdfs.find(p => p.id === lastReadPdfId);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Hooks for Premium UX
  const scrollDirection = useScrollDirection();
  
  // Absolute viewport width to enforce full-bleed PDF scaling
  const [pdfWidth, setPdfWidth] = useState(window.innerWidth || document.documentElement.clientWidth || 400);
  
  useEffect(() => {
    const handleResize = () => {
      setPdfWidth(document.documentElement.clientWidth || window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    // Trigger once on mount to ensure precise measurement
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Swipe logic
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => changePage(1),
    onSwipedRight: () => changePage(-1),
    preventScrollOnSwipe: true,
    trackMouse: false
  });

  // Load saved progress when a PDF is opened
  useEffect(() => {
    if (activePdf && pdfProgress[activePdf.id]) {
      setPageNumber(pdfProgress[activePdf.id]);
    } else {
      setPageNumber(1);
    }
    // Scroll to top when changing page or opening
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsReady(false);
  }, [activePdf?.id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const changePage = (offset) => {
    const newPage = Math.min(Math.max(1, pageNumber + offset), numPages || 1);
    if (newPage !== pageNumber) {
      setPageNumber(newPage);
      if (activePdf) saveProgress(activePdf.id, newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closePdf = () => {
    setLastReadPdf(null);
  };

  const handleCompleteRitual = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate('/');
    }, 2000);
  };

  const renderEmptyState = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-8 pb-32 bg-background relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="w-24 h-24 rounded-full bg-card/80 border border-primary/20 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.15)] relative z-10 backdrop-blur-md">
        <Sparkles className="text-primary w-10 h-10" />
      </div>
      <div className="space-y-3 relative z-10">
        <h2 className="text-2xl font-serif text-foreground tracking-tight">Tu mente está lista<br/>para recibir</h2>
        <p className="text-sm text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
          Selecciona un material sagrado de la Bóveda para comenzar tu lectura y alinear tu frecuencia.
        </p>
      </div>
      <Button 
        onClick={() => navigate('/materiales')}
        className="px-8 h-12 shadow-lg shadow-primary/20 bg-primary text-primary-foreground hover:shadow-primary/40 transition-all relative z-10"
      >
        Ir a Materiales
      </Button>
    </motion.div>
  );

  const renderActiveState = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-screen overflow-hidden bg-background relative"
    >
      {/* Top App Bar - Fixed within the Flex stack */}
      <div className="h-12 pt-[env(safe-area-inset-top,0px)] px-2 border-b border-border bg-background/90 backdrop-blur-md shrink-0 flex justify-between items-center z-40 w-full shadow-sm">
        <Button variant="ghost" size="icon" onClick={closePdf} className="rounded-full h-8 w-8 text-foreground hover:bg-white/10">
          <ArrowLeft size={18} />
        </Button>
        <h2 className="text-xs font-serif font-medium text-foreground truncate max-w-[200px]">
          {activePdf.title}
        </h2>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-primary hover:bg-primary/10">
          <Bookmark size={18} />
        </Button>
      </div>

      {/* Full-Bleed Edge-to-Edge PDF Area - Flex 1 handles scrolling */}
      <div 
        {...swipeHandlers}
        className="flex-1 w-full bg-background flex flex-col items-center overflow-y-auto no-scrollbar"
      >
        <div className="w-full">
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={3}
            centerOnInit
            wheel={{ step: 0.1 }}
            doubleClick={{ disabled: false, step: 0.5 }}
          >
            <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full">
              <Document
                file={`/pdfs/${activePdf.fileName}`}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="w-full flex items-center justify-center min-h-[60vh] bg-background">
                    <div className="animate-pulse text-primary flex flex-col items-center gap-4">
                      <Sparkles size={32} className="animate-spin-slow" />
                      <span className="text-sm font-mono tracking-widest uppercase">Canalizando...</span>
                    </div>
                  </div>
                }
                error={
                  <div className="w-full flex items-center justify-center min-h-[60vh] text-center p-6 text-destructive text-sm bg-background">
                    Error cargando {activePdf.fileName}.
                  </div>
                }
                className="flex flex-col items-center w-full"
              >
                <Page 
                  pageNumber={pageNumber} 
                  width={pdfWidth} // Absolute width strictly matching viewport
                  renderTextLayer={false} 
                  renderAnnotationLayer={false}
                  onRenderSuccess={() => setIsReady(true)}
                  className={`transition-opacity duration-500 bg-transparent ${isReady ? 'opacity-100' : 'opacity-0'}`}
                />
              </Document>
            </TransformComponent>
          </TransformWrapper>
        </div>
      </div>

      {/* Prominent Full-Width Control Panel Footer */}
      <div className="w-full shrink-0 bg-background border-t border-border/50 px-6 pt-4 pb-[80px] flex flex-row items-center justify-between z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        
        {/* Pagination Left */}
        <Button 
          variant="ghost" 
          size="icon" 
          disabled={pageNumber <= 1}
          onClick={() => changePage(-1)}
          className="rounded-full h-14 w-14 hover:bg-white/10 text-foreground"
        >
          <ChevronLeft size={32} />
        </Button>

        {/* Prominent Page Counter */}
        <div className="flex flex-col items-center justify-center px-4">
          <span className="text-lg font-mono text-muted-foreground tracking-widest whitespace-nowrap">
            <span className="text-foreground font-semibold text-xl">{pageNumber}</span> <span className="opacity-50">/</span> {numPages || '--'}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-primary mt-1">Página</span>
        </div>

        {/* Pagination Right */}
        <Button 
          variant="ghost" 
          size="icon" 
          disabled={!numPages || pageNumber >= numPages}
          onClick={() => changePage(1)}
          className="rounded-full h-14 w-14 hover:bg-white/10 text-foreground"
        >
          <ChevronRight size={32} />
        </Button>

        {/* Spacer & Divider */}
        <div className="w-[1px] h-10 bg-border mx-2" />

        {/* Primary Action Button (Upscaled FAB-style) */}
        <Button 
          onClick={handleCompleteRitual}
          size="icon"
          className="rounded-full h-14 w-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(212,175,55,0.4)] shrink-0 transition-transform active:scale-95"
        >
          <Check size={28} />
        </Button>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-primary/30 shadow-2xl rounded-2xl p-6 z-50 flex flex-col items-center gap-4 w-3/4 max-w-sm backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="text-primary w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-lg text-foreground">Ritual Completado</h3>
              <p className="text-xs text-muted-foreground mt-1">Tu racha de prosperidad ha aumentado.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return activePdf ? renderActiveState() : renderEmptyState();
}
