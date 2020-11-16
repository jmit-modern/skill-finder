import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionsActions from '../../store/modules/questions'
import { Grid, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormattedMessage } from "react-intl";

class Priority extends React.Component{
  constructor(props){
    super(props)
  }

  handleChange = (e) => {
    const { QuestionsActions } = this.props;
    QuestionsActions.changePriority(e.target.value);
  }

  render() {
    const { handleChange } = this;
    const { priority } = this.props;

    return(
      <>
        <div className="question" data-qid="11">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              <FormattedMessage id="QUESTIONS.PRIORITY.TITLE" />
            </Typography>
            <RadioGroup
              aria-label="priority"
              name="priority"
              className={"group"}
              value={priority}
              onChange={handleChange}
            >
              <FormControlLabel value="cost" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.PRIORITY.OPTION1" />} />
              <FormControlLabel value="quality" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.PRIORITY.OPTION2" />} />
              <FormControlLabel value="delivery" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.PRIORITY.OPTION3" />} />
            </RadioGroup>
          </FormControl>
        </div>

        <Grid container justify="flex-end" style={{marginTop: '20px'}}>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/designer">
              <FormattedMessage id="BUTTONS.PREV" />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/result">
              <FormattedMessage id="BUTTONS.NEXT" />
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  priority: state.questions.priority
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Priority);