import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const STEPS = ['Type & Style', 'Materials', 'Details', 'Your Info'];

const JEWELRY_TYPES = ['Engagement Ring','Wedding Band','Necklace','Bracelet','Earrings','Pendant','Brooch','Tiara'];
const STYLES       = ['Classic','Art Deco','Modern Minimalist','Vintage','Nature-Inspired','Geometric','Romantic','Architectural'];
const METALS       = ['18k Yellow Gold','18k White Gold','18k Rose Gold','Platinum','Sterling Silver','Palladium'];
const STONES       = ['Diamond','Emerald','Ruby','Sapphire','Pearl','Tanzanite','Aquamarine','No Stone'];
const BUDGETS      = ['$5,000 – $10,000','$10,000 – $25,000','$25,000 – $50,000','$50,000 – $100,000','$100,000+','Open Budget'];

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 font-sans text-[11px] tracking-[0.12em] uppercase border transition-all duration-300 ${
        selected
          ? 'border-gold text-obsidian bg-gold font-medium'
          : 'border-ivory/15 text-ivory/50 hover:border-gold/40 hover:text-ivory/80'
      }`}
    >
      {label}
    </button>
  );
}

function StepDots({ current, total }) {
  return (
    <div className="flex items-center gap-2 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            className={`rounded-full transition-all duration-500 flex items-center justify-center ${
              i < current ? 'w-6 h-6 bg-gold' : i === current ? 'w-6 h-6 border border-gold' : 'w-4 h-4 border border-ivory/20'
            }`}
            layout
          >
            {i < current && (
              <svg className="w-3 h-3 text-obsidian" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {i === current && <div className="w-2 h-2 rounded-full bg-gold" />}
          </motion.div>
          {i < total - 1 && (
            <div className={`h-px w-10 transition-all duration-500 ${i < current ? 'bg-gold/60' : 'bg-ivory/10'}`} />
          )}
        </div>
      ))}
      <span className="ml-3 font-sans text-[10px] tracking-[0.25em] text-ivory/30 uppercase">{STEPS[current]}</span>
    </div>
  );
}

export default function CustomOrder() {
  const [step, setStep]           = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    type: '', style: '', metal: '', stone: '', budget: '',
    occasion: '', timeline: '', details: '',
    name: '', email: '', phone: '',
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const next = () => { setDirection(1);  setStep(s => Math.min(s + 1, STEPS.length - 1)); };
  const prev = () => { setDirection(-1); setStep(s => Math.max(s - 1, 0)); };

  const canNext = () => {
    if (step === 0) return form.type !== '';
    if (step === 1) return form.metal !== '';
    if (step === 2) return form.budget !== '';
    return true;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-6">
        <motion.div
          className="text-center max-w-lg w-full"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated diamond */}
          <div className="relative w-20 h-20 mx-auto mb-10">
            <motion.div
              className="absolute inset-0 rounded-full border border-gold/20"
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-3 rounded-full border border-gold/40"
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 rotate-45" style={{ background: 'linear-gradient(135deg,#D4AF37,#f0d060)' }} />
            </div>
          </div>

          <p className="section-subtitle mb-4">Request Received</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ivory font-light mb-4 leading-tight">
            Your Dream<br /><span className="italic gold-text">Begins Now</span>
          </h2>
          <span className="gold-line" />

          <div className="glass-card border border-gold/10 p-6 mb-8 text-left">
            <p className="section-subtitle mb-4">Your Summary</p>
            <div className="grid grid-cols-2 gap-3">
              {[['Type', form.type], ['Style', form.style], ['Metal', form.metal], ['Stone', form.stone], ['Budget', form.budget], ['Occasion', form.occasion]].filter(([, v]) => v).map(([k, v]) => (
                <div key={k}>
                  <p className="font-sans text-[9px] tracking-[0.2em] text-ivory/25 uppercase">{k}</p>
                  <p className="font-sans text-sm text-ivory/70">{v}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="font-sans text-sm text-ivory/40 leading-relaxed mb-8">
            Our master jewelers will review your request and reach out to <span className="text-gold/70">{form.email || 'you'}</span> within 48 hours to begin your private consultation.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/" className="btn-gold inline-block">Return Home</Link>
            <Link to="/collections" className="btn-outline-gold inline-block">Browse Collections</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const slideVariants = {
    enter:  d => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   d => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Hero */}
      <div className="relative pt-32 pb-16 px-6 text-center overflow-hidden border-b border-gold/10">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?w=1600&q=80" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 to-obsidian" />
        </div>
        <div className="relative">
          <motion.p className="section-subtitle mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            Bespoke Service
          </motion.p>
          <motion.h1 className="section-title mb-4" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Design Your Masterpiece
          </motion.h1>
          <span className="gold-line" />
          <motion.p className="font-sans text-sm text-ivory/40 max-w-md mx-auto" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            Tell us your vision and our master jewelers will bring it to life — just for you.
          </motion.p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <StepDots current={step} total={STEPS.length} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* STEP 0 */}
            {step === 0 && (
              <div>
                <h2 className="font-serif text-3xl text-ivory mb-1">What would you like?</h2>
                <p className="font-sans text-xs text-ivory/30 mb-8 tracking-wide">Choose a jewelry type and style that speaks to you.</p>

                <p className="section-subtitle mb-3">Jewelry Type <span className="text-red-400/70">*</span></p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                  {JEWELRY_TYPES.map(t => <Chip key={t} label={t} selected={form.type === t} onClick={() => set('type', t)} />)}
                </div>

                <p className="section-subtitle mb-3">Style Preference</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {STYLES.map(s => <Chip key={s} label={s} selected={form.style === s} onClick={() => set('style', s)} />)}
                </div>
              </div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <h2 className="font-serif text-3xl text-ivory mb-1">Choose Your Materials</h2>
                <p className="font-sans text-xs text-ivory/30 mb-8 tracking-wide">The finest materials, ethically sourced from around the world.</p>

                <p className="section-subtitle mb-3">Preferred Metal <span className="text-red-400/70">*</span></p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
                  {METALS.map(m => <Chip key={m} label={m} selected={form.metal === m} onClick={() => set('metal', m)} />)}
                </div>

                <p className="section-subtitle mb-3">Center Stone</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {STONES.map(s => <Chip key={s} label={s} selected={form.stone === s} onClick={() => set('stone', s)} />)}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <h2 className="font-serif text-3xl text-ivory mb-1">Tell Us More</h2>
                <p className="font-sans text-xs text-ivory/30 mb-8 tracking-wide">Help us understand your vision, timeline, and investment.</p>

                <p className="section-subtitle mb-3">Budget Range <span className="text-red-400/70">*</span></p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
                  {BUDGETS.map(b => <Chip key={b} label={b} selected={form.budget === b} onClick={() => set('budget', b)} />)}
                </div>

                <div className="space-y-6 mt-2">
                  <div>
                    <label className="font-sans text-[10px] tracking-[0.25em] text-ivory/30 uppercase block mb-2">Occasion</label>
                    <input type="text" placeholder="e.g. Engagement, Anniversary, Birthday" value={form.occasion} onChange={e => set('occasion', e.target.value)} className="input-luxury" />
                  </div>
                  <div>
                    <label className="font-sans text-[10px] tracking-[0.25em] text-ivory/30 uppercase block mb-2">Desired Timeline</label>
                    <input type="text" placeholder="e.g. 3 months, By December 2025" value={form.timeline} onChange={e => set('timeline', e.target.value)} className="input-luxury" />
                  </div>
                  <div>
                    <label className="font-sans text-[10px] tracking-[0.25em] text-ivory/30 uppercase block mb-2">Additional Details</label>
                    <textarea rows={4} placeholder="Describe your vision, inspirations, or any specific requirements..." value={form.details} onChange={e => set('details', e.target.value)} className="input-luxury resize-none" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <h2 className="font-serif text-3xl text-ivory mb-1">Your Contact Details</h2>
                <p className="font-sans text-xs text-ivory/30 mb-8 tracking-wide">We will reach out within 48 hours to begin your private consultation.</p>

                {/* Summary card */}
                <div className="glass-card border border-gold/10 p-5 mb-8">
                  <p className="section-subtitle mb-4">Order Summary</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[['Type', form.type], ['Style', form.style], ['Metal', form.metal], ['Stone', form.stone], ['Budget', form.budget], ['Occasion', form.occasion]].filter(([, v]) => v).map(([k, v]) => (
                      <div key={k}>
                        <p className="font-sans text-[9px] tracking-[0.2em] text-ivory/25 uppercase">{k}</p>
                        <p className="font-sans text-sm text-ivory/70">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="font-sans text-[10px] tracking-[0.25em] text-ivory/30 uppercase block mb-2">Full Name <span className="text-red-400/70">*</span></label>
                    <input type="text" placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} className="input-luxury" required />
                  </div>
                  <div>
                    <label className="font-sans text-[10px] tracking-[0.25em] text-ivory/30 uppercase block mb-2">Email Address <span className="text-red-400/70">*</span></label>
                    <input type="email" placeholder="your@email.com" value={form.email} onChange={e => set('email', e.target.value)} className="input-luxury" required />
                  </div>
                  <div>
                    <label className="font-sans text-[10px] tracking-[0.25em] text-ivory/30 uppercase block mb-2">Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} className="input-luxury" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-gold/10">
          <button
            onClick={prev}
            disabled={step === 0}
            className="flex items-center gap-2 font-sans text-xs tracking-[0.2em] text-ivory/40 hover:text-gold uppercase transition-colors duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {step < STEPS.length - 1 ? (
            <motion.button
              onClick={next}
              disabled={!canNext()}
              className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              whileHover={canNext() ? { boxShadow: '0 0 30px rgba(212,175,55,0.4)' } : {}}
              whileTap={canNext() ? { scale: 0.97 } : {}}
            >
              Continue
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          ) : (
            <motion.button
              onClick={() => {
                if (form.name && form.email) setSubmitted(true);
              }}
              disabled={!form.name || !form.email}
              className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
              whileHover={(form.name && form.email) ? { boxShadow: '0 0 30px rgba(212,175,55,0.4)' } : {}}
              whileTap={(form.name && form.email) ? { scale: 0.97 } : {}}
            >
              Submit Request
            </motion.button>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-px bg-ivory/5 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gold/60"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <p className="font-sans text-[9px] text-ivory/20 mt-2 tracking-[0.15em] uppercase text-right">
          Step {step + 1} of {STEPS.length}
        </p>
      </div>
    </div>
  );
}
