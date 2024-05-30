import React from 'react';
import { getMainImageUrl } from '@/services/neon-cms/neon-helpers';
import Image from 'next/image';
import { NeonData } from '@/types/commonTypes';

const NO_THUMB_URL = '/static/img/nothumb.jpeg';

const dimensions = {
    small: { width: 200, height: 200, crop: 'Square_small'},
    medium: { width: 350, height: 350, crop: 'Square_large' },
    large: { width: 550, height: 287, crop: 'Wide_small' }
};

type StoryFragmentMainMediaProps = {
    data: NeonData;
    size: 'small' | 'medium' | 'large';
};

const StoryFragmentMainMedia: React.FC<StoryFragmentMainMediaProps> = ({ data, size }) => {
    const mainImageUrl = getMainImageUrl(data, dimensions[size || 'medium'].crop);

    return (
        <Image
            src={mainImageUrl || NO_THUMB_URL}
            width={dimensions[size || 'medium'].width}
            height={dimensions[size || 'medium'].height}
            alt={NO_THUMB_URL}
            priority={true}
        />
    );
};

export default StoryFragmentMainMedia;
