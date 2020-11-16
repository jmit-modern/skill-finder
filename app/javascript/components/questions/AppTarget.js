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

class AppTarget extends React.Component{
  constructor(props){
    super(props);
  }

  handleChange = (e) => {
    const { QuestionsActions } = this.props;
    QuestionsActions.changeAppTarget(e.target.value);
  }

  render() {
    const { handleChange } = this;
    const { appTarget } = this.props;

    return(
      <>
        <div className="question" data-qid="3">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              <FormattedMessage id="QUESTIONS.APPTARGET.TITLE" />
            </Typography>

            <RadioGroup
              aria-label="App target"
              name="appTarget"
              className={"group"}
              value={appTarget}
              onChange={handleChange}
            >
              <div className="sub_group">
                <div className="subtitle"><FormattedMessage id="QUESTIONS.APPTARGET.WEBAPP.TITLE" /></div>
                <div>
                  <FormControlLabel value="webonly" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.APPTARGET.WEBAPP.OPTION1" />} />
                  <FormControlLabel value="webapp_include_ios" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.APPTARGET.WEBAPP.OPTION2" />} />
                  <FormControlLabel value="webapp_include_android" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.APPTARGET.WEBAPP.OPTION3" />} />
                  <FormControlLabel value="webapp_include_both_ios_android" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.APPTARGET.WEBAPP.OPTION4" />} />
                </div>
              </div>

              <div className="sub_group">
                <div className="subtitle">{<FormattedMessage id="QUESTIONS.APPTARGET.WINDOWS.TITLE" />}</div>
                <FormControlLabel value="windowsapp" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.APPTARGET.WINDOWS.OPTION1" />} />
              </div>

              <div className="sub_group">
                <div className="subtitle">{<FormattedMessage id="QUESTIONS.APPTARGET.MACOS.TITLE" />}</div>
                <FormControlLabel value="macosapp" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.APPTARGET.MACOS.OPTION1" />} />
              </div>

              <div className="sub_group">
                <div className="subtitle">{<FormattedMessage id="QUESTIONS.APPTARGET.EMBEDDED.TITLE" />}</div>
                <div>
                  <FormControlLabel value="arduino" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.APPTARGET.EMBEDDED.OPTION1" />} />
                  <FormControlLabel value="raspberrypi" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.APPTARGET.EMBEDDED.OPTION2" />} />
                  <FormControlLabel value="embedother" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.APPTARGET.EMBEDDED.OPTION3" />} />
                </div>
              </div>

              <div className="sub_group">
                <div className="subtitle">{<FormattedMessage id="QUESTIONS.APPTARGET.SMARTPHONE.TITLE" />}</div>
                <div>
                  <FormControlLabel value="iOSonly" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.APPTARGET.SMARTPHONE.OPTION1" />} />
                  <FormControlLabel value="androidonly" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.APPTARGET.SMARTPHONE.OPTION2" />} />
                  <FormControlLabel value="iOS_android" control={<Radio color="primary" />} label={<FormattedMessage id="QUESTIONS.APPTARGET.SMARTPHONE.OPTION3" />} />
                </div>
              </div>
            </RadioGroup>
          </FormControl>
        </div>

        <Grid container justify="flex-end" style={{marginTop: '20px'}}>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/requirement">
              <FormattedMessage id="BUTTONS.PREV" />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/project_feature">
              <FormattedMessage id="BUTTONS.NEXT" />
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  appTarget: state.questions.appTarget
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppTarget);