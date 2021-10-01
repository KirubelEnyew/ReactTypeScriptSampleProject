import React from 'react';
import Home from './Components/home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from './Components/nav';
import useStyle from './Components/styling';
import Add from './Components/add';
import Edit from './Components/edit';
import Generic from './Components/genericRoute';
function App() {
  const classes = useStyle()
  return (
    <BrowserRouter>
      <div className={classes.root}>
      <div className={classes.toolbar}>
        <NavigationBar/>
      <Switch>
        <Route path = '/pizzas-page' component = {Home} />
        <Route path = '/gen' component = {Generic} />
        <Route path = '/add-pizza' component = {Add}/>
        <Route path = '/edit-pizza' component = {Edit} />
      </Switch>
      </div>
      </div>
      </BrowserRouter>
    );
}

export default App;
