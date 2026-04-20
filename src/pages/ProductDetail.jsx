import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import WishlistButton from '../components/WishlistButton';
import { useCart } from '../context/CartContext';

const formatPrice = (p) => `$${p.toLocaleString()}`;

const metalOptions = ['gold', 'silver', 'platinum', 'rose-gold'];
const stoneOptions = ['diamond', 'emerald', 'ruby', 'sapphire', 'pearl'];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === parseInt(id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState(product?.metal[0] || 'gold');
  const [selectedStone, setSelectedStone] = useState(product?.stone[0] || 'diamond');
  const [addedPulse, setAddedPulse] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="text-center">
          <p className="section-subtitle mb-4">404</p>
          <h1 className="section-title mb-8">Piece Not Found</h1>
          <Link to="/collections" className="btn-gold inline-block">Back to Collections</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, { metal: selectedMetal, stone: selectedStone });
    setAddedPulse(true);
    setTimeout(() => setAddedPulse(false), 1200);
  };

  const availableMetals = metalOptions.filter(m => product.metal.includes(m));
  const availableStones = stoneOptions.filter(s => product.stone.includes(s));

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center gap-3 font-sans text-[10px] tracking-[0.2em] text-ivory/30 uppercase">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-gold transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-gold/60">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Main Image */}
            <div className="relative overflow-hidden bg-[#0d1414] aspect-square mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>

              {/* Certificate badge */}
              {product.certified && (
                <div className="absolute top-4 left-4 glass-card px-3 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
                  <span className="font-sans text-[9px] tracking-[0.2em] text-gold uppercase">Certified Authentic</span>
                </div>
              )}

              {/* Wishlist */}
              <div className="absolute top-4 right-4">
                <WishlistButton product={product} />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative overflow-hidden aspect-square transition-all duration-300 ${
                    selectedImage === i ? 'ring-1 ring-gold ring-offset-2 ring-offset-obsidian' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {product.badge && (
              <span className="inline-block font-sans text-[9px] tracking-[0.25em] uppercase bg-gold text-obsidian px-3 py-1 mb-4 self-start font-medium">
                {product.badge}
              </span>
            )}

            <h1 className="font-serif text-4xl lg:text-5xl text-ivory font-light leading-tight mb-2">
              {product.name}
            </h1>

            <p className="font-sans text-[10px] tracking-[0.25em] text-gold/60 uppercase mb-6 capitalize">
              {product.category}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-ivory/15'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-sans text-xs text-ivory/40">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 mb-8 pb-8 border-b border-gold/10">
              <span className="font-serif text-3xl text-ivory">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="font-sans text-sm text-ivory/25 line-through mb-1">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Description */}
            <p className="font-sans text-sm text-ivory/50 leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Metal Selector */}
            <div className="mb-8">
              <p className="font-sans text-[10px] tracking-[0.25em] text-ivory/40 uppercase mb-3">
                Metal — <span className="text-gold capitalize">{selectedMetal}</span>
              </p>
              <div className="flex gap-2">
                {availableMetals.map(m => (
                  <button
                    key={m}
                    onClick={() => setSelectedMetal(m)}
                    className={`px-4 py-2 font-sans text-[10px] tracking-[0.15em] uppercase border transition-all duration-300 capitalize ${
                      selectedMetal === m
                        ? 'border-gold text-gold bg-gold/10'
                        : 'border-ivory/10 text-ivory/40 hover:border-ivory/30'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Stone Selector */}
            <div className="mb-10">
              <p className="font-sans text-[10px] tracking-[0.25em] text-ivory/40 uppercase mb-3">
                Stone — <span className="text-gold capitalize">{selectedStone}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {availableStones.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedStone(s)}
                    className={`px-4 py-2 font-sans text-[10px] tracking-[0.15em] uppercase border transition-all duration-300 capitalize ${
                      selectedStone === s
                        ? 'border-gold text-gold bg-gold/10'
                        : 'border-ivory/10 text-ivory/40 hover:border-ivory/30'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              onClick={handleAddToCart}
              className={`w-full py-4 font-sans text-sm tracking-[0.25em] uppercase font-medium transition-all duration-500 relative overflow-hidden ${
                addedPulse ? 'bg-emerald-deep text-gold' : 'bg-gold text-obsidian hover:bg-gold-light'
              }`}
              whileTap={{ scale: 0.98 }}
              animate={addedPulse ? { boxShadow: ['0 0 0px rgba(212,175,55,0)', '0 0 40px rgba(212,175,55,0.5)', '0 0 0px rgba(212,175,55,0)'] } : {}}
              transition={{ duration: 0.6 }}
            >
              {addedPulse ? '✓ Added to Cart' : 'Add to Cart'}
            </motion.button>

            <button
              onClick={() => { handleAddToCart(); navigate('/cart'); }}
              className="w-full mt-3 py-4 font-sans text-sm tracking-[0.25em] uppercase font-light border border-gold/30 text-gold hover:bg-gold/5 transition-all duration-300"
            >
              Buy Now
            </button>

            {/* Features */}
            <div className="mt-10 pt-8 border-t border-gold/10">
              <p className="section-subtitle mb-5">Details</p>
              <ul className="space-y-3">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                    <span className="font-sans text-xs text-ivory/50 tracking-wide">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certificate */}
            {product.certified && (
              <div className="mt-6 glass-card p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans text-xs text-gold tracking-wide">Certificate of Authenticity</p>
                  <p className="font-sans text-[10px] text-ivory/30 tracking-wide mt-0.5">GIA Certified · UNICA Provenance Guarantee</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">You May Also Love</p>
            <h2 className="font-serif text-3xl text-ivory font-light">Similar Pieces</h2>
            <span className="gold-line" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Link to={`/product/${p.id}`} className="group block">
                  <div className="relative overflow-hidden aspect-square bg-[#111] mb-3">
                    <motion.img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.7 }}
                    />
                  </div>
                  <p className="font-serif text-sm text-ivory">{p.name}</p>
                  <p className="font-sans text-xs text-gold/60 mt-1">{formatPrice(p.price)}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
