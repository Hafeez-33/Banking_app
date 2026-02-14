'use client'

import { motion, cubicBezier } from 'framer-motion'
import { Check } from 'lucide-react'

export function Pricing() {
  const plans = [
    {
      name: 'Starter',
      description: 'For growing fintech teams',
      price: 'Custom',
      features: [
        'API access',
        'Up to 1,000 transactions/month',
        'Email support',
        'Basic documentation',
        'Community forum',
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      description: 'For established platforms',
      price: 'Custom',
      features: [
        'Everything in Starter',
        'Up to 100,000 transactions/month',
        'Priority email & chat support',
        'Advanced reporting',
        'Dedicated account manager',
        'Custom integrations',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      description: 'For large-scale operations',
      price: 'Custom',
      features: [
        'Everything in Professional',
        'Unlimited transactions',
        '24/7 phone & email support',
        'Custom SLA',
        'White-label solutions',
        'On-premise deployment',
      ],
      highlighted: false,
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
      transition: { duration: 0.8, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
    },
  }

  return (
    <section className="py-24 px-4 bg-secondary">
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
            Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
            Flexible plans designed for businesses of all sizes
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -20, transition: { duration: 0.3 } }}
              className={`rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-primary text-primary-foreground shadow-2xl scale-105 md:scale-100 md:border-2 md:border-accent'
                  : 'bg-card border border-border text-foreground'
              }`}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm ${plan.highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                <p className={`text-sm mt-2 ${plan.highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  Contact us for detailed pricing
                </p>
              </div>

              <motion.button
                className={`w-full py-3 rounded-lg font-semibold mb-8 transition-colors ${
                  plan.highlighted
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                    : 'bg-secondary text-foreground hover:bg-muted border border-border'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>

              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: featureIndex * 0.05 }}
                  >
                    <Check
                      size={20}
                      className={plan.highlighted ? 'text-accent' : 'text-accent'}
                    />
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <p className="text-muted-foreground mb-6">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <motion.button
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Trial
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
