import Image from 'next/image';
import AuthCard from './AuthCard';
import LoginForm from './forms/LoginForm';

interface Props {
  registerHref?: string;
  title?: string;
}

function LoginPage({ registerHref, title }: Props) {
  return (
    <div className=" max-w-5xl w-full grid grid-cols-2 max-md:grid-cols-1 mx-auto">
      <AuthCard title={title || ''}>
        <LoginForm registerHref={registerHref} />
      </AuthCard>
      <div className="max-md:hidden size-full max-h-[42rem] overflow-hidden rounded-2xl ">
        <Image
          src={'/auth/login-image.png'}
          width={200}
          height={200}
          unoptimized
          alt="تصویر فورم ورود و ثبت نام"
          className="object-contain size-full"
        />
      </div>
    </div>
  );
}

export default LoginPage;
