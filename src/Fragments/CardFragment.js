import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardFragment({templateName, gridContext}) {

    const dummyImage_landscape = 'https://dummyimage.com/1024x576/a8a8a8/FFF&text=landscape'
    const dummyImage_square = 'https://dummyimage.com/600x600/a8a8a8/FFF&text=square'
    const dummyImage_rectangle = 'https://dummyimage.com/800x600/a8a8a8/FFF&text=rectangle'

    let image = dummyImage_rectangle;
    let cardStyle = null;
    let imgStyle = null;

    if (gridContext && (gridContext.md < 6)){
        image = dummyImage_landscape
    }

    if (templateName.includes('picsmall')){
        image = dummyImage_square
        cardStyle = {display: 'flex'}
        imgStyle = {width: '30%'}
    }
    
    
    return (
        <Card square elevation={0} sx={cardStyle}>
            {templateName.includes('pic')?
            <CardMedia
                component="img"
                image={image}
                alt="nothumb"
                sx={imgStyle}
            />:null}
            <CardContent sx={{py:1}}>
                {templateName.includes('head')?
                <Typography gutterBottom variant="h5" component="div">
                    The headline of my story
                </Typography>
                :null}
                {templateName.includes('sum')?
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
                :null}
            </CardContent>
        </Card>
    );
}