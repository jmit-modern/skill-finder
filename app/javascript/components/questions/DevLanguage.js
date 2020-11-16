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

class DevLanguage extends React.Component{
  constructor(props){
    super(props)
  }

  handleChange = (e) => {
    const { QuestionsActions } = this.props;
    QuestionsActions.changeDevLanguage(e.target.value);
  }

  render() {
    const { handleChange } = this;
    const { devLanguage } = this.props;

    return(
      <>
        <div className="question" data-qid="5">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              <FormattedMessage id="QUESTIONS.LANGUAGE.TITLE" />
            </Typography>
            <RadioGroup
              aria-label="Programming language"
              name="devlanguage"
              className={"group"}
              value={devLanguage}
              onChange={handleChange}
            >
              <FormControlLabel value="target_standard" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.LANGUAGE.OPTION1" />} />
              <FormControlLabel value="java" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.LANGUAGE.OPTION2" />} />
              <FormControlLabel value="php" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.LANGUAGE.OPTION3" />} />
              <FormControlLabel value="ruby" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.LANGUAGE.OPTION4" />} />
              <FormControlLabel value="swift" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.LANGUAGE.OPTION5" />} />
              <FormControlLabel value="cplus" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.LANGUAGE.OPTION6" />} />
              <FormControlLabel value="javascript" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.LANGUAGE.OPTION7" />} />
            </RadioGroup>
          </FormControl>
        </div>

        <Grid container justify="flex-end" style={{marginTop: '20px'}}>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/project_feature">
              <FormattedMessage id="BUTTONS.PREV" />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/frontend">
              <FormattedMessage id="BUTTONS.NEXT" />
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  devLanguage: state.questions.devLanguage
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DevLanguage);