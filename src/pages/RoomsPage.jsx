/**
 * Rooms Page
 * Room listing with filters and sorting
 */

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'
import RoomCard from '../components/RoomCard'
import { rooms, roomCategories, sortRooms, getRoomsByCategory } from '../utils/roomsData'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'size', label: 'Room Size' },
  { value: 'guests', label: 'Guest Capacity' },
]

export default function RoomsPage({ onNavigateToRoom }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 2000])

  // Filter and sort rooms
  const filteredRooms = useMemo(() => {
    let result = getRoomsByCategory(activeCategory)
    
    // Price filter
    result = result.filter(room => 
      room.price >= priceRange[0] && room.price <= priceRange[1]
    )
    
    // Sort
    if (sortBy === 'featured') {
      result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    } else {
      result = sortRooms(result, sortBy)
    }
    
    return result
  }, [activeCategory, sortBy, priceRange])

  const handleViewDetails = (room) => {
    if (onNavigateToRoom) {
      onNavigateToRoom(room.slug)
    }
  }

  return (
    <MainLayout pageKey="rooms">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-secondary-900 via-secondary-950 to-secondary-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-primary-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="container-app relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
              Rooms & <span className="text-gradient-primary">Suites</span>
            </h1>
            <p className="text-secondary-300 text-lg">
              Discover our collection of meticulously designed accommodations, 
              each offering a unique blend of comfort and futuristic luxury.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-16 md:top-20 z-30 bg-surface border-b border-border">
        <div className="container-app py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2 lg:pb-0">
              {roomCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-surface-dim text-text-secondary hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm"
              >
                <FilterIcon className="w-4 h-4" />
                Filters
              </button>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-text-muted hidden sm:block">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg text-sm bg-surface focus:border-primary-500 focus:outline-none"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-text-muted hover:bg-surface-dim'}`}
                  aria-label="Grid view"
                >
                  <GridIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-text-muted hover:bg-surface-dim'}`}
                  aria-label="List view"
                >
                  <ListIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters (Mobile) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="pt-4 pb-2 border-t border-border mt-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results */}
      <section className="section-md bg-surface-dim">
        <div className="container-app">
          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-text-muted">
              Showing <span className="font-medium text-text">{filteredRooms.length}</span> rooms
            </p>
          </div>

          {/* Room Grid */}
          {filteredRooms.length > 0 ? (
            <motion.div
              layout
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              <AnimatePresence mode="popLayout">
                {filteredRooms.map((room) => (
                  <motion.div
                    key={room.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RoomCard
                      room={room}
                      variant={viewMode === 'list' ? 'compact' : 'default'}
                      onViewDetails={handleViewDetails}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-surface-dim rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No rooms found</h3>
              <p className="text-text-muted mb-4">
                Try adjusting your filters or browse all rooms.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all')
                  setPriceRange([0, 2000])
                }}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface">
        <div className="container-app">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-display text-white mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-primary-100 mb-6 max-w-xl mx-auto">
              Our concierge team is available 24/7 to help you find the perfect room for your stay.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn bg-white text-primary-600 hover:bg-primary-50 px-8 py-3"
            >
              Contact Concierge
            </motion.button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

// Icons
function FilterIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
    </svg>
  )
}

function GridIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  )
}

function ListIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  )
}

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
  )
}
