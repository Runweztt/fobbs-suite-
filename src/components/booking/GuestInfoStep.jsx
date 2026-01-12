/**
 * GuestInfoStep Component
 * Step 3: Guest information and extras
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useBooking } from '../../context/BookingContext'
import { availableExtras, validateGuestInfo, formatCurrency } from '../../utils/bookingUtils'

export default function GuestInfoStep() {
  const { state, actions } = useBooking()
  const [errors, setErrors] = useState({})
  
  const handleInputChange = (field, value) => {
    actions.setGuestInfo({ [field]: value })
    
    // Clear error on change
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }
  
  const handleBlur = (field) => {
    const { errors: validationErrors } = validateGuestInfo(state.guestInfo)
    if (validationErrors[field]) {
      setErrors(prev => ({ ...prev, [field]: validationErrors[field] }))
    }
  }
  
  const handleExtraToggle = (extra) => {
    const isSelected = state.extras.some(e => e.id === extra.id)
    if (isSelected) {
      actions.removeExtra(extra.id)
    } else {
      actions.addExtra(extra)
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      {/* Guest Information */}
      <div>
        <h2 className="text-2xl font-display font-semibold mb-2">
          Guest Information
        </h2>
        <p className="text-text-secondary mb-6">
          Please provide your details for the reservation.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              First Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              value={state.guestInfo.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              onBlur={() => handleBlur('firstName')}
              placeholder="John"
              className={`input ${errors.firstName ? 'border-error' : ''}`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-error">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Last Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              value={state.guestInfo.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              onBlur={() => handleBlur('lastName')}
              placeholder="Doe"
              className={`input ${errors.lastName ? 'border-error' : ''}`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-error">{errors.lastName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address <span className="text-error">*</span>
            </label>
            <input
              type="email"
              value={state.guestInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="john@example.com"
              className={`input ${errors.email ? 'border-error' : ''}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-error">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number <span className="text-error">*</span>
            </label>
            <input
              type="tel"
              value={state.guestInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              placeholder="+1 (555) 123-4567"
              className={`input ${errors.phone ? 'border-error' : ''}`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-error">{errors.phone}</p>
            )}
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Special Requests
            </label>
            <textarea
              value={state.guestInfo.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              placeholder="Any special requirements or preferences..."
              rows={3}
              className="input resize-none"
            />
          </div>
        </div>
      </div>
      
      {/* Extras */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Enhance Your Stay
        </h3>
        
        <div className="space-y-3">
          {availableExtras.map((extra) => {
            const isSelected = state.extras.some(e => e.id === extra.id)
            const price = extra.priceType === 'per-night'
              ? extra.pricePerNight * state.pricing.nights
              : extra.pricePerNight
            
            return (
              <motion.div
                key={extra.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleExtraToggle(extra)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50/50'
                    : 'border-border hover:border-primary-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-primary-500 border-primary-500'
                        : 'border-neutral-300'
                    }`}>
                      {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <p className="font-medium">{extra.name}</p>
                      <p className="text-sm text-text-muted">{extra.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(price)}</p>
                    {extra.priceType === 'per-night' && (
                      <p className="text-xs text-text-muted">
                        {formatCurrency(extra.pricePerNight)}/night
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
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
