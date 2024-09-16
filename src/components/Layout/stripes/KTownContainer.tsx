import { Box, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';

const KTownContainer = () => {
    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                height: '300px',
                width: '100%'
            }}
        >
            <Image
                src={small ? '/static/img/stripes/ktown_logo_s.jpg' : '/static/img/stripes/ktown_logo_l.jpg'}
                fill
                alt=""
                style={{
                    objectFit: 'contain'
                }}
                priority={true}
            />
        </Box>
    );
};
export default KTownContainer;
