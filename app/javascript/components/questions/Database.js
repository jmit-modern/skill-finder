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

class Database extends React.Component{
  constructor(props){
    super(props)
  }

  handleChange = (e) => {
    const { QuestionsActions } = this.props;
    QuestionsActions.changeDatabase(e.target.value);
  }

  render() {
    const { handleChange } = this;
    const { database } = this.props;

    return(
      <>
        <div className="question" data-qid="7">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              <FormattedMessage id="QUESTIONS.DATABASE.TITLE" />
            </Typography>
            <RadioGroup
              aria-label="Database"
              name="database"
              className={"group"}
              value={database}
              onChange={handleChange}
            >
              <FormControlLabel value="mysql" control={<Radio color="primary" />} label="MySQL" />
              <FormControlLabel value="postgresql" control={<Radio color="primary" />} label="PostgreSQL" />
              <FormControlLabel value="oracle" control={<Radio color="primary" />} label="Oracle" />
              <FormControlLabel value="nosql" control={<Radio color="primary" />} label="NoSQL" />
            </RadioGroup>
          </FormControl>
        </div>

        <Grid container justify="flex-end" style={{marginTop: '20px'}}>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/admin_dashboard">
              <FormattedMessage id="BUTTONS.PREV" />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/technology">
              <FormattedMessage id="BUTTONS.NEXT" />
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  database: state.questions.database
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Database);