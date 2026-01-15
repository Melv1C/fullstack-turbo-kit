import { signIn } from '@/lib/auth-client';
import { LoginForm, type LoginProvider } from '@melv1c/ui-kit';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signIn.email({ email, password });
      navigate({ to: '/' });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderLogin = async (provider: LoginProvider) => {
    setIsLoading(true);
    try {
      await signIn.social({ provider });
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm
        title="Admin Login"
        description="Sign in to access the admin dashboard"
        onSubmit={handleSubmit}
        onProviderLogin={handleProviderLogin}
        providers={['google']}
        showForgotPassword={false}
        showSignUp={false}
        isLoading={isLoading}
      />
    </div>
  );
}
