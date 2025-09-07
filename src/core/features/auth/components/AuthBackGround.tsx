'use client';

import BackGroundGalexy from '@/core/components/custom/ui/background/BackGroundGalexy';
import useMobile from '@/core/hooks/custom/useMobile';
import useResourceLimited from '@/core/hooks/custom/useResourceLimited';
import { useEffect, useState } from 'react';

function AuthBackground() {
  const { isMobile } = useMobile();
  const { isResourceLimited } = useResourceLimited();
  const [resourceLimited, setResourceLimited] = useState(false);
  const notShowBackgrond = isMobile || resourceLimited;

  useEffect(() => {
    setResourceLimited(isResourceLimited);
  }, [isResourceLimited]);
  return (
    <>
      {notShowBackgrond ? null : (
        <BackGroundGalexy
          mouseRepulsion={true}
          mouseInteraction={true}
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
