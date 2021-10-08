import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    linearProgressRoot : {
        width : '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
          },
    },
    CardActions: {
        display: 'flex',
        justifyContent: 'center',
    },
    gridBox : {
        flexWrap : 'wrap', 
    },
    appBar: {
        backgroundColor: 'grey'
    },
    homebtn: {
        marginRight: theme.spacing(2),
        backgroundColor: 'lightgreen',
        color: 'white',
        '&:hover': {
            color: 'black',
            backgroundColor: 'darkgreen'
        }
    },
    addBtn: {
            backgroundColor: 'lightblue',
            color: 'white',
        '&:hover': {
        backgroundColor: 'aqua',
        color: 'black',
        }
    },
    toolbar: theme.mixins.toolbar,
    grid: {
        display: 'flex',
        justifyContent: 'center',
    },
    links: {
        textDecoration: 'none'
    },
    card: {
        background: 'rgb(197,200,200)',
        margin: '10px',
        //  width : '213px',
        //  height : '169px'
    },
    cardContent : {  
    },
    cardButtons: {
        color: 'white',
        backgroundColor: 'darkgrey',
        '&:hover': {
            color: 'black',
            backgroundColor: 'grey',
        }
    },
    defaultMargin: {
        margin: '6px'
    }
}))

export default useStyle