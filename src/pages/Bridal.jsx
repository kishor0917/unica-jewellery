import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { bridalCollections, products } from '../data/products';
import ProductCard from '../components/ProductCard';

// One product from each category for a diverse bridal showcase
const bridalProducts = [
  products.find(p => p.id === 1),   // Lumiere Diamond Ring
  products.find(p => p.id === 19),  // Diamond Pendant Necklace
  products.find(p => p.id === 7),   // Bangle Pavé Bracelet
  products.find(p => p.id === 8),   // Chandelier Ruby Earrings
].filter(Boolean);

function HeroBridal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=2000&q=90"
          alt="Bridal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-obsidian/40 to-obsidian" />
      </motion.div>

      <motion.div
        className="relative h-full flex flex-col items-center justify-center text-center px-6"
        style={{ opacity }}
      >
        <motion.p
          className="section-subtitle mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          Bridal Collection
        </motion.p>
        <motion.h1
          className="font-serif text-6xl md:text-8xl text-ivory font-light leading-none mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          For Your<br />
          <span className="italic gold-text">Forever</span>
        </motion.h1>
        <motion.p
          className="font-sans text-sm text-ivory/50 max-w-md tracking-wide leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
        >
          Each engagement ring, wedding band, and bridal set in our collection is a testament to love's enduring beauty.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
        >
          <Link to="/collections?cat=rings" className="btn-gold inline-block mr-4">Shop Rings</Link>
          <Link to="/custom-order" className="btn-outline-gold inline-block">Bespoke Bridal</Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

function BridalCategories() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="section-subtitle mb-4">Curated Edits</p>
        <h2 className="section-title">Every Chapter of Love</h2>
        <span className="gold-line" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bridalCollections.map((col, i) => (
          <motion.div
            key={col.id}
            className="relative overflow-hidden group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
          >
            <div className="aspect-[3/4] overflow-hidden">
              <motion.img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="section-subtitle mb-2">{col.subtitle}</p>
              <h3 className="font-serif text-3xl text-ivory mb-3">{col.title}</h3>
              <p className="font-sans text-xs text-ivory/50 mb-5 leading-relaxed">{col.description}</p>
              <Link to="/collections?cat=rings" className="btn-outline-gold inline-block text-xs py-2">
                Explore
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function BridalProducts() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-[#080f0f]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subtitle mb-4">Featured Bridal</p>
          <h2 className="section-title">Begin With Beauty</h2>
          <span className="gold-line" />
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {bridalProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ConsultationBanner() {
  return (
    <section className="py-32 px-6 text-center bg-[#0d1f1f]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-gold/40 mx-auto mb-8" />
        <p className="section-subtitle mb-5">Private Consultation</p>
        <h2 className="font-serif text-5xl md:text-6xl text-ivory font-light mb-6">
          Your Dream Ring,<br />
          <span className="italic gold-text">Designed for You</span>
        </h2>
        <p className="font-sans text-sm text-ivory/40 max-w-md mx-auto leading-relaxed mb-12">
          Meet with our master jewelers to create a one-of-a-kind engagement ring that tells your unique love story. Complimentary consultation at all UNICA boutiques.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/custom-order" className="btn-gold inline-block">Design Your Ring</Link>
          <Link to="/contact" className="btn-outline-gold inline-block">Book a Consultation</Link>
        </div>
      </motion.div>
    </section>
  );
}

export default function Bridal() {
  return (
    <div className="bg-obsidian">
      <HeroBridal />
      <BridalCategories />
      <BridalProducts />
      <ConsultationBanner />
    </div>
  );
}
