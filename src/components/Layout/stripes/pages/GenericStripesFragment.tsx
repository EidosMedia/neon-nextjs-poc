import BreakingNewsFragment from '@/components/Fragment/BreakingNewsFragment';
import LiveblogFragment from './fragments/LiveblogFragment';
import StoryFragment from './fragments/StoryFragment';
import React from 'react';
import { GenericPageProps } from 'src/types/commonTypes';

type GenericFragmentProps = GenericPageProps & {
    gridContext?: any;
    size?: string;
};

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.analyticsReport
 * @param root0.gridContext
 */
const GenericStripesFragment: React.FC<GenericFragmentProps> = ({ neonData, gridContext, size }) => {
    if (neonData) {
        switch (neonData.object.data.sys.baseType) {
            case 'article':
                switch (neonData.object.data.sys.type) {
                    case 'breakingnews':
                        return <BreakingNewsFragment neonData={neonData} />;
                    default:
                        return <StoryFragment neonData={neonData} gridContext={gridContext} size={size} />;
                }
            case 'liveblog':
                return <LiveblogFragment neonData={neonData} gridContext={gridContext} size={size} />;
        }
    }
    return null;
};

export default GenericStripesFragment;
