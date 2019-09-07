import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  makeStyles,
  Chip
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  inline: {
    display: 'inline'
  },
  chip: {
    margin: theme.spacing(1)
  },
  link: {
    textDecoration: 'none'
  }
}));

export default function SearchResults({ results }) {
  const classes = useStyle();
  return (
    <React.Fragment>
      <List className={classes.root} component="nav">
        {results.map(result => (
          <React.Fragment key={result.question_id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Link
                    className={classes.link}
                    to={`/${result.question_id}/${result.title}`}
                  >
                    {result.title}
                  </Link>
                }
                secondary={
                  <span>
                    {result.tags.map(tag => (
                      <Chip
                        component="span"
                        key={tag}
                        size="small"
                        color="secondary"
                        label={tag}
                        className={classes.chip}
                      />
                    ))}
                  </span>
                }
              />
            </ListItem>

            <Divider />
          </React.Fragment>
        ))}
      </List>
    </React.Fragment>
  );
}
