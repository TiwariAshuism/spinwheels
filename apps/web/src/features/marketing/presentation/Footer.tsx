import { FOOTER_LINKS, SITE_NAME } from "@spinwheels/config";
import { Container } from "@spinwheels/ui";
import { SiteLink } from "@/components/layout/SiteLink";

export function Footer() {
  return (
    <footer>
      <Container className="footer-inner">
        <span className="brand-footer">{SITE_NAME}</span>
        <div className="footer-links">
          {FOOTER_LINKS.map((link) => (
            <SiteLink key={link.href} href={link.href}>
              {link.label}
            </SiteLink>
          ))}
        </div>
        <span>&copy; 2026 {SITE_NAME}. Bengaluru, India.</span>
      </Container>
    </footer>
  );
}
