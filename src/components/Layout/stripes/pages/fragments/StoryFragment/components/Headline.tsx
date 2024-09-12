import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { NeonData } from '@/types/commonTypes';
import { findElementsInContentJson } from '@/utils/ContentUtil';
import { FC } from 'react';
import { SxProps, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { fontSansSerif } from '@/themes/stripes/stripes-theme';

type ContentItemProps = {
    data: NeonData;
    variant?: Variant;
    sx?: SxProps;
};

const Headline: FC<ContentItemProps> = ({ data, variant, sx }) => {
    if (!data) return null;

    return (
        <Typography sx={sx} variant={variant || 'h6'}>
            <RenderContentElement
                jsonElement={findElementsInContentJson(['headline'], data?.object?.helper?.content)[0]}
            />
        </Typography>
    );
};

export default Headline;
