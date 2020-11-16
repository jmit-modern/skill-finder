import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as questionsActions from '../../store/modules/questions'
import { TextField, Grid, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { FormattedMessage, injectIntl } from "react-intl";

class ProjectName extends React.Component{
  constructor(props){
    super(props)
  }

  handleChange = (e) => {
    const { QuestionsActions } = this.props;
    QuestionsActions.change(e.target.value)
  }

  render() {
    const { handleChange } = this;
    const { projectName } = this.props;

    return(
      <>
        <div className="question" data-qid="1">
          <FormControl fullWidth>
            <Typography variant="h6" className="q_title">
              <FormattedMessage id="QUESTIONS.PROJECTNAME.TITLE" />
            </Typography>
            <TextField
              id="project-name"
              label={<FormattedMessage id="QUESTIONS.PROJECTNAME.PLACEHOLDER" />}
              value={projectName}
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <Grid container justify="flex-end" style={{marginTop: '20px'}}>
          <Grid item>
            <Button variant="contained" color="primary" href="/">
              <FormattedMessage id="BUTTONS.PREV" />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/requirement">
              <FormattedMessage id="BUTTONS.NEXT" />
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  projectName: state.questions.projectName
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectName);