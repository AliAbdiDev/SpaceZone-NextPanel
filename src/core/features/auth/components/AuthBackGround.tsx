'use client';

import BackGroundGalexy from '@/core/components/custom/ui/background/BackGroundGalexy';
import useMobile from '@/core/hooks/custom/useMobile';
import useResourceLimited from '@/core/hooks/custom/useResourceLimited';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function AuthBackground() {
  const [isPending, setIsPending] = useState(true);
  const { isMobile } = useMobile();
  const { isResourceLimited } = useResourceLimited();
  const [disableAnimation, setDisableAnimation] = useState(false);

  useEffect(() => {
    setIsPending(false);
  }, []);

  useEffect(() => {
    if (!isResourceLimited || isPending) return;
    setTimeout(() => {
      toast(<span>منابع شما محدود است!</span>, {
        description: (
          <div>
            شما می‌توانید از طریق دکمه زیر انیمیشن صفحه را غیرفعال کنید
            <Link href="/" className="underline underline-offset-2 text-secondary-foreground px-1">
              بیشتر بدانید...
            </Link>
            <p className="text-xs">(این تستر دمو است)</p>
          </div>
        ),
        action: {
          label: 'غیرفعال کردن',
          onClick() {
            setDisableAnimation(true);
          },
        },
      });
    }, 0);
  }, [isResourceLimited, isPending]);

  if (isPending) return null;

  const notShowBackgrond = isMobile || isResourceLimited;

  return (
    <>
      {notShowBackgrond ? null : (
        <BackGroundGalexy
          disableAnimation={disableAnimation}
          mouseRepulsion={!disableAnimation}
          mouseInteraction={!disableAnimation}
          density={1.6}
          glowIntensity={0.5}
          saturation={0.4}
          hueShift={240}
          speed={0.3}
        />
      )}
    </>
  );
}

export default AuthBackground;
