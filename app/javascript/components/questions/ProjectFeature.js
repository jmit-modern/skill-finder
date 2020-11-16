import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionsActions from '../../store/modules/questions'
import { Grid, Button, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { FormattedMessage } from "react-intl";

class ProjectFeature extends React.Component{
  constructor(props){
    super(props)
  }

  handleChange = (e) => {
    const { QuestionsActions } = this.props;
    QuestionsActions.changeProjectFeature(e.target.value);
  }

  render() {
    const { handleChange } = this;
    const { projectFeatureNum } = this.props;

    return(
      <>
        <div className="question" data-qid="4">
          <FormControl>
            <Typography variant="h6" className="q_title">
              <FormattedMessage id="QUESTIONS.PROJECTFEATURE.TITLE" />
            </Typography>
            <TextField
              id="project-features"
              label={<FormattedMessage id="QUESTIONS.PROJECTFEATURE.PLACEHOLDER" />}
              value={projectFeatureNum}
              onChange={handleChange}
              type="number"
            />
          </FormControl>
        </div>

        <Grid container justify="flex-end" style={{marginTop: '20px'}}>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/app_target">
              <FormattedMessage id="BUTTONS.PREV" />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/dev_language">
              <FormattedMessage id="BUTTONS.NEXT" />
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  projectFeatureNum: state.questions.projectFeature
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFeature);