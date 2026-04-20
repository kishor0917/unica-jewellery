import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const orderNumber = `UN-${Math.floor(100000 + Math.random() * 900000)}`;

export default function OrderSuccess() {
  const { cartItems, totalPrice, clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  const estimatedDelivery = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  })();

  return (
    <div className="min-h-screen bg-obsidian pt-20 flex items-center">
      <div className="max-w-4xl mx-auto px-6 py-24 w-full">
        {/* Animated ring */}
        <div className="flex justify-center mb-12">
          <div className="relative w-24 h-24">
            <motion.div
              className="absolute inset-0 rounded-full border border-gold/20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-gold/30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.svg
                className="w-10 h-10 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut' }}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.2}
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              </motion.svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-subtitle mb-4">Confirmed</p>
          <h1 className="font-serif text-5xl md:text-6xl text-ivory font-light leading-tight mb-4">
            Your UNICA Order Has Been<br />
            <span className="italic gold-text">Placed Successfully</span>
          </h1>
          <span className="gold-line" />
          <p className="font-sans text-sm text-ivory/40 max-w-md mx-auto">
            Thank you for choosing UNICA. Your order will be handled with the utmost care and discretion.
          </p>
        </motion.div>

        {/* Order details */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {[
            { label: 'Order Number', value: orderNumber },
            { label: 'Estimated Delivery', value: estimatedDelivery },
            { label: 'Shipping', value: 'Complimentary Express' },
          ].map(item => (
            <div key={item.label} className="glass-card border border-gold/10 p-6 text-center">
              <p className="font-sans text-[10px] tracking-[0.25em] text-ivory/30 uppercase mb-2">{item.label}</p>
              <p className="font-serif text-lg text-ivory">{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Promises */}
        <motion.div
          className="border border-gold/10 p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
        >
          <p className="section-subtitle mb-6 text-center">What to Expect</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: '📦', title: 'Signature Packaging', desc: 'Your piece arrives in our iconic black and gold gift box, wrapped in silk.' },
              { icon: '🔒', title: 'Insured Delivery', desc: 'Fully insured shipping with real-time tracking and discreet packaging.' },
              { icon: '📜', title: 'Certificate of Authenticity', desc: 'Your GIA certificate and UNICA provenance document arrive with your piece.' },
              { icon: '💌', title: 'Handwritten Note', desc: 'A personal note from our atelier — because every piece deserves a story.' },
            ].map(item => (
              <div key={item.title} className="flex gap-4">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-serif text-base text-ivory mb-1">{item.title}</p>
                  <p className="font-sans text-xs text-ivory/35 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link to="/collections" className="btn-gold inline-block text-center">
            Continue Shopping
          </Link>
          <Link to="/contact" className="btn-outline-gold inline-block text-center">
            Contact Boutique
          </Link>
        </motion.div>

        {/* Brand line */}
        <motion.p
          className="text-center font-sans text-[10px] tracking-[0.3em] text-ivory/15 uppercase mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          UNICA — Timeless Brilliance — Est. 1987
        </motion.p>
      </div>
    </div>
  );
}
