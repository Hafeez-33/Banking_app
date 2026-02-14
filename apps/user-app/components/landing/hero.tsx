'use client'

import { motion, easeOut } from 'framer-motion'
import { ArrowRight, TrendingUp, Users, Zap } from 'lucide-react'
import { useParallax } from '@/hooks/use-scroll-animation'
// import {useNavigate} from 'next/link';
import { useRouter } from 'next/navigation'
export function Hero() {
  const { ref: parallaxRef, offset } = useParallax(0.3)

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

  const floatingVariants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -15, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  }

  const router = useRouter();

  return (
    <section className="pt-32 pb-16 md:pb-24 px-6 bg-gradient-to-b from-background to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-7xl font-black leading-tight text-foreground"
            >
              Smart Banking <br />
              <span className="text-blue-500">Made Simple</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-500 leading-relaxed max-w-md"
            >
              Transfer money instantly, track balances in real time, and manage multiple bank accounts — all from one secure dashboard.
            </motion.p>

            <motion.p 
              variants={itemVariants}
              className="text-sm text-gray-500 leading-relaxed max-w-md"
            >
              Powered by Plaid and Dwolla, Rupy Bank connects to 10,000+ financial institutions so you can move money faster, smarter, and safer.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-4 pt-4"
            >
              <motion.button
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-400/90 cursor-pointer transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>{
                  router.push("/sign-up");
                }}
              >
                Get  Started <ArrowRight size={18} />
              </motion.button>
              <motion.button
                className="text-foreground font-semibold hover:text-blue-400 cursor-pointer transition-colors"
                whileHover={{ x: 5 }}
                onClick={()=>{
                  router.push("/sign-in");
                }}
              >
                Sign In
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              variants={itemVariants}
              className="space-y-4 pt-8"
            >
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: '🔒', label: 'Bank-grade security' },
                  { icon: '✓', label: 'No hidden fees' },
                  { icon: '🛡️', label: 'FDIC insured' },
                  { icon: '⏰', label: '24/7 support' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 pt-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <span className="font-semibold text-gray-600">4.9/5</span>
                <span className="text-gray-500">from 2,400+ reviews</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Professional Dashboard Mockup */}
          <div
            ref={parallaxRef}
            className="relative h-[500px] hidden md:block perspective"
          >
            {/* Background gradient container */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl"
              animate={{ 
                y: offset,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            />
            
            {/* Main Dashboard - Laptop/Screen Mockup */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ perspective: '1200px' }}
            >
              {/* Laptop frame mockup */}
              <motion.div
                className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
                whileHover={{ y: -10 }}
                variants={floatingVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Dashboard Content */}
                <div className="bg-white p-6 space-y-1">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-xs font-bold text-accent uppercase tracking-wider">FINTECH</p>
                      <p className="text-sm text-muted-foreground mt-1">Account Balance</p>
                    </div>
                    <motion.div 
                      className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-accent to-blue-600 rounded-full" />
                      <span className="text-xs font-semibold text-foreground">Rafael N109</span>
                    </motion.div>
                  </div>

                  {/* Main Balance */}
                  <div>
                    <p className="text-5xl font-black text-foreground">$12,450.00</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="text-xs text-muted-foreground">6 months</div>
                      <select className="text-xs bg-transparent border border-gray-300 rounded px-2 py-1 text-foreground">
                        <option>6 months</option>
                      </select>
                    </div>
                  </div>

                  {/* Chart Area */}
                  <motion.div 
                    className="h-32 bg-gradient-to-b from-blue-50 to-white rounded-xl p-4 relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.01" />
                        </linearGradient>
                      </defs>
                      <polyline
                        points="0,60 30,50 60,45 90,40 120,35 150,30 180,25 210,20 240,15 270,10 300,5"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                      />
                      <polygon
                        points="0,60 30,50 60,45 90,40 120,35 150,30 180,25 210,20 240,15 270,10 300,5 300,100 0,100"
                        fill="url(#chartGradient)"
                      />
                    </svg>
                  </motion.div>

                  {/* Recent Transactions */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-foreground uppercase">Recent Transactions</p>
                    {[
                      { name: 'Boost by', amount: '+$1000', color: 'bg-green-100', textColor: 'text-green-600' },
                      { name: 'Bank report', amount: '-$2500.00', color: 'bg-red-100', textColor: 'text-red-600' },
                      { name: 'Food taken', amount: '+$35', color: 'bg-blue-100', textColor: 'text-blue-600' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <div className={`w-8 h-8 rounded-lg ${item.color}`} />
                        <div>
                          <p className="text-xs font-semibold text-foreground">{item.name}</p>
                        </div>
                        <p className={`text-xs font-bold ${item.textColor}`}>{item.amount}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bank Cards */}
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-foreground uppercase mb-1">Connected Cards</p>
                    <div className="flex gap-2">
                      {[
                        { name: 'Zentered', amount: '$12,450.00', color: 'from-blue-600 to-blue-800' },
                        { name: 'Bankco', amount: '$7,550.00', color: 'from-gray-300 to-gray-400' },
                        { name: 'Bankco', amount: '$12,450.00', color: 'from-blue-800 to-indigo-900' },
                      ].map((card, i) => (
                        <motion.div
                          key={i}
                          className={`flex-1 h-12 bg-gradient-to-br ${card.color} rounded-lg p-2 text-white text-xs flex flex-col justify-between`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          whileHover={{ scale: 1.05, y: -3 }}
                        >
                          <span className="font-semibold text-xs">{card.name}</span>
                          <span className="text-xs font-bold">{card.amount}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Trusted By Section */}
        <motion.div
          className="mt-15 pt-12 border-t border-gray-300 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
            TRUSTED BY TEAMS AT LEADING FINANCIAL INSTITUTIONS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {['JPMorgan', 'Goldman Sachs', 'Stripe', 'Plaid', 'Dwolla'].map((company) => (
              <motion.div
                key={company}
                className="text-lg font-semibold text-gray-400 hover:text-black transition-colors cursor-pointer"
                whileHover={{ scale: 1.1 }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
