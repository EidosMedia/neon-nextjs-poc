import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { experiments } from '../../../abtesting.config';
import { AppBar, Box, Toolbar } from '@mui/material';

const currentExperiment = experiments[0]

export default function AbTestingPreviewController({ handleSetPreviewVariant }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index, variantId) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        handleSetPreviewVariant(variantId)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="fixed" color="transparent" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar sx={{display:'flex', justifyContent:'flex-end'}}>
                <div>
                    <List
                        component="nav"
                        aria-label="A/B Testing Variant"
                        sx={{ bgcolor: 'background.paper' }}
                    >
                        <ListItem
                            button
                            id="ab-button"
                            aria-haspopup="listbox"
                            aria-controls="ab-menu"
                            aria-label="A/B Testing Variant"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClickListItem}
                        >
                            <ListItemText
                                primary="A/B Testing Variant"
                                secondary={currentExperiment.variants[selectedIndex].name}
                            />
                        </ListItem>
                    </List>
                    <Menu
                        color="secondary"
                        id="ab-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'ab-button',
                            role: 'listbox',
                        }}
                    >
                        {currentExperiment.variants.map((variant, index) => (
                            <MenuItem
                                key={variant.id}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index, currentExperiment.id + "." + variant.id)}
                            >
                                {variant.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}