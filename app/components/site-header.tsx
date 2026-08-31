import Link from "next/link";
import { ArrowUpRight, Menu, Search, Sparkles } from "lucide-react";

const links = [
  ["Discover", "/"],
  ["Athletes", "/athletes"],
  ["NIL deals", "/opportunities"],
  ["Recruiting", "/recruiting"],
  ["For brands", "/brands"],
  ["How NIL works", "/how-nil-works"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-lockup" aria-label="VarsLink home">
          <span className="brand-mark">V</span>
          <span>
            VARS<span className="text-signal">LINK</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/athletes" className="icon-link" aria-label="Search athletes">
            <Search />
          </Link>
          <Link href="/claim" className="header-claim">
            Claim profile <ArrowUpRight />
          </Link>
          <details className="mobile-menu">
            <summary aria-label="Open navigation"><Menu /></summary>
            <nav aria-label="Mobile navigation">
              <span className="mobile-menu-label"><Sparkles /> Find your next move</span>
              {links.map(([label, href]) => (
                <Link key={href} href={href}>{label}</Link>
              ))}
              <Link href="/claim">Claim an athlete profile</Link>
              <Link href="/dashboard">Open command center</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
