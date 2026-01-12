/**
 * Booking Utility Functions
 * Pricing calculations and date helpers
 */

// Available extras/add-ons
export const availableExtras = [
    {
        id: 'breakfast',
        name: 'Daily Breakfast',
        description: 'Full breakfast buffet for all guests',
        pricePerNight: 25,
        priceType: 'per-night',
    },
    {
        id: 'airport-transfer',
        name: 'Airport Transfer',
        description: 'Round-trip luxury car service',
        pricePerNight: 75,
        priceType: 'one-time',
    },
    {
        id: 'spa-credit',
        name: 'Spa Credit',
        description: '$100 credit for spa services',
        pricePerNight: 100,
        priceType: 'one-time',
    },
    {
        id: 'late-checkout',
        name: 'Late Checkout',
        description: 'Checkout extended to 3:00 PM',
        pricePerNight: 50,
        priceType: 'one-time',
    },
    {
        id: 'romantic-package',
        name: 'Romantic Package',
        description: 'Champagne, flowers, and chocolates',
        pricePerNight: 150,
        priceType: 'one-time',
    },
]

// Tax and fee rates
const TAX_RATE = 0.12 // 12% tax
const SERVICE_FEE_RATE = 0.05 // 5% service fee

/**
 * Calculate number of nights between two dates
 */
export function calculateNights(checkIn, checkOut) {
    if (!checkIn || !checkOut) return 0

    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = end.getTime() - start.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return Math.max(0, diffDays)
}

/**
 * Calculate complete booking price
 */
export function calculateBookingPrice(room, checkIn, checkOut, extras = []) {
    if (!room || !checkIn || !checkOut) {
        return {
            roomTotal: 0,
            extrasTotal: 0,
            taxes: 0,
            serviceFee: 0,
            total: 0,
            nights: 0,
            pricePerNight: 0,
        }
    }

    const nights = calculateNights(checkIn, checkOut)
    const pricePerNight = room.price
    const roomTotal = pricePerNight * nights

    // Calculate extras
    let extrasTotal = 0
    extras.forEach(extra => {
        if (extra.priceType === 'per-night') {
            extrasTotal += extra.pricePerNight * nights
        } else {
            extrasTotal += extra.pricePerNight
        }
    })

    const subtotal = roomTotal + extrasTotal
    const taxes = Math.round(subtotal * TAX_RATE * 100) / 100
    const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE * 100) / 100
    const total = Math.round((subtotal + taxes + serviceFee) * 100) / 100

    return {
        roomTotal,
        extrasTotal,
        taxes,
        serviceFee,
        total,
        nights,
        pricePerNight,
    }
}

/**
 * Format date for display
 */
export function formatDate(dateString, options = {}) {
    if (!dateString) return ''

    const date = new Date(dateString)
    const defaultOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        ...options,
    }

    return date.toLocaleDateString('en-US', defaultOptions)
}

/**
 * Format date for input fields (YYYY-MM-DD)
 */
export function formatDateForInput(date) {
    if (!date) return ''
    const d = new Date(date)
    return d.toISOString().split('T')[0]
}

/**
 * Get minimum check-in date (today)
 */
export function getMinCheckInDate() {
    return formatDateForInput(new Date())
}

/**
 * Get minimum check-out date (day after check-in)
 */
export function getMinCheckOutDate(checkInDate) {
    if (!checkInDate) return getMinCheckInDate()

    const date = new Date(checkInDate)
    date.setDate(date.getDate() + 1)
    return formatDateForInput(date)
}

/**
 * Validate booking dates
 */
export function validateDates(checkIn, checkOut) {
    const errors = {}

    if (!checkIn) {
        errors.checkIn = 'Check-in date is required'
    }

    if (!checkOut) {
        errors.checkOut = 'Check-out date is required'
    }

    if (checkIn && checkOut) {
        const start = new Date(checkIn)
        const end = new Date(checkOut)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (start < today) {
            errors.checkIn = 'Check-in cannot be in the past'
        }

        if (end <= start) {
            errors.checkOut = 'Check-out must be after check-in'
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    }
}

/**
 * Validate guest information
 */
export function validateGuestInfo(info) {
    const errors = {}

    if (!info.firstName?.trim()) {
        errors.firstName = 'First name is required'
    }

    if (!info.lastName?.trim()) {
        errors.lastName = 'Last name is required'
    }

    if (!info.email?.trim()) {
        errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
        errors.email = 'Invalid email format'
    }

    if (!info.phone?.trim()) {
        errors.phone = 'Phone number is required'
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    }
}

/**
 * Format currency
 */
export function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

/**
 * Generate booking reference
 */
export function generateBookingRef() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let ref = 'RS-'
    for (let i = 0; i < 8; i++) {
        ref += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return ref
}
