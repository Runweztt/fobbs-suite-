/**
 * Amenities Section
 * Preview of hotel amenities with icons
 */

import { motion } from 'framer-motion'

const amenities = [
  {
    icon: PoolIcon,
    title: 'Infinity Pool',
    description: 'Rooftop infinity pool with stunning city views, open 24/7.',
  },
  {
    icon: SpaIcon,
    title: 'Luxury Spa',
    description: 'Full-service spa with massage, sauna, and wellness treatments.',
  },
  {
    icon: DiningIcon,
    title: 'Fine Dining',
    description: 'Award-winning restaurant featuring local and international cuisine.',
  },
  {
    icon: GymIcon,
    title: 'Fitness Center',
    description: 'State-of-the-art gym with personal trainers and yoga classes.',
  },
  {
    icon: WifiIcon,
    title: 'High-Speed WiFi',
    description: 'Complimentary fiber-optic internet throughout the property.',
  },
  {
    icon: ParkingIcon,
    title: 'Valet Parking',
    description: 'Secure underground parking with 24-hour valet service.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export default function Amenities() {
  return (
    <section className="section-lg bg-surface">
      <div className="container-app">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary-500 text-sm font-medium uppercase tracking-wider mb-3 block">
            World-Class Facilities
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display mb-4">
            Premium <span className="text-gradient-gold">Amenities</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Every detail has been crafted for your comfort and convenience.
          </p>
        </motion.div>

        {/* Amenities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              className="group p-6 bg-surface rounded-xl border border-border hover:border-primary-200 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <amenity.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-display font-semibold mb-2">
                {amenity.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {amenity.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-secondary px-8"
          >
            Explore All Amenities
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// Icons
function PoolIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M2 12h20M2 12c0 4.418 4.477 8 10 8s10-3.582 10-8M2 12c0-4.418 4.477-8 10-8s10 3.582 10 8" />
      <circle cx="12" cy="8" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function SpaIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L12 22l8.662-5A9.953 9.953 0 0022 12c0-5.523-4.477-10-10-10z" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function DiningIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M3 3v18h18" />
      <path d="M7 17V7m4 10v-6m4 6V5m4 12v-4" />
    </svg>
  )
}

function GymIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M6.5 6.5L17.5 17.5M17.5 6.5L6.5 17.5" />
      <rect x="3" y="10" width="4" height="4" rx="1" />
      <rect x="17" y="10" width="4" height="4" rx="1" />
      <path d="M7 12h10" />
    </svg>
  )
}

function WifiIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12.55a11 11 0 0114 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
    </svg>
  )
}

function ParkingIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 17V7h4a3 3 0 010 6H9" />
    </svg>
  )
}
