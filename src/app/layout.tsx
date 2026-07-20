import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "IB English Master Guide",
  description: "The ultimate interactive IB DP English Master Guide",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground overflow-hidden selection:bg-zinc-800 selection:text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen w-full">
            <div className="w-64 hidden md:block shrink-0 h-full">
              <Sidebar />
            </div>
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
              <Topbar />
              <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
