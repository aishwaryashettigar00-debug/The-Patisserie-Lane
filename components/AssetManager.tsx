
import React, { useState, useRef, useEffect } from 'react';

// IndexedDB Helper for large media storage
const DB_NAME = 'PatisserieStudioDB';
const STORE_NAME = 'media';
let dbPromise: Promise<IDBDatabase> | null = null;

const getDB = (): Promise<IDBDatabase> => {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) {
        request.result.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      dbPromise = null;
      reject(request.error);
    };
  });
  return dbPromise;
};

export const setAsset = async (key: string, value: Blob | string) => {
  const db = await getDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(value, key);
    
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    request.onerror = () => reject(request.error);
  });
};

export const getAsset = async (key: string): Promise<Blob | string | null> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
};

export const removeAsset = async (key: string) => {
  const db = await getDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  transaction.objectStore(STORE_NAME).delete(key);
};

// New: Helper to check how much storage is left
export const getStorageEstimate = async () => {
  if (navigator.storage && navigator.storage.estimate) {
    const { usage, quota } = await navigator.storage.estimate();
    return {
      usage: usage ? Math.round(usage / (1024 * 1024)) : 0,
      quota: quota ? Math.round(quota / (1024 * 1024)) : 0,
      percent: usage && quota ? Math.round((usage / quota) * 100) : 0
    };
  }
  return null;
};

export const MediaRenderer: React.FC<{ 
  src?: string; 
  assetKey?: string;
  className?: string; 
  alt?: string; 
  showControls?: boolean 
}> = ({ src, assetKey, className, alt, showControls = true }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [mediaSrc, setMediaSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const loadMedia = async () => {
      setIsLoading(true);
      
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }

      if (assetKey) {
        try {
          const storedValue = await getAsset(assetKey);
          if (storedValue) {
            if (storedValue instanceof Blob) {
              const url = URL.createObjectURL(storedValue);
              objectUrlRef.current = url;
              setMediaSrc(url);
            } else {
              setMediaSrc(storedValue);
            }
            setIsLoading(false);
            return;
          }
          const localValue = localStorage.getItem(assetKey);
          if (localValue) {
            setMediaSrc(localValue);
            setIsLoading(false);
            return;
          }
        } catch (e) {
          console.warn("Media load error:", e);
        }
      }
      
      setMediaSrc(src || null);
      setIsLoading(false);
    };

    loadMedia();

    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, [src, assetKey]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  if (isLoading) return <div className={`${className} bg-slate-50 animate-pulse flex items-center justify-center text-[10px] text-slate-300 uppercase tracking-widest`}>Chef is Preparing...</div>;
  if (!mediaSrc) return <div className={`${className} bg-slate-100 flex items-center justify-center text-[8px] text-slate-300`}>No Media</div>;
  
  const isVideo = assetKey?.startsWith('reel_') || 
                  mediaSrc.includes('video/') || 
                  mediaSrc.startsWith('data:video');

  const toggleAudio = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if (!newMutedState) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  if (isVideo) {
    return (
      <div className="relative w-full h-full group/video cursor-pointer overflow-hidden bg-slate-900" onClick={toggleAudio}>
        <video 
          ref={videoRef}
          src={mediaSrc} 
          className={`${className} transition-transform duration-700`} 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="metadata"
          style={{ objectFit: 'cover' }}
        />
        {isMuted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 transition-opacity group-hover/video:bg-black/50">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full mb-2 animate-pulse border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            </div>
            <span className="text-white text-[9px] font-black uppercase tracking-[0.3em] drop-shadow-md">Tap for sound</span>
          </div>
        )}
        {showControls && (
          <button 
            onClick={toggleAudio}
            className="absolute bottom-4 right-4 z-20 bg-royal-blue/80 backdrop-blur-md p-3 rounded-full text-white hover:bg-royal-blue transition-all shadow-xl border border-white/20"
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            )}
          </button>
        )}
      </div>
    );
  }

  return <img src={mediaSrc} alt={alt} className={className} style={{ objectFit: 'cover' }} />;
};

export const ImageUploader: React.FC<{ label: string; assetKey: string; current: string }> = ({ label, assetKey, current }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 150 * 1024 * 1024) { 
        alert("File too large. Please keep videos under 150MB.");
        return;
      }
      
      setIsUploading(true);
      setStatus("Uploading...");
      try {
        await setAsset(assetKey, file);
        setStatus("Success!");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (err) {
        console.error(err);
        alert("Upload failed. Try a slightly smaller file or check your internet.");
        setIsUploading(false);
        setStatus(null);
      }
    }
  };

  const handleRemove = async () => {
    if (window.confirm("Reset to default? Your uploaded file will be deleted.")) {
      await removeAsset(assetKey);
      localStorage.removeItem(assetKey);
      window.location.reload();
    }
  };

  return (
    <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center space-y-4 group transition-all hover:shadow-xl hover:-translate-y-1">
      <p className="text-[10px] font-black royal-blue uppercase tracking-[0.2em] text-center opacity-60 group-hover:opacity-100">{label}</p>
      <div className="w-full aspect-[3/4] rounded-[1.5rem] overflow-hidden bg-slate-50 border border-slate-100 relative shadow-inner">
        <MediaRenderer assetKey={assetKey} src={current} className="w-full h-full" alt="Preview" showControls={false} />
      </div>
      <label className={`w-full cursor-pointer py-3.5 rounded-2xl text-[10px] font-black transition-all text-center uppercase tracking-widest border border-slate-100 shadow-sm ${isUploading ? 'bg-royal-blue text-cream' : 'bg-slate-50 text-royal-blue hover:bg-royal-blue hover:text-white'}`}>
        {status || 'Upload Media'}
        <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFile} disabled={isUploading} />
      </label>
      <button 
        onClick={handleRemove}
        className="text-[9px] text-slate-300 hover:text-red-500 font-bold uppercase tracking-widest transition-colors"
      >
        Reset
      </button>
    </div>
  );
};
