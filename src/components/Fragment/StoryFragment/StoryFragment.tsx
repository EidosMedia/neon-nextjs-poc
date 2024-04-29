import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RenderContentElement, { CloudinaryVideo } from '../../RenderContent/RenderContentElement';
import { checkIsCloudinaryVideo, findElementsInContentJson, getImageUrl } from '../../../utils/ContentUtil';
import ResourceResolver from '../../../utils/ResourceResolver';
import Image from 'next/image';
import NextLink from 'next/link';
import { Link as MUILink, CardActionArea } from '@mui/material';
import { Box } from '@mui/system';
import { getImageFormatUrl } from '../../../services/neon-cms/neon-helpers';
import { Variant } from '@mui/material/styles/createTypography';
import Headline from './components/Headline';
import AdditionalLinks from './components/AdditionalLinks';
import { getStoryUrl } from './StoryFragment.utils';
import StoryFragmentLarge from './components/StoryFragmentLarge';
import StoryFragmentSmall from './components/StoryFragmentSmall';

type FragmentProps = any;
/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.gridContext
 */
const StoryFragment: React.FC<FragmentProps> = ({ neonData, gridContext }) => {
    return (
        <React.Fragment>
            <StoryFragmentLarge data={neonData} />
            <StoryFragmentSmall data={neonData} />
        </React.Fragment>
    );
};

export default StoryFragment;
