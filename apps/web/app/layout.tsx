import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
        <link rel="icon" href="../public/favicon.ico" />
      </head>

      <body>
        <h1 className="text-blue-900 text-2xl">test</h1>
        {children}
      </body>
    </html>
  );
}
