import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link href="/" className="brand-lockup footer-brand">
            <span className="brand-mark">V</span>
            <span>VARS<span className="text-signal">LINK</span></span>
          </Link>
          <p>The athlete opportunity network—from discovery to signed, compliant deal.</p>
        </div>
        <div>
          <b>Explore</b>
          <Link href="/athletes">Athlete marketplace</Link>
          <Link href="/opportunities">NIL opportunities</Link>
          <Link href="/recruiting">Recruiting profiles</Link>
        </div>
        <div>
          <b>Build</b>
          <Link href="/brands">Launch a brand deal</Link>
          <Link href="/claim">Claim your profile</Link>
          <Link href="/dashboard">Agent command center</Link>
        </div>
        <div>
          <b>Trust</b>
          <Link href="/compliance">Compliance system</Link>
          <Link href="/how-nil-works">How NIL deals work</Link>
          <a href="mailto:hello@varslink.com">hello@varslink.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} VarsLink</span>
        <span>Source-linked profiles · Guardian-first workflows · Clear deal terms</span>
      </div>
    </footer>
  );
}
