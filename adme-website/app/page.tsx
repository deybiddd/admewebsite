"use client";

import AuthButton from '@/components/AuthButton'
import ContactForm from '@/components/ContactForm'
import AuthDebug from '@/components/AuthDebug'
final 2import SimpleConnectionTest from '@/components/SimpleConnectionTest'
import ErrorBoundary from '@/components/ErrorBoundary'
import Image from 'next/image'
import { Londrina_Solid, Inter } from 'next/font/google'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

const londrina = Londrina_Solid({ weight: '400', subsets: ['latin'], variable: '--font-londrina' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
 
export default function Home() {
  return (
    <ParallaxProvider>
      {/*
        TODO: This is a Client Component. You can add more interactive or animated effects here in the future.
      */}
      <div className={`min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-white ${inter.variable} ${londrina.variable} font-sans`}>
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
          <Link href="/" className="text-2xl font-bold text-black" style={{ fontFamily: 'var(--font-londrina), sans-serif' }}>
            adme
          </Link>
        <div className="hidden md:flex space-x-8">
            <a href="#video" className="text-gray-500 hover:text-black transition-colors font-sans">About</a>
            <a href="#services" className="text-gray-500 hover:text-black transition-colors font-sans">Services</a>
            <a href="#contact" className="text-gray-500 hover:text-black transition-colors font-sans">Contact</a>
          </div>
          <AuthButton />
        </nav>

        {/* Hero Section (Intro) */}
        <main className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex flex-col items-center justify-center text-center gap-6 w-full">
            {/* Logo on top */}
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <Image src="/assets/images/adme-logo.png" alt="Adme Logo" width={120} height={120} className="mx-auto" />
            </motion.div>
            {/* 3-line copy */}
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-gray-900 font-sans"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              Yup! we can help you<br />
              <span style={{ fontFamily: 'var(--font-londrina), sans-serif', display: 'inline-block', fontWeight: 900 }}>grow</span><br />
              your business!
            </motion.h1>
            {/* Arrow animation */}
            <motion.div
              className="flex justify-center items-center mt-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
              viewport={{ once: false }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6V30M18 30L8 20M18 30L28 20" stroke="#D97706" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            {/* CTA below copy */}
            <motion.a
              href="https://calendly.com/alvarado-daviddd/intro-to-your-business-growth-with-adme"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition-colors shadow-lg border border-yellow-700 font-sans mt-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              Schedule a discovery call!
            </motion.a>
          </div>
        </main>

        {/* Video Section */}
        <Parallax speed={16}>
          <section id="video" className="w-full max-w-4xl mx-auto mb-12 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-black mb-6 text-center font-sans">Get to know us more!</h2>
            <div className="w-full flex justify-center">
              <video controls className="rounded-2xl w-full h-[420px] md:h-[540px] shadow-2xl bg-black object-cover border border-gray-200">
                <source src="/assets/videos/ADME_INFOGRAPHICS 2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </section>
        </Parallax>

        {/* Client logos section with marquee effect */}
        <Parallax speed={10}>
          <section className="mt-16 mb-8 py-8 rounded-xl overflow-hidden" aria-label="Client logos">
            <motion.h2
              className="text-2xl font-bold text-black mb-6 text-center font-sans"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              Our Clients
            </motion.h2>
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
                <Image src="/assets/images/clients/emma sleep logo.svg" alt="Emma Sleep" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/Liverwell.png" alt="Liverwell" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/seleco.png" alt="Seleco" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/caramba - Copy.png" alt="Caramba" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/ABI.png" alt="ABI" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/popeyes.png" alt="Popeyes" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/Tanduay Ice.png" alt="Tanduay Ice" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/ML.png" alt="ML" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/Landlite.png" alt="Landlite" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/Valucare.png" alt="Valucare" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/BDO.png" alt="BDO" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/Cignal.png" alt="Cignal" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/Canon-Logo.png" alt="Canon" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/Heineken_logo.svg.png" alt="Heineken" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/Lazada-Symbol.png" alt="Lazada" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/JTI.png" alt="JTI" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/FID01.png" alt="FID01" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/FRHI_Logo.png" alt="FRHI" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/Snidel.png" alt="Snidel" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/3M_wordmark.svg - Copy.png" alt="3M" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/3M_wordmark.svg.png" alt="3M" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/image 13.png" alt="Client Logo" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/image 7.png" alt="Client Logo" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/image 6.png" alt="Client Logo" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/image 9.png" alt="Client Logo" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/Banh_Mi_Kitchen_Logo_1200x1200 - Copy.webp" alt="Banh Mi Kitchen" width={100} height={40} className="object-contain" />
                <Image src="/assets/images/clients/image 15.png" alt="Client Logo" width={100} height={40} className="object-contain" />
          </div>
            </motion.div>
          </section>
        </Parallax>

        {/* Services Section */}
        <Parallax speed={-16}>
          <section id="services" className="max-w-6xl mx-auto py-16 px-4">
            <motion.h2
              className="text-3xl font-bold text-black mb-10 text-center font-sans"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
              style={{ marginTop: '3rem' }}
            >
              Our Services
            </motion.h2>
            <ServicesGrid />
          </section>
        </Parallax>

        {/* Contact Section */}
        <Parallax speed={20}>
          <section id="contact" className="max-w-2xl mx-auto py-16 px-4">
            <h2 className="text-3xl font-bold text-black mb-10 text-center font-sans">Contact Us</h2>
            <ContactForm />
          </section>
        </Parallax>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold text-black mb-4 md:mb-0" style={{ fontFamily: 'var(--font-londrina), sans-serif' }}>
              adme
            </div>
            <div className="text-gray-600">
              © 2016 adme. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
    </ParallaxProvider>
  );
}

function ServicesGrid() {
  const [hovered, setHovered] = useState<number | null>(null)
  const services = [
    {
      label: 'Social Media Management/Marketing',
      icon: (
        <svg width="48" height="48" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 48 48" className="mb-4"><rect x="8" y="8" width="32" height="32" rx="8"/><circle cx="18" cy="20" r="2"/><circle cx="30" cy="20" r="2"/><circle cx="24" cy="28" r="2"/></svg>
      ),
      desc: 'Content creation, community management, analytics, promo creation, and more. We help you build and engage your audience across platforms.'
    },
    {
      label: 'Online Media Management',
      icon: (
        <svg width="48" height="48" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 48 48" className="mb-4"><circle cx="24" cy="24" r="16"/><path d="M24 8v32M8 24h32"/></svg>
      ),
      desc: 'Strategic planning, buying, and optimization of your digital media campaigns for maximum reach and ROI.'
    },
    {
      label: 'Search Engine Optimization',
      icon: (
        <svg width="48" height="48" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 48 48" className="mb-4"><rect x="10" y="10" width="28" height="20" rx="4"/><path d="M24 30v8"/><circle cx="24" cy="40" r="2"/><path d="M18 18h12"/></svg>
      ),
      desc: "Boost your website's visibility and ranking with on-page, off-page, and technical SEO best practices."
    },
    {
      label: 'Asset Generation',
      icon: (
        <svg width="48" height="48" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 48 48" className="mb-4"><rect x="12" y="12" width="24" height="24" rx="4"/><path d="M16 32l8-8 8 8"/><circle cx="20" cy="20" r="2"/></svg>
      ),
      desc: 'Custom graphics, videos, and creative assets tailored to your brand and campaign needs.'
    },
    {
      label: 'Website/Mobile App Development',
      icon: (
        <svg width="48" height="48" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 48 48" className="mb-4"><rect x="8" y="12" width="32" height="24" rx="4"/><rect x="16" y="20" width="16" height="8" rx="2"/></svg>
      ),
      desc: 'Modern, responsive websites and mobile apps built for performance, scalability, and user experience.'
    },
    {
      label: 'Influencer Marketing',
      icon: (
        <svg width="48" height="48" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 48 48" className="mb-4"><circle cx="24" cy="20" r="8"/><path d="M8 40c0-6 8-10 16-10s16 4 16 10"/></svg>
      ),
      desc: 'Connect with the right influencers to amplify your brand and drive authentic engagement.'
    },
    {
      label: 'AI Automation',
      icon: (
        <svg width="48" height="48" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 48 48" className="mb-4"><rect x="12" y="12" width="24" height="24" rx="4"/><path d="M24 16v16M16 24h16"/></svg>
      ),
      desc: 'Leverage AI tools and automation to streamline workflows, personalize experiences, and unlock new efficiencies.'
    },
    {
      label: 'Event Activation',
      icon: (
        <svg width="48" height="48" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 48 48" className="mb-4"><rect x="10" y="18" width="28" height="12" rx="2"/><path d="M10 24h28"/></svg>
      ),
      desc: 'End-to-end event planning, management, and on-ground activation to create memorable brand experiences.'
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
      {services.map((service, i) => (
        <div
          key={service.label}
          className="bg-gray-100 rounded-xl flex flex-col items-center p-8 shadow-sm relative cursor-pointer group"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(i)}
          onBlur={() => setHovered(null)}
          tabIndex={0}
          aria-describedby={`service-desc-${i}`}
        >
          {service.icon}
          <span className="mt-2 text-center text-base font-semibold text-black font-sans uppercase">{service.label}</span>
          <AnimatePresence>
            {hovered === i && (
              <motion.div
                id={`service-desc-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="absolute left-1/2 top-full z-20 w-72 -translate-x-1/2 mt-4 bg-white border border-gray-200 shadow-xl rounded-xl p-4 text-sm text-gray-700 font-sans pointer-events-none group-hover:pointer-events-auto"
                style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)' }}
              >
                {service.desc}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
} 