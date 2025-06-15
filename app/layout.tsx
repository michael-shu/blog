import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Michael Shu's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const theme = localStorage.getItem('data-theme');
                  console.log("This is theme in localStorage", theme);
                  if (theme === 'dark' || theme === 'light') {
                    document.documentElement.className = theme;
                  } else {
                    document.documentElement.className = 'dark';
                    localStorage.setItem('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
