import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'VictorADS | Digital Rewards, Bandwidth Monetization & Utility Platform',
  description: 'Monetize unused internet bandwidth, watch rewarded ads, trade data packages on a P2P marketplace, and access privacy-first web utility tools on VictorADS.',
  keywords: ['bandwidth monetization', 'digital rewards', 'rewarded ads', 'P2P data marketplace', 'image to pdf', 'qr code generator', 'link safety analyzer'],
  authors: [{ name: 'VictorADS Engineering' }],
  metadataBase: new URL('https://victor-ads.vercel.app'),
  openGraph: {
    title: 'VictorADS | Digital Rewards & Bandwidth Monetization',
    description: 'Monetize unused internet bandwidth and watch rewarded ads with instant UPI payouts.',
    url: 'https://victor-ads.vercel.app',
    siteName: 'VictorADS',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  other: {
    'application-name': 'VictorADS',
    'app-identifier': 'com.example.victorads',
    'admob-app-id': 'ca-app-pub-6751037211810646~6259534978',
    'mobile-web-app-capable': 'yes',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-app-pub-6751037211810646~6259534978" />
      </head>
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
