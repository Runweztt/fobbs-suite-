/**
 * Featured Rooms Section
 * Showcase of room types with hover effects
 */

import { motion } from 'framer-motion'
import roomRedSide from '../assets/rooms/room-red-side.jpg'
import roomRedHeadboard from '../assets/rooms/room-red-headboard.jpg'
import roomOrangeHeadboard from '../assets/rooms/room-orange-headboard.jpg'

const rooms = [
  {
    id: 1,
    name: 'Deluxe Suite',
    description: 'Spacious suite with panoramic river views and premium amenities for the discerning traveler.',
    price: 299,
    size: '45m²',
    guests: 2,
    features: ['River View', 'King Bed', 'Smart TV', 'Mini Bar'],
    image: roomRedSide,
  },
  {
    id: 2,
    name: 'Executive Room',
    description: 'Modern comfort meets productivity with dedicated workspace and city views.',
    price: 199,
    size: '35m²',
    guests: 2,
    features: ['City View', 'Work Desk', 'Queen Bed', 'Coffee Machine'],
    image: roomRedHeadboard,
  },
  {
    id: 3,
    name: 'Presidential Suite',
    description: 'Ultimate luxury with private terrace, butler service, and exclusive amenities.',
    price: 599,
    size: '120m²',
    guests: 4,
    features: ['Private Terrace', 'Butler Service', 'Jacuzzi', 'Living Room'],
    image: roomOrangeHeadboard,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] },
  },
}

export default function FeaturedRooms() {
  return (
    <section className="section-lg bg-surface-dim">
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
            Accommodations
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display mb-4">
            Featured <span className="text-gradient-primary">Suites</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Each suite is designed with futuristic elegance and equipped with cutting-edge amenities 
            for an unforgettable stay.
          </p>
        </motion.div>

        {/* Room Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {rooms.map((room) => (
            <motion.article
              key={room.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group bg-surface rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/60 to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <span className="text-secondary-900 font-semibold">${room.price}</span>
                  <span className="text-text-muted text-sm">/night</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary-500 transition-colors">
                  {room.name}
                </h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                  <span className="flex items-center gap-1">
                    <SizeIcon className="w-4 h-4" />
                    {room.size}
                  </span>
                  <span className="flex items-center gap-1">
                    <GuestIcon className="w-4 h-4" />
                    {room.guests} Guests
                  </span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.features.slice(0, 3).map((feature, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn btn-secondary py-2.5"
                >
                  View Details
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary px-8"
          >
            View All Rooms
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

function SizeIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 0v12h12V4H4z" />
    </svg>
  )
}

function GuestIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
    </svg>
  )
}
