import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/InputField';
import { toast } from 'sonner';
import logo from '../assets/logo.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth(); // use the Supabase signIn from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const { error } = await signIn(email, password);

    if (error) {
      toast.error('Invalid email or password');
      console.error('Login Error:', error);
      return;
    }

    if (error?.message?.toLowerCase().includes('email not confirmed')) {
      toast.error('Please confirm your email address before logging in. Check your inbox for the confirmation link.');
      return;
    }

    toast.success('Login successful!');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#831615] to-[#a01d1c] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#831615] p-4 rounded-full mb-4">
            <img src={logo} alt="KuEats Logo" style={{ width: 100 }} className="w-20 h-20" />
          </div>
          <h1 className="text-gray-900 mb-2">KuEats App</h1>
          <p className="text-gray-600">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
            required
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#831615] text-white py-3 rounded-lg hover:bg-[#6b1211] transition-colors mt-6"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don’t have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-[#831615] hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Demo credentials:</p>
          <p className="text-xs text-gray-500">Email: studentsami@gmail.com</p>
          <p className="text-xs text-gray-500">Password: 12345</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
