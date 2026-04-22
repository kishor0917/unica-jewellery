import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const locations = [
  { city: 'Mumbai', country: 'India', address: 'The Taj Mahal Palace, Apollo Bunder', zip: 'Mumbai 400 001, India', phone: '+91 22 6665 3366', hours: 'Mon–Sat 10:00–20:00', email: 'mumbai@unica.com', flag: '🇮🇳', isNew: true },
  { city: 'Florence', country: 'Italy', address: 'Via della Vigna Nuova, 18', zip: '50123 Florence, Italy', phone: '+39 055 123 4567', hours: 'Mon–Sat 10:00–19:00', email: 'florence@unica.com', flag: '🇮🇹', isNew: false },
  { city: 'Paris', country: 'France', address: '8 Place Vendôme', zip: '75001 Paris, France', phone: '+33 1 42 60 1987', hours: 'Mon–Sat 10:00–19:30', email: 'paris@unica.com', flag: '🇫🇷', isNew: false },
  { city: 'New York', country: 'USA', address: '725 Fifth Avenue, Suite 14', zip: 'New York, NY 10022', phone: '+1 212 555 0192', hours: 'Mon–Sat 10:00–18:00', email: 'newyork@unica.com', flag: '🇺🇸', isNew: false },
];

const appointmentSlots = ['10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];
const services = ['Jewelry Consultation','Bespoke Design Session','Ring Sizing & Alterations','Collection Viewing','Bridal Consultation','Investment Piece Advisory'];

function AppointmentModal({ onClose }) {
  const [apptForm, setApptForm] = useState({ name: '', email: '', phone: '', boutique: '', date: '', time: '', service: '', notes: '' });
  const [apptDone, setApptDone] = useState(false);
  const setA = (k, v) => setApptForm(p => ({ ...p, [k]: v }));

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-obsidian/90 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-xl bg-[#0d0d0d] border border-gold/20 overflow-y-auto max-h-[90vh]"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Gold top bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="p-8">
          {/* Close */}
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center border border-ivory/10 hover:border-gold/40 text-ivory/40 hover:text-gold transition-all duration-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {apptDone ? (
            <motion.div className="text-center py-8" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="section-subtitle mb-3">Appointment Confirmed</p>
              <h3 className="font-serif text-3xl text-ivory mb-3 font-light">We Look Forward<br />to Seeing You</h3>
              <span className="gold-line" />
              <p className="font-sans text-sm text-ivory/40 leading-relaxed mb-2">
                A confirmation has been sent to <span className="text-gold/70">{apptForm.email}</span>
              </p>
              {apptForm.boutique && apptForm.date && apptForm.time && (
                <div className="glass-card border border-gold/10 p-4 mt-4 text-left">
                  <div className="grid grid-cols-2 gap-3">
                    {[['Boutique', apptForm.boutique], ['Date', apptForm.date], ['Time', apptForm.time], ['Service', apptForm.service]].filter(([,v]) => v).map(([k, v]) => (
                      <div key={k}>
                        <p className="font-sans text-[9px] tracking-[0.2em] text-ivory/25 uppercase">{k}</p>
                        <p className="font-sans text-sm text-ivory/70">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button onClick={onClose} className="btn-gold mt-8 w-full">Close</button>
            </motion.div>
          ) : (
            <>
              <p className="section-subtitle mb-2">Private Appointment</p>
              <h3 className="font-serif text-3xl text-ivory font-light mb-1">Book a Boutique Visit</h3>
              <span className="block w-10 h-px bg-gold/40 mb-6" />

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/30 uppercase block mb-1.5">Full Name *</label>
                    <input type="text" value={apptForm.name} onChange={e => setA('name', e.target.value)} placeholder="Your name" className="input-luxury text-sm" />
                  </div>
                  <div>
                    <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/30 uppercase block mb-1.5">Email *</label>
                    <input type="email" value={apptForm.email} onChange={e => setA('email', e.target.value)} placeholder="you@email.com" className="input-luxury text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/30 uppercase block mb-1.5">Phone</label>
                    <input type="tel" value={apptForm.phone} onChange={e => setA('phone', e.target.value)} placeholder="+91 98765 43210" className="input-luxury text-sm" />
                  </div>
                  <div>
                    <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/30 uppercase block mb-1.5">Boutique *</label>
                    <select value={apptForm.boutique} onChange={e => setA('boutique', e.target.value)} className="input-luxury text-sm bg-transparent cursor-pointer">
                      <option value="" className="bg-[#0d0d0d]">Select boutique</option>
                      {locations.map(l => <option key={l.city} value={l.city} className="bg-[#0d0d0d]">{l.city}, {l.country}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/30 uppercase block mb-1.5">Preferred Date *</label>
                    <input type="date" value={apptForm.date} onChange={e => setA('date', e.target.value)} className="input-luxury text-sm [color-scheme:dark]" min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div>
                    <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/30 uppercase block mb-1.5">Time Slot *</label>
                    <select value={apptForm.time} onChange={e => setA('time', e.target.value)} className="input-luxury text-sm bg-transparent cursor-pointer">
                      <option value="" className="bg-[#0d0d0d]">Select time</option>
                      {appointmentSlots.map(t => <option key={t} value={t} className="bg-[#0d0d0d]">{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/30 uppercase block mb-1.5">Service</label>
                  <select value={apptForm.service} onChange={e => setA('service', e.target.value)} className="input-luxury text-sm bg-transparent cursor-pointer">
                    <option value="" className="bg-[#0d0d0d]">Select service</option>
                    {services.map(s => <option key={s} value={s} className="bg-[#0d0d0d]">{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/30 uppercase block mb-1.5">Special Requests</label>
                  <textarea rows={2} value={apptForm.notes} onChange={e => setA('notes', e.target.value)} placeholder="Any special requirements or notes..." className="input-luxury text-sm resize-none" />
                </div>

                <motion.button
                  onClick={() => { if (apptForm.name && apptForm.email && apptForm.boutique && apptForm.date && apptForm.time) setApptDone(true); }}
                  disabled={!apptForm.name || !apptForm.email || !apptForm.boutique || !apptForm.date || !apptForm.time}
                  className="btn-gold w-full mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  whileHover={{ boxShadow: '0 0 30px rgba(212,175,55,0.35)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Confirm Appointment
                </motion.button>

                <p className="font-sans text-[10px] text-ivory/20 text-center">
                  Complimentary consultation · Champagne served · Complete discretion
                </p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// WhatsApp number - replace with your actual number
const WHATSAPP_NUMBER = '919876543210'; // Format: country code + number (no + or spaces)

// Toast notification component
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`fixed top-24 right-6 z-[300] px-6 py-4 rounded-lg border backdrop-blur-xl shadow-2xl ${
        type === 'success' 
          ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-200' 
          : 'bg-red-950/90 border-red-500/30 text-red-200'
      }`}
    >
      <div className="flex items-center gap-3">
        {type === 'success' ? (
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span className="font-sans text-sm font-medium">{message}</span>
      </div>
    </motion.div>
  );
}

// Particle background component
function ParticleBackground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// WhatsApp enquiry form section
function WhatsAppEnquirySection() {
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    mobile: '',
    query: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [focused, setFocused] = useState(null);

  const set = (k, v) => setEnquiryForm(prev => ({ ...prev, [k]: v }));

  const validateForm = () => {
    if (!enquiryForm.name.trim()) {
      setToast({ message: 'Please enter your name', type: 'error' });
      return false;
    }
    if (!enquiryForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiryForm.email)) {
      setToast({ message: 'Please enter a valid email address', type: 'error' });
      return false;
    }
    if (!enquiryForm.mobile.trim() || !/^[0-9+\-\s()]{10,}$/.test(enquiryForm.mobile)) {
      setToast({ message: 'Please enter a valid mobile number', type: 'error' });
      return false;
    }
    if (!enquiryForm.query.trim()) {
      setToast({ message: 'Please enter your enquiry details', type: 'error' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    // Simulate a brief loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Build WhatsApp message
    const message = `Hello, I have a new jewellery enquiry/order:

👤 Name: ${enquiryForm.name}
📧 Email: ${enquiryForm.email}
📱 Mobile: ${enquiryForm.mobile}
💎 Enquiry/Order: ${enquiryForm.query}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    setLoading(false);
    setToast({ message: 'Redirecting to WhatsApp...', type: 'success' });
    
    // Reset form
    setEnquiryForm({ name: '', email: '', mobile: '', query: '' });
  };

  return (
    <>
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <motion.div
        className="relative py-20 px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        {/* Background gradient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-gold/10 via-gold/5 to-transparent blur-3xl pointer-events-none" />
        
        <ParticleBackground />

        <div className="relative max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <motion.p 
              className="section-subtitle mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Instant Enquiry
            </motion.p>
            <motion.h2 
              className="font-serif text-4xl md:text-5xl text-ivory font-light mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              WhatsApp Order Enquiry
            </motion.h2>
            <motion.span 
              className="gold-line"
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
            <motion.p 
              className="font-sans text-sm text-ivory/40 max-w-md mx-auto mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Get instant responses to your jewellery queries. Fill the form below and we'll connect on WhatsApp immediately.
            </motion.p>
          </div>

          {/* Glassmorphism form card */}
          <motion.div
            className="relative backdrop-blur-2xl bg-gradient-to-br from-white/5 via-white/[0.02] to-white/5 border border-gold/20 rounded-2xl p-8 md:p-10 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl opacity-50">
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 via-transparent to-gold/20 animate-gradient-shift" />
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-gold/30 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold/30 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gold/30 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-gold/30 rounded-br-2xl" />

            <form onSubmit={handleSubmit} className="relative space-y-6">
              {/* Name & Email row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/40 uppercase block mb-2">
                    Full Name <span className="text-gold">*</span>
                  </label>
                  <div className={`relative transition-all duration-500 ${focused === 'name' ? 'drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]' : ''}`}>
                    <input
                      type="text"
                      value={enquiryForm.name}
                      onChange={(e) => set('name', e.target.value)}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      placeholder="Your full name"
                      className="w-full bg-white/[0.03] border border-gold/15 rounded-lg px-4 py-3 text-ivory placeholder-ivory/20 focus:outline-none focus:border-gold/40 focus:bg-white/[0.06] transition-all duration-300"
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold via-gold/80 to-transparent"
                      initial={{ width: 0 }}
                      animate={{ width: focused === 'name' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                >
                  <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/40 uppercase block mb-2">
                    Email Address <span className="text-gold">*</span>
                  </label>
                  <div className={`relative transition-all duration-500 ${focused === 'email' ? 'drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]' : ''}`}>
                    <input
                      type="email"
                      value={enquiryForm.email}
                      onChange={(e) => set('email', e.target.value)}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder="you@email.com"
                      className="w-full bg-white/[0.03] border border-gold/15 rounded-lg px-4 py-3 text-ivory placeholder-ivory/20 focus:outline-none focus:border-gold/40 focus:bg-white/[0.06] transition-all duration-300"
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold via-gold/80 to-transparent"
                      initial={{ width: 0 }}
                      animate={{ width: focused === 'email' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Mobile number */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/40 uppercase block mb-2">
                  Mobile Number <span className="text-gold">*</span>
                </label>
                <div className={`relative transition-all duration-500 ${focused === 'mobile' ? 'drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]' : ''}`}>
                  <input
                    type="tel"
                    value={enquiryForm.mobile}
                    onChange={(e) => set('mobile', e.target.value)}
                    onFocus={() => setFocused('mobile')}
                    onBlur={() => setFocused(null)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/[0.03] border border-gold/15 rounded-lg px-4 py-3 text-ivory placeholder-ivory/20 focus:outline-none focus:border-gold/40 focus:bg-white/[0.06] transition-all duration-300"
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold via-gold/80 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: focused === 'mobile' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Enquiry details */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55 }}
              >
                <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/40 uppercase block mb-2">
                  Jewellery Enquiry / Order Details <span className="text-gold">*</span>
                </label>
                <div className={`relative transition-all duration-500 ${focused === 'query' ? 'drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]' : ''}`}>
                  <textarea
                    rows={5}
                    value={enquiryForm.query}
                    onChange={(e) => set('query', e.target.value)}
                    onFocus={() => setFocused('query')}
                    onBlur={() => setFocused(null)}
                    placeholder="Describe your jewellery requirements, custom design ideas, or order details..."
                    className="w-full bg-white/[0.03] border border-gold/15 rounded-lg px-4 py-3 text-ivory placeholder-ivory/20 focus:outline-none focus:border-gold/40 focus:bg-white/[0.06] transition-all duration-300 resize-none"
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold via-gold/80 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: focused === 'query' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Submit button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-4 px-6 rounded-lg font-sans text-sm tracking-[0.15em] uppercase font-semibold overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Button gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-gold to-amber-600 bg-[length:200%_100%] animate-gradient-shift" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  {/* Button content */}
                  <span className="relative flex items-center justify-center gap-3 text-obsidian">
                    {loading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Send via WhatsApp
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                </motion.button>

                <p className="font-sans text-[10px] text-ivory/20 text-center mt-4 tracking-wide">
                  By clicking above, you'll be redirected to WhatsApp with your enquiry pre-filled
                </p>
              </motion.div>
            </form>
          </motion.div>

          {/* Features below form */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            {[
              { icon: '⚡', title: 'Instant Response', desc: 'Get replies within minutes' },
              { icon: '🔒', title: 'Secure & Private', desc: 'End-to-end encrypted chat' },
              { icon: '💎', title: 'Expert Advice', desc: 'Personalised jewellery guidance' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="glass-card border border-gold/10 p-5 rounded-xl text-center hover:border-gold/25 transition-colors duration-300"
                whileHover={{ y: -3, boxShadow: '0 10px 30px -10px rgba(212,175,55,0.15)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <span className="text-2xl mb-2 block">{feature.icon}</span>
                <h4 className="font-sans text-xs tracking-[0.15em] text-gold uppercase mb-1">{feature.title}</h4>
                <p className="font-sans text-[10px] text-ivory/30">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', boutique: '' });
  const [sent, setSent] = useState(false);
  const [showAppt, setShowAppt] = useState(false);
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Appointment Modal */}
      <AnimatePresence>
        {showAppt && <AppointmentModal onClose={() => setShowAppt(false)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-8">
          <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1600&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-obsidian/90" />
        </div>
        <motion.div className="relative" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p className="section-subtitle mb-4">Get in Touch</p>
          <h1 className="section-title mb-4">Contact UNICA</h1>
          <span className="gold-line" />
          <p className="font-sans text-sm text-ivory/40 max-w-sm mx-auto">We would love to hear from you — whether it is a question, a special request, or a boutique visit.</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        {/* Contact form + boutiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <p className="section-subtitle mb-8">Send a Message</p>
            {sent ? (
              <motion.div className="py-20 text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-serif text-2xl text-ivory mb-3">Message Sent</h3>
                <p className="font-sans text-xs text-ivory/40 mb-6">We will respond within 24 hours.</p>
                <button onClick={() => setSent(false)} className="btn-outline-gold text-xs">Send Another</button>
              </motion.div>
            ) : (
              <div className="space-y-7">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/30 uppercase block mb-1.5">Your Name</label>
                    <input type="text" placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)} className="input-luxury" />
                  </div>
                  <div>
                    <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/30 uppercase block mb-1.5">Email Address</label>
                    <input type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} className="input-luxury" />
                  </div>
                </div>
                <div>
                  <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/30 uppercase block mb-1.5">Subject</label>
                  <input type="text" placeholder="How can we help?" value={form.subject} onChange={e => set('subject', e.target.value)} className="input-luxury" />
                </div>
                <div>
                  <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/30 uppercase block mb-1.5">Preferred Boutique</label>
                  <select value={form.boutique} onChange={e => set('boutique', e.target.value)} className="input-luxury bg-transparent">
                    <option value="" className="bg-obsidian">Any boutique</option>
                    {locations.map(l => <option key={l.city} value={l.city} className="bg-obsidian">{l.city}, {l.country}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-sans text-[9px] tracking-[0.2em] text-ivory/30 uppercase block mb-1.5">Message</label>
                  <textarea rows={5} placeholder="Your message..." value={form.message} onChange={e => set('message', e.target.value)} className="input-luxury resize-none" />
                </div>
                <motion.button onClick={() => setSent(true)} className="btn-gold w-full" whileHover={{ boxShadow: '0 0 30px rgba(212,175,55,0.3)' }} whileTap={{ scale: 0.98 }}>
                  Send Message
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Boutique cards */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <p className="section-subtitle mb-8">Our Boutiques</p>
            <div className="space-y-4">
              {locations.map((loc, i) => (
                <motion.div key={loc.city} className={`glass-card p-5 border transition-colors duration-300 hover:border-gold/30 ${loc.isNew ? 'border-gold/25 bg-gold/5' : 'border-gold/10'}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{loc.flag}</span>
                      <h3 className="font-serif text-xl text-ivory">{loc.city}</h3>
                      {loc.isNew && <span className="font-sans text-[8px] tracking-[0.2em] uppercase bg-gold text-obsidian px-2 py-0.5 font-medium">New</span>}
                    </div>
                    <span className="font-sans text-[9px] tracking-[0.15em] text-ivory/20 uppercase">{loc.country}</span>
                  </div>
                  <p className="font-sans text-xs text-ivory/45 mb-0.5">{loc.address}</p>
                  <p className="font-sans text-xs text-ivory/30 mb-2">{loc.zip}</p>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <a href={`tel:${loc.phone}`} className="font-sans text-xs text-gold/60 hover:text-gold transition-colors duration-300">{loc.phone}</a>
                    <a href={`mailto:${loc.email}`} className="font-sans text-xs text-gold/60 hover:text-gold transition-colors duration-300">{loc.email}</a>
                  </div>
                  <p className="font-sans text-[10px] tracking-[0.12em] text-ivory/20 uppercase mt-2">{loc.hours}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Real Map: UNICA Mumbai, India ── */}
        <motion.div
          className="mb-20 overflow-hidden border border-gold/15"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          {/* Map header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gold/10 bg-[#0a0a0a]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="font-sans text-xs tracking-[0.2em] text-ivory/50 uppercase">UNICA Boutiques Worldwide</span>
            </div>
            <div className="flex items-center gap-4">
              {['🇮🇳 Mumbai', '🇮🇹 Florence', '🇫🇷 Paris', '🇺🇸 New York'].map(b => (
                <span key={b} className="font-sans text-[10px] text-ivory/25 hidden md:block">{b}</span>
              ))}
            </div>
          </div>

          {/* OpenStreetMap iframe — centered on Mumbai, India */}
          <div className="relative h-[420px]">
            <iframe
              title="UNICA Mumbai Boutique"
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.8107%2C18.9124%2C72.8357%2C18.9294&layer=mapnik&marker=18.9217%2C72.8232"
              className="w-full h-full border-0"
              style={{ filter: 'invert(0.88) sepia(0.25) hue-rotate(160deg) brightness(0.82) contrast(0.9)' }}
              loading="lazy"
            />
            {/* Gold overlay pin label */}
            <div className="absolute top-4 left-4 glass-card border border-gold/20 px-4 py-3 flex items-center gap-3 pointer-events-none">
              <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-gold" />
              </div>
              <div>
                <p className="font-serif text-sm text-ivory">UNICA Mumbai</p>
                <p className="font-sans text-[10px] text-ivory/40 tracking-wide">The Taj Mahal Palace, Apollo Bunder</p>
                <p className="font-sans text-[9px] text-gold/50 tracking-[0.15em] uppercase mt-0.5">Now Open · 🇮🇳 India</p>
              </div>
            </div>
          </div>

          {/* Map footer */}
          <div className="px-6 py-3 bg-[#0a0a0a] border-t border-gold/10 flex items-center justify-between">
            <p className="font-sans text-[10px] text-ivory/20 tracking-wide">Colaba, Mumbai 400 001, Maharashtra, India</p>
            <a
              href="https://www.openstreetmap.org/?mlat=18.9217&mlon=72.8232#map=16/18.9217/72.8232"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[10px] tracking-[0.15em] text-gold/40 hover:text-gold transition-colors duration-300 uppercase"
            >
              Open in Maps →
            </a>
          </div>
        </motion.div>

        {/* Book Private Appointment */}
        <motion.div
          className="text-center py-20 border border-gold/10 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* BG accent */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-gold/40 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-gold/40 to-transparent" />
          </div>

          <p className="section-subtitle mb-4">Private Experience</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ivory font-light mb-4 leading-tight">
            Book a Boutique Visit
          </h2>
          <span className="gold-line" />
          <p className="font-sans text-sm text-ivory/40 max-w-md mx-auto mb-10 leading-relaxed">
            Experience UNICA in person. Our private appointments offer an intimate jewelry consultation with champagne, complete discretion, and our full personal attention.
          </p>

          {/* Perks */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {['Complimentary Champagne', 'Personal Stylist', 'Private Viewing Room', 'No Obligation'].map(p => (
              <div key={p} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold" />
                <span className="font-sans text-xs text-ivory/40 tracking-wide">{p}</span>
              </div>
            ))}
          </div>

          <motion.button
            onClick={() => setShowAppt(true)}
            className="btn-gold inline-flex items-center gap-3"
            whileHover={{ boxShadow: '0 0 40px rgba(212,175,55,0.4)', scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Request Private Appointment
          </motion.button>

          <p className="font-sans text-[10px] text-ivory/20 mt-5 tracking-wide">Available at all 4 boutiques · Mumbai · Florence · Paris · New York</p>
        </motion.div>

        {/* WhatsApp Enquiry Section */}
        <WhatsAppEnquirySection />
      </div>
    </div>
  );
}