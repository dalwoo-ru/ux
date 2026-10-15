import { Navigate, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AuthProvider, useAuth } from './lib/auth';
import { UiProvider } from './ui/Feedback';
import { ThemeToggle } from './ui/ThemeToggle';
import { AuthPage } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Respondent } from './pages/Respondent';
import { TestPage } from './pages/TestPage';

function Private({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}
function Guest({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/" replace /> : <>{children}</>;
}

export default function App() {
  return (
    <UiProvider>
      <AuthProvider>
        <Routes>
          <Route path="/t/:token" element={<Respondent />} />
          <Route path="/login" element={<Guest><AuthPage /></Guest>} />
          <Route path="/register" element={<Guest><AuthPage register /></Guest>} />
          <Route path="/" element={<Private><Dashboard /></Private>} />
          <Route path="/folder/:folderId" element={<Private><Dashboard /></Private>} />
          <Route path="/tests/:id" element={<Private><TestPage /></Private>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
      <ThemeToggle />
    </UiProvider>
  );
}
