import { Box } from '@mui/material';
import Image from 'next/image';

const KTownContainer = () => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            height: '300px'
        }}
    >
        <Image
            src="/static/img/stripes/ktown_logo_l.jpg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 950px) 50vw, 33vw"
            alt=""
            priority={true}
        />
    </Box>
);
export default KTownContainer;
