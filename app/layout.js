export const metadata = {
  title: "Retirement Savings Gap Calculator | Find Out Now if You'll Have Enough Later",
  description: "Estimate your retirement savings gap and find out how much you need to save monthly to reach your retirement goal. See inflation-adjusted projections and milestone balances.",

  alternates: {
    canonical: "https://www.retirementsavingsgap.com",
  },

  openGraph: {
    title: "Retirement Savings Gap Calculator | Find Out Now if You'll Have Enough Later",
    description: "Estimate your retirement savings gap and find out how much you need to save monthly to reach your retirement goal.",
    url: "https://www.retirementsavingsgap.com",
    siteName: "MoneyWise Calculators",
    images: [
      {
        url: "https://www.retirementsavingsgap.com/og-image.png",
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

  authors: [{ name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
              name: "Retirement Savings Gap Calculator",
              description: "Free tool to estimate your retirement savings gap and find out how much you need to save monthly to reach your retirement goal.",
              url: "https://www.retirementsavingsgap.com",
              applicationCategory: "FinanceApplication",
              operatingSystem: "All",
              browserRequirements: "Requires JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              author: {
                "@type": "Organization",
                name: "MoneyWise Calculators",
                url: "https://moneywisecalculator.com"
              }
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}