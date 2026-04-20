import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const milestones = [
  { year: '1987', title: 'The Beginning', desc: 'Founded in Florence by master jeweler Lorenzo Conti, UNICA opens its first atelier on Via della Vigna Nuova.' },
  { year: '1994', title: 'Royal Commission', desc: 'UNICA creates a bespoke tiara for European royalty, cementing its place in the world of haute joaillerie.' },
  { year: '2003', title: 'Paris Boutique', desc: 'Our iconic Place Vendôme boutique opens, bringing Florentine craftsmanship to the heart of Parisian luxury.' },
  { year: '2012', title: 'Global Recognition', desc: 'Named "World\'s Most Innovative Jeweler" by the International Gemological Society.' },
  { year: '2019', title: 'New York', desc: 'UNICA arrives at 725 Fifth Avenue, introducing America to the art of Italian fine jewelry.' },
  { year: '2024', title: 'The Future', desc: 'Embracing sustainable luxury — traceable gemstones and carbon-neutral atelier operations.' },
];

const values = [
  { title: 'Provenance', desc: 'Every gemstone is ethically sourced and fully traceable from mine to masterpiece.' },
  { title: 'Craftsmanship', desc: 'Over 200 hours of hand-labor go into each UNICA creation, by artisans trained in Renaissance techniques.' },
  { title: 'Exclusivity', desc: 'We produce a limited number of pieces each year, ensuring every item remains truly exceptional.' },
  { title: 'Legacy', desc: 'UNICA jewelry is designed to be cherished across generations, an heirloom from the moment it\'s created.' },
];

function HeroAbout() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section ref={ref} className="relative h-[70vh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?w=2000&q=90"
          alt="Craftsmanship"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 to-obsidian" />
      </motion.div>
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p className="section-subtitle mb-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}>
          Est. 1987 · Florence
        </motion.p>
        <motion.h1 className="section-title mb-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
          The House of UNICA
        </motion.h1>
        <span className="gold-line" />
        <motion.p className="font-sans text-sm text-ivory/50 max-w-lg leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }}>
          Born from a passion for beauty and a reverence for craft, UNICA is where heritage meets innovation.
        </motion.p>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=90"
              alt="Atelier"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#0d1f1f] p-6 flex flex-col justify-center">
              <p className="font-serif text-5xl text-gold mb-1">37</p>
              <p className="font-sans text-[10px] tracking-[0.2em] text-ivory/40 uppercase">Years of Excellence</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-subtitle mb-6">Our Story</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-ivory font-light leading-tight mb-6">
            Where Tradition<br />
            <span className="italic gold-text">Meets Mastery</span>
          </h2>
          <span className="block w-12 h-px bg-gold/40 mb-8" />
          <div className="space-y-5">
            <p className="font-sans text-sm text-ivory/50 leading-relaxed">
              In 1987, Lorenzo Conti walked away from a promising career in architecture to pursue his true calling — the creation of jewelry that would outlast generations. He opened a small atelier on Via della Vigna Nuova in Florence, surrounded by the greatest artistic heritage in human history.
            </p>
            <p className="font-sans text-sm text-ivory/50 leading-relaxed">
              Drawing inspiration from Botticelli, Michelangelo, and the Renaissance masters, Lorenzo developed a philosophy of jewelry-making rooted in mathematical precision and sculptural beauty. Every piece had to be perfect — not merely to the eye, but under the jeweler's loupe.
            </p>
            <p className="font-sans text-sm text-ivory/50 leading-relaxed">
              Today, the third generation of Conti artisans continues this tradition, blending time-honored techniques with contemporary vision to create jewelry that speaks across time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ValuesSection() {
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
          <p className="section-subtitle mb-4">Our Principles</p>
          <h2 className="section-title">What We Stand For</h2>
          <span className="gold-line" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="border-t border-gold/20 pt-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
            >
              <p className="font-sans text-[10px] tracking-[0.3em] text-gold uppercase mb-4">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-serif text-2xl text-ivory mb-4">{v.title}</h3>
              <p className="font-sans text-xs text-ivory/40 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subtitle mb-4">Our Journey</p>
          <h2 className="section-title">A Legacy of Excellence</h2>
          <span className="gold-line" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-16 top-0 bottom-0 w-px bg-gold/10 hidden md:block" />
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className="flex gap-8 items-start"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex-shrink-0 w-16 text-right">
                  <span className="font-serif text-xl text-gold">{m.year}</span>
                </div>
                <div className="relative flex-shrink-0 w-8 hidden md:flex items-center justify-center pt-2">
                  <div className="w-2 h-2 rounded-full bg-gold ring-4 ring-gold/10 relative z-10" />
                </div>
                <div className="pb-6 border-b border-gold/5 flex-1">
                  <h3 className="font-serif text-xl text-ivory mb-2">{m.title}</h3>
                  <p className="font-sans text-xs text-ivory/40 leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CraftBanner() {
  return (
    <section className="relative py-32 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=2000&q=90"
        alt="Craft"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian" />
      <div className="relative max-w-3xl mx-auto text-center px-6">
        <motion.blockquote
          className="font-serif text-3xl md:text-5xl text-ivory italic leading-tight font-light mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          "A jewel is a thing of joy forever — it must be made to last beyond the maker, beyond time itself."
        </motion.blockquote>
        <motion.p
          className="font-sans text-xs tracking-[0.3em] text-gold/60 uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          — Lorenzo Conti, Founder
        </motion.p>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link to="/collections" className="btn-gold inline-block">Discover Our Work</Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="bg-obsidian">
      <HeroAbout />
      <StorySection />
      <ValuesSection />
      <Timeline />
      <CraftBanner />
    </div>
  );
}
