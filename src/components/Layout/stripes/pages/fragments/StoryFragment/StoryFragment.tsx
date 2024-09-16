import * as React from 'react';
import StoryFragmentMedium from './components/StoryFragmentMedium';
import StoryFragmentSmall from './components/StoryFragmentSmall';
import _ from 'lodash';

type FragmentProps = any;
/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.gridContext
 */
const StoryFragment: React.FC<FragmentProps> = ({ neonData, gridContext, size }) => {
    if (size === 'medium')
        return <StoryFragmentMedium data={neonData} theme={_.get(neonData, 'siteContext.root.attributes.theme')} />;
    if (size === 'small') return <StoryFragmentSmall data={neonData} />;

    return (
        <React.Fragment>
            <StoryFragmentMedium data={neonData} theme={_.get(neonData, 'siteContext.root.attributes.theme')} />
            <StoryFragmentSmall data={neonData} />
        </React.Fragment>
    );
};

export default StoryFragment;
