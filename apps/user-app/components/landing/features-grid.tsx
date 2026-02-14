'use client'

import { motion } from 'framer-motion'
import {
  Repeat,
  Plus,
  RefreshCw,
  Building2,
  Clock,
  Lock,
  Fingerprint,
  LayoutGrid,
} from 'lucide-react'

export function FeaturesGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const features = [
    {
      icon: Repeat,
      title: 'Instant Bank Transfers',
      description: 'Send money instantly between accounts powered by Dwolla\'s ACH network.',
    },
    {
      icon: Plus,
      title: 'Add Money to Account',
      description: 'Top up your Rupy Bank balance seamlessly from any connected bank.',
    },
    {
      icon: RefreshCw,
      title: 'Real-Time Balance Updates',
      description: 'Watch your balance update in real time as transactions process.',
    },
    {
      icon: Building2,
      title: 'Multi-Bank Account Support',
      description: 'Connect and manage multiple bank accounts from one dashboard.',
    },
    {
      icon: Plus,
      title: 'Opening Bonus System',
      description: 'New users receive a welcome bonus deposited directly to their account.',
    },
    {
      icon: Lock,
      title: 'Insufficient Balance Protection',
      description: 'Smart alerts and safeguards prevent overdrafts before they happen.',
    },
    {
      icon: Lock,
      title: 'Secure Authentication',
      description: 'Session-based login with encrypted credentials and automatic timeouts.',
    },
    {
      icon: Fingerprint,
      title: 'Idempotent Transfers',
      description: 'Duplicate transfer prevention ensures every transaction processes once.',
    },
    {
      icon: LayoutGrid,
      title: 'Real-time Dashboard',
      description: 'A unified overview of all accounts, balances, and recent activity.',
    },
  ]

  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p 
            variants={itemVariants}
            className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-4"
          >
            FEATURES
          </motion.p>
          <motion.h2 
            variants={itemVariants}
            className="text-5xl font-black text-foreground mb-4"
          >
            Everything you need to bank smarter
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            From instant transfers to real-time insights, Rupy Bank gives you modern banking tools built for the way you live.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-8 rounded-xl bg-gray-50 hover:bg-gray-200 transition-all border border-gray-300/50 hover:border-blue-600/30 overflow-hidden relative"
                whileHover={{ y: -8 }}
              >
                {/* Animated gradient background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-5 overflow-hidden"
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <Icon size={24} className="text-blue-500" strokeWidth={1.5} />
                    </motion.div>
                  </motion.div>
                  <motion.h3 
                    className="text-lg font-bold text-foreground mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-500 text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>

                {/* Bottom accent line on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-accent/50 w-0 group-hover:w-full transition-all duration-500"
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
