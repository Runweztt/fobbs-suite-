/**
 * Booking Widget
 * Quick booking form with date pickers
 */

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('2')
  const [roomType, setRoomType] = useState('deluxe')

  return (
    <section className="relative -mt-20 z-20 pb-10">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
            <h3 className="text-white font-display text-lg font-medium">
              Book Your Stay
            </h3>
          </div>

          {/* Form */}
          <form className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Check In */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Check In
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="input"
                  required
                />
              </div>

              {/* Check Out */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Check Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="input"
                  required
                />
              </div>

              {/* Guests */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="input"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </div>

              {/* Room Type */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Room Type
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="input"
                >
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe Suite</option>
                  <option value="executive">Executive</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>

              {/* Submit */}
              <div className="lg:col-span-1 flex items-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn btn-primary w-full py-3"
                >
                  Check Availability
                </motion.button>
              </div>
            </div>

            {/* Quick info */}
            <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-primary-500" />
                Free cancellation
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-primary-500" />
                Best price guarantee
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-primary-500" />
                No hidden fees
              </span>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}
