/**
 * Contact Page
 * Modern contact form with validation and contact details
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const subjects = [
  'General Inquiry',
  'Reservations',
  'Events & Weddings',
  'Corporate Bookings',
  'Feedback',
  'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!form.subject) {
      newErrors.subject = 'Please select a subject'
    }
    
    if (!form.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setForm(initialFormState)
  }

  const handleNewMessage = () => {
    setIsSubmitted(false)
  }

  return (
    <MainLayout pageKey="contact">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-secondary-900 via-secondary-950 to-secondary-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-primary-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="container-app relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary-400 text-sm font-medium uppercase tracking-wider mb-4 block">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
              Contact <span className="text-gradient-primary">Us</span>
            </h1>
            <p className="text-secondary-300 text-lg">
              We'd love to hear from you. Reach out for reservations, inquiries, 
              or just to say hello.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-lg bg-surface">
        <div className="container-app">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-surface rounded-2xl border border-border p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckIcon className="w-10 h-10 text-white" />
                      </motion.div>
                      <h2 className="text-2xl font-display font-semibold mb-3">
                        Message Sent!
                      </h2>
                      <p className="text-text-secondary mb-6 max-w-md mx-auto">
                        Thank you for reaching out. Our team will get back to you 
                        within 24 hours.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNewMessage}
                        className="btn btn-secondary"
                      >
                        Send Another Message
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-2xl font-display font-semibold mb-2">
                          Send Us a Message
                        </h2>
                        <p className="text-text-secondary">
                          Fill out the form below and we'll respond promptly.
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name <span className="text-error">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                            className={`input ${errors.name ? 'border-error focus:border-error' : ''}`}
                          />
                          {errors.name && (
                            <p id="name-error" className="mt-1 text-sm text-error" role="alert">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address <span className="text-error">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            className={`input ${errors.email ? 'border-error focus:border-error' : ''}`}
                          />
                          {errors.email && (
                            <p id="email-error" className="mt-1 text-sm text-error" role="alert">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+234 907 791 8042"
                            className="input"
                          />
                        </div>

                        {/* Subject */}
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium mb-2">
                            Subject <span className="text-error">*</span>
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            aria-invalid={!!errors.subject}
                            aria-describedby={errors.subject ? 'subject-error' : undefined}
                            className={`input ${errors.subject ? 'border-error focus:border-error' : ''}`}
                          >
                            <option value="">Select a subject</option>
                            {subjects.map((subj) => (
                              <option key={subj} value={subj}>
                                {subj}
                              </option>
                            ))}
                          </select>
                          {errors.subject && (
                            <p id="subject-error" className="mt-1 text-sm text-error" role="alert">
                              {errors.subject}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message <span className="text-error">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          rows={5}
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? 'message-error' : undefined}
                          className={`input resize-none ${errors.message ? 'border-error focus:border-error' : ''}`}
                        />
                        {errors.message && (
                          <p id="message-error" className="mt-1 text-sm text-error" role="alert">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn btn-primary py-3 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <LoadingSpinner className="w-5 h-5 animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          'Send Message'
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Details */}
              <div className="bg-surface-dim rounded-2xl p-6">
                <h3 className="text-lg font-display font-semibold mb-6">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <LocationIcon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-text-secondary text-sm">
                        Michael Fidelis Nwaefulu Street<br />
                        GRA Phase I, Asaba, Delta State, Nigeria
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a 
                        href="tel:+2349077918042" 
                        className="text-text-secondary text-sm hover:text-primary-500 transition-colors"
                      >
                        +234 907 791 8042
                      </a>
                      <p className="text-text-muted text-xs mt-1">Available 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <EmailIcon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a 
                        href="mailto:fobbesapartmentsandsuites@gmail.com" 
                        className="text-text-secondary text-sm hover:text-primary-500 transition-colors"
                      >
                        fobbesapartmentsandsuites@gmail.com
                      </a>
                      <p className="text-text-muted text-xs mt-1">Response within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-surface-dim rounded-2xl p-6">
                <h3 className="text-lg font-display font-semibold mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center border border-border hover:border-primary-500 hover:text-primary-500 transition-colors"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center border border-border hover:border-primary-500 hover:text-primary-500 transition-colors"
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center border border-border hover:border-primary-500 hover:text-primary-500 transition-colors"
                  >
                    <TwitterIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center border border-border hover:border-primary-500 hover:text-primary-500 transition-colors"
                  >
                    <LinkedInIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-surface-dim rounded-2xl p-6">
                <h3 className="text-lg font-display font-semibold mb-4">
                  Reception Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Front Desk</span>
                    <span className="font-medium">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Reservations</span>
                    <span className="font-medium">8 AM - 10 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Concierge</span>
                    <span className="font-medium">24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-surface-dim">
        <div className="container-app py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-display mb-2">
              Find Us Here
            </h2>
            <p className="text-text-secondary">
              Located in GRA Phase I, Asaba, Delta State
            </p>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden bg-secondary-100 aspect-[21/9]"
          >
            {/* Stylized map placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 w-24 h-24 -m-6 bg-primary-500/20 rounded-full animate-ping" />
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-lg relative z-10">
                  <LocationIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 800 300">
                <path d="M0 150 L800 150" stroke="#94a3b8" strokeWidth="2" />
                <path d="M400 0 L400 300" stroke="#94a3b8" strokeWidth="2" />
                <path d="M200 0 L200 300" stroke="#e2e8f0" strokeWidth="1" />
                <path d="M600 0 L600 300" stroke="#e2e8f0" strokeWidth="1" />
                <path d="M0 75 L800 75" stroke="#e2e8f0" strokeWidth="1" />
                <path d="M0 225 L800 225" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx="400" cy="150" r="60" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                <circle cx="400" cy="150" r="100" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </svg>
            </div>

            {/* Overlay card */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs">
              <p className="font-semibold">FOBBS Apartment and Suite</p>
              <p className="text-text-secondary text-sm">
                Michael Fidelis Nwaefulu Street, GRA Phase I, Asaba
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-primary-600 text-sm font-medium hover:text-primary-700"
              >
                Get Directions
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
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

function LoadingSpinner(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="10" strokeWidth="4" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function LocationIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  )
}

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  )
}

function EmailIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  )
}

function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
