import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { fontSansSerif } from '@/themes/stripes/stripes-theme';
import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import React from 'react';
import { findElementsInContentJson } from 'src/utils/ContentUtil';

type ContentProps = {
    data: any;
    variant?: Variant;
};

const Summary: React.FC<ContentProps> = ({ data, variant }) => {
    if (!data) return null;

    return (
        <Typography
            sx={{ textDecorationColor: 'transparent !important' }}
            variant={variant || 'body1'}
            fontFamily={fontSansSerif}
            color="#999"
        >
            <RenderContentElement jsonElement={findElementsInContentJson(['summary'], data.object.helper.content)[0]} />
        </Typography>
    );
};
export default Summary;
