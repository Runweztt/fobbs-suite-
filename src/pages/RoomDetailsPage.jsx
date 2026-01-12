/**
 * Room Details Page
 * Full room information with image gallery and booking CTA
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'
import { getRoomBySlug, roomAmenities as amenityData } from '../utils/roomsData'

export default function RoomDetailsPage({ slug, onBack, onBook }) {
  const room = getRoomBySlug(slug)
  const [activeImage, setActiveImage] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)

  if (!room) {
    return (
      <MainLayout pageKey="room-not-found">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display mb-4">Room Not Found</h1>
            <button onClick={onBack} className="btn btn-primary">
              Back to Rooms
            </button>
          </div>
        </div>
      </MainLayout>
    )
  }

  const discount = room.originalPrice 
    ? Math.round((1 - room.price / room.originalPrice) * 100) 
    : 0

  return (
    <MainLayout pageKey={`room-${room.id}`}>
      {/* Breadcrumb */}
      <div className="bg-surface-dim border-b border-border">
        <div className="container-app py-4">
          <nav className="flex items-center gap-2 text-sm">
            <button onClick={onBack} className="text-text-muted hover:text-primary-500">
              Rooms
            </button>
            <ChevronRightIcon className="w-4 h-4 text-text-muted" />
            <span className="text-text font-medium">{room.name}</span>
          </nav>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="bg-secondary-950">
        <div className="container-app py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Image */}
            <motion.div
              layoutId={`room-image-${room.id}`}
              className="lg:col-span-2 relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setShowGallery(true)}
            >
              <img
                src={room.images[activeImage]}
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View Gallery
              </div>
            </motion.div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-4">
              {room.images.slice(0, 3).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-[16/10] lg:aspect-[16/9] rounded-lg overflow-hidden transition-all ${
                    activeImage === i ? 'ring-2 ring-primary-500' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${room.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              {room.images.length > 3 && (
                <button
                  onClick={() => setShowGallery(true)}
                  className="hidden lg:flex aspect-[16/9] rounded-lg bg-secondary-800 items-center justify-center text-white hover:bg-secondary-700 transition-colors"
                >
                  +{room.images.length - 3} more
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-md">
        <div className="container-app">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full capitalize">
                    {room.category}
                  </span>
                  {room.featured && (
                    <span className="px-3 py-1 bg-accent-100 text-accent-700 text-sm font-medium rounded-full">
                      Featured
                    </span>
                  )}
                  {!room.available && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                      Sold Out
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display mb-4">
                  {room.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-text-secondary">
                  <span className="flex items-center gap-2">
                    <SizeIcon className="w-5 h-5" />
                    {room.size}m²
                  </span>
                  <span className="flex items-center gap-2">
                    <GuestsIcon className="w-5 h-5" />
                    Up to {room.maxGuests} guests
                  </span>
                  <span className="flex items-center gap-2">
                    <BedIcon className="w-5 h-5" />
                    {room.beds}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-display font-semibold mb-4">About This Room</h2>
                <p className="text-text-secondary leading-relaxed">{room.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-display font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.amenities.map((key) => {
                    const amenity = amenityData[key]
                    return (
                      <div
                        key={key}
                        className="flex items-center gap-3 p-3 bg-surface-dim rounded-lg"
                      >
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <CheckIcon className="w-5 h-5 text-primary-600" />
                        </div>
                        <span className="text-sm font-medium">
                          {amenity?.label || key}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Policies */}
              <div>
                <h2 className="text-xl font-display font-semibold mb-4">Room Policies</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-surface-dim rounded-lg">
                    <h4 className="font-medium mb-2">Check-in / Check-out</h4>
                    <p className="text-sm text-text-secondary">
                      Check-in: 3:00 PM<br />
                      Check-out: 11:00 AM
                    </p>
                  </div>
                  <div className="p-4 bg-surface-dim rounded-lg">
                    <h4 className="font-medium mb-2">Cancellation</h4>
                    <p className="text-sm text-text-secondary">
                      Free cancellation up to 48 hours before check-in.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-surface border border-border rounded-2xl p-6 shadow-lg">
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold">${room.price}</span>
                    <span className="text-text-muted">/night</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-text-muted line-through">${room.originalPrice}</span>
                      <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-sm font-medium rounded">
                        {discount}% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* Booking Form */}
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check In</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Check Out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="input"
                    >
                      {[...Array(room.maxGuests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} Guest{i > 0 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={!room.available}
                    className="w-full btn btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {room.available ? 'Reserve Now' : 'Not Available'}
                  </motion.button>
                </form>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm text-text-muted">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-primary-500" />
                    Free cancellation within 48 hours
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-primary-500" />
                    Best price guarantee
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-primary-500" />
                    Instant confirmation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-secondary-950/95 flex items-center justify-center"
            onClick={() => setShowGallery(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <CloseIcon className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setActiveImage((prev) => (prev - 1 + room.images.length) % room.images.length)
              }}
              className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setActiveImage((prev) => (prev + 1) % room.images.length)
              }}
              className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.img
              key={activeImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={room.images[activeImage]}
              alt={`${room.name} view ${activeImage + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
              {activeImage + 1} / {room.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  )
}

// Icons
function ChevronRightIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function ChevronLeftIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

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

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  )
}
