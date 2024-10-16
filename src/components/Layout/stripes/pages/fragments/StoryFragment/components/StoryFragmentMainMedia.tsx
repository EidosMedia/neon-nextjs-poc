import React from 'react';
import { getMainImageUrl } from '@/services/neon-cms/neon-helpers';
import Image from 'next/image';
import { NeonData } from '@/types/commonTypes';
import { Box } from '@mui/material';

const NO_THUMB_URL = '/static/img/nothumb.jpeg';

const dimensions = {
    small: { width: 200, height: 200, crop: 'Square_small' },
    medium: { width: 350, height: 350, crop: 'Square_large' },
    wide_small: { width: 240, height: 140, crop: 'Wide_small' },
    large: { width: 550, height: 287, crop: 'Wide_small' }
};

type StoryFragmentMainMediaProps = {
    data: NeonData;
    size: 'small' | 'medium' | 'large' | 'wide_small';
};

const StoryFragmentMainMedia: React.FC<StoryFragmentMainMediaProps> = ({ data, size }) => {
    const mainImageUrl = getMainImageUrl(data, dimensions[size || 'medium'].crop);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" position="relative" minWidth={229} width={229} height={140}>
            <Image src={mainImageUrl || NO_THUMB_URL} fill alt={NO_THUMB_URL} priority={true} />
        </Box>
    );
};

export default StoryFragmentMainMedia;
