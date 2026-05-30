"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/#courses" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteFooter() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <section className="site-footer__brand">
            <h2>Josh English Academy</h2>
            <p>
              Empowering students with confidence, communication skills, and spoken English excellence.
            </p>
          </section>

          <nav className="site-footer__links" aria-label="Quick Links">
            <h3>Quick Links</h3>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="site-footer__contact">
            <h3>Contact Information</h3>
            <ul>
              <li>
                <span aria-hidden="true">&#x1F4E7;</span>
                <a href="mailto:contact@joshenglishacademy.in">contact@joshenglishacademy.in</a>
              </li>
              <li>
                <span aria-hidden="true">&#x1F4DE;</span>
                <a href="tel:+918759137380">+91 8759137380</a>
              </li>
            </ul>
          </section>
        </div>

        <div className="site-footer__bottom">
          <p>&copy; 2026 Josh English Academy. All Rights Reserved.</p>
          <p className="site-footer__powered">
            Powered by <span>SabjiHub</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
