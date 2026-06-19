"use client"

import { useEffect, useRef } from "react"

type TrailPoint = {
  x: number
  y: number
  life: number
  strength: number
}

const IMAGE_URL = "/hero-architecture-v1.png"

export function RevealBackground() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const image = new Image()
    image.src = IMAGE_URL

    const trail: TrailPoint[] = []
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let width = 0
    let height = 0
    let frame = 0
    let previousTime = performance.now()
    let lastPointerTime = 0
    let pointerX = 0
    let pointerY = 0
    let smoothX = 0
    let smoothY = 0
    let hasPointer = false

    const resize = () => {
      const bounds = root.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.max(1, Math.round(width * pixelRatio))
      canvas.height = Math.max(1, Math.round(height * pixelRatio))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      if (!hasPointer) {
        pointerX = smoothX = width * 0.62
        pointerY = smoothY = height * 0.36
      }
    }

    const addTrailPoint = (x: number, y: number, strength = 1) => {
      const previous = trail[trail.length - 1]
      if (previous && Math.hypot(previous.x - x, previous.y - y) < 9) return
      trail.push({ x, y, life: 1, strength })
      if (trail.length > 46) trail.shift()
    }

    const move = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      if (x < 0 || y < 0 || x > bounds.width || y > bounds.height) return
      pointerX = x
      pointerY = y
      if (!hasPointer) {
        smoothX = x
        smoothY = y
      }
      hasPointer = true
      lastPointerTime = performance.now()
      addTrailPoint(x, y)
    }

    const drawSoftSpot = (x: number, y: number, radius: number, alpha: number) => {
      const gradient = context.createRadialGradient(x, y, radius * 0.08, x, y, radius)
      gradient.addColorStop(0, `rgba(255,255,255,${alpha})`)
      gradient.addColorStop(0.42, `rgba(255,255,255,${alpha * 0.82})`)
      gradient.addColorStop(1, "rgba(255,255,255,0)")
      context.fillStyle = gradient
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.fill()
    }

    const drawImageCover = (time: number) => {
      if (!image.complete || image.naturalWidth === 0) return
      const breathing = prefersReducedMotion ? 1 : 1 + Math.sin(time / 5200) * 0.006
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight) * breathing
      const drawWidth = image.naturalWidth * scale
      const drawHeight = image.naturalHeight * scale
      const parallaxX = prefersReducedMotion ? 0 : (smoothX - width / 2) * -0.008
      const parallaxY = prefersReducedMotion ? 0 : (smoothY - height / 2) * -0.006
      const x = (width - drawWidth) * 0.62 + parallaxX
      const y = (height - drawHeight) * 0.44 + parallaxY
      context.drawImage(image, x, y, drawWidth, drawHeight)
    }

    const render = (time: number) => {
      const delta = Math.min(time - previousTime, 40)
      previousTime = time
      smoothX += (pointerX - smoothX) * 0.075
      smoothY += (pointerY - smoothY) * 0.075

      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = "source-over"

      for (let index = trail.length - 1; index >= 0; index -= 1) {
        const point = trail[index]
        point.life -= delta / 1350
        if (point.life <= 0) {
          trail.splice(index, 1)
          continue
        }
        drawSoftSpot(point.x, point.y, 190 + point.life * 55, point.life * point.strength)
      }

      const idleFor = time - lastPointerTime
      if (prefersReducedMotion || idleFor > 1700) {
        const progress = time / 7800
        const idleX = width * (0.54 + Math.sin(progress) * 0.2)
        const idleY = height * (0.34 + Math.sin(progress * 1.7) * 0.055)
        drawSoftSpot(idleX, idleY, Math.min(310, width * 0.34), prefersReducedMotion ? 0.22 : 0.3)
      } else if (hasPointer) {
        drawSoftSpot(smoothX, smoothY, 230, 0.9)
      }

      context.globalCompositeOperation = "source-in"
      drawImageCover(time)
      context.globalCompositeOperation = "source-over"
      frame = requestAnimationFrame(render)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(root)
    resize()
    image.addEventListener("load", resize)
    window.addEventListener("pointermove", move, { passive: true })
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      image.removeEventListener("load", resize)
      window.removeEventListener("pointermove", move)
    }
  }, [])

  return (
    <div ref={rootRef} className="architecture-background" aria-hidden="true">
      <div className="architecture-background__base" />
      <canvas ref={canvasRef} className="architecture-background__canvas" />
      <div className="architecture-background__core" />
      <div className="architecture-background__shade" />
    </div>
  )
}
