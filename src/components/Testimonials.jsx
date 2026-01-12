/**
 * Testimonials Section
 * Guest reviews with carousel
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Business Traveler',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    quote: "Absolutely stunning property! The attention to detail is remarkable. The infinity pool at sunset is something you'll never forget. Already planning my next visit.",
  },
  {
    id: 2,
    name: 'James Okonkwo',
    role: 'Honeymoon Guest',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    quote: "We celebrated our honeymoon here and it exceeded every expectation. The staff made us feel like royalty. The Presidential Suite is pure luxury.",
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Luxury Blogger',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
    quote: "I've stayed at hotels worldwide, and Riverside Suites stands out. The futuristic design paired with warm hospitality is a rare combination.",
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Corporate Executive',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 5,
    quote: "Perfect for business trips. Fast WiFi, great workspace, and the spa helped me unwind after long meetings. Highly recommended.",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="section-lg bg-gradient-to-br from-secondary-900 via-secondary-950 to-secondary-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container-app relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary-400 text-sm font-medium uppercase tracking-wider mb-3 block">
            Guest Reviews
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-white mb-4">
            What Our Guests <span className="text-gradient-gold">Say</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Quote */}
                <div className="mb-8">
                  <QuoteIcon className="w-12 h-12 text-primary-500/30 mx-auto mb-4" />
                  <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
                    "{testimonials[current].quote}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-accent-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[current].avatar}
                    alt={testimonials[current].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary-500/50"
                  />
                  <div className="text-left">
                    <p className="text-white font-semibold">{testimonials[current].name}</p>
                    <p className="text-secondary-400 text-sm">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current 
                      ? 'bg-primary-500 w-8' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

function QuoteIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  )
}

function StarIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function ChevronLeftIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function ChevronRightIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  )
}
