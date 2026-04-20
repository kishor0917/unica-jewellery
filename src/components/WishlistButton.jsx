import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistButton({ product, className = '' }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [burst, setBurst] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (!wishlisted) {
      setBurst(true);
      setTimeout(() => setBurst(false), 600);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full glass-card transition-all duration-300 ${className}`}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
    >
      <AnimatePresence>
        {burst && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-gold"
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i / 6) * 2 * Math.PI) * 20,
                  y: Math.sin((i / 6) * 2 * Math.PI) * 20,
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill={wishlisted ? '#D4AF37' : 'none'}
        viewBox="0 0 24 24"
        stroke={wishlisted ? '#D4AF37' : 'rgba(248,245,240,0.7)'}
        strokeWidth={1.5}
        animate={wishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </motion.svg>
    </motion.button>
  );
}
