import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { findElementsInContentJson } from '@/utils/ContentUtil';
import { FC } from 'react';

type ContentElementProps = {
    content: any;
    name: string;
};

const ContentElement: FC<ContentElementProps> = ({ content, name }) => (
    <RenderContentElement jsonElement={findElementsInContentJson([name], content)[0]} />
);

export default ContentElement;
