import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionsActions from '../store/modules/questions'
import { 
  Button,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography
} from '@material-ui/core';
import { FormattedMessage } from "react-intl";

const useStyles = {
  root: {
    width: '100%',
    marginTop: '3rem',
    marginBottom: '10rem',
    overflowX: 'auto',
    boxShadow: 'none'
  },
  table: {
    minWidth: 700,
  },
  theader: {
    background: "#3f51b5",
    color: "#fff"
  },
  button: {
    margin: 0
  }
};

class SearchResult extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const { QuestionsActions } = this.props;
  }

  render(){
    const {i18n} = this.props;
    return(
      <Paper style={useStyles.root} >
        <Typography variant="h6" style={{marginBottom: '1rem'}}>
          <FormattedMessage id="SEARCHRESULT.DESCRIPTION" />
        </Typography>
        <Table style={useStyles.table}>
          <TableHead>
            <TableRow style={useStyles.theader}>
              <TableCell><FormattedMessage id="LABEL.FIRSTNAME" /></TableCell>
              <TableCell><FormattedMessage id="LABEL.LASTNAME" /></TableCell>
              <TableCell><FormattedMessage id="LABEL.EMAIL" /></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">
                <Button variant="outlined" color="primary" style={useStyles.button} href="/user_detail/3">
                  <FormattedMessage id="BUTTONS.DETAIL" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">
                <Button variant="outlined" color="primary" style={useStyles.button} href="/user_detail/3">
                  <FormattedMessage id="BUTTONS.DETAIL" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">
                <Button variant="outlined" color="primary" style={useStyles.button} href="/user_detail/3">
                  <FormattedMessage id="BUTTONS.DETAIL" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">
                <Button variant="outlined" color="primary" style={useStyles.button} href="/user_detail/3">
                  <FormattedMessage id="BUTTONS.DETAIL" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">
                <Button variant="outlined" color="primary" style={useStyles.button} href="/user_detail/3">
                  <FormattedMessage id="BUTTONS.DETAIL" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => ({
  i18n: state.i18n
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)