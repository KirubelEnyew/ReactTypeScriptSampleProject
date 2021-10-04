import { Container, Grid, Box, TextField, Typography, Paper, Button } from '@material-ui/core';
import React, { useCallback } from 'react';
import useStyle from './styling';
import { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
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
    const handleEditData = useCallback(async() => {
        setName(pizzaState.pizzaToEdit.pizzaName)
        setIngredients(pizzaState.pizzaToEdit.ingredients)
    },[pizzaState.pizzaToEdit.ingredients,pizzaState.pizzaToEdit.pizzaName])
    useEffect(() => {
        handleEditData()
    },[handleEditData])
    const formSubmit = async (e : React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = {
            pizzaName : pizzaName,
            ingredients : ingredients
        }
        return await axios.put(url+`/${pizzaState.pizzaToEdit.id}`,formData);
    }
    const queryClient = useQueryClient()
    const mutation = useMutation(formSubmit,{
        onSuccess : ()=>{queryClient.invalidateQueries('Pizzas')}
    })
    return (
        <div className={classes.root}>
            {mutation.isSuccess?history.push('/pizzas-page'):null}
            <Container>
                <Box display='flex' justifyContent='center' paddingY={2}>
                    <Typography variant='h5'>Update Pizza Info</Typography>
                </Box>
                <Grid className={classes.grid} container>
                    <Grid item md={6} xs={12}>
                        <Paper>
                            <form onSubmit={mutation.mutateAsync}>
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