import React, { useState, useEffect, useMemo } from 'react';
import {
  makeStyles,
  Typography,
  Divider,
  CircularProgress
} from '@material-ui/core';
import SearchResults from '../components/SearchResults';
import CachedSearch from '../utils/CachedSearch';

const useStyle = makeStyles(theme => ({
  progress: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default function Home({ query }) {
  const classes = useStyle();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  async function getData(term) {
    setIsLoading(true);
    const response = await fetch(
      `https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&site=stackoverflow&q=${term}`
    );

    const data = await response.json();
    setIsLoading(false);

    return data.items;
  }

  const cachedSearch = useMemo(() => new CachedSearch(getData, setResults), []);

  useEffect(() => {
    cachedSearch.getSearchResults(query);
  }, [query, cachedSearch]);

  return (
    <React.Fragment>
      <Typography component="h1" variant="h6" align="left">
        Search Results {query ? `for ${query}` : ''}
      </Typography>
      <Divider />
      {!isLoading && <SearchResults results={results} />}
      {isLoading && (
        <CircularProgress
          disableShrink
          className={classes.progress}
          size={100}
          color="primary"
        />
      )}
    </React.Fragment>
  );
}
