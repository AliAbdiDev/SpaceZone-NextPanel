import dynamic from 'next/dynamic';
import AuthForm from '@/core/features/auth/components/AuthForm';

const AuthBackground = dynamic(() => import('@/core/features/auth/components/AuthBackGround'));

function Page() {
  return (
    <div className="min-h-screen w-full bg-black relative">
      <div className="absolute inset-0 w-full h-full z-0">
        <AuthBackground />
      </div>
      <div className="absolute inset-0 z-10 w-full max-w-md max-sm:size-full mx-auto flex items-center">
        <AuthForm />
      </div>
    </div>
  );
}

export default Page;
