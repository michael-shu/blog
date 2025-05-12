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
                  const theme = localStorage.getItem('theme');
                  console.log("This is theme in localStorage", theme);
                  if (theme === 'darkMode' || theme === 'lightMode') {
                    document.documentElement.className = theme;
                  } else {
                    document.documentElement.className = 'darkMode';
                    localStorage.setItem('darkMode');
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
