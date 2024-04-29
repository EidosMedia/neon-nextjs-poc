import React from 'react';
import LiveblogFragment from './LiveblogFragment';
import StoryFragment from './StoryFragment';
import BreakingNewsFragment from './BreakingNewsFragment';
import { GenericPageProps } from 'src/types/commonTypes';

type GenericFragmentProps = GenericPageProps & {
    gridContext?: any;
};

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.analyticsReport
 * @param root0.gridContext
 */
const GenericFragment: React.FC<GenericFragmentProps> = ({ neonData, gridContext }) => {
    if (neonData) {
        switch (neonData.object.data.sys.baseType) {
            case 'article':
                switch (neonData.object.data.sys.type) {
                    case 'breakingnews':
                        return <BreakingNewsFragment neonData={neonData} />;
                    default:
                        return <StoryFragment neonData={neonData} gridContext={gridContext} />;
                }
            case 'liveblog':
                return <LiveblogFragment neonData={neonData} gridContext={gridContext} />;
        }
    }
    return null;
};

export default GenericFragment;
