import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomerSupportChat from '@/components/CustomerSupportChat';

export const metadata = {
  title: 'VictorADS | 3D Watch & Earn Station & 100+ Free Digital Utilities',
  description: 'Watch rewarded sponsor ads to earn cash & gift cards while accessing 100+ free digital life utilities on VictorADS.',
  keywords: ['watch and earn', 'rewarded ads', '100+ free online tools', 'image to pdf', 'qr code generator', 'link analyzer', 'digital utilities'],
  authors: [{ name: 'VictorADS Team' }],
  metadataBase: new URL('https://victor-ads.vercel.app'),
  openGraph: {
    title: 'VictorADS | Watch & Earn Rewards & 100+ Life Tools',
    description: 'Watch 15-second rewarded ads and use 100+ free browser tools on VictorADS.',
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
    'google-site-verification': 'uBcYkVShNH4xBS6Vhbt-F3dVAKaKWceQNek2H_dFrjs',
    'google-adsense-account': 'ca-pub-6751037211810646',
    'admob-app-id': 'ca-app-pub-6751037211810646~6259534978',
    'mobile-web-app-capable': 'yes',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6751037211810646"
          crossOrigin="anonymous"
        />

        {/* Google Site Verification & AdSense Meta */}
        <meta name="google-adsense-account" content="ca-pub-6751037211810646" />
        <meta name="google-site-verification" content="uBcYkVShNH4xBS6Vhbt-F3dVAKaKWceQNek2H_dFrjs" />

        {/* Google Analytics gtag.js Snippet */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VHE5V0VJRB" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VHE5V0VJRB', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <CustomerSupportChat />
          <Footer />
        </div>
      </body>
    </html>
  );
}
