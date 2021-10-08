import { Box, Button, Card, CardActions, CardContent, Container, Grid, LinearProgress, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router';
import { editPizzas } from '../Slices/slice'
import useStyle from './styling';
import { useMutation } from 'react-query';
interface Response {
    status : number,
    message : string,
    data : Array<object>
}
interface pizzaTypes {
    id : any,
    pizzaName : String,
    ingredients : String
}
export const url = 'http://localhost/Ciproject/index.php/RESTAPI/RestController/pizza'
const fetchFunction = async () => {
    const res : any = await axios.get<Response>(url)
    const pizzas : Array<pizzaTypes> = res.data.data
    return pizzas;
}
export const fetcher = async () => {
    return await axios.get(url)
}
const Home: React.FC<RouteComponentProps> = ({ history }) => {
    const classes = useStyle()
    const dispatcher = useDispatch()
    const deletePizza = async (id: any) => {
        return await axios.delete(url + `/${id}`)
    }
    const queryClient = useQueryClient()
    const { data, status } = useQuery('Pizzas', fetchFunction, {
        staleTime: 300000
    })
    const mutation = useMutation(deletePizza, {
        onSuccess: () => { queryClient.invalidateQueries('Pizzas') }
    })
    return (
        <div className={classes.root}>
            <Container maxWidth='xl'>
                {status === 'loading' ?
                    <div className={classes.linearProgressRoot}>
                        <LinearProgress />
                    </div>
                    :
                    <>
                        <Grid container className={classes.grid}>
                            <Grid item xl={12} lg={10} md={8} sm={6} xs={4}>
                                {data === undefined? 
                                <Box display = 'flex' justifyContent='center'>
                                <Typography variant="h4">...NoData Found,Try Again Later</Typography>
                                </Box> :
                                <div>
                                <Box display='flex' justifyContent='center'>
                                    <Typography variant='h4' >The Pizzas</Typography>
                                </Box>
                                <Box display='flex' className={classes.gridBox}>   
                                    {data.map((values) => (
                                        <Card key={values.id} className={classes.card}>
                                            <CardContent className={classes.cardContent}>
                                                <Typography variant='h6'>{values.pizzaName}</Typography>
                                                <Typography variant='subtitle1'>{values.ingredients}</Typography>
                                            </CardContent>
                                            <CardActions className={classes.CardActions}>
                                                <Button className={classes.cardButtons} onClick={() => { mutation.mutateAsync(values.id) }}>Remove</Button>
                                                <Button className={classes.cardButtons} onClick={() => { dispatcher(editPizzas(values)); history.push('/edit-pizza') }}>Edit</Button>
                                            </CardActions>
                                        </Card>
                                    ))}
                                </Box>    
                                </div>
                                }
                            </Grid>
                        </Grid>
                    </>}
            </Container>
        </div>
    );

}

export default withRouter(Home);