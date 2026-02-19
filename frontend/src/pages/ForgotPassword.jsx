import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { HiKey } from 'react-icons/hi';
import { Input } from '../components/Forms';
import { Button } from '../components/Buttons';
import { requestPasswordReset, resetPasswordWithCode } from '../services/api';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendCode = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const em = e.target.email?.value?.trim();
    if (!em) {
      setError('Please enter your email.');
      return;
    }
    setLoading(true);
    requestPasswordReset(em)
      .then((res) => {
        setEmail(em);
        setSuccess(res.data?.message || 'Verification code sent to your email.');
        setStep(2);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Failed to send code.');
      })
      .finally(() => setLoading(false));
  };

  const handleVerifyAndReset = (e) => {
    e.preventDefault();
    setError('');
    const codeVal = e.target.code?.value?.trim();
    const passwordVal = e.target.newPassword?.value;
    if (!codeVal) {
      setError('Please enter the verification code.');
      return;
    }
    if (!passwordVal || passwordVal.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    resetPasswordWithCode({ email, code: codeVal, newPassword: passwordVal })
      .then((res) => {
        setSuccess(res.data?.message || 'Password reset successfully.');
        setStep(3);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Invalid code or failed to reset.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-bg-alt flex items-center justify-center py-12 px-4">
      <Seo title="Forgot Password" description="Reset your Babul Quran account password via email verification." />
      <div className="w-full max-w-md bg-white rounded-xl shadow-card border border-gray-200 p-8 animate-scale-in">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center flex items-center justify-center gap-2">
          <HiKey className="w-7 h-7 text-primary" /> Forgot Password
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          {step === 1 && 'Enter your email to receive a verification code.'}
          {step === 2 && 'Enter the code we sent and set a new password.'}
          {step === 3 && 'Your password has been reset. You can now login.'}
        </p>

        {step === 1 && (
          <form onSubmit={handleSendCode} className="space-y-4">
            <Input label="Email" name="email" type="email" required placeholder="your@email.com" />
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send verification code'}
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyAndReset} className="space-y-4">
            <Input
              label="Verification code"
              name="code"
              type="text"
              required
              placeholder="e.g. 123456"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            />
            <Input
              label="New password"
              name="newPassword"
              type="password"
              required
              minLength={6}
              placeholder="Min 6 characters"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset password'}
            </Button>
            <button
              type="button"
              onClick={() => { setStep(1); setError(''); setSuccess(''); }}
              className="w-full text-sm text-gray-500 hover:text-primary"
            >
              Use a different email
            </button>
          </form>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-green-600 text-center">{success}</p>
            <Button to="/login" variant="primary" className="w-full">
              Go to Login
            </Button>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
