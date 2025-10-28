import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/InputField';
import { toast } from 'sonner';
import logo from '../assets/logo.png';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState<'Student' | 'Faculty Member' | 'Teacher'>('Student');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    const { error } = await signUp({ name, email, department, role, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || 'Something went wrong');
      return;
    }

    toast.success('Account created successfully!');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#831615] to-[#a01d1c] flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#831615] p-4 rounded-full mb-4">
            <img src={logo} style={{ width: 100 }} className="text-white w-20 h-20" />
          </div>
          <h1 className="text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join Campus Canteen</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Full Name" type="text" value={name} onChange={setName} required />
          <InputField label="Email" type="email" value={email} onChange={setEmail} required />
          
          <label className="block text-gray-700 mb-1">Department</label>
          <select
            value={department}
            onChange={e => setDepartment(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831615] focus:border-transparent mb-2 text-sm"
          >
            <option value="">Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Economics">Economics</option>
            <option value="Business Administration">Business Administration</option>
            <option value="English">English</option>
            <option value="Other">Other</option>
          </select>

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />
          <InputField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#831615] text-white py-3 rounded-lg hover:bg-[#6b1211] transition-colors mt-6 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : null}
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-[#831615] hover:underline">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
