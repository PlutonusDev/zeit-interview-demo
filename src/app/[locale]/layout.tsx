import { routing } from '@/libs/i18nNavigation';

export async function generateStaticParams() {
  return Promise.all(routing.locales.map(locale => ({ locale })));
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
