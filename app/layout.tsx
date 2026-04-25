import "./globals.css";

export const metadata = {
  title: "AI Dev Copilot",
  description: "Analyze GitHub and get hired faster",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
