import * as THREE from 'three';

/**
 * Procedural red calcarenite sandstone texture characteristic of Hassan Tower
 */
export function createSandstoneTexture(width = 512, height = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Base warm ochre / terracotta gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#be613c');
  grad.addColorStop(0.5, '#ab502e');
  grad.addColorStop(1, '#984323');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Stone block ashlar courses
  const blockH = 32;
  const blockW = 64;
  const rows = Math.ceil(height / blockH);

  for (let r = 0; r < rows; r++) {
    const y = r * blockH;
    const offset = (r % 2) * (blockW / 2);
    const cols = Math.ceil(width / blockW) + 1;

    for (let c = -1; c < cols; c++) {
      const x = c * blockW + offset;
      
      // Random stone shade variation
      const shade = (Math.random() - 0.5) * 30;
      const rVal = Math.min(240, Math.max(120, 180 + shade));
      const gVal = Math.min(150, Math.max(60, 85 + shade * 0.7));
      const bVal = Math.min(110, Math.max(40, 55 + shade * 0.5));
      ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;
      ctx.fillRect(x + 1, y + 1, blockW - 2, blockH - 2);

      // Fine grain / porous calcarenite texture
      for (let p = 0; p < 80; p++) {
        const px = x + Math.random() * blockW;
        const py = y + Math.random() * blockH;
        const palpha = Math.random() * 0.15;
        ctx.fillStyle = Math.random() > 0.5 ? `rgba(255, 230, 200, ${palpha})` : `rgba(40, 15, 5, ${palpha})`;
        ctx.fillRect(px, py, 1.5, 1.5);
      }
    }

    // Mortar joint horizontal
    ctx.strokeStyle = 'rgba(70, 30, 15, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural normal/bump map for stone blocks
 */
export function createStoneBumpMap(width = 512, height = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, width, height);

  const blockH = 32;
  const blockW = 64;
  const rows = Math.ceil(height / blockH);

  for (let r = 0; r < rows; r++) {
    const y = r * blockH;
    const offset = (r % 2) * (blockW / 2);
    const cols = Math.ceil(width / blockW) + 1;

    for (let c = -1; c < cols; c++) {
      const x = c * blockW + offset;
      const inner = ctx.createRadialGradient(x + blockW / 2, y + blockH / 2, 2, x + blockW / 2, y + blockH / 2, blockW / 2);
      inner.addColorStop(0, '#a5a5a5');
      inner.addColorStop(1, '#686868');
      ctx.fillStyle = inner;
      ctx.fillRect(x + 2, y + 2, blockW - 4, blockH - 4);
    }

    // Deep recessed mortar grooves
    ctx.strokeStyle = '#202020';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(0, y, width, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Procedural Moorish Sebka (شبكة المعينات الهندسية الموحدية) Lattice relief texture
 */
export function createSebkaTexture(width = 512, height = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Background sandstone
  ctx.fillStyle = '#a14828';
  ctx.fillRect(0, 0, width, height);

  const diamondW = 64;
  const diamondH = 96;

  ctx.lineWidth = 5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  const rows = Math.ceil(height / (diamondH / 2)) + 2;
  const cols = Math.ceil(width / diamondW) + 2;

  // Intertwined lobed arch diamonds
  for (let r = -1; r < rows; r++) {
    const cy = r * (diamondH / 2);
    const offsetX = (r % 2) * (diamondW / 2);

    for (let c = -1; c < cols; c++) {
      const cx = c * diamondW + offsetX;

      // Outer arch border
      ctx.strokeStyle = '#612513';
      ctx.beginPath();
      ctx.moveTo(cx, cy - diamondH / 2);
      ctx.quadraticCurveTo(cx + diamondW / 2, cy - diamondH / 4, cx + diamondW / 2, cy);
      ctx.quadraticCurveTo(cx + diamondW / 2, cy + diamondH / 4, cx, cy + diamondH / 2);
      ctx.quadraticCurveTo(cx - diamondW / 2, cy + diamondH / 4, cx - diamondW / 2, cy);
      ctx.quadraticCurveTo(cx - diamondW / 2, cy - diamondH / 4, cx, cy - diamondH / 2);
      ctx.stroke();

      // Highlighted raised rib
      ctx.strokeStyle = '#d77c54';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy - diamondH / 2 + 2);
      ctx.quadraticCurveTo(cx + diamondW / 2 - 2, cy - diamondH / 4, cx + diamondW / 2 - 2, cy);
      ctx.quadraticCurveTo(cx + diamondW / 2 - 2, cy + diamondH / 4, cx, cy + diamondH / 2 - 2);
      ctx.quadraticCurveTo(cx - diamondW / 2 + 2, cy + diamondH / 4, cx - diamondW / 2 + 2, cy);
      ctx.quadraticCurveTo(cx - diamondW / 2 + 2, cy - diamondH / 4, cx, cy - diamondH / 2 + 2);
      ctx.stroke();

      // Center decorative floral node
      ctx.fillStyle = '#f0a37c';
      ctx.beginPath();
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural Moroccan Zellij (الزليج المغربي الأصيل) geometric star mosaic
 */
export function createZellijTexture(width = 512, height = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0f2430';
  ctx.fillRect(0, 0, width, height);

  const cellSize = 64;
  const cols = Math.ceil(width / cellSize);
  const rows = Math.ceil(height / cellSize);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = c * cellSize + cellSize / 2;
      const cy = r * cellSize + cellSize / 2;
      const rad = cellSize * 0.44;

      // 8-pointed Moroccan Star
      ctx.fillStyle = (r + c) % 2 === 0 ? '#106c6e' : '#c97a3e';
      ctx.beginPath();
      for (let i = 0; i < 16; i++) {
        const angle = (i * Math.PI) / 8;
        const currentRad = i % 2 === 0 ? rad : rad * 0.55;
        const x = cx + Math.cos(angle) * currentRad;
        const y = cy + Math.sin(angle) * currentRad;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      // Inner rosette
      ctx.fillStyle = '#dca243';
      ctx.beginPath();
      ctx.arc(cx, cy, rad * 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f5ede0';
      ctx.beginPath();
      ctx.arc(cx, cy, rad * 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Corner diamonds
      ctx.fillStyle = '#8f2d18';
      ctx.fillRect(c * cellSize, r * cellSize, 8, 8);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural courtyard marble paving
 */
export function createMarblePlazaTexture(width = 512, height = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Warm limestone base
  ctx.fillStyle = '#ded5c5';
  ctx.fillRect(0, 0, width, height);

  const tileSize = 64;
  const cols = Math.ceil(width / tileSize);
  const rows = Math.ceil(height / tileSize);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * tileSize;
      const y = r * tileSize;

      // Subtle tile tone variation
      const v = (Math.random() - 0.5) * 15;
      ctx.fillStyle = `rgb(${225 + v}, ${215 + v * 0.9}, ${200 + v * 0.8})`;
      ctx.fillRect(x + 1, y + 1, tileSize - 2, tileSize - 2);

      // Fine stone grain
      for (let k = 0; k < 25; k++) {
        const px = x + Math.random() * tileSize;
        const py = y + Math.random() * tileSize;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.18)' : 'rgba(100,90,80,0.08)';
        ctx.fillRect(px, py, 2, 2);
      }
    }
  }

  // Mortar lines
  ctx.strokeStyle = 'rgba(120, 110, 100, 0.45)';
  ctx.lineWidth = 1.5;
  for (let r = 0; r <= rows; r++) {
    ctx.beginPath();
    ctx.moveTo(0, r * tileSize);
    ctx.lineTo(width, r * tileSize);
    ctx.stroke();
  }
  for (let c = 0; c <= cols; c++) {
    ctx.beginPath();
    ctx.moveTo(c * tileSize, 0);
    ctx.lineTo(c * tileSize, height);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Soft radial contact shadow texture
 */
export function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
  gradient.addColorStop(0, 'rgba(15, 8, 5, 0.85)');
  gradient.addColorStop(0.35, 'rgba(25, 15, 10, 0.55)');
  gradient.addColorStop(0.7, 'rgba(40, 25, 15, 0.2)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
