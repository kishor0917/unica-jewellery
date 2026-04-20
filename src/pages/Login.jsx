import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const set = (k, v) => { setForm(prev => ({ ...prev, [k]: v })); setError(''); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please fill in all required fields.'); return; }
    if (mode === 'signup' && form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    login(form.email, form.name);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-obsidian flex">
      {/* Left: Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=90"
          alt="UNICA"
          className="w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/20 to-obsidian/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-16">
          <p className="section-subtitle mb-5">Welcome to</p>
          <h2 className="font-serif text-7xl text-ivory font-light tracking-[0.15em] mb-4">UNICA</h2>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold/60 to-transparent mb-6" />
          <p className="font-sans text-sm text-ivory/50 leading-relaxed max-w-xs">
            Sign in to unlock exclusive access to collections, wishlists, bespoke orders, and more.
          </p>
          {from !== '/' && (
            <div className="mt-8 glass-card border border-gold/20 px-5 py-3">
              <p className="font-sans text-[10px] tracking-[0.2em] text-gold/70 uppercase">Sign in to continue to</p>
              <p className="font-sans text-xs text-ivory/60 mt-1 capitalize">{from.replace('/', '').replace('-', ' ') || 'UNICA'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-20">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-12">
            <Link to="/"><span className="font-serif text-3xl tracking-[0.3em] text-ivory">UNICA</span></Link>
            <div className="h-px w-16 bg-gold/40 mt-1 mx-auto" />
          </div>

          {/* Mode tabs */}
          <div className="flex border border-gold/15 mb-10 overflow-hidden">
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-3 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300 relative ${mode === m ? 'text-obsidian' : 'text-ivory/40 hover:text-ivory/70'}`}
              >
                {mode === m && <motion.div className="absolute inset-0 bg-gold" layoutId="modeTab" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
                <span className="relative z-10">{m === 'login' ? 'Sign In' : 'Create Account'}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form key={mode} onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-7"
            >
              {mode === 'signup' && (
                <div>
                  <label className="font-sans text-[9px] tracking-[0.25em] text-ivory/30 uppercase block mb-2">Full Name</label>
                  <input type="text" placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} className="input-luxury" />
                </div>
              )}
              <div>
                <label className="font-sans text-[9px] tracking-[0.25em] text-ivory/30 uppercase block mb-2">Email Address *</label>
                <input type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} className="input-luxury" required />
              </div>
              <div>
                <label className="font-sans text-[9px] tracking-[0.25em] text-ivory/30 uppercase block mb-2">Password *</label>
                <input type="password" placeholder="Min. 6 characters" value={form.password} onChange={e => set('password', e.target.value)} className="input-luxury" required />
              </div>
              {mode === 'signup' && (
                <div>
                  <label className="font-sans text-[9px] tracking-[0.25em] text-ivory/30 uppercase block mb-2">Confirm Password *</label>
                  <input type="password" placeholder="Repeat password" value={form.confirm} onChange={e => set('confirm', e.target.value)} className="input-luxury" required />
                </div>
              )}
              {mode === 'login' && (
                <div className="text-right -mt-2">
                  <a href="#" className="font-sans text-[10px] tracking-[0.15em] text-ivory/25 hover:text-gold transition-colors duration-300 uppercase">Forgot password?</a>
                </div>
              )}

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p className="font-sans text-xs text-red-400/80 text-center py-2 border border-red-400/20 px-3"
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button type="submit" className="btn-gold w-full mt-2"
                whileTap={{ scale: 0.98 }}
                whileHover={{ boxShadow: '0 0 30px rgba(212,175,55,0.35)' }}
              >
                {mode === 'login' ? 'Sign In to UNICA' : 'Create My Account'}
              </motion.button>

              {mode === 'signup' && (
                <p className="font-sans text-[10px] text-ivory/20 text-center leading-relaxed">
                  By creating an account you agree to UNICA's Privacy Policy and Terms of Service.
                </p>
              )}
            </motion.form>
          </AnimatePresence>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-ivory/8" />
            <span className="font-sans text-[10px] tracking-[0.2em] text-ivory/15 uppercase">or continue with</span>
            <div className="flex-1 h-px bg-ivory/8" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[{name:'Google', icon:'G'}, {name:'Apple', icon:''}].map(opt => (
              <button key={opt.name} onClick={() => { login(`user@${opt.name.toLowerCase()}.com`, opt.name + ' User'); navigate(from, { replace: true }); }}
                className="border border-ivory/10 py-3 font-sans text-[11px] tracking-[0.1em] text-ivory/40 hover:border-gold/30 hover:text-ivory/70 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {opt.name === 'Google' ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#D4AF37" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#D4AF37" opacity=".7" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#D4AF37" opacity=".4" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#D4AF37" opacity=".9" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                ) : (
                  <svg className="w-4 h-4" fill="rgba(212,175,55,0.7)" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/></svg>
                )}
                {opt.name}
              </button>
            ))}
          </div>

          <p className="text-center mt-8 font-sans text-[10px] text-ivory/20">
            {mode === 'login' ? "New to UNICA? " : "Already have an account? "}
            <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
              className="text-gold/60 hover:text-gold transition-colors duration-300">
              {mode === 'login' ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
