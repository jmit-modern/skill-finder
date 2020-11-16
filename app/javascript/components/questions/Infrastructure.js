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

class Infrastructure extends React.Component{
  constructor(props){
    super(props)
  }

  handleChange = (e) => {
    const { QuestionsActions } = this.props;
    QuestionsActions.changeInfrastructure(e.target.value);
  }

  render() {
    const { handleChange } = this;
    const { infrastructure } = this.props;

    return(
      <>
        <div className="question" data-qid="9">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              <FormattedMessage id="QUESTIONS.INFRASTRUCTURE.TITLE" />
            </Typography>
            <RadioGroup
              aria-label="Infrastructure"
              name="infrastructure"
              className={"group"}
              value={infrastructure}
              onChange={handleChange}
            >
              <FormControlLabel value="onpremise" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.INFRASTRUCTURE.OPTION1" />} />
              <FormControlLabel value="aws" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.INFRASTRUCTURE.OPTION2" />} />
              <FormControlLabel value="gcp" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.INFRASTRUCTURE.OPTION3" />} />
              <FormControlLabel value="azure" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.INFRASTRUCTURE.OPTION4" />} />
            </RadioGroup>
          </FormControl>
        </div>

        <Grid container justify="flex-end" style={{marginTop: '20px'}}>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/non_functions">
              <FormattedMessage id="BUTTONS.PREV" />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/designer">
              <FormattedMessage id="BUTTONS.NEXT" />
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  infrastructure: state.questions.infrastructure
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Infrastructure);