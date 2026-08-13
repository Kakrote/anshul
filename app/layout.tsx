import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import StructuredData from '../components/StructuredData';
import { getPortfolioData } from '../lib/portfolio';

const { seo, personal } = getPortfolioData();

export const metadata: Metadata = {
  title: {
    default: seo.title,
    template: `%s | ${personal.name}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: seo.author }],
  creator: seo.author,
  metadataBase: new URL(seo.siteUrl),
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.siteUrl,
    siteName: `${personal.name} Portfolio`,
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${personal.name} - ${personal.title}`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    creator: seo.twitterHandle,
    images: [seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#060907] text-[#e2e8f0] antialiased selection:bg-[#00ff87] selection:text-[#060907] min-h-screen flex flex-col justify-between">
        <StructuredData />
        <CustomCursor />
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
