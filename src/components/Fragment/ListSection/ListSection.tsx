import { getDwxLinkedObjects } from '@/services/neon-cms/neon-helpers';
import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import GenericFragment from '../GenericFragment';

const ListSection: React.FC<any> = ({ neonData }) => {
    const linkedObjects = getDwxLinkedObjects(neonData, 'list');

    if (!linkedObjects.length) {
        return null;
    }

    return (
        <>
            <Grid container spacing={2}>
                {linkedObjects.map(linkedObject => (
                    <Grid item md={6} key={linkedObject.id}>
                        <GenericFragment neonData={linkedObject} size="small" />
                    </Grid>
                ))}
            </Grid>
            <Divider />
        </>
    );
};

export default ListSection;
