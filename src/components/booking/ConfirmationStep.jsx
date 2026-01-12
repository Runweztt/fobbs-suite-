/**
 * ConfirmationStep Component
 * Step 4: Review and confirm booking
 */

import { motion } from 'framer-motion'
import { useBooking } from '../../context/BookingContext'
import { formatCurrency, formatDate } from '../../utils/bookingUtils'
import { roomAmenities } from '../../utils/roomsData'

export default function ConfirmationStep() {
  const { state } = useBooking()
  
  // If confirmed, show success
  if (state.status === 'confirmed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckIcon className="w-10 h-10 text-white" />
        </motion.div>
        
        <h2 className="text-3xl font-display font-semibold mb-3">
          Booking Confirmed!
        </h2>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Your reservation has been successfully confirmed. A confirmation email 
          has been sent to {state.guestInfo.email}.
        </p>
        
        <div className="bg-primary-50 rounded-xl p-6 max-w-sm mx-auto mb-8">
          <p className="text-sm text-text-secondary mb-2">Booking Reference</p>
          <p className="text-2xl font-mono font-bold text-primary-600">
            {state.bookingId}
          </p>
        </div>
        
        <div className="space-y-4 max-w-md mx-auto text-left">
          <div className="p-4 bg-surface-dim rounded-lg">
            <h4 className="font-semibold mb-2">What's Next?</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>Check your email for confirmation details</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>Save your booking reference for check-in</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>Contact us if you need to modify your reservation</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    )
  }
  
  // Review before confirmation
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-display font-semibold mb-2">
          Review Your Booking
        </h2>
        <p className="text-text-secondary">
          Please review your reservation details before confirming.
        </p>
      </div>
      
      {/* Room Details */}
      <div className="bg-surface-dim rounded-xl p-4">
        <div className="flex gap-4">
          <div className="w-28 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={state.selectedRoom?.images[0]}
              alt={state.selectedRoom?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-xs text-primary-500 uppercase font-medium">
              {state.selectedRoom?.category}
            </span>
            <h3 className="font-semibold">{state.selectedRoom?.name}</h3>
            <div className="flex items-center gap-3 mt-1 text-sm text-text-secondary">
              <span>{state.selectedRoom?.size}m²</span>
              <span>•</span>
              <span>{state.selectedRoom?.beds}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stay Details */}
      <div>
        <h3 className="font-semibold mb-4">Stay Details</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-surface-dim rounded-lg">
            <p className="text-sm text-text-muted mb-1">Check-in</p>
            <p className="font-medium">{formatDate(state.checkIn)}</p>
            <p className="text-sm text-text-muted">From 3:00 PM</p>
          </div>
          <div className="p-4 bg-surface-dim rounded-lg">
            <p className="text-sm text-text-muted mb-1">Check-out</p>
            <p className="font-medium">{formatDate(state.checkOut)}</p>
            <p className="text-sm text-text-muted">Until 11:00 AM</p>
          </div>
        </div>
      </div>
      
      {/* Guest Info */}
      <div>
        <h3 className="font-semibold mb-4">Guest Information</h3>
        <div className="p-4 bg-surface-dim rounded-lg space-y-2">
          <p>
            <span className="text-text-muted">Name: </span>
            <span className="font-medium">
              {state.guestInfo.firstName} {state.guestInfo.lastName}
            </span>
          </p>
          <p>
            <span className="text-text-muted">Email: </span>
            <span className="font-medium">{state.guestInfo.email}</span>
          </p>
          <p>
            <span className="text-text-muted">Phone: </span>
            <span className="font-medium">{state.guestInfo.phone}</span>
          </p>
          <p>
            <span className="text-text-muted">Guests: </span>
            <span className="font-medium">
              {state.guests.adults} Adult{state.guests.adults !== 1 ? 's' : ''}
              {state.guests.children > 0 && `, ${state.guests.children} Child${state.guests.children !== 1 ? 'ren' : ''}`}
            </span>
          </p>
          {state.guestInfo.specialRequests && (
            <p>
              <span className="text-text-muted">Special Requests: </span>
              <span className="font-medium">{state.guestInfo.specialRequests}</span>
            </p>
          )}
        </div>
      </div>
      
      {/* Extras */}
      {state.extras.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4">Add-ons</h3>
          <div className="space-y-2">
            {state.extras.map((extra) => (
              <div
                key={extra.id}
                className="flex justify-between items-center p-3 bg-surface-dim rounded-lg"
              >
                <span>{extra.name}</span>
                <span className="font-medium">
                  {formatCurrency(
                    extra.priceType === 'per-night'
                      ? extra.pricePerNight * state.pricing.nights
                      : extra.pricePerNight
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Policies */}
      <div className="p-4 bg-accent-50 border border-accent-200 rounded-lg">
        <h4 className="font-semibold text-accent-800 mb-2">
          Cancellation Policy
        </h4>
        <p className="text-sm text-accent-700">
          Free cancellation up to 48 hours before check-in. After that, 
          50% of the total amount will be charged.
        </p>
      </div>
      
      {/* Terms */}
      <div className="text-sm text-text-muted">
        By confirming this booking, you agree to our{' '}
        <a href="#" className="text-primary-500 hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="text-primary-500 hover:underline">Privacy Policy</a>.
      </div>
    </motion.div>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}
