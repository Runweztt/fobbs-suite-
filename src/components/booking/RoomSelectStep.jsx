/**
 * RoomSelectStep Component
 * Step 2: Room selection with filtering
 */

import { motion } from 'framer-motion'
import { useBooking } from '../../context/BookingContext'
import { rooms, roomCategories } from '../../utils/roomsData'
import { formatCurrency } from '../../utils/bookingUtils'

export default function RoomSelectStep() {
  const { state, actions, computed } = useBooking()
  
  // Filter rooms by guest capacity
  const availableRooms = rooms.filter(room => 
    room.available && room.maxGuests >= computed.totalGuests
  )
  
  const handleSelectRoom = (room) => {
    actions.setRoom(room)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-display font-semibold mb-2">
          Choose Your Room
        </h2>
        <p className="text-text-secondary">
          Showing rooms for {computed.totalGuests} guest{computed.totalGuests !== 1 ? 's' : ''} • {state.pricing.nights} night{state.pricing.nights !== 1 ? 's' : ''}
        </p>
      </div>
      
      {/* Room List */}
      <div className="space-y-4">
        {availableRooms.map((room) => {
          const isSelected = state.selectedRoom?.id === room.id
          const totalPrice = room.price * state.pricing.nights
          
          return (
            <motion.div
              key={room.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleSelectRoom(room)}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'border-primary-500 bg-primary-50/50'
                  : 'border-border hover:border-primary-200 bg-surface'
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                >
                  <CheckIcon className="w-4 h-4 text-white" />
                </motion.div>
              )}
              
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-24 h-24 md:w-32 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs text-primary-500 font-medium uppercase">
                        {room.category}
                      </span>
                      <h3 className="font-semibold">{room.name}</h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-lg">
                        {formatCurrency(totalPrice)}
                      </div>
                      <div className="text-xs text-text-muted">
                        {formatCurrency(room.price)}/night
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <SizeIcon className="w-3.5 h-3.5" />
                      {room.size}m²
                    </span>
                    <span className="flex items-center gap-1">
                      <GuestsIcon className="w-3.5 h-3.5" />
                      Up to {room.maxGuests}
                    </span>
                    <span className="flex items-center gap-1">
                      <BedIcon className="w-3.5 h-3.5" />
                      {room.beds}
                    </span>
                  </div>
                  
                  {/* Amenity tags */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {room.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-0.5 bg-neutral-100 text-text-muted text-xs rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="px-2 py-0.5 text-text-muted text-xs">
                        +{room.amenities.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {/* No rooms available */}
      {availableRooms.length === 0 && (
        <div className="text-center py-8">
          <p className="text-text-secondary mb-4">
            No rooms available for {computed.totalGuests} guests.
          </p>
          <button
            onClick={actions.prevStep}
            className="btn btn-secondary"
          >
            Adjust Guests
          </button>
        </div>
      )}
    </motion.div>
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
