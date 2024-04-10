import React from 'react';
import GenericWidget from '../Widgets/GenericWidget';
import LiveblogFragment from './LiveblogFragment';
import StoryFragment from './StoryFragment';
import AnalyticsFragmentOverlay from '../Analytics/AnalyticsFragmentOverlay';
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
const GenericFragment: React.FC<GenericFragmentProps> = ({ neonData, analyticsReport, gridContext }) => {
    let render = null;

    if (neonData) {
        switch (neonData.object.data.sys.baseType) {
            case 'article':
                switch (neonData.object.data.sys.type) {
                    case 'breakingnews':
                        render = <BreakingNewsFragment neonData={neonData} />;
                        break;
                    default:
                        render = <StoryFragment neonData={neonData} gridContext={gridContext} />;
                }
                break;
            case 'widget':
                render = <GenericWidget neonData={neonData} gridContext={gridContext} />;
                break;
            case 'liveblog':
                render = <LiveblogFragment neonData={neonData} gridContext={gridContext} />;
                break;
        }
    }

    if (analyticsReport) {
        render = (
            <AnalyticsFragmentOverlay neonData={neonData} analyticsReport={analyticsReport}>
                {render}
            </AnalyticsFragmentOverlay>
        );
    }

    return render;
};

export default GenericFragment;
