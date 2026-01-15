/**
 * Footer Component
 * Minimal futuristic footer with social links
 */

import { motion } from 'framer-motion'
import logoSvg from '../assets/logo.svg'

const footerLinks = {
  explore: [
    { label: 'Rooms & Suites', href: '#rooms' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Dining', href: '#dining' },
    { label: 'Gallery', href: '#gallery' },
  ],
  info: [
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Careers', href: '#careers' },
    { label: 'Privacy Policy', href: '#privacy' },
  ],
}

const socialLinks = [
  { label: 'Instagram', href: '#', icon: InstagramIcon },
  { label: 'Facebook', href: '#', icon: FacebookIcon },
  { label: 'Twitter', href: '#', icon: TwitterIcon },
]

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-950 text-white">
      {/* Main Footer */}
      <div className="container-app py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.a 
              href="/"
              whileHover={{ scale: 1.02 }}
              className="inline-block mb-6"
            >
              <img 
                src={logoSvg} 
                alt="FOBBS Apartment and Suite" 
                className="h-10 brightness-0 invert"
              />
            </motion.a>
            <p className="text-secondary-400 text-sm leading-relaxed mb-6">
              Experience premium comfort at Asaba's finest destination. 
              Modern apartments and suites with world-class amenities.
            </p>
            
            {/* Social Links - 44px touch targets */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-secondary-800 text-secondary-400 hover:bg-primary-500 hover:text-white transition-colors touch-target"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary-300 mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary-300 mb-4">
              Information
            </h4>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary-300 mb-4">
              Contact
            </h4>
            <address className="not-italic space-y-3 text-sm text-secondary-400">
              <p>Michael Fidelis Nwaefulu Street</p>
              <p>GRA Phase I, Asaba, Delta State, Nigeria</p>
              <a 
                href="tel:+2349077918042" 
                className="block hover:text-primary-400 transition-colors"
              >
                +234 907 791 8042
              </a>
              <a 
                href="mailto:fobbesapartmentsandsuites@gmail.com" 
                className="block hover:text-primary-400 transition-colors"
              >
                fobbesapartmentsandsuites@gmail.com
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-800">
        <div className="container-app py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-secondary-500 text-sm text-center sm:text-left">
            © {currentYear} FOBBS Apartment and Suite. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-secondary-500 text-sm">
            <span>Crafted with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-primary-500"
            >
              ♥
            </motion.span>
            <span>in Asaba</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
