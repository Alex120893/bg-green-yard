import { Footer } from "@/components/Footer";
import { HtmlLang } from "@/components/HtmlLang";
import { Navbar } from "@/components/Navbar";
import { FloatingCTA } from "@/components/FloatingCTA";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = getMessages(locale);

  return (
    <>
      <HtmlLang locale={locale} />
      <div className="flex min-h-full min-w-0 flex-col overflow-x-clip">
        <Navbar locale={locale} nav={t.nav} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} nav={t.nav} footer={t.footer} />
      </div>
      <FloatingCTA locale={locale} />
    </>
  );
}
