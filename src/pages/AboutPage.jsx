/**
 * About Page
 * Brand story, vision, philosophy, and location
 */

import { motion } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'

const values = [
  {
    icon: HeartIcon,
    title: 'Genuine Hospitality',
    description: 'We believe in warm, personalized service that makes every guest feel truly valued.',
  },
  {
    icon: StarIcon,
    title: 'Uncompromising Quality',
    description: 'From linens to cuisine, we source only the finest to deliver exceptional experiences.',
  },
  {
    icon: LeafIcon,
    title: 'Sustainable Luxury',
    description: 'Our commitment to the environment ensures luxury that respects the planet.',
  },
  {
    icon: SparkleIcon,
    title: 'Innovative Design',
    description: 'Futuristic aesthetics meet timeless comfort in every corner of our property.',
  },
]

const team = [
  {
    name: 'Sarah Nakamura',
    role: 'General Manager',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
  },
  {
    name: 'James Okonkwo',
    role: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Head of Guest Relations',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
]

const milestones = [
  { year: '2018', title: 'Vision Born', description: 'Concept developed for a futuristic luxury hotel in Najjerra.' },
  { year: '2020', title: 'Construction Begins', description: 'Groundbreaking ceremony with international architects.' },
  { year: '2022', title: 'Grand Opening', description: 'Riverside Suites opens doors to first guests.' },
  { year: '2023', title: 'Award Recognition', description: 'Named Best New Luxury Hotel by Travel+Leisure.' },
  { year: '2024', title: 'Expansion', description: 'Added new penthouse collection and rooftop amenities.' },
]

export default function AboutPage() {
  return (
    <MainLayout pageKey="about">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-secondary-900 via-secondary-950 to-secondary-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-accent-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="container-app relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary-400 text-sm font-medium uppercase tracking-wider mb-4 block">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
              About <span className="text-gradient-primary">Riverside Suites</span>
            </h1>
            <p className="text-secondary-300 text-lg leading-relaxed">
              Where futuristic elegance meets the warmth of African hospitality. 
              Discover the vision behind Najjerra's most iconic hotel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-lg bg-surface">
        <div className="container-app">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary-500 text-sm font-medium uppercase tracking-wider mb-3 block">
                Our Beginning
              </span>
              <h2 className="text-3xl md:text-4xl font-display mb-6">
                A Vision of <span className="text-gradient-primary">Tomorrow</span>
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Riverside Suites was born from a dream to redefine luxury hospitality in East Africa. 
                  Founded in 2018 by a collective of visionary architects, hoteliers, and local entrepreneurs, 
                  our mission was clear: create a space where cutting-edge design harmonizes with the soul 
                  of Ugandan warmth.
                </p>
                <p>
                  Nestled along the serene banks of Najjerra, our property rises as a beacon of innovation—
                  a testament to what's possible when you blend international excellence with local heart. 
                  Every curve, every light, every detail was carefully considered to transport our guests 
                  into the future while keeping them grounded in comfort.
                </p>
                <p>
                  Today, Riverside Suites stands as more than a hotel. It's a destination, a landmark, 
                  and a promise—that extraordinary experiences are not just for tomorrow, but for today.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
                  alt="Riverside Suites exterior"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary-500/10 rounded-full blur-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-500/10 rounded-full blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-lg bg-surface-dim">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary-500 text-sm font-medium uppercase tracking-wider mb-3 block">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              Our Core <span className="text-gradient-gold">Values</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="p-6 bg-surface rounded-2xl border border-border text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-5">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {value.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-lg bg-surface">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary-500 text-sm font-medium uppercase tracking-wider mb-3 block">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-display">
              Key Milestones
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-primary-200 mt-2" />
                  )}
                </div>
                <div className="pt-3">
                  <h3 className="font-display font-semibold text-lg mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-text-secondary">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-lg bg-gradient-to-br from-secondary-900 via-secondary-950 to-secondary-900 text-white">
        <div className="container-app">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary-400 text-sm font-medium uppercase tracking-wider mb-4 block">
                Our Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display mb-8">
                "Hospitality is not a service, it's a<br />
                <span className="text-gradient-gold">feeling we create.</span>"
              </h2>
              <p className="text-secondary-300 text-lg leading-relaxed max-w-2xl mx-auto">
                At Riverside Suites, we believe that true luxury lies in the details—the smile at check-in, 
                the perfectly turned-down bed, the anticipation of your needs before you voice them. 
                We don't just host guests; we craft unforgettable moments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Advantage */}
      <section className="section-lg bg-surface">
        <div className="container-app">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <span className="text-primary-500 text-sm font-medium uppercase tracking-wider mb-3 block">
                Prime Location
              </span>
              <h2 className="text-3xl md:text-4xl font-display mb-6">
                The Heart of <span className="text-gradient-primary">Najjerra</span>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Strategically positioned in the vibrant Najjerra district, Riverside Suites offers 
                the perfect balance of accessibility and tranquility. With the city's business 
                centers, cultural attractions, and entertainment hubs just minutes away, 
                you're always connected—yet our riverside setting provides a peaceful retreat 
                from the urban buzz.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-surface-dim rounded-xl">
                  <p className="text-2xl font-bold text-primary-500">10 min</p>
                  <p className="text-sm text-text-muted">to City Center</p>
                </div>
                <div className="p-4 bg-surface-dim rounded-xl">
                  <p className="text-2xl font-bold text-primary-500">25 min</p>
                  <p className="text-sm text-text-muted">to Entebbe Airport</p>
                </div>
                <div className="p-4 bg-surface-dim rounded-xl">
                  <p className="text-2xl font-bold text-primary-500">5 min</p>
                  <p className="text-sm text-text-muted">to Shopping District</p>
                </div>
                <div className="p-4 bg-surface-dim rounded-xl">
                  <p className="text-2xl font-bold text-primary-500">15 min</p>
                  <p className="text-sm text-text-muted">to National Park</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-2xl overflow-hidden bg-secondary-100 aspect-square">
                {/* Stylized map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 w-24 h-24 -m-6 bg-primary-500/20 rounded-full animate-ping" />
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-lg relative z-10">
                      <MapPinIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    <path d="M0 200 L400 200" stroke="#94a3b8" strokeWidth="2" />
                    <path d="M200 0 L200 400" stroke="#94a3b8" strokeWidth="2" />
                    <circle cx="200" cy="200" r="80" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                    <circle cx="200" cy="200" r="140" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-lg bg-surface-dim">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary-500 text-sm font-medium uppercase tracking-wider mb-3 block">
              Meet Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              Leadership
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Dedicated professionals committed to making your stay extraordinary.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display font-semibold text-lg">
                  {member.name}
                </h3>
                <p className="text-text-secondary text-sm">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="container-app text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
              Experience Our Vision
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Join us at Riverside Suites and discover what the future of hospitality looks like.
            </p>
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block btn bg-white text-primary-600 hover:bg-primary-50 px-8 py-3"
            >
              Book Your Stay
            </motion.a>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  )
}

// Icons
function HeartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  )
}

function StarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function LeafIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}

function SparkleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 3v18M3 12h18M5.63 5.63l12.74 12.74M5.63 18.37L18.37 5.63" />
    </svg>
  )
}

function MapPinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
    </svg>
  )
}
