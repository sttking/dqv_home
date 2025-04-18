import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import Head from 'next/head'

const notosanskr = Noto_Sans_KR({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'DQV_HOME',
  description: 'DQV_HOME'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <SEO />
      <body className={`${notosanskr.className} antialiased`}>{children}</body>
    </html>
  )
}

function SEO() {
  return (
    <Head>
      <title>DQV_HOME</title>
      <meta name="description" content="DQV_HOME" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
