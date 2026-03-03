import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './Home';
import BlogList from './pages/BlogList';
import BlogDetailPage from './pages/BlogDetail';
import SettingPage from './pages/SettingPage';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginBanner from './components/Loginbanner';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/blog"            element={<BlogList />} />
        <Route path="/blog/:slug"      element={<BlogDetailPage />} />
        <Route path="/setting"         element={<SettingPage />} />
        <Route path="/login"           element={<LoginPage />} />
        <Route path="/register"        element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
      <LoginBanner />
    </AuthProvider>
  );
}