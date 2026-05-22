/**
 * Canvas rendering utilities for frame sequence.
 * Two modes:
 * - drawFrameCover: fills canvas fully (desktop landscape — may crop)
 * - drawFrameContain: fits entire image within canvas (portrait mobile — no crop)
 */

export function drawFrameCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;
  let dW: number, dH: number, dX: number, dY: number;

  if (imgRatio > canvasRatio) {
    dH = canvasH;
    dW = canvasH * imgRatio;
    dX = (canvasW - dW) / 2;
    dY = 0;
  } else {
    dW = canvasW;
    dH = canvasW / imgRatio;
    dX = 0;
    dY = (canvasH - dH) / 2;
  }
  ctx.drawImage(img, dX, dY, dW, dH);
}

/**
 * Contain mode — fits image by width so the entire frame is visible.
 * Used on portrait/mobile screens so the user sees the full bus.
 * Letterboxes vertically (black bars top/bottom if canvas is taller).
 */
export function drawFrameContain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;
  let dW: number, dH: number, dX: number, dY: number;

  if (imgRatio > canvasRatio) {
    // Image is wider than canvas ratio — fit to width
    dW = canvasW;
    dH = canvasW / imgRatio;
    dX = 0;
    dY = (canvasH - dH) / 2;
  } else {
    // Image is taller than canvas ratio — fit to height
    dH = canvasH;
    dW = canvasH * imgRatio;
    dX = (canvasW - dW) / 2;
    dY = 0;
  }
  ctx.drawImage(img, dX, dY, dW, dH);
}

export function initCanvas(canvas: HTMLCanvasElement) {
  const isMobile = window.innerWidth < 1024;
  const dpr = isMobile
    ? Math.min(window.devicePixelRatio || 1, 1.5)
    : Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);
  return { ctx, dpr };
}

/**
 * Detect if the viewport is in portrait orientation.
 */
export function isPortrait(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerHeight > window.innerWidth;
}
