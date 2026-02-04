<template>
  <div
    ref="root"
    class="particle-portrait"
    tabindex="0"
    role="img"
    :aria-label="alt"
    @pointermove="onPointerMove"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @pointerdown="onPointerEnter"
    @pointerup="onPointerLeave"
    @mousemove="onMouseMove"
    @mouseenter="onPointerEnter"
    @mouseleave="onPointerLeave"
    @touchmove.passive="onTouchMove"
    @touchend="onPointerLeave"
    @focus="onPointerEnter"
    @blur="onPointerLeave"
  >
    <canvas ref="canvas" class="particle-portrait__canvas" aria-hidden="true"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    color?: string
    imageScale?: number
    alphaThreshold?: number
    keyColor?: string
    keyTolerance?: number
    autoKey?: boolean
    showSilhouette?: boolean
    silhouetteAlpha?: number
    showImageLayer?: boolean
    imageLayerAlpha?: number
    imageLayerBlend?: CanvasRenderingContext2D['globalCompositeOperation']
  }>(),
  {
    alt: 'Profile portrait',
    color: '#64ffda',
    imageScale: 0.86,
    alphaThreshold: 128,
    keyColor: '',
    keyTolerance: 36,
    autoKey: true,
    showSilhouette: true,
    silhouetteAlpha: 0.18,
    showImageLayer: true,
    imageLayerAlpha: 0.18,
    imageLayerBlend: 'screen',
  }
)

const root = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const pointer = ref({ x: -1000, y: -1000, active: false })
const prefersReducedMotion = ref(false)

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  targetX: number
  targetY: number
  length: number
  baseAlpha: number
  alpha: number
  delay: number
  faceBoost: number
}

let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let imageLoaded = false
let startTime = 0
let rafId = 0
let resizeObserver: ResizeObserver | null = null
let silhouetteLayer: HTMLCanvasElement | null = null
let silhouetteCtx: CanvasRenderingContext2D | null = null
let imageLayer: HTMLCanvasElement | null = null
let resizeRafId = 0
let loadToken = 0
let resizeTimer: ReturnType<typeof setTimeout> | null = null
let currentDpr = 1
let currentWidth = 0
let currentHeight = 0

const parseColor = (value: string) => {
  const hex = value.replace('#', '')
  if (hex.length === 6) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ]
  }
  const rgb = value.match(/rgba?\(([^)]+)\)/i)
  if (rgb) {
    return rgb[1].split(',').slice(0, 3).map((v) => Number(v.trim()))
  }
  return [100, 255, 218]
}

const colorRgb = ref<[number, number, number]>([100, 255, 218])

const resetPointer = () => {
  pointer.value.active = false
  pointer.value.x = -1000
  pointer.value.y = -1000
}

const updatePointer = (clientX: number, clientY: number) => {
  if (prefersReducedMotion.value) return
  if (!canvas.value) return
  const rect = canvas.value.getBoundingClientRect()
  pointer.value.x = clientX - rect.left
  pointer.value.y = clientY - rect.top
  pointer.value.active = true
}

const onPointerMove = (event: PointerEvent) => {
  updatePointer(event.clientX, event.clientY)
}

const onMouseMove = (event: MouseEvent) => {
  updatePointer(event.clientX, event.clientY)
}

const onTouchMove = (event: TouchEvent) => {
  const touch = event.touches[0]
  if (!touch) return
  updatePointer(touch.clientX, touch.clientY)
}

const onPointerEnter = () => {
  if (prefersReducedMotion.value) return
  pointer.value.active = true
}

const onPointerLeave = () => {
  resetPointer()
}

const resolveColor = (value: string) => {
  const trimmed = value.trim()
  if (trimmed.startsWith('var(') && root.value) {
    const varName = trimmed.slice(4, -1).trim()
    const resolved = getComputedStyle(root.value).getPropertyValue(varName).trim()
    if (resolved) return parseColor(resolved)
  }
  return parseColor(trimmed)
}

const resizeCanvas = () => {
  if (!canvas.value || !root.value) return
  const rect = root.value.getBoundingClientRect()
  currentDpr = Math.min(window.devicePixelRatio || 1, 2)
  currentWidth = Math.max(1, Math.round(rect.width))
  currentHeight = Math.max(1, Math.round(rect.height))
  canvas.value.width = Math.max(1, Math.round(currentWidth * currentDpr))
  canvas.value.height = Math.max(1, Math.round(currentHeight * currentDpr))
  canvas.value.style.width = `${currentWidth}px`
  canvas.value.style.height = `${currentHeight}px`
  ctx = canvas.value.getContext('2d')
  if (ctx) {
    ctx.setTransform(currentDpr, 0, 0, currentDpr, 0, 0)
    ctx.lineCap = 'round'
  }
}

const colorDistance = (r: number, g: number, b: number, key: number[]) => {
  const dr = r - key[0]
  const dg = g - key[1]
  const db = b - key[2]
  return Math.sqrt(dr * dr + dg * dg + db * db)
}

const buildParticles = (image: HTMLImageElement) => {
  if (!canvas.value || !ctx) return
  const width = currentWidth
  const height = currentHeight
  if (props.showSilhouette) {
    silhouetteLayer = document.createElement('canvas')
    silhouetteLayer.width = Math.round(width)
    silhouetteLayer.height = Math.round(height)
    silhouetteCtx = silhouetteLayer.getContext('2d')
    if (silhouetteCtx) {
      silhouetteCtx.clearRect(0, 0, width, height)
    }
  } else {
    silhouetteLayer = null
    silhouetteCtx = null
  }
  const offscreen = document.createElement('canvas')
  offscreen.width = Math.round(width)
  offscreen.height = Math.round(height)
  const offCtx = offscreen.getContext('2d')
  if (!offCtx) return

  const imgAspect = image.width / image.height
  let drawHeight = height * props.imageScale
  let drawWidth = drawHeight * imgAspect

  if (drawWidth > width * props.imageScale) {
    drawWidth = width * props.imageScale
    drawHeight = drawWidth / imgAspect
  }

  const offsetX = (width - drawWidth) / 2
  const offsetY = (height - drawHeight) / 2

  offCtx.clearRect(0, 0, width, height)
  offCtx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)
  imageLayer = offscreen

  const imageData = offCtx.getImageData(0, 0, width, height)
  const pixels = imageData.data
  const sampleSize = Math.max(4, Math.round(Math.min(width, height) * 0.06))
  const samplePoints = [
    [0, 0],
    [width - sampleSize, 0],
    [0, height - sampleSize],
    [width - sampleSize, height - sampleSize],
  ]
  let keyRgb: number[] | null = null

  if (props.keyColor) {
    keyRgb = resolveColor(props.keyColor)
  } else if (props.autoKey) {
    let rSum = 0
    let gSum = 0
    let bSum = 0
    let count = 0
    for (const [sx, sy] of samplePoints) {
      for (let y = sy; y < sy + sampleSize; y += 1) {
        for (let x = sx; x < sx + sampleSize; x += 1) {
          const idx = (y * width + x) * 4
          rSum += pixels[idx]
          gSum += pixels[idx + 1]
          bSum += pixels[idx + 2]
          count += 1
        }
      }
    }
    if (count > 0) {
      keyRgb = [rSum / count, gSum / count, bSum / count]
    }
  }
  const rowGap = width <= 320 ? 2 : 3
  const scatter = Math.min(width, height) * 0.45

  particles = []

  const silhouetteRadius = width <= 320 ? 0.9 : 1.2
  const [rBase, gBase, bBase] = colorRgb.value
  const rGlow = Math.min(255, rBase + 35)
  const gGlow = Math.min(255, gBase + 35)
  const bGlow = Math.min(255, bBase + 35)
  const faceCenterX = width * 0.5
  const faceCenterY = height * 0.45
  const faceRadiusX = width * 0.22
  const faceRadiusY = height * 0.3

  for (let y = 0; y < height; y += rowGap) {
    let x = 0
    while (x < width) {
      const i = (y * width + x) * 4
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const a = pixels[i + 3]

      const backgroundMatch =
        keyRgb && colorDistance(r, g, b, keyRgb) < props.keyTolerance
      if (a > props.alphaThreshold && !backgroundMatch) {
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
        const boosted = Math.pow(luminance, 0.6)
        const leftAlpha = x > 0 ? pixels[(y * width + (x - 1)) * 4 + 3] : 0
        const rightAlpha =
          x + 1 < width ? pixels[(y * width + (x + 1)) * 4 + 3] : 0
        const upAlpha = y > 0 ? pixels[((y - 1) * width + x) * 4 + 3] : 0
        const downAlpha =
          y + 1 < height ? pixels[((y + 1) * width + x) * 4 + 3] : 0
        const isEdge =
          leftAlpha <= props.alphaThreshold ||
          rightAlpha <= props.alphaThreshold ||
          upAlpha <= props.alphaThreshold ||
          downAlpha <= props.alphaThreshold
        const intensity = Math.min(1, boosted + (isEdge ? 0.35 : 0))
        const dxFace = (x - faceCenterX) / faceRadiusX
        const dyFace = (y - faceCenterY) / faceRadiusY
        const faceBoost = Math.exp(-(dxFace * dxFace + dyFace * dyFace))
        const faceIntensity = Math.min(1, intensity + faceBoost * 0.35)
        const lineLength = Math.floor(
          (5 + faceIntensity * (width <= 320 ? 13 : 22)) *
            (1 - faceBoost * 0.35)
        )
        const scatterX = (Math.random() - 0.5) * scatter
        const scatterY = (Math.random() - 0.5) * scatter

        particles.push({
          x: x + scatterX,
          y: y + scatterY,
          targetX: x,
          targetY: y,
          vx: 0,
          vy: 0,
          length: lineLength,
          baseAlpha: 0.6 + faceIntensity * 0.4,
          alpha: 0,
          delay: Math.random() * 0.3,
          faceBoost,
        })

        if (silhouetteCtx) {
          const dotAlpha = 0.25 + faceIntensity * 0.35 + faceBoost * 0.2
          const dotRadius = silhouetteRadius + faceBoost * 0.5
          silhouetteCtx.fillStyle = `rgba(${rGlow}, ${gGlow}, ${bGlow}, ${dotAlpha})`
          silhouetteCtx.beginPath()
          silhouetteCtx.arc(x, y, dotRadius, 0, Math.PI * 2)
          silhouetteCtx.fill()
        }

        x += lineLength + (faceBoost > 0.2 ? 0 : 1)
      } else {
        x += 2
      }
    }
  }

  imageLoaded = true
  startTime = performance.now()
  if (root.value) {
    root.value.style.visibility = 'visible'
  }
  if (prefersReducedMotion.value) {
    drawFrame()
  }
}

const drawFrame = () => {
  if (!canvas.value || !ctx) return
  const width = currentWidth
  const height = currentHeight

  ctx.clearRect(0, 0, width, height)
  if (!imageLoaded) return
  if (imageLayer && props.showImageLayer) {
    ctx.save()
    ctx.globalAlpha = Math.min(1, Math.max(0, props.imageLayerAlpha))
    ctx.globalCompositeOperation = props.imageLayerBlend
    ctx.drawImage(imageLayer, 0, 0, width, height)
    ctx.restore()
  }
  if (silhouetteLayer && props.showSilhouette) {
    ctx.save()
    ctx.globalAlpha = props.silhouetteAlpha
    ctx.drawImage(silhouetteLayer, 0, 0, width, height)
    ctx.restore()
  }

  const mouse = pointer.value
  const elapsed = prefersReducedMotion.value
    ? 10
    : (performance.now() - startTime) / 1000
  const maxDist = 60

  for (const p of particles) {
    const particleTime = elapsed - p.delay
    if (particleTime < 0) continue

    const fadeProgress = Math.min(particleTime / 1.5, 1)
    const easedFade = 1 - Math.pow(1 - fadeProgress, 2)
    p.alpha = p.baseAlpha * easedFade

    const moveProgress = Math.min(particleTime / 2.5, 1)
    const easedMove = 1 - Math.pow(1 - moveProgress, 3)

    if (mouse.active) {
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < maxDist && dist > 0) {
        const force = (1 - dist / maxDist) * 2
        p.vx += (dx / dist) * force
        p.vy += (dy / dist) * force
      }
    }

    const dx = p.targetX - p.x
    const dy = p.targetY - p.y
    const pullStrength = 0.01 + easedMove * 0.07
    p.vx += dx * pullStrength
    p.vy += dy * pullStrength
    p.vx *= 0.92
    p.vy *= 0.92
    p.x += p.vx
    p.y += p.vy

    const [r, g, b] = colorRgb.value
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`
    ctx.lineWidth = width <= 320 ? 2.1 : 2.9
    ctx.beginPath()
    ctx.moveTo(p.x, p.y)
    ctx.lineTo(p.x + p.length, p.y)
    ctx.stroke()

    const dotAlpha = Math.min(1, p.alpha * (0.5 + p.faceBoost * 0.6))
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dotAlpha})`
    ctx.beginPath()
    const dotRadius =
      (width <= 320 ? 0.7 : 1.1) + p.faceBoost * 0.6
    ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2)
    ctx.fill()
  }
}

const animate = () => {
  rafId = requestAnimationFrame(animate)
  drawFrame()
}

const loadImage = () => {
  if (!props.src) return
  const token = ++loadToken
  imageLoaded = false
  const image = new Image()
  image.crossOrigin = 'anonymous'
  image.src = props.src
  image.onload = () => {
    if (token !== loadToken) return
    buildParticles(image)
  }
  image.onerror = () => {
    if (root.value) {
      root.value.style.visibility = 'visible'
    }
  }
}

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
  colorRgb.value = resolveColor(props.color)
  resizeCanvas()
  loadImage()
  if (!prefersReducedMotion.value) {
    animate()
  } else {
    drawFrame()
  }
  if (root.value) {
    resizeObserver = new ResizeObserver(() => {
      if (resizeTimer) {
        clearTimeout(resizeTimer)
      }
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(resizeRafId)
        resizeRafId = requestAnimationFrame(() => {
          resizeCanvas()
          resetPointer()
          loadImage()
        })
      }, 120)
    })
    resizeObserver.observe(root.value)
  }
})

watch(
  () => props.color,
  () => {
    colorRgb.value = resolveColor(props.color)
  }
)

watch(
  () => props.src,
  () => {
    loadImage()
  }
)

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  cancelAnimationFrame(resizeRafId)
  if (resizeTimer) {
    clearTimeout(resizeTimer)
  }
  resizeObserver?.disconnect()
})

defineExpose({
  el: root,
})
</script>

<style scoped lang="scss">
.particle-portrait {
  width: clamp(340px, 50vw, 680px);
  max-width: 100%;
  aspect-ratio: 1 / 1;
  visibility: hidden;
  cursor: crosshair;
  outline: none;
  touch-action: none;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

@media (max-width: 900px) {
  .particle-portrait {
    width: min(86vw, 460px);
  }
}

@media (max-width: 600px) {
  .particle-portrait {
    width: min(90vw, 360px);
  }
}

.particle-portrait__canvas {
  width: 100%;
  height: 100%;
  display: block;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15))
    drop-shadow(0 0 18px var(--primary));
}

@media (prefers-reduced-motion: reduce) {
  .particle-portrait {
    cursor: default;
  }
}
</style>
