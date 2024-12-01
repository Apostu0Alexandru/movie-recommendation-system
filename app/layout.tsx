import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
import { QueryClientWrapper } from "@/components/query-client-wrapper"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie Recommendation System',
  description: 'A simple movie recommendation system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <QueryClientWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="min-h-screen bg-background text-foreground">
                <Header />
                <main>
                  {children}
                </main>
              </div>
            </ThemeProvider>
          </QueryClientWrapper>
        </body>
      </html>
    </ClerkProvider>
  )
}

