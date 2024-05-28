import * as React from 'react';
import StoryFragmentMedium from './components/StoryFragmentMedium';
import StoryFragmentSmall from './components/StoryFragmentSmall';

type FragmentProps = any;
/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.gridContext
 */
const StoryFragment: React.FC<FragmentProps> = ({ neonData, gridContext, size }) => {
    if (size === 'medium') return <StoryFragmentMedium data={neonData} />;
    if (size === 'small') return <StoryFragmentSmall data={neonData} />;

    return (
        <React.Fragment>
            <StoryFragmentMedium data={neonData} />
            <StoryFragmentSmall data={neonData} />
        </React.Fragment>
    );
};

export default StoryFragment;
