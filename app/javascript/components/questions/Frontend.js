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

class Frontend extends React.Component{
  constructor(props){
    super(props)
  }

  handleChange = (e) => {
    const { QuestionsActions } = this.props;
    QuestionsActions.changeFrontend(e.target.value);
  }

  render() {
    const { handleChange } = this;
    const { frontend } = this.props;

    return(
      <>
        <div className="question" data-qid="6">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              <FormattedMessage id="QUESTIONS.FRONTEND.TITLE" />
            </Typography>
            <RadioGroup
              aria-label="Frontend"
              name="frontend"
              className={"group"}
              value={frontend}
              onChange={handleChange}
            >
              <FormControlLabel value="unnecessary" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.FRONTEND.OPTION1" />} />
              <FormControlLabel value="react" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.FRONTEND.OPTION2" />} />
              <FormControlLabel value="vue" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.FRONTEND.OPTION3" />} />
              <FormControlLabel value="angular" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.FRONTEND.OPTION4" />} />
            </RadioGroup>
          </FormControl>
        </div>

        <Grid container justify="flex-end" style={{marginTop: '20px'}}>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/dev_language">
              <FormattedMessage id="BUTTONS.PREV" />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/admin_dashboard">
              <FormattedMessage id="BUTTONS.NEXT" />
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  frontend: state.questions.frontend
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Frontend);