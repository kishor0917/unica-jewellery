import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const formatPrice = (p) => `$${p.toLocaleString()}`;

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <p className="section-subtitle mb-4">Your Saved Pieces</p>
          <h1 className="section-title mb-4">Wishlist</h1>
          <span className="gold-line" />
          <p className="font-sans text-xs text-ivory/30">{wishlist.length} {wishlist.length === 1 ? 'piece' : 'pieces'} saved</p>
        </motion.div>

        {wishlist.length === 0 ? (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-8">
              <svg className="w-7 h-7 text-ivory/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl text-ivory mb-4">Your Wishlist is Empty</h2>
            <p className="font-sans text-sm text-ivory/40 mb-10">Discover pieces you love and save them here for later.</p>
            <Link to="/collections" className="btn-gold inline-block">Explore Collections</Link>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {wishlist.map((product, i) => (
                  <motion.div
                    key={product.id}
                    className="group relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="relative overflow-hidden aspect-[3/4] bg-[#111]">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.06 }}
                          transition={{ duration: 0.7 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Remove button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            removeFromWishlist(product.id);
                          }}
                          className="absolute top-3 right-3 w-8 h-8 glass-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-red-400/30"
                        >
                          <svg className="w-3.5 h-3.5 text-ivory/50 hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>

                        {/* Add to cart */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product);
                            }}
                            className="w-full py-2.5 bg-gold text-obsidian font-sans text-xs tracking-[0.15em] uppercase font-medium"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </Link>

                    <div className="pt-4">
                      <p className="font-serif text-base text-ivory">{product.name}</p>
                      <p className="font-sans text-xs text-gold/60 mt-1">{formatPrice(product.price)}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/collections" className="btn-outline-gold inline-block">
                Continue Exploring
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
