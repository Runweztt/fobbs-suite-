/**
 * Home Page
 * Complete landing page for FOBBS Apartment and Suite
 */

import MainLayout from '../layouts/MainLayout'
import Hero from '../components/Hero'
import BookingWidget from '../components/BookingWidget'
import FeaturedRooms from '../components/FeaturedRooms'
import Amenities from '../components/Amenities'
import Testimonials from '../components/Testimonials'
import Location from '../components/Location'
import CTASection from '../components/CTASection'

export default function HomePage() {
  return (
    <MainLayout pageKey="home">
      <Hero />
      <BookingWidget />
      <FeaturedRooms />
      <Amenities />
      <Testimonials />
      <Location />
      <CTASection />
    </MainLayout>
  )
}
