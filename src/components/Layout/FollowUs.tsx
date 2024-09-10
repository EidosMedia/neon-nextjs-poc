import { Box, Typography } from '@mui/material';
import Link from './Link';
import { Comment, Coronavirus, Newspaper, PhotoCamera, Storm } from '@mui/icons-material';

const FollowUs = () => (
    <Box>
        <Typography variant="h2">Follow us</Typography>
        <Box
            sx={{
                border: '1px solid black',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography variant="h2">Explore</Typography>
            <Link href="https://www.stripes.com/covid/" display="flex" alignItems="center" gap="5px">
                <Coronavirus />
                <Typography variant="h4">COVID</Typography>
            </Link>
            <Link
                href="https://www.stripes.com/history/archive_photo_of_the_day/"
                display="flex"
                alignItems="center"
                gap="5px"
            >
                <PhotoCamera />
                <Typography variant="h4">Archive photo of the day</Typography>
            </Link>
            <Link
                href="https://www.stripes.com/theaters/asia_pacific/storm_tracker/"
                display="flex"
                alignItems="center"
                gap="5px"
            >
                <Storm />
                <Typography variant="h4">Pacific Storm Tracker</Typography>
            </Link>
            <Link href="https://www.stripes.com/opinion/" display="flex" alignItems="center" gap="5px">
                <Comment />
                <Typography variant="h4">Opinion</Typography>
            </Link>
            <Link href="https://epub.stripes.com/?issue=GSS_GSS_latest" display="flex" alignItems="center" gap="5px">
                <Newspaper />
                <Typography variant="h4">Today&apos;s ePaper</Typography>
            </Link>
        </Box>
    </Box>
);

export default FollowUs;
