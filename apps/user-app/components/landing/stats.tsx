'use client'

import { motion, easeOut } from 'framer-motion'

export function Stats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  }

  const stats = [
    {
      number: '2,500,00+',
      label: '99.9%',
      description: 'Transactions Processed Securely',
    },
    {
      number: '150,00+',
      label: 'Active Users',
      description: 'Growing Daily',
    },
    {
      number: '$500.0M+',
      label: 'Total Volume',
      description: 'Transferred Successfully',
    },
  ]

  return (
    <section id="stats" className="py-20 px-6 bg-white">
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
            BY THE NUMBERS
          </motion.p>
          <motion.h2 
            variants={itemVariants}
            className="text-5xl font-black text-foreground mb-4"
          >
            Trusted by thousands worldwide
          </motion.h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function StatCard({ stat, index }: { stat: any; index: number }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  }

  return (
    <motion.div
      variants={itemVariants}
      className="text-center p-8 rounded-xl bg-gray-200 border border-gray-300/50 hover:border-blue-400/30 transition-colors overflow-hidden group"
      whileHover={{ y: -8, borderColor: 'hsl(217 91% 60%)' }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10">
        <motion.div
          className="text-5xl font-black text-foreground mb-2"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 100, damping: 10 }}
        >
          {stat.number}
        </motion.div>
        <motion.div 
          className="text-2xl font-bold text-blue-500 mb-2"
          animate={{ opacity: [1, 0.8, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {stat.label}
        </motion.div>
        <motion.p 
          className="text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          {stat.description}
        </motion.p>
      </div>
    </motion.div>
  )
}
