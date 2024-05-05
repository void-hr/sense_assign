import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from "@/contexts/CartContext";
import { CreditsProvider } from "@/contexts/CreditsContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Instafarm",
  description: "An online platform where users can buy agricultural products using Instafarm credits.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
            <CreditsProvider>
              {children}
              </CreditsProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
