import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, ArrowLeft, KeyRound, CheckCircle } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const ForgotPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const tokenFromURL = searchParams.get('token'); // ambil token dari URL jika ada

  // Jika ada token di URL → langsung ke step reset password
  const [step, setStep] = useState(tokenFromURL ? 2 : 1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(tokenFromURL || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tokenFromURL) {
      setToken(tokenFromURL);
      setStep(2);
    }
  }, [tokenFromURL]);

  // Step 1: Kirim username + email
  const handleEmail = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setStep(1.5);
    } catch {
      setError('Gagal terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset password dengan token dari URL
  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Password tidak cocok');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setStep(3);
    } catch {
      setError('Gagal terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 relative overflow-hidden">
      <style>{`html, body { background-color: #030712; }`}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Portfolio</h1>
          <p className="text-gray-400 mt-2 text-sm">Reset password akun kamu</p>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <KeyRound size={22} className="text-purple-400" /> Lupa Password
          </h2>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-purple-500' : 'bg-gray-800'}`} />
            ))}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm mb-5">
              {error}
            </div>
          )}

          {/* Step 1: Input username + email */}
          {step === 1 && (
            <form onSubmit={handleEmail} className="space-y-4">
              <p className="text-gray-400 text-sm">
                Masukkan username dan email yang terdaftar pada akun kamu.
              </p>

              {/* Username */}
              <div>
                <label className="text-sm text-gray-400 block mb-1">Username</label>
                <input
                  type="text" required value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Username akun kamu"
                  className="w-full bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-colors text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-400 block mb-1">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3.5 text-gray-500" />
                  <input
                    type="email" required value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email terdaftar akun kamu"
                    className="w-full bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-xl pl-10 pr-4 py-3 text-white outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 rounded-xl text-white font-semibold transition-all duration-300">
                {loading ? 'Memeriksa...' : 'Kirim Link Reset'}
              </button>
            </form>
          )}

          {/* Step 1.5: Cek email */}
          {step === 1.5 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                <Mail size={28} className="text-purple-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg mb-2">Cek Email Kamu!</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Link reset password sudah dikirim ke <span className="text-purple-400 font-medium">{email}</span>.
                  Klik link di email untuk melanjutkan.
                </p>
              </div>
              <button onClick={() => { setStep(1); setUsername(''); setEmail(''); setError(''); }}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                kembali
              </button>
            </div>
          )}

          {/* Step 2: Buat password baru (dari link email, token sudah ada di URL) */}
          {step === 2 && (
            <form onSubmit={handleReset} className="space-y-4">
              <p className="text-gray-400 text-sm">
                Buat password baru untuk akun kamu.
              </p>
              <div>
                <label className="text-sm text-gray-400 block mb-1">Password Baru</label>
                <input
                  type="password" required value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-colors text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">Konfirmasi Password</label>
                <input
                  type="password" required value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password baru"
                  className="w-full bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-colors text-sm"
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 rounded-xl text-white font-semibold transition-all duration-300">
                {loading ? 'Memproses...' : 'Simpan Password Baru'}
              </button>
            </form>
          )}

          {/* Step 3: Sukses */}
          {step === 3 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={28} className="text-green-400" />
              </div>
              <div>
                <p className="text-green-400 font-semibold text-lg mb-2">Password Berhasil Diubah!</p>
                <p className="text-gray-400 text-sm">Silakan login dengan password baru kamu.</p>
              </div>
              <Link to="/login"
                className="inline-block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl text-white font-semibold transition-all duration-300 text-center">
                Masuk Sekarang
              </Link>
            </div>
          )}

          {(step === 1 || step === 2) && (
            <div className="flex items-center justify-center mt-6">
              <Link to="/login" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                <ArrowLeft size={14} /> Kembali ke Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;