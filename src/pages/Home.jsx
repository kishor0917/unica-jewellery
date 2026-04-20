import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const categories = [
  { label: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85', to: '/collections?cat=rings' },
  { label: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=85', to: '/collections?cat=necklaces' },
  { label: 'Bracelets', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=85', to: '/collections?cat=bracelets' },
  { label: 'Earrings', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=85', to: '/collections?cat=earrings' },
];

function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale, y }}>
        <img
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=2000&q=90"
          alt="UNICA Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/50 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ opacity }}
      >
        <motion.p
          className="section-subtitle mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Est. 1987 · Florence, Italy
        </motion.p>

        <motion.h1
          className="font-serif text-6xl md:text-8xl lg:text-[9rem] text-ivory font-light leading-[0.9] mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ letterSpacing: '-0.02em' }}
        >
          Timeless
          <br />
          <span className="italic gold-text">Brilliance</span>
        </motion.h1>

        <motion.p
          className="font-sans text-sm text-ivory/60 tracking-[0.2em] uppercase mb-12 max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
        >
          Exceptional jewelry for the extraordinary
        </motion.p>

        <motion.div
          className="flex gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 1 }}
        >
          <Link to="/collections" className="btn-gold inline-block">
            Explore Collection
          </Link>
          <Link to="/custom-order" className="btn-outline-gold inline-block">
            Bespoke
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <span className="font-sans text-[9px] tracking-[0.3em] text-ivory/30 uppercase">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}

function CategoryStrip() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="section-subtitle mb-4">The Collections</p>
        <h2 className="section-title">Crafted for Every Occasion</h2>
        <span className="gold-line" />
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={cat.to} className="group block relative overflow-hidden aspect-[3/4]">
              <motion.img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-serif text-2xl text-ivory mb-1">{cat.label}</p>
                <p className="font-sans text-[10px] tracking-[0.25em] text-gold/70 uppercase flex items-center gap-2">
                  Explore <span className="text-lg">→</span>
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturedSection() {
  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-subtitle mb-4">Curated for You</p>
          <h2 className="section-title">Featured Pieces</h2>
          <span className="gold-line" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/collections" className="btn-outline-gold inline-block">
            View All Pieces
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function EditorialSection() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Image */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=90"
            alt="Bridal Collection"
            className="w-full h-full object-cover min-h-[500px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-obsidian/60" />
        </motion.div>

        {/* Content */}
        <motion.div
          className="flex items-center px-12 lg:px-20 py-16 bg-[#0d1f1f]"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="section-subtitle mb-6">The Bridal Edit</p>
            <h2 className="font-serif text-5xl lg:text-6xl text-ivory font-light leading-tight mb-6">
              For Your Most<br />
              <span className="italic text-gold">Precious</span> Chapter
            </h2>
            <span className="block w-12 h-px bg-gold/40 mb-6" />
            <p className="font-sans text-sm text-ivory/50 leading-relaxed mb-10 max-w-sm">
              From the first promise to the eternal bond, UNICA's bridal collection captures the emotion of your most significant moments in exceptional jewelry.
            </p>
            <Link to="/bridal" className="btn-gold inline-block">
              Explore Bridal
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CraftsmanshipBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={ref} className="relative py-40 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=2000&q=90"
          alt="Craftsmanship"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-obsidian/70" />
      </motion.div>
      <div className="relative text-center px-6">
        <motion.p
          className="section-subtitle mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Craft
        </motion.p>
        <motion.h2
          className="font-serif text-5xl md:text-7xl text-ivory font-light leading-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          Every Piece Tells<br />
          <span className="italic gold-text">Your Story</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link to="/about" className="btn-outline-gold inline-block">
            Our Heritage
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-obsidian">
      <HeroSection />
      <CategoryStrip />
      <FeaturedSection />
      <EditorialSection />
      <CraftsmanshipBanner />
    </div>
  );
}
