import React from "react"
import type { Metadata, Viewport } from "next"
import { Manrope, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Иванов Артём Антонович - Руководитель IT-проектов",
  description: "Руководитель IT-проектов с опытом полного цикла разработки и внедрения IT-решений",
  generator: "artivtw",
  icons: {
    icon: [{ url: "/icon-dark-32x32.png" }, { url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
    shortcut: ["/icon-dark-32x32.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#17181d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${jetbrainsMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
