import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ResultTable from '../components/result/ResultTable';
import { FormattedMessage } from "react-intl";
import * as questionsActions from '../store/modules/questions'
import * as totalActions from '../store/modules/total';
import * as tableActions from '../store/modules/table';

class Result extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tableData: {}
    }
  }

  componentDidMount(){
    const { TotalActions } = this.props;
    fetch('/api/v1/estimate', {
      method: 'post',
      body: JSON.stringify(this.props.questions),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.json())
    .then((result) => {
      // reset total value before new calculation
      TotalActions.resetTotal();
      // Set the table data
      this.setState({tableData: result});

      // Save table contents to html string
      const { TableActions } = this.props;
      TableActions.changeTable(this.child.tableRef.current.outerHTML);
      TableActions.changeData(result);
    });
    
  }

  handleChange = (e) => {
    const { QuestionsActions } = this.props;
    QuestionsActions.change(e.target.value)
  }

  render() {
    const { handleChange } = this;
    const { questions } = this.props;
    const { tableData } =  this.state;

    return(
      <>
        <Typography variant="h6" className="q_title">
          <FormattedMessage id="RESULT.PROJECTNAME" />: {questions.projectName}
        </Typography>
        <ResultTable tableData={ tableData } childRef={ref => (this.child = ref)} />

        <div style={{marginTop: '3rem'}}><FormattedMessage id="RESULT.LOGINDESC" /></div>
        <Grid container justify="flex-end" style={{marginTop: '20px'}}>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/priority">
              <FormattedMessage id="BUTTONS.PREV" />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/register_project">
              <FormattedMessage id="REGISTERPROJECT.LOGIN" />
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch),
  TotalActions: bindActionCreators(totalActions, dispatch),
  TableActions: bindActionCreators(tableActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Result);