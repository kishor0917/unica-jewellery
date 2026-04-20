import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import ProductGrid from '../components/ProductGrid';

const CATEGORIES = ['all', 'rings', 'necklaces', 'bracelets', 'earrings'];

// ─── STRICT material filter rules ───────────────────────────────────────────
// gold     → metal array must contain 'gold' OR 'rose-gold'      (warm metal)
// silver   → metal array must contain 'silver'                    (cool/silver)
// platinum → metal array must contain 'platinum'                  (white metal)
// diamond  → stone array must contain 'diamond'                   (gemstone)
function matchesMaterial(p, mat) {
  if (mat === 'all')      return true;
  if (mat === 'gold')     return p.metal.some(m => m === 'gold' || m === 'rose-gold');
  if (mat === 'silver')   return p.metal.includes('silver');
  if (mat === 'platinum') return p.metal.includes('platinum');
  if (mat === 'diamond')  return (p.stone || []).includes('diamond');
  return true;
}

const MATS = [
  { id: 'all',      label: 'All',        icon: '✦', activeClass: 'bg-gold/15 border-gold text-gold', dotClass: 'bg-ivory/30' },
  { id: 'gold',     label: '18K Gold',   icon: '◈', activeClass: 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]', dotClass: 'bg-[#D4AF37]' },
  { id: 'silver',   label: 'Silver',     icon: '◇', activeClass: 'bg-slate-300/15 border-slate-300 text-slate-200', dotClass: 'bg-slate-300' },
  { id: 'platinum', label: 'Platinum',   icon: '◆', activeClass: 'bg-slate-200/10 border-slate-300 text-slate-300', dotClass: 'bg-slate-300' },
  { id: 'diamond',  label: 'Diamond',    icon: '◉', activeClass: 'bg-sky-200/10 border-sky-300 text-sky-200',   dotClass: 'bg-sky-300' },
];

export default function Collections() {
  const [searchParams] = useSearchParams();
  const [cat,  setCat]  = useState(() => { const c = searchParams.get('cat') || 'all'; return CATEGORIES.includes(c) ? c : 'all'; });
  const [mat,  setMat]  = useState('all');
  const [sort, setSort] = useState('featured');

  useEffect(() => { const c = searchParams.get('cat') || 'all'; if (CATEGORIES.includes(c)) setCat(c); }, [searchParams]);

  const filtered = useMemo(() => {
    let list = products.filter(p => (cat === 'all' || p.category === cat) && matchesMaterial(p, mat));
    if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating')     list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, mat, sort]);

  const count = (m) => products.filter(p => (cat === 'all' || p.category === cat) && matchesMaterial(p, m)).length;

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Page header */}
      <div className="relative py-20 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=70" alt="" className="w-full h-full object-cover opacity-12" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/80 to-obsidian" />
        </div>
        <motion.div className="relative px-6" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p className="section-subtitle mb-4">UNICA</p>
          <h1 className="section-title mb-4">The Collections</h1>
          <span className="gold-line" />
          <p className="font-sans text-sm text-ivory/40 max-w-md mx-auto">Each piece is an expression of artistry — handcrafted in our Florence atelier.</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">

        {/* ─── Sticky filter bar ─────────────────────────────── */}
        <div className="sticky top-[68px] z-30 bg-obsidian/97 backdrop-blur-xl border-b border-gold/10 -mx-6 lg:-mx-12 px-6 lg:px-12 py-4 mb-10 space-y-4">

          {/* Row 1: Category + Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-0.5 border border-gold/10 p-0.5">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  className={`relative px-4 py-1.5 font-sans text-[10px] tracking-[0.22em] uppercase transition-all duration-300 ${cat === c ? 'text-obsidian' : 'text-ivory/35 hover:text-gold'}`}
                >
                  {cat === c && <motion.div className="absolute inset-0 bg-gold" layoutId="catPill" transition={{ type: 'spring', stiffness: 320, damping: 32 }} />}
                  <span className="relative z-10">{c}</span>
                </button>
              ))}
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="bg-transparent border border-gold/15 text-ivory/45 font-sans text-[10px] tracking-[0.15em] px-4 py-1.5 outline-none hover:border-gold/35 transition-colors cursor-pointer"
            >
              <option value="featured"   className="bg-obsidian">Featured</option>
              <option value="price-asc"  className="bg-obsidian">Price: Low to High</option>
              <option value="price-desc" className="bg-obsidian">Price: High to Low</option>
              <option value="rating"     className="bg-obsidian">Best Rated</option>
            </select>
          </div>

          {/* Row 2: Material filter with strict matching */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-[9px] tracking-[0.3em] text-ivory/20 uppercase mr-1 hidden sm:block">Material</span>
            {MATS.map(m => {
              const isActive = mat === m.id;
              const n = count(m.id);
              return (
                <button key={m.id} onClick={() => setMat(m.id)}
                  className={`flex items-center gap-2 px-4 py-1.5 border font-sans text-[10px] tracking-[0.12em] uppercase transition-all duration-300 ${
                    isActive ? m.activeClass + ' shadow-[0_0_14px_rgba(212,175,55,0.18)]' : 'border-ivory/10 text-ivory/30 hover:border-ivory/30 hover:text-ivory/65'
                  }`}
                >
                  {/* Colored dot */}
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? m.dotClass : 'bg-ivory/15'}`} />
                  {m.label}
                  <span className={`text-[9px] ${isActive ? 'opacity-70' : 'text-ivory/15'}`}>({n})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active pills + count */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="font-sans text-[10px] tracking-[0.2em] text-ivory/20 uppercase">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </span>
          {cat !== 'all' && (
            <button onClick={() => setCat('all')} className="flex items-center gap-1.5 font-sans text-[9px] tracking-[0.15em] uppercase text-gold/60 border border-gold/20 px-2.5 py-1 hover:border-gold/50 transition-all">
              {cat} <span>×</span>
            </button>
          )}
          {mat !== 'all' && (
            <button onClick={() => setMat('all')} className="flex items-center gap-1.5 font-sans text-[9px] tracking-[0.15em] uppercase text-gold/60 border border-gold/20 px-2.5 py-1 hover:border-gold/50 transition-all">
              {MATS.find(m => m.id === mat)?.label} <span>×</span>
            </button>
          )}
          {(cat !== 'all' || mat !== 'all') && (
            <button onClick={() => { setCat('all'); setMat('all'); setSort('featured'); }} className="font-sans text-[9px] text-ivory/15 hover:text-ivory/50 uppercase tracking-wide transition-colors">
              Clear all
            </button>
          )}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={cat + mat + sort}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {filtered.length === 0 ? (
              <div className="text-center py-28">
                <div className="w-14 h-14 rounded-full border border-gold/15 flex items-center justify-center mx-auto mb-6">
                  <span className="text-gold/30 text-xl">{MATS.find(m => m.id === mat)?.icon}</span>
                </div>
                <h3 className="font-serif text-2xl text-ivory mb-3">No pieces found</h3>
                <p className="font-sans text-sm text-ivory/30 mb-8">No {MATS.find(m => m.id === mat)?.label || ''} {cat !== 'all' ? cat : 'jewelry'} with the current filters.</p>
                <button onClick={() => { setCat('all'); setMat('all'); }} className="btn-outline-gold text-xs">Clear Filters</button>
              </div>
            ) : (
              <ProductGrid products={filtered} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
