import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WishlistButton from './WishlistButton';
import { useCart } from '../context/CartContext';

const formatPrice = (p) => `$${p.toLocaleString()}`;

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image container */}
        <div className="relative overflow-hidden bg-[#111] aspect-[3/4]">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            loading="lazy"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Gold shimmer on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: 'linear-gradient(135deg, transparent 30%, rgba(212,175,55,0.08) 50%, transparent 70%)',
            }}
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span className="font-sans text-[9px] tracking-[0.2em] uppercase bg-gold text-obsidian px-2.5 py-1 font-medium">
                {product.badge}
              </span>
            </div>
          )}

          {/* Wishlist */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <WishlistButton product={product} />
          </div>

          {/* Quick add */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="w-full py-3 bg-gold text-obsidian font-sans text-xs tracking-[0.2em] uppercase font-medium hover:bg-gold-light transition-colors duration-300"
            >
              Add to Cart
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="pt-4 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-serif text-lg text-ivory leading-tight">{product.name}</p>
              <p className="font-sans text-[10px] tracking-[0.2em] text-gold/60 uppercase mt-0.5 capitalize">{product.category}</p>
            </div>
            <div className="text-right">
              <p className="font-sans text-sm text-ivory">{formatPrice(product.price)}</p>
              {product.originalPrice && (
                <p className="font-sans text-[10px] text-ivory/30 line-through">{formatPrice(product.originalPrice)}</p>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-ivory/20'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-sans text-[9px] text-ivory/30">({product.reviews})</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
