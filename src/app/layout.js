import './globals.css';

export const metadata = {
  title: {
    template: '%s | Jelly Arcade',
  },
  icons: {
    icon: [
      { url: '/images/avatar.png', type: 'image/png', sizes: '32x32' },
      { url: '/images/avatar.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/images/avatar.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
