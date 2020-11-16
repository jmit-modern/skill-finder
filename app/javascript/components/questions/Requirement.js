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

class Requirement extends React.Component{
  constructor(props){
    super(props)
  }

  handleChange = (e) => {
    const { QuestionsActions } = this.props;
    QuestionsActions.changeRequirement(e.target.value);
  }

  render() {
    const { handleChange } = this;
    const { requirements } = this.props;

    return(
      <>
        <div className="question" data-qid="2">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              <FormattedMessage id="QUESTIONS.REQUIREMENT.TITLE" />
            </Typography>
            <RadioGroup
              aria-label="Project Requirements"
              row
              name="requirements"
              className={"group"}
              value={requirements}
              onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.REQUIREMENT.OPTION1" />} />
              <FormControlLabel value="no" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.REQUIREMENT.OPTION2" />} />
            </RadioGroup>
          </FormControl>
        </div>

        <Grid container justify="flex-end" style={{marginTop: '20px'}}>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/project_name">
              <FormattedMessage id="BUTTONS.PREV" />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/app_target">
              <FormattedMessage id="BUTTONS.NEXT" />
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  requirements: state.questions.requirements
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Requirement);