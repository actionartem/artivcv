"use client"

import { useEffect, useRef } from "react"

const WORDS = ["СТРАТЕГИЯ", "РОАДМАП", "DELIVERY", "AI"]
const EXPERIENCE_WORDS = ["HeadPoint", "MillenialGroup", "KremlinStore", "Ceramic3D"]
const GLYPHS = "01<>/{}:+#*ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const PALETTE = [
  [111, 190, 255],
  [178, 137, 255],
  [255, 168, 132],
  [105, 225, 203],
]

type TrailPoint = { x: number; y: number; life: number }
type MatrixMode = "words" | "workflows" | "experience"

const getExperienceWordIndex = (cycleIndex: number) => {
  const order = [0, 1, 2, 3]
  let seed = (Math.floor(cycleIndex / order.length) + 1) * 0x9e3779b9
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
  for (let index = order.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1))
    ;[order[index], order[target]] = [order[target], order[index]]
  }
  return order[cycleIndex % order.length]
}

const drawWorkflowMask = (
  context: CanvasRenderingContext2D,
  sceneIndex: number,
  centerX: number,
  centerY: number,
  visualWidth: number,
  visualHeight: number,
  color = "#fff",
  opacity = 1,
) => {
  const left = centerX - visualWidth / 2
  const top = centerY - visualHeight / 2
  const line = Math.max(14, visualWidth * .028)
  context.save()
  context.globalAlpha = opacity
  context.strokeStyle = color
  context.fillStyle = color
  context.lineWidth = line
  context.lineCap = "round"
  context.lineJoin = "round"

  if (sceneIndex === 0) {
    // Kanban board: three columns and task cards.
    const gap = visualWidth * .045
    const columnWidth = (visualWidth - gap * 2) / 3
    for (let column = 0; column < 3; column += 1) {
      const x = left + column * (columnWidth + gap)
      context.strokeRect(x, top, columnWidth, visualHeight)
      context.fillRect(x + line, top + line, columnWidth - line * 2, line * .8)
      for (let card = 0; card < 3; card += 1) {
        const cardY = top + visualHeight * (.2 + card * .25)
        const cardWidth = columnWidth * (card === 1 ? .64 : .78)
        context.fillRect(x + line * 1.5, cardY, cardWidth, visualHeight * .105)
      }
    }
  } else if (sceneIndex === 1) {
    // Gantt chart: timeline, rows, milestones, and staggered bars.
    context.fillRect(left, top, line, visualHeight)
    context.fillRect(left, top + visualHeight - line, visualWidth, line)
    for (let row = 0; row < 6; row += 1) {
      const y = top + visualHeight * (.1 + row * .145)
      const start = visualWidth * (.12 + ((row * 13) % 31) / 100)
      const length = visualWidth * (.2 + (row % 3) * .1)
      context.fillRect(left + start, y, length, line * 1.35)
      context.beginPath()
      context.arc(left + start + length, y + line * .65, line * .72, 0, Math.PI * 2)
      context.fill()
    }
  } else if (sceneIndex === 2) {
    // Delivery chart: axes, trend line, points, and supporting bars.
    context.fillRect(left, top + visualHeight - line, visualWidth, line)
    context.fillRect(left, top, line, visualHeight)
    const points = [
      [0.08, 0.78], [0.25, 0.58], [0.4, 0.66], [0.58, 0.34], [0.73, 0.42], [0.92, 0.12],
    ]
    context.beginPath()
    points.forEach(([x, y], index) => {
      const pointX = left + visualWidth * x
      const pointY = top + visualHeight * y
      if (index === 0) context.moveTo(pointX, pointY)
      else context.lineTo(pointX, pointY)
    })
    context.stroke()
    points.forEach(([x, y]) => {
      context.beginPath()
      context.arc(left + visualWidth * x, top + visualHeight * y, line * .9, 0, Math.PI * 2)
      context.fill()
    })
    for (let bar = 0; bar < 5; bar += 1) {
      const barHeight = visualHeight * (.08 + bar * .045)
      context.fillRect(left + visualWidth * (.13 + bar * .16), top + visualHeight - barHeight, line * 1.15, barHeight)
    }
  } else {
    // Roadmap: curved route with alternating milestones.
    context.beginPath()
    context.moveTo(left, centerY + visualHeight * .22)
    context.bezierCurveTo(
      left + visualWidth * .2, top - visualHeight * .05,
      left + visualWidth * .62, top + visualHeight * .85,
      left + visualWidth, centerY - visualHeight * .25,
    )
    context.stroke()
    const milestones = [[.06,.62],[.28,.28],[.52,.57],[.75,.5],[.94,.25]]
    milestones.forEach(([x, y], index) => {
      const pointX = left + visualWidth * x
      const pointY = top + visualHeight * y
      context.beginPath()
      context.arc(pointX, pointY, line * (index === 2 ? 1.25 : .95), 0, Math.PI * 2)
      context.fill()
      context.fillRect(pointX - line * 1.9, pointY + line * 1.8, line * 3.8, line * .72)
    })
  }

  context.restore()
}

const smoothStep = (edge0: number, edge1: number, value: number) => {
  const progress = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)))
  return progress * progress * (3 - 2 * progress)
}

export function ProjectMatrixBackground({ mode = "words" }: { mode?: MatrixMode }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!root || !canvas || !context) return

    const maskCanvas = document.createElement("canvas")
    const maskContext = maskCanvas.getContext("2d", { willReadFrequently: true })
    if (!maskContext) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let width = 0
    let height = 0
    let cellSize = 14
    let columns = 0
    let rows = 0
    let wordTargets = new Uint8Array()
    let activeWord = -1
    let activeCycle = -1
    let wordCenterX = 0
    let wordCenterY = 0
    let wordGlowRadius = 260
    let activeVisualWidth = 0
    let activeVisualHeight = 0
    let frame = 0
    let lastRenderTime = 0
    let pointerX = -1000
    let pointerY = -1000
    let pointerActivity = 0
    const trail: TrailPoint[] = []

    const buildWordMask = (wordIndex: number, cycleIndex: number) => {
      if (!width || !height) return
      activeWord = wordIndex
      activeCycle = cycleIndex
      maskContext.clearRect(0, 0, width, height)
      const randomX = Math.abs(Math.sin((cycleIndex + 1) * 12.9898) * 43758.5453) % 1
      const randomY = Math.abs(Math.sin((cycleIndex + 1) * 78.233) * 12515.873) % 1

      if (mode === "words") {
        activeVisualWidth = 0
        activeVisualHeight = 0
        const word = WORDS[wordIndex]
        const maxWordWidth = width * (width < 800 ? 0.86 : 0.58)
        let fontSize = Math.min(width * 0.13, 116)
        maskContext.font = `900 ${fontSize}px Inter, Arial, sans-serif`
        while (maskContext.measureText(word).width > maxWordWidth && fontSize > 34) {
          fontSize -= 2
          maskContext.font = `900 ${fontSize}px Inter, Arial, sans-serif`
        }
        maskContext.textAlign = "center"
        maskContext.textBaseline = "middle"
        maskContext.fillStyle = "#fff"
        const textWidth = maskContext.measureText(word).width
        const horizontalPadding = Math.min(width / 2, textWidth / 2 + 22)
        const availableWidth = Math.max(0, width - horizontalPadding * 2)
        const centerX = horizontalPadding + availableWidth * randomX
        const minY = height * 0.2
        const maxY = height * (width < 800 ? 0.57 : 0.7)
        const centerY = minY + (maxY - minY) * randomY
        wordCenterX = centerX
        wordCenterY = centerY
        wordGlowRadius = Math.min(width < 800 ? 360 : 520, Math.max(240, textWidth * 1.05))
        maskContext.fillText(word, centerX, centerY)
      } else if (mode === "workflows") {
        const visualWidth = Math.min(width * (width < 800 ? .8 : .5), 680)
        const visualHeight = Math.min(height * .34, visualWidth * .55)
        const horizontalPadding = visualWidth / 2 + 24
        const anchorX = wordIndex % 2 === 0 ? .76 : .24
        const desiredCenterX = width * (anchorX + (randomX - .5) * .08)
        const centerX = Math.min(width - horizontalPadding, Math.max(horizontalPadding, desiredCenterX))
        const verticalPadding = visualHeight / 2 + 50
        const anchorY = wordIndex < 2 ? .27 : .39
        const desiredCenterY = height * (anchorY + (randomY - .5) * .06)
        const centerY = Math.min(height - verticalPadding, Math.max(verticalPadding, desiredCenterY))
        wordCenterX = centerX
        wordCenterY = centerY
        wordGlowRadius = Math.min(width < 800 ? 390 : 560, Math.max(280, visualWidth * .82))
        activeVisualWidth = visualWidth
        activeVisualHeight = visualHeight
        drawWorkflowMask(maskContext, wordIndex, centerX, centerY, visualWidth, visualHeight)
      } else {
        activeVisualWidth = 0
        activeVisualHeight = 0
        const word = EXPERIENCE_WORDS[wordIndex]
        const sectionBounds = root.getBoundingClientRect()
        const entries = root.closest("section")?.querySelectorAll<HTMLElement>("[data-experience-card]")
        const entry = entries?.[wordIndex]
        const cardBounds = (entry?.querySelector<HTMLElement>(".experience-card") ?? entry)?.getBoundingClientRect()
        const maxWordWidth = width < 800 ? width * .78 : Math.min(width * .34, (cardBounds?.width ?? width * .34) * .96)
        let fontSize = Math.min(width * (width < 800 ? .09 : .052), 66)
        maskContext.font = `650 ${fontSize}px "Arial Narrow", "Roboto Condensed", Arial, sans-serif`
        while (maskContext.measureText(word).width > maxWordWidth && fontSize > 28) {
          fontSize -= 2
          maskContext.font = `650 ${fontSize}px "Arial Narrow", "Roboto Condensed", Arial, sans-serif`
        }
        maskContext.textAlign = "center"
        maskContext.textBaseline = "middle"
        maskContext.fillStyle = "#fff"
        const cardCenterX = cardBounds
          ? cardBounds.left - sectionBounds.left + cardBounds.width * .5
          : width * (wordIndex % 2 === 0 ? .29 : .71)
        const centerX = width < 800 ? width * .5 : width - cardCenterX
        const centerY = cardBounds
          ? cardBounds.top - sectionBounds.top + cardBounds.height * .5
          : height * (.32 + wordIndex * .17)
        wordCenterX = centerX
        wordCenterY = centerY
        wordGlowRadius = Math.min(480, Math.max(250, maskContext.measureText(word).width * .82))
        maskContext.fillText(word, centerX, centerY)
      }

      const pixels = maskContext.getImageData(0, 0, width, height).data
      wordTargets = new Uint8Array(columns * rows)
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = Math.min(width - 1, Math.floor(column * cellSize + cellSize / 2))
          const y = Math.min(height - 1, Math.floor(row * cellSize + cellSize / 2))
          wordTargets[row * columns + column] = pixels[(y * width + x) * 4 + 3] > 40 ? 1 : 0
        }
      }
    }

    const resize = () => {
      const bounds = root.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.round(bounds.width))
      height = Math.max(1, Math.round(bounds.height))
      cellSize = mode === "experience" ? (width < 800 ? 12 : 9) : width < 800 ? 18 : 20
      columns = Math.ceil(width / cellSize)
      rows = Math.ceil(height / cellSize)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      maskCanvas.width = width
      maskCanvas.height = height
      if (activeCycle >= 0) buildWordMask(activeWord, activeCycle)
      else wordTargets = new Uint8Array(columns * rows)
    }

    const move = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect()
      pointerX = event.clientX - bounds.left
      pointerY = event.clientY - bounds.top
      pointerActivity = 1
      const previous = trail[trail.length - 1]
      if (!previous || Math.hypot(previous.x - pointerX, previous.y - pointerY) > 11) {
        trail.push({ x: pointerX, y: pointerY, life: 1 })
        if (trail.length > 34) trail.shift()
      }
    }

    const drawProjectBoard = (time: number) => {
      const lineColor = PALETTE[Math.floor(time / 5200) % PALETTE.length].join(",")
      context.lineWidth = 1

      // Roadmap curve
      context.strokeStyle = `rgba(${lineColor},0.045)`
      context.beginPath()
      context.moveTo(width * 0.4, height * 0.16)
      context.bezierCurveTo(width * 0.58, height * 0.08, width * 0.72, height * 0.22, width * 0.96, height * 0.12)
      context.stroke()

      for (let index = 0; index < 5; index += 1) {
        const progress = index / 4
        const x = width * (0.4 + progress * 0.56)
        const y = height * (0.15 + Math.sin(progress * Math.PI * 2) * 0.025)
        context.fillStyle = `rgba(${lineColor},${0.035 + (index === 2 ? 0.025 : 0)})`
        context.beginPath()
        context.arc(x, y, 3 + (index === 2 ? 2 : 0), 0, Math.PI * 2)
        context.fill()
      }

      // Kanban columns
      const boardX = width * 0.5
      const boardY = height * 0.48
      const boardWidth = width * 0.46
      const gap = 10
      const columnWidth = (boardWidth - gap * 2) / 3
      for (let column = 0; column < 3; column += 1) {
        const x = boardX + column * (columnWidth + gap)
        context.strokeStyle = `rgba(${lineColor},0.022)`
        context.strokeRect(x, boardY, columnWidth, height * 0.25)
        for (let card = 0; card < 3; card += 1) {
          const pulse = 0.022 + Math.sin(time / 1100 + column + card) * 0.008
          context.fillStyle = `rgba(${lineColor},${pulse * 0.55})`
          context.fillRect(x + 8, boardY + 14 + card * 48, columnWidth - 16, 34)
        }
      }

      // Gantt rows
      const ganttY = height * 0.8
      for (let row = 0; row < 5; row += 1) {
        const y = ganttY + row * 16
        const start = width * (0.38 + ((row * 7) % 13) / 100)
        const travel = (time / (70 + row * 8)) % (width * 0.08)
        const length = width * (0.12 + row * 0.025)
        context.fillStyle = `rgba(${lineColor},${0.018 + row * 0.003})`
        context.fillRect(start + travel, y, length, 4)
      }
    }

    const render = (time: number) => {
      if (!reduceMotion && time - lastRenderTime < 33) {
        frame = requestAnimationFrame(render)
        return
      }
      lastRenderTime = time
      const wordDuration = reduceMotion ? 100000 : mode === "experience" ? 4400 : 5200
      const cycleIndex = reduceMotion ? 0 : Math.floor(time / wordDuration)
      const wordIndex = mode === "experience"
        ? getExperienceWordIndex(cycleIndex)
        : cycleIndex % (mode === "words" ? WORDS.length : 4)
      if (cycleIndex !== activeCycle) buildWordMask(wordIndex, cycleIndex)
      const phase = (time % wordDuration) / wordDuration
      const appear = smoothStep(0.035, 0.23, phase)
      const disappear = 1 - smoothStep(0.7, 0.82, phase)
      const wordStrength = reduceMotion ? 0.72 : appear * disappear
      const glowAppear = smoothStep(0, 0.1, phase)
      const glowDisappear = 1 - smoothStep(0.86, 1, phase)
      const glowStrength = reduceMotion ? 0.62 : (0.18 + glowAppear * 0.82) * glowDisappear

      pointerActivity *= 0.965
      context.clearRect(0, 0, width, height)

      for (let index = trail.length - 1; index >= 0; index -= 1) {
        trail[index].life -= 0.027
        if (trail[index].life <= 0) trail.splice(index, 1)
      }

      for (const point of trail) {
        const glowColor = PALETTE[wordIndex].join(",")
        const gradient = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, 190)
        gradient.addColorStop(0, `rgba(${glowColor},${point.life * 0.035})`)
        gradient.addColorStop(1, `rgba(${glowColor},0)`)
        context.fillStyle = gradient
        context.fillRect(point.x - 190, point.y - 190, 380, 380)
      }

      const activeColor = PALETTE[wordIndex].join(",")
      const wordGlow = context.createRadialGradient(
        wordCenterX,
        wordCenterY,
        wordGlowRadius * 0.05,
        wordCenterX,
        wordCenterY,
        wordGlowRadius,
      )
      wordGlow.addColorStop(0, `rgba(${activeColor},${glowStrength * 0.125})`)
      wordGlow.addColorStop(0.48, `rgba(${activeColor},${glowStrength * 0.058})`)
      wordGlow.addColorStop(1, `rgba(${activeColor},0)`)
      context.fillStyle = wordGlow
      context.fillRect(
        wordCenterX - wordGlowRadius,
        wordCenterY - wordGlowRadius,
        wordGlowRadius * 2,
        wordGlowRadius * 2,
      )
      if (mode === "workflows" && activeVisualWidth && activeVisualHeight) {
        drawWorkflowMask(
          context,
          wordIndex,
          wordCenterX,
          wordCenterY,
          activeVisualWidth,
          activeVisualHeight,
          `rgb(${activeColor})`,
          wordStrength * .075,
        )
      } else if (mode === "words") {
        drawProjectBoard(time)
      }

      context.font = `${Math.max(7, cellSize * 0.6)}px "JetBrains Mono", monospace`
      context.textAlign = "center"
      context.textBaseline = "middle"

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const index = row * columns + column
          const x = column * cellSize + cellSize / 2
          const y = row * cellSize + cellSize / 2
          const target = wordTargets[index] || 0
          const stream = Math.max(0, 1 - Math.abs(((row - time / 95 + column * 0.37) % 18 + 18) % 18 - 3) / 3)
          const distance = Math.hypot(x - pointerX, y - pointerY)
          const pointerGlow = Math.max(0, 1 - distance / 170) * pointerActivity
          const autoGlow = Math.max(0, 1 - Math.hypot(x - wordCenterX, y - wordCenterY) / wordGlowRadius) * glowStrength
          let trailGlow = 0
          for (const point of trail) {
            const influence = Math.max(0, 1 - Math.hypot(x - point.x, y - point.y) / 185) * point.life
            if (influence > trailGlow) trailGlow = influence
          }
          const random = ((index * 17 + Math.floor(time / 120)) % 29) / 29
          const targetBase = mode === "experience" ? .74 : mode === "workflows" ? 0.58 : 0.36
          const alpha = Math.min(0.94, 0.008 + stream * 0.032 + random * 0.012 + target * wordStrength * (targetBase + trailGlow * 0.42 + autoGlow * 0.34) + pointerGlow * 0.08 + trailGlow * 0.045 + autoGlow * 0.045)

          if (alpha < 0.026) continue
          const flip = target ? Math.abs(Math.sin(time / 210 + index * 0.19)) : 1
          const trailIsActive = trailGlow > .035 || pointerGlow > .05
          const glyphInterval = trailIsActive ? 52 : target ? 170 : 260
          const trailWave = trailIsActive ? Math.floor((x + y) / cellSize + time / 90) : 0
          const glyphIndex = Math.abs(index * 11 + Math.floor(time / glyphInterval) + trailWave) % GLYPHS.length
          const color = target ? PALETTE[wordIndex] : PALETTE[(Math.floor(column / 9) + Math.floor(row / 12)) % PALETTE.length]
          context.fillStyle = `rgba(${color.join(",")},${alpha})`
          if (target && flip < 0.18) {
            context.fillRect(x - cellSize * 0.34, y - 1, cellSize * 0.68, 2)
          } else {
            context.fillText(GLYPHS[glyphIndex], x, y)
            if (target && wordStrength > 0.16) {
              context.fillText(GLYPHS[glyphIndex], x + 0.4, y)
            }
          }
        }
      }

      frame = requestAnimationFrame(render)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(root)
    resize()
    window.addEventListener("pointermove", move, { passive: true })
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", move)
    }
  }, [mode])

  return (
    <div
      ref={rootRef}
      className="project-matrix-background"
      aria-hidden="true"
      style={{
        position: "absolute",
        zIndex: 0,
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background: "radial-gradient(circle at 76% 24%, rgba(60,95,145,.08), transparent 34%), radial-gradient(circle at 84% 76%, rgba(125,75,145,.055), transparent 32%), radial-gradient(circle at 18% 68%, rgba(130,80,55,.04), transparent 30%), #030405",
      }}
    >
      <canvas
        ref={canvasRef}
        className="project-matrix-background__canvas"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.88 }}
      />
      <div
        className="project-matrix-background__shade"
        style={{
          position: "absolute",
          inset: 0,
        }}
      />
    </div>
  )
}
