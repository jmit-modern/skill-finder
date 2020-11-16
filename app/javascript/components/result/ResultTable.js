import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as totalActions from '../../store/modules/total'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from "react-intl";

import Backend from "./Backend";
import Frontend from "./Frontend";
import IOSApp from "./IOSApp";
import AndroidApp from "./AndroidApp";
import AdminDashboard from "./AdminDashboard";
import WindowsApp from './WindowsApp';
import MacOSApp from './MacOSApp';
import Embedded from './Embedded';
import DeviceDriver from './DeviceDriver';
import Technology from './Technology';
import NonFunctions from './NonFunctions';

const useStyles = {
  root: {
    width: '100%',
    marginTop: '3rem',
    overflowX: 'auto',
    boxShadow: 'none'
  },
  table: {
    minWidth: 700,
  },
  theader: {
    background: "#3f51b5",
    color: "#fff"
  }
};

class ResultTable extends React.Component{
  constructor(props){
    super(props);
    this.tableRef = React.createRef();
  }

  componentDidMount(){
    const { childRef } = this.props;
    childRef(this);
  }

  componentWillUnmount() {
    const { childRef } = this.props;
    childRef(undefined);
   }

  render(){
    const { tableData } = this.props;
    const { questions } = this.props;
    return (
      <Paper style={useStyles.root}>
        <Table style={useStyles.table} ref={this.tableRef}>
          <TableHead>
            <TableRow style={useStyles.theader}>
              <TableCell><FormattedMessage id="RESULT.EPIC" /></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.BACKLOG" /></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.SKILL" /></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.MANDAYS" /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><h6><FormattedMessage id="RESULT.PROJECTNAME" /></h6></TableCell>
              <TableCell colSpan={3} align="left"><h6> {questions.projectName} </h6></TableCell>
            </TableRow>
            {"backend" in tableData && <Backend epicData = {tableData.backend} />}
            {"frontend" in tableData && <Frontend epicData = {tableData.frontend} />}
            {"iOS_app" in tableData && <IOSApp epicData = {tableData.iOS_app} />}
            {"android_app" in tableData && <AndroidApp epicData = {tableData.android_app} />}
            {"admin_dashboard" in tableData && <AdminDashboard  epicData = {tableData.admin_dashboard} />}
            {"windows_app" in tableData && <WindowsApp  epicData = {tableData.windows_app} />}
            {"macOS_app" in tableData && <MacOSApp  epicData = {tableData.macOS_app} />}
            {"IoT_microcom" in tableData && <Embedded  epicData = {tableData.IoT_microcom} />}
            {"device_driver" in tableData && <DeviceDriver  epicData = {tableData.device_driver} />}
            {"technology" in tableData && Object.keys(tableData.technology).length !=0 ? (<Technology epicData = {tableData.technology} />): null}
            {"nonfunctions" in tableData && Object.keys(tableData.nonfunctions).length !=0 ? (<NonFunctions epicData = {tableData.nonfunctions} />): null}
            <TableRow>
              <TableCell colSpan={3}><h3><FormattedMessage id="RESULT.TOTAL" /></h3></TableCell>
              <TableCell align="right"> 
                {this.props.totalValue} <FormattedMessage id="RESULT.MANDAYS" /> <br />
                {this.props.totalValue/20} <FormattedMessage id="RESULT.MANMONTH" /> * {this.props.totalValue}/20
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  totalValue: state.total.value,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  TotalActions: bindActionCreators(totalActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultTable);
