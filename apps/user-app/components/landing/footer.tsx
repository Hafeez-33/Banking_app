'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const footerLinks = {
    Product: ['Features', 'Security', 'Pricing', 'FAQ'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Cookies', 'Licenses'],
    Social: [
      { icon: Twitter, href: '#' },
      { icon: Github, href: '#' },
      { icon: Linkedin, href: '#' },
      { icon: Mail, href: '#' },
    ],
  }

  return (
    <footer className="bg-blue-950 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-lg">
                R
              </div>
              <span className="text-xl font-bold">Rupy Bank</span>
            </div>
            <p className="text-sm text-gray-400">
              Smart banking made simple for everyone.
            </p>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            category !== 'Social' && (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="font-semibold text-white mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link as string}>
                      <motion.a
                        href="#"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {link as string}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          ))}

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1"
          >
            <h3 className="font-semibold text-white mb-4">Follow</h3>
            <div className="flex gap-4">
              {footerLinks.Social.map(({ icon: Icon }, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-gray-400">
            © 2024 Rupy Bank. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-gray-400">
            <motion.a href="#" whileHover={{ x: 5 }} className="hover:text-white transition-colors">
              Privacy Policy
            </motion.a>
            <motion.a href="#" whileHover={{ x: 5 }} className="hover:text-white transition-colors">
              Terms of Service
            </motion.a>
            <motion.a href="#" whileHover={{ x: 5 }} className="hover:text-white transition-colors">
              Cookie Settings
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
