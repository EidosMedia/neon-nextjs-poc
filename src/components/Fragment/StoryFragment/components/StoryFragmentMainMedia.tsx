import React from 'react';
import { getMainImageUrl } from '@/services/neon-cms/neon-helpers';
import Image from 'next/image';
import { NeonData } from '@/types/commonTypes';

const NO_THUMB_URL = '/static/img/nothumb.jpeg';

const dimensions = {
    small: { width: 350, height: 200 },
    medium: { width: 350, height: 200 },
    large: { width: 700, height: 400 }
};

type StoryFragmentMainMediaProps = {
    data: NeonData;
    size: 'small' | 'medium' | 'large';
};

const StoryFragmentMainMedia: React.FC<StoryFragmentMainMediaProps> = ({ data, size }) => {
    const mainImageUrl = getMainImageUrl(data);

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
