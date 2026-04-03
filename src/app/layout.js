import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata = {
  title: "Manash Hada | Cybersecurity Portfolio",
  description:
    "Cybersecurity portfolio focused on offensive security, penetration testing, and practical security tooling.",
  icons: {
    icon: "/pokeball.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
