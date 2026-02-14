'use client'

import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <motion.nav 
      className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-300 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            H
          </div>
          <span className="text-xl font-bold text-foreground">Rupy Bank</span>
        </motion.div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-12">
          {['How It Works','Features', 'Security', 'Stats'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <motion.a
            href="/sign-in"
            className="text-foreground hover:text-muted-foreground transition-colors text-md font-medium hover:bg-blue-200 rounded-xl p-2"
            whileHover={{ y: -2 }}
          >
            Sign In
          </motion.a>
          <motion.a
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-accent/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href='/sign-up'
          >
            Get Started
          </motion.a>
        </div>
      </div>
    </motion.nav>
  )
}
