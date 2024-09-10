// <a href="/" class="logo db no-underline ">
// <img style="aspect-ratio: 15 / 2;" alt="Stars and Stripes" src="https://www.stripes.com/theme/images/stripes-logo-black.svg">
// </a>

import React from 'react';
import Image from 'next/image';
import { NeonData } from '@/types/commonTypes';

type SiteLogoProps = {
    neonData: NeonData;
};

const SiteLogo: React.FC<SiteLogoProps> = ({ neonData }) => {
    const resolvedLogoUrl = '/static/img/stripes/stripes-logo-black.svg';

    return <Image src={resolvedLogoUrl} width={500} height={100} alt="" priority={true} />;
};

export default SiteLogo;
