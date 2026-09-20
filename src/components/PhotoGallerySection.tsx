import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, ZoomIn, X, ChevronLeft, ChevronRight, Sparkles, Plus, ExternalLink } from 'lucide-react';
import { PhotoItem } from '../types';

interface PhotoGallerySectionProps {
  photos: PhotoItem[];
  recipientName: string;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({
  photos: initialPhotos,
  recipientName,
}) => {
  const [photosList, setPhotosList] = useState<PhotoItem[]>(initialPhotos);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for adding custom memories
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');

  // Mobile swipe tracking
  const touchStartX = useRef<number | null>(null);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
    setIsZoomed(false);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + photosList.length) % photosList.length);
    setIsZoomed(false);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % photosList.length);
    setIsZoomed(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const newPhoto: PhotoItem = {
      id: `custom-${Date.now()}`,
      url: newUrl.trim(),
      title: newTitle.trim() || 'Precious Moment',
      caption: newCaption.trim() || `Unforgettable memory with ${recipientName}.`,
      aspectRatio: 'landscape',
    };

    setPhotosList(prev => [newPhoto, ...prev]);
    setNewTitle('');
    setNewUrl('');
    setNewCaption('');
    setShowAddModal(false);
  };

  return (
    <section id="memories" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Treasured Snapshots</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
            Memories of {recipientName}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 font-light max-w-xl">
            A golden collection of laughter, victories, and unforgettable moments together.
          </p>
        </div>

        {/* Action button to add photos dynamically */}
        <button
          id="add-photo-button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium transition-all shadow-md active:scale-95 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Memory</span>
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photosList.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.15 }}
            className="group relative rounded-2xl overflow-hidden glass-panel border border-amber-500/20 shadow-xl cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            {/* Aspect Ratio Container */}
            <div className="relative aspect-[4/3] sm:aspect-[4/3] overflow-hidden bg-slate-900">
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:filter group-hover:brightness-105"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <ZoomIn className="w-4 h-4 text-amber-300" />
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-300">
                <h3 className="font-cinzel text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-300/80 font-light mt-1 line-clamp-2 leading-relaxed">
                  {photo.caption}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 select-none"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between z-10">
              <div className="text-xs font-mono text-amber-400">
                {activePhotoIndex + 1} / {photosList.length}
              </div>

              <div className="flex items-center gap-3">
                <button
                  id="lightbox-toggle-zoom"
                  onClick={e => {
                    e.stopPropagation();
                    setIsZoomed(prev => !prev);
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Toggle Zoom"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  id="lightbox-close"
                  onClick={closeLightbox}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image Container */}
            <div
              className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button
                id="lightbox-prev-btn"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-amber-500 hover:text-slate-950 transition-all shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={photosList[activePhotoIndex].id}
                src={photosList[activePhotoIndex].url}
                alt={photosList[activePhotoIndex].title}
                referrerPolicy="no-referrer"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{
                  scale: isZoomed ? 1.4 : 1,
                  opacity: 1,
                }}
                transition={{ duration: 0.3 }}
                className={`max-h-[75vh] max-w-[90vw] object-contain rounded-xl shadow-2xl border border-amber-500/20 cursor-${isZoomed ? 'zoom-out' : 'zoom-in'}`}
                onClick={() => setIsZoomed(prev => !prev)}
              />

              <button
                id="lightbox-next-btn"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-amber-500 hover:text-slate-950 transition-all shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div
              className="text-center max-w-2xl mx-auto py-2 z-10"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-amber-300">
                {photosList[activePhotoIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
                {photosList[activePhotoIndex].caption}
              </p>
              <p className="text-[10px] text-slate-400 mt-1 sm:hidden">
                Swipe left or right to navigate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Custom Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#0e1017] border border-amber-500/30 p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-white">Add A Photo Memory</h3>
                <p className="text-xs text-amber-400/80">Celebrate Aryan's moments</p>
              </div>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Photo Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Legendary Roadtrip"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={newUrl}
                  onChange={e => setNewUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Paste any public image link (Unsplash, Imgur, Cloudinary, etc.)
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Caption / Memory Story
                </label>
                <textarea
                  rows={2}
                  placeholder="Write a sweet memory or note..."
                  value={newCaption}
                  onChange={e => setNewCaption(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 text-xs font-bold transition shadow-lg"
                >
                  Add Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
