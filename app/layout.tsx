import "./globals.css";

export const metadata = {
  title: "AI Dev Copilot",
  description: "Analyze your GitHub and get hired faster",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">{children}</body>
    </html>
  );
}
