import { Breadcrumbs, Link as MUILink } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { getCurrentLiveSite, getObjectMainSection } from '../../services/neon-cms/neon-helpers';

const BreadCrumb = ({ neonData }) => {
    let render = null;

    const section = getObjectMainSection(neonData.object.data);

    if (section) {
        const content = [
            <MUILink
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="/"
                key="main"
            >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                {neonData.siteContext?.siteStructure?.find(site => site.name === getCurrentLiveSite(neonData)).title}
            </MUILink>
        ];

        let sectionUrl = '';

        section.split('/').forEach(token => {
            if (token) {
                sectionUrl += `/${token}`;
                content.push(
                    <MUILink
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href={sectionUrl}
                        key={sectionUrl}
                    >
                        {token}
                    </MUILink>
                );
            }
        });

        render = (
            <Breadcrumbs separator=">" aria-label="breadcrumb">
                {content}
            </Breadcrumbs>
        );
    }
    return render;
};

export default BreadCrumb;
