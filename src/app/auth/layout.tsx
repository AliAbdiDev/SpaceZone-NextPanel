import dynamic from 'next/dynamic';

const AuthBackground = dynamic(() => import('@/core/features/auth/components/AuthBackGround'));

function layout({ children }) {
  return (
    <div className="min-h-screen w-full bg-black relative max-sm:bg-gradient-to-r from-black to-gray-900">
      <div className="absolute inset-0 w-full h-full z-0">
        <AuthBackground />
      </div>
      <div className="absolute inset-0 z-10 w-full max-w-md max-sm:size-full mx-auto flex items-center">{children}</div>
    </div>
  );
}

export default layout;
