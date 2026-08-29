import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { motion } from 'framer-motion';
import { authService } from '../../services/authService';
import { useToast } from '../../contexts/ToastContext';

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
    <div className="min-h-screen bg-background text-text flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
        <div className="w-[600px] h-[600px] bg-primary-base/5 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 flex flex-col items-center mb-8">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <Terminal className="w-8 h-8 text-text" />
          <span className="font-bold text-2xl tracking-tight">KhudSeKrle</span>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <Card className="bg-surface border-border backdrop-blur-xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue debugging</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {error && (
                <div className="p-3 rounded-md bg-error-soft border border-error-base/20 text-error-base text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-text-muted">Email address</label>
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
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-text-muted">Password</label>
                  <Link to="/auth/forgot-password" className="text-xs font-medium text-text hover:text-primary-base transition-colors">
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
                />
              </div>

              <Button type="submit" className="w-full mt-2" isLoading={loading} disabled={loading} rightIcon={!loading && <ArrowRight className="w-4 h-4" />}>
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-border pt-6">
            <p className="text-sm text-text-muted">
              Don't have an account?{' '}
              <Link to="/auth/register" className="font-medium text-text hover:text-primary-base transition-colors">
                Sign up now
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
