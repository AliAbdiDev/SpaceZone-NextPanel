import OtpField from '@/core/components/custom/ui/inputs/OtpField';
import { Card, CardContent } from '@/core/components/shadcn/ui/card';
import AuthButton from '@/core/features/auth/components/AuthButton';
import AuthHeader from '@/core/features/auth/components/AuthHeader';

function Page() {
  return (
    <Card className="w-full relative">
      <CardContent className="space-y-16">
        <AuthHeader title="Space Zone" description="کد تایید را وارد کنید" />

        <form className="space-y-8 w-full flex items-center justify-center flex-col">
          <OtpField />
          <AuthButton label="ورود" />
        </form>
      </CardContent>
    </Card>
  );
}

export default Page;
