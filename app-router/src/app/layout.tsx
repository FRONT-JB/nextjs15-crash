import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { API_URL } from "@/lib/constants";

async function Footer() {
  const response = await fetch(`${API_URL}/book`);

  if (!response.ok) {
    return <footer>제작 @winterlood</footer>;
  }

  const allBooks = await response.json();

  return (
    <footer>
      <div>제작 @winterlood</div>
      <div>총 {allBooks.length}권의 도서가 있습니다.</div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>

          <main>{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
