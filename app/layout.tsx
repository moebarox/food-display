import type { Metadata } from 'next';
import './globals.scss';

const title = 'Food Delivery Catalog - Your Favorite Meals Delivered';
const description =
  'Browse a wide variety of delicious food options available for delivery. Discover the best local restaurants and enjoy your favorite meals delivered right to your door.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'food delivery',
    'catalog',
    'restaurant',
    'food app',
    'online ordering',
    'meal delivery',
    'fast food',
    'healthy food',
    'takeout',
    'delivery services',
  ],
  openGraph: {
    title,
    description,
    type: 'website',
  },
  twitter: {
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
