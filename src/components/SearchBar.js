import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  InputBase
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 500
    }
  }
}));

export default function SearchBar({ onSearchInputChange }) {
  const classes = useStyle();
  return (
    <div>
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Stackoverflow-Search
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  onSearchInputChange(e.target.value);
                }
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
