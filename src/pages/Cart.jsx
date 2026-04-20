import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const formatPrice = (p) => `$${p.toLocaleString()}`;

export default function Cart() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const shipping = totalPrice > 0 ? 0 : 0;
  const tax = Math.round(totalPrice * 0.08);
  const total = totalPrice + tax;

  const handleCheckout = () => navigate('/order-success');

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subtitle mb-3">Your Selection</p>
          <h1 className="section-title">Shopping Cart</h1>
          <span className="block w-12 h-px bg-gold/30 mt-4" />
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-8">
              <svg className="w-7 h-7 text-ivory/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl text-ivory mb-4">Your Cart is Empty</h2>
            <p className="font-sans text-sm text-ivory/40 mb-10">Explore our collections and find a piece you'll cherish forever.</p>
            <Link to="/collections" className="btn-gold inline-block">Explore Collections</Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <p className="font-sans text-xs text-ivory/30 tracking-wide">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
                <button
                  onClick={clearCart}
                  className="font-sans text-[10px] tracking-[0.15em] text-ivory/20 hover:text-red-400 transition-colors duration-300 uppercase"
                >
                  Clear Cart
                </button>
              </div>
              <AnimatePresence>
                {cartItems.map(item => (
                  <CartItem key={item.key} item={item} />
                ))}
              </AnimatePresence>

              <div className="mt-8">
                <Link to="/collections" className="font-sans text-xs tracking-[0.2em] text-gold/60 hover:text-gold transition-colors duration-300 uppercase flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Summary */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-card p-8 border border-gold/10 sticky top-28">
                <p className="section-subtitle mb-8">Order Summary</p>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-sans text-xs text-ivory/40 tracking-wide">Subtotal</span>
                    <span className="font-sans text-sm text-ivory">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-xs text-ivory/40 tracking-wide">Shipping</span>
                    <span className="font-sans text-xs text-gold/60 tracking-wide">Complimentary</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-xs text-ivory/40 tracking-wide">Estimated Tax</span>
                    <span className="font-sans text-sm text-ivory">{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="border-t border-gold/15 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="font-sans text-xs tracking-[0.2em] text-ivory/40 uppercase">Total</span>
                    <div className="text-right">
                      <span className="font-serif text-2xl text-ivory">{formatPrice(total)}</span>
                      <p className="font-sans text-[9px] text-ivory/20 mt-0.5">USD</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={handleCheckout}
                  className="btn-gold w-full mb-4"
                  whileHover={{ boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>

                <div className="space-y-3 mt-8">
                  {[
                    'Complimentary worldwide shipping',
                    'Certificate of authenticity included',
                    'Luxury gift packaging',
                    'Free returns within 30 days',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <svg className="w-3 h-3 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-sans text-[10px] text-ivory/30 tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
