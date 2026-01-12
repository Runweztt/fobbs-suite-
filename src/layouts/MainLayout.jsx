/**
 * MainLayout Component
 * App shell wrapper with global page transitions
 */

import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Optimized page transition variants (faster for better UX)
const pageVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: [0, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 1, 1],
    },
  },
}

export default function MainLayout({ children, pageKey }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Skip to content for accessibility */}
      <a 
        href="#main-content" 
        className="skip-to-content focus:left-0"
      >
        Skip to main content
      </a>

      {/* Navbar */}
      <Navbar />

      {/* Main Content with Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          key={pageKey}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="flex-1 pt-16 md:pt-20"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Footer with safe area for mobile */}
      <div className="safe-bottom">
        <Footer />
      </div>
    </div>
  )
}
