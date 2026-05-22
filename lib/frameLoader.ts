export const TOTAL_FRAMES = 300;
const PRIORITY_INTERVAL = 6;

export interface FrameLoader {
  getNearestFrame: (target: number) => HTMLImageElement | null;
  getLoadProgress: () => number;
  onPriorityComplete: (callback: () => void) => void;
  onEachPriorityFrame: (callback: (loaded: number, total: number) => void) => void;
}

export function createFrameLoader(): FrameLoader {
  // Only execute in the browser
  if (typeof window === 'undefined') {
    return {
      getNearestFrame: () => null,
      getLoadProgress: () => 0,
      onPriorityComplete: () => {},
      onEachPriorityFrame: () => {}
    };
  }

  const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
  const loaded = new Set<number>();
  const queue: number[] = [];
  let priorityTotal = 0;
  let priorityLoaded = 0;
  
  const priorityCompleteCallbacks: (() => void)[] = [];
  const eachPriorityFrameCallbacks: ((loaded: number, total: number) => void)[] = [];

  // Build priority queue first (every 6th frame)
  for (let i = 1; i <= TOTAL_FRAMES; i += PRIORITY_INTERVAL) {
    queue.push(i);
    priorityTotal++;
  }
  
  // Then fill in remaining frames
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    if ((i - 1) % PRIORITY_INTERVAL !== 0) queue.push(i);
  }

  const isPriority = (n: number) => (n - 1) % PRIORITY_INTERVAL === 0;

  function padFrame(n: number): string {
    return String(n).padStart(3, '0');
  }

  function loadNext() {
    if (queue.length === 0) return;
    const frameNum = queue.shift()!;
    const img = new Image();
    
    img.onload = () => {
      loaded.add(frameNum);
      images[frameNum - 1] = img;
      
      if (isPriority(frameNum)) {
        priorityLoaded++;
        eachPriorityFrameCallbacks.forEach(cb => cb(priorityLoaded, priorityTotal));
        if (priorityLoaded >= priorityTotal) {
          priorityCompleteCallbacks.forEach(cb => cb());
        }
      }
      
      if ('requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => void }).requestIdleCallback(() => loadNext(), { timeout: 500 });
      } else {
        setTimeout(loadNext, 10);
      }
    };
    
    img.onerror = () => {
      // Skip failed frames silently — getNearestFrame handles the gap
      if ('requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => void }).requestIdleCallback(() => loadNext(), { timeout: 500 });
      } else {
        setTimeout(loadNext, 10);
      }
    };
    
    img.src = `/assets/frame_${padFrame(frameNum)}.webp`;
  }

  // Fire 6 concurrent loaders
  for (let i = 0; i < 6; i++) {
    loadNext();
  }

  return {
    getNearestFrame(target: number): HTMLImageElement | null {
      if (loaded.has(target) && images[target - 1]) return images[target - 1];
      let lo = target - 1, hi = target + 1;
      while (lo >= 1 || hi <= TOTAL_FRAMES) {
        if (lo >= 1 && loaded.has(lo) && images[lo - 1]) return images[lo - 1];
        if (hi <= TOTAL_FRAMES && loaded.has(hi) && images[hi - 1]) return images[hi - 1];
        lo--; hi++;
      }
      return null;
    },
    getLoadProgress(): number {
      return priorityTotal === 0 ? 0 : priorityLoaded / priorityTotal;
    },
    onPriorityComplete(callback: () => void) {
      if (priorityLoaded >= priorityTotal) {
        callback();
      } else {
        priorityCompleteCallbacks.push(callback);
      }
    },
    onEachPriorityFrame(callback: (loaded: number, total: number) => void) {
      eachPriorityFrameCallbacks.push(callback);
      // Fire immediately with current state
      callback(priorityLoaded, priorityTotal);
    }
  };
}
