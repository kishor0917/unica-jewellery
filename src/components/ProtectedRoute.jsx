import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// Human-readable page names for the lock screen
const PAGE_NAMES = {
  '/collections':   'Collections',
  '/bridal':        'Bridal',
  '/about':         'About UNICA',
  '/custom-order':  'Bespoke Order',
  '/contact':       'Contact',
  '/wishlist':      'Wishlist',
  '/cart':          'Cart',
  '/order-success': 'Order Confirmation',
};

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const pageName  = PAGE_NAMES[location.pathname] || 'this page';

  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        navigate('/login', { state: { from: location.pathname }, replace: true });
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate, location]);

  if (isLoggedIn) return children;

  // ── Lock screen shown briefly before redirect ──
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-6">
      {/* BG image blur */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=60"
          alt=""
          className="w-full h-full object-cover opacity-8 scale-105 blur-sm"
        />
        <div className="absolute inset-0 bg-obsidian/90" />
      </div>

      <motion.div
        className="relative text-center max-w-md w-full"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Lock icon */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <motion.div
            className="absolute inset-0 rounded-full border border-gold/20"
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-9 h-9 text-gold/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        {/* UNICA logo */}
        <Link to="/" className="inline-block mb-6">
          <span className="font-serif text-2xl tracking-[0.5em] text-ivory/80">UNICA</span>
          <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mt-1" />
        </Link>

        <p className="section-subtitle mb-3">Members Only</p>
        <h2 className="font-serif text-4xl text-ivory font-light mb-3 leading-tight">
          Sign In to Access<br />
          <span className="italic gold-text">{pageName}</span>
        </h2>
        <span className="gold-line" />

        <p className="font-sans text-sm text-ivory/40 mb-8 leading-relaxed">
          Create your UNICA account for exclusive access to our full collection, bespoke services, and private boutique events.
        </p>

        {/* Redirecting indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <motion.div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-gold/50"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </motion.div>
          <span className="font-sans text-[10px] tracking-[0.2em] text-ivory/25 uppercase">Redirecting to sign in</span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/login"
            state={{ from: location.pathname }}
            className="btn-gold inline-block text-center"
          >
            Sign In Now
          </Link>
          <Link to="/" className="btn-outline-gold inline-block text-center">
            Return Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
