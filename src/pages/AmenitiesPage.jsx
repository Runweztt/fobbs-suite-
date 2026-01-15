/**
 * Amenities Page
 * Icon-based layout with motion-enhanced sections
 */

import { motion } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'

const amenityCategories = [
  {
    title: 'Wellness & Relaxation',
    description: 'Rejuvenate your body and mind with our world-class wellness facilities.',
    items: [
      {
        icon: PoolIcon,
        name: 'Infinity Pool',
        description: 'Rooftop infinity pool with panoramic city views, heated year-round.',
        hours: 'Open 6:00 AM - 10:00 PM',
      },
      {
        icon: SpaIcon,
        name: 'Luxury Spa',
        description: 'Full-service spa offering massages, facials, body treatments, and aromatherapy.',
        hours: 'Open 9:00 AM - 9:00 PM',
      },
      {
        icon: SaunaIcon,
        name: 'Sauna & Steam',
        description: 'Traditional Finnish sauna and steam room for ultimate relaxation.',
        hours: 'Open 6:00 AM - 10:00 PM',
      },
      {
        icon: GymIcon,
        name: 'Fitness Center',
        description: 'State-of-the-art equipment, personal trainers, and yoga classes available.',
        hours: 'Open 24/7',
      },
    ],
  },
  {
    title: 'Dining & Drinks',
    description: 'Savor exceptional cuisine and handcrafted beverages.',
    items: [
      {
        icon: DiningIcon,
        name: 'The FOBBS Restaurant',
        description: 'Award-winning fine dining featuring local and international cuisine with river views.',
        hours: 'Breakfast: 6:30 AM - 10:30 AM | Dinner: 6:00 PM - 11:00 PM',
      },
      {
        icon: BarIcon,
        name: 'Skyline Lounge',
        description: 'Rooftop bar with craft cocktails, premium wines, and stunning sunset views.',
        hours: 'Open 5:00 PM - 1:00 AM',
      },
      {
        icon: CafeIcon,
        name: 'The Brew Café',
        description: 'Artisan coffee, fresh pastries, and light bites in a cozy setting.',
        hours: 'Open 7:00 AM - 7:00 PM',
      },
      {
        icon: RoomServiceIcon,
        name: '24/7 Room Service',
        description: 'Gourmet dining delivered to your room any time of day or night.',
        hours: 'Available 24/7',
      },
    ],
  },
  {
    title: 'Business & Events',
    description: 'Professional facilities for meetings, conferences, and special occasions.',
    items: [
      {
        icon: ConferenceIcon,
        name: 'Conference Center',
        description: 'Three fully-equipped meeting rooms with AV technology and catering services.',
        hours: 'Available upon request',
      },
      {
        icon: BusinessIcon,
        name: 'Business Lounge',
        description: 'Private workspaces with high-speed WiFi, printing, and secretarial services.',
        hours: 'Open 24/7',
      },
      {
        icon: EventIcon,
        name: 'Grand Ballroom',
        description: 'Elegant venue for weddings, galas, and corporate events up to 300 guests.',
        hours: 'Available upon request',
      },
    ],
  },
  {
    title: 'Guest Services',
    description: 'Everything you need for a seamless, memorable stay.',
    items: [
      {
        icon: ConciergeIcon,
        name: 'Concierge',
        description: 'Expert local recommendations, reservations, and personalized arrangements.',
        hours: 'Available 24/7',
      },
      {
        icon: ValetIcon,
        name: 'Valet Parking',
        description: 'Complimentary valet parking with secure underground garage.',
        hours: 'Available 24/7',
      },
      {
        icon: TransferIcon,
        name: 'Airport Transfers',
        description: 'Luxury car service to and from Entebbe International Airport.',
        hours: 'Reservations required',
      },
      {
        icon: LaundryIcon,
        name: 'Laundry & Dry Cleaning',
        description: 'Same-day laundry and dry cleaning services available.',
        hours: 'Collection before 10:00 AM',
      },
    ],
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function AmenitiesPage() {
  return (
    <MainLayout pageKey="amenities">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-secondary-900 via-secondary-950 to-secondary-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="container-app relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary-400 text-sm font-medium uppercase tracking-wider mb-4 block">
              World-Class Facilities
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
              Premium <span className="text-gradient-gold">Amenities</span>
            </h1>
            <p className="text-secondary-300 text-lg leading-relaxed">
              Every detail has been thoughtfully designed to elevate your stay. 
              From wellness to dining, discover amenities that define luxury hospitality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Amenity Categories */}
      {amenityCategories.map((category, catIndex) => (
        <section
          key={category.title}
          className={`section-lg ${catIndex % 2 === 0 ? 'bg-surface' : 'bg-surface-dim'}`}
        >
          <div className="container-app">
            {/* Category Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display mb-4">
                {category.title}
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                {category.description}
              </p>
            </motion.div>

            {/* Amenity Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {category.items.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group p-6 bg-surface rounded-2xl border border-border hover:border-primary-200 hover:shadow-xl transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-display font-semibold mb-2">
                    {item.name}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-xs text-primary-600 font-medium">
                    {item.hours}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="container-app text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
              Ready to Experience It All?
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Book your stay and enjoy full access to all our premium amenities.
            </p>
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block btn bg-white text-primary-600 hover:bg-primary-50 px-8 py-3"
            >
              Book Your Stay
            </motion.a>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  )
}

// Icons
function PoolIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M2 12h20M2 12c0 4.418 4.477 8 10 8s10-3.582 10-8M2 12c0-4.418 4.477-8 10-8s10 3.582 10 8" />
    </svg>
  )
}

function SpaIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 2a10 10 0 110 20 10 10 0 010-20z" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function SaunaIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M8 4v4M12 4v4M16 4v4M4 12h16M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" />
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

function DiningIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <path d="M6 1v3M10 1v3M14 1v3" />
    </svg>
  )
}

function BarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M8 22h8M12 11v11M5 2l7 9 7-9" />
    </svg>
  )
}

function CafeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M17 8h1a4 4 0 110 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
    </svg>
  )
}

function RoomServiceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M2 18h20M12 6v6M4 18c0-4.418 3.582-8 8-8s8 3.582 8 8" />
    </svg>
  )
}

function ConferenceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

function BusinessIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  )
}

function EventIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function ConciergeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M18.36 6.64A9 9 0 115.64 18.36 9 9 0 0118.36 6.64z" />
      <path d="M12 2v4M2 12h4M20 12h2M12 20v2" />
    </svg>
  )
}

function ValetIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M19 17h2a2 2 0 002-2v-3a2 2 0 00-1-1.73l-1.26-2.52A2 2 0 0019 6H5a2 2 0 00-1.73 1L2 9.5a2 2 0 00-1 1.73V15a2 2 0 002 2h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}

function TransferIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  )
}

function LaundryIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <circle cx="12" cy="12" r="4" />
      <path d="M6 8h.01M10 8h.01" />
    </svg>
  )
}
