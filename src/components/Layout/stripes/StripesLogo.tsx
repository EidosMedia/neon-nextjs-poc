// <a href="/" class="logo db no-underline ">
// <img style="aspect-ratio: 15 / 2;" alt="Stars and Stripes" src="https://www.stripes.com/theme/images/stripes-logo-black.svg">
// </a>

import React from 'react';
import Image from 'next/image';
import { NeonData } from '@/types/commonTypes';
import ResourceResolver from '@/utils/ResourceResolver';
import _ from 'lodash';
import logger from 'logger';

const dimensions = {
    small: { width: 50, height: 50, crop: 'Square_small' },
    medium: { width: 100, height: 100, crop: 'Square_large' }
};

type SiteLogoProps = {
    neonData: NeonData;
};

const SiteLogo: React.FC<SiteLogoProps> = ({ neonData }) => {
    const resolvedLogoUrl = '/static/img/stripes/stripes-logo-black.svg';

    return <Image src={resolvedLogoUrl} width={500} height={100} alt="" priority={true} />;
};

export default SiteLogo;
