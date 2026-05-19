<<<<<<< HEAD
export const metadata = {
  title: "Retirement Savings Gap Calculator | Find Out Now if You'll Have Enough Later",
  description: "Estimate your retirement savings gap and find out how much you need to save monthly to reach your retirement goal.",
  
  alternates: {
    canonical: "https://www.retirementsavingsgap.com",           // ← MUST CHANGE
  },

  openGraph: {
    title: "Retirement Savings Gap Calculator | Find Out Now if You'll Have Enough Later",
    description: "Estimate your retirement savings gap and find out how much you need to save monthly to reach your retirement goal.",
    url: "https:/www.retirementsavingsgap.com",                 // ← MUST CHANGE
    siteName: "Moneywise Calculators",             // ← Change
    images: [
      {
        url: "https://www.retirementsavingsgap.com/og-image.png", // ← MUST CHANGE
        width: 1200,
        height: 630,
        alt: "Retirement Savings Gap Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Retirement Savings Gap Calculator | Find Out Now if You'll Have Enough Later",
    description: "Estimate your retirement savings gap and find out how much you need to save monthly to reach your retirement goal.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  authors: [{name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
              <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "retirement-savings-gap-calculator",
              description: "Retirement savings gap calculator",
              url: "https://www.retirementsavingsgap.com",
              applicationCategory: "Finance",
              operatingSystem: "All",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
            }),
          }}
        />
    </head>
      <body>{children}</body>
    </html>
  );
=======
export const metadata = {
  title: "Retirement Savings Gap Calculator | Find Out Now if You'll Have Enough Later",
  description: "Estimate your retirement savings gap and find out how much you need to save monthly to reach your retirement goal.",
  
  alternates: {
    canonical: "https://www.retirementsavingsgap.com",           // ← MUST CHANGE
  },

  openGraph: {
    title: "Retirement Savings Gap Calculator | Find Out Now if You'll Have Enough Later",
    description: "Estimate your retirement savings gap and find out how much you need to save monthly to reach your retirement goal.",
    url: "https:/www.retirementsavingsgap.com",                 // ← MUST CHANGE
    siteName: "Moneywise Calculators",             // ← Change
    images: [
      {
        url: "https://www.retirementsavingsgap.com/og-image.png", // ← MUST CHANGE
        width: 1200,
        height: 630,
        alt: "Retirement Savings Gap Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Retirement Savings Gap Calculator | Find Out Now if You'll Have Enough Later",
    description: "Estimate your retirement savings gap and find out how much you need to save monthly to reach your retirement goal.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  authors: [{name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
              <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "retirement-savings-gap-calculator",
              description: "Retirement savings gap calculator",
              url: "https://www.retirementsavingsgap.com",
              applicationCategory: "Finance",
              operatingSystem: "All",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
            }),
          }}
        />
    </head>
      <body>{children}</body>
    </html>
  );
>>>>>>> 085f57552ddcdc90ef79043f6679ff7c8cd0e690
}