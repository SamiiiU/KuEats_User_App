import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, LogOut, History, Home } from 'lucide-react';
import logo from '../assets/logo.png'
const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();

    navigate('/login');
    setMenuOpen(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-[#831615] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="KuEats Logo"  className="w-16" />

            <h1
              className="cursor-pointer"
              onClick={() => navigate('/home')}
            >
              KuEats 
            </h1>
            
          </div>
          <div className="flex gap-4 ml-8">
              {location.pathname !== '/home' && (
                <button
                  onClick={() => navigate('/home')}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Home size={20} />
                  <span>Home</span>
                </button>
              )}
              <button
                onClick={() => navigate('/history')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <History size={20} />
                <span>Orders</span>
              </button>
            </div>
          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <p className="text-sm opacity-90">{user?.name}</p>
              <p className="text-xs opacity-75">{user?.department}</p>
            </div>

            <button
              onClick={() => navigate('/cart')}
              className="relative flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#831615] rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden justify-between items-center">
            <img src={logo} alt="KuEats Logo"  className="sm:w-16 w-12" />

          <h1
            className="cursor-pointer text-lg"
            onClick={() => navigate('/home')}
          >
            KuEats
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 bg-white/10 rounded-lg"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#831615] rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 bg-white/10 rounded-lg"
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1">
                <span className="block w-full h-0.5 bg-white"></span>
                <span className="block w-full h-0.5 bg-white"></span>
                <span className="block w-full h-0.5 bg-white"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-col gap-3">
              <div className="text-sm pb-3 border-b border-white/20">
                <p className="opacity-90">{user?.name}</p>
                <p className="text-xs opacity-75">{user?.department}</p>
              </div>

              {location.pathname !== '/home' && (
                <button
                  onClick={() => {
                    navigate('/home');
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left"
                >
                  <Home size={20} />
                  <span>Home</span>
                </button>
              )}

              <button
                onClick={() => {
                  navigate('/history');
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <History size={20} />
                <span>Orders</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
