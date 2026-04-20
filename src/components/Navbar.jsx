import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart }     from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth }     from '../context/AuthContext';

const leftLinks  = [{ label: 'Collections', to: '/collections' }, { label: 'Bridal', to: '/bridal' }];
const rightLinks = [{ label: 'Bespoke', to: '/custom-order' }, { label: 'About', to: '/about' }, { label: 'Contact', to: '/contact' }];
const allLinks   = [...leftLinks, ...rightLinks];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [userMenu,  setUserMenu]  = useState(false);
  const { totalItems }   = useCart();
  const { wishlist }     = useWishlist();
  const { isLoggedIn, user, logout } = useAuth();
  const location  = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setUserMenu(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); };

  const NavLink = ({ to, label }) => {
    const active = location.pathname === to;
    return (
      <Link to={to}
        className={`relative group font-sans text-[11px] tracking-[0.22em] uppercase transition-all duration-300 ${active ? 'text-gold' : 'text-ivory/65 hover:text-ivory'}`}
      >
        {label}
        <span className={`absolute -bottom-1 left-0 h-px bg-gold/70 transition-all duration-500 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
      </Link>
    );
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${
          scrolled ? 'bg-[#080808]/96 backdrop-blur-2xl border-b border-gold/10 shadow-[0_2px_60px_rgba(0,0,0,0.7)]' : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Thin gold line top */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-[68px] gap-8">

            {/* LEFT */}
            <div className="hidden md:flex items-center gap-9">
              {leftLinks.map(l => <NavLink key={l.to} {...l} />)}
            </div>

            {/* CENTER — Logo */}
            <Link to="/" className="flex-shrink-0">
              <motion.div className="text-center group cursor-pointer" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                <div className="font-serif text-[21px] tracking-[0.6em] text-ivory group-hover:text-gold/90 transition-colors duration-500 leading-none pr-[0.6em]">
                  UNICA
                </div>
                <div className="h-px mt-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent group-hover:via-gold/80 transition-all duration-500" />
              </motion.div>
            </Link>

            {/* RIGHT */}
            <div className="flex items-center justify-end gap-6 lg:gap-8">
              <div className="hidden md:flex items-center gap-9">
                {rightLinks.map(l => <NavLink key={l.to} {...l} />)}
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-5 bg-ivory/10" />

              {/* Icon strip */}
              <div className="flex items-center gap-0.5">

                {/* Account icon */}
                <div className="relative">
                  {isLoggedIn ? (
                    <button onClick={() => setUserMenu(!userMenu)}
                      className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 group rounded hover:bg-gold/5 transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center transition-all duration-300 group-hover:bg-gold/30">
                        <span className="font-serif text-sm text-gold font-medium leading-none">{user?.avatar}</span>
                      </div>
                      <span className="font-sans text-[8px] tracking-[0.15em] text-gold/60 uppercase">Me</span>
                    </button>
                  ) : (
                    <Link to="/login" className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 group rounded hover:bg-gold/5 transition-all duration-300 hidden md:flex">
                      <div className="w-8 h-8 rounded-full border border-ivory/20 group-hover:border-gold/50 flex items-center justify-center transition-all duration-300 group-hover:bg-gold/10">
                        <svg className="w-4 h-4 text-ivory/55 group-hover:text-gold transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="font-sans text-[8px] tracking-[0.15em] text-ivory/25 group-hover:text-gold/60 uppercase transition-colors duration-300">Sign In</span>
                    </Link>
                  )}

                  {/* User dropdown */}
                  <AnimatePresence>
                    {userMenu && isLoggedIn && (
                      <motion.div
                        className="absolute right-0 top-full mt-2 w-52 bg-[#0d0d0d] border border-gold/15 shadow-luxury z-50"
                        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-4 py-3 border-b border-gold/10">
                          <p className="font-serif text-sm text-ivory capitalize">{user?.name}</p>
                          <p className="font-sans text-[10px] text-ivory/30 truncate">{user?.email}</p>
                        </div>
                        {[{ label: 'My Wishlist', to: '/wishlist' }, { label: 'My Cart', to: '/cart' }].map(item => (
                          <Link key={item.to} to={item.to}
                            className="block px-4 py-2.5 font-sans text-xs text-ivory/50 hover:text-gold hover:bg-gold/5 transition-all duration-200 tracking-wide"
                          >{item.label}</Link>
                        ))}
                        <div className="border-t border-gold/10">
                          <button onClick={handleLogout}
                            className="w-full text-left px-4 py-2.5 font-sans text-xs text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200 tracking-wide"
                          >Sign Out</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Wishlist */}
                <Link to="/wishlist" className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 group rounded hover:bg-gold/5 transition-all duration-300 relative">
                  <div className="w-8 h-8 rounded-full border border-ivory/20 group-hover:border-gold/50 flex items-center justify-center transition-all duration-300 group-hover:bg-gold/10 relative">
                    <svg className="w-4 h-4 transition-colors duration-300" fill={wishlist.length > 0 ? '#D4AF37' : 'none'} viewBox="0 0 24 24" stroke={wishlist.length > 0 ? '#D4AF37' : 'rgba(248,245,240,0.55)'} strokeWidth={1.4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {wishlist.length > 0 && (
                      <motion.span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-obsidian text-[9px] rounded-full flex items-center justify-center font-bold leading-none"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>
                        {wishlist.length}
                      </motion.span>
                    )}
                  </div>
                  <span className="font-sans text-[8px] tracking-[0.15em] text-ivory/25 group-hover:text-gold/60 uppercase transition-colors duration-300">Wishlist</span>
                </Link>

                {/* Cart */}
                <Link to="/cart" className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 group rounded hover:bg-gold/5 transition-all duration-300 relative">
                  <div className="w-8 h-8 rounded-full border border-ivory/20 group-hover:border-gold/50 flex items-center justify-center transition-all duration-300 group-hover:bg-gold/10 relative">
                    <svg className="w-4 h-4 text-ivory/55 group-hover:text-gold transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {totalItems > 0 && (
                      <motion.span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-obsidian text-[9px] rounded-full flex items-center justify-center font-bold leading-none"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>
                        {totalItems}
                      </motion.span>
                    )}
                  </div>
                  <span className="font-sans text-[8px] tracking-[0.15em] text-ivory/25 group-hover:text-gold/60 uppercase transition-colors duration-300">Cart</span>
                </Link>

                {/* Mobile hamburger */}
                <button className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 ml-1"
                  onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                  <motion.span className="block w-5 h-px bg-ivory/70 rounded-full" animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.28 }} />
                  <motion.span className="block w-5 h-px bg-ivory/70 rounded-full" animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.28 }} />
                  <motion.span className="block w-5 h-px bg-ivory/70 rounded-full" animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.28 }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-40 bg-obsidian/98 backdrop-blur-2xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-7">
              {[{ label: 'Home', to: '/' }, ...allLinks,
                isLoggedIn ? { label: 'My Account', to: '#', action: () => setUserMenu(true) } : { label: 'Sign In', to: '/login' },
                { label: 'Wishlist', to: '/wishlist' },
                { label: 'Cart', to: '/cart' },
              ].map((link, i) => (
                <motion.div key={link.to + link.label}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.055, ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
                >
                  <Link to={link.to}
                    className="font-serif text-3xl text-ivory hover:text-gold transition-colors duration-300 tracking-wide"
                  >{link.label}</Link>
                </motion.div>
              ))}
              {isLoggedIn && (
                <motion.button onClick={handleLogout}
                  className="font-sans text-sm text-red-400/60 hover:text-red-400 transition-colors duration-300 tracking-[0.2em] uppercase mt-4"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  Sign Out
                </motion.button>
              )}
            </div>
            <motion.p className="absolute bottom-12 font-sans text-[9px] tracking-[0.3em] text-gold/30 uppercase"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              Est. 1987 · Florence, Italy
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
