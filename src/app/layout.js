import "./globals.css";

const PINTEREST_DOMAIN_VERIFY = "fb2ef31f75c06b6c3b063eb722dfb076";

export const metadata = {
  title: "Manash Hada | Cybersecurity Portfolio",
  description:
    "Cybersecurity portfolio focused on offensive security, penetration testing, and practical security tooling.",
  icons: {
    icon: "/pokeball.png",
  },
  other: {
    "p:domain_verify": PINTEREST_DOMAIN_VERIFY,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
