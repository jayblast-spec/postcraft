import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PostCraft | Content engine',
  description: 'turn raw ideas into platform-native posts with a point of view',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
