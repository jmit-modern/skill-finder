import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionsActions from '../store/modules/questions'
import { Button, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from "react-intl";
import { enUS, ja, zhCN } from 'date-fns/locale'

const locales = {
  en: enUS,
  ja: ja,
  zh: zhCN
};

class UploadList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      developerLang: '',
      skills: ['javascript', 'php', 'Ruby on Rails', 'Python'],
      dateRange: [{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }]
    }
  }

  componentDidMount(){
    const { QuestionsActions } = this.props;
    QuestionsActions.reset();
  }

  handleChange = event => {
    const name = event.target.name;
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  handleSkillChange(chips){
    console.log(chips)
  }

  handleRange = (ranges) => {
    this.setState({dateRange: [ranges.selection]})
  }

  render(){
    return(
      <>
        <Grid container justify="space-between" style={{marginTop: '1rem'}}>
          <Grid item>
            <Typography variant="h6">
              <FormattedMessage id="UPLOADLIST.DESCRIPTION1" />
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary">
              <FormattedMessage id="BUTTONS.DOWNLOAD" />
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="space-between" style={{marginTop: '1rem'}}>
          <Grid item>
            <Typography variant="h6">
              <FormattedMessage id="UPLOADLIST.DESCRIPTION2" />
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary">
              <FormattedMessage id="BUTTONS.UPLOAD" />
            </Button>
          </Grid>
        </Grid>

        <Grid container justify="flex-end" style={{marginTop: '2rem'}}>
        <Grid item>
          <Button variant="contained" color="primary" href="/">
            <FormattedMessage id="BUTTONS.BACK" />
          </Button>
        </Grid>
      </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  i18n: state.i18n
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadList)