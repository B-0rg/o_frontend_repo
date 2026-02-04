import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "My Portfolio",
  description: "Portfolio powered by Strapi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <Link href="/">Home</Link> |{" "}
            <Link href="/projects">Projects</Link>
          </nav>
        </header>

        {children}

        <footer>
          <p>© 2026 — borg</p>
        </footer>
      </body>
    </html>
  );
}