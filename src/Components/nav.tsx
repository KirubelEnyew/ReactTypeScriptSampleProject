import { AppBar, Box, Button, IconButton, Toolbar } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import useStyle from './styling';

const NavigationBar = () => {
    const classes = useStyle();
    return (
        <div className={classes.root}>
            <AppBar position='static' className={classes.appBar}>
                <Toolbar>
                    <Link to='/pizzas-page' className={classes.links}>
                        <IconButton className={classes.homebtn}>
                            <Home/>
                        </IconButton>
                    </Link>
                    <Box display='flex' justifyContent='flex-end' width='100%'>
                    <Link to='/add-pizza' className={classes.links}>
                    <Button className={classes.addBtn}>Add Pizza</Button>
                    </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );

}

export default NavigationBar;