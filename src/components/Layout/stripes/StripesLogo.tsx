// <a href="/" class="logo db no-underline ">
// <img style="aspect-ratio: 15 / 2;" alt="Stars and Stripes" src="https://www.stripes.com/theme/images/stripes-logo-black.svg">
// </a>

import React from 'react';
import Image from 'next/image';
import { NeonData } from '@/types/commonTypes';
import { Box } from '@mui/material';

type SiteLogoProps = {
    neonData: NeonData;
};

const SiteLogo: React.FC<SiteLogoProps> = ({ neonData }) => {
    const resolvedLogoUrl = '/static/img/stripes/stripes-logo-black.svg';

    return (
        <Box position="relative" width="100%" height="3em">
            <Image
                src={resolvedLogoUrl}
                fill
                style={{
                    objectFit: 'contain'
                }}
                alt=""
                priority={true}
            />
        </Box>
    );
};

export default SiteLogo;
