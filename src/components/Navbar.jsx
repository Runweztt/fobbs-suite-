/**
 * Navbar Component
 * Futuristic sticky navigation with mobile menu
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoSvg from '../assets/logo.svg'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        className={`fixed top-0 inset-x-0 z-[999] transition-all duration-300 ${
          isScrolled ? 'glass shadow-md' : 'bg-transparent'
        }`}
      >
        <nav 
          className="container-app flex items-center justify-between h-16 md:h-20"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a 
            href="#home" 
            className="flex items-center z-10"
            aria-label="Riverside Suites - Home"
          >
            <motion.img 
              src={logoSvg} 
              alt="Riverside Suites" 
              className={`h-8 md:h-10 w-auto transition-all duration-300 ${
                !isScrolled ? 'brightness-0 invert' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-500 ${
                  isScrolled ? 'text-secondary-800' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary"
            >
              Book Now
            </motion.a>
          </div>

          {/* Mobile Menu Button - 44px touch target */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 w-11 h-11 flex items-center justify-center touch-target"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0,
                }}
                transition={{ duration: 0.2 }}
                className={`block h-0.5 rounded-full origin-center transition-colors ${
                  isOpen || isScrolled ? 'bg-text' : 'bg-white'
                }`}
              />
              <motion.span
                animate={{
                  opacity: isOpen ? 0 : 1,
                  scaleX: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.1 }}
                className={`block h-0.5 rounded-full ${
                  isOpen || isScrolled ? 'bg-text' : 'bg-white'
                }`}
              />
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0,
                }}
                transition={{ duration: 0.2 }}
                className={`block h-0.5 rounded-full origin-center transition-colors ${
                  isOpen || isScrolled ? 'bg-text' : 'bg-white'
                }`}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-modal-backdrop bg-secondary-950/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-modal w-80 max-w-[85vw] bg-surface shadow-2xl lg:hidden"
          >
            <div className="flex flex-col h-full pt-24 pb-8 px-6">
              {/* Nav Links */}
              <nav className="flex-1" aria-label="Mobile navigation">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center py-3 px-4 text-lg font-medium text-text hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-6 border-t border-border"
              >
                <button className="btn btn-primary w-full justify-center">
                  Book Now
                </button>
                <p className="mt-4 text-center text-sm text-text-muted">
                  Najjerra's Premier Destination
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
