import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      <h1 className="text-9xl font-black text-border mb-4">404</h1>
      <h2 className="text-2xl font-bold text-text mb-2">Page not found</h2>
      <p className="text-text-muted mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <Button onClick={() => navigate('/')} leftIcon={<Home className="w-4 h-4" />}>
        Back to Home
      </Button>
    </div>
  );
}
