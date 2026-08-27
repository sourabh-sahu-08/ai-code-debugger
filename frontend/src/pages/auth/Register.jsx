import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Mail, Lock, User, AtSign, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { motion } from 'framer-motion';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (!data.success) throw new Error(data.error || 'Failed to register');
      
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
        <div className="w-[600px] h-[600px] bg-primary-violet/5 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 flex flex-col items-center mb-8">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <Terminal className="w-8 h-8 text-primary-cyan" />
          <span className="font-bold text-2xl tracking-tight">KhudSeKrle</span>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <Card className="bg-surface/50 border-border/50 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Join the debugging revolution</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {error && (
                <div className="p-3 rounded-md bg-error-base/10 border border-error-base/20 text-error-base text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Full Name"
                  id="name" 
                  name="name" 
                  type="text" 
                  required 
                  leftIcon={User}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input 
                  label="Username"
                  id="username" 
                  name="username" 
                  type="text" 
                  required 
                  leftIcon={AtSign}
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <Input 
                label="Email address"
                id="email" 
                name="email" 
                type="email" 
                required 
                leftIcon={Mail}
                placeholder="developer@example.com"
                value={formData.email}
                onChange={handleChange}
              />

              <Input 
                label="Password"
                id="password" 
                name="password" 
                type="password" 
                required 
                leftIcon={Lock}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />

              <Button type="submit" className="w-full mt-2" isLoading={loading} rightIcon={!loading && <ArrowRight className="w-4 h-4" />}>
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-border/50 pt-6">
            <p className="text-sm text-text-muted">
              Already have an account?{' '}
              <Link to="/auth/login" className="font-medium text-primary-cyan hover:text-primary-electric transition-colors">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
