'use client'

import { motion } from 'framer-motion'
import { Database, Shield, Zap } from 'lucide-react'
import { easeOut } from 'framer-motion'

export function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Automated Execution',
      description: 'Streamline fixed income trading with automated execution and real-time settlement.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Create custom risk policies, monitor open orders, and take action with confidence.'
    },
    {
      icon: Database,
      title: 'Custom Strategies',
      description: 'Build ladders, automate reinvestment & rebalancing, and execute complex strategies.'
    },
  ]

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
      transition: { duration: 0.8, ease: easeOut },
    },
  }

  return (
    <section className="py-24 px-4 bg-background">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6 text-balance">
            Key Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
            Powerful tools built for financial institutions and enterprises
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
              >
                <motion.div
                  className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="text-accent" size={28} />
                </motion.div>

                <h3 className="text-xl font-bold text-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <motion.div
                  className="mt-6 h-1 bg-accent rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
        >
          {[
            { value: '$3T+', label: 'Assets Under Management' },
            { value: '500+', label: 'Enterprise Clients' },
            { value: '99.99%', label: 'Uptime Guarantee' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div className="text-4xl font-bold text-accent mb-2">
                {stat.value}
              </motion.div>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
