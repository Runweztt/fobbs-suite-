/**
 * RoomCard Component
 * Reusable room card with hover effects
 */

import { motion } from 'framer-motion'
import { roomAmenities } from '../utils/roomsData'

export default function RoomCard({ room, variant = 'default', onViewDetails }) {
  const discount = room.originalPrice 
    ? Math.round((1 - room.price / room.originalPrice) * 100) 
    : 0

  const handleClick = () => {
    if (onViewDetails) {
      onViewDetails(room)
    }
  }

  if (variant === 'compact') {
    return (
      <motion.article
        whileHover={{ y: -4 }}
        className="group bg-surface rounded-xl overflow-hidden border border-border hover:border-primary-200 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
            <img
              src={room.images[0]}
              alt={room.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {!room.available && (
              <div className="absolute inset-0 bg-secondary-900/70 flex items-center justify-center">
                <span className="text-white font-medium">Fully Booked</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start gap-2 mb-2">
              <h3 className="font-display font-semibold group-hover:text-primary-500 transition-colors">
                {room.name}
              </h3>
              <div className="text-right flex-shrink-0">
                <span className="text-lg font-semibold">${room.price}</span>
                <span className="text-text-muted text-sm">/night</span>
              </div>
            </div>
            <p className="text-text-secondary text-sm mb-3 line-clamp-2">
              {room.shortDescription}
            </p>
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span>{room.size}m²</span>
              <span>{room.maxGuests} Guests</span>
              <span>{room.beds}</span>
            </div>
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="group bg-surface rounded-2xl overflow-hidden border border-border shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/70 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {room.featured && (
            <span className="px-2.5 py-1 bg-accent-500 text-secondary-950 text-xs font-semibold rounded-full">
              Featured
            </span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
              {discount}% Off
            </span>
          )}
        </div>

        {/* Price */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 text-right">
          {room.originalPrice > room.price && (
            <span className="text-text-muted text-xs line-through block">
              ${room.originalPrice}
            </span>
          )}
          <span className="text-secondary-900 font-bold text-lg">${room.price}</span>
          <span className="text-text-muted text-xs">/night</span>
        </div>

        {/* Unavailable Overlay */}
        {!room.available && (
          <div className="absolute inset-0 bg-secondary-900/80 flex items-center justify-center">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white font-medium border border-white/20">
              Fully Booked
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <span className="text-primary-500 text-xs font-medium uppercase tracking-wide">
          {room.category}
        </span>

        {/* Title */}
        <h3 className="text-xl font-display font-semibold mt-1 mb-2 group-hover:text-primary-500 transition-colors">
          {room.name}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {room.shortDescription}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted mb-4">
          <span className="flex items-center gap-1.5">
            <SizeIcon className="w-4 h-4" />
            {room.size}m²
          </span>
          <span className="flex items-center gap-1.5">
            <GuestsIcon className="w-4 h-4" />
            {room.maxGuests} Guests
          </span>
          <span className="flex items-center gap-1.5">
            <BedIcon className="w-4 h-4" />
            {room.beds}
          </span>
        </div>

        {/* Amenities Preview */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {room.amenities.slice(0, 4).map((amenityKey) => (
            <span
              key={amenityKey}
              className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md"
            >
              {roomAmenities[amenityKey]?.label || amenityKey}
            </span>
          ))}
          {room.amenities.length > 4 && (
            <span className="px-2 py-1 bg-neutral-100 text-text-muted text-xs rounded-md">
              +{room.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
            disabled={!room.available}
            className="flex-1 btn btn-primary py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {room.available ? 'Book Now' : 'Unavailable'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="px-4 py-2.5 border border-border rounded-lg hover:border-primary-500 hover:text-primary-500 transition-colors"
            aria-label="View room details"
          >
            <ArrowIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}

// Icons
function SizeIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 0v12h12V4H4z" />
    </svg>
  )
}

function GuestsIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
    </svg>
  )
}

function BedIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.5 4a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM4 12v3h12v-3H4z" />
    </svg>
  )
}

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  )
}
