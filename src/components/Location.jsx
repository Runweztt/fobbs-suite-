/**
 * Location Section
 * Highlights the hotel location with map preview
 */

import { motion } from 'framer-motion'

const highlights = [
  { icon: '🏢', label: 'City Center', distance: '10 min' },
  { icon: '✈️', label: 'Asaba Airport', distance: '20 min' },
  { icon: '🛍️', label: 'Asaba Mall', distance: '8 min' },
  { icon: '🏖️', label: 'Niger River', distance: '15 min' },
]

export default function Location() {
  return (
    <section className="section-lg bg-surface">
      <div className="container-app">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary-500 text-sm font-medium uppercase tracking-wider mb-3 block">
              Our Location
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display mb-6">
              Perfectly <span className="text-gradient-primary">Located</span> in Asaba
            </h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              Nestled in the prestigious GRA Phase I, FOBBS Apartment and Suite offers the perfect blend of 
              urban convenience and serene retreat. Minutes from major attractions yet 
              worlds away from the ordinary.
            </p>

            {/* Distance Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-surface-dim rounded-xl border border-border"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-text-muted text-sm">{item.distance}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-xl border border-primary-200">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <LocationIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-secondary-900">FOBBS Apartment and Suite</p>
                <p className="text-text-secondary text-sm">
                  Michael Fidelis Nwaefulu Street<br />
                  GRA Phase I, Asaba, Delta State, Nigeria
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-3 text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center gap-1"
                >
                  Get Directions
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Map Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Map Placeholder with stylized design */}
              <div className="aspect-square lg:aspect-[4/3] bg-gradient-to-br from-secondary-100 to-secondary-200 relative">
                {/* Decorative map elements */}
                <div className="absolute inset-0 opacity-30">
                  <svg className="w-full h-full" viewBox="0 0 400 300">
                    {/* Roads */}
                    <path d="M0 150 L400 150" stroke="#94a3b8" strokeWidth="4" />
                    <path d="M200 0 L200 300" stroke="#94a3b8" strokeWidth="4" />
                    <path d="M50 50 L350 250" stroke="#cbd5e1" strokeWidth="2" />
                    <path d="M350 50 L50 250" stroke="#cbd5e1" strokeWidth="2" />
                    
                    {/* Blocks */}
                    <rect x="30" y="30" width="60" height="40" fill="#e2e8f0" rx="4" />
                    <rect x="310" y="30" width="60" height="40" fill="#e2e8f0" rx="4" />
                    <rect x="30" y="230" width="60" height="40" fill="#e2e8f0" rx="4" />
                    <rect x="310" y="230" width="60" height="40" fill="#e2e8f0" rx="4" />
                  </svg>
                </div>
                
                {/* Hotel Marker */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative">
                    {/* Pulse */}
                    <div className="absolute inset-0 w-20 h-20 -m-5 bg-primary-500/20 rounded-full animate-ping" />
                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center shadow-lg relative z-10">
                      <span className="text-white font-bold text-lg">F</span>
                    </div>
                    {/* Pin */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-primary-500" />
                  </div>
                </motion.div>

                {/* Nearby markers */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-accent-500 rounded-full shadow" />
                <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary-400 rounded-full shadow" />
                <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-secondary-400 rounded-full shadow" />
              </div>

              {/* Map overlay with hotel info */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-secondary-900/90 to-transparent p-6">
                <p className="text-white font-display text-lg">FOBBS Apartment and Suite</p>
                <p className="text-secondary-300 text-sm">GRA Phase I, Asaba</p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-500/10 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function LocationIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  )
}

function ArrowRightIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  )
}
