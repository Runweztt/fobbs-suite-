/**
 * DateGuestStep Component
 * Step 1: Date selection and guest count
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useBooking } from '../../context/BookingContext'
import { 
  getMinCheckInDate, 
  getMinCheckOutDate, 
  validateDates,
  calculateNights 
} from '../../utils/bookingUtils'

export default function DateGuestStep() {
  const { state, actions } = useBooking()
  const [localErrors, setLocalErrors] = useState({})
  
  const handleCheckInChange = (e) => {
    const checkIn = e.target.value
    actions.setDates(checkIn, state.checkOut)
    
    // Auto-adjust checkout if needed
    if (state.checkOut && new Date(state.checkOut) <= new Date(checkIn)) {
      const nextDay = new Date(checkIn)
      nextDay.setDate(nextDay.getDate() + 1)
      actions.setDates(checkIn, nextDay.toISOString().split('T')[0])
    }
  }
  
  const handleCheckOutChange = (e) => {
    actions.setDates(state.checkIn, e.target.value)
  }
  
  const handleGuestChange = (type, delta) => {
    const current = state.guests[type]
    const newValue = Math.max(type === 'adults' ? 1 : 0, current + delta)
    const maxGuests = state.selectedRoom?.maxGuests || 10
    const totalAfter = type === 'adults' 
      ? newValue + state.guests.children 
      : state.guests.adults + newValue
    
    if (totalAfter <= maxGuests) {
      actions.setGuests({ [type]: newValue })
    }
  }
  
  // Validate on change
  useEffect(() => {
    if (state.checkIn || state.checkOut) {
      const { errors } = validateDates(state.checkIn, state.checkOut)
      setLocalErrors(errors)
    }
  }, [state.checkIn, state.checkOut])
  
  const nights = calculateNights(state.checkIn, state.checkOut)
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-display font-semibold mb-2">
          Select Your Dates
        </h2>
        <p className="text-text-secondary">
          Choose your check-in and check-out dates to see availability.
        </p>
      </div>
      
      {/* Date Selection */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Check-in Date
          </label>
          <input
            type="date"
            value={state.checkIn || ''}
            onChange={handleCheckInChange}
            min={getMinCheckInDate()}
            className={`input ${localErrors.checkIn ? 'border-error' : ''}`}
          />
          {localErrors.checkIn && (
            <p className="mt-1 text-sm text-error">{localErrors.checkIn}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Check-out Date
          </label>
          <input
            type="date"
            value={state.checkOut || ''}
            onChange={handleCheckOutChange}
            min={getMinCheckOutDate(state.checkIn)}
            className={`input ${localErrors.checkOut ? 'border-error' : ''}`}
          />
          {localErrors.checkOut && (
            <p className="mt-1 text-sm text-error">{localErrors.checkOut}</p>
          )}
        </div>
      </div>
      
      {/* Nights Counter */}
      {nights > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-primary-50 rounded-xl border border-primary-200"
        >
          <div className="flex items-center justify-center gap-2">
            <MoonIcon className="w-5 h-5 text-primary-600" />
            <span className="font-medium text-primary-700">
              {nights} {nights === 1 ? 'Night' : 'Nights'}
            </span>
          </div>
        </motion.div>
      )}
      
      {/* Guest Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Number of Guests</h3>
        
        <div className="space-y-4">
          {/* Adults */}
          <div className="flex items-center justify-between p-4 bg-surface-dim rounded-xl">
            <div>
              <p className="font-medium">Adults</p>
              <p className="text-sm text-text-muted">Age 18+</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => handleGuestChange('adults', -1)}
                disabled={state.guests.adults <= 1}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold text-lg">
                {state.guests.adults}
              </span>
              <button
                type="button"
                onClick={() => handleGuestChange('adults', 1)}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-surface transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Children */}
          <div className="flex items-center justify-between p-4 bg-surface-dim rounded-xl">
            <div>
              <p className="font-medium">Children</p>
              <p className="text-sm text-text-muted">Age 0-17</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => handleGuestChange('children', -1)}
                disabled={state.guests.children <= 0}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold text-lg">
                {state.guests.children}
              </span>
              <button
                type="button"
                onClick={() => handleGuestChange('children', 1)}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-surface transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-sm text-text-muted">
          Total: {state.guests.adults + state.guests.children} guest{state.guests.adults + state.guests.children !== 1 ? 's' : ''}
        </p>
      </div>
    </motion.div>
  )
}

// Icons
function MoonIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  )
}

function MinusIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  )
}

function PlusIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
  )
}
