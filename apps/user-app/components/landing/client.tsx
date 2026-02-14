'use client'

import { motion } from 'framer-motion'

export function Clients() {
  const clients = [
    { name: 'JPMorgan Chase', logo: 'JPM' },
    { name: 'Goldman Sachs', logo: 'GS' },
    { name: 'Vanguard', logo: 'VAN' },
    { name: 'Fidelity', logo: 'FID' },
    { name: 'BlackRock', logo: 'BR' },
    { name: 'Morgan Stanley', logo: 'MS' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="py-16 px-4 bg-background border-y border-border">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.p
          variants={itemVariants}
          className="text-center text-sm text-muted-foreground mb-12 uppercase tracking-wider font-semibold"
        >
          Trusted by leading financial institutions
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center"
            >
              <motion.div
                className="w-20 h-20 rounded-lg bg-secondary border border-border flex items-center justify-center"
                whileHover={{ borderColor: 'hsl(210 100% 56%)' }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-center font-bold text-sm text-primary">
                  {client.logo}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
