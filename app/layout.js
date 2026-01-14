import "./globals.css";

export const metadata = {
  title: "OinUsideT - Transform From Inside Out",
  description: "Holistic health and wellness platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
