import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePdfStore = create(
  persist(
    (set) => ({
      lastReadPdfId: null,
      pdfProgress: {}, // { [pdfId]: pageNumber }
      isViewerFullscreen: false,
      
      setLastReadPdf: (id) => set({ lastReadPdfId: id }),
      saveProgress: (id, page) => set((state) => ({
        pdfProgress: { ...state.pdfProgress, [id]: page }
      })),
      setViewerFullscreen: (isFullscreen) => set({ isViewerFullscreen: isFullscreen }),
    }),
    {
      name: 'prosperidad-pdf-storage',
      partialize: (state) => ({ 
        lastReadPdfId: state.lastReadPdfId, 
        pdfProgress: state.pdfProgress 
      }), // Only persist these
    }
  )
);
