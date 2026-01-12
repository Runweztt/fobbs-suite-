/**
 * Booking Context
 * Centralized state management for the booking flow
 */

import { createContext, useContext, useReducer, useMemo } from 'react'
import { getRoomById } from '../utils/roomsData'
import { calculateBookingPrice, formatDate } from '../utils/bookingUtils'

// Initial State
const initialState = {
  // Step tracking
  currentStep: 1,
  totalSteps: 4,
  
  // Booking details
  checkIn: null,
  checkOut: null,
  guests: {
    adults: 2,
    children: 0,
  },
  selectedRoom: null,
  
  // Guest information
  guestInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  },
  
  // Extras & add-ons
  extras: [],
  
  // Pricing (calculated)
  pricing: {
    roomTotal: 0,
    extrasTotal: 0,
    taxes: 0,
    serviceFee: 0,
    total: 0,
    nights: 0,
    pricePerNight: 0,
  },
  
  // Booking status
  bookingId: null,
  status: 'pending', // pending, confirmed, cancelled
  
  // UI state
  errors: {},
  isLoading: false,
}

// Action Types
const ACTIONS = {
  SET_DATES: 'SET_DATES',
  SET_GUESTS: 'SET_GUESTS',
  SET_ROOM: 'SET_ROOM',
  SET_GUEST_INFO: 'SET_GUEST_INFO',
  ADD_EXTRA: 'ADD_EXTRA',
  REMOVE_EXTRA: 'REMOVE_EXTRA',
  SET_STEP: 'SET_STEP',
  NEXT_STEP: 'NEXT_STEP',
  PREV_STEP: 'PREV_STEP',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_LOADING: 'SET_LOADING',
  CONFIRM_BOOKING: 'CONFIRM_BOOKING',
  RESET_BOOKING: 'RESET_BOOKING',
  UPDATE_PRICING: 'UPDATE_PRICING',
}

// Reducer
function bookingReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_DATES: {
      const { checkIn, checkOut } = action.payload
      const newState = { ...state, checkIn, checkOut }
      
      // Recalculate pricing if room is selected
      if (state.selectedRoom && checkIn && checkOut) {
        const pricing = calculateBookingPrice(
          state.selectedRoom,
          checkIn,
          checkOut,
          state.extras
        )
        newState.pricing = pricing
      }
      
      return newState
    }
    
    case ACTIONS.SET_GUESTS:
      return { ...state, guests: { ...state.guests, ...action.payload } }
    
    case ACTIONS.SET_ROOM: {
      const room = action.payload
      const newState = { ...state, selectedRoom: room }
      
      // Recalculate pricing
      if (room && state.checkIn && state.checkOut) {
        const pricing = calculateBookingPrice(
          room,
          state.checkIn,
          state.checkOut,
          state.extras
        )
        newState.pricing = pricing
      }
      
      return newState
    }
    
    case ACTIONS.SET_GUEST_INFO:
      return {
        ...state,
        guestInfo: { ...state.guestInfo, ...action.payload },
      }
    
    case ACTIONS.ADD_EXTRA: {
      const extras = [...state.extras, action.payload]
      const pricing = state.selectedRoom && state.checkIn && state.checkOut
        ? calculateBookingPrice(state.selectedRoom, state.checkIn, state.checkOut, extras)
        : state.pricing
      return { ...state, extras, pricing }
    }
    
    case ACTIONS.REMOVE_EXTRA: {
      const extras = state.extras.filter(e => e.id !== action.payload)
      const pricing = state.selectedRoom && state.checkIn && state.checkOut
        ? calculateBookingPrice(state.selectedRoom, state.checkIn, state.checkOut, extras)
        : state.pricing
      return { ...state, extras, pricing }
    }
    
    case ACTIONS.SET_STEP:
      return { ...state, currentStep: action.payload }
    
    case ACTIONS.NEXT_STEP:
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.totalSteps),
      }
    
    case ACTIONS.PREV_STEP:
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
      }
    
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [action.payload.field]: action.payload.message },
      }
    
    case ACTIONS.CLEAR_ERROR: {
      const errors = { ...state.errors }
      delete errors[action.payload]
      return { ...state, errors }
    }
    
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload }
    
    case ACTIONS.CONFIRM_BOOKING:
      return {
        ...state,
        bookingId: action.payload.bookingId,
        status: 'confirmed',
        isLoading: false,
      }
    
    case ACTIONS.RESET_BOOKING:
      return { ...initialState }
    
    case ACTIONS.UPDATE_PRICING:
      return { ...state, pricing: action.payload }
    
    default:
      return state
  }
}

// Context
const BookingContext = createContext(null)

// Provider
export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)
  
  // Actions
  const actions = useMemo(() => ({
    setDates: (checkIn, checkOut) => {
      dispatch({ type: ACTIONS.SET_DATES, payload: { checkIn, checkOut } })
    },
    
    setGuests: (guests) => {
      dispatch({ type: ACTIONS.SET_GUESTS, payload: guests })
    },
    
    setRoom: (room) => {
      dispatch({ type: ACTIONS.SET_ROOM, payload: room })
    },
    
    setGuestInfo: (info) => {
      dispatch({ type: ACTIONS.SET_GUEST_INFO, payload: info })
    },
    
    addExtra: (extra) => {
      dispatch({ type: ACTIONS.ADD_EXTRA, payload: extra })
    },
    
    removeExtra: (extraId) => {
      dispatch({ type: ACTIONS.REMOVE_EXTRA, payload: extraId })
    },
    
    goToStep: (step) => {
      dispatch({ type: ACTIONS.SET_STEP, payload: step })
    },
    
    nextStep: () => {
      dispatch({ type: ACTIONS.NEXT_STEP })
    },
    
    prevStep: () => {
      dispatch({ type: ACTIONS.PREV_STEP })
    },
    
    setError: (field, message) => {
      dispatch({ type: ACTIONS.SET_ERROR, payload: { field, message } })
    },
    
    clearError: (field) => {
      dispatch({ type: ACTIONS.CLEAR_ERROR, payload: field })
    },
    
    setLoading: (loading) => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: loading })
    },
    
    confirmBooking: async () => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate booking ID
      const bookingId = `RS-${Date.now().toString(36).toUpperCase()}`
      
      dispatch({ type: ACTIONS.CONFIRM_BOOKING, payload: { bookingId } })
      
      return bookingId
    },
    
    resetBooking: () => {
      dispatch({ type: ACTIONS.RESET_BOOKING })
    },
  }), [])
  
  // Computed values
  const computed = useMemo(() => ({
    totalGuests: state.guests.adults + state.guests.children,
    
    isStepValid: (step) => {
      switch (step) {
        case 1: // Dates & Guests
          return state.checkIn && state.checkOut && state.guests.adults > 0
        case 2: // Room Selection
          return state.selectedRoom !== null
        case 3: // Guest Info
          return (
            state.guestInfo.firstName.trim() !== '' &&
            state.guestInfo.lastName.trim() !== '' &&
            state.guestInfo.email.trim() !== '' &&
            state.guestInfo.phone.trim() !== ''
          )
        case 4: // Confirmation
          return true
        default:
          return false
      }
    },
    
    canProceed: () => {
      switch (state.currentStep) {
        case 1:
          return state.checkIn && state.checkOut && state.guests.adults > 0
        case 2:
          return state.selectedRoom !== null
        case 3:
          return (
            state.guestInfo.firstName.trim() !== '' &&
            state.guestInfo.lastName.trim() !== '' &&
            state.guestInfo.email.trim() !== '' &&
            state.guestInfo.phone.trim() !== ''
          )
        default:
          return true
      }
    },
    
    formattedCheckIn: state.checkIn ? formatDate(state.checkIn) : null,
    formattedCheckOut: state.checkOut ? formatDate(state.checkOut) : null,
  }), [state])
  
  const value = useMemo(() => ({
    state,
    actions,
    computed,
  }), [state, actions, computed])
  
  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}

// Hook
export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}

export default BookingContext
