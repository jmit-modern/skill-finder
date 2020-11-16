import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionsActions from '../store/modules/questions'
import { Button, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from "react-intl";

class HomePage extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const { QuestionsActions } = this.props;
    QuestionsActions.reset();
  }

  render(){
    return(
      <>
        <Typography variant="h6">
          <FormattedMessage id="TOPPAGE.DESCRIPTION" />
        </Typography>
        <Grid container justify="flex-end" style={{marginTop: '20px'}}>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/project_name">
              <FormattedMessage id="BUTTONS.NEXT" />
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch)
});

export default connect(null, mapDispatchToProps)(HomePage)