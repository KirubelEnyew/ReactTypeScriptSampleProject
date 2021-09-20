import { Box, Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import useStyle from './styling';
interface Data {
    id: Number
    pizzaName: String
    ingredients: String
}
const Home: React.FC<RouteComponentProps> = ({ history }) => {
    const url = "http://localhost/Ciproject/index.php/RESTAPI/RestController/pizza"
    const classes = useStyle()
    const [data, setData] = useState<Array<Data>>([])
    useEffect(() => {
        dataSetter()
    }, [])
    const deletePizza = async (id: any) => {
        const res = await axios.delete(url + `/${id}`)
        if (res.status === 200) {
            history.go(0)
        } else {
            alert("Deletion failed")
            history.go(0)
        }
    }
    const dataSetter = async () => {
        const res = await axios.get(url)
        console.log(res.data);
        setData(res.data.data)
    }
    return (
        <div className={classes.root}>
            <Container>
                <Grid container className={classes.grid}>
                    <Grid item lg={12} md={6} sm={2}>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='h4' >The Pizzas</Typography>
                        </Box>
                        <Box display='flex' flexDirection='row'>
                            {data.map((values: { id: any, pizzaName: String | undefined, ingredients: String | undefined }) => (
                                <Card key={values.id} className={classes.card}>
                                    <CardContent>
                                        <Typography variant='h5'>{values.pizzaName}</Typography>
                                        <Typography variant='h6'>{values.ingredients}</Typography>
                                    </CardContent>
                                    <CardActions className={classes.CardActions}>
                                        <Button className={classes.cardButtons} onClick={() => deletePizza(values.id)}>Remove</Button>
                                        <Button className={classes.cardButtons} onClick={() => { const editData = { id: values.id, pizzaName: values.pizzaName, ingredients: values.ingredients }; history.push({ pathname: '/edit-pizza', state: { editData } }) }}>Edit</Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );

}

export default withRouter(Home);