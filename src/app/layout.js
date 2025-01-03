import './globals.css';

export const metadata = {
  title: 'Game Portal',
  description: 'Play thousands of free games',
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
