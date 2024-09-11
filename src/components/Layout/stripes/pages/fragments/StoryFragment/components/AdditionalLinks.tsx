import { FC } from 'react';
import { NeonData } from 'src/types/commonTypes';

type AdditionalLinksProps = {
    data: NeonData;
};

const AdditionalLinks: FC<AdditionalLinksProps> = ({ data }) => {
    // let additionalLinks = null;
    // try {
    //     additionalLinks = JSON.parse(data.linkContext.linkData.parameters.customLinks);
    // } catch (e) {}

    // let additionalLinksInlineRender = null;
    // let additionalLinksBelowRender = null;
    // if (additionalLinks) {
    //     additionalLinksInlineRender = additionalLinks
    //         .filter(l => (l[`show_v`] && l[`show_v`] === 'inline') || (!l[`show_v`] && l.show === 'inline'))
    //         .map(l => {
    //             let linkedObjectUrl = '/';
    //             if (data.previewData) {
    //                 // TODO manage the link in preview
    //                 linkedObjectUrl = '/preview';
    //             } else {
    //                 try {
    //                     linkedObjectUrl = data.pageContext.nodes[l.id].url;
    //                     if (!linkedObjectUrl) {
    //                         linkedObjectUrl = data.pageContext.nodesUrls[l.id];
    //                     }
    //                 } catch (e) {}
    //             }
    //             if (!linkedObjectUrl) {
    //                 linkedObjectUrl = '/';
    //             }
    //             return (
    //                 <React.Fragment>
    //                     <span> / </span>
    //                     <NextLink href={linkedObjectUrl} passHref>
    //                         <MUILink underline="hover" component="span" color="secondary" sx={{ fontWeight: 500 }}>
    //                             {l.headline}
    //                         </MUILink>
    //                     </NextLink>
    //                 </React.Fragment>
    //             );
    //         });

    //     additionalLinksBelowRender = additionalLinks
    //         .filter(l => l.show === 'below')
    //         .map(l => {
    //             let linkedObjectUrl = '/';
    //             if (data.previewData) {
    //                 // TODO manage the link in preview
    //                 linkedObjectUrl = '/preview';
    //             } else {
    //                 try {
    //                     linkedObjectUrl = data.pageContext.nodes[l.id].url;
    //                     if (!linkedObjectUrl) {
    //                         linkedObjectUrl = data.pageContext.nodesUrls[l.id];
    //                     }
    //                 } catch (e) {}
    //             }
    //             if (!linkedObjectUrl) {
    //                 linkedObjectUrl = '/';
    //             }
    //             return (
    //                 <Typography variant="body2" component="li">
    //                     <NextLink href={linkedObjectUrl} passHref>
    //                         <MUILink underline="hover" color="grey.500">
    //                             {l.headline}
    //                         </MUILink>
    //                     </NextLink>
    //                 </Typography>
    //             );
    //         });
    //     if (additionalLinksBelowRender) {
    //         additionalLinksBelowRender = <Box sx={{ pb: 1 }}>{additionalLinksBelowRender}</Box>;
    //     }
    // }
    return null;
};

export default AdditionalLinks;
