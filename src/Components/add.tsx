import { Container, Grid, Box, TextField, Typography, Paper, Button } from '@material-ui/core';
import React from 'react';
import useStyle from './styling';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';
import axios from 'axios';
interface Data {
    pizzaName : string
    ingredients : string
}
const Add : React.FC<RouteComponentProps> = ({history}) => {
    const url = "http://localhost/Ciproject/index.php/RESTAPI/RestController/pizza"
    const classes = useStyle()
    const [pizzaName,setName] = useState<Data["pizzaName"]>("")
    const [ingredients,setIngredients] = useState<Data["ingredients"]>("")
    const formSubmit = async(e:React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const formData = {
            pizzaName : pizzaName,
            ingredients : ingredients
        }
        const res = await axios.post(url,formData)
        console.log(res.status);
        if(res.status === 200){
            history.push('/pizzas-page')
        }else{
            alert("Failed to Add pizza")
            history.go(0)
        }
    }
    return (
        <div className={classes.root}>
            <Container>
                <Box display='flex' justifyContent='center' paddingY={2}>
                <Typography variant='h5'>Add a Pizza</Typography>
                </Box>
                <Grid className={classes.grid} container>
                    <Grid item lg={6} md={8} xs={12}>
                        <Paper>
                        <form onSubmit={formSubmit}>
                            <Box display='flex' flexDirection='column'>
                                <TextField className={classes.defaultMargin} type='text' variant="outlined" name="pizzaName" required label="Pizza Name" onChange={(e)=>{setName(e.target.value)}} value={pizzaName}/>
                                <TextField className={classes.defaultMargin} type='text' variant="outlined" required label="Insert Ingredients" onChange={(e)=>{setIngredients(e.target.value)}} value={ingredients}/>
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

export default withRouter(Add)