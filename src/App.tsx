import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import { Toaster } from 'sonner@2.0.3';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import CanteenMenu from './pages/CanteenMenu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderProcessing from './pages/OrderProcessing';
import OrderHistory from './pages/OrderHistory';
import GlobalProvider from './GlobalProvider/GlobalProvider';

// Protected Route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route wrapper (redirect to home if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/canteen/:id"
          element={
            <ProtectedRoute>
              <CanteenMenu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-processing"
          element={
            <ProtectedRoute>
              <OrderProcessing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <GlobalProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <AppRoutes />
              <Toaster
                position="top-right"
                richColors
                closeButton
                toastOptions={{
                  style: {
                    background: '#ffffff',
                    color: '#1f2937',
                    border: '1px solid #e5e7eb',
                  },
                }}
              />
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </GlobalProvider>
    </Router>
  );
}
