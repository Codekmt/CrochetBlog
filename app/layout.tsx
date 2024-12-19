import Navbar from "@/components/Navbar";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <html lang="en">
        <body
          className={`flex flex-col min-h-screen bg-customBeige`}>
          <Navbar />
          <main className="flex-grow">
  
          {children}
          </main>
        </body>
      </html>
  );
}
