'use client'

import { motion, easeOut } from 'framer-motion'
import { Link2, Send, BarChart3 } from 'lucide-react'

export function HowItWorks() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  }

  const steps = [
    {
      number: '01',
      icon: Link2,
      title: 'Connect Your Bank',
      description: 'Securely link your bank accounts through Plaid\'s trusted integration in seconds.',
    },
    {
      number: '02',
      icon: Send,
      title: 'Transfer or Add Funds',
      description: 'Move money between accounts or add funds to your Rupy Bank balance instantly.',
    },
    {
      number: '03',
      icon: BarChart3,
      title: 'Track in Real Time',
      description: 'Monitor every transaction, view spending insights, and stay in control of your finances.',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-6 bg-white">
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
            HOW IT WORKS
          </motion.p>
          <motion.h2 
            variants={itemVariants}
            className="text-5xl font-black text-foreground mb-4"
          >
            Get started in three simple steps
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Rupy Bank makes banking effortless. Connect, transfer, and track — all in minutes.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="text-center group"
              >
                {/* Icon Container */}
                <motion.div
                  className="flex justify-center mb-8 relative"
                  whileHover={{ scale: 1.12 }}
                >
                  {/* Animated rings behind icon */}
                  <motion.div
                    className="absolute inset-0 bg-blue-500/20 rounded-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-24 h-24 bg-blue-500 rounded-3xl flex items-center justify-center shadow-lg relative z-10 overflow-hidden"
                    variants={iconVariants}
                    whileHover={{ rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <Icon size={48} className="text-white" strokeWidth={1.5} />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Step Label */}
                <motion.p 
                  className="text-blue-500 font-bold text-sm uppercase tracking-widest mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Step {step.number}
                </motion.p>

                {/* Title */}
                <motion.h3 
                  className="text-2xl font-bold text-foreground mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                >
                  {step.title}
                </motion.h3>

                {/* Description */}
                <motion.p 
                  className="text-gray-500 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {step.description}
                </motion.p>

                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-12 right-0 w-12 h-0.5 bg-gradient-to-r from-accent to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    style={{ originX: 0 }}
                  />
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
