'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-r from-primary to-primary/90">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6 leading-tight text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Ready to transform your financial operations?
        </motion.h2>

        <motion.p
          className="text-xl text-primary-foreground/80 mb-12 leading-relaxed text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Join hundreds of financial institutions leveraging FinanceHub to power their operations at scale.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.button
            className="px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold flex items-center gap-2 hover:bg-accent/90 transition-colors"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Access
            <ArrowRight size={20} />
          </motion.button>
          <motion.button
            className="px-8 py-4 text-primary-foreground rounded-full font-semibold hover:bg-primary-foreground/10 transition-colors border border-primary-foreground/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Sales
          </motion.button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 pt-12 border-t border-primary-foreground/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-sm text-primary-foreground/70 mb-8">
            Trusted by leading financial institutions worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {['JPMorgan', 'Goldman Sachs', 'Vanguard', 'Fidelity'].map((company, index) => (
              <motion.div
                key={company}
                className="text-primary-foreground/60 font-semibold text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
