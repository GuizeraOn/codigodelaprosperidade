import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { usePdfStore } from '@/store/pdfStore';
import { motion } from 'framer-motion';
import { Maximize, Minimize, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import mockPdfs from '@/data/mockPdfs.json';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set worker path for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer() {
  const { lastReadPdfId, pdfProgress, saveProgress, isViewerFullscreen, setViewerFullscreen } = usePdfStore();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [toastMessage, setToastMessage] = useState(null);

  const activePdf = mockPdfs.find(p => p.id === lastReadPdfId);

  useEffect(() => {
    if (activePdf && pdfProgress[activePdf.id]) {
      setPageNumber(pdfProgress[activePdf.id]);
      setToastMessage("Bienvenido de nuevo, retomando tu lectura.");
      setTimeout(() => setToastMessage(null), 3000);
    } else {
      setPageNumber(1);
    }
  }, [activePdf?.id]);

  if (!activePdf) return null;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const changePage = (offset) => {
    const newPage = Math.min(Math.max(1, pageNumber + offset), numPages || 1);
    setPageNumber(newPage);
    saveProgress(activePdf.id, newPage);
  };

  return (
    <motion.div 
      className={`flex flex-col bg-background ${isViewerFullscreen ? 'absolute inset-0 z-40' : 'h-full'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Top Bar */}
      <div className="p-4 border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center flex-shrink-0 pt-[env(safe-area-inset-top,1rem)]">
        <div>
          <h2 className="text-sm font-semibold text-primary truncate max-w-[250px]">{activePdf.title}</h2>
          <p className="text-xs text-muted-foreground">{activePdf.category}</p>
        </div>
        <button 
          onClick={() => setViewerFullscreen(!isViewerFullscreen)}
          className="p-2 rounded-full hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
        >
          {isViewerFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>
      
      {/* Toast Notification */}
      {toastMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-20 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-4 py-2 rounded-full shadow-lg z-50 whitespace-nowrap"
        >
          {toastMessage}
        </motion.div>
      )}

      {/* PDF Document Area */}
      <div className="flex-1 overflow-auto relative bg-muted/30 flex justify-center p-4 pb-24">
        <Document
          file={`/pdfs/${activePdf.fileName}`}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="animate-pulse text-primary mt-10">Conectando con el material...</div>}
          error={<div className="text-destructive mt-10 text-sm">Error cargando el material. Verifica si el archivo fue añadido a public/pdfs/</div>}
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale} 
            renderTextLayer={false} 
            renderAnnotationLayer={false}
            className="shadow-2xl rounded-sm overflow-hidden border border-border/30"
          />
        </Document>
      </div>

      {/* Custom Bottom Controls */}
      <div className={`absolute bottom-0 w-full bg-card/95 backdrop-blur-md border-t border-border/50 p-4 flex items-center justify-between z-10 ${!isViewerFullscreen ? 'mb-16' : 'pb-[calc(1rem+env(safe-area-inset-bottom))]'}`}>
        <button 
          onClick={() => changePage(-1)}
          disabled={pageNumber <= 1}
          className="p-2 rounded-full hover:bg-muted disabled:opacity-30 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft size={24} />
        </button>
        
        <span className="text-sm font-mono tracking-widest text-muted-foreground">
          {pageNumber} <span className="opacity-50">/</span> {numPages || '--'}
        </span>

        <button 
          onClick={() => changePage(1)}
          disabled={pageNumber >= numPages}
          className="p-2 rounded-full hover:bg-muted disabled:opacity-30 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </motion.div>
  );
}
