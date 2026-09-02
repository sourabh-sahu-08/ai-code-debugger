import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { motion } from 'framer-motion';
import { authService } from '../../services/authService';
import { useToast } from '../../contexts/ToastContext';
import './Auth.css';

const AuthBackground = () => (
  <div className="auth-video-wrapper">
    <video autoPlay muted loop playsInline preload="auto" className="auth-video">
      <source src="/12341903_1920_1080_30fps.mp4" type="video/mp4" />
    </video>
    <div className="auth-video-overlay" />
    <div className="auth-ambient-glow-layer">
      {/* Same ambient glow as landing page */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-white rounded-full blur-[120px] opacity-[0.05]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#A1A1A1] rounded-full blur-[120px] opacity-[0.05]" />
    </div>
  </div>
);

export default function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await authService.login(formData.email, formData.password);
      localStorage.setItem('token', data.token);
      showToast('Logged in successfully', 'success');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark-auth flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthBackground />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 flex flex-col items-center mb-8">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <Terminal className="w-8 h-8 text-white" />
          <span className="font-bold text-2xl tracking-tight text-white">KhudSeKrle</span>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <Card className="auth-glass-panel border-white/10 rounded-2xl bg-transparent shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl text-white font-semibold">Welcome back</CardTitle>
            <CardDescription className="text-[#A1A1A1]">Sign in to your account to continue debugging</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {error && (
                <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-[#D4D4D4]">Email address</label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  leftIcon={Mail}
                  placeholder="developer@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="auth-input text-white placeholder-white/30"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-[#D4D4D4]">Password</label>
                  <Link to="/auth/forgot-password" className="text-xs font-medium text-white/70 hover:text-white transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? 'text' : 'password'} 
                  required 
                  leftIcon={Lock}
                  rightIcon={showPassword ? EyeOff : Eye}
                  onRightIconClick={() => setShowPassword(!showPassword)}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="auth-input text-white placeholder-white/30"
                />
              </div>

              <Button type="submit" className="auth-button-primary w-full mt-4 rounded-xl font-medium" isLoading={loading} disabled={loading} rightIcon={!loading && <ArrowRight className="w-4 h-4" />}>
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-white/10 pt-6 pb-2">
            <p className="text-sm text-[#A1A1A1]">
              Don't have an account?{' '}
              <Link to="/auth/register" className="font-medium text-white hover:text-[#D4D4D4] transition-colors">
                Sign up now
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
