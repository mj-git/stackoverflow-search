import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles, Container, Grid, Paper } from '@material-ui/core';
import Home from './pages/Home';
import SearchBar from './components/SearchBar';
import Answers from './pages/Answers';

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  progress: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const classes = useStyle();
  return (
    <div className={classes.root}>
      <SearchBar onSearchInputChange={term => setSearchTerm(term)}></SearchBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <BrowserRouter basename="/stackoverflow-search">
                  <Switch>
                    <Route
                      path="/"
                      exact
                      render={props => <Home {...props} query={searchTerm} />}
                    ></Route>
                    <Route path="/:id/:title" component={Answers} />
                    <Route
                      render={() => <h1>404..Page doesn't exist</h1>}
                    ></Route>
                  </Switch>
                </BrowserRouter>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
