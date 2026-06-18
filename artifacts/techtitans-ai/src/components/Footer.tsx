import { Linkedin, Github, Instagram, Twitter, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 pt-10 pb-6 text-neutral-400 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
          {/* Brand/Logo Column */}
          <div className="flex flex-col items-start">
            <a href="#" className="mb-3 inline-block">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src="/logo.png" alt="TechTitansAI" className="w-full h-full object-contain" />
              </div>
            </a>
            <h3 className="font-display text-white text-xl font-bold mb-1">TechTitans AI</h3>
            <p className="text-xs text-neutral-500 mb-4 font-sans">Empowering Digital Realities</p>
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/in/tech-titans-ai-7b92a3417/?skipRedirect=true"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/techtitansai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/techtitans.ai?utm_source=qr&igsh=MWxkanNyY2Y3NWZmeQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-display text-white font-bold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/#services" className="hover:text-white transition-colors text-sm">Services</a></li>
              <li><a href="/portfolio" className="hover:text-white transition-colors text-sm">Portfolio</a></li>
              <li><a href="/about" className="hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-display text-white font-bold text-base mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/terms-conditions" className="hover:text-white transition-colors text-sm">Terms of Service</a></li>
              <li><a href="/privacy-policy" className="hover:text-white transition-colors text-sm">Data Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Security Policy</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-display text-white font-bold text-base mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:8979768681" className="hover:text-white transition-colors block">+91 8979768681</a>
                  <a href="tel:7876799926" className="hover:text-white transition-colors block">+91 7876799926</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <a href="mailto:techtitansai@zohomail.in" className="hover:text-white transition-colors break-all">
                  techtitansai@zohomail.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 TechTitans AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Powered By TechTitans AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
