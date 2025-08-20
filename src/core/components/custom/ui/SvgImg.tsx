import React from 'react';
import { cn } from '@/core/utils';
import { ImgNormalCustom } from './ImgsCustom';

const SvgComponent = ({ className = '', src, alt }) => {
  return (
    <ImgNormalCustom className={cn('inline-block size-6', className)} src={src} alt={alt} width={24} height={24} />
  );
};

export default SvgComponent;
