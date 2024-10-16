import React from 'react';
import Image from 'next/image';
import { NeonData } from '@/types/commonTypes';
import ResourceResolver from '@/utils/ResourceResolver';
import { get } from 'lodash';

const dimensions = {
    small: { width: 50, height: 50, crop: 'Square_small' },
    medium: { width: 100, height: 100, crop: 'Square_large' }
};

type SiteLogoProps = {
    neonData: NeonData;
    size: 'small' | 'medium' | 'large';
};

const SiteLogo: React.FC<SiteLogoProps> = ({ neonData, size }) => {
    const resolvedLogoUrl = ResourceResolver(get(neonData, `siteContext.logoUrl`)) || '';

    return (
        <Image
            src={resolvedLogoUrl}
            width={dimensions[size || 'medium'].width}
            height={dimensions[size || 'medium'].height}
            alt={''}
            priority={true}
        />
    );
};

export default SiteLogo;
