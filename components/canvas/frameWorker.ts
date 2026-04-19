const ctx: Worker = self as unknown as Worker;

interface ProgressMessage { type: 'PROGRESS'; loaded: number; total: number; }
interface CompleteMessage { type: 'COMPLETE'; bitmaps: ImageBitmap[]; }

self.onmessage = async (e: MessageEvent) => {
  const { urls } = e.data;
  const bitmaps: ImageBitmap[] = [];
  
  try {
    for (let i = 0; i < urls.length; i++) {
      const res = await fetch(urls[i]);
      const blob = await res.blob();
      const bitmap = await createImageBitmap(blob);
      bitmaps.push(bitmap);
      
      const progress: ProgressMessage = { 
        type: 'PROGRESS', 
        loaded: i + 1, 
        total: urls.length 
      };
      self.postMessage(progress);
    }
    
    const complete: CompleteMessage = { type: 'COMPLETE', bitmaps };
    self.postMessage(complete, bitmaps as any);
  } catch (err) {
    console.error('FrameWorker error:', err);
  }
};
