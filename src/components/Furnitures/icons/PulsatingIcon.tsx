import { Box } from '@mui/material';
import React from 'react';

const PulsatingIcon = (
    <Box
        component="span"
        sx={{
            borderRadius: '62.5rem',
            display: 'inline-block',
            position: 'relative',
            backgroundColor: '#7aa09c',
            width: '.75em',
            height: '.75em',
            marginRight: '0.4rem',
            verticalAlign: 'initial',
            animation: '3s ease-in 1s infinite reverse both running slidein',

            color: '#7aa09c'
        }}
    />
);

export default PulsatingIcon;
