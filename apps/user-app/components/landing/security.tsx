'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, AlertCircle, Zap } from 'lucide-react'

export function Security() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
    },
  }

  const securityFeatures = [
    {
      icon: Shield,
      title: 'Bank-Grade Encryption',
      description: 'All data is encrypted at rest and in transit with AES-256 and TLS 1.3.',
    },
    {
      icon: Lock,
      title: 'Secure Session Auth',
      description: 'Session-based authentication with automatic expiry and refresh tokens.',
    },
    {
      icon: Zap,
      title: 'Protected Transfers',
      description: 'Multi-layer verification ensures only authorized transfers are processed.',
    },
    {
      icon: AlertCircle,
      title: 'Fraud Prevention',
      description: 'Idempotent transfer keys and anomaly detection prevent fraudulent transactions.',
    },
  ]

  return (
    <section id="security" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Features List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <motion.h2 
                className="text-5xl font-black text-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Your money is safe with us
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-500 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                We take security seriously. Every layer of Rupy Bank is built to protect your accounts, data, and transactions.
              </motion.p>
            </motion.div>

            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex gap-4 p-4 rounded-lg hover:bg-blue-200/50 transition-colors"
                  whileHover={{ x: 8 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-blue-600/20 transition-colors"
                    whileHover={{ scale: 1.15, rotate: 15 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <Icon size={24} className="text-blue-500" strokeWidth={1.5} />
                    </motion.div>
                  </motion.div>
                  <div>
                    <motion.h3 
                      className="font-bold text-foreground mb-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-gray-400"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Right - Security Card Visualization */}
          <motion.div
            className="relative h-96 hidden md:flex items-center justify-center"
            initial={{ opacity: 0, x: 100, rotateY: 45 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-700 rounded-3xl"
              animate={{ 
                boxShadow: [
                  '0 0 30px rgba(59, 130, 246, 0.3)',
                  '0 0 60px rgba(59, 130, 246, 0.5)',
                  '0 0 30px rgba(59, 130, 246, 0.3)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Security Card Content */}
            <div className="relative z-10 w-full max-w-sm mx-auto px-8 py-12 text-white space-y-8">
              {/* Transfer Status */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.div 
                  className="flex items-center gap-2 mb-3"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-green-400 rounded-full" 
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-sm font-semibold text-green-200">Transfer Verified</span>
                </motion.div>
                <motion.div 
                  className="text-4xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  $2,450.00
                </motion.div>
                <div className="text-sm text-blue-100">To Chase ****4521 — Completed</div>
              </motion.div>

              {/* Encryption Status */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.div 
                  className="flex items-center gap-2 mb-3"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-green-400 rounded-full" 
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  />
                  <span className="text-sm font-semibold text-green-200">Encryption Active</span>
                </motion.div>
                <div className="flex gap-2">
                  {[
                    { label: 'AES-256', width: '60px' },
                    { label: 'TLS 1.3', width: '70px' },
                    { label: 'SOC 2', width: '50px' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="h-1 bg-green-400 rounded-full"
                      style={{ width: item.width }}
                      animate={{ scaleX: [0.8, 1.2, 0.8], opacity: [1, 0.8, 1] }}
                      transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.2 }}
                    />
                  ))}
                </div>
                <motion.div 
                  className="text-xs text-blue-100 mt-3"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  AES-256 • TLS 1.3 • SOC 2
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
