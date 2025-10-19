import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/InputField';
import { UtensilsCrossed } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import logo from '../assets/logo.png'


const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState<'Student' | 'Faculty Member' | 'Teacher'>('Student');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    signup({ name, email, department, role, password });
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
          <InputField
            label="Full Name"
            type="text"
            value={name}
            onChange={setName}
            placeholder="Enter your name"
            required
          />
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
            required
          />
          <InputField
            label="Department"
            type="text"
            value={department}
            onChange={setDepartment}
            placeholder="e.g., Computer Science"
            required
          />

          <div className="flex flex-col gap-2">
            <label className="text-gray-700">
              Role <span className="text-[#831615]">*</span>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831615] focus:border-transparent transition-all"
              required
            >
              <option value="Student">Student</option>
              <option value="Faculty Member">Faculty Member</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Create a password"
            required
          />
          <InputField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm your password"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#831615] text-white py-3 rounded-lg hover:bg-[#6b1211] transition-colors mt-6"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#831615] hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
