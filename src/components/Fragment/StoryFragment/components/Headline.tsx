import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { NeonData } from 'src/types/commonTypes';
import { findElementsInContentJson } from 'src/utils/ContentUtil';
import { FC } from 'react';

type ContentItemProps = {
    data: NeonData;
};

const Headline: FC<ContentItemProps> = ({ data }) => {
    return (
        <RenderContentElement jsonElement={findElementsInContentJson(['headline'], data.object.helper.content)[0]} />
    );
};

export default Headline;
