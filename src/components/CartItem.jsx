import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const formatPrice = (p) => `$${p.toLocaleString()}`;

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <motion.div
      className="flex gap-6 py-6 border-b border-gold/10"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-24 h-32 flex-shrink-0 overflow-hidden bg-[#111]">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="font-serif text-lg text-ivory">{item.name}</p>
          <div className="flex gap-4 mt-1">
            <span className="font-sans text-[10px] tracking-[0.15em] text-gold/60 uppercase capitalize">
              {item.selectedMetal}
            </span>
            <span className="font-sans text-[10px] tracking-[0.15em] text-gold/60 uppercase capitalize">
              {item.selectedStone}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity */}
          <div className="flex items-center gap-3 border border-gold/20">
            <button
              onClick={() => updateQuantity(item.key, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-ivory/60 hover:text-gold transition-colors duration-200"
            >
              −
            </button>
            <span className="font-sans text-sm text-ivory w-4 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.key, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-ivory/60 hover:text-gold transition-colors duration-200"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-6">
            <p className="font-sans text-sm text-ivory">{formatPrice(item.price * item.quantity)}</p>
            <button
              onClick={() => removeFromCart(item.key)}
              className="font-sans text-[10px] tracking-[0.15em] text-ivory/30 hover:text-red-400 transition-colors duration-300 uppercase"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
