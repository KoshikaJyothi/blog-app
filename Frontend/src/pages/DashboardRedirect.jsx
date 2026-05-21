import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function DashboardRedirect() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'admin') {
      navigate('/admin-dashboard');
    } else if (user.role === 'author') {
      navigate('/author-dashboard');
    } else {
      navigate('/');
    }
  }, [user, navigate]);

  return null;
}
