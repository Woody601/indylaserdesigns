import NavBar from "./components/NavBar/page";
import Footer from "./components/Footer/page";

import "./globals.css";

export const metadata = {
  title: "Indy Laser Designs",
  description:
    "Indy Laser Designs specializes in precision laser engraving on wood, acrylic, leather, and more. Transform your ideas into stunning, custom creations with our high-quality craftsmanship. Contact us today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
