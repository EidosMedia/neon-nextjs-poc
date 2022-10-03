import { Breadcrumbs } from "@mui/material";
import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { getCurrentLiveSite, getObjectMainSection } from "../../lib/cobalt-cms/cobalt-helpers";

export default function BreadCrumb({ cobaltData }) {
    console.log(cobaltData)
    const content = [
        <MUILink
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/"
        >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {cobaltData.siteContext.siteStructure.find((site) => site.name === getCurrentLiveSite(cobaltData)).title}
        </MUILink>
    ]

    const section = getObjectMainSection(cobaltData.object.data)
    console.log(section)

    let sectionUrl = ''
    section.split('/').forEach((token) => {
        console.log(token)
        if (token) {
            sectionUrl += '/' + token
            content.push(
                <MUILink
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href={sectionUrl}
                >
                    {token}
                </MUILink>
            )
        }
    })

    const render = (
        <Breadcrumbs separator=">" aria-label="breadcrumb">
            {content}
        </Breadcrumbs>
    )

    return render;
}