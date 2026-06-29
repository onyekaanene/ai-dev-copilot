import "./globals.css";

// Metadata for the application
export const metadata = {
  title: "AI Dev Copilot",
  description: "Analyze GitHub and get hired faster",
};

// Root layout component that wraps the entire application
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
