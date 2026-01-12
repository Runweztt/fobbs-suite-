/**
 * Booking Page
 * Multi-step booking flow with sidebar summary
 */

import { AnimatePresence, motion } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'
import { BookingProvider, useBooking } from '../context/BookingContext'
import DateGuestStep from '../components/booking/DateGuestStep'
import RoomSelectStep from '../components/booking/RoomSelectStep'
import GuestInfoStep from '../components/booking/GuestInfoStep'
import ConfirmationStep from '../components/booking/ConfirmationStep'
import BookingSummary from '../components/booking/BookingSummary'

const steps = [
  { id: 1, title: 'Dates & Guests', shortTitle: 'Dates' },
  { id: 2, title: 'Select Room', shortTitle: 'Room' },
  { id: 3, title: 'Your Details', shortTitle: 'Details' },
  { id: 4, title: 'Confirmation', shortTitle: 'Confirm' },
]

function BookingFlow({ onBack }) {
  const { state, actions, computed } = useBooking()
  
  const handleContinue = async () => {
    if (state.currentStep === 4 && state.status !== 'confirmed') {
      await actions.confirmBooking()
    } else if (computed.canProceed()) {
      actions.nextStep()
    }
  }
  
  const handleBack = () => {
    if (state.currentStep === 1) {
      onBack?.()
    } else {
      actions.prevStep()
    }
  }
  
  const canGoBack = state.currentStep > 1 && state.status !== 'confirmed'
  
  // Render current step
  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <DateGuestStep />
      case 2:
        return <RoomSelectStep />
      case 3:
        return <GuestInfoStep />
      case 4:
        return <ConfirmationStep />
      default:
        return null
    }
  }
  
  return (
    <MainLayout pageKey="booking">
      {/* Header */}
      <section className="bg-secondary-950 py-8">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-display text-white mb-2">
              {state.status === 'confirmed' ? 'Booking Complete' : 'Book Your Stay'}
            </h1>
            <p className="text-secondary-300">
              {state.status === 'confirmed' 
                ? 'Thank you for choosing Riverside Suites'
                : 'Complete your reservation in just a few steps'
              }
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Progress Steps */}
      {state.status !== 'confirmed' && (
        <section className="bg-surface border-b border-border sticky top-16 md:top-20 z-20">
          <div className="container-app py-4">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {steps.map((step, index) => {
                const isActive = step.id === state.currentStep
                const isCompleted = step.id < state.currentStep
                const isLast = index === steps.length - 1
                
                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary-500 text-white'
                            : isCompleted
                            ? 'bg-primary-100 text-primary-600'
                            : 'bg-neutral-100 text-text-muted'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckIcon className="w-4 h-4" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <span className={`mt-1 text-xs hidden sm:block ${
                        isActive ? 'text-primary-600 font-medium' : 'text-text-muted'
                      }`}>
                        {step.shortTitle}
                      </span>
                    </div>
                    
                    {!isLast && (
                      <div
                        className={`flex-1 h-0.5 mx-2 transition-colors ${
                          isCompleted ? 'bg-primary-200' : 'bg-neutral-200'
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
      
      {/* Content */}
      <section className="section-md bg-surface-dim">
        <div className="container-app">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-surface rounded-2xl border border-border p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {renderStep()}
                </AnimatePresence>
                
                {/* Navigation */}
                {state.status !== 'confirmed' && (
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                    {canGoBack ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBack}
                        className="btn btn-secondary"
                      >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        Back
                      </motion.button>
                    ) : (
                      <div />
                    )}
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleContinue}
                      disabled={!computed.canProceed() || state.isLoading}
                      className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {state.isLoading ? (
                        <span className="flex items-center">
                          <LoadingSpinner className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </span>
                      ) : state.currentStep === 4 ? (
                        'Confirm Booking'
                      ) : (
                        <>
                          Continue
                          <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </motion.button>
                  </div>
                )}
                
                {/* After confirmation - New booking button */}
                {state.status === 'confirmed' && (
                  <div className="mt-8 pt-6 border-t border-border text-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        actions.resetBooking()
                        onBack?.()
                      }}
                      className="btn btn-primary"
                    >
                      Book Another Stay
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-40">
                <BookingSummary 
                  onConfirm={handleContinue}
                  showConfirmButton={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

// Wrapped with Provider
export default function BookingPage({ onBack }) {
  return (
    <BookingProvider>
      <BookingFlow onBack={onBack} />
    </BookingProvider>
  )
}

// Icons
function CheckIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
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

function LoadingSpinner(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="10" strokeWidth="4" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
