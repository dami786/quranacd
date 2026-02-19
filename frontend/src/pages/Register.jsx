import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Seo from '../components/Seo';
import { HiUserAdd } from 'react-icons/hi';
import { Input } from '../components/Forms';
import { Button } from '../components/Buttons';
import { registerUser, getMyTrial } from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    registerUser({ name, email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isSuperAdmin', res.data.isSuperAdmin ? 'true' : 'false');
        localStorage.setItem('userRole', res.data.role || 'user');
        window.dispatchEvent(new Event('auth-change'));
        return getMyTrial();
      })
      .then((res) => {
        localStorage.setItem('hasInquiry', res?.data ? 'true' : 'false');
        window.dispatchEvent(new Event('inquiry-change'));
        navigate('/profile');
      })
      .catch((err) => {
        if (err.response?.status === 404 && err.config?.url?.includes('trials/me')) {
          localStorage.setItem('hasInquiry', 'false');
          window.dispatchEvent(new Event('inquiry-change'));
          navigate('/profile');
          return;
        }
        setError(err.response?.data?.message || 'Registration failed.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-bg-alt flex items-center justify-center py-12 px-4">
      <Seo title="Register" description="Create your Babul Quran account. Register for online Quran classes and free trial." />
      <div className="w-full max-w-md bg-white rounded-xl shadow-card border border-gray-200 p-8 animate-scale-in">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center flex items-center justify-center gap-2">
          <HiUserAdd className="w-7 h-7 text-primary" /> Register
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Create your Babul Quran account
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" name="name" required placeholder="Your name" />
          <Input label="Email" name="email" type="email" required placeholder="your@email.com" />
          <Input label="Password" name="password" type="password" required minLength={6} placeholder="Min 6 characters" />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
