import './globals.css';

import { AuthProvider } from '@/core/services/state/auth';

function layout({ children }) {
  return (
    <AuthProvider initialToken="" userData={null}>
      <html lang="fr" dir="rtl">
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}

export default layout;
