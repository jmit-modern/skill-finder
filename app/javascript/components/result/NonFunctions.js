import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as totalActions from '../../store/modules/total';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { FormattedMessage } from "react-intl";

const useStyles = {
  subTableHeader: {
    background: "#e2e2e2"
  }
}

class NonFunctions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      subtotal: 0
    }
  }

  componentDidMount(){
    const { epicData } = this.props
    let subtotal = 0;
    if("authentication" in epicData){
      subtotal += epicData.authentication.backend_engineer;
    }
    if("backup" in epicData){
      subtotal += epicData.backup.backend_engineer;
    }
    if("data_migration" in epicData){
      subtotal += epicData.data_migration.backend_engineer;
    }
    if("monitoring_alert" in epicData){
      subtotal += epicData.monitoring_alert.backend_engineer;
    }
    this.setState({subtotal: subtotal});

    const { TotalActions } = this.props;
    TotalActions.changeTotal(subtotal);
  }

  render(){
    const { epicData } = this.props;
    return (
      <>
        <TableRow style={useStyles.subTableHeader}>
          <TableCell><FormattedMessage id="RESULT.NONFUNCTIONS" /></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>

        {"authentication" in epicData ? (
          <>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.AUTHENTICATION" /></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.BACKENDENGINEER" /></TableCell>
              <TableCell align="right"> {epicData.authentication.backend_engineer} </TableCell>
            </TableRow>
          </>
        ):null}

        {"backup" in epicData ? (
          <>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.BACKUP" /></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.BACKENDENGINEER" /></TableCell>
              <TableCell align="right"> {epicData.backup.backend_engineer} </TableCell>
            </TableRow>
          </>
        ):null}

        {"data_migration" in epicData ? (
          <>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.DATAMIGRATION" /></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.BACKENDENGINEER" /></TableCell>
              <TableCell align="right"> {epicData.data_migration.backend_engineer} </TableCell>
            </TableRow>
          </>
        ):null}

        {"monitoring_alert" in epicData ? (
          <>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.MONITORINGALERT" /></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.BACKENDENGINEER" /></TableCell>
              <TableCell align="right"> {epicData.monitoring_alert.backend_engineer} </TableCell>
            </TableRow>
          </>
        ):null}

        <TableRow>
          <TableCell colSpan={2}></TableCell>
          <TableCell align="right"><h5><FormattedMessage id="RESULT.SUBTOTAL" /></h5></TableCell>
          <TableCell align="right"> {this.state.subtotal} </TableCell>
        </TableRow>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  value: state.total.value
});

const mapDispatchToProps = (dispatch) => ({
  TotalActions: bindActionCreators(totalActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NonFunctions);
