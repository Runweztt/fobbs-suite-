/**
 * BookingSummary Component
 * Sidebar with booking details and pricing
 */

import { motion } from 'framer-motion'
import { useBooking } from '../../context/BookingContext'
import { formatCurrency, formatDate } from '../../utils/bookingUtils'

export default function BookingSummary({ onConfirm, showConfirmButton = true }) {
  const { state, computed } = useBooking()
  
  const hasRoom = state.selectedRoom !== null
  const hasDates = state.checkIn && state.checkOut
  
  if (!hasDates) {
    return (
      <div className="bg-surface border border-border rounded-2xl p-6">
        <div className="text-center py-8">
          <CalendarIcon className="w-12 h-12 text-text-muted mx-auto mb-3" />
          <p className="text-text-secondary">
            Select dates to see pricing
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface border border-border rounded-2xl overflow-hidden"
    >
      {/* Room Preview */}
      {hasRoom && (
        <div className="relative h-40">
          <img
            src={state.selectedRoom.images[0]}
            alt={state.selectedRoom.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-xs text-primary-300 uppercase font-medium">
              {state.selectedRoom.category}
            </p>
            <h4 className="text-white font-display font-semibold">
              {state.selectedRoom.name}
            </h4>
          </div>
        </div>
      )}
      
      <div className="p-6 space-y-6">
        {/* Dates & Guests */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary text-sm">Check-in</span>
            <span className="font-medium">{formatDate(state.checkIn)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary text-sm">Check-out</span>
            <span className="font-medium">{formatDate(state.checkOut)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary text-sm">Guests</span>
            <span className="font-medium">
              {state.guests.adults} Adult{state.guests.adults !== 1 ? 's' : ''}
              {state.guests.children > 0 && `, ${state.guests.children} Child${state.guests.children !== 1 ? 'ren' : ''}`}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary text-sm">Duration</span>
            <span className="font-medium">
              {state.pricing.nights} Night{state.pricing.nights !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        
        {/* Price Breakdown */}
        {hasRoom && (
          <>
            <div className="border-t border-border pt-4 space-y-3">
              {/* Room Cost */}
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">
                  {formatCurrency(state.pricing.pricePerNight)} × {state.pricing.nights} nights
                </span>
                <span className="font-medium">
                  {formatCurrency(state.pricing.roomTotal)}
                </span>
              </div>
              
              {/* Extras */}
              {state.extras.length > 0 && (
                <div className="space-y-2">
                  {state.extras.map((extra) => {
                    const price = extra.priceType === 'per-night'
                      ? extra.pricePerNight * state.pricing.nights
                      : extra.pricePerNight
                    return (
                      <div key={extra.id} className="flex justify-between items-center">
                        <span className="text-text-secondary text-sm">
                          {extra.name}
                        </span>
                        <span className="font-medium">
                          {formatCurrency(price)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
              
              {/* Taxes & Fees */}
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Taxes (12%)</span>
                <span className="font-medium">{formatCurrency(state.pricing.taxes)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Service Fee (5%)</span>
                <span className="font-medium">{formatCurrency(state.pricing.serviceFee)}</span>
              </div>
            </div>
            
            {/* Total */}
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary-600">
                  {formatCurrency(state.pricing.total)}
                </span>
              </div>
              <p className="text-xs text-text-muted mt-1">
                Includes all taxes and fees
              </p>
            </div>
          </>
        )}
        
        {/* Confirm Button */}
        {showConfirmButton && hasRoom && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            disabled={!computed.canProceed() || state.isLoading}
            className="w-full btn btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.isLoading ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner className="w-5 h-5 animate-spin" />
                Processing...
              </span>
            ) : state.currentStep === 4 ? (
              'Confirm Booking'
            ) : (
              'Continue'
            )}
          </motion.button>
        )}
        
        {/* Trust Badges */}
        <div className="pt-4 border-t border-border space-y-2 text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-4 h-4 text-primary-500" />
            <span>Secure SSL encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-primary-500" />
            <span>Free cancellation within 48 hours</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Icons
function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
  )
}

function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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

function LoadingSpinner(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="10" strokeWidth="4" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
