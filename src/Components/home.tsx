import { Box, Button, Card, CardActions, CardContent, Container, Grid, LinearProgress, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router';
import { editPizzas } from '../Slices/slice'
import useStyle from './styling';
import { useMutation } from 'react-query';

const url = 'http://localhost/Ciproject/index.php/RESTAPI/RestController/pizza'
const fetchFunction = async () => {
    const res = await axios.get(url)
    return res.data.data
}

const Home: React.FC<RouteComponentProps> = ({ history }) => {
    const classes = useStyle()
    const dispatcher = useDispatch()
    const deletePizza = async (id: any) => {
        return await axios.delete(url + `/${id}`)
    }
    const queryClient = useQueryClient()
    const { data,status } = useQuery('Pizzas',fetchFunction,{
        staleTime : 300000
    }) 
    const mutation = useMutation(deletePizza, {
        onSuccess : ()=> { queryClient.invalidateQueries('Pizzas') }
    })
    return (
        <div className={classes.root}>
            <Container>
                {status === 'loading'? 
                <div className = {classes.linearProgressRoot}>
                <LinearProgress/> 
                </div>
                :
                <Grid container className={classes.grid}>
                    <Grid item lg={12} md={6} sm={2}>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='h4' >The Pizzas</Typography>
                        </Box>
                        <Box display='flex' flexDirection='row' className={classes.gridBox}>
                            {data.map((values: { id: any, pizzaName: String | undefined, ingredients: String | undefined }) => (
                                <Card key={values.id} className={classes.card}>
                                    <CardContent>
                                        <Typography variant='h5'>{values.pizzaName}</Typography>
                                        <Typography variant='h6'>{values.ingredients}</Typography>
                                    </CardContent>
                                    <CardActions className={classes.CardActions}>
                                        <Button className={classes.cardButtons} onClick={() => {mutation.mutateAsync(values.id)}}>Remove</Button>
                                        <Button className={classes.cardButtons} onClick={() => { dispatcher(editPizzas(values)); history.push('/edit-pizza') }}>Edit</Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>
                    </Grid>
                </Grid>}
            </Container>
        </div>
    );

}

export default withRouter(Home);