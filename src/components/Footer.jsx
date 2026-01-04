import { Facebook, Instagram, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-brand">
          <h3 className="footer-title">Estate Agent App</h3>
          <p className="footer-tagline">Your trusted partner in finding the perfect property.</p>
        </div>

        <div className="footer-section footer-links">
          <h4 className="footer-section-title">Quick Links</h4>
          <a href="/">Search Properties</a>
          <a href="/#about">About Us</a>
          <a href="/#privacy">Privacy Policy</a>
        </div>

        <div className="footer-section footer-connect">
          <h4 className="footer-section-title">Contact</h4>
          <div className="footer-socials">
            <a href="#facebook" aria-label="Facebook" className="social-link">
              <Facebook size={20} />
            </a>
            <a href="#instagram" aria-label="Instagram" className="social-link">
              <Instagram size={20} />
            </a>
            <a href="#email" aria-label="Email" className="social-link">
              <Mail size={20} />
            </a>
          </div>
          <p className="footer-copyright">&copy; 2026 Estate Agent App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
