import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <h1 className="text-blue-900 text-2xl">test</h1>
        {children}
      </body>
    </html>
  );
}
