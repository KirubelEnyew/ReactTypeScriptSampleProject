import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    CardActions: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
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
            backgroundColor: 'green'
        }
    },
    addBtn: {
        backgroundColor: 'aqua',
        color: 'black',
        '&:hover': {
            backgroundColor: 'lightblue',
            color: 'white'
        }
    },
    toolbar: theme.mixins.toolbar,
    grid: {
        display: 'flex',
        justifyContent: 'center'
    },
    links: {
        textDecoration: 'none'
    },
    card: {
        background: 'rgb(197,200,200)',
        margin: '10px',
        height : '25vh',
        width : '40vh'
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