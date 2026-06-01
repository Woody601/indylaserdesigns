import NavBar from "./components/NavBar/page";
import Footer from "./components/Footer/page";
import Banner from "./components/Banner/page";

import "./globals.css";

export const metadata = {
  title: "Indy Laser Designs",
  description:
    "Indy Laser Designs specializes in precision laser engraving on wood, acrylic, leather, and more. Transform your ideas into stunning, custom creations with our high-quality craftsmanship. Contact us today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/hero.webp" />
      </head>
      <body>
        <NavBar />
        <Banner>
          We&rsquo;re currently revamping our website to bring you more products
          and features — thank you for your patience!
        </Banner>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
