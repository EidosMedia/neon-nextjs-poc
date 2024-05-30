import React from 'react';
import { getMainImageUrl } from '@/services/neon-cms/neon-helpers';
import { Box, Container } from '@mui/material';
import Image from 'next/image';
import { NeonData } from 'src/types/commonTypes';

const dimensions = {
    small: { width: 200, height: 200 },
    medium: { width: 200, height: 200 },
    large: { width: 700, height: 400 }
};

type StoryFragmentMainMediaProps = {
    data: NeonData;
    size: 'small' | 'medium' | 'large';
};

const StoryFragmentMainMedia: React.FC<StoryFragmentMainMediaProps> = ({ data, size }) => {
    const mainImageUrl = getMainImageUrl(data, "Square_small");

    return (
        <Image
            src={mainImageUrl}
            width={dimensions[size || 'medium'].width}
            height={dimensions[size || 'medium'].height}
            alt=""
            priority={true}
        />
    );
};

export default StoryFragmentMainMedia;
