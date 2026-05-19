import type { Metadata } from 'next'
import '../index.css'

export const metadata: Metadata = {
  title: 'Ochiq Nazorat tizimi',
  description: 'Ochiq Nazorat tizimi',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
