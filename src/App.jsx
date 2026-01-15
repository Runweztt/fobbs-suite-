/**
 * App Entry Point - FOBBS Apartment and Suite
 * Hash-based routing for all pages
 */

import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import RoomsPage from './pages/RoomsPage'
import RoomDetailsPage from './pages/RoomDetailsPage'
import BookingPage from './pages/BookingPage'
import AmenitiesPage from './pages/AmenitiesPage'
import GalleryPage from './pages/GalleryPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [roomSlug, setRoomSlug] = useState(null)

  // Hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home'
      
      if (hash.startsWith('room/')) {
        setCurrentPage('room-details')
        setRoomSlug(hash.replace('room/', ''))
      } else {
        setCurrentPage(hash)
        setRoomSlug(null)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (page) => {
    window.location.hash = page
  }

  const navigateToRoom = (slug) => {
    window.location.hash = `room/${slug}`
  }

  const goBack = () => {
    navigate('rooms')
  }

  const goHome = () => {
    navigate('home')
  }

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage, roomSlug])

  switch (currentPage) {
    case 'rooms':
      return <RoomsPage onNavigateToRoom={navigateToRoom} />
    case 'room-details':
      return <RoomDetailsPage slug={roomSlug} onBack={goBack} />
    case 'booking':
      return <BookingPage onBack={goHome} />
    case 'amenities':
      return <AmenitiesPage />
    case 'gallery':
      return <GalleryPage />
    case 'about':
      return <AboutPage />
    case 'contact':
      return <ContactPage />
    default:
      return <HomePage />
  }
}

export default App
