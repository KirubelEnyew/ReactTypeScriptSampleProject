import React, { Suspense } from 'react';
import Home from './Components/home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from './Components/nav';
import useStyle from './Components/styling';
import { LinearProgress } from '@material-ui/core';
// import Add from './Components/add';
// import Edit from './Components/edit';
const Add = React.lazy(() => import('./Components/add'))
const Edit = React.lazy(() => import('./Components/edit'))
function App() {
  const classes = useStyle()
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className={classes.linearProgressRoot}>
          <NavigationBar/>
          <LinearProgress/>
        </div>
      }>
        <div className={classes.root}>
          <div className={classes.toolbar}>
            <NavigationBar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/pizzas-page' component={Home} />
              <Route path='/add-pizza' component={Add} />
              <Route path='/edit-pizza' component={Edit} />
            </Switch>
          </div>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
