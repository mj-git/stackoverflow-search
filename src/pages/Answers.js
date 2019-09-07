import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  makeStyles
} from '@material-ui/core';

// https://api.stackexchange.com/2.2/questions/{props.match.params.id}/answers?order=desc&sort=activity&site=stackoverflow&filter=!9Z(-wzu0T

// https://api.stackexchange.com/2.2/questions/57831065?order=desc&sort=activity&site=stackoverflow&filter=!9Z(-wwYGT

const useStyle = makeStyles(theme => ({
  progress: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default function Answers(props) {
  const classes = useStyle();
  const { id, title } = props.match.params;
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState({});
  useEffect(() => {
    async function getAnswers() {
      setIsLoading(true);
      const qResponse = await fetch(
        `https://api.stackexchange.com/2.2/questions/${id}?order=desc&sort=activity&site=stackoverflow&filter=!9Z(-wwYGT`
      );
      const aResponse = await fetch(
        `https://api.stackexchange.com/2.2/questions/${id}/answers?order=desc&sort=activity&site=stackoverflow&filter=!9Z(-wzu0T`
      );
      const questionData = await qResponse.json();
      const answersData = await aResponse.json();
      setQuestion(questionData.items[0]);
      setAnswers(answersData.items);
      setIsLoading(false);
    }

    getAnswers();
  }, [id]);

  if (isLoading) {
    return (
      <CircularProgress
        disableShrink
        className={classes.progress}
        size={100}
        color="primary"
      />
    );
  }

  return (
    <React.Fragment>
      <Typography color="textPrimary" variant="h5" align="left">
        {title}
      </Typography>
      <Divider />

      <List component="nav">
        <ListItem>
          <ListItemText primary={ReactHtmlParser(question.body)}></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="h6">
                {question.answer_count
                  ? `${question.answer_count} Answers`
                  : ''}
              </Typography>
            }
          />
        </ListItem>
        <Divider />

        {answers.map(answer => (
          <React.Fragment key={answer.answer_id}>
            <ListItem>
              <ListItemText
                primary={ReactHtmlParser(answer.body)}
              ></ListItemText>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </React.Fragment>
  );
}
