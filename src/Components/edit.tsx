import { Container, Grid, Box, TextField, Typography, Paper, Button } from '@material-ui/core';
import React from 'react';
import useStyle from './styling';
import { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import { RootStateOrAny, useSelector } from 'react-redux';
interface Data {
    id: Number
    pizzaName: string
    ingredients: string
}
const Edit: React.FC<any> = ({ history }) => {
    const classes = useStyle()
    const url = "http://localhost/Ciproject/index.php/RESTAPI/RestController/pizza"
    const pizzaState = useSelector((state : RootStateOrAny) => state.pizza)
    const [pizzaName, setName] = useState<Data["pizzaName"]>("")
    const [ingredients, setIngredients] = useState<Data["ingredients"]>("")
    useEffect(() => {
        handleEditDate()
    }, [])
    const handleEditDate = async() => {
        setName(pizzaState.pizzaToEdit.pizzaName)
        setIngredients(pizzaState.pizzaToEdit.ingredients)
    }
    const formSubmit = async (e : React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = {
            pizzaName : pizzaName,
            ingredients : ingredients
        }
        const res = await axios.put(url+`/${pizzaState.pizzaToEdit.id}`,formData);
        if(res.status === 200){
            history.push('/pizzas-page')
        }else{
            alert("Failed to Edit, Error : "+ res.status);
        }
    }
    return (
        <div className={classes.root}>
            <Container>
                <Box display='flex' justifyContent='center' paddingY={2}>
                    <Typography variant='h5'>Update Pizza Info</Typography>
                </Box>
                <Grid className={classes.grid} container>
                    <Grid item md={6} xs={12}>
                        <Paper>
                            <form onSubmit={formSubmit}>
                                <Box display='flex' flexDirection='column'>
                                    <TextField className={classes.defaultMargin} type='text' variant="outlined" required label="Pizza Name" onChange={(e) => { setName(e.target.value) }} value={pizzaName} />
                                    <TextField className={classes.defaultMargin} type='text' variant="outlined" required label="Insert Ingredients" onChange={(e) => { setIngredients(e.target.value) }} value={ingredients} />
                                    <Box display='inline-flex' justifyContent='center' className={classes.defaultMargin} >
                                        <Button type='submit' className={classes.homebtn}>Confirm</Button>
                                        <Link to='/pizzas-page' className={classes.links}>
                                            <Button>Cancel</Button>
                                        </Link>
                                    </Box>
                                </Box>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );

}

export default withRouter(Edit)