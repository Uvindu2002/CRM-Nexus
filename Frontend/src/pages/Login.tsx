import React, { useState } from 'react';
import { Eye, EyeOff, BarChart3, Users, Shield, CheckCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = () => {
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-blue-50">
      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-16 lg:px-20">
        <div className="max-w-2xl text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-900">CRM Pro</h1>
              <p className="text-sm text-blue-600">Enterprise Edition</p>
            </div>
          </div>

          {/* Hero Section */}
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            Welcome to the Future of{' '}
            <span className="text-blue-600">Customer Management</span>
          </h2>
          <p className="text-lg text-blue-700 mb-6">
            Streamline your sales process, manage leads effectively, 
            and grow your business with our comprehensive CRM solution.
          </p>

          {/* Features */}
          <div className="space-y-1 mb-8">
            {[
              {
                icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
                title: 'Advanced Analytics',
                desc: 'Real-time insights and performance metrics',
              },
              {
                icon: <Users className="w-6 h-6 text-blue-600" />,
                title: 'Lead Management',
                desc: 'Comprehensive lead tracking and nurturing',
              },
              {
                icon: <Shield className="w-6 h-6 text-blue-600" />,
                title: 'Enterprise Security',
                desc: 'Bank-level security and data protection',
              },
            ].map(({ icon, title, desc }, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-blue-900 mb-1">{title}</h3>
                  <p className="text-blue-700">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance Badges */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-700">
            {['SOC 2 Compliant', 'GDPR Ready', '99.9% Uptime'].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg border border-blue-200 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-blue-900">Sign In</h2>
            <p className="text-blue-600 text-sm">Access your CRM dashboard</p>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 pr-10 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                />
                <span className="text-blue-700">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">Forgot password?</a>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              Sign In
            </button>

            {/* Social Login */}
            <div className="text-center text-sm text-blue-600">Or sign in with</div>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-1 py-2 px-3 border border-blue-200 rounded-md hover:bg-blue-50 text-xs">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
                <span className="text-blue-700">Google</span>
              </button>
              <button className="flex items-center justify-center gap-1 py-2 px-3 border border-blue-200 rounded-md hover:bg-blue-50 text-xs">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-blue-700">Facebook</span>
              </button>
            </div>

            {/* Sign Up Prompt */}
            <div className="text-center mt-4 text-sm text-blue-700">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Sign up</a>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 mt-8 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>© 2024 CRM Pro. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700">Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;