import { ButtonLink } from '@/core/components/custom/ui/Buttons';
import OtpField from '@/core/components/custom/ui/inputs/OtpField';
import { Card, CardContent } from '@/core/components/shadcn/ui/card';
import { ArrowLeft } from 'lucide-react';

function Page() {
  return (
    <>
      <Card>
        <CardContent>
          <h1>Enter OTP</h1>
          <p>Please enter the OTP sent to your email</p>
          <ButtonLink variant="outline" href="/auth">
            <ArrowLeft />
          </ButtonLink>
          <OtpField />
        </CardContent>
      </Card>
    </>
  );
}

export default Page;
