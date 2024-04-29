import BreadCrumb from '@/components/Furnitures/BreadCrumb';
import { Box, Breakpoint, Container } from '@mui/material';
import { BlockProps } from '../ArticlePage.types';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
const BreadcrumbBlock: React.FC<BlockProps> = ({ neonData, styleVariant }) => {
    let justify = 'center';
    let maxWidth = 'md';
    if (styleVariant && styleVariant === 'leftAligned') {
        justify = 'left';
        maxWidth = 'lg';
    }

    const render = (
        <Container sx={{ my: 0 }} maxWidth={maxWidth as Breakpoint}>
            <Box display="flex" justifyContent={justify} alignItems={justify}>
                <BreadCrumb neonData={neonData} />
            </Box>
        </Container>
    );
    return render;
};

export default BreadcrumbBlock;
