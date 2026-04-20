import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider }     from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider }     from './context/AuthContext';

import Loader      from './components/Loader';
import Navbar      from './components/Navbar';
import Footer      from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home          from './pages/Home';
import Collections   from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import Bridal        from './pages/Bridal';
import About         from './pages/About';
import CustomOrder   from './pages/CustomOrder';
import Contact       from './pages/Contact';
import Login         from './pages/Login';
import Wishlist      from './pages/Wishlist';
import Cart          from './pages/Cart';
import OrderSuccess  from './pages/OrderSuccess';

const pageVariants  = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };
const pageTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] };
const noFooterPages  = ['/login'];

function Layout() {
  const location   = useLocation();
  const showFooter = !noFooterPages.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial" animate="animate" exit="exit"
          transition={pageTransition}
        >
          <Routes location={location}>
            {/* ALL PAGES ARE PUBLIC — login is optional */}
            <Route path="/"              element={<Home />} />
            <Route path="/collections"   element={<Collections />} />
            <Route path="/product/:id"   element={<ProductDetail />} />
            <Route path="/bridal"        element={<Bridal />} />
            <Route path="/about"         element={<About />} />
            <Route path="/custom-order"  element={<CustomOrder />} />
            <Route path="/contact"       element={<Contact />} />
            <Route path="/login"         element={<Login />} />
            <Route path="/wishlist"      element={<Wishlist />} />
            <Route path="/cart"          element={<Cart />} />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      {showFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="grain-overlay">
              <Loader />
              <Layout />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
